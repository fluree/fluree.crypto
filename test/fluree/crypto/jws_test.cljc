(ns fluree.crypto.jws-test
  (:require [fluree.crypto :as crypto]
            [clojure.test :as t :refer [deftest testing is]]))

(def kp
  {:private "42827e1ee6580a3cd367f31c4af2528db7269b8ea30c6cdff0af6e52d0c4480a"
   :public  "03ef89c5add9879110a18f107fe0f71879af36296f2984040d9b2816958d22fbab"})

(deftest jws
  (let [s                 "abcdefg"
        header-b64        "eyJhbGciOiJFUzI1NkstUiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19"
        payload-b64       "YWJjZGVmZw"
        clj-expected-sig  "MWMzMDQ1MDIyMTAwOTcxOWM0M2NlM2U3OTIzYjcyNTEzZTM0MWMxMzAxZjI1ODA2NmY3NDIzZDI3M2VjNGY3MjMzODFlNzdiMTA3OTAyMjAyMzQ3YjA1YjVlMWQ5NDVmYjkxNzgxYzg2M2MxNjlkOGE4NzhmOGNjZjg4Njk3MjBmZWUzM2I4YTA2ZTIwNjg2"
        cljs-expected-sig "MWIzMDQ1MDIyMTAwY2JkMzJlNDYzNTY3ZmVmYzJmMTIwNDI1YjAyMjRkOWQyNjMwMDg5MTE2NTNmNTBlODM5NTNmNDdjZmJlZjNiYzAyMjAwZjhiODMyNGZiOGI4NGNlZmY0MjQ0ZGZlODA3MTQ3MzY5YzBhYjQ3ZmQ0MDg3YjNkOTI3MmU4ZWNjOGU0NzYw"
        jws               (crypto/create-jws s (:private kp))]
    (is (= (str header-b64 "."
                payload-b64 "."
                #?(:clj clj-expected-sig :cljs cljs-expected-sig))
           jws))
    (let [cljs-jws (str header-b64 "." payload-b64 "." cljs-expected-sig)
          clj-jws  (str header-b64 "." payload-b64 "." clj-expected-sig)
          {cljs-payload :payload
           cljs-pubkey  :pubkey}
          (crypto/verify-jws cljs-jws)

          {clj-payload :payload
           clj-pubkey  :pubkey}
          (crypto/verify-jws clj-jws)]
      (testing "cross-platform verifiability"
        (is (= (:public kp) cljs-pubkey))
        (is (= (:public kp) clj-pubkey))
        (is (= s cljs-payload))
        (is (= s clj-payload))))))
