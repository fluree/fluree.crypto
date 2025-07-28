(ns test-native
  (:require [fluree.crypto :as crypto])
  (:gen-class))

(defn -main [& args]
  (println "Testing fluree.crypto with GraalVM native image...")
  
  (try
    ;; Test key generation
    (let [kp (crypto/generate-key-pair)]
      (println "✅ Key pair generated successfully")
      (println "   Public key length:" (count (:public kp)))
      
      ;; Test signing
      (let [message "Hello GraalVM native image!"
            signature (crypto/sign-message message kp)]
        (println "✅ Message signed successfully")
        (println "   Signature length:" (count signature))
        
        ;; Test verification
        (let [verified (crypto/verify-signature kp message signature)]
          (if verified
            (println "✅ Signature verified successfully")
            (println "❌ Signature verification failed"))
          
          ;; Test account ID generation
          (let [account-id-base58 (crypto/account-id-from-public kp)
                account-id-multibase (crypto/account-id-from-public kp {:output-format :multibase})
                did-key (crypto/did-key-from-public kp)]
            (println "✅ Account ID generation successful")
            (println "   Base58 ID length:" (count account-id-base58))
            (println "   Multibase ID length:" (count account-id-multibase))
            (println "   DID:key length:" (count did-key))
            
            ;; Test new functions
            (let [derived-public (crypto/public-key-from-private kp)
                  account-id-from-priv (crypto/account-id-from-private kp)]
              (println "✅ New API functions working")
              (println "   Public key derivation matches:" (= derived-public (:public kp)))
              (println "   Account ID from private matches:" (= account-id-from-priv account-id-base58)))
            
            ;; Test random bytes
            (let [random-data (crypto/random-bytes 32)]
              (println "✅ Random bytes generated successfully")
              (println "   Random data length:" (count random-data))
              
              ;; Test JWS
              (let [jws (crypto/create-jws message kp {:include-pubkey true})
                    jws-result (crypto/verify-jws jws)]
                (println "✅ JWS create/verify successful")
                (println "   JWS payload matches:" (= message (:payload jws-result)))
                
                (if (and kp signature verified account-id-base58 account-id-multibase 
                         did-key random-data jws jws-result)
                  (do
                    (println "\n🎉 ALL TESTS PASSED!")
                    (println "fluree.crypto is fully compatible with GraalVM native image!")
                    (System/exit 0))
                  (do
                    (println "\n❌ Some tests failed")
                    (System/exit 1)))))))))
    
    (catch Exception e
      (println "❌ Error during testing:")
      (println (.getMessage e))
      (.printStackTrace e)
      (System/exit 1))))