(ns fluree.crypto.ed25519
  "Ed25519 digital signature implementation.
  
  This namespace provides Ed25519 cryptographic operations with platform-specific
  implementations:
  - Clojure: Uses Java's native Ed25519 support (JDK 15+, enhanced in JDK 17+)
  - ClojureScript: Uses @noble/ed25519 library
  
  Note: Java 17+ now supports signing with just the private key hex string,
  matching the ClojureScript behavior."
  (:require [alphabase.core :as alphabase]
            #?@(:cljs [["@noble/ed25519" :as noble-ed25519]
                       ["@noble/hashes/sha512" :refer [sha512]]]))
  #?(:clj
     (:import (java.security KeyPairGenerator SecureRandom Signature KeyFactory PublicKey PrivateKey)
              (java.security.interfaces EdECPrivateKey EdECPublicKey)
              (java.security.spec X509EncodedKeySpec EdECPrivateKeySpec NamedParameterSpec))))

#?(:clj (set! *warn-on-reflection* true))

;; Initialize Noble Ed25519 for synchronous operations in ClojureScript
#?(:cljs
   (do
     ;; Set up SHA-512 for synchronous operations
     (set! (.-sha512Sync (.-etc noble-ed25519))
           (fn [& messages]
             (sha512 (.apply (.-concatBytes (.-etc noble-ed25519)) nil (to-array messages)))))))

;; Helper functions

#?(:cljs
   (defn- ->js-bytes
     "Convert ClojureScript bytes to JavaScript Uint8Array"
     [bytes]
     (cond
       (instance? js/Uint8Array bytes) bytes
       (array? bytes) (if (= 0 (.-length bytes))
                        (js/Uint8Array. 0)
                        (js/Uint8Array. bytes))
       (seq? bytes) (js/Uint8Array. (into-array bytes))
       (vector? bytes) (js/Uint8Array. (into-array bytes))
       (and (string? bytes) (= "" bytes)) (js/Uint8Array. 0)
       :else (js/Uint8Array. bytes))))

#?(:clj
   (defn- hex->public-key
     "Create an Ed25519 public key object from hex string"
     [hex-string]
     (let [key-bytes (alphabase/hex->bytes hex-string)
           ;; Ed25519 public key in X.509 format has this prefix
           x509-prefix (byte-array [0x30 0x2a 0x30 0x05 0x06 0x03 0x2b 0x65 0x70 0x03 0x21 0x00])
           ;; Combine prefix with the 32-byte public key
           full-key (byte-array (concat x509-prefix key-bytes))
           key-spec (X509EncodedKeySpec. full-key)
           key-factory (KeyFactory/getInstance "Ed25519")]
       (.generatePublic key-factory key-spec))))

#?(:clj
   (defn- hex->private-key
     "Create an Ed25519 private key object from hex string using Java 17+ API"
     [hex-string]
     (let [key-bytes (alphabase/hex->bytes hex-string)
           key-spec (EdECPrivateKeySpec. (NamedParameterSpec/ED25519) key-bytes)
           key-factory (KeyFactory/getInstance "EdDSA")]
       (.generatePrivate key-factory key-spec))))

#?(:clj
   (defn- derive-public-key-from-private
     "Derive Ed25519 public key from private key hex string using KeyPairGenerator trick"
     [private-hex]
     (let [raw-private-key (alphabase/hex->bytes private-hex)
           ;; Override SecureRandom to provide our private key
           rigged-random (proxy [SecureRandom] []
                           (nextBytes [^bytes bytes]
                             (System/arraycopy raw-private-key 0 bytes 0 (alength ^bytes raw-private-key))))
           kpg (doto (KeyPairGenerator/getInstance "Ed25519")
                 (.initialize (NamedParameterSpec/ED25519) rigged-random))
           key-pair (.generateKeyPair kpg)
           public-encoded (.getEncoded (.getPublic key-pair))
           ;; Extract raw 32 bytes from DER encoding (last 32 bytes)
           public-bytes (java.util.Arrays/copyOfRange public-encoded
                                                      (- (alength public-encoded) 32)
                                                      (alength public-encoded))]
       (alphabase/bytes->hex public-bytes))))

