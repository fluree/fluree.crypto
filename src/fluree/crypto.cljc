(ns fluree.crypto
  (:require [fluree.crypto.sha2 :as sha2]
            [fluree.crypto.sha3 :as sha3]
            [fluree.crypto.aes :as aes]
            [fluree.crypto.scrypt :as scrypt]
            [fluree.crypto.ripemd :as ripemd]
            [fluree.crypto.secp256k1 :as secp256k1]
            [fluree.crypto.hmac :as hmac]
            #?@(:clj  [[fluree.crypto.elliptic :as elliptic]]
                :cljs [[fluree.crypto.elliptic2 :as elliptic]])
            [alphabase.core :as alphabase])
  #?(:clj (:import (java.text Normalizer Normalizer$Form))))


(defn ^:export normalize-string
  "Normalizes string for consistent hashing."
  [s]
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


(defn ^:export sha2-256
  ([x] (sha2-256 x :hex))
  ([x output-format] (sha2-256 x output-format (coerce-input-format x)))
  ([x output-format input-format]
   (-> x
       (alphabase/base-to-byte-array input-format)
       sha2/sha2-256
       (alphabase/byte-array-to-base (keyword output-format)))))


(defn ^:export sha2-256-normalize
  "sha2-256 hash of provided string after normalizing string."
  ([s] (sha2-256-normalize s :hex))
  ([s output-format]
   (-> s
       normalize-string
       (sha2-256 output-format :string))))


(defn ^:export sha2-512
  ([x] (sha2-512 x :hex))
  ([x output-format] (sha2-512 x output-format (coerce-input-format x)))
  ([x output-format input-format]
   (-> x
       (alphabase/base-to-byte-array input-format)
       sha2/sha2-512
       (alphabase/byte-array-to-base (keyword output-format)))))


(defn ^:export sha2-512-normalize
  "sha2-512 hash of provided string after normalizing string."
  ([s] (sha2-512-normalize s :hex))
  ([s output-format]
   (-> s
       normalize-string
       (sha2-512 output-format :string))))


(defn ^:export sha3-256
  ([x] (sha3-256 x :hex))
  ([x output-format] (sha3-256 x output-format (coerce-input-format x)))
  ([x output-format input-format]
   (-> x
       (alphabase/base-to-byte-array input-format)
       sha3/sha3-256
       (alphabase/byte-array-to-base (keyword output-format)))))


(defn ^:export sha3-256-normalize
  "sha3-256 hash of provided string after normalizing string."
  ([s] (sha3-256-normalize s :hex))
  ([s output-format]
   (-> s
       normalize-string
       (sha3-256 output-format :string))))


(defn ^:export sha3-512
  ([x] (sha3-512 x :hex))
  ([x output-format] (sha3-512 x output-format (coerce-input-format x)))
  ([x output-format input-format]
   (-> x
       (alphabase/base-to-byte-array input-format)
       sha3/sha3-512
       (alphabase/byte-array-to-base (keyword output-format)))))


(defn ^:export sha3-512-normalize
  "sha3-512 hash of provided string after normalizing string."
  ([s] (sha3-512-normalize s :hex))
  ([s output-format]
   (-> s
       normalize-string
       (sha3-512 output-format :string))))


(defn ^:export ripemd-160
  ([x] (ripemd-160 x :hex))
  ([x output-format] (ripemd-160 x output-format (coerce-input-format x)))
  ([x output-format input-format]
   (-> x
       (alphabase/base-to-byte-array input-format)
       ripemd/ripemd-160
       (alphabase/byte-array-to-base (keyword output-format)))))


(defn ^:export aes-encrypt
  ([x key] (aes-encrypt x key :hex :string))
  ([x key output-format] (aes-encrypt x key output-format :string))
  ([x key output-format input-format]
   (aes/encrypt x key)))


(defn ^:export aes-decrypt
  ([x key] (aes-decrypt x key :string :hex))
  ([x key output-format] (aes-decrypt x key output-format :hex))
  ([x key output-format input-format]
   (aes/decrypt x key)))

(defn ^:export generate-key-pair
  ([] (secp256k1/generate-key-pair))
  ([private] (secp256k1/generate-key-pair private)))

#?(:clj
   (defn pub-key-from-private
     [private-key]
     (let [private (BigInteger. private-key 16)]
       (-> private
           elliptic/public-key
           elliptic/x962-encode))))


#?(:clj
   (defn account-id-from-private
     [private-key]
     (let [private (BigInteger. private-key 16)]
       (-> private
           elliptic/public-key
           elliptic/x962-encode
           elliptic/get-sin-from-public-key))))


#?(:clj
   (defn account-id-from-public
     [public-key]
     (-> public-key
         elliptic/get-sin-from-public-key)))


#?(:clj
   (defn sign-message
     [message private-key]
     (elliptic/sign private-key message :private-key-format :hex)))


#?(:clj
   (defn verify-signature
     "Verifies signature of message is valid."
     [message signature pubkey]
     (elliptic/verify-signature pubkey message signature)))


#?(:clj
   (defn pub-key-from-message
     "Returns public key, and verifies message is correctly signed.
     If not correctly signed, throws exception."
     [message signature]
     (let [pubkey (elliptic/recover-public-key message signature)]
       (if (verify-signature message signature pubkey)
         pubkey
         (throw (ex-info (str "Invalid signature.")
                         {:status 400 :error :db/invalid-signature}))))))


#?(:clj
   (defn account-id-from-message
     "Given a message and signature, returns the corresponding account id
     only if the signature is valid. If invalid, will throw exception."
     [message signature]
     (-> (pub-key-from-message message signature)
         (elliptic/get-sin-from-public-key))))





(comment

  (in-ns 'fluree.crypto)


  (sha2-256 "hi")

  (-> (sha2-256 "hi")
      (js/console.log))

  (generate-key-pair)

  (-> (sha2-256 "hello lois" :bytes)
      (vec)
      )


  (-> (str
        "800C28FCA386C7A227600B2FE50B7CAE11EC86D3BF1FBE471BE89827E19D72AA1D"
        (-> "800C28FCA386C7A227600B2FE50B7CAE11EC86D3BF1FBE471BE89827E19D72AA1D"
            (alphabase/hex->bytes)
            (sha2-256 :bytes)
            (sha2-256 :bytes)
            (#(take 4 %))
            (byte-array)
            (alphabase/bytes->hex)
            ))
      (alphabase/hex->bytes)
      (alphabase/bytes->base58)
      )


  (aes-encrypt "hi" "mykey")

  (aes-decrypt (aes-encrypt "hello!" "mykey") "mykey")

  (aes-decrypt "9d315bc8d679cec0bce765a58d883066" "mykey")

  (sha2-256 "hi" :base58)
  (sha2-512 "hi" :base64)
  (sha3-256 "hi")
  (sha3-512 "hi")
  (ripemd-160 "hi")

  (aes-encrypt "hi" "")

  (alphabase/base-to-byte-array "hi" :string)



  (generate-address-pair)

  (def pair (generate-address-pair))
  (def private (:private pair))
  (def public (:public pair))
  pair
  private
  (pub-key-from-private private)
  (account-id-from-private private)
  (account-id-from-public public)

  )