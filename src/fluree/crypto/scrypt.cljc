(ns fluree.crypto.scrypt
  (:require
    [alphabase.core :as alphabase]
    #?@(:cljs [["@fluree/sjcl" :as sjcl]
               [goog.object]]))
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


(defn encrypt
  "Encrypts message (bytes) using salt (bytes).
  Returns encrypted message in bytes directly.

  Note verification of message will require the identical salt, n, r, p used
  by the original encryption."
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
      :cljs (let [rawBits  (sjcl.codec.bytes.toBits raw)
                  saltBits (sjcl.codec.bytes.toBits salt)
                  length (* 8 dk-len)
                  res (sjcl.crypt.scrypt. rawBits saltBits n r p length)]
              (sjcl.codec.bytes.fromBits res)))))


(defn check
  "Compare raw message (bytes) with previously encrypted (bytes) that was
  encrypted with the provided salt, n, r and p.
  Returns true or false."
  ([raw encrypted salt]
   (check raw encrypted salt 32768 8 1))
  ([raw encrypted salt n r p]
   (let [dk-len #?(:clj (count encrypted)
                   :cljs (.-length encrypted))
         is-valid?      (fn [encrypted test]
                          #?(:clj  (= (seq encrypted) (seq test))
                             :cljs (.equals goog.object encrypted test)))
         to-test        (encrypt raw salt n r p dk-len)]
     (is-valid? encrypted to-test))))


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


