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
            [fluree.crypto.ripemd :as ripemd])
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

(defn- biginteger->hex
  "Hex-encode java.math.BigInteger (clj) or sjcl.bn (cljs)."
  [bn]
  #?(:clj  (-> bn (.toString 16) encodings/pad-hex)
     :cljs (-> bn .toString (.replace #"^0x" "") encodings/pad-hex)))

(defn- biginteger->bytes
  "Return bytes of java.math.BigInteger (clj) or sjcl.bn (cljs)."
  ([bn] (biginteger->bytes bn nil))
  ([bn l]
    #?(:clj  (-> bn .toByteArray)
       :cljs (-> bn (.toBits l) codecBytes/fromBits))))

(defn- bytes->biginteger
  "Return bytes of java.math.BigInteger (clj) or sjcl.bn (cljs)."
  [ba]
  #?(:clj  (BigInteger. ba)
     :cljs (-> ba codecBytes/toBits bn/fromBits)))

(defn- hex->biginteger
  "Return bytes of java.math.BigInteger (clj) or sjcl.bn (cljs)."
  [hex]
  #?(:clj  (BigInteger. hex 16)
     :cljs (.initWith (sjcl.bn.) hex)))


(defn valid-private?
  "Returns true if private key, as big number/integer, is valid.
  Private key must be >= 1 and <= curve modulus."
  [private]
  #?(:clj  (and (<= 1 private)
                (<= private (.getN secp256k1)))
     :cljs (and
             (.greaterEquals private 1)
             (.greaterEquals (.-r secp256k1) private))))



#?(:cljs
   (defn- bn-even?
     "Tests is an sjcl.bn (cljs) is even. Returns boolean if so."
     [sjcl-bn]
     (-> sjcl-bn
         .-limbs                                            ;; .limbs holds array of numbers
         (get 0)                                            ;; first array number is lowest bits
         (bit-and 1)
         (zero?))))


(defn public-key
  "Returns a public key from x and y coordinates"
  [x y]

  )



;; adapted from https://github.com/Sepia-Officinalis/secp256k1
#?(:cljs
   (defn modular-square-root
     "Compute the square root of a number modulo a prime.
     Number and modulus should be big numbers (bn)."
     [n modulus]
     (let [n    (.mod n modulus)
           mod8 (-> modulus (.mod 8) .toString js/parseInt)]
       (assert (.greaterEquals modulus 0), "Modulus must be non-negative")
       (cond
         (.equals n 0) n

         (.equals n 1) n

         ;; http://www.mersennewiki.org/index.php/Modular_Square_Root#Modulus_equal_to_2
         (.equals modulus 2)
         (.mod n modulus)

         ;; http://www.mersennewiki.org/index.php/Modular_Square_Root#Modulus_congruent_to_3_modulo_4
         (or (= mod8 3) (= mod8 7))
         (let [m (-> modulus (.add 1) .normalize .halveM .halveM)]
           (.powermod n m modulus))

         ;; http://www.mersennewiki.org/index.php/Modular_Square_Root#Modulus_congruent_to_5_modulo_8
         (= mod8 5)
         (let [m (-> modulus (.sub 5) .normalize .halveM .halveM .halveM)
               v (.powermod (.add n n) m modulus)
               i (-> (.multiply v v) (.multiply n) (.multiply 2) (.sub 1) (.mod modulus))]
           (-> n (.multiply v) (.multiply i) (.mod modulus)))

         ;; http://www.mersennewiki.org/index.php/Modular_Square_Root#Modulus_congruent_to_1_modulo_8
         (= mod8 1)
         (let [q   (-> modulus (.sub 1) .normalize)
               e   (->> q
                        (iterate #(.halveM %))
                        (take-while even?)
                        count)
               two (sjcl.bn. 2)
               z   (->> (range) rest rest
                        (map #(sjcl.bn. %))
                        (map #(.powermod % q modulus))
                        (filter
                          #(not
                             (.equals
                               (.powermod % (.pow two (- e 1)) modulus)
                               1)))
                        first)
               x   (.powermod n (-> q (.sub 1) .normalize .halveM) modulus)]
           (loop [y z,
                  r e,
                  v (-> n (.multiply x) (.mod modulus)),
                  w (-> n (.multiply x) (.multiply x) (.mod modulus))]
             (if (.equals w 1)
               v
               (let [k (->> (range)
                            (map #(vector
                                    %
                                    (.powermod w (.pow two %) modulus)))
                            (filter #(.equals (second %) 1))
                            first first)
                     d (.powermod y (.pow two (- r k 1)) modulus)
                     y (.mod (.multiply d d) modulus)
                     v (.mod (.multiply d v) modulus)
                     w (.mod (.multiply w y) modulus)]
                 (recur y k v w)))))

         :else
         (throw (ex-info "Cannot compute a square root for a non-prime modulus"
                         {:argument n,
                          :modulus  modulus}))))))

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
        pair-hex        {:private (biginteger->hex private)
                         :public  (encodings/x962-encode x y)}]

    #?(:clj  pair-hex
       :cljs (clj->js pair-hex))))

