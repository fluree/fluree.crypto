(ns fluree.crypto.secp256k1
  (:require [alphabase.core :as alphabase]
            [fluree.crypto.sha2 :as sha2]
            [fluree.crypto.encodings :as encodings]
            #?@(:cljs [["@noble/curves/secp256k1" :as noble-secp256k1]
                       [goog.object :as gobj]]))

  #?(:clj
     (:import (java.io ByteArrayOutputStream)
              (java.security SecureRandom)
              (clojure.lang Reflector)
              (org.bouncycastle.crypto.generators ECKeyPairGenerator)
              (org.bouncycastle.crypto.params ECKeyGenerationParameters ECDomainParameters ECPrivateKeyParameters)
              (org.bouncycastle.asn1.sec SECNamedCurves)
              (org.bouncycastle.crypto.signers HMacDSAKCalculator)
              (org.bouncycastle.crypto.digests SHA256Digest)
              (org.bouncycastle.asn1 DERSequenceGenerator)
              (org.bouncycastle.asn1 ASN1Integer)
              (org.bouncycastle.math.ec ECAlgorithms ECPoint))))

#?(:clj (set! *warn-on-reflection* true))

(defonce ^:private ^ECDomainParameters secp256k1
  #?(:cljs noble-secp256k1/CURVE
     :clj  (let [params (SECNamedCurves/getByName "secp256k1")]
             (ECDomainParameters. (.getCurve params)
                                  (.getG params)
                                  (.getN params)
                                  (.getH params)))))

(defonce modulus #?(:clj  (.getN secp256k1)
                    :cljs (.-n secp256k1)))

(defn valid-private?
  "Returns true if private key, as big number/integer, is valid.
  Private key must be >= 1 and <= curve modulus."
  [private]
  (and (<= 1 private)
       (<= private modulus)))

(defn format-public-key
  "Takes internal representation of a public key and returns X9.62 compressed encoded
public key, hex encoded."
  [^ECPoint public]
  (let [x #?(:clj (-> public .getAffineXCoord .toBigInteger (.toString 16))
             :cljs (-> public .-x .toString (.replace #"^0x" "") encodings/pad-hex))
        y #?(:clj (-> public .getAffineYCoord .toBigInteger (.toString 16))
             :cljs (-> public .-y .toString (.replace #"^0x" "") encodings/pad-hex))]
    (encodings/x962-encode x y)))

(defn format-key-pair
  "Takes internal representation of a key-pair and returns X9.62 compressed encoded
  public key and private key as a map, with each value hex encoded."
  [pair]
  (let [private         (:private pair)
        ^ECPoint public (:public pair)
        x #?(:clj       (-> public .getAffineXCoord .toBigInteger
                            (.toString 16) (encodings/pad-to-length 64))
             :cljs (-> public (gobj/get "x") .toString
                       (.replace #"^0x" "") encodings/pad-hex))
        y #?(:clj       (-> public .getAffineYCoord .toBigInteger
                            (.toString 16))
             :cljs (-> public (gobj/get "y") .toString
                       (.replace #"^0x" "") encodings/pad-hex))]
    {:private (encodings/biginteger->hex private)
     :public  (encodings/x962-encode x y)}))

(defn public-key-from-private
  [private]
  (let [private-bn #?(:clj (cond
                             (instance? BigInteger private) private
                             (string? private) (BigInteger. ^String private 16))
                      :cljs (if (string? private)
                              (js/BigInt (str "0x" private))
                              (js/BigInt private)))]
    (when-not (valid-private? private-bn)
      (throw (ex-info "Invalid private key. Must be big integer and >= 1, <= curve modulus." {:private private})))
    {:private private-bn
     :public  #?(:clj  (-> secp256k1 .getG (.multiply private-bn) .normalize)
                 :cljs (noble-secp256k1/getPublicKey private-bn))}))

(defn- pub-key->bytes
  [pub-key]
  #?(:clj  (-> pub-key
               (encodings/x962-decode secp256k1)
               (.getEncoded true)
               (alphabase/byte-array-to-base :bytes))
     :cljs (alphabase/hex->bytes pub-key)))

(defn- ->byte-array
  [bytes]
  #?(:clj  (byte-array bytes)
     :cljs (clj->js bytes)))

(defn get-sin-from-public-key
  "Generate a SIN from a public key using SHA-256 truncation (Cosmos-style)"
  [pub-key & {:keys [output-format]
              :or   {output-format :base58}}]
  (let [pub-hash     (-> pub-key
                         pub-key->bytes
                         sha2/sha2-256)
        ;; Take first 20 bytes of SHA-256 hash (like Cosmos/Tendermint)
        address-bytes (take 20 pub-hash)
        ;; Add version prefix
        pub-prefixed  (-> address-bytes
                          (->> (concat [0x0F 0x02]))
                          ->byte-array)
        checksum      (-> pub-prefixed
                          sha2/sha2-256
                          sha2/sha2-256
                          (->> (take 4)))
        bytes         (concat pub-prefixed checksum)
        ba            (->byte-array bytes)]
    (alphabase/byte-array-to-base ba output-format)))

(defn ^:export new-private-key
  "Generates a new random private key."
  []
  #?(:clj  (let [gen                             (doto (ECKeyPairGenerator.)
                                                   (.init (ECKeyGenerationParameters.
                                                           secp256k1
                                                           (SecureRandom.))))
                 keypair                         (.generateKeyPair gen)
                 ^ECPrivateKeyParameters private (.getPrivate keypair)]
             (.getD private))
     :cljs (js/BigInt (noble-secp256k1/utils.randomPrivateKey))))

