// Compiled by ClojureScript 1.10.520 {:static-fns true, :optimize-constants true}
goog.provide('fluree.crypto.elliptic2');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('sjcl.bitArray');
goog.require('sjcl.codec.bytes');
goog.require('sjcl.hash.ripemd160');
goog.require('sjcl.hash.sha256');
goog.require('alphabase.core');
goog.require('sjcl.ecc');
goog.require('sjcl.bn');
fluree.crypto.elliptic2.to_bitArray = (function fluree$crypto$elliptic2$to_bitArray(x,format){
var G__22897 = alphabase.core.base_to_byte_array.cljs$core$IFn$_invoke$arity$2(x,format);
return sjcl.codec.bytes.toBits(G__22897);
});
/**
 * Returns true/false if big number is even.
 */
fluree.crypto.elliptic2.bn_even_QMARK_ = (function fluree$crypto$elliptic2$bn_even_QMARK_(bn){
return bn.mod((2)).equals((0));
});
/**
 * Encode a sjcl.ecc.point using X9.62 compression.
 */
fluree.crypto.elliptic2.x962_encode = (function fluree$crypto$elliptic2$x962_encode(var_args){
var G__22899 = arguments.length;
switch (G__22899) {
case 1:
return fluree.crypto.elliptic2.x962_encode.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return fluree.crypto.elliptic2.x962_encode.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

fluree.crypto.elliptic2.x962_encode.cljs$core$IFn$_invoke$arity$1 = (function (pub_key){
return fluree.crypto.elliptic2.x962_encode.cljs$core$IFn$_invoke$arity$2(pub_key,true);
});

fluree.crypto.elliptic2.x962_encode.cljs$core$IFn$_invoke$arity$2 = (function (pub_key,compressed_QMARK_){
var x = pub_key.x;
var y = pub_key.y;
if(cljs.core.truth_(compressed_QMARK_)){
var y_bn = sjcl.bn.fromBits(y);
var y_even_QMARK_ = fluree.crypto.elliptic2.bn_even_QMARK_(y_bn);
var x_bytes = sjcl.codec.bytes.fromBits(x);
if(cljs.core.truth_(y_even_QMARK_)){
x_bytes.unshift((2));
} else {
x_bytes.unshift((3));
}

return x_bytes;
} else {
var combined = (function (){var G__22900 = x.concat(y);
return sjcl.codec.bytes.fromBits(G__22900);
})();
combined.unshift((4));

return combined;
}
});

fluree.crypto.elliptic2.x962_encode.cljs$lang$maxFixedArity = 2;

/**
 * Compute the square root of a number modulo a prime.
 *   Number and modulus should be big numbers (bn).
 */
fluree.crypto.elliptic2.modular_square_root = (function fluree$crypto$elliptic2$modular_square_root(n,modulus){
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
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mod8,(3))) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mod8,(7))))){
var m = modulus.add((1)).normalize().halveM().halveM();
return n__$1.powermod(m,modulus);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mod8,(5))){
var m = modulus.sub((5)).normalize().halveM().halveM().halveM();
var v = n__$1.add(n__$1).powermod(m,modulus);
var i = v.multiply(v).multiply(n__$1).multiply((2)).sub((1)).mod(modulus);
return n__$1.multiply(v).multiply(i).mod(modulus);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mod8,(1))){
var q = modulus.sub((1)).normalize();
var e = cljs.core.count(cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(cljs.core.even_QMARK_,cljs.core.iterate(((function (q,n__$1,mod8){
return (function (p1__22902_SHARP_){
return p1__22902_SHARP_.halveM();
});})(q,n__$1,mod8))
,q)));
var two = (new sjcl.bn((2)));
var z = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (q,e,two,n__$1,mod8){
return (function (p1__22905_SHARP_){
return cljs.core.not(p1__22905_SHARP_.powermod(two.pow((e - (1))),modulus).equals((1)));
});})(q,e,two,n__$1,mod8))
,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (q,e,two,n__$1,mod8){
return (function (p1__22904_SHARP_){
return p1__22904_SHARP_.powermod(q,modulus);
});})(q,e,two,n__$1,mod8))
,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (q,e,two,n__$1,mod8){
return (function (p1__22903_SHARP_){
return (new sjcl.bn(p1__22903_SHARP_));
});})(q,e,two,n__$1,mod8))
,cljs.core.rest(cljs.core.rest(cljs.core.range.cljs$core$IFn$_invoke$arity$0()))))));
var x = n__$1.powermod(q.sub((1)).normalize().halveM(),modulus);
var y = z;
var r = e;
var v = n__$1.multiply(x).mod(modulus);
var w = n__$1.multiply(x).multiply(x).mod(modulus);
while(true){
if(cljs.core.truth_(w.equals((1)))){
return v;
} else {
var k = cljs.core.first(cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (y,r,v,w,q,e,two,z,x,n__$1,mod8){
return (function (p1__22907_SHARP_){
return cljs.core.second(p1__22907_SHARP_).equals((1));
});})(y,r,v,w,q,e,two,z,x,n__$1,mod8))
,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (y,r,v,w,q,e,two,z,x,n__$1,mod8){
return (function (p1__22906_SHARP_){
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[p1__22906_SHARP_,w.powermod(two.pow(p1__22906_SHARP_),modulus)],null));
});})(y,r,v,w,q,e,two,z,x,n__$1,mod8))
,cljs.core.range.cljs$core$IFn$_invoke$arity$0()))));
var d = y.powermod(two.pow(((r - k) - (1))),modulus);
var y__$1 = d.multiply(d).mod(modulus);
var v__$1 = d.multiply(v).mod(modulus);
var w__$1 = w.multiply(y__$1).mod(modulus);
var G__22908 = y__$1;
var G__22909 = k;
var G__22910 = v__$1;
var G__22911 = w__$1;
y = G__22908;
r = G__22909;
v = G__22910;
w = G__22911;
continue;
}
break;
}
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Cannot compute a square root for a non-prime modulus",new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$argument,n__$1,cljs.core.cst$kw$modulus,modulus], null));

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
fluree.crypto.elliptic2.compute_point = (function fluree$crypto$elliptic2$compute_point(y_even_QMARK_,x){
var modulus = sjcl.ecc.curves.k256.field.modulus;
var y_candidate = fluree.crypto.elliptic2.modular_square_root(x.mul(sjcl.ecc.curves.k256.a.add(x.square())).add(sjcl.ecc.curves.k256.b),sjcl.ecc.curves.k256.field.modulus);
var y = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(y_even_QMARK_,fluree.crypto.elliptic2.bn_even_QMARK_(y_candidate)))?y_candidate:modulus.sub(y_candidate));
return ({"x": (function (){var G__22912 = x.toBits();
return sjcl.codec.bytes.fromBits(G__22912);
})(), "y": (function (){var G__22913 = y.toBits();
return sjcl.codec.bytes.fromBits(G__22913);
})()});
});
/**
 * Key as bytes
 */
