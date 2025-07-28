(ns fluree.crypto
  "Cryptographic functions for Fluree.

  Core functions:
  - Ed25519 key generation, signing, and verification
  - JWS (JSON Web Signature) creation and verification
  - Hash functions (sha2-256, sha2-512, etc.)
  - AES encryption/decryption
  - Account ID generation
  - Utility functions"
  (:require
   [alphabase.core :as alphabase]
   [fluree.crypto.aes :as aes]
   [fluree.crypto.ed25519 :as ed25519]
   [fluree.crypto.jws :as jws]
   [fluree.crypto.sha2 :as sha2])
  #?(:clj
     (:import (java.text Normalizer Normalizer$Form)
              (java.security SecureRandom))))

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
  "SHA-256 hash function. Returns hash immediately.
  Default output format is hex."
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

(defn ^:export aes-encrypt
  ([x iv key] (aes-encrypt x iv key :hex))
  ([x iv key output-format]
   (aes/encrypt x key {:iv iv :output-format output-format})))

(defn ^:export aes-decrypt
  ([x iv key] (aes-decrypt x iv key :string :hex))
  ([x iv key output-format] (aes-decrypt x iv key output-format :hex))
  ([x iv key output-format input-format]
   (aes/decrypt x key {:iv iv :input-format input-format :output-format output-format})))

;; Ed25519 Key Management Functions
(defn ^:export generate-key-pair
  "Generates an Ed25519 key pair.
  
  Returns a map with :private and :public keys in hex format.
  
  Note: In Clojure, the returned map also contains internal key objects for signing/verification.
  
  Example:
    (let [kp (generate-key-pair)]
      (println (:public kp)))"
  []
  (ed25519/generate-key-pair))

(defn ^:export account-id-from-public
  "Generate an account ID from an Ed25519 public key.
  
  Returns account ID immediately.
  
  Options:
  - format: :base58 (default, Solana-style), :multibase (DID:key style), or :hex
  
  For Verifiable Credentials and DID applications, use :multibase format."
  ([public-key] (ed25519/get-account-id public-key))
  ([public-key options] (ed25519/get-account-id public-key options)))

