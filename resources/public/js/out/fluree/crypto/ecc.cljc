(ns fluree.crypto.ecc
  (:require [alphabase.core :as alphabase]
            #?@(:cljs [[sjcl.ecc :as ecc]
                       [sjcl.bn :as bn]
                       [sjcl.codec.hex :as codecHex]]))
  #?(:clj (:import (org.bouncycastle.crypto.generators ECKeyPairGenerator)
                   (org.bouncycastle.crypto.params ECKeyGenerationParameters ECDomainParameters)
                   (java.security SecureRandom)
                   (org.bouncycastle.asn1.sec SECNamedCurves))))

(defonce ^:private secp256k1
         #?(:cljs ecc/curves.k256
            :clj  (let [params (SECNamedCurves/getByName "secp256k1")]
                    (ECDomainParameters. (.getCurve params)
                                         (.getG params)
                                         (.getN params)
                                         (.getH params)))))


(defn ^:private pad-hex
  "Pads a hex value with a leading zero if odd."
  [hex]
  (if (odd? (count hex))
    (str "0" hex)
    hex))

(defn- biginteger->hex
  "Hex-encode java.math.BigInteger (clj) or sjcl.bn (cljs)."
  [bn]
  #?(:clj  (-> bn (.toString 16) pad-hex)
     :cljs (-> bn .toString (.replace #"^0x" "") pad-hex)))


(defn valid-private?
  "Returns true if private key, as big number/integer, is valid.
  Private key must be >= 1 and <= curve modulus."
  [private]
  #?(:clj  (and (<= 1 private)
                (<= private (.getN secp256k1)))
     :cljs (and
             (.greaterEquals private 1)
             (.greaterEquals (.-r secp256k1) private))))


(defn x962-encode
  "Encodes x and y coords in hex to X9.62 with optional compression (default true).
  x coords and y coords should be supplied in hex format."
  ([x-coord y-coord] (x962-encode x-coord y-coord true))
  ([x-coord y-coord compressed?]
   (if-not compressed?
     (str "04" (pad-hex x-coord) (pad-hex y-coord))
     (let [y-even? #?(:clj (let [y-bi (BigInteger. y-coord 16)]
                             (even? y-bi))
                      :cljs (let [y-bn (-> (sjcl.bn.) (.initWith y-coord))]
                              (.equals (.mod y-bn 2) 0)))]
       (if y-even?
         (str "02" (pad-hex x-coord))
         (str "03" (pad-hex x-coord)))))))


(defn format-key-pair
  "Takes internal representation of a key-pair and returns X9.62 compressed encoded
  public key and private key as a map, with each value hex encoded."
  [pair]
  (let [private #?(:clj (:private pair) :cljs (.-private pair))
        public #?(:clj  (:public pair) :cljs (.-public pair))
        x #?(:clj       (-> public .getAffineXCoord .toBigInteger (.toString 16))
             :cljs (-> public .-x .toString (.replace #"^0x" "") pad-hex))
        y #?(:clj       (-> public .getAffineYCoord .toBigInteger (.toString 16))
             :cljs (-> public .-y .toString (.replace #"^0x" "") pad-hex))
        pair-hex        {:private (biginteger->hex private)
                         :public  (x962-encode x y)}]

    #?(:clj  pair-hex
       :cljs (clj->js pair-hex))))


(defn generate-key-pair*
  "Generates an internal representation of key pair from a secure random seed or provided private key.
  Returns map/object with two keys:
   - public  - a big number/integer
   - private - a curve point"
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







(comment

  (in-ns 'fluree.crypto.ecc)

  (= "0225582ea8a1a5aa753fcf88abd2cc2cd9dbb1a59b8458c1b5214b136e5ac425c5"
     "0225582ea8a1a5aa753fcf88abd2cc2cd9dbb1a59b8458c1b5214b136e5ac425c5")


  (-> (generate-key-pair "0893fd137937bb72a27d926c20616b051e2a68b367c1f13fd0e8ae41ece1a325"))




  (-> (generate-key-pair*)
      .-public
      .-x
      .toString
      (.replace #"^0x" "")
      (#(if (odd? (count %))
          (str "0" %)
          %))
      (js/console.log))

  (def private-bn (-> (ecc/ecdsa.generateKeys secp256k1)
                      (.-sec)
                      (.get)
                      (bn/fromBits)))
  (-> (sjcl.bn.) (.initWith private-bn))

  (-> secp256k1
      .-G
      (js/console.log))
  (-> (.-G secp256k1)
      (.mult private-bn)
      (js/console.log))


  (generate-key-pair*)


  (public-key-from-private 71914036746851057431109628986526599636044084379211507296351504044400838434931)


  (-> (ECKeyPairGenerator.)
      (doto (.init
              (ECKeyGenerationParameters.
                secp256k1
                (SecureRandom.))))
      .generateKeyPair
      .getPrivate .getD
      ;private-key
      )

  )

