(ns fluree.crypto.secp256k1
  (:require [alphabase.core :as alphabase]
            [fluree.crypto.hmac :as hmac]
            [fluree.crypto.sha2 :as sha2]
            [fluree.crypto.ripemd :as ripemd]
            [fluree.crypto.encodings :as encodings]
            #?@(:cljs [[fluree.crypto.asn1 :as asn1]
                       [sjcl.ecc :as ecc]
                       [sjcl.bn :as bn]
                       [sjcl.codec.hex :as codecHex]
                       [sjcl.codec.bytes :as codecBytes]])
            [fluree.crypto.ripemd :as ripemd]
            )
  #?(:clj
     (:import (java.io ByteArrayOutputStream)
              (java.security SecureRandom)
              (clojure.lang Reflector)
              (org.bouncycastle.crypto.generators ECKeyPairGenerator)
              (org.bouncycastle.crypto.params ECKeyGenerationParameters ECDomainParameters)
              (org.bouncycastle.asn1.sec SECNamedCurves)
              (org.bouncycastle.crypto.signers HMacDSAKCalculator)
              (org.bouncycastle.crypto.digests SHA256Digest)
              (org.bouncycastle.asn1 DERSequenceGenerator)
              (org.bouncycastle.asn1 ASN1Integer)
              (org.bouncycastle.math.ec ECAlgorithms))))


(defonce ^:private secp256k1
         #?(:cljs ecc/curves.k256
            :clj  (let [params (SECNamedCurves/getByName "secp256k1")]
                    (ECDomainParameters. (.getCurve params)
                                         (.getG params)
                                         (.getN params)
                                         (.getH params)))))

(defonce modulus #?(:clj  (.getN secp256k1)
                    :cljs (.-r secp256k1)))

(defn valid-private?
  "Returns true if private key, as big number/integer, is valid.
  Private key must be >= 1 and <= curve modulus."
  [private]
  #?(:clj  (and (<= 1 private)
                (<= private modulus))
     :cljs (and
             (.greaterEquals private 1)
             (.greaterEquals modulus private))))

(defn format-public-key
  "Takes internal representation of a public key and returns X9.62 compressed encoded
public key, hex encoded."
  [public]
  (let [x #?(:clj (-> public .getAffineXCoord .toBigInteger (.toString 16))
             :cljs (-> public .-x .toString (.replace #"^0x" "") encodings/pad-hex))
        y #?(:clj (-> public .getAffineYCoord .toBigInteger (.toString 16))
             :cljs (-> public .-y .toString (.replace #"^0x" "") encodings/pad-hex))]
    (encodings/x962-encode x y)))

(defn format-key-pair
  "Takes internal representation of a key-pair and returns X9.62 compressed encoded
  public key and private key as a map, with each value hex encoded."
  [pair]
  (let [private #?(:clj (:private pair) :cljs (.-private pair))
        public #?(:clj  (:public pair) :cljs (.-public pair))
        x #?(:clj       (-> public .getAffineXCoord .toBigInteger (.toString 16))
             :cljs (-> public .-x .toString (.replace #"^0x" "") encodings/pad-hex))
        y #?(:clj       (-> public .getAffineYCoord .toBigInteger (.toString 16))
             :cljs (-> public .-y .toString (.replace #"^0x" "") encodings/pad-hex))
        pair-hex        {:private (encodings/biginteger->hex private)
                         :public  (encodings/x962-encode x y)}]

    #?(:clj  pair-hex
       :cljs (clj->js pair-hex))))

(defn public-key-from-private
  [private]
  (let [private-bn #?(:clj (cond
                             (instance? java.math.BigInteger private) private
                             (string? private) (BigInteger. private 16))
                      :cljs (-> (sjcl.bn.) (.initWith private)))]
    (when-not (valid-private? private-bn)
      (throw (ex-info "Invalid private key. Must be big integer and >= 1, <= curve modulus." {:private private})))
    #?(:clj  {:private private-bn
              :public  (-> secp256k1 .getG (.multiply private-bn) .normalize)}
       :cljs #js {:private private-bn
                  :public  (.mult (.-G secp256k1) private-bn)})))



(defn get-sin-from-public-key
  "Generate a SIN from a public key"
  [pub-key & {:keys [output-format]
              :or   {output-format :base58}}]
  #?(:clj  (let [pub-prefixed (-> pub-key
                                  (encodings/x962-decode secp256k1)
                                  .getEncoded
                                  (alphabase/byte-array-to-base :bytes)
                                  sha2/sha2-256
                                  ripemd/ripemd-160
                                  ;;; What is this 15 and 2? Version?
                                  (->> (concat [0x0F 0x02]))
                                  byte-array)
                 checksum     (-> pub-prefixed
                                  sha2/sha2-256
                                  sha2/sha2-256
                                  (#(take 4 %)))]
             (alphabase/byte-array-to-base (concat pub-prefixed checksum) output-format))
     :cljs (let [pub-prefixed (-> pub-key
                                  alphabase/hex->bytes
                                  sha2/sha2-256
                                  ripemd/ripemd-160
                                  (->> (concat [0x0F 0x02]))
                                  clj->js)
                 checksum     (-> pub-prefixed
                                  sha2/sha2-256
                                  sha2/sha2-256
                                  (#(take 4 %))
                                  clj->js)]
             (alphabase/bytes->base58 (-> (concat pub-prefixed checksum) clj->js)))))

;(defn sha256-b
;  "alternative which takes multiple args, returns bytes"
;  [& data]
;  (let [d (MessageDigest/getInstance "SHA-256")]
;    (doseq [datum data]
;      (.update d (to-bytes datum)))
;    (.digest d)))

(defn generate-key-pair*
  "Generates an internal representation of key pair from a secure random seed or provided private key.
  Returns map/object with two keys:
   - private  - a big number/integer
   - public - a curve point

   If a private key is provided, must be in either hex string or BigInteger (clj) bignumber (cljs)."
  ([]
   (let [private #?(:clj (-> (ECKeyPairGenerator.)
                             (doto (.init (ECKeyGenerationParameters. secp256k1 (SecureRandom.))))
                             .generateKeyPair .getPrivate .getD)
                    :cljs (-> (ecc/ecdsa.generateKeys secp256k1)
                              (.-sec)
                              (.get)
                              (bn/fromBits)))]
     (generate-key-pair* private)))
  ([private]
   (public-key-from-private private)))

(defn ^:export generate-key-pair
  "Returns key pair in hex format using X9.62 compressed encoding for public key."
  ([] (-> (generate-key-pair*) format-key-pair))
  ([private] (-> (generate-key-pair* private) format-key-pair)))


;; adapted from https://github.com/Sepia-Officinalis/secp256k1
(defn deterministic-generate-k
  "Deterministically generate a random number in accordance with RFC 6979.
  Provided hash should have 256 bits to align with secp256k1 curve."
  [hash-ba priv-key curve]
  #?(:clj  (do (assert (= (count hash-ba)
                          (-> curve .getN .bitLength (/ 8)))
                       "Hash should have the same number of bytes as the curve")
               (doto (HMacDSAKCalculator. (Reflector/invokeConstructor SHA256Digest (into-array [])))
                 (.init (.getN curve) priv-key hash-ba)))
     :cljs (let [l            (-> curve .-r .bitLength)
                 curve-bytes  (/ l 8)
                 v            (repeat curve-bytes 0x01)
                 k            (repeat curve-bytes 0x00)
                 pk           (encodings/biginteger->bytes priv-key)
                 left-padding (repeat (- curve-bytes (count hash-ba)) 0)
                 hash         (concat left-padding hash-ba)
                 k            (hmac/hmac-sha256 (concat v [0] pk hash) k)
                 v            (hmac/hmac-sha256 v k)
                 k            (hmac/hmac-sha256 (concat v [1] pk hash) k)
                 v            (hmac/hmac-sha256 v k)]
             (assert (= (count hash) curve-bytes)
                     "Hash should have the same number of bytes as the curve modulus")
             (-> (hmac/hmac-sha256 v k)
                 encodings/bytes->biginteger))))


