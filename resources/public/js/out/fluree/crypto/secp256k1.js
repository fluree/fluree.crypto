// Compiled by ClojureScript 1.10.520 {:static-fns false, :optimize-constants false}
goog.provide('fluree.crypto.secp256k1');
goog.require('cljs.core');
goog.require('alphabase.core');
goog.require('fluree.crypto.hmac');
goog.require('fluree.crypto.sha2');
goog.require('fluree.crypto.ripemd');
goog.require('fluree.crypto.encodings');
goog.require('fluree.crypto.asn1');
goog.require('sjcl.ecc');
goog.require('sjcl.bn');
goog.require('sjcl.codec.hex');
goog.require('sjcl.codec.bytes');
if((typeof fluree !== 'undefined') && (typeof fluree.crypto !== 'undefined') && (typeof fluree.crypto.secp256k1 !== 'undefined') && (typeof fluree.crypto.secp256k1.secp256k1 !== 'undefined')){
} else {
fluree.crypto.secp256k1.secp256k1 = sjcl.ecc.curves.k256;
}
/**
 * Returns true if private key, as big number/integer, is valid.
 *   Private key must be >= 1 and <= curve modulus.
 */
fluree.crypto.secp256k1.valid_private_QMARK_ = (function fluree$crypto$secp256k1$valid_private_QMARK_(private$){
var and__4120__auto__ = private$.greaterEquals((1));
if(cljs.core.truth_(and__4120__auto__)){
return fluree.crypto.secp256k1.secp256k1.r.greaterEquals(private$);
} else {
return and__4120__auto__;
}
});
/**
 * Takes internal representation of a public key and returns X9.62 compressed encoded
 * public key, hex encoded.
 */
fluree.crypto.secp256k1.format_public_key = (function fluree$crypto$secp256k1$format_public_key(public$){
var x = fluree.crypto.encodings.pad_hex.call(null,public$.x.toString().replace(/^0x/,""));
var y = fluree.crypto.encodings.pad_hex.call(null,public$.y.toString().replace(/^0x/,""));
return fluree.crypto.encodings.x962_encode.call(null,x,y);
});
/**
 * Takes internal representation of a key-pair and returns X9.62 compressed encoded
 *   public key and private key as a map, with each value hex encoded.
 */
fluree.crypto.secp256k1.format_key_pair = (function fluree$crypto$secp256k1$format_key_pair(pair){
var private$ = pair.private;
var public$ = pair.public;
var x = fluree.crypto.encodings.pad_hex.call(null,public$.x.toString().replace(/^0x/,""));
var y = fluree.crypto.encodings.pad_hex.call(null,public$.y.toString().replace(/^0x/,""));
var pair_hex = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),fluree.crypto.encodings.biginteger__GT_hex.call(null,private$),new cljs.core.Keyword(null,"public","public",1566243851),fluree.crypto.encodings.x962_encode.call(null,x,y)], null);
return cljs.core.clj__GT_js.call(null,pair_hex);
});
fluree.crypto.secp256k1.public_key_from_private = (function fluree$crypto$secp256k1$public_key_from_private(private$){
var private_bn = (new sjcl.bn()).initWith(private$);
if(cljs.core.truth_(fluree.crypto.secp256k1.valid_private_QMARK_.call(null,private_bn))){
} else {
throw cljs.core.ex_info.call(null,"Invalid private key. Must be big integer and >= 1, <= curve modulus.",cljs.core.PersistentArrayMap.EMPTY);
}

return ({"private": private_bn, "public": fluree.crypto.secp256k1.secp256k1.G.mult(private_bn)});
});
/**
 * Generate a SIN from a public key
 */
