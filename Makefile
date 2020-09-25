.PHONY: cljtest cljstest test jar install deploy clean

SOURCES := $(shell find src)
RESOURCES := $(shell find resources)

target/fluree-crypto.jar: deps.edn pom.xml src/deps.cljs node_modules $(SOURCES) $(RESOURCES)
	clojure -A:jar

jar: target/fluree-crypto.jar

pom.xml: deps.edn
	clojure -Spom

package-lock.json: package.json
	npm install

node_modules: package.json package-lock.json

cljtest:
	clojure -A:cljtest

cljstest: node_modules
	clojure -A:cljstest

test: cljtest cljstest

src/deps.cljs: package.json
	clojure -A:js-deps

install: target/fluree-crypto.jar
	clojure -A:install

# You'll need to set the env vars CLOJARS_USERNAME & CLOJARS_PASSWORD
# (which must be a Clojars deploy token now) to use this.
deploy: target/fluree-crypto.jar
	clojure -A:deploy

clean:
	rm -rf target
	rm -rf out
	rm -rf cljs-test-runner-out
