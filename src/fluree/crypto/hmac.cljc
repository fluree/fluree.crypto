(ns fluree.crypto.hmac
  (:require [alphabase.core :as alphabase]
            #?@(:cljs [["@fluree/sjcl" :as sjcl]]))
  #?(:clj (:import (org.bouncycastle.crypto.macs HMac)
                   (org.bouncycastle.crypto.params KeyParameter)
                   (org.bouncycastle.crypto.digests SHA256Digest))))


(defn hmac-sha256
  "Returns HMAC using SHA-256 hashing. Both key and message should be bytes."
  [message key]
  #?(:clj  (let [hmac   (HMac. (SHA256Digest.))
                 k      (KeyParameter. key)
                 result (byte-array (.getMacSize hmac))]
             (.init hmac k)
             (.update hmac message 0 (alength message))
             (.doFinal hmac result 0)
             result)
     :cljs (let [hmac         (sjcl.misc.hmac. (sjcl.codec.bytes.toBits key))
                 message-bits (sjcl.codec.bytes.toBits message)]
             (-> hmac
                 (.encrypt message-bits)
                 (sjcl.codec.bytes.fromBits)))))
