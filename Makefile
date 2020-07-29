.PHONY: cljtest cljstest test uberjar clean

uberjar: target/fluree.crypto.jar

pom.xml: deps.edn
	clojure -Spom

cljtest:
	clojure -A:cljtest

cljstest:
	clojure -A:cljstest

test: cljtest cljstest

src/deps.cljs: package.json
	clojure -A:js-deps

target/fluree.crypto.jar: deps.edn pom.xml uberdeps/deps.edn src/deps.cljs src/**/* resources/**/*
	cd uberdeps && clojure -m uberdeps.uberjar --deps-file ../deps.edn --aliases :cljs --target ../$@

clean:
	rm -rf target
	rm -rf out
