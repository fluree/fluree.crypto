.PHONY: cljtest cljstest test jar install deploy clean

SOURCES := $(shell find src)
RESOURCES := $(shell find resources)

target/fluree-crypto.jar: deps.edn src/deps.cljs node_modules $(SOURCES) $(RESOURCES)
	clojure -T:build jar

jar: target/fluree-crypto.jar

package-lock.json: package.json
	npm install

node_modules: package.json package-lock.json

cljtest:
	clojure -M:test-clj

nodetest:
	npx shadow-cljs release node-test

browsertest:
	npx shadow-cljs release browser-test
	./node_modules/karma/bin/karma start --single-run

cljstest: node_modules nodetest browsertest

test: cljtest cljstest

src/deps.cljs: package.json
	clojure -M:js-deps

install: target/fluree-crypto.jar
	clojure -T:build install

# You'll need to set the env vars CLOJARS_USERNAME & CLOJARS_PASSWORD
# (which must be a Clojars deploy token now) to use this.
deploy: target/fluree-crypto.jar
	clojure -T:build deploy

clean:
	clojure -T:build clean
