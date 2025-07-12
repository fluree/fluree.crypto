// Compiled by ClojureScript 1.10.520 {:static-fns false, :optimize-constants false}
goog.provide('alphabase.base58');
goog.require('cljs.core');
goog.require('alphabase.codec');
goog.require('clojure.set');
alphabase.base58.base58_chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
alphabase.base58.base58_set = cljs.core.set.call(null,"123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
/**
 * Outputs if a string is hexadecimal or not
 */
alphabase.base58.base58_QMARK_ = (function alphabase$base58$base58_QMARK_(x){
return ((typeof x === 'string') && (clojure.set.subset_QMARK_.call(null,cljs.core.set.call(null,x),alphabase.base58.base58_set)));
});
/**
 * Converts a byte array into a base58-check string.
 */
alphabase.base58.encode = (function alphabase$base58$encode(data){
return alphabase.codec.encode.call(null,"123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",data);
});
/**
 * Decodes a base58-check string into a byte array.
 */
alphabase.base58.decode = (function alphabase$base58$decode(tokens){
return alphabase.codec.decode.call(null,"123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",tokens);
});

//# sourceMappingURL=base58.js.map?rel=1567785970473
