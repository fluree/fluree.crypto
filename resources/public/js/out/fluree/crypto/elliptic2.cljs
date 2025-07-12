(ns fluree.crypto.elliptic2
  (:require [sjcl.bitArray :as bitArray]
            [sjcl.codec.bytes :as codecBytes]
            [sjcl.hash.ripemd160]
            [sjcl.hash.sha256 :as sha256]
            [alphabase.core :as alphabase]
            [sjcl.ecc :as ecc]
            [sjcl.bn :as bn]))

(defn to-bitArray
  [x format]
  (-> x
      (alphabase/base-to-byte-array format)
      (codecBytes/toBits)))

(defn- bn-even?
  "Returns true/false if big number is even."
  [bn]
  (.equals (.mod bn 2) 0))


(defn x962-encode
  "Encode a sjcl.ecc.point using X9.62 compression."
  ([pub-key] (x962-encode pub-key true))
  ([pub-key compressed?]
   (let [x (.-x pub-key)
         y (.-y pub-key)]
     (if compressed?
       ;; compressed prepended with 0x02 if y is even number, else 0x03
       (let [y-bn    (bn/fromBits y)
             y-even? (bn-even? y-bn)
             x-bytes (codecBytes/fromBits x)]
         (if y-even?
           (.unshift x-bytes 2)
           (.unshift x-bytes 3))
         x-bytes)
       ;; uncompressed combined x and y coord, prepended with 0x04 byte
       (let [combined (-> x (.concat y) codecBytes/fromBits)]
         (.unshift combined 4)
         combined)))))

