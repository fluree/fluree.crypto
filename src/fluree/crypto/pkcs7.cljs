(ns fluree.crypto.pkcs7
  (:require [goog.array :as garray]))

(defn byte? [b]
  (and
    (number? b)
    (>= b 0)
    (<= b 255)
    (zero? (- b (Math/floor b)))))

(defn bytes? [bytes]
  (every? byte? bytes))

(defn compare-bytes [ba1 ba2]
  (if (not= (alength ba1) (alength ba2))
    false
    (if (or
          (not (bytes? ba1))
          (not (bytes? ba2)))
      false
      (every? true? (map = ba1 ba2)))))

(defn encode [k m]
  (let [n (- k (mod (alength m) k))]
    (.concat m (garray/repeat n n))))

(defn decode [k m]
  (let [len (alength m)
        last-byte (aget m (dec len))
        error (or
                (> last-byte len)
                (> last-byte k)
                (zero? last-byte)
                (not (zero? (mod len k))))]
    (when error (throw (js/Error. (str "invalid pkcs7 encoding: " m))))
    (let [computed (garray/repeat last-byte last-byte)
          provided (garray/slice m (- len last-byte))]
      (when-not (compare-bytes computed provided)
        (throw (js/Error. "paddings don't match")))
      (garray/slice m 0 (- len last-byte)))))
