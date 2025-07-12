// Compiled by ClojureScript 1.10.520 {:static-fns false, :optimize-constants false}
goog.provide('alphabase.bytes');
goog.require('cljs.core');
/**
 * Coerces a number to a byte value.
 */
alphabase.bytes.to_byte = (function alphabase$bytes$to_byte(x){
return x;
});
/**
 * Coerces a byte value to a number.
 */
alphabase.bytes.from_byte = (function alphabase$bytes$from_byte(x){
return x;
});
/**
 * Reads a byte value out of an array and coerces it to a number.
 */
alphabase.bytes.get_byte = (function alphabase$bytes$get_byte(array,i){
return alphabase.bytes.from_byte.call(null,(array[i]));
});
/**
 * Sets a byte value in an array after coercing it from a number.
 */
alphabase.bytes.set_byte = (function alphabase$bytes$set_byte(array,i,x){
return (array[i] = alphabase.bytes.to_byte.call(null,x));
});
/**
 * Return a sequence of the bytes in an array, after coercion.
 */
alphabase.bytes.byte_seq = (function alphabase$bytes$byte_seq(array){
if(cljs.core.truth_(array)){
return cljs.core.map.call(null,(function (p1__20869_SHARP_){
return (array[p1__20869_SHARP_]);
}),cljs.core.range.call(null,array.length));
} else {
return null;
}
});
/**
 * True if the argument is a byte array compatible with this library.
 */
alphabase.bytes.bytes_QMARK_ = (function alphabase$bytes$bytes_QMARK_(x){
return (((x instanceof Uint8Array)) || ((((x instanceof Array)) && (((cljs.core.empty_QMARK_.call(null,x)) || (cljs.core.integer_QMARK_.call(null,cljs.core.first.call(null,x))))))));
});
/**
 * Returns true if two byte sequences are the same length and have the same
 *   byte content.
 */
alphabase.bytes.bytes_EQ_ = (function alphabase$bytes$bytes_EQ_(a,b){
var and__4120__auto__ = alphabase.bytes.bytes_QMARK_.call(null,a);
if(and__4120__auto__){
var and__4120__auto____$1 = alphabase.bytes.bytes_QMARK_.call(null,b);
if(and__4120__auto____$1){
var a__$1 = a;
var b__$1 = b;
var and__4120__auto____$2 = cljs.core._EQ_.call(null,a__$1.length,b__$1.length);
if(and__4120__auto____$2){
var i = (0);
while(true){
if((i < a__$1.length)){
if(cljs.core._EQ_.call(null,alphabase.bytes.get_byte.call(null,a__$1,i),alphabase.bytes.get_byte.call(null,b__$1,i))){
var G__20870 = (i + (1));
i = G__20870;
continue;
} else {
return false;
}
} else {
return true;
}
break;
}
} else {
return and__4120__auto____$2;
}
} else {
return and__4120__auto____$1;
}
} else {
return and__4120__auto__;
}
});
/**
 * Creates a new array to hold byte data.
 */
alphabase.bytes.byte_array = (function alphabase$bytes$byte_array(length){
return (new Uint8Array((new ArrayBuffer(length))));
});
/**
 * Copies bytes from one array to another.
 * 
 *   - If only a source is given, returns a full copy of the byte array.
 *   - If a source and a destination with offset are given, copies all of the
 *  bytes from the source into the destination at that offset. Returns the
 *  number of bytes copied.
 *   - If all arguments are given, copies `length` bytes from the source at the
 *  given offset to the destination at its offset. Returns the number of bytes
 *  copied.
 */
