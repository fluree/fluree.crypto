(ns fluree.crypto.secp256k1-test
  "These tests are run many times on random data because we have had several
  intermittent failures in this code (e.g. random numerical values with leading
  zeroes getting truncated and then causing 'incorrect length' errors later on."
  (:require #?@(:clj  [[clojure.test :refer :all]]
                :cljs [[cljs.test :refer-macros [deftest is testing]]])
            [fluree.crypto.test-utils :refer [random-string]]
            [fluree.crypto :as crypto]
            [fluree.crypto.secp256k1 :as sut]))

(deftest get-sin-from-public-key-test
  (testing "runs 1,000x (100x on the browser) on random keys"
    (let [times #?(:cljs (if (exists? js/window) 100 1000)
                   :clj  1000)]
      (dotimes [_ times]
        (let [{pub-key :public} (crypto/generate-key-pair)]
          (is (sut/get-sin-from-public-key pub-key)))))))

(deftest recover-public-key-test
  (testing "runs 1,000x (100x on the browser) on random valid values"
    (let [times #?(:cljs (if (exists? js/window) 100 1000)
                   :clj  1000)]
      (dotimes [_ times]
        (let [msg (random-string)
              {priv-key :private, pub-key :public :as kp} (crypto/generate-key-pair)
              sig (crypto/sign-message msg priv-key)
              recovered-pub-key (sut/recover-public-key msg sig)]
          (is (= (count pub-key) (count recovered-pub-key)))
          (is (= pub-key recovered-pub-key)))))))