// Compiled by ClojureScript 1.10.520 {:static-fns false, :optimize-constants false}
goog.provide('fluree.crypto.hmac');
goog.require('cljs.core');
goog.require('alphabase.core');
goog.require('sjcl.misc.hmac');
goog.require('sjcl.codec.bytes');
/**
 * Returns HMAC using SHA-256 hashing. Both key and message should be bytes.
 */
fluree.crypto.hmac.hmac_sha256 = (function fluree$crypto$hmac$hmac_sha256(message,key){
var hmac = (new sjcl.misc.hmac(sjcl.codec.bytes.toBits(key)));
var message_bits = sjcl.codec.bytes.toBits(message);
return sjcl.codec.bytes.fromBits(hmac.encrypt(message_bits));
});

//# sourceMappingURL=hmac.js.map?rel=1567785970722