(defn generate-key-pair*
  "Generates an internal representation of key pair from a secure random seed or provided private key.
  Returns map/object with two keys:
   - private  - a big number/integer
   - public - a curve point

   If a private key is provided, must be in either hex string or BigInteger (clj) bignumber (cljs)."
  ([] (generate-key-pair* (new-private-key)))
  ([private]
   (public-key-from-private private)))

(defn ^:export generate-key-pair
  "Returns key pair in hex format using X9.62 compressed encoding for public key."
  ([] (format-key-pair (generate-key-pair*)))
  ([private] (format-key-pair (generate-key-pair* private))))

(defn ^:export sign
  "Sign some message with provided private key.
  Message must be a byte-array or string.
  Private key must be hex-encoded or a BigInteger(clj)/bignumber(cljs).
  Returns 65-byte signature: r(32) + s(32) + recovery_id(1)"
  [message private-key]
  (let [msg-ba     (if (string? message)
                     (alphabase/string->bytes message)
                     message)
        hash       (sha2/sha2-256 msg-ba)]
    #?(:clj  (throw (ex-info "Clojure implementation needs to be updated for 65-byte format" {}))
       :cljs (let [private-hex (if (string? private-key)
                                 private-key
                                 (.toString private-key 16))
                   signature   (noble-secp256k1/sign hash private-hex)
                   ;; Convert Noble signature to 65-byte format
                   r-hex       (-> signature .-r (.toString 16) (encodings/pad-to-length 64))
                   s-hex       (-> signature .-s (.toString 16) (encodings/pad-to-length 64))
                   ;; Calculate recovery ID by testing which one recovers correctly
                   public-key  (noble-secp256k1/getPublicKey private-hex)
                   recovery-id (loop [id 0]
                                 (if (> id 3)
                                   0  ;; fallback
                                   (let [compact-sig (str r-hex s-hex)
                                         test-sig    (-> noble-secp256k1/Signature
                                                      (.fromCompact compact-sig)
                                                      (.addRecoveryBit id))
                                         recovered   (.recoverPublicKey test-sig hash)]
                                     (if (= (alphabase/bytes->hex public-key)
                                           (alphabase/bytes->hex (.toRawBytes recovered)))
                                       id
                                       (recur (inc id))))))]
               ;; Return 65-byte hex: r(32) + s(32) + recovery_id(1)
               (str r-hex s-hex (-> recovery-id (.toString 16) (encodings/pad-to-length 2)))))))

(defn recover-public-key-from-hash
  "Recover a public key from a hash byte-array and 65-byte signature (hex).
  Signature format: r(32) + s(32) + recovery_id(1)"
  [hash signature-hex]
  (let [signature-bytes (alphabase/hex->bytes signature-hex)
        _               (assert (= 65 (count signature-bytes))
                                (str "Signature should be 65 bytes, got " (count signature-bytes)))
        r-hex           (alphabase/bytes->hex (take 32 signature-bytes))
        s-hex           (alphabase/bytes->hex (take 32 (drop 32 signature-bytes)))
        recovery-id     (nth signature-bytes 64)]
    #?(:clj  (throw (ex-info "Clojure recovery implementation needs to be updated" {}))
       :cljs (let [compact-sig     (str r-hex s-hex)
                   signature       (.fromCompact noble-secp256k1/Signature compact-sig)
                   sig-with-recovery (.addRecoveryBit signature recovery-id)
                   recovered-point (.recoverPublicKey sig-with-recovery hash)]
               ;; Convert to compressed hex format
               (-> recovered-point .toHex)))))

(defn recover-public-key
  "Recover a public key from original message and signature (hex) of the
  message's sha2-256 hash."
  [input signature]
  (let [hash (sha2/sha2-256 (if (string? input)
                              (alphabase/string->bytes input)
                              input))]
    (recover-public-key-from-hash hash signature)))

(defn verify-signature-from-hash
  "Verify signature by recovering public key and comparing.
  Expects 65-byte signature format."
  [key hash signature]
  (try
    (= key (recover-public-key-from-hash hash signature))
    (catch #?(:clj Exception :cljs js/Error) e
      (throw (ex-info "Signature verification failed"
                      {:key       key
                       :hash      hash
                       :signature signature
                       :error     (str e)})))))

(defn ^:export verify
  "Verifies a message given a signature (in hex).
  Expects 65-byte signature format: r(32) + s(32) + recovery_id(1)"
  [pub-key message signature]
  (let [hash (sha2/sha2-256 (alphabase/string->bytes message))]
    (verify-signature-from-hash pub-key hash signature)))

(comment

  (verify "035813c81e39b231b586f48e98bcfe6c0a71bdb17e2fa907463339ab1a9fb5e4a5" "hi" "1c3045022100e81841ed32ed8c36e31dfa671cb21c1d9bdd6b581ea699b62d4201445e3fe2ea02200473ef2d72258029dae899ece3846c5e06190ce27ca3f289bf8a5cf43ef02c68"))