(defproject fluree.crypto "0.3.1"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "EPL-2.0 OR GPL-2.0-or-later WITH Classpath-exception-2.0"
            :url  "https://www.eclipse.org/legal/epl-2.0/"}
  :dependencies [[org.clojure/clojure "1.10.1"]
                 [org.clojure/clojurescript "1.10.520"]
                 [fluree/alphabase "3.2.0"]
                 ;; sha3
                 [org.bouncycastle/bcprov-jdk15on "1.55"]
                 [figwheel-sidecar "0.5.18"]
                 ;; scrypt
                 [com.lambdaworks/scrypt "1.4.0"]
                 ;; other crypto
                 [org.bouncycastle/bcprov-jdk15on "1.55"]]
  :plugins [[lein-cljsbuild "1.1.7" :exclusions [[org.clojure/clojure]]]
            [lein-doo "0.1.11"]]

  :source-paths ["src"]
  :cljsbuild {:builds
              [{:id           "dev"
                :source-paths ["src"]
                :figwheel     true
                :compiler     {:main                 fluree.crypto
                               :output-dir           "resources/public/js/out"
                               :asset-path           "js/out"
                               :source-map-timestamp true
                               :pretty-print         false
                               :optimize-constants   false
                               ;This option is mainly intended to be used for a release build since it can increase performance due to decreased allocation. Defaults to true under :advanced optimizations otherwise to false.
                               :static-fns           false
                               ; Useful to have set to false at REPL development to facilitate function redefinition, and useful to set to true for release for performance.
                               :install-deps         true
                               :npm-deps             {:scrypt-js "2.0.4"}
                               :libs                 ["src/goog/crypt/pkcs7.js"
                                                      "src/sjcl"
                                                      "src/jssha3/sha3.js"]}}
               {:id           "simple"
                :source-paths ["src"]
                :compiler     {:asset-path    "js"
                               :output-to     "resources/build/simple/fluree-crypto.js"
                               :main          fluree.crypto
                               :optimizations :simple
                               :pretty-print  false
                               :install-deps  true
                               :npm-deps      {:scrypt-js "2.0.4"}
                               :libs          ["src/goog/crypt/pkcs7.js"
                                               "src/sjcl"
                                               "src/jssha3/sha3.js"]}}
               {:id           "min"
                :source-paths ["src"]
                :compiler     {:asset-path    "js"
                               :output-to     "resources/build/advanced/fluree-crypto.js"
                               :main          fluree.crypto
                               :optimizations :advanced
                               :pretty-print  false
                               :install-deps  true
                               :npm-deps      {:scrypt-js "2.0.4"}
                               :libs          ["src/goog/crypt/pkcs7.js"
                                               "src/sjcl"
                                               "src/jssha3/sha3.js"]}}
               {:id           "ci-tests"
                :source-paths ["src test"]
                :compiler     {:main          fluree.test-runner
                               :output-to     "resources/build/ci/testrunner.js"
                               :output-dir    "resources/build/ci/out"
                               :optimizations :advanced
                               :pretty-print  false
                               :pseudo-names  true
                               :install-deps  true
                               :npm-deps      {:scrypt-js "2.0.4"}
                               :libs          ["src/goog/crypt/pkcs7.js"
                                               "src/sjcl"
                                               "src/jssha3/sha3.js"]}}]}
  :repl-options {:init-ns fluree.crypto}

  :profiles
  {:doo
   {:dependencies
    [[doo "0.1.11"]]}})