fluree.crypto.secp256k1.get_sin_from_public_key = (function fluree$crypto$secp256k1$get_sin_from_public_key(var_args){
var args__4736__auto__ = [];
var len__4730__auto___21094 = arguments.length;
var i__4731__auto___21095 = (0);
while(true){
if((i__4731__auto___21095 < len__4730__auto___21094)){
args__4736__auto__.push((arguments[i__4731__auto___21095]));

var G__21096 = (i__4731__auto___21095 + (1));
i__4731__auto___21095 = G__21096;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((1) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((1)),(0),null)):null);
return fluree.crypto.secp256k1.get_sin_from_public_key.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4737__auto__);
});

fluree.crypto.secp256k1.get_sin_from_public_key.cljs$core$IFn$_invoke$arity$variadic = (function (pub_key,p__21091){
var map__21092 = p__21091;
var map__21092__$1 = (((((!((map__21092 == null))))?(((((map__21092.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__21092.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21092):map__21092);
var output_format = cljs.core.get.call(null,map__21092__$1,new cljs.core.Keyword(null,"output-format","output-format",-1826382676),new cljs.core.Keyword(null,"base58","base58",1785479990));
var pub_prefixed = cljs.core.clj__GT_js.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(15),(2)], null),fluree.crypto.ripemd.ripemd_160.call(null,fluree.crypto.sha2.sha2_256.call(null,alphabase.core.hex__GT_bytes.call(null,pub_key)))));
var checksum = cljs.core.clj__GT_js.call(null,((function (pub_prefixed,map__21092,map__21092__$1,output_format){
return (function (p1__21088_SHARP_){
return cljs.core.take.call(null,(4),p1__21088_SHARP_);
});})(pub_prefixed,map__21092,map__21092__$1,output_format))
.call(null,fluree.crypto.sha2.sha2_256.call(null,fluree.crypto.sha2.sha2_256.call(null,pub_prefixed))));
return alphabase.core.bytes__GT_base58.call(null,cljs.core.clj__GT_js.call(null,cljs.core.concat.call(null,pub_prefixed,checksum)));
});

fluree.crypto.secp256k1.get_sin_from_public_key.cljs$lang$maxFixedArity = (1);

/** @this {Function} */
fluree.crypto.secp256k1.get_sin_from_public_key.cljs$lang$applyTo = (function (seq21089){
var G__21090 = cljs.core.first.call(null,seq21089);
var seq21089__$1 = cljs.core.next.call(null,seq21089);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21090,seq21089__$1);
});

/**
 * Generates an internal representation of key pair from a secure random seed or provided private key.
 *   Returns map/object with two keys:
 * - private  - a big number/integer
 * - public - a curve point
 * 
 * If a private key is provided, must be in either hex string or BigInteger (clj) bignumber (cljs).
 */
fluree.crypto.secp256k1.generate_key_pair_STAR_ = (function fluree$crypto$secp256k1$generate_key_pair_STAR_(var_args){
var G__21098 = arguments.length;
switch (G__21098) {
case 0:
return fluree.crypto.secp256k1.generate_key_pair_STAR_.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return fluree.crypto.secp256k1.generate_key_pair_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

fluree.crypto.secp256k1.generate_key_pair_STAR_.cljs$core$IFn$_invoke$arity$0 = (function (){
var private$ = sjcl.bn.fromBits(sjcl.ecc.ecdsa.generateKeys.call(null,fluree.crypto.secp256k1.secp256k1).sec.get());
return fluree.crypto.secp256k1.generate_key_pair_STAR_.call(null,private$);
});

fluree.crypto.secp256k1.generate_key_pair_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (private$){
return fluree.crypto.secp256k1.public_key_from_private.call(null,private$);
});

fluree.crypto.secp256k1.generate_key_pair_STAR_.cljs$lang$maxFixedArity = 1;

/**
 * Returns key pair in hex format using X9.62 compressed encoding for public key.
 */
fluree.crypto.secp256k1.generate_key_pair = (function fluree$crypto$secp256k1$generate_key_pair(var_args){
var G__21101 = arguments.length;
switch (G__21101) {
case 0:
return fluree.crypto.secp256k1.generate_key_pair.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return fluree.crypto.secp256k1.generate_key_pair.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});
goog.exportSymbol('fluree.crypto.secp256k1.generate_key_pair', fluree.crypto.secp256k1.generate_key_pair);

fluree.crypto.secp256k1.generate_key_pair.cljs$core$IFn$_invoke$arity$0 = (function (){
return fluree.crypto.secp256k1.format_key_pair.call(null,fluree.crypto.secp256k1.generate_key_pair_STAR_.call(null));
});

fluree.crypto.secp256k1.generate_key_pair.cljs$core$IFn$_invoke$arity$1 = (function (private$){
return fluree.crypto.secp256k1.format_key_pair.call(null,fluree.crypto.secp256k1.generate_key_pair_STAR_.call(null,private$));
});

fluree.crypto.secp256k1.generate_key_pair.cljs$lang$maxFixedArity = 1;

/**
 * Deterministically generate a random number in accordance with RFC 6979.
 *   Provided hash should have 256 bits to align with secp256k1 curve.
 */
fluree.crypto.secp256k1.deterministic_generate_k = (function fluree$crypto$secp256k1$deterministic_generate_k(hash_ba,priv_key,curve){
var l = curve.r.bitLength();
var curve_bytes = (l / (8));
var v = cljs.core.repeat.call(null,curve_bytes,(1));
var k = cljs.core.repeat.call(null,curve_bytes,(0));
var pk = fluree.crypto.encodings.biginteger__GT_bytes.call(null,priv_key);
var left_padding = cljs.core.repeat.call(null,(curve_bytes - cljs.core.count.call(null,hash_ba)),(0));
var hash = cljs.core.concat.call(null,left_padding,hash_ba);
var k__$1 = fluree.crypto.hmac.hmac_sha256.call(null,cljs.core.concat.call(null,v,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0)], null),pk,hash),k);
var v__$1 = fluree.crypto.hmac.hmac_sha256.call(null,v,k__$1);
var k__$2 = fluree.crypto.hmac.hmac_sha256.call(null,cljs.core.concat.call(null,v__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1)], null),pk,hash),k__$1);
var v__$2 = fluree.crypto.hmac.hmac_sha256.call(null,v__$1,k__$2);
if(cljs.core._EQ_.call(null,cljs.core.count.call(null,hash),curve_bytes)){
} else {
throw (new Error(["Assert failed: ","Hash should have the same number of bytes as the curve modulus","\n","(= (count hash) curve-bytes)"].join('')));
}

