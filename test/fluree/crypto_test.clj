(ns fluree.crypto-test
  (:require [clojure.test :refer :all]
            [fluree.crypto :refer :all]
            [alphabase.core :as alphabase]
            [fluree.crypto.ripemd :as ripemd]))


;http://blog.raphinou.com/2009/03/generate-random-string-in-clojure.html

(def random (java.util.Random.))

;define characters list to use to generate string
(def char-range
  (map char (concat (range 48 58) (range 66 92) (range 97 123))))

;generates 1 random character
(defn random-char []
  (nth char-range (.nextInt random (count char-range))))

; generates random string of length characters
(defn random-string [length]
  (apply str (take length (repeatedly random-char))))

(def composed-decomposed-map
  {(str "\u00C5")  (str "\u0041\u030a")
   (str "\u212B")  (str "\u0041\u030a")
   (str "\u00e9") (str "\u0065\u0301")})


(deftest normalize-string-test
  (testing "Normalize string test"
    (let [rdm-str  (random-string 10)]

      (is (= (count (normalize-string rdm-str)) 10))

      (is (every? (fn [[k v]] (and
                                (= (normalize-string k) (normalize-string v))
                                (not= k v))) composed-decomposed-map)))))

(deftest string->byte-test
  (testing "String to byte conversions and back."
    (let [rdm-strs (repeatedly 10 (fn [] (random-string (rand-int 1000))))]

      (is (every? #(= % (-> % string->byte-array byte-array->string)) rdm-strs)))))

(deftest sha2-256-test
  (testing "SHA2-256"
    (let [rdm-strs (repeatedly 10 (fn [] (random-string (rand-int 1000))))]

      (is (every? #(= 64 (count (sha2-256 %))) rdm-strs))

      (is (every? (fn [[k v]]
                    (not= (sha2-256 k)
                          (sha2-256 v))) composed-decomposed-map)))))

(deftest sha2-256-normalize-test
  (testing "SHA2-256 normalize"
    (let [rdm-strs (repeatedly 10 (fn [] (random-string (rand-int 1000))))]

      (is (every? #(= 64 (count (sha2-256-normalize %))) rdm-strs))

      (is (every? (fn [[k v]]
                    (= (sha2-256-normalize k)
                       (sha2-256-normalize v))) composed-decomposed-map)))))

(deftest sha2-512-test
  (testing "SHA2-512"
    (let [rdm-strs (repeatedly 10 (fn [] (random-string (rand-int 1000))))]

      (is (every? #(= 128 (count (sha2-512 %))) rdm-strs))

      (is (every? (fn [[k v]]
                    (not= (sha2-512 k)
                          (sha2-512 v))) composed-decomposed-map)))))

(deftest sha2-512-normalize-test
  (testing "SHA2-512 normalize"
    (let [rdm-strs (repeatedly 10 (fn [] (random-string (rand-int 1000))))]

      (is (every? #(= 128 (count (sha2-512-normalize %))) rdm-strs))

      (is (every? (fn [[k v]]
                    (= (sha2-512-normalize k)
                       (sha2-512-normalize v))) composed-decomposed-map)))))

(deftest public-private-key-conversions
  (testing "Private key returns the same public keys"
    (let [{:keys [public private]}  (generate-key-pair)
          public' (pub-key-from-private private)]

      (is (= public public')))))

(deftest ripemd-160-test
  (testing "RIPEMD-160 Hash"
    (is (= "ad6ce46f7f1ea8519dc02ce8ce0c278c6ff329b2"
           (ripemd-160 "hi there!")))))

(comment

  (run-tests)
  (= "abc"
     (-> (string->byte-array "abc")
         (byte-array->string)))


  (sha2-256 "apple")

  (= 64 (count (sha2-256 "apple")))


  (not= (sha2-256 (str "\u00C5"))
        (sha2-256 (str "\u0041\u030a")))




  (= (sha2-256-normalize (str "\u00C5"))
     (sha2-256-normalize (str "\u0041\u030a"))))