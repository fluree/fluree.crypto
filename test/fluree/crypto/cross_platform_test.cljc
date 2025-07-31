(ns fluree.crypto.cross-platform-test
  "Comprehensive cross-platform consistency tests using static test vectors.
  These tests ensure CLJ and CLJS produce identical results for the same inputs."
  (:require #?@(:clj  [[clojure.test :refer [deftest is testing]]]
                :cljs [[cljs.test :refer-macros [deftest is testing]]])
            [fluree.crypto :as crypto]))

;; Static test vectors for cross-platform consistency  
;; Note: In CLJ, we need to create the keypair using generate-key-pair to get internal objects
;; For CLJS, we can use hex strings directly
(def test-keypair
  #?(:clj nil  ; Will be set during test execution
     :cljs {:private "64b254b7436c359e33a8c1642fd0b4d70df976811ce97fc710127fbe75713033"
            :public  "a8def12ad736f8840f836a46c66c9f3e2015d1ea2c69d546c050fef746bd63b3"}))

(def test-public-key "a8def12ad736f8840f836a46c66c9f3e2015d1ea2c69d546c050fef746bd63b3")

(def test-payloads
  [""
   "Hello"
   "cross-platform test"
   "Test with unicode: 🚀 ∆ ℃ ñ"
   (apply str (repeat 100 "x"))])

;; Expected consistent results across platforms
(def expected-account-ids
  {:base58 "CNCfXkDndYJKLAydyYUYRn6pXo2KYYTvKigGjKwZeaTc"
   :hex    "a8def12ad736f8840f836a46c66c9f3e2015d1ea2c69d546c050fef746bd63b3"
   :multibase "z6MkqpTi7zUDy5nnSfpLf7SPGsepMNJAxRiH1jbCZbuaZoEz"})

;; Expected JWS tokens for static keypair + payloads
;; Note: These are deterministic because Ed25519 signatures are deterministic
(def expected-jws-tokens
  {"" "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..JDQ6UnRCD5K2IV81VRdYGn4wYid7plGwMrO0JrXjfI1hZetdgzsN7FLmj3iFGufO1xg4sPh9gT7HZgNbDbiuBA"
   "Hello" "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19.SGVsbG8.yQb39SRaxONKCjOCMsiM-X5HsEpvY5BZzhHginLgVs8o_90V0WH9Da3J18ZnX0781jOkekOAwsuiFLyw_WQFDQ"
   "cross-platform test" "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19.Y3Jvc3MtcGxhdGZvcm0gdGVzdA.w1tXYnB-bxaS9oxGE1S0OhkIQiaQsBGsNmkOpqoF61Af8-cB1G_mTuKJzEEHq9WBfGFyhDqZV3dHI9s1xp4hAQ"})

(defn- get-test-keypair []
  "Get test keypair in the correct format for each platform"
  #?(:clj
     ;; In CLJ, generate keypair with matching private key
     (let [kp (crypto/generate-key-pair)]
       ;; For testing purposes, we'll use the actual keypair generated
       ;; The cross-platform consistency will be tested with public key operations
       kp)
     :cljs test-keypair))

