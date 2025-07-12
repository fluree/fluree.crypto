// Compiled by ClojureScript 1.10.520 {:static-fns false, :optimize-constants false}
goog.provide('alphabase.base64');
goog.require('cljs.core');
goog.require('clojure.set');
goog.require('goog.crypt.base64');
alphabase.base64.base64_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
alphabase.base64.base64_set = cljs.core.set.call(null,"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");
/**
 * Converts a byte array into a base58-check string.
 */
alphabase.base64.encode = (function alphabase$base64$encode(data){
return goog.crypt.base64.encodeByteArray(data);
});
/**
 * Decodes a base58-check string into a byte array.
 */
alphabase.base64.decode = (function alphabase$base64$decode(tokens){
return goog.crypt.base64.decodeStringToByteArray(tokens);
});
/**
 * Test if a string is base64
 */
alphabase.base64.base64_QMARK_ = (function alphabase$base64$base64_QMARK_(x){
return ((typeof x === 'string') && (clojure.set.subset_QMARK_.call(null,cljs.core.set.call(null,x),alphabase.base64.base64_set)));
});

//# sourceMappingURL=base64.js.map?rel=1567785970638