(defn public-key-from-private
  "Derive the Ed25519 public key from a private key.
  
  Parameters:
  - private-key: hex string or key pair map
  
  Returns hex-encoded public key string."
  [private-key]
  (cond
    ;; If it's already a key pair, return the public key
    (and (map? private-key) (:public private-key))
    (:public private-key)

    ;; If it's a hex string, derive the public key
    (string? private-key)
    #?(:clj  (derive-public-key-from-private private-key)
       :cljs (alphabase/bytes->hex (js/Array.from (noble-ed25519/getPublicKey (->js-bytes (alphabase/hex->bytes private-key))))))

    :else
    (throw (ex-info "Invalid private key format" {:private-key (type private-key)}))))

(defn generate-key-pair
  "Returns a key pair in hex format."
  []
  #?(:clj  (let [^KeyPairGenerator gen (doto (KeyPairGenerator/getInstance "Ed25519")
                                         (.initialize 255 (SecureRandom/getInstanceStrong)))
                 keypair (.generateKeyPair gen)
                 ^EdECPrivateKey private (.getPrivate keypair)
                 ^EdECPublicKey public (.getPublic keypair)
                 private-bytes (if-let [bytes-opt (.getBytes private)]
                                 (.get bytes-opt)
                                 (throw (ex-info "Failed to extract private key bytes" {})))
                 public-encoded (.getEncoded public)
                 ;; Extract raw 32 bytes from DER encoding
                 public-bytes (if (and (= 44 (count public-encoded)) (= 0x30 (aget public-encoded 0)))
                                (java.util.Arrays/copyOfRange public-encoded 12 44)
                                public-encoded)]
             {:private (alphabase/bytes->hex private-bytes)
              :public  (alphabase/bytes->hex public-bytes)
              ;; Store internal objects for signing/verification
              :_private-obj private
              :_public-obj public})
     :cljs (let [private-bytes (noble-ed25519/utils.randomPrivateKey)
                 public-bytes (noble-ed25519/getPublicKey private-bytes)]
             {:private (alphabase/bytes->hex (js/Array.from private-bytes))
              :public  (alphabase/bytes->hex (js/Array.from public-bytes))})))

(defn sign
  "Sign a message with Ed25519. Returns hex-encoded signature.
  Message can be a byte-array or string.
  Private key can be hex string or key-pair map with internal objects."
  [message private-key]
  (let [msg-bytes (if (string? message)
                    #?(:clj (alphabase/string->bytes message)
                       :cljs (->js-bytes (alphabase/string->bytes message)))
                    #?(:clj message
                       :cljs (->js-bytes message)))]
    #?(:clj  (let [^PrivateKey key-obj (cond
                                             ;; If it's a key pair map with internal object
                                         (and (map? private-key) (:_private-obj private-key))
                                         (:_private-obj private-key)

                                             ;; If it's a hex string, create private key object (Java 17+)
                                         (string? private-key)
                                         (hex->private-key private-key)

                                             ;; If it's a map with :private key
                                         (and (map? private-key) (:private private-key))
                                         (hex->private-key (:private private-key))

                                         :else
                                         (throw (ex-info "Invalid private key format for Clojure Ed25519"
                                                         {:private-key (type private-key)})))
                   ^Signature signature-obj (doto (Signature/getInstance "Ed25519")
                                              (.initSign key-obj))
                   _ (.update signature-obj ^bytes msg-bytes)
                   signature-bytes (.sign signature-obj)]
               (alphabase/bytes->hex signature-bytes))
       :cljs (let [private-bytes (cond
                                   (string? private-key) (->js-bytes (alphabase/hex->bytes private-key))
                                   (map? private-key) (->js-bytes (alphabase/hex->bytes (:private private-key)))
                                   :else private-key)
                   signature-bytes (noble-ed25519/sign msg-bytes private-bytes)]
               (alphabase/bytes->hex (js/Array.from signature-bytes))))))

