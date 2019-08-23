(ns fluree.crypto.scrypt
  (:require
    [alphabase.core :as alphabase]
            #?@(:cljs [
                       [sjcl.crypt.scrypt :as scrypt]
                       ;[scrypt-js]
                       [goog.object]]))
  #?(:clj (:import (com.lambdaworks.crypto SCryptUtil)
                   (com.lambdaworks.crypto SCrypt)
                   (java.security SecureRandom))))

(defn random-bytes
  "Returns a random byte array of the specified size.
  NOTE: This will only work in the browser, not for node.js"
  [size]
  (let [seed #?(:clj (byte-array size)
                :cljs ""
                ;(js/Uint8Array. size)
                )]
    #?(:clj  (.nextBytes (SecureRandom.) seed)
       :cljs (js/window.crypto.getRandomValues seed))
    seed))


(defn encrypt
  "Encrypts message (bytes) using salt (bytes).
  Returns encrypted message in bytes via single-argument callback, and in the case of
  running on the JVM, returns the result directly also (callback can be nil).
  Javascript host will return nil, only the callback will receive the value.

  Note verification of message will require the identical salt, n, r, p used
  by the original encryption."
  ([raw callback]
   (encrypt raw (random-bytes 16) callback))
  ([raw salt callback]
   (encrypt raw salt 32768 callback))
  ([raw salt n callback]
   (encrypt raw salt n 8 1 callback))
  ([raw salt n r p callback]
   (encrypt raw salt n r p 32 callback))
  ([raw salt n r p dk-len callback]
    #?(:clj  (let [enc-bytes (SCrypt/scrypt raw salt n r p dk-len)]
               (when (fn? callback)
                 (callback enc-bytes))
               enc-bytes)
       :cljs (let [
                   internal-cb (fn [error progress key]
                                 (when error (callback error))
                                 (when key (callback key)))]
               ;(scrypt-js raw salt n r p dk-len internal-cb)
               ))))



(defn check
  "Compare raw message (bytes) with previously encrypted (bytes) that was
  encrypted with the provided salt, n, r and p.
  Single-argument callback will receive true or false.
  On the JVM, callback is optional (supply nil), and also returns value
  directly from function."
  ([raw encrypted salt callback]
   (check raw encrypted salt 32768 8 1 callback))
  ([raw encrypted salt n r p callback]
   (let [dk-len #?(:clj (count encrypted)
                   :cljs (.-length encrypted))
         is-valid?      (fn [encrypted test]
                          #?(:clj  (= (seq encrypted) (seq test))
                             :cljs (.equals goog.object encrypted test)))
         internal-cb    (when (fn? callback)
                          (fn [to-test]
                            ;(js/console.log to-verify)
                            ;(js/console.log encrypted)
                            ;; todo - check if an exception
                            (callback (is-valid? encrypted to-test))))
         to-test         (encrypt raw salt n r p dk-len internal-cb)]
     (when to-test
       (println "dk-len: " (pr-str dk-len))
       (println "encrypted: " (pr-str (seq encrypted)))
       (println "Result: " (pr-str (seq to-test)))
       ;; on the JVM, can return result directly if no callback provided
       (is-valid? encrypted to-test)))))


(comment



  (in-ns 'fluree.crypto.scrypt)


  ;(sjcl.ecc.point 1 2 3)
  (def message (alphabase/string->bytes "hi"))

  (def salt-bytes [-84 28 -14 108 -81 -126 -42 6 -7 61 -12 -78 34 8 13 -78])
  (def mysalt (clj->js (map #(if (neg-int? %) (+ % 256) %) salt-bytes)))
  ;(def mysalt (byte-array salt-bytes))

  ;(sjcl.misc.scrypt message mysalt 32768 8 1 nil)

  ;(scrypt/scrypt message mysalt 32768 8 1 nil
  ;)

  ;(scrypt/scrypt 2 2 1 1 2 1 nil)


  (def result (encrypt message mysalt nil))

  (alphabase/bytes->hex (encrypt message mysalt nil))

  (def encryption (encrypt message mysalt (fn [x]
                                         (js/console.log (alphabase/bytes->hex x)))))

  result

  (check message (alphabase/hex->bytes "57f93bcf926c31a9e2d2129da84bfca51eb9447dfe1749b62598feacaad657d4") mysalt nil)
  (check message (alphabase/hex->bytes "57f93bcf926c31a9e2d2129da84bfca51eb9447dfe1749b62598feacaad657d4")
         mysalt (fn [x] (js/console.log x)))



  (def encryption (encrypt message (fn [x] (println x))))

  encryption

  (check message (alphabase/hex->bytes "57f93bcf926c31a9e2d2129da84bfca51eb9447dfe1749b62598feacaad657d4")
         mysalt (fn [x] (js/console.log x)))

  )