(defn- compute-recovery-byte
  "Compute a recovery byte for a compressed ECDSA signature given R and S parameters.
  Returns value as byte integer."
  [kp r s]
  #?(:clj  (let [n      (.getN secp256k1)
                 big-r? (>= r n)
                 big-s? (>= (+ s s) n)
                 y-odd? (-> kp .getYCoord .toBigInteger (.testBit 0))]
             (-> 0x1B
                 (+ (if (not= big-s? y-odd?) 1 0))
                 (+ (if big-r? 2 0))))

     :cljs (let [n      (.-r secp256k1)
                 big-r? (.greaterEquals r n)
                 big-s? (.greaterEquals (.add s s) n)
                 y-odd? (-> kp .-y encodings/bn-even? not)]
             (-> 0x1B
                 (+ (if (not= big-s? y-odd?) 1 0))
                 (+ (if big-r? 2 0))))))


(defn ^:export sign-hash
  [hash-ba private-bn recovery-byte?]
  (let [rng           (deterministic-generate-k hash-ba private-bn secp256k1)
        n #?(:clj     (.getN secp256k1) :cljs (.-r secp256k1))
        z #?(:clj     (BigInteger. 1 hash-ba) :cljs (-> hash-ba codecBytes/toBits bn/fromBits))
        l             (.bitLength n)
        _             (assert (= (count hash-ba) (/ l 8)) "Hash should have the same number of bytes as the curve modulus")
        [r s s_ kp] #?(:clj  (loop []
                               (let [k  (.nextK rng)
                                     kp (-> secp256k1 .getG (.multiply k) .normalize)
                                     r  (-> kp .getXCoord .toBigInteger (.mod n))
                                     s_ (-> k
                                            (.modInverse n)
                                            (.multiply (-> r
                                                           (.multiply private-bn)
                                                           (.add z)))
                                            (.mod n))
                                     s  (if (< (+ s_ s_) n) s_ (.subtract n s_))]
                                 (if (or (zero? r) (zero? s))
                                   (recur)
                                   [r s s_ kp])))
                       :cljs (let [k  rng
                                   kp (-> secp256k1 .-G (.mult k))
                                   r  (-> kp .-x (.mod n))
                                   s_ (-> (.mul r private-bn) (.add z) (.mul (.inverseMod k n)) (.mod n))
                                   s  (if (.greaterEquals (.add s_ s_) n)
                                        (.sub n s_)
                                        s_)]
                               [r s s_ kp]))
        recovery-byte (when recovery-byte? (compute-recovery-byte kp r s_))]
    (-> (encodings/DER-encode-ECDSA-signature r s recovery-byte secp256k1)
        alphabase/bytes->hex)))



