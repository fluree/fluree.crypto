// Compiled by ClojureScript 1.10.520 {:static-fns false, :optimize-constants false}
goog.provide('alphabase.core');
goog.require('cljs.core');
goog.require('alphabase.base64');
goog.require('alphabase.base58');
goog.require('alphabase.codec');
goog.require('alphabase.hex');
goog.require('goog.crypt');
/**
 * Converts string to UTF-8 bytes
 */
alphabase.core.string__GT_bytes = (function alphabase$core$string__GT_bytes(s){
return goog.crypt.stringToByteArray(s);
});
/**
 * Converts UTF8 byte array to string
 */
alphabase.core.bytes__GT_string = (function alphabase$core$bytes__GT_string(ba){
return goog.crypt.byteArrayToString(ba);
});
alphabase.core.biginteger__GT_bytes = (function alphabase$core$biginteger__GT_bytes(bint){
throw (new Error("Biginteger is not supported in cljs."));
});
alphabase.core.bytes__GT_biginteger = (function alphabase$core$bytes__GT_biginteger(ba){
throw (new Error("Biginteger is not supported in cljs."));
});
alphabase.core.encode = (function alphabase$core$encode(alphabet,data){
return alphabase.codec.encode.call(null,alphabet,data);
});
alphabase.core.decode = (function alphabase$core$decode(alphabet,tokens){
return alphabase.codec.decode.call(null,alphabet,tokens);
});
/**
 * Converts bytes to base-58
 */
alphabase.core.bytes__GT_base58 = (function alphabase$core$bytes__GT_base58(b){
return alphabase.base58.encode.call(null,b);
});
/**
 * Converts bytes to base-58
 */
alphabase.core.base58__GT_bytes = (function alphabase$core$base58__GT_bytes(b58){
return alphabase.base58.decode.call(null,b58);
});
/**
 * Converts bytes to base-64
 */
alphabase.core.bytes__GT_base64 = (function alphabase$core$bytes__GT_base64(b){
return alphabase.base64.encode.call(null,b);
});
/**
 * Converts bytes to base-64
 */
alphabase.core.base64__GT_bytes = (function alphabase$core$base64__GT_bytes(b64){
return alphabase.base64.decode.call(null,b64);
});
alphabase.core.hex__GT_bytes = (function alphabase$core$hex__GT_bytes(hex){
return alphabase.hex.decode.call(null,hex);
});
alphabase.core.bytes__GT_hex = (function alphabase$core$bytes__GT_hex(b){
return alphabase.hex.encode.call(null,b);
});
/**
 * Test if a string is base58
 */
alphabase.core.base58_QMARK_ = (function alphabase$core$base58_QMARK_(x){
return alphabase.base58.base58_QMARK_.call(null,x);
});
/**
 * Test if a string is base58
 */
alphabase.core.base64_QMARK_ = (function alphabase$core$base64_QMARK_(x){
return alphabase.base64.base64_QMARK_.call(null,x);
});
/**
 * Test if a string is base58
 */
alphabase.core.hex_QMARK_ = (function alphabase$core$hex_QMARK_(x){
return alphabase.hex.hex_QMARK_.call(null,x);
});
/**
 * Encodes a base58-string as a hex-string
 */
alphabase.core.base58_to_hex = (function alphabase$core$base58_to_hex(data){
return alphabase.core.bytes__GT_hex.call(null,alphabase.core.base58__GT_bytes.call(null,data));
});
/**
 * Encodes a hex-string as a base58-string
 */
alphabase.core.hex_to_base58 = (function alphabase$core$hex_to_base58(data){
if(alphabase.core.hex_QMARK_.call(null,data)){
} else {
throw (new Error(["Assert failed: ","Input must be hexadecimal","\n","(hex? data)"].join('')));
}

return alphabase.core.bytes__GT_base58.call(null,alphabase.core.hex__GT_bytes.call(null,data));
});
alphabase.core.byte_array_to_base = (function alphabase$core$byte_array_to_base(data,output_format){
var ba = data;
var G__20995 = output_format;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"hex","hex",41691346),G__20995)){
return alphabase.core.bytes__GT_hex.call(null,ba);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"base64","base64",167760174),G__20995)){
return alphabase.core.bytes__GT_base64.call(null,ba);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"base58","base58",1785479990),G__20995)){
return alphabase.core.bytes__GT_base58.call(null,ba);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"bytes","bytes",1175866680),G__20995)){
return ba;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"biginteger","biginteger",-285422718),G__20995)){
return alphabase.core.bytes__GT_biginteger.call(null,ba);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"string","string",-1989541586),G__20995)){
return alphabase.core.bytes__GT_string.call(null,ba);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"none","none",1333468478),G__20995)){
return ba;
} else {
if(cljs.core._EQ_.call(null,null,G__20995)){
return ba;
} else {
throw cljs.core.ex_info.call(null,"Unsupported output-format",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"data","data",-232669377),data,new cljs.core.Keyword(null,"output-format","output-format",-1826382676),output_format], null));

}
}
}
}
}
}
}
}
});
/**
 * Convert data of specified base to a byte-array
 */
alphabase.core.base_to_byte_array = (function alphabase$core$base_to_byte_array(var_args){
var G__20997 = arguments.length;
switch (G__20997) {
case 1:
return alphabase.core.base_to_byte_array.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return alphabase.core.base_to_byte_array.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

alphabase.core.base_to_byte_array.cljs$core$IFn$_invoke$arity$1 = (function (data){
return alphabase.core.base_to_byte_array.call(null,data,((typeof data === 'string')?new cljs.core.Keyword(null,"string","string",-1989541586):new cljs.core.Keyword(null,"bytes","bytes",1175866680)));
});

alphabase.core.base_to_byte_array.cljs$core$IFn$_invoke$arity$2 = (function (data,format){
var G__20998 = format;
var G__20998__$1 = (((G__20998 instanceof cljs.core.Keyword))?G__20998.fqn:null);
switch (G__20998__$1) {
case "hex":
return alphabase.core.hex__GT_bytes.call(null,data);

break;
case "base64":
return alphabase.core.base64__GT_bytes.call(null,data);

break;
case "base58":
return alphabase.core.base58__GT_bytes.call(null,data);

break;
case "bytes":
return data;

break;
case "string":
return alphabase.core.string__GT_bytes.call(null,data);

break;
case "biginteger":
return alphabase.core.biginteger__GT_bytes.call(null,data);

break;
default:
throw cljs.core.ex_info.call(null,"Unsupported format",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"data","data",-232669377),data,new cljs.core.Keyword(null,"format","format",-1306924766),format], null));

}
});

alphabase.core.base_to_byte_array.cljs$lang$maxFixedArity = 2;

/**
 * Convert one base into another
 */
alphabase.core.base_to_base = (function alphabase$core$base_to_base(data,input_format,output_format){
if((data == null)){
return data;
} else {
if(cljs.core._EQ_.call(null,input_format,output_format)){
return data;
} else {
return alphabase.core.byte_array_to_base.call(null,alphabase.core.base_to_byte_array.call(null,data,input_format),output_format);

}
}
});

//# sourceMappingURL=core.js.map?rel=1567785970707
