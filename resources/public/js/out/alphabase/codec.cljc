(ns alphabase.codec
  "Core encoding and decoding functions for use with arbitrary bases."
  (:require
    [alphabase.bytes :as bytes]))


;; ## Encoding

#?(:clj
   (defn- bigint-divide
     "Uses optimized big-integer division to calculate a sequence of tokens
     from a byte array. Only works in Clojure!"
     [^String alphabet ^bytes data]
     ; Bigint math: ~67 µs
     (let [base (count alphabet)]
       (loop [n (bigint (BigInteger. 1 data))
              tokens (list)]
         (if (< n base)
           (conj tokens (nth alphabet n))
           (let [digit (mod n base)]
             (recur
               (/ (- n digit) base)
               (conj tokens (nth alphabet digit)))))))))


(defn- pure-divide
  "Pure implementation of radix division to calculate a sequence of
  tokens from a byte array."
  [alphabet data]
  ; Persistent collections: ~620 µs
  ; Transient collections:  ~515 µs
  (let [base (count alphabet)]
    (->>
      (bytes/byte-seq data)
      (reduce
        (fn add-byte
          [digits value]
          (loop [digits digits
                 carry value
                 i 0]
            (if (< i (count digits))
              ; Propagate carry value across digits.
              (let [carry' (+ carry (bit-shift-left (nth digits i) 8))]
                (recur (assoc! digits i (mod carry' base))
                       (int (/ carry' base))
                       (inc i)))
              ; Outside digits, add new for remaining carry.
              (if (pos? carry)
                (recur (conj! digits (mod carry base))
                       (int (/ carry base))
                       (inc i))
                digits))))
        (transient [0]))
      (persistent!)
      (reverse)
      (map (partial nth alphabet)))))


(defn encode
  "Encodes binary data using the given alphabet. Returns the encoded string, or
  nil if the input is nil or empty."
  [alphabet ^bytes data]
  {:pre [(string? alphabet) (< 1 (count alphabet))]}
  (when (and data (not (zero? (alength data))))
    (let [zeroes (count (take-while zero? (bytes/byte-seq data)))]
      (->>
        (when (< zeroes (alength data))
          #?(:clj (bigint-divide alphabet data)
             :default (pure-divide alphabet data)))
        (concat (repeat zeroes (first alphabet)))
        (apply str)))))



;; ## Decoding

#?(:clj
   (defn- bigint-multiply
     "Uses optimized big-integer multiplication to decode a sequence of byte
     values from a string of tokens. Only works in Clojure!"
     [^String alphabet tokens]
     ; Bigint math: ~74 µs
     (->
       (reverse tokens)
       (->>
         (map vector (iterate (partial * (count alphabet)) 1N))
         ^clojure.lang.BigInt
         (reduce
           (fn read-token
             [n [base token]]
             (let [digit (.indexOf alphabet (str token))]
               (when (neg? digit)
                 (throw (ex-info
                          (str "Invalid token: " (pr-str token)
                               " is not in alphabet " (pr-str alphabet))
                          {:alphabet alphabet, :token token})))
               (+ n (* (bigint digit) base))))
           0N)
         (.toBigInteger)
         (.toByteArray))
       (as-> data
         (if (and (> (alength data) 1)
                  (zero? (aget data 0))
                  (neg? (aget data 1)))
           (drop 1 data)
           (seq data))))))


(defn- pure-multiply
  "Pure implementation of radix multiplication to calculate a sequence of byte
  values from a string of tokens."
  [^String alphabet tokens]
  ; Persistent collections: ~255 µs
  ; Transient collections:  ~200 µs
  (let [base (count alphabet)]
    (->>
      (seq tokens)
      (reduce
        (fn add-token
          [bytev token]
          (let [value (.indexOf alphabet (str token))]
            (when (neg? value)
              (throw (ex-info
                       (str "Invalid token " (pr-str token) " is not in " *ns*
                            " (" base ") alphabet")
                       {:alphabet alphabet, :token token})))
            (loop [bytev bytev
                   carry value
                   i 0]
              (if (< i (count bytev))
                ; Emit bytes as we carry values forward.
                (let [carry' (+ carry (* base (nth bytev i)))]
                  (recur (assoc! bytev i (bit-and carry' 0xff))
                         (bit-shift-right carry' 8)
                         (inc i)))
                ; Outside bytes, add new for remaining carry.
                (if (pos? carry)
                  (recur (conj! bytev (bit-and carry 0xff))
                         (bit-shift-right carry 8)
                         (inc i))
                  bytev)))))
        (transient [0]))
      (persistent!)
      (reverse))))


(defn decode
  "Decodes a string of alphabet tokens. Returns the decoded binary array, or nil
  if the input is nil or empty."
  [alphabet tokens]
  {:pre [(string? alphabet) (not (empty? alphabet))]}
  (when-not (empty? tokens)
    (let [zeroes (count (take-while #{(first alphabet)} tokens))]
      (if (= zeroes (count tokens))
        (bytes/byte-array zeroes)
        (let [byte-seq #?(:clj (bigint-multiply alphabet tokens)
                          :default (pure-multiply alphabet tokens))
              data (bytes/byte-array (+ zeroes (count byte-seq)))]
          (dotimes [i (count byte-seq)]
            (bytes/set-byte data (+ zeroes i) (nth byte-seq i)))
          data)))))



