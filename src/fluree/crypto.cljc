(ns fluree.crypto
  (:require
    [fluree.crypto.sha2 :as sha2]
    [fluree.crypto.sha3 :as sha3]
    [fluree.crypto.aes :as aes]
    [fluree.crypto.scrypt :as scrypt]
    [fluree.crypto.ripemd :as ripemd]
    [fluree.crypto.secp256k1 :as secp256k1]
    [fluree.crypto.hmac :as hmac]
    [alphabase.core :as alphabase]
    [fluree.crypto.encodings :as encodings])
  #?(:clj
     (:import (java.text Normalizer Normalizer$Form))))


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
    #?(:clj  (-> x
                 (alphabase/base-to-byte-array input-format)
                 sha3/sha3-256
                 (alphabase/byte-array-to-base (keyword output-format)))
       :cljs (-> x sha3/sha3-256
                 (alphabase/byte-array-to-base (keyword output-format))))))

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
  ([private]
   (secp256k1/generate-key-pair private)))

(defn ^:export pub-key-from-private
  "Take a private key as either a hex string or BigInteger (clj) bignumber (cljs), returns as a hex string."
  [private-key]
  (secp256k1/public-key-from-private private-key))

(defn ^:export account-id-from-private
  [private-key]
  (-> private-key
      pub-key-from-private
      ;; TODO - implement get-sin-from-public-key working in cljs
      secp256k1/get-sin-from-public-key))

(defn ^:export account-id-from-public
  [public-key]
  (-> public-key
      ;; TODO - implement get-sin-from-public-key working in cljs
      secp256k1/get-sin-from-public-key))


#?(:clj
   (defn sign-message
     "Sign some message with provided private key.\n  Message must be a byte-array or string.\n  Private key must be hex-encoded or a BigInteger(clj)/bignumber(cljs)."
     [message private-key]
     (-> (secp256k1/sign message private-key)
         alphabase/bytes->hex)))

#?(:clj
   (defn verify-signature
     "Verifies signature of message is valid."
     [message signature]
     (secp256k1/verify message signature)))


#?(:clj
   (defn pub-key-from-message
     "Returns public key, and verifies message is correctly signed.
     If not correctly signed, throws exception."
     [message signature]
     (let [pubkey (secp256k1/recover-public-key message signature)]
       (if (verify-signature message signature)
         pubkey
         (throw (ex-info (str "Invalid signature.")
                         {:status 400 :error :db/invalid-signature}))))))


#?(:clj
   (defn account-id-from-message
     "Given a message and signature, returns the corresponding account id
     only if the signature is valid. If invalid, will throw exception."
     [message signature]
     (-> (pub-key-from-message message signature)
          account-id-from-public)))






(comment


  (pub-key-from-message "hi!"
                        "1b3045022100edc40558a209afea4e7c8ee1c3667a9fab554d4ebfdb692fe27dc69f071e9732022049ee4b25012d3f76ec20e8940f36a742d6d355ee76fa984660c98c4e09fa41ba")

  (account-id-from-message "hi!"
                           "1b3045022100edc40558a209afea4e7c8ee1c3667a9fab554d4ebfdb692fe27dc69f071e9732022049ee4b25012d3f76ec20e8940f36a742d6d355ee76fa984660c98c4e09fa41ba")


   (sign-message "hi" private)

  (sign-message "hi" private)


  (account-id-from-private (:private kp))
  (def kp (generate-key-pair))
  (def public (:public kp))
  (def private (:private kp))



  (account-id-from-private private)
  (account-id-from-public public)

  (aes-encrypt "hi" private)

  (-> (aes-encrypt "hi" private)
      (aes-decrypt private))

  (= public (pub-key-from-private private))

  public

  (alphabase/bytes->string (account-id-from-private private))

  (sign-message "hi" private)

  (secp256k1/recover-public-key "hi" (sign-message "hi" private))
  )