fluree.crypto.elliptic2.x962_hex_compressed_decode = (function fluree$crypto$elliptic2$x962_hex_compressed_decode(key_hex){
var x = (new sjcl.bn(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(key_hex,(2))));
var y_even = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(key_hex,(0),(2)),"02");
return fluree.crypto.elliptic2.compute_point(y_even,x);
});
fluree.crypto.elliptic2.x962_hex_uncompressed_decode = (function fluree$crypto$elliptic2$x962_hex_uncompressed_decode(encoded_key){
var l = (sjcl.ecc.curves.k256.r.bitLength() / (4));
var x = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(encoded_key,(2),((2) + l));
var y = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(encoded_key,((2) + l));
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$x,x,cljs.core.cst$kw$y,y], null);
});
/**
 * Decode a X9.62 encoded public key provided in bytes
 */
fluree.crypto.elliptic2.x962_decode = (function fluree$crypto$elliptic2$x962_decode(key_ba){
var key_hex = alphabase.core.bytes__GT_hex(key_ba);
var l = (sjcl.ecc.curves.k256.r.bitLength() / (4));
if(cljs.core.truth_((function (){var and__4120__auto__ = (function (){var G__22917 = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(key_hex,(0),(2));
var fexpr__22916 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["03",null,"02",null], null), null);
return (fexpr__22916.cljs$core$IFn$_invoke$arity$1 ? fexpr__22916.cljs$core$IFn$_invoke$arity$1(G__22917) : fexpr__22916.call(null,G__22917));
})();
if(cljs.core.truth_(and__4120__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(((2) + l),cljs.core.count(key_hex));
} else {
return and__4120__auto__;
}
})())){
return fluree.crypto.elliptic2.x962_hex_compressed_decode(key_hex);
} else {
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("04",cljs.core.subs.cljs$core$IFn$_invoke$arity$3(key_hex,(0),(2)))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(((2) + ((2) * l)),cljs.core.count(key_hex))))){
return fluree.crypto.elliptic2.x962_hex_uncompressed_decode(key_hex);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Invalid encoding on public key",new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$encoded_DASH_key,key_hex], null));

}
}
});
/**
 * Returns internal representation of keypair
 */
