(ns fluree.crypto.sha3-test
  (:require [alphabase.core :as alphabase]
            [clojure.test :refer [deftest is testing]]
            [fluree.crypto.sha3 :as sut]))

(deftest sha3-256-test
  (testing "string hashes correctly"
    (is (= "51145b3e8dd9c3d8f5da2053e7741c809f6f3d6404963c7cf7f1c1b5b43b5546"
           (alphabase/bytes->hex
            (sut/sha3-256 (alphabase/string->bytes "sha3-test-string")))))))

(deftest sha3-512-test
  (testing "string hashes correctly"
    (is (= "a0e16be9c25ad8afebad8669f2ceb84cb51f21191c7576b5bc5d0ce6a349c02c41df1c72f87dd04fefbbe20eb712327c223eee264ec1ef06d763f2374ebbf73d"
           (alphabase/bytes->hex
            (sut/sha3-512 (alphabase/string->bytes "sha3-test-string")))))))