return fluree.crypto.encodings.bytes__GT_biginteger.call(null,fluree.crypto.hmac.hmac_sha256.call(null,v__$2,k__$2));
});
/**
 * Compute a recovery byte for a compressed ECDSA signature given R and S parameters.
 *   Returns value as byte integer.
 */
fluree.crypto.secp256k1.compute_recovery_byte = (function fluree$crypto$secp256k1$compute_recovery_byte(kp,r,s){
var n = fluree.crypto.secp256k1.secp256k1.r;
var big_r_QMARK_ = r.greaterEquals(n);
var big_s_QMARK_ = s.add(s).greaterEquals(n);
var y_odd_QMARK_ = (!(fluree.crypto.encodings.bn_even_QMARK_.call(null,kp.y)));
return (((27) + ((cljs.core.not_EQ_.call(null,big_s_QMARK_,y_odd_QMARK_))?(1):(0))) + (cljs.core.truth_(big_r_QMARK_)?(2):(0)));
});
fluree.crypto.secp256k1.sign_hash = (function fluree$crypto$secp256k1$sign_hash(hash_ba,private_bn,recovery_byte_QMARK_){
var rng = fluree.crypto.secp256k1.deterministic_generate_k.call(null,hash_ba,private_bn,fluree.crypto.secp256k1.secp256k1);
var n = fluree.crypto.secp256k1.secp256k1.r;
var z = sjcl.bn.fromBits(sjcl.codec.bytes.toBits(hash_ba));
var l = n.bitLength();
var _ = ((cljs.core._EQ_.call(null,cljs.core.count.call(null,hash_ba),(l / (8))))?null:(function(){throw (new Error(["Assert failed: ","Hash should have the same number of bytes as the curve modulus","\n","(= (count hash-ba) (/ l 8))"].join('')))})());
var vec__21103 = (function (){var k = rng;
var kp = fluree.crypto.secp256k1.secp256k1.G.mult(k);
var r = kp.x.mod(n);
var s_ = r.mul(private_bn).add(z).mul(k.inverseMod(n)).mod(n);
var s = (cljs.core.truth_(s_.add(s_).greaterEquals(n))?n.sub(s_):s_);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [r,s,s_,kp], null);
})();
var r = cljs.core.nth.call(null,vec__21103,(0),null);
var s = cljs.core.nth.call(null,vec__21103,(1),null);
var s_ = cljs.core.nth.call(null,vec__21103,(2),null);
var kp = cljs.core.nth.call(null,vec__21103,(3),null);
var recovery_byte = (cljs.core.truth_(recovery_byte_QMARK_)?fluree.crypto.secp256k1.compute_recovery_byte.call(null,kp,r,s_):null);
return alphabase.core.bytes__GT_hex.call(null,fluree.crypto.encodings.DER_encode_ECDSA_signature.call(null,r,s,recovery_byte,fluree.crypto.secp256k1.secp256k1));
});
goog.exportSymbol('fluree.crypto.secp256k1.sign_hash', fluree.crypto.secp256k1.sign_hash);
/**
 * Sign some message with provided private key.
 *   Message must be a byte-array or string.
 *   Private key must be hex-encoded or a BigInteger(clj)/bignumber(cljs).
 */
