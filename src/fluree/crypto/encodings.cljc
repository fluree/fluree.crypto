(ns fluree.crypto.encodings
  (:require [clojure.string :as str]
            #?@(:cljs [[fluree.crypto.asn1 :as asn1]])
            [alphabase.core :as alphabase])
  #?(:clj
     (:import (org.bouncycastle.asn1 ASN1Integer
                                     ASN1InputStream
                                     ASN1Sequence
                                     DERSequenceGenerator)
              (org.bouncycastle.crypto.params ECDomainParameters)
              (org.bouncycastle.math.ec ECPoint)
              (java.io ByteArrayOutputStream))))

#?(:clj (set! *warn-on-reflection* true))

(defn ^:export pad-hex
  "Pads a hex value with a leading zero if odd."
  [hex]
  (if (odd? (count hex))
    (str "0" hex)
    hex))

(defn biginteger->hex
  "Hex-encode java.math.BigInteger (clj) or BigInt (cljs)."
  [bn]
  #?(:clj  (-> ^BigInteger bn (.toString 16) pad-hex)
     :cljs (-> bn .toString (.replace #"^0x" "") pad-hex)))

(defn biginteger->bytes
  "Return bytes of java.math.BigInteger (clj) or BigInt (cljs)."
  ([bn] (biginteger->bytes bn nil))
  ([bn l]
   #?(:clj  (-> ^BigInteger bn .toByteArray)
      :cljs (let [hex-str (.toString bn 16)
                  hex-str (if (odd? (count hex-str)) (str "0" hex-str) hex-str)]
              (alphabase/hex->bytes hex-str)))))

(defn bytes->biginteger
  "Return bytes of java.math.BigInteger (clj) or BigInt (cljs)."
  [^bytes ba]
  #?(:clj  (BigInteger. ba)
     :cljs (js/BigInt (str "0x" (alphabase/bytes->hex ba)))))

(defn hex->biginteger
  "Return bytes of java.math.BigInteger (clj) or BigInt (cljs)."
  [^String hex]
  #?(:clj  (BigInteger. hex 16)
     :cljs (js/BigInt (str "0x" hex))))

(defn byte->int [the-bytes]
  (let [the-bytes (bytes the-bytes)]
    (-> (aget the-bytes 0)
        int)))

#?(:cljs
   (defn bn-even?
     "Tests if a BigInt (cljs) is even. Returns boolean if so."
     [big-int]
     (= (mod big-int 2) 0)))


;; adapted from https://github.com/Sepia-Officinalis/secp256k1
#?(:cljs
   (defn modular-square-root
     "Compute the square root of a number modulo a prime.
     Number and modulus should be big numbers (bn)."
     [n modulus]
     (let [n    (.mod n modulus)
           mod8 (-> modulus (.mod 8) .toString js/parseInt)]
       (assert (>= modulus 0), "Modulus must be non-negative")
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
               two (js/BigInt 2)
               z   (->> (range) rest rest
                        (map #(js/BigInt %))
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


(defn pad-to-length
  "Left-pads string s to length len with zeroes."
  [s len]
  (let [pad-len (- len (count s))]
    (if (pos? pad-len)
      (str/join (concat (repeat pad-len \0) s))
      s)))


(defn compute-point
  "Compute an elliptic curve point for a y-coordinate parity and x-coordinate"
  [y-even? x-coordinate ^ECDomainParameters curve]
  #?(:clj
     (let [l     (-> curve .getN .bitLength (/ 8))
           raw   (->> x-coordinate
                      biginteger
                      .toByteArray)
           input (cond (= l (count raw)) raw
                       (< l (count raw)) (drop-while zero? raw)
                       (> l (count raw)) (let [out (byte-array l)]
                                           (System/arraycopy
                                             raw 0
                                             out (- l (count raw))
                                             (count raw))

                                           out))]
       (-> (cons (if y-even? 0x02 0x03) input)
           byte-array
           alphabase/bytes->hex
           (pad-to-length 64)))

     :cljs
     (let [modulus     (-> curve .-field .-modulus)
           ; √(x * (a + x**2) + b) % p
           y-candidate (modular-square-root
                         (.add
                           (.mul x-coordinate (.add (.-a curve) (.square x-coordinate)))
                           (.-b curve))
                         modulus)
           y           (if (= y-even? (bn-even? y-candidate))
                         y-candidate
                         (.sub modulus y-candidate))]
       #js {:x x-coordinate
            :y y})))

;; X92.61 encode / decode

(defn- x962-hex-compressed-decode
  [encoded-key ^ECDomainParameters curve]
  #?(:cljs
     (let [x       (-> (subs encoded-key 2) hex->biginteger)
           y-even? (= (subs encoded-key 0 2) "02")]
       (compute-point y-even? x curve))
     :clj (let [point (.decodePoint (.getCurve curve)
                                    (alphabase/base-to-byte-array
                                      encoded-key :hex))
                x     (-> point .getXCoord .toBigInteger)
                y     (-> point .getYCoord .toBigInteger)]
            (-> curve
                .getCurve
                (.createPoint x y)
                .normalize))))


(defn- x962-hex-uncompressed-decode
  "Decode a hex encoded public key into x and y coordinates as bytes."
  [encoded-key ^ECDomainParameters curve]
  (let [size (- (count encoded-key) 2) ;; first hex byte is 0x04, rest is x and y coords
        x    (subs encoded-key 2 (+ 2 size))
        y    (subs encoded-key (+ 2 size))]

    #?(:clj  (-> curve .getCurve (.createPoint x y) .normalize)
       :cljs #js {:x (js/BigInt (str "0x" x))
                  :y (js/BigInt (str "0x" y))})))


