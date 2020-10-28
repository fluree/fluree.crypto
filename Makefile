.PHONY: cljtest cljstest test jar install deploy clean

SOURCES := $(shell find src)
RESOURCES := $(shell find resources)

target/fluree-crypto.jar: deps.edn pom.xml src/deps.cljs node_modules $(SOURCES) $(RESOURCES)
	clojure -M:jar

jar: target/fluree-crypto.jar

pom.xml: deps.edn
	clojure -Spom

package-lock.json: package.json
	npm install

node_modules: package.json package-lock.json

cljtest:
	clojure -M:cljtest

cljstest: node_modules
	clojure -M:cljstest

test: cljtest cljstest

src/deps.cljs: package.json
	clojure -M:js-deps

install: target/fluree-crypto.jar
	clojure -M:install

# You'll need to set the env vars CLOJARS_USERNAME & CLOJARS_PASSWORD
# (which must be a Clojars deploy token now) to use this.
deploy: target/fluree-crypto.jar
	clojure -M:deploy

clean:
	rm -rf target
	rm -rf out
	rm -rf cljs-test-runner-out
