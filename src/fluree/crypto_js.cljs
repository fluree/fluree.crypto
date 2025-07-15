(ns fluree.crypto-js
  "JavaScript-friendly wrappers for fluree.crypto functions.
  All functions now return values synchronously."
  (:require [fluree.crypto :as fc]))

(defn ^:export sha2-256
  [& args]
  (apply fc/sha2-256 args))

(defn ^:export sha2-256-normalize
  [& args]
  (apply fc/sha2-256-normalize args))

(defn ^:export sha2-512
  [& args]
  (apply fc/sha2-512 args))

(defn ^:export sha2-512-normalize
  [& args]
  (apply fc/sha2-512-normalize args))

(defn ^:export aes-encrypt
  [& args]
  (apply fc/aes-encrypt args))

(defn ^:export aes-decrypt
  [& args]
  (apply fc/aes-decrypt args))

(defn ^:export generate-key-pair
  [& args]
  (clj->js (apply fc/generate-key-pair args)))

(defn ^:export verify-jws
  [jws public-key]
  (let [result (fc/verify-jws (str jws) (if public-key (str public-key) nil))]
    (if (instance? js/Error result)
      result
      (clj->js result))))

(defn ^:export sign-message
  [message private-key]
  (fc/sign-message (str message) (str private-key)))

(defn ^:export verify-signature
  [pub-key message signature]
  (fc/verify-signature (str pub-key) (str message) (str signature)))

(defn ^:export create-jws
  ([payload signing-key]
   (fc/create-jws (str payload) (str signing-key)))
  ([payload signing-key opts]
   (fc/create-jws (str payload) (str signing-key) (js->clj opts :keywordize-keys true))))

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
       :accountIdFromPublic  fc/account-id-from-public
       :accountIdFromPrivate fc/account-id-from-private
       :didKeyFromPublic     fc/did-key-from-public
       :publicKeyFromPrivate fc/public-key-from-private
       :signMessage          sign-message
       :verifySignature      verify-signature
       :randomBytes          fc/random-bytes
       :createJWS            create-jws
       :verifyJWS            verify-jws})
