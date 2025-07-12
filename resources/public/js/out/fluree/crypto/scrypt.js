// Compiled by ClojureScript 1.10.520 {:static-fns false, :optimize-constants false}
goog.provide('fluree.crypto.scrypt');
goog.require('cljs.core');
goog.require('alphabase.core');
goog.require('sjcl.crypt.scrypt');
goog.require('sjcl.codec.bytes');
goog.require('goog.object');
/**
 * Returns a random byte array of the specified size.
 *   NOTE: This will only work in the browser, not for node.js
 */
fluree.crypto.scrypt.random_bytes = (function fluree$crypto$scrypt$random_bytes(size){
var seed = (new Uint8Array(size));
window.crypto.getRandomValues(seed);

return seed;
});
/**
 * Encrypts message (bytes) using salt (bytes).
 *   Returns encrypted message in bytes directly.
 * 
 *   Note verification of message will require the identical salt, n, r, p used
 *   by the original encryption.
 */
fluree.crypto.scrypt.encrypt = (function fluree$crypto$scrypt$encrypt(var_args){
var G__21077 = arguments.length;
switch (G__21077) {
case 1:
return fluree.crypto.scrypt.encrypt.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return fluree.crypto.scrypt.encrypt.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return fluree.crypto.scrypt.encrypt.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 5:
return fluree.crypto.scrypt.encrypt.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return fluree.crypto.scrypt.encrypt.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

fluree.crypto.scrypt.encrypt.cljs$core$IFn$_invoke$arity$1 = (function (raw){
return fluree.crypto.scrypt.encrypt.call(null,raw,fluree.crypto.scrypt.random_bytes.call(null,(16)));
});

fluree.crypto.scrypt.encrypt.cljs$core$IFn$_invoke$arity$2 = (function (raw,salt){
return fluree.crypto.scrypt.encrypt.call(null,raw,salt,(32768));
});

fluree.crypto.scrypt.encrypt.cljs$core$IFn$_invoke$arity$3 = (function (raw,salt,n){
return fluree.crypto.scrypt.encrypt.call(null,raw,salt,n,(8),(1));
});

fluree.crypto.scrypt.encrypt.cljs$core$IFn$_invoke$arity$5 = (function (raw,salt,n,r,p){
return fluree.crypto.scrypt.encrypt.call(null,raw,salt,n,r,p,(32));
});

fluree.crypto.scrypt.encrypt.cljs$core$IFn$_invoke$arity$6 = (function (raw,salt,n,r,p,dk_len){
var rawBits = sjcl.codec.bytes.toBits(raw);
var saltBits = sjcl.codec.bytes.toBits(salt);
var length = ((8) * dk_len);
var res = (new sjcl.crypt.scrypt(rawBits,saltBits,n,r,p,length));
return sjcl.codec.bytes.fromBits(res);
});

fluree.crypto.scrypt.encrypt.cljs$lang$maxFixedArity = 6;

/**
 * Compare raw message (bytes) with previously encrypted (bytes) that was
 *   encrypted with the provided salt, n, r and p.
 *   Returns true or false.
 */
fluree.crypto.scrypt.check = (function fluree$crypto$scrypt$check(var_args){
var G__21080 = arguments.length;
switch (G__21080) {
case 3:
return fluree.crypto.scrypt.check.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 6:
return fluree.crypto.scrypt.check.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

fluree.crypto.scrypt.check.cljs$core$IFn$_invoke$arity$3 = (function (raw,encrypted,salt){
return fluree.crypto.scrypt.check.call(null,raw,encrypted,salt,(32768),(8),(1));
});

fluree.crypto.scrypt.check.cljs$core$IFn$_invoke$arity$6 = (function (raw,encrypted,salt,n,r,p){
var dk_len = encrypted.length;
var is_valid_QMARK_ = ((function (dk_len){
return (function (encrypted__$1,test){
return goog.object.equals(encrypted__$1,test);
});})(dk_len))
;
var to_test = fluree.crypto.scrypt.encrypt.call(null,raw,salt,n,r,p,dk_len);
return is_valid_QMARK_.call(null,encrypted,to_test);
});

fluree.crypto.scrypt.check.cljs$lang$maxFixedArity = 6;


//# sourceMappingURL=scrypt.js.map?rel=1567785970894
