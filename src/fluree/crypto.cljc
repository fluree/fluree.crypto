(ns fluree.crypto
  (:require
   [alphabase.core :as alphabase]
   [fluree.crypto.aes :as aes]
   [fluree.crypto.jws :as jws]
   [fluree.crypto.ripemd :as ripemd]
   [fluree.crypto.scrypt :as scrypt]
   [fluree.crypto.secp256k1 :as secp256k1]
   [fluree.crypto.sha2 :as sha2]
   [fluree.crypto.sha3 :as sha3]
   #?@(:cljs [[goog.crypt :as gcrypt]
              [goog.object :as gobj]]))
  #?(:clj
     (:import (java.text Normalizer Normalizer$Form))))

#?(:clj  (set! *warn-on-reflection* true)
   :cljs (set! *warn-on-infer* true))

(defn ^:export normalize-string
  "Normalizes string for consistent hashing."
  [#?(:cljs ^js/String s
      :clj  s)]
  #?(:clj  (Normalizer/normalize s Normalizer$Form/NFKC)
     :cljs (.normalize s "NFKC")))

(defn- coerce-input-format
  "Does simple check when input format not specified.
  Assumes either string or bytes"
  [x]
  (if (string? x)
    :string
    :bytes))

(defn ^:export string->byte-array
  "Normalizes string then converts to a byte-array.
  If value is already a byte-array, returns original value."
  [s]
  (-> s
      (normalize-string)
      (alphabase/string->bytes)))

(defn ^:export byte-array->string
  [s]
  (-> s (alphabase/bytes->string)))

(defn ^:export sha2-256
  ([x] (sha2-256 x :hex))
  ([x output-format] (sha2-256 x output-format (coerce-input-format x)))
  ([x output-format input-format]
   (-> x
       (alphabase/base-to-byte-array input-format)
       sha2/sha2-256
       (alphabase/byte-array-to-base (keyword output-format)))))

(defn ^:export sha2-256-js
  [& args] ; TS types don't work well with multi-arity fns
  (apply sha2-256 args))

(defn ^:export sha2-256-normalize
  "sha2-256 hash of provided string after normalizing string."
  ([s] (sha2-256-normalize s :hex))
  ([s output-format]
   (-> s
       normalize-string
       (sha2-256 output-format :string))))

(defn ^:export sha2-256-normalize-js
  [& args] ; TS types don't work well with multi-arity fns
  (apply sha2-256-normalize args))

(defn ^:export sha2-512
  ([x] (sha2-512 x :hex))
  ([x output-format] (sha2-512 x output-format (coerce-input-format x)))
  ([x output-format input-format]
   (-> x
       (alphabase/base-to-byte-array input-format)
       sha2/sha2-512
       (alphabase/byte-array-to-base (keyword output-format)))))

(defn ^:export sha2-512-js
  [& args] ; TS types don't work well with multi-arity fns
  (apply sha2-512 args))

(defn ^:export sha2-512-normalize
  "sha2-512 hash of provided string after normalizing string."
  ([s] (sha2-512-normalize s :hex))
  ([s output-format]
   (-> s
       normalize-string
       (sha2-512 output-format :string))))

(defn ^:export sha2-512-normalize-js
  [& args] ; TS types don't work well with multi-arity fns
  (apply sha2-512-normalize args))

(defn ^:export sha3-256
  ([x] (sha3-256 x :hex))
  ([x output-format] (sha3-256 x output-format (coerce-input-format x)))
  ([x output-format input-format]
   (-> x
       (alphabase/base-to-byte-array input-format)
       sha3/sha3-256
       (alphabase/byte-array-to-base (keyword output-format)))))

(defn ^:export sha3-256-js
  [& args] ; TS types don't work well with multi-arity fns
  (apply sha3-256 args))

(defn ^:export sha3-256-normalize
  "sha3-256 hash of provided string after normalizing string."
  ([s] (sha3-256-normalize s :hex))
  ([s output-format]
   (-> s
       normalize-string
       (sha3-256 output-format :string))))

(defn ^:export sha3-256-normalize-js
  [& args] ; TS types don't work well with multi-arity fns
  (apply sha3-256-normalize args))

(defn ^:export sha3-512
  ([x] (sha3-512 x :hex))
  ([x output-format] (sha3-512 x output-format (coerce-input-format x)))
  ([x output-format input-format]
   (-> x
       (alphabase/base-to-byte-array input-format)
       sha3/sha3-512
       (alphabase/byte-array-to-base (keyword output-format)))))

(defn ^:export sha3-512-js
  [& args] ; TS types don't work well with multi-arity fns
  (apply sha3-512 args))

(defn ^:export sha3-512-normalize
  "sha3-512 hash of provided string after normalizing string."
  ([s] (sha3-512-normalize s :hex))
  ([s output-format]
   (-> s
       normalize-string
       (sha3-512 output-format :string))))

(defn ^:export sha3-512-normalize-js
  [& args] ; TS types don't work well with multi-arity fns
  (apply sha3-512-normalize args))