alphabase.bytes.copy = (function alphabase$bytes$copy(var_args){
var G__20872 = arguments.length;
switch (G__20872) {
case 1:
return alphabase.bytes.copy.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 3:
return alphabase.bytes.copy.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 5:
return alphabase.bytes.copy.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

alphabase.bytes.copy.cljs$core$IFn$_invoke$arity$1 = (function (src){
var dst = alphabase.bytes.byte_array.call(null,src.length);
alphabase.bytes.copy.call(null,src,dst,(0));

return dst;
});

alphabase.bytes.copy.cljs$core$IFn$_invoke$arity$3 = (function (src,dst,dst_offset){
return alphabase.bytes.copy.call(null,src,(0),dst,dst_offset,src.length);
});

alphabase.bytes.copy.cljs$core$IFn$_invoke$arity$5 = (function (src,src_offset,dst,dst_offset,length){
var n__4607__auto___20874 = length;
var i_20875 = (0);
while(true){
if((i_20875 < n__4607__auto___20874)){
alphabase.bytes.set_byte.call(null,dst,(i_20875 + dst_offset),alphabase.bytes.get_byte.call(null,src,(i_20875 + src_offset)));

var G__20876 = (i_20875 + (1));
i_20875 = G__20876;
continue;
} else {
}
break;
}

return length;
});

alphabase.bytes.copy.cljs$lang$maxFixedArity = 5;

/**
 * Initialize a new array with the given sequence of byte values.
 */
alphabase.bytes.init_bytes = (function alphabase$bytes$init_bytes(values){
var length = cljs.core.count.call(null,values);
var data = alphabase.bytes.byte_array.call(null,length);
var n__4607__auto___20877 = length;
var i_20878 = (0);
while(true){
if((i_20878 < n__4607__auto___20877)){
alphabase.bytes.set_byte.call(null,data,i_20878,cljs.core.nth.call(null,values,i_20878));

var G__20879 = (i_20878 + (1));
i_20878 = G__20879;
continue;
} else {
}
break;
}

return data;
});
/**
 * Returns a byte array `length` bytes long with random content.
 */
alphabase.bytes.random_bytes = (function alphabase$bytes$random_bytes(length){
var data = alphabase.bytes.byte_array.call(null,length);
var n__4607__auto___20880 = length;
var i_20881 = (0);
while(true){
if((i_20881 < n__4607__auto___20880)){
alphabase.bytes.set_byte.call(null,data,i_20881,cljs.core.rand_int.call(null,(256)));

var G__20882 = (i_20881 + (1));
i_20881 = G__20882;
continue;
} else {
}
break;
}

return data;
});
/**
 * Lexicographically compares two byte-arrays for order. Returns a negative
 *   number, zero, or a positive number if `a` is less than, equal to, or greater
 *   than `b`, respectively.
 * 
 *   This ranking compares each byte in the keys in order; the first byte which
 *   differs determines the ordering; if the byte in `a` is less than the byte in
 *   `b`, `a` ranks before `b`, and vice versa.
 * 
 *   If the keys differ in length, and all the bytes in the shorter key match the
 *   longer key, the shorter key ranks first.
 */
alphabase.bytes.compare = (function alphabase$bytes$compare(a,b){
var prefix_len = (function (){var x__4222__auto__ = a.length;
var y__4223__auto__ = b.length;
return ((x__4222__auto__ < y__4223__auto__) ? x__4222__auto__ : y__4223__auto__);
})();
var i = (0);
while(true){
if((i < prefix_len)){
var ai = alphabase.bytes.get_byte.call(null,a,i);
var bi = alphabase.bytes.get_byte.call(null,b,i);
if(cljs.core._EQ_.call(null,ai,bi)){
var G__20883 = (i + (1));
i = G__20883;
continue;
} else {
return (ai - bi);
}
} else {
return (a.length - b.length);
}
break;
}
});
/**
 * Copy a slice (defined by offset, length) from a byte array.
 * 
 *   Omitting the slice `len` argument will copy remainder of
 *   `src` array from offset (e.g, `(- (alength src) offset)` bytes).
 */
alphabase.bytes.copy_slice = (function alphabase$bytes$copy_slice(var_args){
var G__20885 = arguments.length;
switch (G__20885) {
case 3:
return alphabase.bytes.copy_slice.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 2:
return alphabase.bytes.copy_slice.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

alphabase.bytes.copy_slice.cljs$core$IFn$_invoke$arity$3 = (function (src,offset,len){
var dst = alphabase.bytes.byte_array.call(null,len);
alphabase.bytes.copy.call(null,src,offset,dst,(0),len);

return dst;
});

alphabase.bytes.copy_slice.cljs$core$IFn$_invoke$arity$2 = (function (src,offset){
return alphabase.bytes.copy_slice.call(null,src,offset,(src.length - offset));
});

alphabase.bytes.copy_slice.cljs$lang$maxFixedArity = 3;

/**
 * Concatenate bytes arrays into a single new byte array.
 */
alphabase.bytes.concat = (function alphabase$bytes$concat(var_args){
var args__4736__auto__ = [];
var len__4730__auto___20889 = arguments.length;
var i__4731__auto___20890 = (0);
while(true){
if((i__4731__auto___20890 < len__4730__auto___20889)){
args__4736__auto__.push((arguments[i__4731__auto___20890]));

var G__20891 = (i__4731__auto___20890 + (1));
i__4731__auto___20890 = G__20891;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((0) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((0)),(0),null)):null);
return alphabase.bytes.concat.cljs$core$IFn$_invoke$arity$variadic(argseq__4737__auto__);
});

alphabase.bytes.concat.cljs$core$IFn$_invoke$arity$variadic = (function (arrs){
var arrs__$1 = cljs.core.remove.call(null,cljs.core.nil_QMARK_,arrs);
var total_len = cljs.core.reduce.call(null,cljs.core._PLUS_,cljs.core.map.call(null,((function (arrs__$1){
return (function (p1__20887_SHARP_){
return p1__20887_SHARP_.length;
});})(arrs__$1))
,arrs__$1));
var dst = alphabase.bytes.byte_array.call(null,total_len);
var arrs_20892__$2 = arrs__$1;
var offset_20893 = (0);
while(true){
var temp__5735__auto___20894 = cljs.core.first.call(null,arrs_20892__$2);
if(cljs.core.truth_(temp__5735__auto___20894)){
var src_20895 = temp__5735__auto___20894;
alphabase.bytes.copy.call(null,src_20895,(0),dst,offset_20893,src_20895.length);

var G__20896 = cljs.core.rest.call(null,arrs_20892__$2);
var G__20897 = (offset_20893 + src_20895.length);
arrs_20892__$2 = G__20896;
offset_20893 = G__20897;
continue;
} else {
}
break;
}

return dst;
});

alphabase.bytes.concat.cljs$lang$maxFixedArity = (0);

/** @this {Function} */
alphabase.bytes.concat.cljs$lang$applyTo = (function (seq20888){
var self__4718__auto__ = this;
return self__4718__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq20888));
});


//# sourceMappingURL=bytes.js.map?rel=1567785970346
