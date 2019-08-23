(defproject fluree.crypto "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "EPL-2.0 OR GPL-2.0-or-later WITH Classpath-exception-2.0"
            :url  "https://www.eclipse.org/legal/epl-2.0/"}
  :dependencies [[org.clojure/clojure "1.10.1"]
                 [org.clojure/clojurescript "1.10.520"]
                 [fluree/alphabase "3.1.4"]
                 ;; sha3
                 [org.bouncycastle/bcprov-jdk15on "1.55"]
                 [figwheel-sidecar "0.5.18"]
                 ;; scrypt
                 [com.lambdaworks/scrypt "1.4.0"]
                 ;; other crypto
                 [org.bouncycastle/bcprov-jdk15on "1.55"]]
  :plugins [[lein-cljsbuild "1.1.7" :exclusions [[org.clojure/clojure]]]]

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
                               :static-fns           true
                               :install-deps         true
                               :npm-deps             {:sha3      "2.0.6"
                                                      :scrypt-js "2.0.4"}
                               :libs                 ["src/goog/crypt/pkcs7.js"
                                                      "src/sjcl"]}}
               {:id           "min"
                :source-paths ["src"]
                :compiler     {:asset-path    "js"
                               :output-to     "resources/build/fluree-crypto.js"
                               :main          fluree.crypto
                               :optimizations :advanced
                               :pretty-print  false
                               :install-deps  true
                               :npm-deps      {:sha3      "2.0.6"
                                               :scrypt-js "2.0.4"}
                               :libs          ["src/goog/crypt/pkcs7.js"
                                               "src/sjcl"]}}]}
  :repl-options {:init-ns fluree.crypto})


;
;
;
;:output-to "resources/public/js/compiled/fluree-crypto.js"
;:output-dir "resources/public/js/compiled/out"