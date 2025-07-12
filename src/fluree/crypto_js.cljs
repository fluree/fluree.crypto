(ns fluree.crypto-js
  (:require [fluree.crypto :as fc]
            [fluree.crypto.jws :as jws]))

(defn ^:export sha2-256
  [& args] ; TS types don't work well with multi-arity fns
  (apply fc/sha2-256 args))

(defn ^:export sha2-256-normalize
  [& args] ; TS types don't work well with multi-arity fns
  (apply fc/sha2-256-normalize args))

(defn ^:export sha2-512
  [& args] ; TS types don't work well with multi-arity fns
  (apply fc/sha2-512 args))

(defn ^:export sha2-512-normalize
  [& args] ; TS types don't work well with multi-arity fns
  (apply fc/sha2-512-normalize args))


(defn ^:export aes-encrypt
  [& args]
  (apply fc/aes-encrypt args))

(defn ^:export aes-decrypt
  [& args] ; TS types don't work well with multi-arity fns
  (apply fc/aes-decrypt args))

(defn ^:export generate-key-pair
  [& args] ; multi-arity fns don't play well with TS types
  (clj->js (apply fc/generate-key-pair args)))

(defn ^:export verify-jws
  [jws]
  (-> jws fc/verify-jws clj->js))

(def ^:export exports
  #js {:normalizeString      fc/normalize-string
       :stringToByteArray    fc/string->byte-array
       :byteArrayToString    fc/byte-array->string
       :sha2_256             sha2-256
       :sha2_256_normalize   sha2-256-normalize
       :sha2_512             sha2-512
       :sha2_512_normalize   sha2-512-normalize
       :aesEncrypt           aes-encrypt
       :aesDecrypt           aes-decrypt
       :generateKeyPair      generate-key-pair
       :pubKeyFromPrivate    fc/pub-key-from-private
       :accountIdFromPublic  fc/account-id-from-public
       :accountIdFromPrivate fc/account-id-from-private
       :signMessage          fc/sign-message
       :verifySignature      fc/verify-signature
       :pubKeyFromMessage    fc/pub-key-from-message
       :accountIdFromMessage fc/account-id-from-message
       :scryptEncrypt        fc/scrypt-encrypt
       :scryptCheck          fc/scrypt-check
       :randomBytes          fc/random-bytes
       :createJWS            fc/create-jws
       :verifyJWS            verify-jws})