(defn ^:export account-id-from-private
  "Generate an account ID from an Ed25519 private key.
  
  This is a convenience function that derives the public key from the private key
  and then generates the account ID.
  
  Returns account ID immediately.
  
  Parameters:
  - private-key: hex string or key pair map
  
  Options:
  - output-format: :base58 (default, Solana-style), :multibase (DID:key style), or :hex
  
  Example:
    (account-id-from-private \"64b254b7436c359e33a8c1642fd0b4d70df976811ce97fc710127fbe75713033\")
    => \"CNCfXkDndYJKLAydyYUYRn6pXo2KYYTvKigGjKwZeaTc\"
    
    (account-id-from-private private-key {:output-format :multibase})
    => \"z6MkqpTi7zUDy5nnSfpLf7SPGsepMNJAxRiH1jbCZbuaZoEz\""
  ([private-key]
   (-> private-key
       (ed25519/public-key-from-private)
       (ed25519/get-account-id)))
  ([private-key options]
   (-> private-key
       (ed25519/public-key-from-private)
       (ed25519/get-account-id options))))

(defn ^:export did-key-from-public
  "Generate a DID:key identifier from an Ed25519 public key.
  
  Returns a did:key using the multibase format (W3C DID standard)."
  [public-key]
  (str "did:key:" (ed25519/get-account-id public-key {:output-format :multibase})))

(defn ^:export public-key-from-private
  "Derive the Ed25519 public key from a private key.
  
  Parameters:
  - private-key: hex string or key pair map
  
  Returns hex-encoded public key string.
  
  Example:
    (public-key-from-private \"162259eb44ebceca49e00bcc95496a2eeba5528886414859c95a3ee045cbd1f5\")
    => \"7f1215858ac4aa71a95b16b1ef024b1c344d5c25b6df3fe90a9f1513a4d2411e\""
  [private-key]
  (ed25519/public-key-from-private private-key))

(defn ^:export sign-message
  "Sign a message with Ed25519.
  
  Returns a hex-encoded signature string.
  
  Parameters:
  - message: can be a byte-array or string
  - private-key: hex string or key pair map (both platforms support hex strings)
  
  Example:
    ;; With key pair
    (let [sig (sign-message \"hello\" keypair)]
      (println sig))
    
    ;; With hex private key (Java 17+ and ClojureScript)
    (let [sig (sign-message \"hello\" \"162259eb44ebceca49e00bcc95496a2eeba5528886414859c95a3ee045cbd1f5\")]
      (println sig))"
  [message private-key]
  (ed25519/sign message private-key))

(defn ^:export verify-signature
  "Verify an Ed25519 signature.
  
  Returns a boolean (true if valid, false otherwise).
  
  Parameters:
  - pub-key: In Clojure - should be the key pair map returned by generate-key-pair
             In ClojureScript - can be hex string or key pair map
  - message: the original message (string or byte-array)
  - signature: hex-encoded signature string
  
  Example:
    (let [valid? (verify-signature keypair \"hello\" signature)]
      (if valid? (println \"Valid!\") (println \"Invalid!\")))"
  [pub-key message signature]
  (ed25519/verify pub-key message signature))

(defn ^:export random-bytes
  "Generates n random bytes.
  
  Returns a byte-array in Clojure or Uint8Array in ClojureScript."
  [n]
  #?(:clj  (let [^SecureRandom rng (SecureRandom/getInstanceStrong)
                 seed (byte-array n)]
             (.nextBytes rng seed)
             seed)
     :cljs (let [seed (js/Uint8Array. n)]
             (if (exists? js/window)
               (js/window.crypto.getRandomValues seed)
               (js/crypto.getRandomValues seed))
             seed)))

(defn ^:export create-jws
  "Create a JWS (JSON Web Signature) using Ed25519 with optional public key identification.
  
  Returns a JWS string in compact format.
  
  Parameters:
  - payload: string to sign
  - signing-key: Ed25519 hex private key string or key pair map
  - opts (optional): map with key identification options:
    - :kid - Custom key identifier (string)
    - :account-id - Include account ID as kid (boolean, public key will be derived if needed)
    - :include-pubkey - Include full public key as JWK (boolean, public key will be derived if needed)
    - :jwk - Custom JSON Web Key object
  
  Examples:
    Basic JWS with hex private key:
      (create-jws \"payload\" \"162259eb44ebceca49e00bcc95496a2eeba5528886414859c95a3ee045cbd1f5\")
    
    With account ID as key identifier (works with private key hex):
      (create-jws \"payload\" \"162259eb44ebceca49e00bcc95496a2eeba5528886414859c95a3ee045cbd1f5\" {:account-id true})
    
    With full public key embedded (works with private key hex):
      (create-jws \"payload\" \"162259eb44ebceca49e00bcc95496a2eeba5528886414859c95a3ee045cbd1f5\" {:include-pubkey true})
    
    With custom key ID:
      (create-jws \"payload\" private-key-hex {:kid \"my-key-1\"})"
  ([payload signing-key] (create-jws payload signing-key {}))
  ([payload signing-key opts]
   (jws/serialize-jws payload signing-key opts)))

(defn ^:export verify-jws
  "Verify a JWS (JSON Web Signature) using Ed25519. Can provide public key or extract from JWS header.
  
  Returns result map if valid, or Exception object if verification fails.
  
  Parameters:
  - jws: JWS string in compact format
  - public-key (optional): Ed25519 public key. If nil, will try to extract from JWS header
  
  Returns on success: {:payload payload :pubkey pubkey :header header-map :kid kid-if-present}
  Returns on error: Exception with details
  
  Examples:
    With provided public key:
      (let [result (verify-jws jws-string pubkey)]
        (if (instance? Exception result)
          (handle-error result)
          (use-payload (:payload result))))
    
    Extract public key from JWS header (requires kid or jwk in header):
      (let [result (verify-jws jws-string)]
        (if (instance? Exception result)
          (handle-error result)
          (do (println \"Verified with key:\" (:kid result))
              (use-payload (:payload result)))))"
  ([jws] (verify-jws jws nil))
  ([jws public-key]
   (jws/verify jws public-key)))