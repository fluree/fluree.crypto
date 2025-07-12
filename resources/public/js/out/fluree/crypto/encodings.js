// Compiled by ClojureScript 1.10.520 {:static-fns false, :optimize-constants false}
goog.provide('fluree.crypto.encodings');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('fluree.crypto.asn1');
goog.require('sjcl.ecc');
goog.require('sjcl.bn');
goog.require('sjcl.codec.hex');
goog.require('sjcl.codec.bytes');
goog.require('alphabase.core');
/**
 * Pads a hex value with a leading zero if odd.
 */
fluree.crypto.encodings.pad_hex = (function fluree$crypto$encodings$pad_hex(hex){
if(cljs.core.odd_QMARK_.call(null,cljs.core.count.call(null,hex))){
return ["0",cljs.core.str.cljs$core$IFn$_invoke$arity$1(hex)].join('');
} else {
return hex;
}
});
goog.exportSymbol('fluree.crypto.encodings.pad_hex', fluree.crypto.encodings.pad_hex);
/**
 * Hex-encode java.math.BigInteger (clj) or sjcl.bn (cljs).
 */
fluree.crypto.encodings.biginteger__GT_hex = (function fluree$crypto$encodings$biginteger__GT_hex(bn){
return fluree.crypto.encodings.pad_hex.call(null,bn.toString().replace(/^0x/,""));
});
/**
 * Return bytes of java.math.BigInteger (clj) or sjcl.bn (cljs).
 */
