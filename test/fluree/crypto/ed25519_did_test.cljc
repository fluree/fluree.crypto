(ns fluree.crypto.ed25519-did-test
  "Tests for Ed25519 DID:key format support"
  (:require #?@(:clj  [[clojure.test :refer [deftest is testing]]]
                :cljs [[cljs.test :refer-macros [deftest is testing]]])
            [clojure.string :as str]
            [fluree.crypto :as crypto]
            [fluree.crypto.ed25519 :as ed25519]))

(deftest multibase-format-test
  (testing "Multibase format for DID:key compatibility"
    (let [kp (crypto/generate-key-pair)
          ;; Test all three formats
          base58-id (ed25519/get-account-id kp {:output-format :base58})
          hex-id (ed25519/get-account-id kp {:output-format :hex})
          multibase-id (ed25519/get-account-id kp {:output-format :multibase})]
      
      ;; Base58 format (Solana-style)
      (is (<= 43 (count base58-id) 44) "Base58 should be 43-44 characters")
      (is (not (.startsWith base58-id "z")) "Base58 should not start with z")
      
      ;; Hex format
      (is (= 64 (count hex-id)) "Hex should be exactly 64 characters")
      (is (re-matches #"[0-9a-f]{64}" hex-id) "Hex should be lowercase hex")
      
      ;; Multibase format (DID:key compatible)
      (is (.startsWith multibase-id "z") "Multibase should start with z")
      (is (> (count multibase-id) 45) "Multibase should be longer than base58")
      (is (< (count multibase-id) 55) "Multibase should be reasonable length"))))

(deftest did-key-generation-test
  (testing "DID:key generation from Ed25519 public keys"
    (let [kp (crypto/generate-key-pair)
          did-key (crypto/did-key-from-public (:public kp))]
      
      ;; DID:key format validation
      (is (.startsWith did-key "did:key:z") "DID should start with did:key:z")
      (is (> (count did-key) 50) "DID should have reasonable length")
      (is (< (count did-key) 70) "DID should not be excessively long")
      
      ;; Should be deterministic
      (let [did-key2 (crypto/did-key-from-public (:public kp))]
        (is (= did-key did-key2) "DID generation should be deterministic")))))

(deftest multibase-encoding-consistency-test
  (testing "Multibase encoding consistency across key types"
    (let [test-keys ["d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a"
                     "3d4017c3e843895a92b70aa74d1b7ebc9c982ccf2ec4968cc0cd55f12af4660c"
                     "fc51cd8e6218a1a38da47ed00230f0580816ed13ba3303ac5deb911548908025"]]
      
      (doseq [public-key test-keys]
        (let [multibase-id (ed25519/get-account-id public-key {:output-format :multibase})
              did-key (crypto/did-key-from-public public-key)]
          
          ;; Multibase should be consistent
          (is (.startsWith multibase-id "z") "Should start with z")
          (is (= did-key (str "did:key:" multibase-id)) "DID should be concatenation")
          
          ;; Should be deterministic for same key
          (let [multibase-id2 (ed25519/get-account-id public-key {:output-format :multibase})]
            (is (= multibase-id multibase-id2) "Multibase should be deterministic")))))))

(deftest format-conversion-test
  (testing "Different output formats for same key should be consistent"
    (let [public-key "d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a"
          base58-id (ed25519/get-account-id public-key {:output-format :base58})
          hex-id (ed25519/get-account-id public-key {:output-format :hex})
          multibase-id (ed25519/get-account-id public-key {:output-format :multibase})]
      
      ;; Hex should match the original key
      (is (= public-key hex-id) "Hex output should match original public key")
      
      ;; All should be different formats of same key
      (is (not= base58-id hex-id) "Base58 and hex should be different")
      (is (not= base58-id multibase-id) "Base58 and multibase should be different")
      (is (not= hex-id multibase-id) "Hex and multibase should be different")
      
      ;; But all should be deterministic
      (is (= base58-id (ed25519/get-account-id public-key {:output-format :base58})))
      (is (= hex-id (ed25519/get-account-id public-key {:output-format :hex})))
      (is (= multibase-id (ed25519/get-account-id public-key {:output-format :multibase}))))))

(deftest w3c-did-compatibility-test
  (testing "Generated DIDs should be compatible with W3C DID specification"
    (let [kp (crypto/generate-key-pair)
          did-key (crypto/did-key-from-public (:public kp))]
      
      ;; W3C DID method requirements
      (is (.startsWith did-key "did:") "Should start with did: scheme")
      (is (str/includes? did-key ":key:") "Should use key method")
      
      ;; Ed25519 multicodec (0xed01) should be present in multibase
      (let [multibase-part (subs did-key 8)] ; Remove "did:key:"
        (is (.startsWith multibase-part "z") "Multibase should use base58btc (z)")
        (is (> (count multibase-part) 40) "Should have reasonable length for Ed25519 + multicodec")))))

(deftest edge-case-public-keys-test
  (testing "Edge case public keys should generate valid DIDs"
    (let [edge-cases [;; All zeros (should still work)
                      "0000000000000000000000000000000000000000000000000000000000000000"
                      ;; All ones
                      "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
                      ;; Pattern
                      "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"]]
      
      (doseq [public-key edge-cases]
        (let [multibase-id (ed25519/get-account-id public-key {:output-format :multibase})
              did-key (crypto/did-key-from-public public-key)]
          (is (.startsWith multibase-id "z") "Edge case should produce valid multibase")
          (is (.startsWith did-key "did:key:z") "Edge case should produce valid DID")
          (is (= did-key (str "did:key:" multibase-id)) "DID should be properly formed"))))))