(defn verify
  "Verify an Ed25519 signature. Returns boolean.
  For Clojure: public-key should be the key pair map with internal objects
  For ClojureScript: public-key should be hex-encoded
  Message can be a byte-array or string."
  [public-key message signature]
  (let [msg-bytes (if (string? message)
                    #?(:clj (alphabase/string->bytes message)
                       :cljs (->js-bytes (alphabase/string->bytes message)))
                    #?(:clj message
                       :cljs (->js-bytes message)))
        sig-bytes (if (string? signature)
                    #?(:clj (alphabase/hex->bytes signature)
                       :cljs (->js-bytes (alphabase/hex->bytes signature)))
                    #?(:clj signature
                       :cljs (->js-bytes signature)))]
    #?(:clj  (try
               (let [^PublicKey key-obj (cond
                                          ;; If it's a key pair map with internal object
                                          (and (map? public-key) (:_public-obj public-key))
                                          (:_public-obj public-key)

                                          ;; If it's a hex string, create public key object
                                          (string? public-key)
                                          (hex->public-key public-key)

                                          ;; If it's a map with :public key
                                          (and (map? public-key) (:public public-key))
                                          (hex->public-key (:public public-key))

                                          :else
                                          (throw (ex-info "Invalid public key format for Clojure Ed25519"
                                                          {:public-key (type public-key)})))
                     ^Signature signature-obj (doto (Signature/getInstance "Ed25519")
                                                (.initVerify key-obj))
                     _ (.update signature-obj ^bytes msg-bytes)]
                 (.verify signature-obj sig-bytes))
               (catch Exception _
                 false))
       :cljs (try
               (let [public-bytes (cond
                                    (string? public-key) (->js-bytes (alphabase/hex->bytes public-key))
                                    (map? public-key) (->js-bytes (alphabase/hex->bytes (:public public-key)))
                                    :else public-key)]
                 (noble-ed25519/verify sig-bytes msg-bytes public-bytes))
               (catch js/Error _
                 false)))))

(defn get-account-id
  "Generate an account ID from a public key.
  
  Supports multiple formats:
  - :base58 - Simple base58 encoding (Solana-style, 44 chars)
  - :multibase - DID:key style with multicodec (VC/DID standard, ~48 chars, starts with 'z')
  - :hex - Hexadecimal encoding (64 chars)
  
  For Verifiable Credentials and DID applications, use :multibase format."
  ([pub-key] (get-account-id pub-key {:output-format :base58}))
  ([pub-key {:keys [output-format] :or {output-format :base58}}]
   (let [pub-hex (cond
                   (string? pub-key) pub-key
                   (map? pub-key) (:public pub-key)
                   :else (alphabase/bytes->hex pub-key))
         pub-bytes (alphabase/hex->bytes pub-hex)]
     (case output-format
       :base58 (alphabase/byte-array-to-base pub-bytes :base58)
       :hex (alphabase/bytes->hex pub-bytes)
       :multibase (let [;; Ed25519 multicodec identifier (0xed01)
                        multicodec-prefix #?(:clj (byte-array [0xed 0x01])
                                             :cljs #js [0xed 0x01])
                        ;; Concatenate multicodec + public key
                        multicodec-key #?(:clj (byte-array (concat multicodec-prefix pub-bytes))
                                          :cljs (let [result (js/Uint8Array. (+ 2 (.-length pub-bytes)))]
                                                  (.set result multicodec-prefix 0)
                                                  (.set result pub-bytes 2)
                                                  result))
                        ;; Base58btc encode and add 'z' prefix for multibase
                        base58btc (alphabase/byte-array-to-base multicodec-key :base58)]
                    (str "z" base58btc))
       ;; Default fallback
       (alphabase/byte-array-to-base pub-bytes output-format)))))