(ns fluree.crypto.hmac
  #?(:cljs
     (:require ["@noble/hashes/hmac" :as noble-hmac]
               ["@noble/hashes/sha256" :as noble-sha256]))
  #?(:clj
     (:import (org.bouncycastle.crypto.macs HMac)
              (org.bouncycastle.crypto.params KeyParameter)
              (org.bouncycastle.crypto.digests SHA256Digest))))

#?(:clj (set! *warn-on-reflection* true))

(defn hmac-sha256
  "Returns HMAC using SHA-256 hashing. Both key and message should be bytes."
  [^bytes message ^bytes key]
  #?(:clj  (let [hmac   (HMac. (SHA256Digest.))
                 k      (KeyParameter. key)
                 result (byte-array (.getMacSize hmac))]
             (.init hmac k)
             (.update hmac message 0 (alength message))
             (.doFinal hmac result 0)
             result)
     :cljs (noble-hmac/hmac noble-sha256/sha256 key message)))
