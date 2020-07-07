cljtest:
	clojure -A:cljtest

cljstest:
	clojure -A:cljstest

test: cljtest cljstest

.PHONY: cljtest cljstest test