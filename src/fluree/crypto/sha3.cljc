(ns fluree.crypto.sha3
  (:refer-clojure :exclude [hash])
  #?(:cljs (:require [sha3 :as js-sha3]))
  #?(:clj (:import (org.bouncycastle.crypto.digests RIPEMD160Digest SHA256Digest SHA3Digest GeneralDigest))))


(defn hash
  [ba hash-size]
  (assert (#{256 512} hash-size))
  (let [digest #?(:clj (doto (SHA3Digest. hash-size)
                         (.reset)
                         (.update ba 0 (count ba)))
                  :cljs (doto (js-sha3/SHA3. hash-size)
                          (.update ba)))]
    #?(:clj  (let [hash-ba (byte-array (.getDigestSize digest))]
               (.doFinal digest hash-ba 0)
               hash-ba)
       :cljs (.digest digest))))


(defn ^:export sha3-256
  "Create a sha3 hash"
  [ba]
  (hash ba 256))


(defn ^:export sha3-512
  "Create a sha3 hash"
  [ba]
  (hash ba 512))
