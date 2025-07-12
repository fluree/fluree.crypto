(ns fluree.crypto-test
  (:require
    #?@(:clj  [[clojure.test :refer :all]]
        :cljs [[cljs.test :refer-macros [deftest is testing]]
               [goog.object :as gobj]])
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

      (is (every? (fn [[k v]] (and
                                (= (crypto/normalize-string k) (crypto/normalize-string v))
                                (not= k v))) composed-decomposed-map)))))

(deftest string->byte-test
  (testing "String to byte conversions and back."
    (let [rdm-strs (repeatedly 10 (fn [] (random-string (rand-int 1000))))]

      (is (every? #(= % (-> % crypto/string->byte-array crypto/byte-array->string)) rdm-strs)))))

(deftest sha2-256-test
  (testing "SHA2-256"
    (let [rdm-strs (repeatedly 10 (fn [] (random-string (rand-int 1000))))]

      (is (every? #(= 64 (count (crypto/sha2-256 %))) rdm-strs))

      (is (every? (fn [[k v]]
                    (not= (crypto/sha2-256 k)
                          (crypto/sha2-256 v))) composed-decomposed-map)))))

(deftest sha2-256-normalize-test
  (testing "SHA2-256 normalize"
    (let [rdm-strs (repeatedly 10 (fn [] (random-string (rand-int 1000))))]

      (is (every? #(= 64 (count (crypto/sha2-256-normalize %))) rdm-strs))

      (is (every? (fn [[k v]]
                    (= (crypto/sha2-256-normalize k)
                       (crypto/sha2-256-normalize v))) composed-decomposed-map)))))

(deftest sha2-512-test
  (testing "SHA2-512"
    (let [rdm-strs (repeatedly 10 (fn [] (random-string (rand-int 1000))))]

      (is (every? #(= 128 (count (crypto/sha2-512 %))) rdm-strs))

      (is (every? (fn [[k v]]
                    (not= (crypto/sha2-512 k)
                          (crypto/sha2-512 v))) composed-decomposed-map)))))

(deftest sha2-512-normalize-test
  (testing "SHA2-512 normalize"
    (let [rdm-strs (repeatedly 10 (fn [] (random-string (rand-int 1000))))]

      (is (every? #(= 128 (count (crypto/sha2-512-normalize %))) rdm-strs))

      (is (every? (fn [[k v]]
                    (= (crypto/sha2-512-normalize k)
                       (crypto/sha2-512-normalize v))) composed-decomposed-map)))))

(deftest public-private-key-conversions
  (testing "Private key returns the same public keys"
    (let [{:keys [public private]} (crypto/generate-key-pair)
          public' (crypto/pub-key-from-private private)]
      (is (= public public')))))

(deftest account-id-from-public-test
  (testing "can derive account-id from public key"
    (let [{:keys [public]} (crypto/generate-key-pair)]
      ;; TODO: What else can assert about account-ids?
      (is (= 35
             (count (crypto/account-id-from-public public)))))))

(deftest account-id-from-private-test
  (testing "can derive account-id from private key"
    (let [{:keys [private]} (crypto/generate-key-pair)]
      ;; TODO: What else can assert about account-id's?
      (is (= 35
             (count (crypto/account-id-from-private private)))))))

(deftest account-id-deterministic-test
  (testing "Account ID generation is deterministic with SHA-256 truncation"
    ;; Test with a known public key to ensure deterministic results
    (let [public-key "035813c81e39b231b586f48e98bcfe6c0a71bdb17e2fa907463339ab1a9fb5e4a5"
          account-id (crypto/account-id-from-public public-key)]
      ;; Account ID should be deterministic for the same public key
      (is (= account-id (crypto/account-id-from-public public-key)))
      ;; Should be base58 encoded and 35 characters (as existing tests check)
      (is (= 35 (count account-id)))
      ;; Should be different from the original public key
      (is (not= public-key account-id)))))

(comment

  (run-tests)
  (= "abc"
     (-> (crypto/string->byte-array "abc")
         (crypto/byte-array->string)))


  (crypto/sha2-256 "apple")

  (= 64 (count (crypto/sha2-256 "apple")))


  (not= (crypto/sha2-256 (str "\u00C5"))
        (crypto/sha2-256 (str "\u0041\u030a")))




  (= (crypto/sha2-256-normalize (str "\u00C5"))
     (crypto/sha2-256-normalize (str "\u0041\u030a"))))
