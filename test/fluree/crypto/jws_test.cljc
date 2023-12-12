(ns fluree.crypto.jws-test
  (:require [fluree.crypto :as crypto]
            [clojure.test :as t :refer [deftest testing is]]))

(def kp
  {:private "42827e1ee6580a3cd367f31c4af2528db7269b8ea30c6cdff0af6e52d0c4480a"
   :public "03ef89c5add9879110a18f107fe0f71879af36296f2984040d9b2816958d22fbab"})

(deftest jws
  (let [s   "abcdefg"
        jws (crypto/create-jws s (:private kp))]
    (is (= (str "eyJhbGciOiJFUzI1NkstUiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19."
                "YWJjZGVmZw."
                #?(:clj
                   "MWMzMDQ1MDIyMTAwOTcxOWM0M2NlM2U3OTIzYjcyNTEzZTM0MWMxMzAxZjI1ODA2NmY3NDIzZDI3M2VjNGY3MjMzODFlNzdiMTA3OTAyMjAyMzQ3YjA1YjVlMWQ5NDVmYjkxNzgxYzg2M2MxNjlkOGE4NzhmOGNjZjg4Njk3MjBmZWUzM2I4YTA2ZTIwNjg2"
                   :cljs
                   "MWIzMDQ1MDIyMTAwY2JkMzJlNDYzNTY3ZmVmYzJmMTIwNDI1YjAyMjRkOWQyNjMwMDg5MTE2NTNmNTBlODM5NTNmNDdjZmJlZjNiYzAyMjAwZjhiODMyNGZiOGI4NGNlZmY0MjQ0ZGZlODA3MTQ3MzY5YzBhYjQ3ZmQ0MDg3YjNkOTI3MmU4ZWNjOGU0NzYw"))
           jws))
    (let [{:keys [payload pubkey]} (crypto/verify-jws jws)]
      (is (= pubkey (:public kp)))
      (is (= s payload)))))
