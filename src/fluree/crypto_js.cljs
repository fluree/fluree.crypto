(ns fluree.crypto-js
  (:require [fluree.crypto :as fc]))

(defn ^:export sha2-256
  [& args] ; TS types don't work well with multi-arity fns
  (apply fc/sha2-256 args))

(defn ^:export sha2-256-normalize
  [& args] ; TS types don't work well with multi-arity fns
  (apply fc/sha2-256-normalize args))

(defn ^:export sha2-512
  [& args] ; TS types don't work well with multi-arity fns
  (apply fc/sha2-512 args))

(defn ^:export sha2-512-normalize
  [& args] ; TS types don't work well with multi-arity fns
  (apply fc/sha2-512-normalize args))

(defn ^:export sha3-256
  [& args] ; TS types don't work well with multi-arity fns
  (apply fc/sha3-256 args))

(defn ^:export sha3-256-normalize
  [& args] ; TS types don't work well with multi-arity fns
  (apply fc/sha3-256-normalize args))

(defn ^:export sha3-512
  [& args] ; TS types don't work well with multi-arity fns
  (apply fc/sha3-512 args))

(defn ^:export sha3-512-normalize
  [& args] ; TS types don't work well with multi-arity fns
  (apply fc/sha3-512-normalize args))

(defn ^:export ripemd-160
  [& args] ; TS types don't work well with multi-arity fns
  (apply fc/ripemd-160 args))

(defn ^:export aes-encrypt
  [& args]
  (apply fc/aes-encrypt args))

(defn ^:export aes-decrypt
  [& args] ; TS types don't work well with multi-arity fns
  (apply fc/aes-decrypt args))

(defn ^:export generate-key-pair
  [& args] ; multi-arity fns don't play well with TS types
  (clj->js (apply fc/generate-key-pair args)))

(defn ^:export verify-jws
  [jws]
  (-> jws fc/verify-jws clj->js))
