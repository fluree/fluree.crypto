// Compiled by ClojureScript 1.10.520 {:static-fns false, :optimize-constants false}
goog.provide('alphabase.codec');
goog.require('cljs.core');
goog.require('alphabase.bytes');
/**
 * Pure implementation of radix division to calculate a sequence of
 *   tokens from a byte array.
 */
alphabase.codec.pure_divide = (function alphabase$codec$pure_divide(alphabet,data){
var base = cljs.core.count.call(null,alphabet);
return cljs.core.map.call(null,cljs.core.partial.call(null,cljs.core.nth,alphabet),cljs.core.reverse.call(null,cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,((function (base){
return (function alphabase$codec$pure_divide_$_add_byte(digits,value){
var digits__$1 = digits;
var carry = value;
var i = (0);
while(true){
if((i < cljs.core.count.call(null,digits__$1))){
var carry_SINGLEQUOTE_ = (carry + (cljs.core.nth.call(null,digits__$1,i) << (8)));
var G__20917 = cljs.core.assoc_BANG_.call(null,digits__$1,i,cljs.core.mod.call(null,carry_SINGLEQUOTE_,base));
var G__20918 = ((carry_SINGLEQUOTE_ / base) | (0));
var G__20919 = (i + (1));
digits__$1 = G__20917;
carry = G__20918;
i = G__20919;
continue;
} else {
if((carry > (0))){
var G__20920 = cljs.core.conj_BANG_.call(null,digits__$1,cljs.core.mod.call(null,carry,base));
var G__20921 = ((carry / base) | (0));
var G__20922 = (i + (1));
digits__$1 = G__20920;
carry = G__20921;
i = G__20922;
continue;
} else {
return digits__$1;
}
}
break;
}
});})(base))
,cljs.core.transient$.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0)], null)),alphabase.bytes.byte_seq.call(null,data)))));
});
/**
 * Encodes binary data using the given alphabet. Returns the encoded string, or
 *   nil if the input is nil or empty.
 */
alphabase.codec.encode = (function alphabase$codec$encode(alphabet,data){
if(typeof alphabet === 'string'){
} else {
throw (new Error("Assert failed: (string? alphabet)"));
}

if(((1) < cljs.core.count.call(null,alphabet))){
} else {
throw (new Error("Assert failed: (< 1 (count alphabet))"));
}

if(cljs.core.truth_((function (){var and__4120__auto__ = data;
if(cljs.core.truth_(and__4120__auto__)){
return (!((data.length === (0))));
} else {
return and__4120__auto__;
}
})())){
var zeroes = cljs.core.count.call(null,cljs.core.take_while.call(null,cljs.core.zero_QMARK_,alphabase.bytes.byte_seq.call(null,data)));
return cljs.core.apply.call(null,cljs.core.str,cljs.core.concat.call(null,cljs.core.repeat.call(null,zeroes,cljs.core.first.call(null,alphabet)),(((zeroes < data.length))?alphabase.codec.pure_divide.call(null,alphabet,data):null)));
} else {
return null;
}
});
/**
 * Pure implementation of radix multiplication to calculate a sequence of byte
 *   values from a string of tokens.
 */
alphabase.codec.pure_multiply = (function alphabase$codec$pure_multiply(alphabet,tokens){
var base = cljs.core.count.call(null,alphabet);
return cljs.core.reverse.call(null,cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,((function (base){
return (function alphabase$codec$pure_multiply_$_add_token(bytev,token){
var value = alphabet.indexOf(cljs.core.str.cljs$core$IFn$_invoke$arity$1(token));
if((value < (0))){
throw cljs.core.ex_info.call(null,["Invalid token ",cljs.core.pr_str.call(null,token)," is not in ",cljs.core._STAR_ns_STAR_," (",cljs.core.str.cljs$core$IFn$_invoke$arity$1(base),") alphabet"].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"alphabet","alphabet",788478088),alphabet,new cljs.core.Keyword(null,"token","token",-1211463215),token], null));
} else {
}

var bytev__$1 = bytev;
var carry = value;
var i = (0);
while(true){
if((i < cljs.core.count.call(null,bytev__$1))){
var carry_SINGLEQUOTE_ = (carry + (base * cljs.core.nth.call(null,bytev__$1,i)));
var G__20923 = cljs.core.assoc_BANG_.call(null,bytev__$1,i,(carry_SINGLEQUOTE_ & (255)));
var G__20924 = (carry_SINGLEQUOTE_ >> (8));
var G__20925 = (i + (1));
bytev__$1 = G__20923;
carry = G__20924;
i = G__20925;
continue;
} else {
if((carry > (0))){
var G__20926 = cljs.core.conj_BANG_.call(null,bytev__$1,(carry & (255)));
var G__20927 = (carry >> (8));
var G__20928 = (i + (1));
bytev__$1 = G__20926;
carry = G__20927;
i = G__20928;
continue;
} else {
return bytev__$1;
}
}
break;
}
});})(base))
,cljs.core.transient$.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0)], null)),cljs.core.seq.call(null,tokens))));
});
/**
 * Decodes a string of alphabet tokens. Returns the decoded binary array, or nil
 *   if the input is nil or empty.
 */
alphabase.codec.decode = (function alphabase$codec$decode(alphabet,tokens){
if(typeof alphabet === 'string'){
} else {
throw (new Error("Assert failed: (string? alphabet)"));
}

if((!(cljs.core.empty_QMARK_.call(null,alphabet)))){
} else {
throw (new Error("Assert failed: (not (empty? alphabet))"));
}

if(cljs.core.empty_QMARK_.call(null,tokens)){
return null;
} else {
var zeroes = cljs.core.count.call(null,cljs.core.take_while.call(null,cljs.core.PersistentHashSet.createAsIfByAssoc([cljs.core.first.call(null,alphabet)]),tokens));
if(cljs.core._EQ_.call(null,zeroes,cljs.core.count.call(null,tokens))){
return alphabase.bytes.byte_array.call(null,zeroes);
} else {
var byte_seq = alphabase.codec.pure_multiply.call(null,alphabet,tokens);
var data = alphabase.bytes.byte_array.call(null,(zeroes + cljs.core.count.call(null,byte_seq)));
var n__4607__auto___20929 = cljs.core.count.call(null,byte_seq);
var i_20930 = (0);
while(true){
if((i_20930 < n__4607__auto___20929)){
alphabase.bytes.set_byte.call(null,data,(zeroes + i_20930),cljs.core.nth.call(null,byte_seq,i_20930));

var G__20931 = (i_20930 + (1));
i_20930 = G__20931;
continue;
} else {
}
break;
}

return data;
}
}
});

//# sourceMappingURL=codec.js.map?rel=1567785970441
