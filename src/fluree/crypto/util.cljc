(ns fluree.crypto.util
  (:require [fluree.crypto.sha3 :as sha3]
            [alphabase.core :as alphabase]))

#?(:clj (set! *warn-on-reflection* true))

(defn hash-string-key
  "Takes a sha3-512 hash of provided string key and returns n bytes.

  If the number of bytes is not specified, defaults to 32 bytes."
  [key n]
  (assert (<= n 512))
  (let [hash-512 (sha3/sha3-512 (if (string? key)
                                  (alphabase/string->bytes key)
                                  key))]
    #?(:clj  (take n hash-512)
       :cljs (.slice hash-512 0 n))))