(defn ^:export ripemd-160
  ([x] (ripemd-160 x :hex))
  ([x output-format] (ripemd-160 x output-format (coerce-input-format x)))
  ([x output-format input-format]
   (-> x
       (alphabase/base-to-byte-array input-format)
       ripemd/ripemd-160
       (alphabase/byte-array-to-base (keyword output-format)))))

(defn ^:export ripemd-160-js
  [& args] ; TS types don't work well with multi-arity fns
  (apply ripemd-160 args))

(defn ^:export aes-encrypt
  ([x iv key] (aes-encrypt x iv key :hex))
  ([x iv key output-format]
   (aes/encrypt x key {:iv iv :output-format output-format})))

(defn ^:export aesEncrypt
  [& args]
  (apply aes-encrypt args))

(defn ^:export aes-decrypt
  ([x iv key] (aes-decrypt x iv key :string :hex))
  ([x iv key output-format] (aes-decrypt x iv key output-format :hex))
  ([x iv key output-format input-format]
   (aes/decrypt x key {:iv iv :input-format input-format :output-format output-format})))

(defn ^:export aesDecrypt
  [& args] ; TS types don't work well with multi-arity fns
  (apply aes-decrypt args))

(defn ^:export generate-key-pair
  ([] (secp256k1/generate-key-pair))
  ([private]
   (secp256k1/generate-key-pair private)))

#?(:cljs
   (defn ^:export generateKeyPair
     [& args] ; multi-arity fns don't play well with TS types
     (clj->js (apply generate-key-pair args))))

(defn ^:export pub-key-from-private
  "Take a private key as either a hex string or BigInteger (clj) bignumber (cljs), returns as a hex string."
  [private-key]
  (-> (secp256k1/public-key-from-private private-key)
      secp256k1/format-key-pair
      :public))

(defn ^:export account-id-from-public
  [public-key]
  (secp256k1/get-sin-from-public-key public-key))

(def ^:export account-id-from-private
  (comp account-id-from-public pub-key-from-private))

(defn ^:export sign-message
  "Sign some message with provided private key.\n  Message must be a byte-array or string.\n  Private key must be hex-encoded or a BigInteger(clj)/bignumber(cljs)."
  [message private-key]
  (secp256k1/sign message private-key))

(defn ^:export verify-signature
  "Verifies signature of message is valid."
  [pub-key message signature]
  (secp256k1/verify pub-key message signature))

(defn ^:export pub-key-from-message
  "Returns public key, and verifies message is correctly signed.
  If not correctly signed, throws exception."
  [message signature]
  (secp256k1/recover-public-key message signature))

(defn ^:export account-id-from-message
  "Given a message and signature, returns the corresponding account id
  only if the signature is valid. If invalid, will throw exception."
  [message signature]
  (-> (pub-key-from-message message signature)
      account-id-from-public))

(defn ^:export scrypt-encrypt
  "Encrypts a message (string) using a salt (bytes). Returns the encrypted message in hex."
  [message & args]
  (let [byte-msg (string->byte-array message)]
    (-> (apply scrypt/encrypt byte-msg args)
        (alphabase/byte-array-to-base :hex))))

(defn ^:export scrypt-check
  "Compares a message (string) with previously encrypted message (hex). "
  [message encrypted & args]
  (let [byte-msg      (string->byte-array message)
        byte-encryped (alphabase/base-to-byte-array encrypted :hex)]
    (apply scrypt/check byte-msg byte-encryped args)))

(defn ^:export random-bytes
  "Generates n random bytes."
  [n]
  (scrypt/random-bytes n))

(defn ^:export create-jws
  "Sign a string with the secp256k1 private key."
  [s private-key]
  (jws/serialize-jws s private-key))

(defn ^:export verify-jws
  "Verify the supplied compact JWS. If valid, returns the base64 decoded payload and the
  public key. If invalid, returns nil."
  [jws]
  (jws/verify jws))

#?(:cljs
   (defn ^:export verifyJWS
     [jws] (clj->js (jws/verify jws))))


#?(:cljs
   (def ^:export js-exports
     #js {:normalizeString      normalize-string
          :stringToByteArray    string->byte-array
          :byteArrayToString    byte-array->string
          :sha2_256             sha2-256-js
          :sha2_256_normalize   sha2-256-normalize-js
          :sha2_512             sha2-512-js
          :sha2_512_normalize   sha2-512-normalize-js
          :sha3_256             sha3-256-js
          :sha3_256_normalize   sha3-256-normalize-js
          :sha3_512             sha3-512-js
          :sha3_512_normalize   sha3-512-normalize-js
          :ripemd_160           ripemd-160-js
          :aesEncrypt           aesEncrypt
          :aesDecrypt           aesDecrypt
          :generateKeyPair      generateKeyPair
          :pubKeyFromPrivate    pub-key-from-private
          :accountIdFromPublic  account-id-from-public
          :accountIdFromPrivate account-id-from-private
          :signMessage          sign-message
          :verifySignature      verify-signature
          :pubKeyFromMessage    pub-key-from-message
          :accountIdFromMessage account-id-from-message
          :scryptEncrypt        scrypt-encrypt
          :scryptCheck          scrypt-check
          :randomBytes          random-bytes
          :createJWS            create-jws
          :verifyJWS            verifyJWS}))