(defn public-key-from-private
  [private]
  (let [private-bn #?(:clj (cond
                             (instance? java.math.BigInteger private) private
                             (string? private) (BigInteger. private 16))
                      :cljs (-> (sjcl.bn.) (.initWith private)))]

    #?(:clj  (-> secp256k1 .getG (.multiply private-bn) .normalize format-public-key)
       :cljs (.mult (.-G secp256k1) private-bn format-public-key))))




;private-bn #?(:clj (cond
;                              (instance? java.math.BigInteger private) private
;                              (string? private) (BigInteger. private 16))

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
                                  ;; What is this 15 and 2? Version?
                                  (->> (concat [0x0F 0x02]))
                                  byte-array)
                 checksum     (-> pub-prefixed
                                  sha2/sha2-256
                                  sha2/sha2-256
                                  (#(take 4 %)))]
             (alphabase/byte-array-to-base (concat pub-prefixed checksum) output-format))
     :cljs (throw (ex-info "NOT YET IMPLEMENTED" {}))
     ))

(comment
  (alphabase/string->bytes "024f269661f8245a078144d1ae438abfe05e9c43d426316f529e63da8a037a2105")
  (get-sin-from-public-key "024f269661f8245a078144d1ae438abfe05e9c43d426316f529e63da8a037a2105")

  )

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
   (let [private-bn #?(:clj (cond
                              (instance? java.math.BigInteger private) private
                              (string? private) (BigInteger. private 16))
                       :cljs (-> (sjcl.bn.) (.initWith private)))]
     (when-not (valid-private? private-bn)
       (throw (ex-info "Invalid private key. Must be big integer and >= 1, <= curve modulus." {})))
     #?(:clj  {:private private-bn
               :public  (-> secp256k1 .getG (.multiply private-bn) .normalize)}
        :cljs #js {:private private-bn
                   :public  (.mult (.-G secp256k1) private-bn)}))))


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
                 pk           (biginteger->bytes priv-key)
                 left-padding (repeat (- curve-bytes (count hash-ba)) 0)
                 hash         (concat left-padding hash-ba)
                 k            (hmac/hmac-sha256 (concat v [0] pk hash) k)
                 v            (hmac/hmac-sha256 v k)
                 k            (hmac/hmac-sha256 (concat v [1] pk hash) k)
                 v            (hmac/hmac-sha256 v k)]
             (assert (= (count hash) curve-bytes)
                     "Hash should have the same number of bytes as the curve modulus")
             (-> (hmac/hmac-sha256 v k)
                 bytes->biginteger))))


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
                 y-odd? (-> kp .-y bn-even? not)]
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
    (encodings/DER-encode-ECDSA-signature r s recovery-byte secp256k1)))


(defn ^:export sign
  "Sign some message with provided private key.
  Message must be a byte-array or string.
  Private key must be hex-encoded or a BigInteger(clj)/bignumber(cljs)."
  [message private-key]
  (let [msg-ba     (if (string? message)
                     (alphabase/string->bytes message)
                     message)
        private-bn (if (string? private-key)
                     (hex->biginteger private-key)
                     private-key)
        hash       (sha2/sha2-256 msg-ba)]
    (sign-hash hash private-bn true)))



(defn- compute-point
  "Compute an elliptic curve point for a y-coordinate parity and x-coordinate"
  [y-even? x-coordinate]
  (let [raw   (->> x-coordinate
                   biginteger
                   .toByteArray)
        l     (-> secp256k1 .getN .bitLength (/ 8))
        input (cond (= l (count raw)) raw
                    (< l (count raw)) (drop-while zero? raw)
                    (> l (count raw))
                    (let [out (byte-array l)]
                      (System/arraycopy
                        raw 0
                        out (- l (count raw))
                        (count raw))
                      out))]
    (-> (cons (if y-even? 0x02 0x03) input)
        byte-array
        alphabase/bytes->hex
        (encodings/x962-decode secp256k1))))


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
  (let [l #?(:clj       (-> secp256k1 .getN .bitLength (/ 8))
             :cljs (-> secp256k1 .-r .bitLength (/ 8)))
        _               (assert (= l (count hash))
                                (str "Hash should have " l " bytes, but had " (count hash) "."))
        y-even?         (even? (- recovery-byte 0x1B))
        is-second-key?  (odd? (-> recovery-byte
                                  (- 0x1B)
                                  (bit-shift-right 1)))
        n #?(:clj       (.getN secp256k1) :cljs (.getN secp256k1))
        R               (compute-point y-even? (if is-second-key? (.add r n) r))
        r-inv           (.modInverse r n)
        hash-bi #?(:clj (BigInteger. 1 hash) :cljs (bytes->biginteger hash))
        e-inv #?(:clj   (.subtract n hash-bi)
                 :cljs (.sub n hash-bi))]
    (-> #?(:clj  (ECAlgorithms/sumOfTwoMultiplies (.getG secp256k1) e-inv R s)
           :cljs (.mult e-inv (.-G secp256k1) s R))
        (.multiply r-inv))))


