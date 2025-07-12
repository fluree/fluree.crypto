// Compiled by ClojureScript 1.10.520 {:static-fns false, :optimize-constants false}
goog.provide('fluree.crypto');
goog.require('cljs.core');
goog.require('fluree.crypto.sha2');
goog.require('fluree.crypto.sha3');
goog.require('fluree.crypto.aes');
goog.require('fluree.crypto.scrypt');
goog.require('fluree.crypto.ripemd');
goog.require('fluree.crypto.secp256k1');
goog.require('goog.crypt');
goog.require('alphabase.core');
/**
 * Normalizes string for consistent hashing.
 */
fluree.crypto.normalize_string = (function fluree$crypto$normalize_string(s){
return s.normalize("NFKC");
});
goog.exportSymbol('fluree.crypto.normalize_string', fluree.crypto.normalize_string);
/**
 * Does simple check when input format not specified.
 *   Assumes either string or bytes
 */
fluree.crypto.coerce_input_format = (function fluree$crypto$coerce_input_format(x){
if(typeof x === 'string'){
return new cljs.core.Keyword(null,"string","string",-1989541586);
} else {
return new cljs.core.Keyword(null,"bytes","bytes",1175866680);
}
});
/**
 * Normalizes string then converts to a byte-array.
 *   If value is already a byte-array, returns original value.
 */
