// Compiled by ClojureScript 1.10.520 {:static-fns false, :optimize-constants false}
goog.provide('fluree.crypto.aes');
goog.require('cljs.core');
goog.require('alphabase.core');
goog.require('fluree.crypto.sha3');
goog.require('goog.crypt.Aes');
goog.require('goog.crypt.Cbc');
goog.require('goog.crypt.Pkcs7');
/**
 * Takes a sha3-512 hash of provided string key.
 *   We only need first 32 bytes.
 */
fluree.crypto.aes.hash_string_key = (function fluree$crypto$aes$hash_string_key(key){
var hash_512 = fluree.crypto.sha3.sha3_512.call(null,((typeof key === 'string')?alphabase.core.string__GT_bytes.call(null,key):key));
return hash_512.slice((0),(32));
});
/**
 * Encrypts with AES/CBC/PKCS{5/7}Padding by hashing a 256 bit key out
 *   of key (requires Unlimited Strength crypto to be enabled).
 *   You can provide an alternate initial vector of unsigned(!) bytes of size 16 for CBC.
 */
fluree.crypto.aes.encrypt = (function fluree$crypto$aes$encrypt(var_args){
var args__4736__auto__ = [];
var len__4730__auto___21050 = arguments.length;
var i__4731__auto___21051 = (0);
while(true){
if((i__4731__auto___21051 < len__4730__auto___21050)){
args__4736__auto__.push((arguments[i__4731__auto___21051]));

var G__21052 = (i__4731__auto___21051 + (1));
i__4731__auto___21051 = G__21052;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((2) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((2)),(0),null)):null);
return fluree.crypto.aes.encrypt.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4737__auto__);
});
goog.exportSymbol('fluree.crypto.aes.encrypt', fluree.crypto.aes.encrypt);

fluree.crypto.aes.encrypt.cljs$core$IFn$_invoke$arity$variadic = (function (x,key,p__21046){
var map__21047 = p__21046;
var map__21047__$1 = (((((!((map__21047 == null))))?(((((map__21047.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__21047.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21047):map__21047);
var iv = cljs.core.get.call(null,map__21047__$1,new cljs.core.Keyword(null,"iv","iv",-1550102132),new cljs.core.PersistentVector(null, 16, 5, cljs.core.PersistentVector.EMPTY_NODE, [(6),(224),(71),(170),(241),(204),(115),(21),(30),(8),(46),(223),(106),(207),(55),(42)], null));
var output_format = cljs.core.get.call(null,map__21047__$1,new cljs.core.Keyword(null,"output-format","output-format",-1826382676),new cljs.core.Keyword(null,"hex","hex",41691346));
var key_ba = ((typeof key === 'string')?fluree.crypto.aes.hash_string_key.call(null,key):key);
var ba = ((typeof x === 'string')?alphabase.core.string__GT_bytes.call(null,x):x);
var encrypted = (function (){var cipher = (new goog.crypt.Aes(key_ba));
var cbc = (new goog.crypt.Cbc(cipher));
var pkcs7 = (new goog.crypt.Pkcs7());
var padded = pkcs7.encode((16),ba);
return cbc.encrypt(padded,cljs.core.clj__GT_js.call(null,iv));
})();
var G__21049 = cljs.core.keyword.call(null,output_format);
var G__21049__$1 = (((G__21049 instanceof cljs.core.Keyword))?G__21049.fqn:null);
switch (G__21049__$1) {
case "none":
return encrypted;

break;
case "hex":
return alphabase.core.bytes__GT_hex.call(null,encrypted);

break;
case "base64":
return alphabase.core.bytes__GT_base64.call(null,encrypted);

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__21049__$1)].join('')));

}
});

fluree.crypto.aes.encrypt.cljs$lang$maxFixedArity = (2);

/** @this {Function} */
fluree.crypto.aes.encrypt.cljs$lang$applyTo = (function (seq21043){
var G__21044 = cljs.core.first.call(null,seq21043);
var seq21043__$1 = cljs.core.next.call(null,seq21043);
var G__21045 = cljs.core.first.call(null,seq21043__$1);
var seq21043__$2 = cljs.core.next.call(null,seq21043__$1);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21044,G__21045,seq21043__$2);
});

/**
 * Decrypts with AES/CBC/PKCS{5/7}Padding by hashing a 256 bit key out of key.
 *   You can provide an alternate initial vector of unsigned(!) bytes of size 16 for CBC.
 */
fluree.crypto.aes.decrypt = (function fluree$crypto$aes$decrypt(var_args){
var args__4736__auto__ = [];
var len__4730__auto___21063 = arguments.length;
var i__4731__auto___21064 = (0);
while(true){
if((i__4731__auto___21064 < len__4730__auto___21063)){
args__4736__auto__.push((arguments[i__4731__auto___21064]));

var G__21065 = (i__4731__auto___21064 + (1));
i__4731__auto___21064 = G__21065;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((2) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((2)),(0),null)):null);
return fluree.crypto.aes.decrypt.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__4737__auto__);
});
goog.exportSymbol('fluree.crypto.aes.decrypt', fluree.crypto.aes.decrypt);

