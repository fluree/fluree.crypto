// Compiled by ClojureScript 1.10.520 {:static-fns false, :optimize-constants false}
goog.provide('alphabase.hex');
goog.require('cljs.core');
goog.require('alphabase.bytes');
goog.require('clojure.string');
goog.require('clojure.set');
alphabase.hex.hex_chars = "0123456789ABCDEFabcdef";
alphabase.hex.hex_set = cljs.core.set.call(null,"0123456789ABCDEFabcdef");
/**
 * Test if input is hex char set.
 */
alphabase.hex.hex_QMARK_ = (function alphabase$hex$hex_QMARK_(x){
return ((typeof x === 'string') && (clojure.set.subset_QMARK_.call(null,cljs.core.set.call(null,x),alphabase.hex.hex_set)));
});
/**
 * Converts a single byte value to a two-character hex string.
 */
alphabase.hex.byte__GT_hex = (function alphabase$hex$byte__GT_hex(value){
var hex = value.toString((16));
if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,hex))){
return ["0",cljs.core.str.cljs$core$IFn$_invoke$arity$1(hex)].join('');
} else {
return hex;
}
});
/**
 * Converts a two-character hex string into a byte value.
 */
alphabase.hex.hex__GT_byte = (function alphabase$hex$hex__GT_byte(hex){
return parseInt(hex,(16));
});
/**
 * Converts a byte array into a lowercase hexadecimal string. Returns nil for
 *   empty inputs.
 */
alphabase.hex.encode = (function alphabase$hex$encode(data){
if(cljs.core.truth_((function (){var and__4120__auto__ = data;
if(cljs.core.truth_(and__4120__auto__)){
return (data.length > (0));
} else {
return and__4120__auto__;
}
})())){
return clojure.string.lower_case.call(null,clojure.string.join.call(null,cljs.core.map.call(null,alphabase.hex.byte__GT_hex,alphabase.bytes.byte_seq.call(null,data))));
} else {
return null;
}
});
/**
 * Parses a hexadecimal string into a byte array. Ensures that the resulting
 *   array is zero-padded to match the hex string length.
 */
alphabase.hex.decode = (function alphabase$hex$decode(data){
if(cljs.core.empty_QMARK_.call(null,data)){
return null;
} else {
var length = (cljs.core.count.call(null,data) / (2));
var array = alphabase.bytes.byte_array.call(null,length);
var n__4607__auto___20977 = length;
var i_20978 = (0);
while(true){
if((i_20978 < n__4607__auto___20977)){
var hex_20979 = cljs.core.subs.call(null,data,((2) * i_20978),((2) * (i_20978 + (1))));
alphabase.bytes.set_byte.call(null,array,i_20978,alphabase.hex.hex__GT_byte.call(null,hex_20979));

var G__20980 = (i_20978 + (1));
i_20978 = G__20980;
continue;
} else {
}
break;
}

return array;
}
});
/**
 * Checks a string to determine whether it's well-formed hexadecimal. Returns
 *   an error string if the argument is invalid.
 */
alphabase.hex.validate = (function alphabase$hex$validate(value){
if((!(typeof value === 'string'))){
return ["Value is not a string: ",cljs.core.pr_str.call(null,value)].join('');
} else {
if(cljs.core.not.call(null,cljs.core.re_matches.call(null,/^[0-9a-fA-F]*$/,value))){
return ["String '",cljs.core.str.cljs$core$IFn$_invoke$arity$1(value),"' is not valid hex: ","contains illegal characters"].join('');
} else {
if((cljs.core.count.call(null,value) < (2))){
return "Hex string must contain at least one byte";
} else {
if(cljs.core.odd_QMARK_.call(null,cljs.core.count.call(null,value))){
return ["String '",cljs.core.str.cljs$core$IFn$_invoke$arity$1(value),"' is not valid hex: ","number of characters (",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count.call(null,value)),") is odd"].join('');
} else {
return null;

}
}
}
}
});
/**
 * Returns true if the string is valid hexadecimal.
 */
alphabase.hex.valid_QMARK_ = (function alphabase$hex$valid_QMARK_(value){
return (alphabase.hex.validate.call(null,value) == null);
});

//# sourceMappingURL=hex.js.map?rel=1567785970616
