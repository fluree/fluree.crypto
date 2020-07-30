.PHONY: cljtest cljstest test uberjar clean

uberjar: target/fluree-crypto.jar

pom.xml: deps.edn
	clojure -Spom

cljtest:
	clojure -A:cljtest

cljstest:
	clojure -A:cljstest

test: cljtest cljstest

src/deps.cljs: package.json
	clojure -A:js-deps

target/fluree-crypto.jar: deps.edn pom.xml src/deps.cljs src/**/*
	clojure -A:jar

install: target/fluree-crypto.jar
	clojure -A:install

deploy: target/fluree-crypto.jar
	clojure -A:deploy

clean:
	rm -rf target
	rm -rf out