(comment

  (def kp (generate-key-pair))

  (def private #?(:cljs (.-private kp) :clj (:private kp)))
  (def public #?(:cljs (.-public kp) :clj (:public kp)))

  (= public (pub-key-from-private private))

  (sha2-256 "hi there")
  ;; CLJS + CLJ:
  ;; "9b96a1fe1d548cbbc960cc6a0286668fd74a763667b06366fb2324269fcabaa4"

  (sha2-256-normalize (str "\u0041\u030a" "pple"))
  (sha2-256-normalize (str "\u00C5" "pple"))
  ;; CLJS + CLJ
  ;; For both: "58acf888b520fe51ecc0e4e5eef46c3bea3ca7df4c11f6719a1c2471bbe478bf"

  (sha2-512 "hi there")
  ;; CLJS + CLJ:
  ;; "db5227a40901a06d455f7666be017c6abbbafdfb3327f4a996d375c3fd020a2bfe464b7cee18caa5d23edf308b76ae623dc8b2b0cec98dc96219ad741b67f5bd"

  (sha2-512-normalize (str "\u00C5" "pple"))
  (sha2-512-normalize (str "\u0041\u030a" "pple"))
  ;; CLJS + CLJ ->
  ;; For both: "6c406d5e0a5910aeee9adf14425427aa864d55e3dce675eae68d4ad5d6d560199667ac6c8186091f83041f4c8708573881d93ba0e47717bf491a06820a84efef"

  (sha3-256 "hi there")
  ;; CLJS + CLJ:
  ;; "f721a1afff8300e03f24a45d337b9a9aa630ca8b7f2b8dca94b44be78e554fa5"

  (sha3-256-normalize (str "\u0041\u030a" "pple"))
  (sha3-256-normalize (str "\u00C5" "pple"))
  ;; CLJS + CLJ:
  ;; For both: "56ccd25281a278146afa6770378d0c6949959adb84ad1c688951b7bb4af22401"

  (sha3-512 "hi there")
  ;; CLJS + CLJ:
  ;; "4297c279eb3c3ffa693cb856ecdb916a1ad8398cc79b5f7f8420684d77e0a153b96a5e3fe48438bc66f5a56efb25eef5927cb396a4313a38d503d09734154467"

  (sha3-512-normalize (str "\u0041\u030a" "pple"))
  (sha3-512-normalize (str "\u00C5" "pple"))
  ;;  CLJS + CLJ:
  ;; For both:
  ;; "085fb750a248ee4206d9255a2082ae5b17b9582f0fd856e75257fec427d329c91ebb67b9c3b49a713aa2a14595bf094f78de2d359b38903bae2388beb49f206d"

  (ripemd-160 "hi there")
  ;; CLJS + CLJ:
  ;; 6bbf1bb4ef616c675347ca0044f3997fc8ca3921

  (aes-encrypt "hi" "there")
  ;; CLJ + CLJS
  ;; 668cd07d1a17cc7a8a0390cf017ac7ef

  (def iv (random-bytes 16))
  (aes-encrypt "hi" iv "there" :none)
  (aes-decrypt (aes-encrypt "hi" iv "there") iv "there")
  (aes-decrypt "668cd07d1a17cc7a8a0390cf017ac7ef" "there")
  ;; Working in CLJS + CLJ

  (aes-encrypt-normalize (str "\u0041\u030a" "pple") "there")
  (aes-encrypt-normalize (str "\u00C5" "pple") "there")
  (aes-decrypt (aes-encrypt-normalize (str "\u00C5" "pple") "there") "there")
  ;; CLJ + CLJS
  (aes-encrypt-normalize (str "\u00C5" "pple") "there")
  ;; ead3c7632061dd6835477d12ea51f85b

  (def account-id (account-id-from-private private))
  ;; CLJ + CLJS

  (account-id-from-public public)
  ;; CLJ + CLJS

  (def sig (sign-message "hi" private))

  (verify-signature public "hi" sig)
  ;; CLJ + CLJS

  (= public (pub-key-from-message "hi" sig))
  ;; CLJ + CLJS

  (= account-id (account-id-from-message "hi" sig))
  ;; CLJ + CLJS

  (def salt-bytes [-84 28 -14 108 -81 -126 -42 6 -7 61 -12 -78 34 8 13 -78])
  (def mysalt #?(:clj  (byte-array salt-bytes)
                 :cljs (clj->js (map #(if (neg-int? %) (+ % 256) %) salt-bytes))))

  (def scrypt-hex (scrypt-encrypt "hi" mysalt 32768 8 1))
  scrypt-hex
  ;; CLJ  + CLJS
  ;; "57f93bcf926c31a9e2d2129da84bfca51eb9447dfe1749b62598feacaad657d4"

  (scrypt-check "hi" scrypt-hex mysalt 32768 8 1)
  ;; CLJ + CLJS
  )
