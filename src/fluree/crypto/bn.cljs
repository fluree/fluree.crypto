(ns fluree.crypto.bn
  "Utility functions to encode some of the stranger, easy to forget behaviors
  of the sjcl/bn (BigNumber) library. For example, bn.greaterEquals doesn't
  return a boolean as you'd expect. It returns 1 if true, 0 if false. But 0 is
  truthy in Clojure(Script)!"
  (:require ["@fluree/sjcl" :as sjcl])
  (:refer-clojure :exclude [>=]))

(defn >=
  "Returns true if BigNumber a is greater than or equal to BigNumber b,
  false otherwise."
  [a b]
  (= 1 (.greaterEquals a b)))
