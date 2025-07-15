(ns fluree.crypto-test
  (:require
    #?@(:clj  [[clojure.test :refer [deftest is testing]]]
        :cljs [[cljs.test :refer-macros [deftest is testing]]])
    [fluree.crypto.test-utils :refer [random-string]]
    [fluree.crypto :as crypto]))


(def composed-decomposed-map
  {(str "\u00C5") (str "\u0041\u030a")
   (str "\u212B") (str "\u0041\u030a")
   (str "\u00e9") (str "\u0065\u0301")})


(deftest normalize-string-test
  (testing "Normalize string test"
    (let [rdm-str (random-string 10)]

      (is (= (count (crypto/normalize-string rdm-str)) 10))

      (doseq [[k v] composed-decomposed-map]
        (is (= (crypto/normalize-string k)
               (crypto/normalize-string v)))))))

(deftest sha2-256-normalize-test
  (testing "SHA-256 with NFKC normalization"
    (doseq [[k v] composed-decomposed-map]
      (is (= (crypto/sha2-256-normalize k)
             (crypto/sha2-256-normalize v))))))

(deftest sha2-512-normalize-test
  (testing "SHA-512 with NFKC normalization"
    (doseq [[k v] composed-decomposed-map]
      (is (= (crypto/sha2-512-normalize k)
             (crypto/sha2-512-normalize v))))))

(deftest string-hash-test
  (testing "string normalize then hash test"
    (is (= "58acf888b520fe51ecc0e4e5eef46c3bea3ca7df4c11f6719a1c2471bbe478bf"
           (crypto/sha2-256-normalize (str "\u0041\u030a" "pple"))))

    (is (= "58acf888b520fe51ecc0e4e5eef46c3bea3ca7df4c11f6719a1c2471bbe478bf"
           (crypto/sha2-256-normalize (str "\u00C5" "pple"))))

    (is (= "6c406d5e0a5910aeee9adf14425427aa864d55e3dce675eae68d4ad5d6d560199667ac6c8186091f83041f4c8708573881d93ba0e47717bf491a06820a84efef"
           (crypto/sha2-512-normalize (str "\u00C5" "pple"))))

    (is (= "6c406d5e0a5910aeee9adf14425427aa864d55e3dce675eae68d4ad5d6d560199667ac6c8186091f83041f4c8708573881d93ba0e47717bf491a06820a84efef"
           (crypto/sha2-512-normalize (str "\u0041\u030a" "pple"))))

    (testing "Should be 64 chars"
      (is (= 64 (count (crypto/sha2-256 "Hello"))))
      (is (= 128 (count (crypto/sha2-512 "Hello")))))

    (testing "different normalization forms"
      (doseq [[k v] composed-decomposed-map]
        (is (= (crypto/sha2-256-normalize k)
               (crypto/sha2-256-normalize v)))
        (is (= (crypto/sha2-512-normalize k)
               (crypto/sha2-512-normalize v)))))))

(deftest account-id-from-public-test
  (testing "can derive account-id from public key"
    (let [kp (crypto/generate-key-pair)
          account-id (crypto/account-id-from-public (:public kp))]
      (is (<= 43 (count account-id) 44)))))

(deftest account-id-deterministic-test
  (testing "Account ID generation is deterministic"
    (let [kp (crypto/generate-key-pair)
          account-id1 (crypto/account-id-from-public kp)
          account-id2 (crypto/account-id-from-public (:public kp))]
      (is (= account-id1 account-id2))
      (is (<= 43 (count account-id1) 44))
      (is (not= (:public kp) account-id1)))))

(deftest ed25519-signing-test
  (testing "Ed25519 signing and verification"
    (let [kp (crypto/generate-key-pair)
          message "test message for signing"
          signature (crypto/sign-message message kp)]
      (is (string? signature))
      (is (= 128 (count signature)))
      (let [result (crypto/verify-signature kp message signature)
            wrong-result (crypto/verify-signature kp "wrong message" signature)]
        (is result)
        (is (not wrong-result))))))