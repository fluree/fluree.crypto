(ns fluree.crypto.sha3
  (:refer-clojure :exclude [hash])
  (:require [alphabase.core :as alphabase]
            #?@(:cljs [[js-sha3]]))
  #?(:clj (:import (org.bouncycastle.crypto.digests RIPEMD160Digest SHA256Digest SHA3Digest GeneralDigest))))

#?(:clj (set! *warn-on-reflection* true))

;; could support other hash sizes besides 256 and 512 with existing code
(defn ^:export hash
  [ba ^long hash-size]
  (assert (#{256 512} hash-size))
  #?(:clj  (let [digest (doto (SHA3Digest. hash-size)
                          (.reset)
                          (.update ba 0 (count ba)))]
             (let [hash-ba (byte-array (.getDigestSize digest))]
               (.doFinal digest hash-ba 0)
               hash-ba))
     :cljs (js-sha3.sha3 hash-size ba)))


(defn ^:export sha3-256
  "Create a sha3-256 hash"
  [ba]
  (hash ba 256))


(defn ^:export sha3-512
  "Create a sha3-512 hash"
  [ba]
  (hash ba 512))
