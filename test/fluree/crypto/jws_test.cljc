(ns fluree.crypto.jws-test
  (:require [fluree.crypto :as crypto]
            [alphabase.core :as alphabase]
            [clojure.string :as str]
            [clojure.test :as t :refer [deftest testing is]]))

(deftest jws-ed25519-test
  (testing "JWS with Ed25519"
    (let [kp (crypto/generate-key-pair)
          payload "abcdefg"
          jws (crypto/create-jws payload kp)]
      ;; Test JWS creation
      (is (string? jws))
      (is (= 3 (count (str/split jws #"\."))))

      ;; Test JWS verification with key
      (let [result (crypto/verify-jws jws (:public kp))]
        (is (= payload (:payload result)))
        (is (= (:public kp) (:pubkey result))))

      ;; Test that wrong key fails verification
      (let [wrong-kp (crypto/generate-key-pair)]
        (is (thrown? #?(:clj Exception :cljs js/Error)
                     (crypto/verify-jws jws (:public wrong-kp))) "Should throw an exception"))

      ;; Test nil public key - JWS now includes pubkey by default so it should verify
      (let [result2 (crypto/verify-jws jws nil)]
        (is (= payload (:payload result2)) "Should verify with pubkey from JWS header"))

      ;; Test invalid JWS format
      (is (thrown? #?(:clj Exception :cljs js/Error)
                   (crypto/verify-jws "invalid.jws" (:public kp))) "Should throw an exception"))))

(deftest jws-header-test
  (testing "JWS header format for Ed25519"
    (let [kp (crypto/generate-key-pair)
          jws (crypto/create-jws "test" kp)
          [header-b64 _ _] (str/split jws #"\.")
          header (alphabase/base-to-base header-b64 :base64url :string)]
      ;; Ed25519 JWS should use EdDSA algorithm
      (is (re-find #"EdDSA" header))
      (is (re-find #"\"b64\":false" header))
      (is (re-find #"\"crit\":\[\"b64\"\]" header)))))

(deftest jws-cross-platform-test
  (testing "JWS cross-platform compatibility"
    ;; This test ensures that JWS created on one platform can be verified on another
    ;; Note: Due to Ed25519 deterministic signatures, we can test with fixed data

    (let [kp (crypto/generate-key-pair)
          payload "cross-platform test"
          jws1 (crypto/create-jws payload kp)
          jws2 (crypto/create-jws payload kp)]
      ;; Ed25519 signatures are deterministic
      (is (= jws1 jws2))

      ;; Both should verify successfully
      (let [result1 (crypto/verify-jws jws1 (:public kp))
            result2 (crypto/verify-jws jws2 (:public kp))]
        (is (= payload (:payload result1)))
        (is (= payload (:payload result2)))))))

(deftest jws-key-identification-test
  (testing "JWS with key identification features"
    (let [kp (crypto/generate-key-pair)
          payload "test payload"]

      ;; Test with account ID as kid
      (let [jws-with-kid (crypto/create-jws payload kp {:account-id true})
            result (crypto/verify-jws jws-with-kid)] ; No public key provided
        (is (not (instance? #?(:clj Exception :cljs js/Error) result)) "Should verify with account ID from header")
        (is (= payload (:payload result)))
        (is (= (:public kp) (:pubkey result)))
        (is (string? (:kid result)) "Should have kid in result")
        (is (<= 43 (count (:kid result)) 44) "Kid should be 43-44 char base58 account ID"))

      ;; Test with full public key embedded as JWK
      (let [jws-with-jwk (crypto/create-jws payload kp {:include-pubkey true})
            result (crypto/verify-jws jws-with-jwk)] ; No public key provided
        (is (not (instance? #?(:clj Exception :cljs js/Error) result)) "Should verify with JWK from header")
        (is (= payload (:payload result)))
        (is (= (:public kp) (:pubkey result)))
        (is (map? (:header result)) "Should have header map")
        (is (= "OKP" (get-in (:header result) [:jwk :kty])) "JWK should have correct key type"))

      ;; Test with custom kid
      (let [custom-kid "my-custom-key-id"
            jws-custom-kid (crypto/create-jws payload kp {:kid custom-kid})
            result (crypto/verify-jws jws-custom-kid (:public kp))] ; Provide public key since custom kid won't decode
        (is (not (instance? #?(:clj Exception :cljs js/Error) result)) "Should verify with custom kid")
        (is (= payload (:payload result)))
        (is (= custom-kid (:kid result)) "Should preserve custom kid")))))

(deftest jws-error-handling-test
  (testing "JWS error handling for missing public keys"
    (let [kp (crypto/generate-key-pair)
          payload "test payload"
          ;; Create JWS with custom kid that can't be used to derive public key and no pubkey
          jws-no-pubkey (crypto/create-jws payload kp {:kid "unknown-key" :include-pubkey false})]

      ;; Should fail when no public key provided and can't extract from header
      (is (thrown-with-msg? #?(:clj Exception :cljs js/Error)
                            #"No public key provided"
                            (crypto/verify-jws jws-no-pubkey))
          "Should throw error for missing public key")

      ;; Should succeed when public key is provided
      (let [result (crypto/verify-jws jws-no-pubkey (:public kp))]
        (is (= payload (:payload result)) "Should verify when public key provided")))))

(deftest jws-real-keypair-test
  (testing "JWS with real keypair for interoperability"
    (let [payload "Hello JWS interoperability test"]
      #?(:clj
         ;; In CLJ we need generated key pairs for full functionality
         (let [kp (crypto/generate-key-pair)
               jws (crypto/create-jws payload kp {:account-id true})
               result (crypto/verify-jws jws)]
           (is (not (instance? Exception result)) "Real keypair JWS should verify")
           (is (= payload (:payload result))))

         :cljs
         ;; In CLJS we can use hex strings directly
         (let [test-keypair {:public  "7f1215858ac4aa71a95b16b1ef024b1c344d5c25b6df3fe90a9f1513a4d2411e"
                             :private "162259eb44ebceca49e00bcc95496a2eeba5528886414859c95a3ee045cbd1f5"}
               jws-basic (crypto/create-jws payload test-keypair)
               jws-with-kid (crypto/create-jws payload test-keypair {:account-id true})
               jws-with-jwk (crypto/create-jws payload test-keypair {:include-pubkey true})

               ;; Verify basic JWS with provided key
               result1 (crypto/verify-jws jws-basic (:public test-keypair))
               ;; Verify JWS with kid (should extract key from account ID)
               result2 (crypto/verify-jws jws-with-kid)
               ;; Verify JWS with embedded public key
               result3 (crypto/verify-jws jws-with-jwk)]

           (is (not (instance? js/Error result1)) "Basic JWS should verify")
           (is (= payload (:payload result1)))

           (is (not (instance? js/Error result2)) "JWS with account ID should verify")
           (is (= payload (:payload result2)))
           (is (= (:public test-keypair) (:pubkey result2)))

           (is (not (instance? js/Error result3)) "JWS with embedded key should verify")
           (is (= payload (:payload result3)))
           (is (= (:public test-keypair) (:pubkey result3))))))))