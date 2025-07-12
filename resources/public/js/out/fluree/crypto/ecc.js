// Compiled by ClojureScript 1.10.520 {:static-fns true, :optimize-constants true}
goog.provide('fluree.crypto.ecc');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('alphabase.core');
goog.require('sjcl.ecc');
goog.require('sjcl.bn');
goog.require('sjcl.codec.hex');
if((typeof fluree !== 'undefined') && (typeof fluree.crypto !== 'undefined') && (typeof fluree.crypto.ecc !== 'undefined') && (typeof fluree.crypto.ecc.secp256k1 !== 'undefined')){
} else {
fluree.crypto.ecc.secp256k1 = sjcl.ecc.curves.k256;
}
/**
 * Pads a hex value with a leading zero if odd.
 */
fluree.crypto.ecc.pad_hex = (function fluree$crypto$ecc$pad_hex(hex){
if(cljs.core.odd_QMARK_(cljs.core.count(hex))){
return ["0",cljs.core.str.cljs$core$IFn$_invoke$arity$1(hex)].join('');
} else {
return hex;
}
});
/**
 * Hex-encode java.math.BigInteger (clj) or sjcl.bn (cljs).
 */
fluree.crypto.ecc.biginteger__GT_hex = (function fluree$crypto$ecc$biginteger__GT_hex(bn){
return fluree.crypto.ecc.pad_hex(bn.toString().replace(/^0x/,""));
});
/**
 * Returns true if private key, as big number/integer, is valid.
 *   Private key must be >= 1 and <= curve modulus.
 */
fluree.crypto.ecc.valid_private_QMARK_ = (function fluree$crypto$ecc$valid_private_QMARK_(private$){
var and__4120__auto__ = private$.greaterEquals((1));
if(cljs.core.truth_(and__4120__auto__)){
return fluree.crypto.ecc.secp256k1.r.greaterEquals(private$);
} else {
return and__4120__auto__;
}
});
/**
 * Encodes x and y coords in hex to X9.62 with optional compression (default true).
 *   x coords and y coords should be supplied in hex format.
 */
fluree.crypto.ecc.x962_encode = (function fluree$crypto$ecc$x962_encode(var_args){
var G__23705 = arguments.length;
switch (G__23705) {
case 2:
return fluree.crypto.ecc.x962_encode.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return fluree.crypto.ecc.x962_encode.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

fluree.crypto.ecc.x962_encode.cljs$core$IFn$_invoke$arity$2 = (function (x_coord,y_coord){
return fluree.crypto.ecc.x962_encode.cljs$core$IFn$_invoke$arity$3(x_coord,y_coord,true);
});

fluree.crypto.ecc.x962_encode.cljs$core$IFn$_invoke$arity$3 = (function (x_coord,y_coord,compressed_QMARK_){
if(cljs.core.not(compressed_QMARK_)){
return ["04",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fluree.crypto.ecc.pad_hex(x_coord)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(fluree.crypto.ecc.pad_hex(y_coord))].join('');
} else {
var y_even_QMARK_ = (function (){var y_bn = (new sjcl.bn()).initWith(y_coord);
return y_bn.mod((2)).equals((0));
})();
if(cljs.core.truth_(y_even_QMARK_)){
return ["02",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fluree.crypto.ecc.pad_hex(x_coord))].join('');
} else {
return ["03",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fluree.crypto.ecc.pad_hex(x_coord))].join('');
}
}
});

fluree.crypto.ecc.x962_encode.cljs$lang$maxFixedArity = 3;

/**
 * Takes internal representation of a key-pair and returns X9.62 compressed encoded
 *   public key and private key as a map, with each value hex encoded.
 */
fluree.crypto.ecc.format_key_pair = (function fluree$crypto$ecc$format_key_pair(pair){
var private$ = pair.private;
var public$ = pair.public;
var x = fluree.crypto.ecc.pad_hex(public$.x.toString().replace(/^0x/,""));
var y = fluree.crypto.ecc.pad_hex(public$.y.toString().replace(/^0x/,""));
var pair_hex = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$private,fluree.crypto.ecc.biginteger__GT_hex(private$),cljs.core.cst$kw$public,fluree.crypto.ecc.x962_encode.cljs$core$IFn$_invoke$arity$2(x,y)], null);
return cljs.core.clj__GT_js(pair_hex);
});
/**
 * Generates an internal representation of key pair from a secure random seed or provided private key.
 *   Returns map/object with two keys:
 * - public  - a big number/integer
 * - private - a curve point
 */
fluree.crypto.ecc.generate_key_pair_STAR_ = (function fluree$crypto$ecc$generate_key_pair_STAR_(var_args){
var G__23708 = arguments.length;
switch (G__23708) {
case 0:
return fluree.crypto.ecc.generate_key_pair_STAR_.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return fluree.crypto.ecc.generate_key_pair_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

fluree.crypto.ecc.generate_key_pair_STAR_.cljs$core$IFn$_invoke$arity$0 = (function (){
var private$ = (function (){var G__23709 = sjcl.ecc.ecdsa.generateKeys.call(null,fluree.crypto.ecc.secp256k1).sec.get();
return sjcl.bn.fromBits(G__23709);
})();
return fluree.crypto.ecc.generate_key_pair_STAR_.cljs$core$IFn$_invoke$arity$1(private$);
});

fluree.crypto.ecc.generate_key_pair_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (private$){
var private_bn = (new sjcl.bn()).initWith(private$);
if(cljs.core.truth_(fluree.crypto.ecc.valid_private_QMARK_(private_bn))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Invalid private key. Must be big integer and >= 1, <= curve modulus.",cljs.core.PersistentArrayMap.EMPTY);
}

return ({"private": private_bn, "public": fluree.crypto.ecc.secp256k1.G.mult(private_bn)});
});

fluree.crypto.ecc.generate_key_pair_STAR_.cljs$lang$maxFixedArity = 1;

/**
 * Returns key pair in hex format using X9.62 compressed encoding for public key.
 */
fluree.crypto.ecc.generate_key_pair = (function fluree$crypto$ecc$generate_key_pair(var_args){
var G__23712 = arguments.length;
switch (G__23712) {
case 0:
return fluree.crypto.ecc.generate_key_pair.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return fluree.crypto.ecc.generate_key_pair.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});
goog.exportSymbol('fluree.crypto.ecc.generate_key_pair', fluree.crypto.ecc.generate_key_pair);

fluree.crypto.ecc.generate_key_pair.cljs$core$IFn$_invoke$arity$0 = (function (){
return fluree.crypto.ecc.format_key_pair(fluree.crypto.ecc.generate_key_pair_STAR_.cljs$core$IFn$_invoke$arity$0());
});

fluree.crypto.ecc.generate_key_pair.cljs$core$IFn$_invoke$arity$1 = (function (private$){
return fluree.crypto.ecc.format_key_pair(fluree.crypto.ecc.generate_key_pair_STAR_.cljs$core$IFn$_invoke$arity$1(private$));
});

fluree.crypto.ecc.generate_key_pair.cljs$lang$maxFixedArity = 1;


//# sourceMappingURL=ecc.js.map?rel=1564318262186
