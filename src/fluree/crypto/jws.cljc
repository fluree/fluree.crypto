(ns fluree.crypto.jws
  "An implementation of https://datatracker.ietf.org/doc/html/rfc7515
  Updated for Ed25519 signatures with public key identification support"
  (:require [alphabase.core :as alphabase]
            [clojure.string :as str]
            [fluree.crypto.ed25519 :as ed25519]
            #?(:clj [jsonista.core :as json])))

(defn- extract-pubkey-from-jwk
  "Extract public key from JWK header field."
  [jwk]
  (when (and (= (:kty jwk) "OKP") (= (:crv jwk) "Ed25519"))
    (-> (:x jwk)
        (str (apply str (repeat (mod (- 4 (mod (count (:x jwk)) 4)) 4) "="))) ; add padding
        (alphabase/base-to-base :base64url :hex))))

(defn- extract-pubkey-from-kid
  "Extract public key from kid header field (if it's a base58 account ID)."
  [kid]
  (when (and (string? kid)
             (<= 43 (count kid) 44))  ; Base58 account IDs can be 43-44 chars
    (try
      (alphabase/base-to-base kid :base58 :hex)
      (catch #?(:clj Exception :cljs js/Error) _
        nil))))

(defn- build-jose-header
  "Build a JOSE header for Ed25519 with optional key identification.
  https://tools.ietf.org/html/rfc8037
  
  Options map can contain:
  - :kid - Key identifier (e.g., account ID)
  - :jwk - JSON Web Key object with the public key"
  [opts]
  (let [header {:alg "EdDSA"
                :b64 false
                :crit ["b64"]}
        header-with-opts (cond-> header
                           (:kid opts) (assoc :kid (:kid opts))
                           (:jwk opts) (assoc :jwk (:jwk opts)))]
    #?(:clj  (json/write-value-as-string header-with-opts)
       :cljs (js/JSON.stringify (clj->js header-with-opts)))))

(defn b64
  "Convert to base64url and remove the trailing padding (=)."
  [s]
  (-> s
      (alphabase/base-to-base :string :base64url)
      (str/replace "=" "")))

(defn sign
  [signing-input signing-key]
  (ed25519/sign signing-input signing-key))

(defn serialize-jws
  "Create a JWS Compact Serialization of a JSON Web Signature using Ed25519.
  Returns the JWS string.
  
  Parameters:
  - payload: string to sign
  - signing-key: Ed25519 private key hex string or key pair map
  - opts (optional): map with key identification options:
    - :kid - Key identifier (string)
    - :jwk - Include full JSON Web Key
    - :account-id - Include account ID as kid (boolean, derives public key if needed)
    - :include-pubkey? - Include full public key as jwk (boolean, defaults to true)"
  ([payload signing-key] (serialize-jws payload signing-key {}))
  ([payload signing-key {:keys [account-id include-pubkey? jwk kid]
                         :or {include-pubkey? true}
                         :as opts}]
   (let [;; Extract or derive public key when needed for header options
         public-key (when (or account-id include-pubkey?)
                      (if (map? signing-key)
                        (:public signing-key)
                        ;; Derive public key from private key string
                        (ed25519/public-key-from-private signing-key)))

         ;; Build header options
         header-opts (cond-> {}
                       ;; Add account ID as kid if requested
                       (and account-id public-key)
                       (assoc :kid (-> public-key
                                       (alphabase/hex->bytes)
                                       (alphabase/byte-array-to-base :base58)))

                       ;; Add custom kid if provided
                       kid
                       (assoc :kid kid)

                       ;; Add full public key as JWK if requested  
                       (and include-pubkey? public-key)
                       (assoc :jwk {:kty "OKP"
                                    :crv "Ed25519"
                                    :x (-> public-key
                                           (alphabase/hex->bytes)
                                           (alphabase/byte-array-to-base :base64url)
                                           (str/replace "=" ""))})

                       ;; Add provided JWK
                       jwk
                       (assoc :jwk jwk))

         header-json (build-jose-header header-opts)
         b64-header (b64 header-json)
         b64-payload (b64 payload)
         signing-input (str b64-header "." b64-payload)

         ;; Sign with the appropriate key format
         sig-hex (sign signing-input signing-key)
         b64-sig (-> sig-hex
                     (alphabase/hex->bytes)
                     (alphabase/byte-array-to-base :base64url)
                     (str/replace "=" ""))]
     (str b64-header "." b64-payload "." b64-sig))))

(defn verify
  "Verify a JWS using Ed25519. Can provide public key directly or extract from JWS header.
  Returns result map if valid, or Exception if invalid.
  
  Parameters:
  - jws: JWS string in compact format
  - public-key (optional): Ed25519 public key hex string. If nil, will try to extract from JWS header
  
  Returns on success: {:payload payload :pubkey pubkey :header header-map :kid kid-if-present}
  Throws on error: Exception with details"
  ([jws] (verify jws nil))
  ([jws public-key]
   (if (string? jws)
     (let [[b64-header b64-payload b64-sig] (str/split jws #"\.")
           header-str (alphabase/base-to-base b64-header :base64url :string)
           payload (alphabase/base-to-base b64-payload :base64url :string)
           sig (alphabase/base-to-base b64-sig :base64url :hex)
           signing-input (str b64-header "." b64-payload)

           header-map #?(:clj  (json/read-value header-str json/keyword-keys-object-mapper)
                         :cljs (js->clj (js/JSON.parse header-str) :keywordize-keys true))

           ;; Validate algorithm
           _ (when (not= (:alg header-map) "EdDSA")
               (throw (ex-info "Unsupported JWS algorithm. Expected EdDSA."
                               {:error :jws/unsupported-algorithm
                                :expected "EdDSA"
                                :actual (:alg header-map)
                                :header header-map})))

           ;; Extract public key from header if not provided
           derived-pubkey (or public-key
                              (extract-pubkey-from-jwk (:jwk header-map))
                              (extract-pubkey-from-kid (:kid header-map))
                              (throw (ex-info "No public key provided and none found in JWS header."
                                              {:error :jws/missing-public-key
                                               :header header-map
                                               :suggestion "Provide public-key parameter or include jwk/kid in header"})))

           ;; Verify signature
           valid? (ed25519/verify derived-pubkey signing-input sig)]

       (if valid?
         {:payload payload
          :pubkey derived-pubkey
          :header header-map
          :kid (:kid header-map)}
         (throw (ex-info "JWS signature verification failed."
                         {:error :jws/invalid-signature
                          :header header-map
                          :pubkey derived-pubkey}))))

     (throw (ex-info "JWS must be a string" {:error :jws/invalid-format :jws jws})))))