(ns alphabase.base58
  "Base58-check encoding implementation."
  (:require [alphabase.codec :as abc]
            [clojure.set :as set]))

(def ^:const base58-chars "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")
(def ^:const base58-set (set base58-chars))

(defn base58?
  "Outputs if a string is hexadecimal or not"
  [x]
  (and (string? x) (set/subset? (set x) base58-set)))


(defn encode
  "Converts a byte array into a base58-check string."
  ^String
  [data]
  (abc/encode base58-chars data))


(defn decode
  "Decodes a base58-check string into a byte array."
  ^bytes
  [tokens]
  (abc/decode base58-chars tokens))
