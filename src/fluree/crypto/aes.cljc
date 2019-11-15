(ns fluree.crypto.aes
  (:require [alphabase.core :as alphabase]
            [fluree.crypto.sha3 :as sha3]
            [fluree.crypto.util :as util]
            #?@(:cljs [[goog.crypt.Aes]
                       [goog.crypt.Cbc]
                       [goog.crypt.Pkcs7]]))
  #?(:clj (:import (java.security SecureRandom)
                   (javax.crypto KeyGenerator Cipher)
                   (javax.crypto.spec SecretKeySpec IvParameterSpec))))


(defn ^:export encrypt
  "Encrypts with AES/CBC/PKCS{5/7}Padding by hashing a 256 bit key out
  of key (requires Unlimited Strength crypto to be enabled).
  You can provide an alternate initial vector of unsigned(!) bytes of size 16 for CBC."
  [x key & [{:keys [iv output-format] :or {iv            [6 224 71 170 241 204 115 21 30 8 46 223 106 207 55 42]
                                           output-format :hex}}]]
  (let [key-ba (if (string? key)
                 (util/hash-string-key key 32)
                 key)
        ba     (if (string? x)
                 (alphabase/string->bytes x)
                 x)
        encrypted #?(:clj
               (let [iv     (IvParameterSpec. (byte-array (mapv #(if (> % 127) (- % 256) %) iv)))
                     spec   (SecretKeySpec. (byte-array 32 key-ba) "AES")
                     cipher (Cipher/getInstance "AES/CBC/PKCS5Padding")]
                 (.init cipher Cipher/ENCRYPT_MODE spec iv)
                 (.doFinal cipher ba))
                     :cljs (let [cipher (goog.crypt.Aes. key-ba)
                                 cbc    (goog.crypt.Cbc. cipher)
                                 pkcs7  (goog.crypt.Pkcs7.)
                                 padded (.encode pkcs7 16 ba)]
                             (.encrypt cbc padded (clj->js iv))))]
    (case (keyword output-format)
      :none encrypted
      :hex (alphabase/bytes->hex encrypted)
      :base64 (alphabase/bytes->base64 encrypted))))



(defn ^:export decrypt
  "Decrypts with AES/CBC/PKCS{5/7}Padding by hashing a 256 bit key out of key.
  You can provide an alternate initial vector of unsigned(!) bytes of size 16 for CBC."
  [x key & [{:keys [iv input-format output-format]
             :or   {iv            [6 224 71 170 241 204 115 21 30 8 46 223 106 207 55 42]
                    input-format  :hex
                    output-format :string}}]]
  (let [key-ba (if (string? key)
                 (util/hash-string-key key 32)
                 key)
        x-ba   (if (string? x)
                 (case (keyword input-format)
                   :hex (alphabase/hex->bytes x)
                   :base64 (alphabase/base64->bytes x))
                 x)
        decrypt-ba #?(:clj
               (let [iv     (IvParameterSpec. (byte-array (mapv #(if (> % 127) (- % 256) %) iv)))
                     spec   (SecretKeySpec. (byte-array 32 key-ba) "AES")
                     cipher (Cipher/getInstance "AES/CBC/PKCS5Padding")]
                 (.init cipher Cipher/DECRYPT_MODE spec iv)
                 (.doFinal cipher x-ba))
                      :cljs
                      (let [cipher (goog.crypt.Aes. key-ba)
                            cbc    (goog.crypt.Cbc. cipher)
                            pkcs7  (goog.crypt.Pkcs7.)]
                        (.decode pkcs7 16 (.decrypt cbc x-ba (clj->js iv)))))]
    (case (keyword output-format)
      :none decrypt-ba
      :hex (alphabase/bytes->hex decrypt-ba)
      :string (alphabase/bytes->string decrypt-ba))))