fluree.crypto.string__GT_byte_array = (function fluree$crypto$string__GT_byte_array(s){
return alphabase.core.string__GT_bytes.call(null,fluree.crypto.normalize_string.call(null,s));
});
goog.exportSymbol('fluree.crypto.string__GT_byte_array', fluree.crypto.string__GT_byte_array);
fluree.crypto.byte_array__GT_string = (function fluree$crypto$byte_array__GT_string(s){
return alphabase.core.bytes__GT_string.call(null,s);
});
goog.exportSymbol('fluree.crypto.byte_array__GT_string', fluree.crypto.byte_array__GT_string);
fluree.crypto.sha2_256 = (function fluree$crypto$sha2_256(var_args){
var G__34789 = arguments.length;
switch (G__34789) {
case 1:
return fluree.crypto.sha2_256.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return fluree.crypto.sha2_256.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return fluree.crypto.sha2_256.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});
goog.exportSymbol('fluree.crypto.sha2_256', fluree.crypto.sha2_256);

fluree.crypto.sha2_256.cljs$core$IFn$_invoke$arity$1 = (function (x){
return fluree.crypto.sha2_256.call(null,x,new cljs.core.Keyword(null,"hex","hex",41691346));
});

fluree.crypto.sha2_256.cljs$core$IFn$_invoke$arity$2 = (function (x,output_format){
return fluree.crypto.sha2_256.call(null,x,output_format,fluree.crypto.coerce_input_format.call(null,x));
});

fluree.crypto.sha2_256.cljs$core$IFn$_invoke$arity$3 = (function (x,output_format,input_format){
return alphabase.core.byte_array_to_base.call(null,fluree.crypto.sha2.sha2_256.call(null,alphabase.core.base_to_byte_array.call(null,x,input_format)),cljs.core.keyword.call(null,output_format));
});

fluree.crypto.sha2_256.cljs$lang$maxFixedArity = 3;

/**
 * sha2-256 hash of provided string after normalizing string.
 */
fluree.crypto.sha2_256_normalize = (function fluree$crypto$sha2_256_normalize(var_args){
var G__34792 = arguments.length;
switch (G__34792) {
case 1:
return fluree.crypto.sha2_256_normalize.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return fluree.crypto.sha2_256_normalize.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});
goog.exportSymbol('fluree.crypto.sha2_256_normalize', fluree.crypto.sha2_256_normalize);

fluree.crypto.sha2_256_normalize.cljs$core$IFn$_invoke$arity$1 = (function (s){
return fluree.crypto.sha2_256_normalize.call(null,s,new cljs.core.Keyword(null,"hex","hex",41691346));
});

fluree.crypto.sha2_256_normalize.cljs$core$IFn$_invoke$arity$2 = (function (s,output_format){
return fluree.crypto.sha2_256.call(null,fluree.crypto.normalize_string.call(null,s),output_format,new cljs.core.Keyword(null,"string","string",-1989541586));
});

fluree.crypto.sha2_256_normalize.cljs$lang$maxFixedArity = 2;

fluree.crypto.sha2_512 = (function fluree$crypto$sha2_512(var_args){
var G__34795 = arguments.length;
switch (G__34795) {
case 1:
return fluree.crypto.sha2_512.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return fluree.crypto.sha2_512.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return fluree.crypto.sha2_512.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});
goog.exportSymbol('fluree.crypto.sha2_512', fluree.crypto.sha2_512);

fluree.crypto.sha2_512.cljs$core$IFn$_invoke$arity$1 = (function (x){
return fluree.crypto.sha2_512.call(null,x,new cljs.core.Keyword(null,"hex","hex",41691346));
});

fluree.crypto.sha2_512.cljs$core$IFn$_invoke$arity$2 = (function (x,output_format){
return fluree.crypto.sha2_512.call(null,x,output_format,fluree.crypto.coerce_input_format.call(null,x));
});

fluree.crypto.sha2_512.cljs$core$IFn$_invoke$arity$3 = (function (x,output_format,input_format){
return alphabase.core.byte_array_to_base.call(null,fluree.crypto.sha2.sha2_512.call(null,alphabase.core.base_to_byte_array.call(null,x,input_format)),cljs.core.keyword.call(null,output_format));
});

fluree.crypto.sha2_512.cljs$lang$maxFixedArity = 3;

/**
 * sha2-512 hash of provided string after normalizing string.
 */
fluree.crypto.sha2_512_normalize = (function fluree$crypto$sha2_512_normalize(var_args){
var G__34798 = arguments.length;
switch (G__34798) {
case 1:
return fluree.crypto.sha2_512_normalize.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return fluree.crypto.sha2_512_normalize.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});
goog.exportSymbol('fluree.crypto.sha2_512_normalize', fluree.crypto.sha2_512_normalize);

fluree.crypto.sha2_512_normalize.cljs$core$IFn$_invoke$arity$1 = (function (s){
return fluree.crypto.sha2_512_normalize.call(null,s,new cljs.core.Keyword(null,"hex","hex",41691346));
});

fluree.crypto.sha2_512_normalize.cljs$core$IFn$_invoke$arity$2 = (function (s,output_format){
return fluree.crypto.sha2_512.call(null,fluree.crypto.normalize_string.call(null,s),output_format,new cljs.core.Keyword(null,"string","string",-1989541586));
});

fluree.crypto.sha2_512_normalize.cljs$lang$maxFixedArity = 2;

fluree.crypto.sha3_256 = (function fluree$crypto$sha3_256(var_args){
var G__34801 = arguments.length;
switch (G__34801) {
case 1:
return fluree.crypto.sha3_256.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return fluree.crypto.sha3_256.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return fluree.crypto.sha3_256.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});
goog.exportSymbol('fluree.crypto.sha3_256', fluree.crypto.sha3_256);

fluree.crypto.sha3_256.cljs$core$IFn$_invoke$arity$1 = (function (x){
return fluree.crypto.sha3_256.call(null,x,new cljs.core.Keyword(null,"hex","hex",41691346));
});

fluree.crypto.sha3_256.cljs$core$IFn$_invoke$arity$2 = (function (x,output_format){
return fluree.crypto.sha3_256.call(null,x,output_format,fluree.crypto.coerce_input_format.call(null,x));
});

fluree.crypto.sha3_256.cljs$core$IFn$_invoke$arity$3 = (function (x,output_format,input_format){
return alphabase.core.byte_array_to_base.call(null,fluree.crypto.sha3.sha3_256.call(null,x),cljs.core.keyword.call(null,output_format));
});

fluree.crypto.sha3_256.cljs$lang$maxFixedArity = 3;

/**
 * sha3-256 hash of provided string after normalizing string.
 */
fluree.crypto.sha3_256_normalize = (function fluree$crypto$sha3_256_normalize(var_args){
var G__34804 = arguments.length;
switch (G__34804) {
case 1:
return fluree.crypto.sha3_256_normalize.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return fluree.crypto.sha3_256_normalize.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});
goog.exportSymbol('fluree.crypto.sha3_256_normalize', fluree.crypto.sha3_256_normalize);

fluree.crypto.sha3_256_normalize.cljs$core$IFn$_invoke$arity$1 = (function (s){
return fluree.crypto.sha3_256_normalize.call(null,s,new cljs.core.Keyword(null,"hex","hex",41691346));
});

fluree.crypto.sha3_256_normalize.cljs$core$IFn$_invoke$arity$2 = (function (s,output_format){
return fluree.crypto.sha3_256.call(null,fluree.crypto.normalize_string.call(null,s),output_format,new cljs.core.Keyword(null,"string","string",-1989541586));
});

fluree.crypto.sha3_256_normalize.cljs$lang$maxFixedArity = 2;

fluree.crypto.sha3_512 = (function fluree$crypto$sha3_512(var_args){
var G__34807 = arguments.length;
switch (G__34807) {
case 1:
return fluree.crypto.sha3_512.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return fluree.crypto.sha3_512.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return fluree.crypto.sha3_512.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});
goog.exportSymbol('fluree.crypto.sha3_512', fluree.crypto.sha3_512);

fluree.crypto.sha3_512.cljs$core$IFn$_invoke$arity$1 = (function (x){
return fluree.crypto.sha3_512.call(null,x,new cljs.core.Keyword(null,"hex","hex",41691346));
});

fluree.crypto.sha3_512.cljs$core$IFn$_invoke$arity$2 = (function (x,output_format){
return fluree.crypto.sha3_512.call(null,x,output_format,fluree.crypto.coerce_input_format.call(null,x));
});

fluree.crypto.sha3_512.cljs$core$IFn$_invoke$arity$3 = (function (x,output_format,input_format){
return alphabase.core.byte_array_to_base.call(null,fluree.crypto.sha3.sha3_512.call(null,alphabase.core.base_to_byte_array.call(null,x,input_format)),cljs.core.keyword.call(null,output_format));
});

fluree.crypto.sha3_512.cljs$lang$maxFixedArity = 3;

/**
 * sha3-512 hash of provided string after normalizing string.
 */
fluree.crypto.sha3_512_normalize = (function fluree$crypto$sha3_512_normalize(var_args){
var G__34810 = arguments.length;
switch (G__34810) {
case 1:
return fluree.crypto.sha3_512_normalize.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return fluree.crypto.sha3_512_normalize.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});
goog.exportSymbol('fluree.crypto.sha3_512_normalize', fluree.crypto.sha3_512_normalize);

fluree.crypto.sha3_512_normalize.cljs$core$IFn$_invoke$arity$1 = (function (s){
return fluree.crypto.sha3_512_normalize.call(null,s,new cljs.core.Keyword(null,"hex","hex",41691346));
});

fluree.crypto.sha3_512_normalize.cljs$core$IFn$_invoke$arity$2 = (function (s,output_format){
return fluree.crypto.sha3_512.call(null,fluree.crypto.normalize_string.call(null,s),output_format,new cljs.core.Keyword(null,"string","string",-1989541586));
});

fluree.crypto.sha3_512_normalize.cljs$lang$maxFixedArity = 2;

fluree.crypto.ripemd_160 = (function fluree$crypto$ripemd_160(var_args){
var G__34813 = arguments.length;
switch (G__34813) {
case 1:
return fluree.crypto.ripemd_160.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return fluree.crypto.ripemd_160.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return fluree.crypto.ripemd_160.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});
goog.exportSymbol('fluree.crypto.ripemd_160', fluree.crypto.ripemd_160);

fluree.crypto.ripemd_160.cljs$core$IFn$_invoke$arity$1 = (function (x){
return fluree.crypto.ripemd_160.call(null,x,new cljs.core.Keyword(null,"hex","hex",41691346));
});

fluree.crypto.ripemd_160.cljs$core$IFn$_invoke$arity$2 = (function (x,output_format){
return fluree.crypto.ripemd_160.call(null,x,output_format,fluree.crypto.coerce_input_format.call(null,x));
});

fluree.crypto.ripemd_160.cljs$core$IFn$_invoke$arity$3 = (function (x,output_format,input_format){
return alphabase.core.byte_array_to_base.call(null,fluree.crypto.ripemd.ripemd_160.call(null,alphabase.core.base_to_byte_array.call(null,x,input_format)),cljs.core.keyword.call(null,output_format));
});

fluree.crypto.ripemd_160.cljs$lang$maxFixedArity = 3;

fluree.crypto.aes_encrypt = (function fluree$crypto$aes_encrypt(var_args){
var G__34816 = arguments.length;
switch (G__34816) {
case 3:
return fluree.crypto.aes_encrypt.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return fluree.crypto.aes_encrypt.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});
goog.exportSymbol('fluree.crypto.aes_encrypt', fluree.crypto.aes_encrypt);

fluree.crypto.aes_encrypt.cljs$core$IFn$_invoke$arity$3 = (function (x,iv,key){
return fluree.crypto.aes_encrypt.call(null,x,iv,key,new cljs.core.Keyword(null,"hex","hex",41691346));
});

fluree.crypto.aes_encrypt.cljs$core$IFn$_invoke$arity$4 = (function (x,iv,key,output_format){
return fluree.crypto.aes.encrypt.call(null,x,key,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"output-format","output-format",-1826382676),output_format,new cljs.core.Keyword(null,"iv","iv",-1550102132),iv], null));
});

fluree.crypto.aes_encrypt.cljs$lang$maxFixedArity = 4;

fluree.crypto.aes_decrypt = (function fluree$crypto$aes_decrypt(var_args){
var G__34819 = arguments.length;
switch (G__34819) {
case 3:
return fluree.crypto.aes_decrypt.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return fluree.crypto.aes_decrypt.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return fluree.crypto.aes_decrypt.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});
goog.exportSymbol('fluree.crypto.aes_decrypt', fluree.crypto.aes_decrypt);

fluree.crypto.aes_decrypt.cljs$core$IFn$_invoke$arity$3 = (function (x,iv,key){
return fluree.crypto.aes_decrypt.call(null,x,iv,key,new cljs.core.Keyword(null,"string","string",-1989541586),new cljs.core.Keyword(null,"hex","hex",41691346));
});

fluree.crypto.aes_decrypt.cljs$core$IFn$_invoke$arity$4 = (function (x,iv,key,output_format){
return fluree.crypto.aes_decrypt.call(null,x,iv,key,output_format,new cljs.core.Keyword(null,"hex","hex",41691346));
});

fluree.crypto.aes_decrypt.cljs$core$IFn$_invoke$arity$5 = (function (x,iv,key,output_format,input_format){
return fluree.crypto.aes.decrypt.call(null,x,key,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"iv","iv",-1550102132),iv,new cljs.core.Keyword(null,"input-format","input-format",-422703481),input_format,new cljs.core.Keyword(null,"output-format","output-format",-1826382676),output_format], null));
});

fluree.crypto.aes_decrypt.cljs$lang$maxFixedArity = 5;

fluree.crypto.generate_key_pair = (function fluree$crypto$generate_key_pair(var_args){
var G__34822 = arguments.length;
switch (G__34822) {
case 0:
return fluree.crypto.generate_key_pair.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return fluree.crypto.generate_key_pair.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});
goog.exportSymbol('fluree.crypto.generate_key_pair', fluree.crypto.generate_key_pair);

fluree.crypto.generate_key_pair.cljs$core$IFn$_invoke$arity$0 = (function (){
return fluree.crypto.secp256k1.generate_key_pair.call(null);
});

fluree.crypto.generate_key_pair.cljs$core$IFn$_invoke$arity$1 = (function (private$){
return fluree.crypto.secp256k1.generate_key_pair.call(null,private$);
});

fluree.crypto.generate_key_pair.cljs$lang$maxFixedArity = 1;

/**
 * Take a private key as either a hex string or BigInteger (clj) bignumber (cljs), returns as a hex string.
 */
fluree.crypto.pub_key_from_private = (function fluree$crypto$pub_key_from_private(private_key){
return fluree.crypto.secp256k1.format_key_pair.call(null,fluree.crypto.secp256k1.public_key_from_private.call(null,private_key)).public;
});
goog.exportSymbol('fluree.crypto.pub_key_from_private', fluree.crypto.pub_key_from_private);
fluree.crypto.account_id_from_private = (function fluree$crypto$account_id_from_private(private_key){
return fluree.crypto.secp256k1.get_sin_from_public_key.call(null,fluree.crypto.pub_key_from_private.call(null,private_key));
});
goog.exportSymbol('fluree.crypto.account_id_from_private', fluree.crypto.account_id_from_private);
fluree.crypto.account_id_from_public = (function fluree$crypto$account_id_from_public(public_key){
return fluree.crypto.secp256k1.get_sin_from_public_key.call(null,public_key);
});
goog.exportSymbol('fluree.crypto.account_id_from_public', fluree.crypto.account_id_from_public);
/**
 * Sign some message with provided private key.
 *   Message must be a byte-array or string.
 *   Private key must be hex-encoded or a BigInteger(clj)/bignumber(cljs).
 */
fluree.crypto.sign_message = (function fluree$crypto$sign_message(message,private_key){
return fluree.crypto.secp256k1.sign.call(null,message,private_key);
});
goog.exportSymbol('fluree.crypto.sign_message', fluree.crypto.sign_message);
/**
 * Verifies signature of message is valid.
 */
fluree.crypto.verify_signature = (function fluree$crypto$verify_signature(pub_key,message,signature){
return fluree.crypto.secp256k1.verify.call(null,pub_key,message,signature);
});
goog.exportSymbol('fluree.crypto.verify_signature', fluree.crypto.verify_signature);
/**
 * Returns public key, and verifies message is correctly signed.
 *   If not correctly signed, throws exception.
 */
fluree.crypto.pub_key_from_message = (function fluree$crypto$pub_key_from_message(message,signature){
return fluree.crypto.secp256k1.recover_public_key.call(null,message,signature);
});
goog.exportSymbol('fluree.crypto.pub_key_from_message', fluree.crypto.pub_key_from_message);
/**
 * Given a message and signature, returns the corresponding account id
 *   only if the signature is valid. If invalid, will throw exception.
 */
fluree.crypto.account_id_from_message = (function fluree$crypto$account_id_from_message(message,signature){
return fluree.crypto.account_id_from_public.call(null,fluree.crypto.pub_key_from_message.call(null,message,signature));
});
goog.exportSymbol('fluree.crypto.account_id_from_message', fluree.crypto.account_id_from_message);
/**
 * Encrypts a message (string) using a salt (bytes). Returns the encrypted message in hex.
 */
fluree.crypto.scrypt_encrypt = (function fluree$crypto$scrypt_encrypt(var_args){
var args__4736__auto__ = [];
var len__4730__auto___34826 = arguments.length;
var i__4731__auto___34827 = (0);
while(true){
if((i__4731__auto___34827 < len__4730__auto___34826)){
args__4736__auto__.push((arguments[i__4731__auto___34827]));

var G__34828 = (i__4731__auto___34827 + (1));
i__4731__auto___34827 = G__34828;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((1) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((1)),(0),null)):null);
return fluree.crypto.scrypt_encrypt.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4737__auto__);
});
goog.exportSymbol('fluree.crypto.scrypt_encrypt', fluree.crypto.scrypt_encrypt);

fluree.crypto.scrypt_encrypt.cljs$core$IFn$_invoke$arity$variadic = (function (message,args){
var byte_msg = fluree.crypto.string__GT_byte_array.call(null,message);
return alphabase.core.byte_array_to_base.call(null,cljs.core.apply.call(null,fluree.crypto.scrypt.encrypt,byte_msg,args),new cljs.core.Keyword(null,"hex","hex",41691346));
});

fluree.crypto.scrypt_encrypt.cljs$lang$maxFixedArity = (1);

/** @this {Function} */
fluree.crypto.scrypt_encrypt.cljs$lang$applyTo = (function (seq34824){
var G__34825 = cljs.core.first.call(null,seq34824);
var seq34824__$1 = cljs.core.next.call(null,seq34824);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__34825,seq34824__$1);
});

/**
 * Compares a message (string) with previously encrypted message (hex). 
 */
fluree.crypto.scrypt_check = (function fluree$crypto$scrypt_check(var_args){
var args__4736__auto__ = [];
var len__4730__auto___34832 = arguments.length;
var i__4731__auto___34833 = (0);
while(true){
if((i__4731__auto___34833 < len__4730__auto___34832)){
args__4736__auto__.push((arguments[i__4731__auto___34833]));

var G__34834 = (i__4731__auto___34833 + (1));
i__4731__auto___34833 = G__34834;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((2) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((2)),(0),null)):null);
return fluree.crypto.scrypt_check.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4737__auto__);
});
goog.exportSymbol('fluree.crypto.scrypt_check', fluree.crypto.scrypt_check);

fluree.crypto.scrypt_check.cljs$core$IFn$_invoke$arity$variadic = (function (message,encrypted,args){
var byte_msg = fluree.crypto.string__GT_byte_array.call(null,message);
var byte_encryped = alphabase.core.base_to_byte_array.call(null,encrypted,new cljs.core.Keyword(null,"hex","hex",41691346));
return cljs.core.apply.call(null,fluree.crypto.scrypt.check,byte_msg,byte_encryped,args);
});

fluree.crypto.scrypt_check.cljs$lang$maxFixedArity = (2);

/** @this {Function} */
fluree.crypto.scrypt_check.cljs$lang$applyTo = (function (seq34829){
var G__34830 = cljs.core.first.call(null,seq34829);
var seq34829__$1 = cljs.core.next.call(null,seq34829);
var G__34831 = cljs.core.first.call(null,seq34829__$1);
var seq34829__$2 = cljs.core.next.call(null,seq34829__$1);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__34830,G__34831,seq34829__$2);
});


//# sourceMappingURL=crypto.js.map?rel=1567785999859