;; adapted from https://github.com/Sepia-Officinalis/secp256k1
(defn modular-square-root
  "Compute the square root of a number modulo a prime.
  Number and modulus should be big numbers (bn)."
  [n modulus]
  (let [n    (.mod n modulus)
        mod8 (-> modulus (.mod 8) .toString js/parseInt)]
    (assert (.greaterEquals modulus 0), "Modulus must be non-negative")
    (cond
      (.equals n 0) n

      (.equals n 1) n

      ;; http://www.mersennewiki.org/index.php/Modular_Square_Root#Modulus_equal_to_2
      (.equals modulus 2)
      (.mod n modulus)

      ;; http://www.mersennewiki.org/index.php/Modular_Square_Root#Modulus_congruent_to_3_modulo_4
      (or (= mod8 3) (= mod8 7))
      (let [m (-> modulus (.add 1) .normalize .halveM .halveM)]
        (.powermod n m modulus))

      ;; http://www.mersennewiki.org/index.php/Modular_Square_Root#Modulus_congruent_to_5_modulo_8
      (= mod8 5)
      (let [m (-> modulus (.sub 5) .normalize .halveM .halveM .halveM)
            v (.powermod (.add n n) m modulus)
            i (-> (.multiply v v) (.multiply n) (.multiply 2) (.sub 1) (.mod modulus))]
        (-> n (.multiply v) (.multiply i) (.mod modulus)))

      ;; http://www.mersennewiki.org/index.php/Modular_Square_Root#Modulus_congruent_to_1_modulo_8
      (= mod8 1)
      (let [q   (-> modulus (.sub 1) .normalize)
            e   (->> q
                     (iterate #(.halveM %))
                     (take-while even?)
                     count)
            two (sjcl.bn. 2)
            z   (->> (range) rest rest
                     (map #(sjcl.bn. %))
                     (map #(.powermod % q modulus))
                     (filter
                       #(not
                          (.equals
                            (.powermod % (.pow two (- e 1)) modulus)
                            1)))
                     first)
            x   (.powermod n (-> q (.sub 1) .normalize .halveM) modulus)]
        (loop [y z,
               r e,
               v (-> n (.multiply x) (.mod modulus)),
               w (-> n (.multiply x) (.multiply x) (.mod modulus))]
          (if (.equals w 1)
            v
            (let [k (->> (range)
                         (map #(vector
                                 %
                                 (.powermod w (.pow two %) modulus)))
                         (filter #(.equals (second %) 1))
                         first first)
                  d (.powermod y (.pow two (- r k 1)) modulus)
                  y (.mod (.multiply d d) modulus)
                  v (.mod (.multiply d v) modulus)
                  w (.mod (.multiply w y) modulus)]
              (recur y k v w)))))

      :else
      (throw (ex-info "Cannot compute a square root for a non-prime modulus"
                      {:argument n,
                       :modulus  modulus})))))


;(defn- compute-point
;  "Compute an elliptic curve point for a y-coordinate parity and x-coordinate"
;  [y-even x]
;  (let [modulus     (-> secp256k1.data/curve .-field .-modulus)
;        ;; √(x * (a + x**2) + b) % p
;        y-candidate (modular-square-root
;                      (.add
;                        (.multiply x (.add (.-a secp256k1.data/curve) (.square x)))
;                        (.-b secp256k1.data/curve))
;                      modulus)
;        y           (if (= y-even (even? y-candidate))
;                      y-candidate
;                      (.sub modulus y-candidate))]
;    (public-key (new ECPoint secp256k1.data/curve x y))))


(defn compute-point
  "Compute an elliptic curve point for a y-coordinate parity and x-coordinate"
  [y-even? x]
  (let [modulus     (-> ecc/curves.k256 .-field .-modulus)  ;; returns big number (bn)
        y-candidate (modular-square-root
                      (.add
                        (.mul x (.add (.-a ecc/curves.k256) (.square x)))
                        (.-b ecc/curves.k256))
                      (-> ecc/curves.k256 .-field .-modulus))
        y           (if (= y-even? (bn-even? y-candidate))
                      y-candidate
                      (.sub modulus y-candidate))]
    #js {:x (-> x .toBits codecBytes/fromBits)
         :y (-> y .toBits codecBytes/fromBits)}))


(defn- x962-hex-compressed-decode
  "Key as bytes"
  [key-hex]
  (let [x      (-> key-hex (subs 2) (sjcl.bn.))
        y-even (= (subs key-hex 0 2) "02")]
    (compute-point y-even x)))


(defn- x962-hex-uncompressed-decode
  [encoded-key]
  (let [l (-> ecc/curves.k256 .-r .bitLength (/ 4))
        x (subs encoded-key 2 (+ 2 l))
        y (subs encoded-key (+ 2 l))]
    {:x x
     :y y}
    #_(public-key (new ECPoint ecc/curves.k256 x y))))

(defn x962-decode
  "Decode a X9.62 encoded public key provided in bytes"
  [key-ba]
  (let [key-hex (alphabase/bytes->hex key-ba)
        l       (-> ecc/curves.k256 .-r .bitLength (/ 4))]
    (cond
      (and (#{"02" "03"} (subs key-hex 0 2))
           (= (+ 2 l) (count key-hex)))
      (x962-hex-compressed-decode key-hex)

      (and (= "04" (subs key-hex 0 2))
           (= (+ 2 (* 2 l)) (count key-hex)))
      (x962-hex-uncompressed-decode key-hex)

      :else
      (throw (ex-info "Invalid encoding on public key"
                      {:encoded-key key-hex})))))


(defn generate-key-pair*
  "Returns internal representation of keypair"
  []
  (ecc/ecdsa.generateKeys ecc/curves.k256))


(defn encode-key-pair
  "Encodes a key pair in specified format."
  [pair]
  (let [sec          (.get (.-sec pair))
        pub          (.get (.-pub pair))
        x962-encoded (x962-encode pub)]
    #js {:private (-> sec codecBytes/fromBits)
         :public  x962-encoded}))


(defn private
  "Returns private key as byte array from key pair."
  [pair]
  (-> pair
      (.-sec)
      (.get)
      codecBytes/fromBits))

(defn public
  "Returns public key as byte array using X9.62 compression."
  [pair]
  (-> pair
      (.-pub)
      (.get)
      (x962-encode)))


(defn generate-address-pair
  "Generate a new key pair, returns encoded values."
  []
  (let [pair (generate-key-pair*)]
    (encode-key-pair pair)))


(defn sign
  [pair message]
  (let [hash (sha256/hash message)]
    (.sign (.-sec pair) hash)))


(defn verify
  [pair message sig]
  (let [hash (sha256/hash message)]
    (.verify (.-pub pair) hash sig)))


(defn generate-key-pair-from-private
  ([private] (generate-key-pair-from-private private :hex))
  ([private-key format]
   (let [private-bits (to-bitArray private-key format)
         private-bn   (bn/fromBits private-bits)]
     (ecc/ecdsa.generateKeys ecc/curves.k256 6 private-bn))))




(comment

  (in-ns 'fluree.crypto.elliptic2)

  (-> (generate-key-pair*)
      .-sec
      (.get)
      (bn/fromBits))



  (def mypair (generate-key-pair*))
  mypair

  (let [x            (-> mypair .-pub .get .-x codecBytes/fromBits alphabase/bytes->hex)
        y            (-> mypair .-pub .get .-y codecBytes/fromBits alphabase/bytes->hex)
        pub          (-> mypair .-pub .get x962-encode alphabase/bytes->hex)
        private      (-> mypair .-sec .get codecBytes/fromBits alphabase/bytes->hex)
        pub-decode   (-> pub x962-hex-compressed-decode)
        pub-decode-x (-> pub-decode .-x alphabase/bytes->hex)
        pub-decode-y (-> pub-decode .-y alphabase/bytes->hex)
        ]

    (js->clj
      #js {:x            x
           :y            y
           :private      private
           :public       pub
           ;:pub-decode   pub-decode
           :pub-decode-x pub-decode-x
           :pub-decode-y pub-decode-y
           :x-equal      (= x pub-decode-x)
           :y-equal      (= y pub-decode-y)

           }
      :keywordize-keys true)

    )


  (-> (private mypair)
      (alphabase/bytes->hex))

  (-> (generate-key-pair*)
      (.-pub)
      (.get)
      (x962-encode)
      (alphabase/bytes->hex)


      ;(js/console.log)
      )


  (def x-bn (-> (.get (.-pub mypair))
                (.-x)
                (bn/fromBits)

                ))

  (let [x x-bn]
    (modular-square-root
      (.add
        (.mul x (.add (.-a ecc/curves.k256) (.square x)))
        (.-b ecc/curves.k256))
      (-> ecc/curves.k256 .-field .-modulus)))


  (.toString x-bn)



  (js/Number (.toString x-bn))



  (-> (.-pub mypair)
      (.get)
      (.-y)
      (bn/fromBits)
      (even?)
      ;(.-_point)
      ;(.-curve)
      ;(.-field)
      ;(.-prototype)
      ;(.-exponent)
      ;(js/console.log)
      ;(js->clj)
      ;keys
      )
  ;;(-> pub-key .-curve .-field .-exponent)




  (def sig (sign mypair "hi"))
  sig

  (verify mypair "hi" sig)

  )