fluree.crypto.aes.decrypt.cljs$core$IFn$_invoke$arity$variadic = (function (x,key,p__21058){
var map__21059 = p__21058;
var map__21059__$1 = (((((!((map__21059 == null))))?(((((map__21059.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__21059.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__21059):map__21059);
var iv = cljs.core.get.call(null,map__21059__$1,new cljs.core.Keyword(null,"iv","iv",-1550102132),new cljs.core.PersistentVector(null, 16, 5, cljs.core.PersistentVector.EMPTY_NODE, [(6),(224),(71),(170),(241),(204),(115),(21),(30),(8),(46),(223),(106),(207),(55),(42)], null));
var input_format = cljs.core.get.call(null,map__21059__$1,new cljs.core.Keyword(null,"input-format","input-format",-422703481),new cljs.core.Keyword(null,"hex","hex",41691346));
var output_format = cljs.core.get.call(null,map__21059__$1,new cljs.core.Keyword(null,"output-format","output-format",-1826382676),new cljs.core.Keyword(null,"string","string",-1989541586));
var key_ba = ((typeof key === 'string')?fluree.crypto.aes.hash_string_key.call(null,key):key);
var x_ba = ((typeof x === 'string')?(function (){var G__21061 = cljs.core.keyword.call(null,input_format);
var G__21061__$1 = (((G__21061 instanceof cljs.core.Keyword))?G__21061.fqn:null);
switch (G__21061__$1) {
case "hex":
return alphabase.core.hex__GT_bytes.call(null,x);

break;
case "base64":
return alphabase.core.base64__GT_bytes.call(null,x);

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__21061__$1)].join('')));

}
})():x);
var decrypt_ba = (function (){var cipher = (new goog.crypt.Aes(key_ba));
var cbc = (new goog.crypt.Cbc(cipher));
var pkcs7 = (new goog.crypt.Pkcs7());
return pkcs7.decode((16),cbc.decrypt(x_ba,cljs.core.clj__GT_js.call(null,iv)));
})();
var G__21062 = cljs.core.keyword.call(null,output_format);
var G__21062__$1 = (((G__21062 instanceof cljs.core.Keyword))?G__21062.fqn:null);
switch (G__21062__$1) {
case "none":
return decrypt_ba;

break;
case "string":
return alphabase.core.bytes__GT_string.call(null,decrypt_ba);

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__21062__$1)].join('')));

}
});

fluree.crypto.aes.decrypt.cljs$lang$maxFixedArity = (2);

/** @this {Function} */
fluree.crypto.aes.decrypt.cljs$lang$applyTo = (function (seq21055){
var G__21056 = cljs.core.first.call(null,seq21055);
var seq21055__$1 = cljs.core.next.call(null,seq21055);
var G__21057 = cljs.core.first.call(null,seq21055__$1);
var seq21055__$2 = cljs.core.next.call(null,seq21055__$1);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__21056,G__21057,seq21055__$2);
});


//# sourceMappingURL=aes.js.map?rel=1567785970862
