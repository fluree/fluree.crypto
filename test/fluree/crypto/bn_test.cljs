(ns fluree.crypto.bn-test
  (:require [cljs.test :refer-macros [deftest is testing]]
            ["@fluree/sjcl" :as sjcl]
            [fluree.crypto.bn :as sut]))

(deftest >=-test
  (testing "returns true for a greater than b"
    (is (sut/>= (sjcl/bn. 10) (sjcl/bn. 5))))
  (testing "returns true for a equals b"
    (is (sut/>= (sjcl/bn. 10) (sjcl/bn. 10))))
  (testing "returns false for a less than b"
    (is (not (sut/>= (sjcl/bn. 5) (sjcl/bn. 10))))))