fluree.crypto.secp256k1.sign = (function fluree$crypto$secp256k1$sign(message,private_key){
var msg_ba = ((typeof message === 'string')?alphabase.core.string__GT_bytes.call(null,message):message);
var private_bn = ((typeof private_key === 'string')?fluree.crypto.encodings.hex__GT_biginteger.call(null,private_key):private_key);
var hash = fluree.crypto.sha2.sha2_256.call(null,msg_ba);
return fluree.crypto.secp256k1.sign_hash.call(null,hash,private_bn,true);
});
goog.exportSymbol('fluree.crypto.secp256k1.sign', fluree.crypto.secp256k1.sign);
/**
 * Given the components of a signature and a recovery value,
 *   recover and return the public key that generated the
 *   signature according to the algorithm in SEC1v2 section 4.1.6
 * 
 *   recovery-byte should be an integer byte.
 */
fluree.crypto.secp256k1.ecrecover = (function fluree$crypto$secp256k1$ecrecover(hash,recovery_byte,r,s){
if(((typeof recovery_byte === 'number') && (((27) <= recovery_byte)) && ((recovery_byte <= (30))))){
} else {
throw (new Error(["Assert failed: ",["Recovery byte should be between 0x1B and 0x1E. Provided: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(recovery_byte.toString((16)))].join(''),"\n","(and (number? recovery-byte) (<= 27 recovery-byte) (<= recovery-byte 30))"].join('')));
}

var l = (fluree.crypto.secp256k1.secp256k1.r.bitLength() / (8));
var _ = ((cljs.core._EQ_.call(null,l,cljs.core.count.call(null,hash)))?null:(function(){throw (new Error(["Assert failed: ",["Hash should have ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(l)," bytes, but had ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count.call(null,hash)),"."].join(''),"\n","(= l (count hash))"].join('')))})());
var y_even_QMARK_ = cljs.core.even_QMARK_.call(null,(recovery_byte - (27)));
var is_second_key_QMARK_ = cljs.core.odd_QMARK_.call(null,((recovery_byte - (27)) >> (1)));
var n = fluree.crypto.secp256k1.secp256k1.r;
var point = fluree.crypto.encodings.compute_point.call(null,y_even_QMARK_,((is_second_key_QMARK_)?r.add(n):r),fluree.crypto.secp256k1.secp256k1);
var R = point;
var r_inv = r.inverseMod(n);
var hash_bi = fluree.crypto.encodings.bytes__GT_biginteger.call(null,hash);
var e_inv = n.sub(hash_bi);
var g_point = (new sjcl.ecc.point(fluree.crypto.secp256k1.secp256k1,fluree.crypto.secp256k1.secp256k1.G.x,fluree.crypto.secp256k1.secp256k1.G.y));
var r_point = (new sjcl.ecc.point(fluree.crypto.secp256k1.secp256k1,R.x,R.y));
var sumOTM = r_point.mult2(s,e_inv,g_point);
var sumPoint = (new sjcl.ecc.point(fluree.crypto.secp256k1.secp256k1,sumOTM.x,sumOTM.y));
return fluree.crypto.secp256k1.format_public_key.call(null,sumPoint.mult(r_inv));
});
/**
 * Recover a public key from a hash byte-array and signature (hex).
 */
fluree.crypto.secp256k1.recover_public_key_from_hash = (function fluree$crypto$secp256k1$recover_public_key_from_hash(hash,signature){
var map__21106 = fluree.crypto.encodings.DER_decode_ECDSA_signature.call(null,signature);
var map__21106__$1 = (((((!((map__21106 == null))))?(((((map__21106.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__21106.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21106):map__21106);
var recover = cljs.core.get.call(null,map__21106__$1,new cljs.core.Keyword(null,"recover","recover",849894427));
var R = cljs.core.get.call(null,map__21106__$1,new cljs.core.Keyword(null,"R","R",-936662523));
var S = cljs.core.get.call(null,map__21106__$1,new cljs.core.Keyword(null,"S","S",1267293308));
var recover__$1 = (recover | (0));
var recovered = fluree.crypto.secp256k1.ecrecover.call(null,hash,recover__$1,R,S);
return recovered;
});
/**
 * Recover a public key from original message and signature (hex) of the
 *   message's sha2-256 hash.
 */
fluree.crypto.secp256k1.recover_public_key = (function fluree$crypto$secp256k1$recover_public_key(input,signature){
var hash = fluree.crypto.sha2.sha2_256.call(null,alphabase.core.string__GT_bytes.call(null,input));
return fluree.crypto.secp256k1.recover_public_key_from_hash.call(null,hash,signature);
});
fluree.crypto.secp256k1.verify_signature_from_hash = (function fluree$crypto$secp256k1$verify_signature_from_hash(key,hash,signature){
var head1 = cljs.core.subs.call(null,signature,(0),(2));
var head2 = cljs.core.subs.call(null,signature,(2),(4));
if(cljs.core.truth_((function (){var and__4120__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, ["1c",null,"1b",null,"1e",null,"1d",null], null), null).call(null,head1);
if(cljs.core.truth_(and__4120__auto__)){
return cljs.core._EQ_.call(null,"30",head2);
} else {
return and__4120__auto__;
}
})())){
return cljs.core._EQ_.call(null,key,fluree.crypto.secp256k1.recover_public_key_from_hash.call(null,hash,signature));
} else {
throw cljs.core.ex_info.call(null,"Unknown signature header",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"hash","hash",-13781596),hash,new cljs.core.Keyword(null,"signature","signature",1463754794),signature], null));

}
});
/**
 * Verifies a message given a signature (in hex).
 *   Assumes signature is DER-encoded with a recovery byte.
 */
fluree.crypto.secp256k1.verify = (function fluree$crypto$secp256k1$verify(pub_key,message,signature){
var hash = fluree.crypto.sha2.sha2_256.call(null,alphabase.core.string__GT_bytes.call(null,message));
return fluree.crypto.secp256k1.verify_signature_from_hash.call(null,pub_key,hash,signature);
});
goog.exportSymbol('fluree.crypto.secp256k1.verify', fluree.crypto.secp256k1.verify);

//# sourceMappingURL=secp256k1.js.map?rel=1567785970963
