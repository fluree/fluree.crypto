(ns fluree.crypto.jws
  "An implementation of https://datatracker.ietf.org/doc/html/rfc7515"
  (:require [alphabase.core :as alphabase]
            [clojure.string :as str]
            [fluree.crypto.secp256k1 :as secp256k1]))

(def JOSE-header
  "The JOSE header for a secp256k1 signing key.
  https://github.com/decentralized-identity/EcdsaSecp256k1RecoverySignature2020"
  "{\"alg\":\"ES256K-R\",\"b64\":false,\"crit\":[\"b64\"]}")

(defn b64
  "Convert to base64url and remove the trailing padding (=)."
  [s]
  (-> s
      (alphabase/base-to-base :string :base64url)
      (str/replace "=" "")))

(defn sign
  [signing-input signing-key]
  (secp256k1/sign signing-input signing-key))

(defn serialize-jws
  "Create a JWS Compact Serialization of a JSON Web Signature."
  [payload signing-key]
  (let [b64-header  (b64 JOSE-header)
        b64-payload (b64 payload)
        b64-sig     (b64 (sign (str b64-header "." b64-payload) signing-key))]
    (str b64-header "." b64-payload "." b64-sig)))

(defn deserialize-jws
  "Deserialize a compact JWS into its component parts"
  [jws]
  (let [[header payload sig] (str/split jws #"\.")]
    {:header    (alphabase/base-to-base header :base64url :string)
     :payload   (alphabase/base-to-base payload :base64url :string)
     :signature (alphabase/base-to-base sig :base64url :hex)}))

(defn verify
  [jws]
  (when (string? jws)
    (let [[b64-header b64-payload b64-sig] (str/split jws #"\.")

          header  (alphabase/base-to-base b64-header :base64url :string)
          payload (alphabase/base-to-base b64-payload :base64url :string)
          sig     (alphabase/base-to-base b64-sig :base64url :string)

          signing-input (str b64-header "." b64-payload)
          pubkey        (secp256k1/recover-public-key signing-input sig)]
      (when (not= header JOSE-header)
        (throw (ex-info "Unsupported JWS header."
                        {:error :jws/unknown-signing-algorithm
                         :supported-header JOSE-header
                         :header header
                         :jws jws})))
      (when (not (secp256k1/verify pubkey signing-input sig))
        (throw (ex-info "JWS verification failed." {:error :jws/invalid-signature
                                                    :jws jws})))
      {:payload payload :pubkey pubkey})))

(comment
  (b64 "{\"typ\":\"JWT\",\"alg\":\"ES256K-R\"}")
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"

  (b64 "{\"iss\":\"joe\",\"exp\":1300819380,\"http://example.com/is_root\":true}")
  "eyJpc3MiOiJqb2UiLCJleHAiOjEzMDA4MTkzODAsImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ"

  (b64 "83b3bec44b9cf25bb6c4bc81a283cf415e744588aec107c31c91d160845f7b92")
  "ODNiM2JlYzQ0YjljZjI1YmI2YzRiYzgxYTI4M2NmNDE1ZTc0NDU4OGFlYzEwN2MzMWM5MWQxNjA4NDVmN2I5Mg"

  (alphabase/base-to-base "MWMzMDQ0MDIyMDBmNjk3YTAyNDAxMmVmZDUzYTg2Njk2NTEwMWQwNmIxODllOGUxYzY1OTcwMGIwNjczYTFiYTk4MjEwZGU0ZmMwMjIwNDQyOGJiOGIzNmRmNDg1NGEyOWZkMTBlMmUxMWM5MzQ2MDZiNDgyMjRjMGMzNmY2ZDc0YzNhZGZhYTA0MGZmZA" :base64url :string)
  "1c304402200f697a024012efd53a866965101d06b189e8e1c659700b0673a1ba98210de4fc02204428bb8b36df4854a29fd10e2e11c934606b48224c0c36f6d74c3adfaa040ffd"

  (serialize-jws "{\"hello\":\"there\"}" "659a50e1be866d402c6f8175c22af38a1b4fe2ec510dcc50f5babfea5b35933f")
  "eyJhbGciOiJFUzI1NkstUiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19.eyJoZWxsbyI6InRoZXJlIn0.MWMzMDQ0MDIyMDMwYTBkN2JjM2NmYTU0ZWZhZmZkZjdlMTU0MTZiNzE5OWMxZDFkMWQ2NmRhOTQxODg3ZDAwZWE1YjUxNGZjZDgwMjIwNmQ2OTYwOWFlODNiODQ4OGI3MDRiNzczODkxZGRiNTVlMDM3NzQwNjE0NWJjNTBiYjlmN2UxYmMxMTI5ZWQ0Mw"

  (verify "eyJhbGciOiJFUzI1NkstUiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19.eyJoZWxsbyI6InRoZXJlIn0.MWMzMDQ0MDIyMDMwYTBkN2JjM2NmYTU0ZWZhZmZkZjdlMTU0MTZiNzE5OWMxZDFkMWQ2NmRhOTQxODg3ZDAwZWE1YjUxNGZjZDgwMjIwNmQ2OTYwOWFlODNiODQ4OGI3MDRiNzczODkxZGRiNTVlMDM3NzQwNjE0NWJjNTBiYjlmN2UxYmMxMTI5ZWQ0Mw")

  "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJoZWxsbyI6InRoZXJlIn0.MWMzMDQ0MDIyMDBmNjk3YTAyNDAxMmVmZDUzYTg2Njk2NTEwMWQwNmIxODllOGUxYzY1OTcwMGIwNjczYTFiYTk4MjEwZGU0ZmMwMjIwNDQyOGJiOGIzNmRmNDg1NGEyOWZkMTBlMmUxMWM5MzQ2MDZiNDgyMjRjMGMzNmY2ZDc0YzNhZGZhYTA0MGZmZA"

;; header;
  "alg" "ES256K"
  "jwk" "pubkey as jwk"
  "typ" "JOSE"                          ; indicates compact serialization
  "typ" "JOSE+JSON"                     ; indicates JSON serialization
  )
