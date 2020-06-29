(ns fluree.crypto.pkcs7-test
  (:require [cljs.test :refer [deftest is testing run-tests]]
            [alphabase.core :as alphabase]
            [fluree.crypto.pkcs7 :refer [byte? bytes? compare-bytes encode decode]]))

(deftest test-byte?
  (is (not (byte? 256)))
  (is (not (byte? "foo")))
  (is (byte? 0))
  (is (byte? 255))
  (is (byte? 42)))

(deftest test-bytes?
  (is (not (bytes? (array 1 2 3 300))))
  (is (bytes? (array 1 2 3 255))))

(deftest test-compare-bytes
  (testing "different lengths"
    (is (not (compare-bytes (array 1 2 3) (array 1 2 3 4)))))
  (testing "one not a byte array"
    (is (not (compare-bytes (array 1 2 3) (array 1 2 300)))))
  (testing "not equal contents"
    (is (not (compare-bytes (array 1 2 3) (array 1 2 4)))))
  (testing "equal"
    (is (true? (compare-bytes (array 1 2 255) (array 1 2 255))))))

(deftest test-pkcs7
  (testing "encode / decode round trip"
    (let [encoded (->> "test string"
                       alphabase/string->bytes
                       (encode 16))]
      (is (= "test string" (->> encoded
                                (decode 16)
                                alphabase/bytes->string))))))
