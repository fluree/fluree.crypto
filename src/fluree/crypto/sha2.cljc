(ns fluree.crypto.sha2
  (:refer-clojure :exclude [hash])
  #?(:cljs (:require [goog.crypt.Sha256]
                     [goog.crypt.Sha512]))
  #?(:clj (:import (java.security MessageDigest))))

#?(:clj (set! *warn-on-reflection* true))

(defn- hash
  [ba ^long hash-size]
  (assert (#{256 512} hash-size))
  (let [digest (case hash-size
                 256 #?(:clj  (MessageDigest/getInstance "SHA-256")
                        :cljs (doto (goog.crypt.Sha256.)
                                (.update ba)))
                 512 #?(:clj  (MessageDigest/getInstance "SHA-512")
                        :cljs (doto (goog.crypt.Sha512.)
                                (.update ba))))]
    #?(:clj  (.digest digest ba)
       :cljs (.digest digest))))

(defn ^:export sha2-256
  "Create a sha2 hash from byte-array."
  [ba]
  (hash ba 256))

(defn ^:export sha2-512
  "Create a sha2 hash from byte-array."
  [ba]
  (hash ba 512))
