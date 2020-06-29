(ns fluree.test-runner
  (:require-macros
    [doo.runner :refer [doo-tests]])
  (:require
    [fluree.crypto-test]
    [fluree.crypto.pkcs7-test]
    [doo.runner]))

(doo-tests
  'fluree.crypto-test
  'fluree.crypto.pkcs7-test)
