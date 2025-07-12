// Compiled by ClojureScript 1.10.520 {:static-fns false, :optimize-constants false}
goog.provide('fluree.crypto.sha3');
goog.require('cljs.core');
goog.require('module$Users$bplatz$fluree$fluree_crypto$node_modules$sha3$index');
fluree.crypto.sha3.hash = (function fluree$crypto$sha3$hash(ba,hash_size){
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [(512),null,(256),null], null), null).call(null,hash_size))){
} else {
throw (new Error("Assert failed: (#{512 256} hash-size)"));
}

var digest = (function (){var G__21039 = (new module$Users$bplatz$fluree$fluree_crypto$node_modules$sha3$index["default"].SHA3(hash_size));
G__21039.update(ba);

return G__21039;
})();
return digest.digest();
});
/**
 * Create a sha3 hash
 */
fluree.crypto.sha3.sha3_256 = (function fluree$crypto$sha3$sha3_256(ba){
var ba__$1 = ((typeof ba === 'string')?ba:alphabase.core.bytes__GT_string.call(null,ba));
return fluree.crypto.sha3.hash.call(null,ba__$1,(256));
});
goog.exportSymbol('fluree.crypto.sha3.sha3_256', fluree.crypto.sha3.sha3_256);
/**
 * Create a sha3 hash
 */
fluree.crypto.sha3.sha3_512 = (function fluree$crypto$sha3$sha3_512(ba){
var ba__$1 = ((typeof ba === 'string')?ba:alphabase.core.bytes__GT_string.call(null,ba));
return fluree.crypto.sha3.hash.call(null,ba__$1,(512));
});
goog.exportSymbol('fluree.crypto.sha3.sha3_512', fluree.crypto.sha3.sha3_512);

//# sourceMappingURL=sha3.js.map?rel=1567785970827