fluree.crypto.encodings.biginteger__GT_bytes = (function fluree$crypto$encodings$biginteger__GT_bytes(var_args){
var G__21010 = arguments.length;
switch (G__21010) {
case 1:
return fluree.crypto.encodings.biginteger__GT_bytes.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return fluree.crypto.encodings.biginteger__GT_bytes.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

fluree.crypto.encodings.biginteger__GT_bytes.cljs$core$IFn$_invoke$arity$1 = (function (bn){
return fluree.crypto.encodings.biginteger__GT_bytes.call(null,bn,null);
});

fluree.crypto.encodings.biginteger__GT_bytes.cljs$core$IFn$_invoke$arity$2 = (function (bn,l){
return sjcl.codec.bytes.fromBits(bn.toBits(l));
});

fluree.crypto.encodings.biginteger__GT_bytes.cljs$lang$maxFixedArity = 2;

/**
 * Return bytes of java.math.BigInteger (clj) or sjcl.bn (cljs).
 */
fluree.crypto.encodings.bytes__GT_biginteger = (function fluree$crypto$encodings$bytes__GT_biginteger(ba){
return sjcl.bn.fromBits(sjcl.codec.bytes.toBits(ba));
});
/**
 * Return bytes of java.math.BigInteger (clj) or sjcl.bn (cljs).
 */
fluree.crypto.encodings.hex__GT_biginteger = (function fluree$crypto$encodings$hex__GT_biginteger(hex){
return (new sjcl.bn()).initWith(hex);
});
fluree.crypto.encodings.byte__GT_int = (function fluree$crypto$encodings$byte__GT_int(the_bytes){
var the_bytes__$1 = cljs.core.bytes.call(null,the_bytes);
return ((the_bytes__$1[(0)]) | (0));
});
/**
 * Tests is an sjcl.bn (cljs) is even. Returns boolean if so.
 */
fluree.crypto.encodings.bn_even_QMARK_ = (function fluree$crypto$encodings$bn_even_QMARK_(sjcl_bn){
return ((cljs.core.get.call(null,sjcl_bn.limbs,(0)) & (1)) === (0));
});
/**
 * Compute the square root of a number modulo a prime.
 *   Number and modulus should be big numbers (bn).
 */
fluree.crypto.encodings.modular_square_root = (function fluree$crypto$encodings$modular_square_root(n,modulus){
var n__$1 = n.mod(modulus);
var mod8 = parseInt(modulus.mod((8)).toString());
if(cljs.core.truth_(modulus.greaterEquals((0)))){
} else {
throw (new Error(["Assert failed: ","Modulus must be non-negative","\n","(.greaterEquals modulus 0)"].join('')));
}

if(cljs.core.truth_(n__$1.equals((0)))){
return n__$1;
} else {
if(cljs.core.truth_(n__$1.equals((1)))){
return n__$1;
} else {
if(cljs.core.truth_(modulus.equals((2)))){
return n__$1.mod(modulus);
} else {
if(((cljs.core._EQ_.call(null,mod8,(3))) || (cljs.core._EQ_.call(null,mod8,(7))))){
var m = modulus.add((1)).normalize().halveM().halveM();
return n__$1.powermod(m,modulus);
} else {
if(cljs.core._EQ_.call(null,mod8,(5))){
var m = modulus.sub((5)).normalize().halveM().halveM().halveM();
var v = n__$1.add(n__$1).powermod(m,modulus);
var i = v.multiply(v).multiply(n__$1).multiply((2)).sub((1)).mod(modulus);
return n__$1.multiply(v).multiply(i).mod(modulus);
} else {
if(cljs.core._EQ_.call(null,mod8,(1))){
var q = modulus.sub((1)).normalize();
var e = cljs.core.count.call(null,cljs.core.take_while.call(null,cljs.core.even_QMARK_,cljs.core.iterate.call(null,((function (q,n__$1,mod8){
return (function (p1__21012_SHARP_){
return p1__21012_SHARP_.halveM();
});})(q,n__$1,mod8))
,q)));
var two = (new sjcl.bn((2)));
var z = cljs.core.first.call(null,cljs.core.filter.call(null,((function (q,e,two,n__$1,mod8){
return (function (p1__21015_SHARP_){
return cljs.core.not.call(null,p1__21015_SHARP_.powermod(two.pow((e - (1))),modulus).equals((1)));
});})(q,e,two,n__$1,mod8))
,cljs.core.map.call(null,((function (q,e,two,n__$1,mod8){
return (function (p1__21014_SHARP_){
return p1__21014_SHARP_.powermod(q,modulus);
});})(q,e,two,n__$1,mod8))
,cljs.core.map.call(null,((function (q,e,two,n__$1,mod8){
return (function (p1__21013_SHARP_){
return (new sjcl.bn(p1__21013_SHARP_));
});})(q,e,two,n__$1,mod8))
,cljs.core.rest.call(null,cljs.core.rest.call(null,cljs.core.range.call(null)))))));
var x = n__$1.powermod(q.sub((1)).normalize().halveM(),modulus);
var y = z;
var r = e;
var v = n__$1.multiply(x).mod(modulus);
var w = n__$1.multiply(x).multiply(x).mod(modulus);
while(true){
if(cljs.core.truth_(w.equals((1)))){
return v;
} else {
var k = cljs.core.first.call(null,cljs.core.first.call(null,cljs.core.filter.call(null,((function (y,r,v,w,q,e,two,z,x,n__$1,mod8){
return (function (p1__21017_SHARP_){
return cljs.core.second.call(null,p1__21017_SHARP_).equals((1));
});})(y,r,v,w,q,e,two,z,x,n__$1,mod8))
,cljs.core.map.call(null,((function (y,r,v,w,q,e,two,z,x,n__$1,mod8){
return (function (p1__21016_SHARP_){
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[p1__21016_SHARP_,w.powermod(two.pow(p1__21016_SHARP_),modulus)],null));
});})(y,r,v,w,q,e,two,z,x,n__$1,mod8))
,cljs.core.range.call(null)))));
var d = y.powermod(two.pow(((r - k) - (1))),modulus);
var y__$1 = d.multiply(d).mod(modulus);
var v__$1 = d.multiply(v).mod(modulus);
var w__$1 = w.multiply(y__$1).mod(modulus);
var G__21018 = y__$1;
var G__21019 = k;
var G__21020 = v__$1;
var G__21021 = w__$1;
y = G__21018;
r = G__21019;
v = G__21020;
w = G__21021;
continue;
}
break;
}
} else {
throw cljs.core.ex_info.call(null,"Cannot compute a square root for a non-prime modulus",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"argument","argument",1183001841),n__$1,new cljs.core.Keyword(null,"modulus","modulus",1798166227),modulus], null));

}
}
}
}
}
}
});
/**
 * Compute an elliptic curve point for a y-coordinate parity and x-coordinate
 */
fluree.crypto.encodings.compute_point = (function fluree$crypto$encodings$compute_point(y_even_QMARK_,x_coordinate,curve){
var modulus = curve.field.modulus;
var y_candidate = fluree.crypto.encodings.modular_square_root.call(null,x_coordinate.mul(curve.a.add(x_coordinate.square())).add(curve.b),modulus);
var y = ((cljs.core._EQ_.call(null,y_even_QMARK_,fluree.crypto.encodings.bn_even_QMARK_.call(null,y_candidate)))?y_candidate:modulus.sub(y_candidate));
return ({"x": (new sjcl.bn()).initWith(x_coordinate), "y": (new sjcl.bn()).initWith(y)});
});
fluree.crypto.encodings.x962_hex_compressed_decode = (function fluree$crypto$encodings$x962_hex_compressed_decode(encoded_key,curve){
var x = fluree.crypto.encodings.hex__GT_biginteger.call(null,cljs.core.subs.call(null,encoded_key,(2)));
var y_even_QMARK_ = cljs.core._EQ_.call(null,cljs.core.subs.call(null,encoded_key,(0),(2)),"02");
return fluree.crypto.encodings.compute_point.call(null,y_even_QMARK_,x,curve);
});
/**
 * Decode a hex encoded public key into x and y coordinates as bytes.
 */