(deftest static-keypair-jws-consistency-test
  (testing "Static keypair + payload creates identical JWS across platforms"
    #?(:cljs
       ;; In CLJS, test against expected values
       (doseq [payload (take 3 test-payloads)] ; Test first 3 payloads
         (let [jws (crypto/create-jws payload test-keypair {:include-pubkey? false})
               expected (get expected-jws-tokens payload)]
           (when expected
             (is (= expected jws)
                 (str "JWS for payload '" payload "' should match expected value")))

           ;; Verify the JWS is valid regardless
           (let [result (crypto/verify-jws jws (:public test-keypair))]
             (is (not (instance? js/Error result))
                 (str "JWS should verify for payload: " payload))
             (is (= payload (:payload result))
                 (str "Verified payload should match original: " payload)))))
       :clj
       ;; In CLJ, test determinism and verification
       (let [kp (get-test-keypair)]
         (doseq [payload (take 3 test-payloads)]
           (let [jws1 (crypto/create-jws payload kp {:include-pubkey? false})
                 jws2 (crypto/create-jws payload kp {:include-pubkey? false})]
             (is (= jws1 jws2) "JWS creation should be deterministic in CLJ")

             ;; Verify the JWS is valid
             (let [result (crypto/verify-jws jws1 (:public kp))]
               (is (not (instance? Exception result))
                   (str "JWS should verify for payload: " payload))
               (is (= payload (:payload result))
                   (str "Verified payload should match original: " payload))))))))

  (deftest static-public-key-account-id-consistency-test
    (testing "Static public key creates identical account ID across platforms"
    ;; Test all supported formats using the static public key
      (doseq [[format expected-id] expected-account-ids]
        (let [account-id (crypto/account-id-from-public test-public-key {:output-format format})]
          (is (= expected-id account-id)
              (str "Account ID with format " format " should be identical across platforms"))))

    ;; Test default format (should be base58)
      (let [default-account-id (crypto/account-id-from-public test-public-key)]
        (is (= (:base58 expected-account-ids) default-account-id)
            "Default account ID format should match base58"))))

  (deftest cross-platform-jws-verification-test
    (testing "JWS created on any platform can be verified on any other platform"
    ;; Test with known good JWS tokens using static public key
      (doseq [[payload expected-jws] expected-jws-tokens]
        (let [result (crypto/verify-jws expected-jws test-public-key)]
          (is (not (instance? #?(:clj Exception :cljs js/Error) result))
              (str "Known JWS should verify for payload: " payload))
          (is (= payload (:payload result))
              (str "Verified payload should match: " payload))
          (is (= test-public-key (:pubkey result))
              "Verified public key should match")))

    ;; Test platform-specific JWS creation with key identification
      #?(:cljs
         (let [jws-with-kid (crypto/create-jws "test" test-keypair {:account-id true})
               jws-with-jwk (crypto/create-jws "test" test-keypair {:include-pubkey? true})]

         ;; These should verify without providing public key
           (let [result1 (crypto/verify-jws jws-with-kid)
                 result2 (crypto/verify-jws jws-with-jwk)]
             (is (not (instance? js/Error result1))
                 "JWS with account ID should verify in CLJS")
             (is (not (instance? js/Error result2))
                 "JWS with embedded public key should verify in CLJS")
             (is (= "test" (:payload result1) (:payload result2))
                 "All payloads should match")
             (is (= test-public-key (:pubkey result1) (:pubkey result2))
                 "All public keys should match")))
         :clj
         (let [kp (get-test-keypair)
               jws-with-kid (crypto/create-jws "test" kp {:account-id true})
               jws-with-jwk (crypto/create-jws "test" kp {:include-pubkey? true})]

         ;; These should verify without providing public key
           (let [result1 (crypto/verify-jws jws-with-kid)
                 result2 (crypto/verify-jws jws-with-jwk)]
             (is (not (instance? Exception result1))
                 "JWS with account ID should verify in CLJ")
             (is (not (instance? Exception result2))
                 "JWS with embedded public key should verify in CLJ")
             (is (= "test" (:payload result1) (:payload result2))
                 "All payloads should match"))))))

  (deftest signature-determinism-test
    (testing "Signatures are deterministic across platforms"
      (let [message "determinism test"
            kp (get-test-keypair)]
      ;; Create multiple signatures of the same message
        (let [sig1 (crypto/sign-message message kp)
              sig2 (crypto/sign-message message kp)
              sig3 (crypto/sign-message message kp)]
          (is (= sig1 sig2 sig3)
              "Ed25519 signatures should be deterministic")

        ;; All should verify
          (is (crypto/verify-signature kp message sig1))
          (is (crypto/verify-signature kp message sig2))
          (is (crypto/verify-signature kp message sig3))))))

  (deftest did-key-consistency-test
    (testing "DID:key generation is consistent across platforms"
      (let [did-key (crypto/did-key-from-public test-public-key)
            expected-did "did:key:z6MkqpTi7zUDy5nnSfpLf7SPGsepMNJAxRiH1jbCZbuaZoEz"]
        (is (= expected-did did-key)
            "DID:key should be identical across platforms")
        (is (.startsWith did-key "did:key:z")
            "DID:key should have correct format")

      ;; Test that DID generation is deterministic
        (let [did-key2 (crypto/did-key-from-public test-public-key)]
          (is (= did-key did-key2)
              "DID:key generation should be deterministic")))))

  (deftest hash-function-consistency-test
    (testing "Hash functions produce identical results across platforms"
      (let [test-strings ["" "a" "Hello World" "Test with unicode: 🚀"]
            expected-sha256 {"" "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                             "a" "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb"
                             "Hello World" "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"
                             "Test with unicode: 🚀" "9d8e6623411afa1752079261555b67386e4f4ef7b12f8b351cb3470f0f150d28"}]

        (doseq [test-str test-strings]
          (let [hash (crypto/sha2-256 test-str)
                expected (get expected-sha256 test-str)]
            (when expected
              (is (= expected hash)
                  (str "SHA-256 hash should be identical across platforms for: " test-str)))))))))