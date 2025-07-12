(ns alphabase.bytes
  "Functions to generically handle byte arrays."
  (:refer-clojure :exclude [bytes? byte-array compare concat]))


(defn to-byte
  "Coerces a number to a byte value."
  [x]
  #?(:clj  (if (< 127 x) (- x 256) x)
     :cljs x))


(defn from-byte
  "Coerces a byte value to a number."
  [x]
  #?(:clj  (if (neg? x) (+ 256 x) x)
     :cljs x))


(defn get-byte
  "Reads a byte value out of an array and coerces it to a number."
  [^bytes array i]
  (from-byte (aget array i)))


(defn set-byte
  "Sets a byte value in an array after coercing it from a number."
  [^bytes array i x]
  (aset array i (byte (to-byte x))))


(defn byte-seq
  "Return a sequence of the bytes in an array, after coercion."
  [array]
  (when array
    #?(:clj  (map from-byte array)
       :cljs (map #(aget array %) (range (alength array))))))


(defn bytes?
  "True if the argument is a byte array compatible with this library."
  [x]
  #?(:clj (clojure.core/bytes? x)
     :cljs
          (or (instance? js/Uint8Array x)
              (and (instance? js/Array x)
                   (or (empty? x)
                       (integer? (first x)))))))


(defn bytes=
  "Returns true if two byte sequences are the same length and have the same
  byte content."
  [a b]
  (and
    (bytes? a) (bytes? b)
    (let [^bytes a a
          ^bytes b b]
      (and
        (= (alength a) (alength b))
        (loop [i 0]
          (if (< i (alength a))
            (if (= (get-byte a i) (get-byte b i))
              (recur (inc i))
              false)
            true))))))


(defn byte-array
  "Creates a new array to hold byte data."
  ^bytes
  [length]
  #?(:clj  (clojure.core/byte-array length)
     :cljs (js/Uint8Array. (js/ArrayBuffer. length))))


(defn copy
  "Copies bytes from one array to another.

  - If only a source is given, returns a full copy of the byte array.
  - If a source and a destination with offset are given, copies all of the
    bytes from the source into the destination at that offset. Returns the
    number of bytes copied.
  - If all arguments are given, copies `length` bytes from the source at the
    given offset to the destination at its offset. Returns the number of bytes
    copied."
  ([^bytes src]
   (let [dst (byte-array (alength src))]
     (copy src dst 0)
     dst))
  ([^bytes src dst dst-offset]
   (copy src 0 dst dst-offset (alength src)))
  ([^bytes src src-offset ^bytes dst dst-offset length]
    #?(:clj  (System/arraycopy src src-offset dst dst-offset length)
       :cljs (dotimes [i length]
               (set-byte dst (+ i dst-offset) (get-byte src (+ i src-offset)))))
   length))


(defn init-bytes
  "Initialize a new array with the given sequence of byte values."
  ^bytes
  [values]
  (let [length (count values)
        data   (byte-array length)]
    (dotimes [i length]
      (set-byte data i (nth values i)))
    data))


(defn random-bytes
  "Returns a byte array `length` bytes long with random content."
  ^bytes
  [length]
  (let [data (byte-array length)]
    #?(:clj  (.nextBytes (java.security.SecureRandom.) data)
       :cljs (dotimes [i length]
               (set-byte data i (rand-int 256))))
    data))


(defn compare
  "Lexicographically compares two byte-arrays for order. Returns a negative
  number, zero, or a positive number if `a` is less than, equal to, or greater
  than `b`, respectively.

  This ranking compares each byte in the keys in order; the first byte which
  differs determines the ordering; if the byte in `a` is less than the byte in
  `b`, `a` ranks before `b`, and vice versa.

  If the keys differ in length, and all the bytes in the shorter key match the
  longer key, the shorter key ranks first."
  [^bytes a ^bytes b]
  (let [prefix-len (min (alength a) (alength b))]
    (loop [i 0]
      (if (< i prefix-len)
        ; Compare next byte in sequence
        (let [ai (get-byte a i)
              bi (get-byte b i)]
          (if (= ai bi)
            (recur (inc i))
            (- ai bi)))
        ; Reached the end of the shorter key, compare lengths.
        (- (alength a) (alength b))))))


(defn copy-slice
  "Copy a slice (defined by offset, length) from a byte array.

  Omitting the slice `len` argument will copy remainder of
  `src` array from offset (e.g, `(- (alength src) offset)` bytes)."
  ^bytes
  ([^bytes src offset len]
   (let [dst (byte-array len)]
     (copy src offset dst 0 len)
     dst))
  ^bytes
  ([^bytes src offset]
   (copy-slice src offset (- (alength src) offset))))


(defn concat
  "Concatenate bytes arrays into a single new byte array."
  ^bytes
  [& arrs]
  (let [arrs      (remove nil? arrs)
        total-len (reduce + (map #(alength ^bytes %) arrs))
        dst       (byte-array total-len)]
    (loop [arrs   arrs
           offset 0]
      (when-let [^bytes src (first arrs)]
        (copy src 0 dst offset (alength src))
        (recur (rest arrs) (+ offset (alength src)))))
    dst))