fluree.crypto.elliptic2.generate_key_pair_STAR_ = (function fluree$crypto$elliptic2$generate_key_pair_STAR_(){
return sjcl.ecc.ecdsa.generateKeys.call(null,sjcl.ecc.curves.k256);
});
/**
 * Encodes a key pair in specified format.
 */
fluree.crypto.elliptic2.encode_key_pair = (function fluree$crypto$elliptic2$encode_key_pair(pair){
var sec = pair.sec.get();
var pub = pair.pub.get();
var x962_encoded = fluree.crypto.elliptic2.x962_encode.cljs$core$IFn$_invoke$arity$1(pub);
return ({"private": sjcl.codec.bytes.fromBits(sec), "public": x962_encoded});
});
/**
 * Returns private key as byte array from key pair.
 */
fluree.crypto.elliptic2.private$ = (function fluree$crypto$elliptic2$private(pair){
var G__22918 = pair.sec.get();
return sjcl.codec.bytes.fromBits(G__22918);
});
/**
 * Returns public key as byte array using X9.62 compression.
 */
fluree.crypto.elliptic2.public$ = (function fluree$crypto$elliptic2$public(pair){
return fluree.crypto.elliptic2.x962_encode.cljs$core$IFn$_invoke$arity$1(pair.pub.get());
});
/**
 * Generate a new key pair, returns encoded values.
 */
fluree.crypto.elliptic2.generate_address_pair = (function fluree$crypto$elliptic2$generate_address_pair(){
var pair = fluree.crypto.elliptic2.generate_key_pair_STAR_();
return fluree.crypto.elliptic2.encode_key_pair(pair);
});
fluree.crypto.elliptic2.sign = (function fluree$crypto$elliptic2$sign(pair,message){
var hash = sjcl.hash.sha256.hash(message);
return pair.sec.sign(hash);
});
fluree.crypto.elliptic2.verify = (function fluree$crypto$elliptic2$verify(pair,message,sig){
var hash = sjcl.hash.sha256.hash(message);
return pair.pub.verify(hash,sig);
});
fluree.crypto.elliptic2.generate_key_pair_from_private = (function fluree$crypto$elliptic2$generate_key_pair_from_private(var_args){
var G__22920 = arguments.length;
switch (G__22920) {
case 1:
return fluree.crypto.elliptic2.generate_key_pair_from_private.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return fluree.crypto.elliptic2.generate_key_pair_from_private.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

fluree.crypto.elliptic2.generate_key_pair_from_private.cljs$core$IFn$_invoke$arity$1 = (function (private$){
return fluree.crypto.elliptic2.generate_key_pair_from_private.cljs$core$IFn$_invoke$arity$2(private$,cljs.core.cst$kw$hex);
});

fluree.crypto.elliptic2.generate_key_pair_from_private.cljs$core$IFn$_invoke$arity$2 = (function (private_key,format){
var private_bits = fluree.crypto.elliptic2.to_bitArray(private_key,format);
var private_bn = sjcl.bn.fromBits(private_bits);
return sjcl.ecc.ecdsa.generateKeys.call(null,sjcl.ecc.curves.k256,(6),private_bn);
});

fluree.crypto.elliptic2.generate_key_pair_from_private.cljs$lang$maxFixedArity = 2;


//# sourceMappingURL=elliptic2.js.map?rel=1564157888744
