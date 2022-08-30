(ns fluree.test-runner
  (:require-macros
    [doo.runner :refer [doo-tests]])
  (:require
    [fluree.crypto-test]
    [fluree.crypto.pkcs7-test]
    [fluree.crypto.secp256k1-test]
    [doo.runner]))

(doo-tests
  'fluree.crypto-test
  'fluree.crypto.pkcs7-test
  'fluree.crypto.secp256k1-test)
