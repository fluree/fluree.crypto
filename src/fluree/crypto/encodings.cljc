(ns fluree.crypto.encodings
  (:require [clojure.string :as str]
    #?@(:cljs [[fluree.crypto.asn1 :as asn1]
               [sjcl.ecc :as ecc]
               [sjcl.bn :as bn]
               [sjcl.codec.hex :as codecHex]
               [sjcl.codec.bytes :as codecBytes]])
            [alphabase.core :as alphabase])
  #?(:clj
     (:import (org.bouncycastle.asn1 ASN1Integer DERSequenceGenerator ASN1InputStream)
              (java.io ByteArrayOutputStream))))


(defn ^:export pad-hex
  "Pads a hex value with a leading zero if odd."
  [hex]
  (if (odd? (count hex))
    (str "0" hex)
    hex))


;; X92.61 encode / decode


(defn- x962-hex-compressed-decode
  [encoded-key curve]
  #?(:cljs
          (let [x       1
                ;(-> encoded-key (subs 2) bn.)
                y-even? (= (subs encoded-key 0 2) "02")]
            ;(compute-point y-even? x)
            )
     :clj (let [point (.decodePoint (.getCurve curve) (alphabase/base-to-byte-array encoded-key :hex))
                x     (-> point .getXCoord .toBigInteger)
                y     (-> point .getYCoord .toBigInteger)]
            (-> curve
                .getCurve
                (.createPoint x y true)
                .normalize
               )
            ))

  )


(defn- x962-hex-uncompressed-decode
  "Decode a hex encoded public key into x and y coordinates as bytes."
  [encoded-key]
  #?(:cljs (let [size (- (count encoded-key) 2)             ;; first hex byte is 0x04, rest is x and y coords
                 x    (subs encoded-key 2 (+ 2 size))
                 y    (subs encoded-key (+ 2 size))]
             #js {:x (.initWith (sjcl.bn.) x)
                  :y (.initWith (sjcl.bn.) y)})
     :clj  (throw (Exception. "NOT YET IMPLEMENTED"))))


(defn x962-decode
  "Decode a X9.62 encoded public key from hex"
  [public-key curve]
  (assert (#{"02" "03" "04"} (subs public-key 0 2)) "X9.62 encoded public key must have a first byte of 0x02, 0x03 or 0x04.")
  (cond
    (#{"02" "03"} (subs public-key 0 2))
    (x962-hex-compressed-decode public-key curve)

    (= "04" (subs public-key 0 2))
    (x962-hex-uncompressed-decode public-key)

    :else
    (throw (ex-info "Invalid encoding on public key"
                    {:encoded-key public-key}))))


(defn x962-encode
  "Encodes x and y coords in hex to X9.62 with optional compression (default true).
  x coords and y coords should be supplied in hex format."
  ([x-coord y-coord] (x962-encode x-coord y-coord true))
  ([x-coord y-coord compressed?]
   (if-not compressed?
     (str "04" (pad-hex x-coord) (pad-hex y-coord))
     (let [y-even? #?(:clj (let [y-bi (BigInteger. y-coord 16)]
                             (even? y-bi))
                      :cljs (-> (sjcl.bn.)
                                (.initWith y-coord)
                                ;(bn-even?)
                                ))]
       (if y-even?
         (str "02" (pad-hex x-coord))
         (str "03" (pad-hex x-coord)))))))



;; DER encode / decode

(defn- DER-decode-standard
  "Decodes an ordinary encoded list of numbers from a hexadecimal following the distinguished encoding rules. Returns R and S as bigintegers (clj). "
  [asn1]
  (assert (= "30" (subs asn1 0 2)), "Input must start with the code 30")
  #?(:clj  (let [signature (alphabase/base-to-byte-array asn1 :hex)]
             (with-open [decoder (ASN1InputStream. signature)]
               (let [sequence (.readObject decoder)]
                 [(-> sequence (.getObjectAt 0) .getValue)
                  (-> sequence (.getObjectAt 1) .getValue)])))
     :cljs (let [{:keys [length remaining]} (asn1/decode-asn1-length (subs asn1 2))]
             (when-not (= (* length 2) (count remaining))
               (throw (ex-info "Decoded header length does not match actual length of message"
                               {:decoded-header-length (* 2 length)
                                :actual-length         (count remaining)
                                :message               remaining
                                :full-asn1             asn1})))
             (loop [ret [], remaining remaining]
               (if (empty? remaining)
                 ret
                 (let [{:keys [integer remaining]} (asn1/decode-asn1-integer remaining)]
                   (recur (conj ret integer) remaining)))))))


(defn DER-decode
  "Decodes a list of numbers including an optional recovery byte, following BitCoin's convention"
  [asn1]
  (let [asn1       (str/lower-case asn1)
        first-byte (subs asn1 0 2)]
    (cond
      (#{"1b" "1c" "1d" "1e"} first-byte)                   ;; recovery bytes
     (conj (DER-decode-standard (subs asn1 2))
           (-> first-byte (alphabase/base-to-base :hex :biginteger)))

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
  [R S recover curve]
  #?(:cljs (let [l           (-> curve .-r .bitLength)
                 R-hex       (-> R (.toBits l) codecHex/fromBits)
                 S-hex       (-> S (.toBits l) codecHex/fromBits)
                 recover-hex (.toString recover 16)
                 R-asn1      (asn1/encode-asn1-unsigned-integer-hex R-hex)
                 S-asn1      (asn1/encode-asn1-unsigned-integer-hex S-hex)]
             (->> (str R-asn1 S-asn1)
                  (asn1/encode-asn1-unsigned-integer-hex)
                  (#(subs % 2))
                  (str recover-hex "30")))
     :clj  (let [bos (ByteArrayOutputStream.)]
             (with-open [der-gen (DERSequenceGenerator. bos)]
               (doto der-gen
                 (.addObject (ASN1Integer. R))
                 (.addObject (ASN1Integer. S))))
             (let [result (.toByteArray bos)]
               (if (nil? recover)
                 result
                 (byte-array (cons recover result)))))))


;