(defn ^:export sign
  "Sign some message with provided private key.
  Message must be a byte-array or string.
  Private key must be hex-encoded or a BigInteger(clj)/bignumber(cljs)."
  [message private-key]
  (let [msg-ba     (if (string? message)
                     (alphabase/string->bytes message)
                     message)
        private-bn (if (string? private-key)
                     (encodings/hex->biginteger private-key)
                     private-key)
        hash       (sha2/sha2-256 msg-ba)]
    (sign-hash hash private-bn true)))

(defn ecrecover
  "Given the components of a signature and a recovery value,
  recover and return the public key that generated the
  signature according to the algorithm in SEC1v2 section 4.1.6

  recovery-byte should be an integer byte."
  [hash recovery-byte r s]
  (assert (and (number? recovery-byte)
               (<= 0x1B recovery-byte)
               (<= recovery-byte 0x1E))
          (str "Recovery byte should be between 0x1B and 0x1E. Provided: "
               #?(:cljs (.toString recovery-byte 16) :clj (format "%x" recovery-byte))))
  (let [l #?(:clj             (-> secp256k1 .getN .bitLength (/ 8))
             :cljs (-> secp256k1 .-r .bitLength (/ 8)))
        _                     (assert (= l (count hash))
                                      (str "Hash should have " l " bytes, but had " (count hash) "."))
        y-even?               (even? (- recovery-byte 0x1B))
        is-second-key?        (odd? (-> recovery-byte
                                        (- 0x1B)
                                        (bit-shift-right 1)))
        n #?(:clj             (.getN secp256k1) :cljs (.-r secp256k1))
        point                 (encodings/compute-point y-even? (if is-second-key? (.add r n) r) secp256k1)
        R #?(:cljs point :clj (encodings/x962-decode point secp256k1))
        r-inv #?(:clj         (.modInverse r n) :cljs (.inverseMod r n))
        hash-bi #?(:clj       (BigInteger. 1 hash) :cljs (encodings/bytes->biginteger hash))
        e-inv #?(:clj         (.subtract n hash-bi)
                 :cljs (.sub n hash-bi))]
    #?(:clj (-> (ECAlgorithms/sumOfTwoMultiplies (.getG secp256k1) e-inv R s)
                (.multiply r-inv) .normalize format-public-key)
       :cljs

            (let [g-point  (ecc/point. secp256k1 (.-x (.-G secp256k1)) (.-y (.-G secp256k1)))
                  r-point  (ecc/point. secp256k1 (.-x R) (.-y R))
                  sumOTM   (.mult2 r-point s e-inv g-point)
                  sumPoint (ecc/point. secp256k1 (.-x sumOTM) (.-y sumOTM))]
              (-> (.mult sumPoint r-inv)
                  format-public-key)))))


(defn recover-public-key-from-hash
  "Recover a public key from a hash byte-array and signature (hex)."
  [hash signature]
  (let [{:keys [recover R S]} (encodings/DER-decode-ECDSA-signature signature)
        recover   (int recover)
        recovered (ecrecover hash recover R S)]
    recovered))



(defn recover-public-key
  "Recover a public key from original message and signature (hex) of the
  message's sha2-256 hash."
  [input signature]
  (let [hash (sha2/sha2-256 (if (string? input)
                              (alphabase/string->bytes input)
                              input))]
    (recover-public-key-from-hash hash signature)))



(defn verify-signature-from-hash
  [key hash signature]
  (let [head1 (subs signature 0 2)
        head2 (subs signature 2 4)]
    (cond (and (#{"1b" "1c" "1d" "1e"} head1) (= "30" head2))
          (= key
             (recover-public-key-from-hash hash signature))

          ;(= head1 0x30)
          ;(verify-ECDSA-signature-from-hash pub-key input sig-bytes)

          :else
          (throw (ex-info "Unknown signature header"
                          {:key       key
                           :hash      hash
                           :signature signature})))))


(defn ^:export verify
  "Verifies a message given a signature (in hex).
  Assumes signature is DER-encoded with a recovery byte."
  [pub-key message signature]
  (let [hash (sha2/sha2-256 (alphabase/string->bytes message))]
    (verify-signature-from-hash pub-key hash signature)))


(comment

  (verify "035813c81e39b231b586f48e98bcfe6c0a71bdb17e2fa907463339ab1a9fb5e4a5" "hi" "1c3045022100e81841ed32ed8c36e31dfa671cb21c1d9bdd6b581ea699b62d4201445e3fe2ea02200473ef2d72258029dae899ece3846c5e06190ce27ca3f289bf8a5cf43ef02c68")

  )


