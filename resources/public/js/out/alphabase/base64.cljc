(ns alphabase.base64
  "Base 64 optimized namespace"
  (:require [clojure.set :as set]
            #?@(:cljs [[goog.crypt.base64 :as g-base64]]))
  #?(:clj (:import (java.util Base64))))

(def ^:const base64-chars "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=")
(def ^:const base64-set (set base64-chars))


(defn encode
  "Converts a byte array into a base58-check string."
  ^String
  [data]
  #?(:clj  (-> (Base64/getEncoder)
               (.encodeToString data))
     :cljs (g-base64/encodeByteArray data)))


(defn decode
  "Decodes a base58-check string into a byte array."
  ^bytes
  [tokens]
  #?(:clj  (-> (Base64/getDecoder)
               (.decode ^String tokens))
     :cljs (g-base64/decodeStringToByteArray tokens)))


(defn base64?
  "Test if a string is base64"
  [x]
  (and (string? x) (set/subset? (set x) base64-set)))
