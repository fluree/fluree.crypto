// Compiled by ClojureScript 1.10.520 {:static-fns false, :optimize-constants false}
goog.provide('fluree.crypto.asn1');
goog.require('cljs.core');
goog.require('sjcl.codec.hex');
goog.require('sjcl.codec.bytes');
fluree.crypto.asn1.encode_asn1_length_hex = (function fluree$crypto$asn1$encode_asn1_length_hex(len){
return len.toString((16));
});
fluree.crypto.asn1.decode_asn1_length = (function fluree$crypto$asn1$decode_asn1_length(asn1){
var len = parseInt(cljs.core.subs.call(null,asn1,(0),(2)),(16));
if(((len & (128)) === (0))){
} else {
throw cljs.core.ex_info.call(null,"Lengths greater than 0x80 not supported",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"length","length",588987862),len,new cljs.core.Keyword(null,"asn1","asn1",1199738698),asn1], null));
}

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"length","length",588987862),len,new cljs.core.Keyword(null,"remaining","remaining",-138926777),cljs.core.subs.call(null,asn1,(2))], null);
});
/**
 * Formats a hexadecimal encoding an unsigned integer, dropping left zeros and
 *   padding with a left zero if necessary to avoid being confused for a two's complement
 */
fluree.crypto.asn1.format_asn1_unsigned_integer_hex = (function fluree$crypto$asn1$format_asn1_unsigned_integer_hex(n){
var bytes = cljs.core.drop_while.call(null,cljs.core.zero_QMARK_,sjcl.codec.bytes.fromBits(sjcl.codec.hex.toBits(n)));
var bytes_STAR_ = cljs.core.clj__GT_js.call(null,(((!(((cljs.core.first.call(null,bytes) & (128)) === (0)))))?cljs.core.cons.call(null,(0),bytes):bytes));
return sjcl.codec.hex.fromBits(sjcl.codec.bytes.toBits(bytes_STAR_));
});
/**
 * Formats a byte encoded unsigned integer, dropping left zeros and
 *   padding with a left zero if necessary to avoid being confused for a two's complement
 */
fluree.crypto.asn1.format_asn1_unsigned_integer = (function fluree$crypto$asn1$format_asn1_unsigned_integer(ba){
var bytes = cljs.core.drop_while.call(null,cljs.core.zero_QMARK_,ba);
if((!(((cljs.core.first.call(null,bytes) & (128)) === (0))))){
return cljs.core.clj__GT_js.call(null,cljs.core.cons.call(null,(0),bytes));
} else {
return bytes;
}
});
/**
 * Formats a hexadecimal as an unsigned integer, padding and prepending a length
 */
fluree.crypto.asn1.encode_asn1_unsigned_integer_hex = (function fluree$crypto$asn1$encode_asn1_unsigned_integer_hex(n){
var formatted_n = fluree.crypto.asn1.format_asn1_unsigned_integer_hex.call(null,n);
var len = fluree.crypto.asn1.encode_asn1_length_hex.call(null,(cljs.core.count.call(null,formatted_n) / (2)));
return ["02",cljs.core.str.cljs$core$IFn$_invoke$arity$1(len),cljs.core.str.cljs$core$IFn$_invoke$arity$1(formatted_n)].join('');
});
/**
 * Formats a byte array as an unsigned integer, padding and prepending a length
 */
fluree.crypto.asn1.encode_asn1_unsigned_integer = (function fluree$crypto$asn1$encode_asn1_unsigned_integer(ba){
var formatted_n = fluree.crypto.asn1.format_asn1_unsigned_integer.call(null,ba);
var size = cljs.core.count.call(null,formatted_n);
return cljs.core.clj__GT_js.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(2),size], null),formatted_n));
});
/**
 * Decodes an int from the top of an ASN.1 encoded string
 */
fluree.crypto.asn1.decode_asn1_integer = (function fluree$crypto$asn1$decode_asn1_integer(asn1){
if(cljs.core._EQ_.call(null,cljs.core.subs.call(null,asn1,(0),(2)),"02")){
} else {
throw (new Error(["Assert failed: ","ASN.1 must have a 02 tag for an integer","\n","(= (subs asn1 0 2) \"02\")"].join('')));
}

var map__21005 = fluree.crypto.asn1.decode_asn1_length.call(null,cljs.core.subs.call(null,asn1,(2)));
var map__21005__$1 = (((((!((map__21005 == null))))?(((((map__21005.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__21005.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21005):map__21005);
var length = cljs.core.get.call(null,map__21005__$1,new cljs.core.Keyword(null,"length","length",588987862));
var remaining = cljs.core.get.call(null,map__21005__$1,new cljs.core.Keyword(null,"remaining","remaining",-138926777));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"integer","integer",-604721710),cljs.core.subs.call(null,remaining,(0),((2) * length)),new cljs.core.Keyword(null,"remaining","remaining",-138926777),cljs.core.subs.call(null,remaining,((2) * length))], null);
});

//# sourceMappingURL=asn1.js.map?rel=1567785970742
