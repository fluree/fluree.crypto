(ns fluree.crypto.test-utils
  #?(:clj (:import (java.util Random))))

;http://blog.raphinou.com/2009/03/generate-random-string-in-clojure.html

#?(:clj (def random (Random.)))

;define characters list to use to generate string
#?(:clj (def char-range
          (map char (concat (range 48 58) (range 66 92) (range 97 123)))))

(defn random-char []
  #?(:clj  (nth char-range (.nextInt random (count char-range)))
     :cljs (.toString (rand-int 16rF) 16)))

(defn random-string
  ([] (random-string #?(:clj  (.nextInt random 10000)
                        :cljs (rand-int 10000))))
  ([length]
   (apply str (take length (repeatedly random-char)))))