fluree.crypto.encodings.x962_hex_uncompressed_decode = (function fluree$crypto$encodings$x962_hex_uncompressed_decode(encoded_key,curve){
var size = (cljs.core.count.call(null,encoded_key) - (2));
var x = cljs.core.subs.call(null,encoded_key,(2),((2) + size));
var y = cljs.core.subs.call(null,encoded_key,((2) + size));
return ({"x": (new sjcl.bn()).initWith(x), "y": (new sjcl.bn()).initWith(y)});
});
/**
 * Decode a X9.62 encoded public key from hex
 */
fluree.crypto.encodings.x962_decode = (function fluree$crypto$encodings$x962_decode(public_key,curve){
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, ["03",null,"02",null,"04",null], null), null).call(null,cljs.core.subs.call(null,public_key,(0),(2))))){
} else {
throw (new Error(["Assert failed: ","X9.62 encoded public key must have a first byte of 0x02, 0x03 or 0x04.","\n","(#{\"03\" \"02\" \"04\"} (subs public-key 0 2))"].join('')));
}

if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["03",null,"02",null], null), null).call(null,cljs.core.subs.call(null,public_key,(0),(2))))){
return fluree.crypto.encodings.x962_hex_compressed_decode.call(null,public_key,curve);
} else {
if(cljs.core._EQ_.call(null,"04",cljs.core.subs.call(null,public_key,(0),(2)))){
return fluree.crypto.encodings.x962_hex_uncompressed_decode.call(null,public_key,curve);
} else {
throw cljs.core.ex_info.call(null,"Invalid encoding on public key",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"encoded-key","encoded-key",-1294619749),public_key], null));

}
}
});
/**
 * Encodes x and y coords in hex to X9.62 with optional compression (default true).
 *   x coords and y coords should be supplied in hex format.
 */
