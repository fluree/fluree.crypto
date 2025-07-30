(ns fluree.crypto.jws-roundtrip-demo
  (:require [clojure.test :refer [deftest testing is]]
            [clojure.string :as str]
            [fluree.crypto :as crypto]))

(deftest jws-roundtrip-demo-test
  (testing "JWS roundtrip with include-pubkey (demonstrates issue from user report)"
    ;; This test demonstrates the exact flow from the user's issue report
    ;; and proves the crypto library works correctly for this scenario

    ;; Use the same test keypair from our test suite
    (let [private-key-hex "162259eb44ebceca49e00bcc95496a2eeba5528886414859c95a3ee045cbd1f5"
          expected-public-key "7f1215858ac4aa71a95b16b1ef024b1c344d5c25b6df3fe90a9f1513a4d2411e"

          ;; Similar payload to the one in the issue (SPARQL-like query)
          payload "PREFIX ct: <ledger:credentialtest/>
                        SELECT ?name
                        FROM <credentialtest>
                        WHERE { \"did:key:z6MkircnczPD73DPTx3Gq7S4yKiKCEN3sWSZ1pqmWfeRryxJ\" ct:name ?name }"

          ;; Step 1: Create JWS with include-pubkey option (from user's issue line 17)
          jws (crypto/create-jws payload private-key-hex {:include-pubkey true})

          ;; Step 2: Verify the JWS (from user's issue lines 70, 90)
          result (crypto/verify-jws jws)]

      ;; Verify JWS was created successfully
      (is (string? jws) "JWS should be created as string")
      (is (= 3 (count (str/split jws #"\."))) "JWS should have 3 parts")

      ;; This should NOT return an Exception (contrary to user's issue report)
      (is (not (instance? #?(:clj Exception :cljs js/Error) result))
          "verify-jws should return map, not Exception")

      ;; Verify the result contains expected data
      (is (= payload (:payload result))
          "Payload should match original")
      (is (= expected-public-key (:pubkey result))
          "Public key should match expected")
      (is (contains? result :header)
          "Result should contain header")
      (is (contains? result :kid)
          "Result should contain kid (key identifier)"))

    ;; Also test with generated keypair to ensure robustness
    (let [kp (crypto/generate-key-pair)
          payload "test payload for generated keypair"
          jws (crypto/create-jws payload (:private kp) {:include-pubkey true})
          result (crypto/verify-jws jws)]

      (is (not (instance? #?(:clj Exception :cljs js/Error) result))
          "Generated keypair roundtrip should work")
      (is (= payload (:payload result))
          "Generated keypair payload should match")
      (is (= (:public kp) (:pubkey result))
          "Generated keypair public key should match"))))