// Compiled by ClojureScript 1.10.520 {:static-fns false, :optimize-constants false}
goog.provide('fluree.crypto.ripemd');
goog.require('cljs.core');
goog.require('alphabase.core');
goog.require('sjcl.codec.bytes');
goog.require('sjcl.hash.ripemd160');
/**
 * Creates a ripemd-160 hash from byte input.
 */
fluree.crypto.ripemd.ripemd_160 = (function fluree$crypto$ripemd$ripemd_160(ba){
return sjcl.codec.bytes.fromBits(sjcl.hash.ripemd160.hash(sjcl.codec.bytes.toBits(ba)));
});

//# sourceMappingURL=ripemd.js.map?rel=1567785970904