(defn recover-public-key-from-hash
  "Recover a public key from a hash byte-array and signature (hex)."
  [hash signature]
  (let [{:keys [recover R S]} (encodings/DER-decode-ECDSA-signature signature)
        recover  (int recover)]
    (-> (ecrecover hash recover R S)
        .normalize
        format-public-key)))

(defn recover-public-key
  "Recover a public key from original message and signature (hex) of the
  message's sha2-256 hash."
  [input signature]
  (let [hash (sha2/sha2-256 (alphabase/string->bytes input))]
    (recover-public-key-from-hash hash signature)))

#?(:clj (defn verify-signature-from-hash
          [key hash signature]
          (let [[head1 head2] (take 2 signature)]
            (cond (and (#{0x1B 0x1C 0x1D 0x1E} head1) (= head2 0x30))
                  (= key
                     (recover-public-key-from-hash hash (alphabase/bytes->hex signature)))

                  ;(= head1 0x30)
                  ;(verify-ECDSA-signature-from-hash pub-key input sig-bytes)

                  :else
                  (throw (ex-info "Unknown signature header"
                                  {:key       key
                                   :hash      hash
                                   :signature signature}))))))


(defn ^:export verify
  "Verifies a message given a signature.
  Assumes signature is DER-encoded with a recovery byte."
  [message signature]
  #?(:clj (let [pubkey (recover-public-key message signature)
                hash (sha2/sha2-256 (alphabase/string->bytes message))
                sig-bytes (alphabase/base-to-byte-array signature :hex)]
            (verify-signature-from-hash pubkey hash sig-bytes))
     :cljs (throw (ex-info "NOT YET IMPLEMENTED" {}))))







(comment

  (verify "hi9" "1c3045022100f2387abf0e12199bda0773684ed5542b8aa2cff7ae5453a38a0338e99807f1a902206b1e978705d494582a17ecc5388760d2b391a2b7d499a4a3e404cdf0a8637c96"
          )

  (def sig "1c3045022100f2387abf0e12199bda0773684ed5542b8aa2cff7ae5453a38a0338e99807f1a902206b1e978705d494582a17ecc5388760d2b391a2b7d499a4a3e404cdf0a8637c96")


  (def sig-bytes (alphabase/base-to-byte-array sig :hex))

  sig-bytes

  (take 2 sig-bytes)



  (in-ns 'fluree.crypto.secp256k1)





  (def kp (generate-key-pair))
  kp


  (sign "hi" (.-private kp))

  (-> (sign "hi" (:private kp))
      (alphabase/bytes->hex))

  (-> (sign "hi" (.-private kp))
      #_(alphabase/bytes->hex))

  (byte 28)

  (cons (byte 28) (.getBytes "hi there Brian how are you"))



  (deterministic-generate-k (hmac/hmac-sha256 (alphabase/string->bytes "hi") (alphabase/string->bytes "there"))
                            (.initWith (sjcl.bn.) "0893fd137937bb72a27d926c20616b051e2a68b367c1f13fd0e8ae41ece1a325")
                            secp256k1)


  (let [hash-ba      (hmac/hmac-sha256 (alphabase/string->bytes "hi") (alphabase/string->bytes "there"))
        priv-key     (.initWith (sjcl.bn.) "0893fd137937bb72a27d926c20616b051e2a68b367c1f13fd0e8ae41ece1a325")
        pk           (biginteger->bytes priv-key)
        curve        secp256k1
        l            (-> curve .-r .bitLength)
        curve-bytes  (/ l 8)
        v            (repeat curve-bytes 0x01)
        k            (repeat curve-bytes 0x00)
        left-padding (repeat (- curve-bytes (count hash-ba)) 0)
        hash         (concat left-padding hash-ba)
        k            (hmac/hmac-sha256 (concat v [0] pk hash) k)
        v            (hmac/hmac-sha256 v k)
        k            (hmac/hmac-sha256 (concat v [1] pk hash) k)
        v            (hmac/hmac-sha256 v k)]
    v

    )

  (-> (generate-key-pair "0893fd137937bb72a27d926c20616b051e2a68b367c1f13fd0e8ae41ece1a325"))

  )

