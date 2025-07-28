(ns fluree.crypto.util
  (:require [fluree.crypto.sha2 :as sha2]
            [alphabase.core :as alphabase]))

#?(:clj (set! *warn-on-reflection* true))

(defn hash-string-key
  "Takes a sha2-512 hash of provided string key and returns n bytes.

  If the number of bytes is not specified, defaults to 32 bytes."
  [key n]
  (assert (<= n 64)) ; SHA2-512 produces 64 bytes, not 512
  (let [hash-512 (sha2/sha2-512 (if (string? key)
                                  (alphabase/string->bytes key)
                                  key))]
    #?(:clj  (take n hash-512)
       :cljs (.slice hash-512 0 n))))