fluree.crypto.encodings.x962_encode = (function fluree$crypto$encodings$x962_encode(var_args){
var G__21023 = arguments.length;
switch (G__21023) {
case 2:
return fluree.crypto.encodings.x962_encode.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return fluree.crypto.encodings.x962_encode.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

fluree.crypto.encodings.x962_encode.cljs$core$IFn$_invoke$arity$2 = (function (x_coord,y_coord){
return fluree.crypto.encodings.x962_encode.call(null,x_coord,y_coord,true);
});

fluree.crypto.encodings.x962_encode.cljs$core$IFn$_invoke$arity$3 = (function (x_coord,y_coord,compressed_QMARK_){
if(cljs.core.not.call(null,compressed_QMARK_)){
return ["04",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fluree.crypto.encodings.pad_hex.call(null,x_coord)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(fluree.crypto.encodings.pad_hex.call(null,y_coord))].join('');
} else {
var y_even_QMARK_ = fluree.crypto.encodings.bn_even_QMARK_.call(null,(new sjcl.bn()).initWith(y_coord));
if(y_even_QMARK_){
return ["02",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fluree.crypto.encodings.pad_hex.call(null,x_coord))].join('');
} else {
return ["03",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fluree.crypto.encodings.pad_hex.call(null,x_coord))].join('');
}
}
});

fluree.crypto.encodings.x962_encode.cljs$lang$maxFixedArity = 3;

/**
 * Decodes an ordinary encoded list of numbers from a hexadecimal following the distinguished encoding rules. Returns R and S as bigintegers (clj). 
 */
fluree.crypto.encodings.DER_decode_standard = (function fluree$crypto$encodings$DER_decode_standard(asn1){
if(cljs.core._EQ_.call(null,"30",cljs.core.subs.call(null,asn1,(0),(2)))){
} else {
throw (new Error(["Assert failed: ","Input must start with the code 30","\n","(= \"30\" (subs asn1 0 2))"].join('')));
}

var map__21025 = fluree.crypto.asn1.decode_asn1_length.call(null,cljs.core.subs.call(null,asn1,(2)));
var map__21025__$1 = (((((!((map__21025 == null))))?(((((map__21025.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__21025.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21025):map__21025);
var length = cljs.core.get.call(null,map__21025__$1,new cljs.core.Keyword(null,"length","length",588987862));
var remaining = cljs.core.get.call(null,map__21025__$1,new cljs.core.Keyword(null,"remaining","remaining",-138926777));
if(cljs.core._EQ_.call(null,(length * (2)),cljs.core.count.call(null,remaining))){
} else {
throw cljs.core.ex_info.call(null,"Decoded header length does not match actual length of message",new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"decoded-header-length","decoded-header-length",471082480),((2) * length),new cljs.core.Keyword(null,"actual-length","actual-length",-1240398531),cljs.core.count.call(null,remaining),new cljs.core.Keyword(null,"message","message",-406056002),remaining,new cljs.core.Keyword(null,"full-asn1","full-asn1",46275873),asn1], null));
}

var ret = cljs.core.PersistentVector.EMPTY;
var remaining__$1 = remaining;
while(true){
if(cljs.core.empty_QMARK_.call(null,remaining__$1)){
return cljs.core.mapv.call(null,fluree.crypto.encodings.hex__GT_biginteger,ret);
} else {
var map__21029 = fluree.crypto.asn1.decode_asn1_integer.call(null,remaining__$1);
var map__21029__$1 = (((((!((map__21029 == null))))?(((((map__21029.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__21029.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21029):map__21029);
var integer = cljs.core.get.call(null,map__21029__$1,new cljs.core.Keyword(null,"integer","integer",-604721710));
var remaining__$2 = cljs.core.get.call(null,map__21029__$1,new cljs.core.Keyword(null,"remaining","remaining",-138926777));
var G__21031 = cljs.core.conj.call(null,ret,integer);
var G__21032 = remaining__$2;
ret = G__21031;
remaining__$1 = G__21032;
continue;
}
break;
}
});
/**
 * Decodes a list of numbers including an optional recovery byte, following BitCoin's convention
 */
fluree.crypto.encodings.DER_decode = (function fluree$crypto$encodings$DER_decode(asn1){
var asn1__$1 = clojure.string.lower_case.call(null,asn1);
var first_byte = cljs.core.subs.call(null,asn1__$1,(0),(2));
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, ["1c",null,"1b",null,"1e",null,"1d",null], null), null).call(null,first_byte))){
return cljs.core.conj.call(null,fluree.crypto.encodings.DER_decode_standard.call(null,cljs.core.subs.call(null,asn1__$1,(2))),fluree.crypto.encodings.byte__GT_int.call(null,alphabase.core.hex__GT_bytes.call(null,first_byte)));
} else {
if(cljs.core._EQ_.call(null,"30",first_byte)){
return fluree.crypto.encodings.DER_decode_standard.call(null,asn1__$1);
} else {
throw cljs.core.ex_info.call(null,"Input must start with the code 30, or start with a recovery code (either 1b, 1c, 1d, or 1e)",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"argument","argument",1183001841),asn1__$1], null));

}
}
});
/**
 * Formats an ECDSA signature from hex.
 *   Returns R, S and recover as hex values.
 */
fluree.crypto.encodings.DER_decode_ECDSA_signature = (function fluree$crypto$encodings$DER_decode_ECDSA_signature(ecdsa){
var vec__21033 = fluree.crypto.encodings.DER_decode.call(null,ecdsa);
var R = cljs.core.nth.call(null,vec__21033,(0),null);
var S = cljs.core.nth.call(null,vec__21033,(1),null);
var recover = cljs.core.nth.call(null,vec__21033,(2),null);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"R","R",-936662523),R,new cljs.core.Keyword(null,"S","S",1267293308),S,new cljs.core.Keyword(null,"recover","recover",849894427),recover], null);
});
/**
 * Create a DER encoded signature.
 *   Both R and S should be bigintegers (clj) /bignumbers (cljs).
 *   recover should also be biginteger
 */
fluree.crypto.encodings.DER_encode_ECDSA_signature = (function fluree$crypto$encodings$DER_encode_ECDSA_signature(R,S,recover,curve){
var recover__$1 = (27);
var l = curve.r.bitLength();
var R_hex = sjcl.codec.hex.fromBits(R.toBits(l));
var S_hex = sjcl.codec.hex.fromBits(S.toBits(l));
var recover_hex = recover__$1.toString((16));
var R_asn1 = fluree.crypto.asn1.encode_asn1_unsigned_integer_hex.call(null,R_hex);
var S_asn1 = fluree.crypto.asn1.encode_asn1_unsigned_integer_hex.call(null,S_hex);
return alphabase.core.hex__GT_bytes.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(recover_hex),"30",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((function (recover__$1,l,R_hex,S_hex,recover_hex,R_asn1,S_asn1){
return (function (p1__21036_SHARP_){
return cljs.core.subs.call(null,p1__21036_SHARP_,(2));
});})(recover__$1,l,R_hex,S_hex,recover_hex,R_asn1,S_asn1))
.call(null,fluree.crypto.asn1.encode_asn1_unsigned_integer_hex.call(null,[R_asn1,S_asn1].join(''))))].join(''));
});

//# sourceMappingURL=encodings.js.map?rel=1567785970807
