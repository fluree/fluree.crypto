(ns fluree.crypto-test
  (:require
    [clojure.string :as str]
    #?@(:clj  [[clojure.test :refer :all]]
        :cljs [[cljs.test :refer-macros [deftest is testing]]
               [goog.object :as gobj]])
    [fluree.crypto :as crypto]))

;http://blog.raphinou.com/2009/03/generate-random-string-in-clojure.html

;Clojure-specific code for randomness
#?(:clj (def random (java.util.Random.)))

;define characters list to use to generate string (#clj)
#?(:clj (def char-range
          (map char (concat (range 48 58) (range 66 92) (range 97 123)))))

;generates 1 random character
(defn random-char []
  #?(:clj  (nth char-range (.nextInt random (count char-range)))
     :cljs (.toString (rand-int 16rF) 16)))

; generates random string of length characters
(defn random-string [length]
  (apply str (take length (repeatedly random-char))))

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
    (let [kp*     (crypto/generate-key-pair)
          public  (-> kp*
                      #?(:clj  :public
                         :cljs (gobj/get "public")))
          private (-> kp*
                      #?(:clj  :private
                         :cljs (gobj/get "private")))
          public' (crypto/pub-key-from-private private)]
      (is (= public public')))))

(deftest account-id-from-public-test
  (testing "can derive account-id from public key"
    (let [kp     (crypto/generate-key-pair)
          public (-> kp
                     #?(:clj  :public
                        :cljs (gobj/get "public")))]
      ;; TODO: What else can assert about account-ids?
      (is (= 35
             (count (crypto/account-id-from-public public)))))))

(deftest account-id-from-private-test
  (testing "can derive account-id from private key"
    (let [kp      (crypto/generate-key-pair)
          private (-> kp
                      #?(:clj  :private
                         :cljs (gobj/get "private")))]
      ;; TODO: What else can assert about account-id's?
      (is (= 35
             (count (crypto/account-id-from-private private)))))))

(deftest ripemd-160-test
  (testing "RIPEMD-160 Hash"
    (is (= "ad6ce46f7f1ea8519dc02ce8ce0c278c6ff329b2"
           (crypto/ripemd-160 "hi there!")))))

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