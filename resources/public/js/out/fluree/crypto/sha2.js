// Compiled by ClojureScript 1.10.520 {:static-fns false, :optimize-constants false}
goog.provide('fluree.crypto.sha2');
goog.require('cljs.core');
goog.require('goog.crypt.Sha256');
goog.require('goog.crypt.Sha512');
fluree.crypto.sha2.hash = (function fluree$crypto$sha2$hash(ba,hash_size){
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [(512),null,(256),null], null), null).call(null,hash_size))){
} else {
throw (new Error("Assert failed: (#{512 256} hash-size)"));
}

var digest = (function (){var G__21070 = hash_size;
switch (G__21070) {
case (256):
var G__21071 = (new goog.crypt.Sha256());
G__21071.update(ba);

return G__21071;

break;
case (512):
var G__21072 = (new goog.crypt.Sha512());
G__21072.update(ba);

return G__21072;

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__21070)].join('')));

}
})();
return digest.digest();
});
/**
 * Create a sha2 hash from byte-array.
 */
fluree.crypto.sha2.sha2_256 = (function fluree$crypto$sha2$sha2_256(ba){
return fluree.crypto.sha2.hash.call(null,ba,(256));
});
goog.exportSymbol('fluree.crypto.sha2.sha2_256', fluree.crypto.sha2.sha2_256);
/**
 * Create a sha2 hash from byte-array.
 */
fluree.crypto.sha2.sha2_512 = (function fluree$crypto$sha2$sha2_512(ba){
return fluree.crypto.sha2.hash.call(null,ba,(512));
});
goog.exportSymbol('fluree.crypto.sha2.sha2_512', fluree.crypto.sha2.sha2_512);

//# sourceMappingURL=sha2.js.map?rel=1567785970876
