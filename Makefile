.PHONY: cljtest cljstest test jar install deploy clean

SOURCES := $(shell find src)
RESOURCES := $(shell find resources)

target/fluree-crypto.jar: deps.edn src/deps.cljs node_modules $(SOURCES) $(RESOURCES)
	clojure -X:jar

jar: target/fluree-crypto.jar

package-lock.json: package.json
	npm install

node_modules: package.json package-lock.json

test-clj:
	clojure -M:test-clj

test-nodejs:
	npx shadow-cljs release node-test

test-browser:
	npx shadow-cljs release browser-test
	./node_modules/karma/bin/karma start --single-run

test-cljs: node_modules test-nodejs test-browser

test: test-clj test-cljs

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
	rm -rf node_modules
