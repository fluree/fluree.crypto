(ns fluree.crypto.asn1
  (:require ["@fluree/sjcl" :as sjcl]))

;; TODO - convert this library to work on bytes, and do hex conversion as needed outside here

(defn encode-asn1-length-hex
  [len]
  (.toString len 16))

(defn decode-asn1-length
  [asn1]
  (let [len (-> asn1 (subs 0 2) (js/parseInt 16))]
    (when-not (zero? (bit-and len 0x80))
      (throw (ex-info "Lengths greater than 0x80 not supported"
                      {:length len
                       :asn1   asn1})))
    {:length    len
     :remaining (subs asn1 2)}))

(defn format-asn1-unsigned-integer-hex
  "Formats a hexadecimal encoding an unsigned integer, dropping left zeros and
  padding with a left zero if necessary to avoid being confused for a two's complement"
  [n]
  (let [bytes  (drop-while zero? (-> n sjcl/codec.hex.toBits sjcl/codec.bytes.fromBits))
        bytes* (clj->js
                (if-not (zero? (bit-and (first bytes) 0x80))
                  (cons 0 bytes)
                  bytes))]
    (-> bytes*
        sjcl/codec.bytes.toBits
        sjcl/codec.hex.fromBits)))

(defn format-asn1-unsigned-integer
  "Formats a byte encoded unsigned integer, dropping left zeros and
  padding with a left zero if necessary to avoid being confused for a two's complement"
  [ba]
  (let [bytes (drop-while zero? ba)]
    (if-not (zero? (bit-and (first bytes) 0x80))
      (clj->js (cons 0 bytes))
      bytes)))

(defn encode-asn1-unsigned-integer-hex
  "Formats a hexadecimal as an unsigned integer, padding and prepending a length"
  [n]
  (let [formatted-n (format-asn1-unsigned-integer-hex n)
        len         (-> formatted-n
                        count
                        (/ 2)
                        encode-asn1-length-hex)]
    (str "02" len formatted-n)))

(defn encode-asn1-unsigned-integer
  "Formats a byte array as an unsigned integer, padding and prepending a length"
  [ba]
  (let [formatted-n (format-asn1-unsigned-integer ba)
        size        (count formatted-n)]
    (clj->js (concat [2 size] formatted-n))))

(defn decode-asn1-integer
  "Decodes an int from the top of an ASN.1 encoded string"
  [asn1]
  (assert (= (subs asn1 0 2) "02"), "ASN.1 must have a 02 tag for an integer")
  (let [{:keys [length remaining]} (decode-asn1-length (subs asn1 2))]
    {:integer   (subs remaining 0 (* 2 length))
     :remaining (subs remaining (* 2 length))}))

(comment
  (in-ns 'fluree.crypto.asn1)

  (encode-asn1-unsigned-integer-hex "cbd32e463567fefc2f120425b0224d9d263008911653f50e83953f47cfbef3bc")

  (->> "cbd32e463567fefc2f120425b0224d9d263008911653f50e83953f47cfbef3bc"
       codecHex/toBits codecBytes/fromBits
       (drop-while zero?)
       (clj->js)
       codecBytes/toBits
       codecHex/fromBits)

  (->> "cbd32e463567fefc2f120425b0224d9d263008911653f50e83953f47cfbef3bc"
       codecHex/toBits codecBytes/fromBits
       (drop-while zero?)
       (count))

  (bit-and 5 0x80))
