(ns alphabase.hex
  "Functions to encode and decode bytes as hexadecimal."
  (:require [alphabase.bytes :as bytes]
            [clojure.string :as str]
            [clojure.set :as set]))

(def ^:const hex-chars "0123456789ABCDEFabcdef")
(def ^:const hex-set (set hex-chars))


(defn hex?
  "Test if input is hex char set."
  [x]
  (and (string? x) (set/subset? (set x) hex-set)))


(defn byte->hex
  "Converts a single byte value to a two-character hex string."
  [value]
  (let [hex #?(:clj (Integer/toHexString value)
               :cljs (.toString value 16))]
    (if (= 1 (count hex))
      (str "0" hex)
      hex)))


(defn hex->byte
  "Converts a two-character hex string into a byte value."
  [hex]
  #?(:clj  (Integer/parseInt hex 16)
     :cljs (js/parseInt hex 16)))


(defn encode
  "Converts a byte array into a lowercase hexadecimal string. Returns nil for
  empty inputs."
  ^String
  [^bytes data]
  (when (and data (pos? (alength data)))
    (->> (bytes/byte-seq data)
         (map byte->hex)
         (str/join)
         (str/lower-case))))


(defn decode
  "Parses a hexadecimal string into a byte array. Ensures that the resulting
  array is zero-padded to match the hex string length."
  ^bytes
  [^String data]
  #?(:clj  (when-not (empty? data)
             (letfn [(unhexify-2 [c1 c2]
                     (unchecked-byte
                       (+ (bit-shift-left (java.lang.Character/digit ^char c1 16) 4)
                          (java.lang.Character/digit ^char c2 16))))]
             (byte-array (map #(apply unhexify-2 %) (partition 2 data)))))
     :cljs (when-not (empty? data)
             (let [length (/ (count data) 2)
                   array  (bytes/byte-array length)]
               (dotimes [i length]
                 (let [hex (subs data (* 2 i) (* 2 (inc i)))]
                   (bytes/set-byte array i (hex->byte hex))))
               array))))


(defn validate
  "Checks a string to determine whether it's well-formed hexadecimal. Returns
  an error string if the argument is invalid."
  ^String
  [value]
  (cond
    (not (string? value))
    (str "Value is not a string: " (pr-str value))

    (not (re-matches #"^[0-9a-fA-F]*$" value))
    (str "String '" value "' is not valid hex: "
         "contains illegal characters")

    (< (count value) 2)
    (str "Hex string must contain at least one byte")

    (odd? (count value))
    (str "String '" value "' is not valid hex: "
         "number of characters (" (count value) ") is odd")

    :else nil))


(defn valid?
  "Returns true if the string is valid hexadecimal."
  [value]
  (nil? (validate value)))
