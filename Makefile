.PHONY: all cljtest cljstest test jar install deploy node browser js-package clean

SOURCES := $(shell find src)
RESOURCES := $(shell find resources)

all: jar js-package

target/fluree-crypto.jar: deps.edn src/deps.cljs node_modules $(SOURCES) $(RESOURCES)
	clojure -T:build jar

jar: target/fluree-crypto.jar

package-lock.json: package.json
	npm install

node_modules: package.json package-lock.json
	npm install && touch $?

cljtest:
	clojure -M:test-clj

cljs-node-test:
	npx shadow-cljs release cljs-node-test

cljs-browser-test:
	npm install && npx shadow-cljs release cljs-browser-test
	./node_modules/karma/bin/karma start --single-run

cljstest: node_modules cljs-node-test cljs-browser-test

node-test: out/nodejs/fluree-crypto.js
	cd test/nodejs && npm install && node --experimental-vm-modules node_modules/jest/bin/jest.js

test: cljtest cljstest node-test

src/deps.cljs: package.json
	clojure -M:js-deps

install: target/fluree-crypto.jar
	clojure -T:build install

# You'll need to set the env vars CLOJARS_USERNAME & CLOJARS_PASSWORD
# (which must be a Clojars deploy token now) to use this.
deploy: target/fluree-crypto.jar
	clojure -T:build deploy

out/nodejs/fluree-crypto.js: shadow-cljs.edn node_modules $(SOURCES)
	clojure -T:build node

node: out/nodejs/fluree-crypto.js

out/browser/fluree-crypto.js: shadow-cljs.edn node_modules $(SOURCES)
	clojure -T:build browser

browser: out/browser/fluree-crypto.js

dist/fluree-crypto.d.ts: out/nodejs/fluree-crypto.js
	npx tsc

dist/%/fluree-crypto.js: out/%/fluree-crypto.js
	mkdir -p $(@D)
	cp $< $@

js-package: dist/nodejs/fluree-crypto.js dist/browser/fluree-crypto.js dist/fluree-crypto.d.ts

clean:
	clojure -T:build clean
	rm -rf out/*
	rm -rf node_modules
