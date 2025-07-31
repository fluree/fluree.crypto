(ns fluree.crypto.ed25519-compat-test
  "Ed25519 compatibility tests focusing on cross-platform consistency.
  These tests ensure CLJ and CLJS produce compatible results."
  (:require #?@(:clj  [[clojure.test :refer [deftest is testing]]]
                :cljs [[cljs.test :refer-macros [deftest is testing]]])
            [fluree.crypto :as crypto]
            [alphabase.core :as alphabase]))

(deftest account-id-cross-platform-test
  (testing "Account IDs are identical across platforms for known public keys"
    (let [test-keys ["d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a"
                     "3d4017c3e843895a92b70aa74d1b7ebc9c982ccf2ec4968cc0cd55f12af4660c"
                     "fc51cd8e6218a1a38da47ed00230f0580816ed13ba3303ac5deb911548908025"]
          ;; Pre-computed account IDs for verification
          expected-ids ["FVen3X669xLzsi6N2V91DoiyzHzg1uAgqiT8jZ9nS96Z"
                        "586Z7H2vpX9qNhN2T4e9Utugie3ogjbxzGaMtM3E6HR5"
                        "Hyx62wPQGyvXCoihZq1BrbUjBRh2LuNxWiiqMkfAuSZr"]]

      (doseq [[public-key expected-id] (map vector test-keys expected-ids)]
        (let [account-id (crypto/account-id-from-public public-key)]
          (is (= expected-id account-id)
              (str "Account ID should match pre-computed value for key " (take 8 public-key) "...")))))))

