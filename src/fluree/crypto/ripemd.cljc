(ns fluree.crypto.ripemd
  (:require [alphabase.core :as alphabase]
            #?@(:cljs [[sjcl.codec.bytes :as codecBytes]
                       [sjcl.hash.ripemd160 :as js-ripemd160]]))
  #?(:clj (:import (org.bouncycastle.crypto.digests RIPEMD160Digest))))


(defn ripemd-160
  "Creates a ripemd-160 hash from byte input."
  [ba]
  #?(:cljs (-> ba
               codecBytes/toBits
               js-ripemd160/hash
               codecBytes/fromBits)
     :clj  (let [d (RIPEMD160Digest.)
                 _ (.update d ba 0 (count ba))
                 o (byte-array (.getDigestSize d))]
             (.doFinal d o 0)
             o)))


(comment

  (in-ns 'fluree.crypto.ripemd)

   (ripemd-160 (alphabase/string->bytes "hi"))

  (= "ad6ce46f7f1ea8519dc02ce8ce0c278c6ff329b2"
     (alphabase/bytes->hex (ripemd-160 (.getBytes "hi there!"))))


  )