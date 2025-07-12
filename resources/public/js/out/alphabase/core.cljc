(ns alphabase.core
  (:require [alphabase.base64 :as base64]
            [alphabase.base58 :as base58]
            [alphabase.codec :as codec]
            [alphabase.hex :as ahex]
            #?@(:cljs [[goog.crypt :as gcrypt]])))


(defn string->bytes
  "Converts string to UTF-8 bytes"
  [s]
  #?(:clj  (.getBytes ^String s)
     :cljs (gcrypt/stringToByteArray s)))


(defn bytes->string
  "Converts UTF8 byte array to string"
  [ba]
  #?(:clj  (String. ba)
     :cljs (gcrypt/byteArrayToString ba)))


(defn biginteger->bytes
  [bint]
  #?(:cljs (throw (js/Error. "Biginteger is not supported in cljs."))
     :clj  (->> bint
                biginteger
                .toByteArray
                (drop-while zero?)
                byte-array)))


(defn bytes->biginteger
  [ba]
  #?(:cljs (throw (js/Error. "Biginteger is not supported in cljs."))
     :clj  (BigInteger. 1 ba)))


(defn encode
  [alphabet ^bytes data]
  (codec/encode alphabet data))


(defn decode
  [alphabet tokens]
  (codec/decode alphabet tokens))


(defn bytes->base58
  "Converts bytes to base-58"
  [b]
  (base58/encode b))


(defn base58->bytes
  "Converts bytes to base-58"
  [b58]
  (base58/decode b58))


(defn bytes->base64
  "Converts bytes to base-64"
  [b]
  (base64/encode b))


(defn base64->bytes
  "Converts bytes to base-64"
  [b64]
  (base64/decode b64))


(defn hex->bytes
  [hex]
  (ahex/decode hex))


(defn bytes->hex
  [b]
  (ahex/encode b))


(defn base58?
  "Test if a string is base58"
  [x]
  (base58/base58? x))


(defn base64?
  "Test if a string is base58"
  [x]
  (base64/base64? x))


(defn hex?
  "Test if a string is base58"
  [x]
  (ahex/hex? x))


(defn base58-to-hex
  "Encodes a base58-string as a hex-string"
  [data]
  (-> data
      base58->bytes
      bytes->hex))


(defn hex-to-base58
  "Encodes a hex-string as a base58-string"
  [data]
  (assert (hex? data) "Input must be hexadecimal")
  (-> data
      hex->bytes
      bytes->base58))


(defn byte-array-to-base
  [data output-format]
  (let [ba #?(:clj (byte-array data)
              :cljs data)]
    (case output-format
      :hex (bytes->hex ba)
      :base64 (bytes->base64 ba)
      :base58 (bytes->base58 ba)
      :bytes ba
      :biginteger (bytes->biginteger ba)
      :string (bytes->string ba)
      :none ba
      nil ba
      (throw (ex-info "Unsupported output-format"
                      {:data          data
                       :output-format output-format})))))


(defn base-to-byte-array
  "Convert data of specified base to a byte-array"
  ([data] (base-to-byte-array data (if (string? data) :string :bytes)))
  ([data format]
   (case format
     :hex (hex->bytes data)
     :base64 (base64->bytes data)
     :base58 (base58->bytes data)
     :bytes #?(:clj  (byte-array data)
               :cljs data)
     :string (string->bytes data)
     :biginteger (biginteger->bytes data)
     (throw (ex-info "Unsupported format"
                     {:data   data
                      :format format})))))


(defn base-to-base
  "Convert one base into another"
  [data input-format output-format]
  (cond
    (nil? data)
    data

    (= input-format output-format)
    data

    :else
    (-> data
        (base-to-byte-array input-format)
        (byte-array-to-base output-format))))

