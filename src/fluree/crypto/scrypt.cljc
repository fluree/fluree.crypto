(ns fluree.crypto.scrypt
  (:require
    [alphabase.core :as alphabase])
  #?(:clj
     (:import (com.lambdaworks.crypto SCryptUtil)
              (com.lambdaworks.crypto SCrypt)
              (java.security SecureRandom))))

#?(:clj (set! *warn-on-reflection* true))

(defn random-bytes
  "Returns a random byte array of the specified size.
  NOTE: This will only work in the browser, not for node.js"
  [size]
  (let [seed #?(:clj (byte-array size)
                :cljs (js/Uint8Array. size))]
    #?(:clj  (.nextBytes (SecureRandom.) seed)
       :cljs (js/window.crypto.getRandomValues seed))
    seed))

;; DEPRECATED: Scrypt encryption functions are no longer used
;; Use random-bytes for secure random number generation instead

(defn encrypt
  "DEPRECATED: Scrypt encryption is no longer supported in ClojureScript.
  This function is kept for compatibility but will throw an error in ClojureScript."
  ([raw]
   (encrypt raw (random-bytes 16)))
  ([raw salt]
   (encrypt raw salt 32768))
  ([raw salt n]
   (encrypt raw salt n 8 1))
  ([raw salt n r p]
   (encrypt raw salt n r p 32))
  ([raw salt n r p dk-len]
   #?(:clj  (SCrypt/scrypt raw salt n r p dk-len)
      :cljs (throw (ex-info "Scrypt encryption is no longer supported in ClojureScript. Use other crypto functions." {})))))

(defn check
  "DEPRECATED: Scrypt check is no longer supported in ClojureScript.
  This function is kept for compatibility but will throw an error in ClojureScript."
  ([raw encrypted salt]
   (check raw encrypted salt 32768 8 1))
  ([raw encrypted salt n r p]
   #?(:clj  (let [dk-len      (count encrypted)
                  is-valid?   (fn [encrypted test] (= (seq encrypted) (seq test)))
                  to-test     (encrypt raw salt n r p dk-len)]
              (is-valid? encrypted to-test))
      :cljs (throw (ex-info "Scrypt check is no longer supported in ClojureScript. Use other crypto functions." {})))))

(comment

  (in-ns 'fluree.crypto.scrypt)

  (def message (alphabase/string->bytes "hi"))

  (def salt-bytes [-84 28 -14 108 -81 -126 -42 6 -7 61 -12 -78 34 8 13 -78])
  (def mysalt #?(:cljs (clj->js (map #(if (neg-int? %) (+ % 256) %) salt-bytes))
                 :clj (byte-array salt-bytes)))

  (def result (encrypt message mysalt))
  (def res-hex (alphabase/byte-array-to-base result :hex))
  res-hex

  ;57f93bcf926c31a9e2d2129da84bfca51eb9447dfe1749b62598feacaad657d4

  (check message result mysalt))