(defn x962-decode
  "Decode a X9.62 encoded public key from hex"
  ^ECPoint
  [public-key curve]
  (when-not (#{"02" "03" "04"} (subs public-key 0 2))
    (throw
      (ex-info
        "X9.62 encoded public key must have a first byte of 0x02, 0x03 or 0x04."
        {:public-key public-key})))
  (cond
    (#{"02" "03"} (subs public-key 0 2))
    (x962-hex-compressed-decode public-key curve)

    (= "04" (subs public-key 0 2))
    (x962-hex-uncompressed-decode public-key curve)

    :else
    (throw (ex-info "Invalid encoding on public key"
                    {:encoded-key public-key}))))


(defn x962-encode
  "Encodes x and y coords in hex to X9.62 with optional compression (default true).
  x coords and y coords should be supplied in hex format."
  ([x-coord y-coord] (x962-encode x-coord y-coord true))
  ([^String x-coord ^String y-coord compressed?]
   (if-not compressed?
     (str "04" (pad-hex x-coord) (pad-hex y-coord))
     (let [y-even? #?(:clj (let [y-bi (BigInteger. y-coord 16)]
                             (even? y-bi))
                      :cljs (-> (js/BigInt (str "0x" y-coord))
                                (bn-even?)))]
       (if y-even?
         (str "02" (pad-to-length (pad-hex x-coord) 64))
         (str "03" (pad-to-length (pad-hex x-coord) 64)))))))


;; DER encode / decode

(defn- DER-decode-standard
  "Decodes an ordinary encoded list of numbers from a hexadecimal following the distinguished encoding rules.
  Returns R and S as bigintegers (clj). "
  [asn1]
  (assert (= "30" (subs asn1 0 2)), "Input must start with the code 30")
  #?(:clj  (let [^bytes signature (alphabase/base-to-byte-array asn1 :hex)]
             (with-open [decoder (ASN1InputStream. signature)]
               (let [^ASN1Sequence sequence (.readObject decoder)]
                 [(-> sequence ^ASN1Integer (.getObjectAt 0) .getValue)
                  (-> sequence ^ASN1Integer (.getObjectAt 1) .getValue)])))
     :cljs (let [{:keys [length remaining]} (asn1/decode-asn1-length (subs asn1 2))]
             (when-not (= (* length 2) (count remaining))
               (throw (ex-info "Decoded header length does not match actual length of message"
                               {:decoded-header-length (* 2 length)
                                :actual-length         (count remaining)
                                :message               remaining
                                :full-asn1             asn1})))
             (loop [ret [], remaining remaining]
               (if (empty? remaining)
                 (mapv hex->biginteger ret)
                 (let [{:keys [integer remaining]} (asn1/decode-asn1-integer remaining)]
                   (recur (conj ret integer) remaining)))))))


(defn DER-decode
  "Decodes a list of numbers including an optional recovery byte, following BitCoin's convention"
  [asn1]
  (let [asn1       (str/lower-case asn1)
        first-byte (subs asn1 0 2)]
    (cond
      (#{"1b" "1c" "1d" "1e"} first-byte) ;; recovery bytes
      (-> (conj (DER-decode-standard (subs asn1 2))
                (-> (alphabase/hex->bytes first-byte)
                    byte->int)))

      (= "30" first-byte)
      (DER-decode-standard asn1)

      :else
      (throw (ex-info "Input must start with the code 30, or start with a recovery code (either 1b, 1c, 1d, or 1e)"
                      {:argument asn1})))))


(defn DER-decode-ECDSA-signature
  "Formats an ECDSA signature from hex.
  Returns R, S and recover as hex values."
  [ecdsa]
  (let [[R S recover] (DER-decode ecdsa)]
    {:R       R
     :S       S
     :recover recover}))


;; TODO - should be able to take biginteger/bignumber, convert to bytes, then
;; TODO - use a common clojure/script ASN1 capability (started in fluree.crypto.asn1.cljs)
(defn DER-encode-ECDSA-signature
  "Create a DER encoded signature.
  Both R and S should be bigintegers (clj) /bignumbers (cljs).
  recover should also be biginteger"
  [^BigInteger R ^BigInteger S recover curve]
  #?(:cljs (let [R-hex       (.toString R 16)
                 S-hex       (.toString S 16)  
                 recover-hex (.toString recover 16)
                 R-asn1      (asn1/encode-asn1-unsigned-integer-hex R-hex)
                 S-asn1      (asn1/encode-asn1-unsigned-integer-hex S-hex)]
             (->> (str R-asn1 S-asn1)
                  (asn1/encode-asn1-unsigned-integer-hex)
                  (#(subs % 2))
                  (str recover-hex "30")
                  alphabase/hex->bytes))
     :clj  (let [bos (ByteArrayOutputStream.)]
             (with-open [der-gen (DERSequenceGenerator. bos)]
               (doto der-gen
                 (.addObject (ASN1Integer. R))
                 (.addObject (ASN1Integer. S))))
             (let [result (.toByteArray bos)]
               (if (nil? recover)
                 result
                 (byte-array (cons recover result)))))))
