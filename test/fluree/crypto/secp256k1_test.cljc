(ns fluree.crypto.secp256k1-test
  (:require #?@(:clj  [[clojure.test :refer :all]]
                :cljs [[cljs.test :refer-macros [deftest is testing]]])
            [fluree.crypto.test-utils :refer [random-string]]
            [fluree.crypto :as crypto]
            [fluree.crypto.secp256k1 :as sut]))

(deftest get-sin-from-public-key-test
  (testing "runs 1,000x on random keys"
    (dotimes [_ 1000]
      (let [{pub-key :public} (crypto/generate-key-pair)]
        (is (sut/get-sin-from-public-key pub-key))))))

(deftest recover-public-key-test
  (testing "runs 1,000x on random valid values"
    (dotimes [_ 1000]
      (let [msg (random-string)
            {priv-key :private, pub-key :public} (crypto/generate-key-pair)
            sig (crypto/sign-message msg priv-key)
            recovered-pub-key (sut/recover-public-key msg sig)]
        (is (= (count pub-key) (count recovered-pub-key)))
        (is (= pub-key recovered-pub-key))))))