(deftest signature-format-test
  (testing "Signatures have consistent format across platforms"
    (let [kp (crypto/generate-key-pair)
          messages ["", "a", "Hello", "Test message with special chars: 🚀"
                    (apply str (repeat 100 "x"))]]
      (doseq [msg messages]
        (let [signature (crypto/sign-message msg kp)]
          (is (string? signature) "Signature should be a string")
          (is (= 128 (count signature)) "Signature should be 128 hex chars (64 bytes)")
          (is (re-matches #"[0-9a-f]{128}" signature) "Signature should be lowercase hex")
          (let [valid? (crypto/verify-signature kp msg signature)]
            (is valid? "Signature should verify")))))))

(deftest deterministic-behavior-test
  (testing "Ed25519 signatures are deterministic"
    (let [kp (crypto/generate-key-pair)
          message "Deterministic test message"
          sigs (repeatedly 5 #(crypto/sign-message message kp))]
      (is (apply = sigs) "All signatures of the same message should be identical")
      (is (every? #(= 128 (count %)) sigs) "All signatures should be 128 chars"))))

(deftest empty-message-test
  (testing "Empty messages are handled correctly"
    (let [kp (crypto/generate-key-pair)
          sig-empty (crypto/sign-message "" kp)
          sig-bytes (crypto/sign-message #?(:clj (byte-array 0) :cljs #js []) kp)]
      (is (string? sig-empty) "Empty string signature should be string")
      (is (string? sig-bytes) "Empty byte array signature should be string")
      (is (= 128 (count sig-empty)) "Empty message signature should be 128 chars")
      (let [valid1 (crypto/verify-signature kp "" sig-empty)
            valid2 (crypto/verify-signature kp #?(:clj (byte-array 0) :cljs #js []) sig-bytes)]
        (is valid1 "Empty string should verify")
        (is valid2 "Empty bytes should verify")))))

(deftest unicode-message-test
  (testing "Unicode messages are handled consistently"
    (let [kp (crypto/generate-key-pair)
          unicode-messages ["café" "漢字" "🎉🎊" "Zürich" "naïve"
                            "\\u00C5pple" ; Composed
                            "\\u0041\\u030apple"]] ; Decomposed
      (doseq [msg unicode-messages]
        (let [signature (crypto/sign-message msg kp)
              valid? (crypto/verify-signature kp msg signature)]
          (is valid? (str "Should verify unicode message: " msg)))))))

(deftest large-message-boundaries-test
  (testing "Various message sizes are handled correctly"
    (let [kp (crypto/generate-key-pair)
          sizes [0 1 31 32 33 63 64 65 127 128 129 255 256 257 1023 1024 1025]]
      (doseq [size sizes]
        (let [message (apply str (repeat size "x"))
              signature (crypto/sign-message message kp)]
          (is (= 128 (count signature)) "Signature should always be 128 chars")
          (let [valid? (crypto/verify-signature kp message signature)]
            (is valid? (str "Should verify " size "-byte message"))))))))

(deftest hex-encoding-consistency-test
  (testing "Hex encoding is consistent across platforms"
    (let [kp (crypto/generate-key-pair)]
      ;; Test that keys are properly hex encoded
      (is (re-matches #"[0-9a-f]{64}" (:private kp)) "Private key should be 64 lowercase hex chars")
      (is (re-matches #"[0-9a-f]{64}" (:public kp)) "Public key should be 64 lowercase hex chars")

      ;; Test signature hex encoding
      (let [sig (crypto/sign-message "test" kp)]
        (is (re-matches #"[0-9a-f]{128}" sig) "Signature should be 128 lowercase hex chars")))))

(deftest invalid-signature-test
  (testing "Invalid signatures are rejected"
    (let [kp1 (crypto/generate-key-pair)
          kp2 (crypto/generate-key-pair)
          message "test message"
          sig1 (crypto/sign-message message kp1)]
      ;; Wrong key
      (let [result1 (crypto/verify-signature kp2 message sig1)]
        (is (false? result1) "Signature from different key should not verify"))

      ;; Modified signature
      (let [modified-sig (str (subs sig1 0 127) (if (= (last sig1) \0) "1" "0"))
            result2 (crypto/verify-signature kp1 message modified-sig)]
        (is (false? result2) "Modified signature should not verify"))

      ;; Wrong message
      (let [result3 (crypto/verify-signature kp1 "wrong message" sig1)]
        (is (false? result3) "Wrong message should not verify"))

      ;; Invalid signature format
      (let [result4 (crypto/verify-signature kp1 message "invalid")
            result5 (crypto/verify-signature kp1 message (apply str (repeat 128 "g")))]
        (is (false? result4) "Invalid signature format should not verify")
        (is (false? result5) "Non-hex signature should not verify")))))

;; RFC 8032 Ed25519 test vectors for standards compliance
;; https://tools.ietf.org/html/rfc8032#section-7.1
(def rfc8032-test-vectors
  [{:name "RFC Test 1 - Empty message"
    :public "d75a980182b10ab7d54bfed3c964073a0ee172f3daa62325af021a68f707511a"
    :message ""
    :signature "e5564300c360ac729086e2cc806e828a84877f1eb8e5d974d873e065224901555fb8821590a33bacc61e39701cf9b46bd25bf5f0595bbe24655141438e7a100b"}

   {:name "RFC Test 2 - Single byte"
    :public "3d4017c3e843895a92b70aa74d1b7ebc9c982ccf2ec4968cc0cd55f12af4660c"
    :message "72"
    :signature "92a009a9f0d4cab8720e820b5f642540a2b27b5416503f8fb3762223ebdb69da085ac1e43e15996e458f3613d0f11d8c387b2eaeb4302aeeb00d291612bb0c00"}

   {:name "RFC Test 3 - Two bytes"
    :public "fc51cd8e6218a1a38da47ed00230f0580816ed13ba3303ac5deb911548908025"
    :message "af82"
    :signature "6291d657deec24024827e69c3abe01a30ce548a284743a445e3680d7db5ac3ac18ff9b538d16f290ae67f760984dc6594a7c15e9716ed28dc027beceea1ec40a"}])

(deftest rfc8032-test-vectors-test
  (testing "RFC 8032 test vectors verify correctly"
    (doseq [{:keys [name public message signature]} rfc8032-test-vectors]
      (testing name
        (let [msg-bytes (if (empty? message) #?(:clj (byte-array 0) :cljs #js []) (alphabase/hex->bytes message))
              result (try
                       (crypto/verify-signature public msg-bytes signature)
                       (catch #?(:clj Exception :cljs js/Error) _ false))]
          (is (true? result) (str name " - should verify with RFC test vector")))))))

(deftest boundary-conditions-test
  (testing "Ed25519 handles boundary conditions correctly"
    (let [kp (crypto/generate-key-pair)]
      ;; Test with various edge case messages
      (doseq [test-case [{:name "All zero bytes" :data #?(:clj (byte-array 32) :cljs (js/Uint8Array. 32))}
                         {:name "All 0xFF bytes" :data #?(:clj (byte-array (repeat 32 -1)) :cljs (js/Uint8Array. (repeat 32 255)))}
                         {:name "Single bit set" :data #?(:clj (byte-array (cons 1 (repeat 31 0))) :cljs (js/Uint8Array. (cons 1 (repeat 31 0))))}]]
        (let [{:keys [name data]} test-case
              signature (crypto/sign-message data kp)
              valid? (crypto/verify-signature kp data signature)]
          (is valid? (str name " - should sign and verify correctly")))))))

(deftest real-keypair-round-trip-test
  (testing "Real key pair works correctly for round-trip signing"
    (let [test-payload "This is a test payload for cross-platform compatibility verification"]
      #?(:clj
         ;; In CLJ we need the key pair objects from generate-key-pair for signing
         (let [generated-kp (crypto/generate-key-pair)
               signature (crypto/sign-message test-payload generated-kp)
               verified? (crypto/verify-signature generated-kp test-payload signature)]
           (is verified? "Generated key pair should work for round-trip")
           (is (= 128 (count signature)) "Signature should be 128 hex chars")
           (is (re-matches #"[0-9a-f]{128}" signature) "Signature should be lowercase hex"))
         :cljs
         (let [test-keypair {:public  "7f1215858ac4aa71a95b16b1ef024b1c344d5c25b6df3fe90a9f1513a4d2411e"
                             :private "162259eb44ebceca49e00bcc95496a2eeba5528886414859c95a3ee045cbd1f5"}
               ;; In CLJS we can use hex strings directly
               signature (crypto/sign-message test-payload (:private test-keypair))
               verified? (crypto/verify-signature (:public test-keypair) test-payload signature)
               account-id (crypto/account-id-from-public (:public test-keypair))]
           (is verified? "Real key pair should work for round-trip in CLJS")
           (is (= 128 (count signature)) "Signature should be 128 hex chars")
           (is (re-matches #"[0-9a-f]{128}" signature) "Signature should be lowercase hex")
           (is (= 44 (count account-id)) "Account ID should be 44 chars (base58)")
           (is (string? account-id) "Account ID should be a string")

           ;; Test that we get consistent account ID
           (let [account-id2 (crypto/account-id-from-public (:public test-keypair))]
             (is (= account-id account-id2) "Account ID should be deterministic")))))))