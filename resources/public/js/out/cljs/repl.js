// Compiled by ClojureScript 1.10.520 {:static-fns false, :optimize-constants false}
goog.provide('cljs.repl');
goog.require('cljs.core');
goog.require('cljs.spec.alpha');
goog.require('goog.string');
goog.require('goog.string.format');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__32901){
var map__32902 = p__32901;
var map__32902__$1 = (((((!((map__32902 == null))))?(((((map__32902.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__32902.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32902):map__32902);
var m = map__32902__$1;
var n = cljs.core.get.call(null,map__32902__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.call(null,map__32902__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.call(null,"-------------------------");

cljs.core.println.call(null,(function (){var or__4131__auto__ = new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return [(function (){var temp__5735__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__5735__auto__)){
var ns = temp__5735__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),"/"].join('');
} else {
return null;
}
})(),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('');
}
})());

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Protocol");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__32904_32936 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__32905_32937 = null;
var count__32906_32938 = (0);
var i__32907_32939 = (0);
while(true){
if((i__32907_32939 < count__32906_32938)){
var f_32940 = cljs.core._nth.call(null,chunk__32905_32937,i__32907_32939);
cljs.core.println.call(null,"  ",f_32940);


var G__32941 = seq__32904_32936;
var G__32942 = chunk__32905_32937;
var G__32943 = count__32906_32938;
var G__32944 = (i__32907_32939 + (1));
seq__32904_32936 = G__32941;
chunk__32905_32937 = G__32942;
count__32906_32938 = G__32943;
i__32907_32939 = G__32944;
continue;
} else {
var temp__5735__auto___32945 = cljs.core.seq.call(null,seq__32904_32936);
if(temp__5735__auto___32945){
var seq__32904_32946__$1 = temp__5735__auto___32945;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__32904_32946__$1)){
var c__4550__auto___32947 = cljs.core.chunk_first.call(null,seq__32904_32946__$1);
var G__32948 = cljs.core.chunk_rest.call(null,seq__32904_32946__$1);
var G__32949 = c__4550__auto___32947;
var G__32950 = cljs.core.count.call(null,c__4550__auto___32947);
var G__32951 = (0);
seq__32904_32936 = G__32948;
chunk__32905_32937 = G__32949;
count__32906_32938 = G__32950;
i__32907_32939 = G__32951;
continue;
} else {
var f_32952 = cljs.core.first.call(null,seq__32904_32946__$1);
cljs.core.println.call(null,"  ",f_32952);


var G__32953 = cljs.core.next.call(null,seq__32904_32946__$1);
var G__32954 = null;
var G__32955 = (0);
var G__32956 = (0);
seq__32904_32936 = G__32953;
chunk__32905_32937 = G__32954;
count__32906_32938 = G__32955;
i__32907_32939 = G__32956;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_32957 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__4131__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_32957);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_32957)))?cljs.core.second.call(null,arglists_32957):arglists_32957));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Special Form");

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.contains_QMARK_.call(null,m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.call(null,["\n  Please see http://clojure.org/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join(''));
} else {
return null;
}
} else {
return cljs.core.println.call(null,["\n  Please see http://clojure.org/special_forms#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Macro");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Spec");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"REPL Special Function");
} else {
}

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__32908_32958 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__32909_32959 = null;
var count__32910_32960 = (0);
var i__32911_32961 = (0);
while(true){
if((i__32911_32961 < count__32910_32960)){
var vec__32922_32962 = cljs.core._nth.call(null,chunk__32909_32959,i__32911_32961);
var name_32963 = cljs.core.nth.call(null,vec__32922_32962,(0),null);
var map__32925_32964 = cljs.core.nth.call(null,vec__32922_32962,(1),null);
var map__32925_32965__$1 = (((((!((map__32925_32964 == null))))?(((((map__32925_32964.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__32925_32964.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32925_32964):map__32925_32964);
var doc_32966 = cljs.core.get.call(null,map__32925_32965__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_32967 = cljs.core.get.call(null,map__32925_32965__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_32963);

cljs.core.println.call(null," ",arglists_32967);

if(cljs.core.truth_(doc_32966)){
cljs.core.println.call(null," ",doc_32966);
} else {
}


var G__32968 = seq__32908_32958;
var G__32969 = chunk__32909_32959;
var G__32970 = count__32910_32960;
var G__32971 = (i__32911_32961 + (1));
seq__32908_32958 = G__32968;
chunk__32909_32959 = G__32969;
count__32910_32960 = G__32970;
i__32911_32961 = G__32971;
continue;
} else {
var temp__5735__auto___32972 = cljs.core.seq.call(null,seq__32908_32958);
if(temp__5735__auto___32972){
var seq__32908_32973__$1 = temp__5735__auto___32972;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__32908_32973__$1)){
var c__4550__auto___32974 = cljs.core.chunk_first.call(null,seq__32908_32973__$1);
var G__32975 = cljs.core.chunk_rest.call(null,seq__32908_32973__$1);
var G__32976 = c__4550__auto___32974;
var G__32977 = cljs.core.count.call(null,c__4550__auto___32974);
var G__32978 = (0);
seq__32908_32958 = G__32975;
chunk__32909_32959 = G__32976;
count__32910_32960 = G__32977;
i__32911_32961 = G__32978;
continue;
} else {
var vec__32927_32979 = cljs.core.first.call(null,seq__32908_32973__$1);
var name_32980 = cljs.core.nth.call(null,vec__32927_32979,(0),null);
var map__32930_32981 = cljs.core.nth.call(null,vec__32927_32979,(1),null);
var map__32930_32982__$1 = (((((!((map__32930_32981 == null))))?(((((map__32930_32981.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__32930_32981.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__32930_32981):map__32930_32981);
var doc_32983 = cljs.core.get.call(null,map__32930_32982__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_32984 = cljs.core.get.call(null,map__32930_32982__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_32980);

cljs.core.println.call(null," ",arglists_32984);

if(cljs.core.truth_(doc_32983)){
cljs.core.println.call(null," ",doc_32983);
} else {
}


var G__32985 = cljs.core.next.call(null,seq__32908_32973__$1);
var G__32986 = null;
var G__32987 = (0);
var G__32988 = (0);
seq__32908_32958 = G__32985;
chunk__32909_32959 = G__32986;
count__32910_32960 = G__32987;
i__32911_32961 = G__32988;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__5735__auto__ = cljs.spec.alpha.get_spec.call(null,cljs.core.symbol.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name.call(null,n)),cljs.core.name.call(null,nm)));
if(cljs.core.truth_(temp__5735__auto__)){
var fnspec = temp__5735__auto__;
cljs.core.print.call(null,"Spec");

var seq__32932 = cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__32933 = null;
var count__32934 = (0);
var i__32935 = (0);
while(true){
if((i__32935 < count__32934)){
var role = cljs.core._nth.call(null,chunk__32933,i__32935);
var temp__5735__auto___32989__$1 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__5735__auto___32989__$1)){
var spec_32990 = temp__5735__auto___32989__$1;
cljs.core.print.call(null,["\n ",cljs.core.name.call(null,role),":"].join(''),cljs.spec.alpha.describe.call(null,spec_32990));
} else {
}


var G__32991 = seq__32932;
var G__32992 = chunk__32933;
var G__32993 = count__32934;
var G__32994 = (i__32935 + (1));
seq__32932 = G__32991;
chunk__32933 = G__32992;
count__32934 = G__32993;
i__32935 = G__32994;
continue;
} else {
var temp__5735__auto____$1 = cljs.core.seq.call(null,seq__32932);
if(temp__5735__auto____$1){
var seq__32932__$1 = temp__5735__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__32932__$1)){
var c__4550__auto__ = cljs.core.chunk_first.call(null,seq__32932__$1);
var G__32995 = cljs.core.chunk_rest.call(null,seq__32932__$1);
var G__32996 = c__4550__auto__;
var G__32997 = cljs.core.count.call(null,c__4550__auto__);
var G__32998 = (0);
seq__32932 = G__32995;
chunk__32933 = G__32996;
count__32934 = G__32997;
i__32935 = G__32998;
continue;
} else {
var role = cljs.core.first.call(null,seq__32932__$1);
var temp__5735__auto___32999__$2 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__5735__auto___32999__$2)){
var spec_33000 = temp__5735__auto___32999__$2;
cljs.core.print.call(null,["\n ",cljs.core.name.call(null,role),":"].join(''),cljs.spec.alpha.describe.call(null,spec_33000));
} else {
}


var G__33001 = cljs.core.next.call(null,seq__32932__$1);
var G__33002 = null;
var G__33003 = (0);
var G__33004 = (0);
seq__32932 = G__33001;
chunk__32933 = G__33002;
count__32934 = G__33003;
i__32935 = G__33004;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Constructs a data representation for a Error with keys:
 *  :cause - root cause message
 *  :phase - error phase
 *  :via - cause chain, with cause keys:
 *           :type - exception class symbol
 *           :message - exception message
 *           :data - ex-data
 *           :at - top stack element
 *  :trace - root cause stack elements
 */
cljs.repl.Error__GT_map = (function cljs$repl$Error__GT_map(o){
var base = (function (t){
return cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),(((t instanceof cljs.core.ExceptionInfo))?new cljs.core.Symbol(null,"ExceptionInfo","ExceptionInfo",294935087,null):(((t instanceof EvalError))?new cljs.core.Symbol("js","EvalError","js/EvalError",1793498501,null):(((t instanceof RangeError))?new cljs.core.Symbol("js","RangeError","js/RangeError",1703848089,null):(((t instanceof ReferenceError))?new cljs.core.Symbol("js","ReferenceError","js/ReferenceError",-198403224,null):(((t instanceof SyntaxError))?new cljs.core.Symbol("js","SyntaxError","js/SyntaxError",-1527651665,null):(((t instanceof URIError))?new cljs.core.Symbol("js","URIError","js/URIError",505061350,null):(((t instanceof Error))?new cljs.core.Symbol("js","Error","js/Error",-1692659266,null):null
)))))))], null),(function (){var temp__5735__auto__ = cljs.core.ex_message.call(null,t);
if(cljs.core.truth_(temp__5735__auto__)){
var msg = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),msg], null);
} else {
return null;
}
})(),(function (){var temp__5735__auto__ = cljs.core.ex_data.call(null,t);
if(cljs.core.truth_(temp__5735__auto__)){
var ed = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),ed], null);
} else {
return null;
}
})());
});
var via = (function (){var via = cljs.core.PersistentVector.EMPTY;
var t = o;
while(true){
if(cljs.core.truth_(t)){
var G__33005 = cljs.core.conj.call(null,via,t);
var G__33006 = cljs.core.ex_cause.call(null,t);
via = G__33005;
t = G__33006;
continue;
} else {
return via;
}
break;
}
})();
var root = cljs.core.peek.call(null,via);
return cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"via","via",-1904457336),cljs.core.vec.call(null,cljs.core.map.call(null,base,via)),new cljs.core.Keyword(null,"trace","trace",-1082747415),null], null),(function (){var temp__5735__auto__ = cljs.core.ex_message.call(null,root);
if(cljs.core.truth_(temp__5735__auto__)){
var root_msg = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cause","cause",231901252),root_msg], null);
} else {
return null;
}
})(),(function (){var temp__5735__auto__ = cljs.core.ex_data.call(null,root);
if(cljs.core.truth_(temp__5735__auto__)){
var data = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),data], null);
} else {
return null;
}
})(),(function (){var temp__5735__auto__ = new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358).cljs$core$IFn$_invoke$arity$1(cljs.core.ex_data.call(null,o));
if(cljs.core.truth_(temp__5735__auto__)){
var phase = temp__5735__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"phase","phase",575722892),phase], null);
} else {
return null;
}
})());
});
/**
 * Returns an analysis of the phase, error, cause, and location of an error that occurred
 *   based on Throwable data, as returned by Throwable->map. All attributes other than phase
 *   are optional:
 *  :clojure.error/phase - keyword phase indicator, one of:
 *    :read-source :compile-syntax-check :compilation :macro-syntax-check :macroexpansion
 *    :execution :read-eval-result :print-eval-result
 *  :clojure.error/source - file name (no path)
 *  :clojure.error/line - integer line number
 *  :clojure.error/column - integer column number
 *  :clojure.error/symbol - symbol being expanded/compiled/invoked
 *  :clojure.error/class - cause exception class symbol
 *  :clojure.error/cause - cause exception message
 *  :clojure.error/spec - explain-data for spec error
 */
cljs.repl.ex_triage = (function cljs$repl$ex_triage(datafied_throwable){
var map__33009 = datafied_throwable;
var map__33009__$1 = (((((!((map__33009 == null))))?(((((map__33009.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__33009.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__33009):map__33009);
var via = cljs.core.get.call(null,map__33009__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var trace = cljs.core.get.call(null,map__33009__$1,new cljs.core.Keyword(null,"trace","trace",-1082747415));
var phase = cljs.core.get.call(null,map__33009__$1,new cljs.core.Keyword(null,"phase","phase",575722892),new cljs.core.Keyword(null,"execution","execution",253283524));
var map__33010 = cljs.core.last.call(null,via);
var map__33010__$1 = (((((!((map__33010 == null))))?(((((map__33010.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__33010.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__33010):map__33010);
var type = cljs.core.get.call(null,map__33010__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var message = cljs.core.get.call(null,map__33010__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var data = cljs.core.get.call(null,map__33010__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var map__33011 = data;
var map__33011__$1 = (((((!((map__33011 == null))))?(((((map__33011.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__33011.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__33011):map__33011);
var problems = cljs.core.get.call(null,map__33011__$1,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814));
var fn = cljs.core.get.call(null,map__33011__$1,new cljs.core.Keyword("cljs.spec.alpha","fn","cljs.spec.alpha/fn",408600443));
var caller = cljs.core.get.call(null,map__33011__$1,new cljs.core.Keyword("cljs.spec.test.alpha","caller","cljs.spec.test.alpha/caller",-398302390));
var map__33012 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,via));
var map__33012__$1 = (((((!((map__33012 == null))))?(((((map__33012.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__33012.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__33012):map__33012);
var top_data = map__33012__$1;
var source = cljs.core.get.call(null,map__33012__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
return cljs.core.assoc.call(null,(function (){var G__33017 = phase;
var G__33017__$1 = (((G__33017 instanceof cljs.core.Keyword))?G__33017.fqn:null);
switch (G__33017__$1) {
case "read-source":
var map__33018 = data;
var map__33018__$1 = (((((!((map__33018 == null))))?(((((map__33018.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__33018.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__33018):map__33018);
var line = cljs.core.get.call(null,map__33018__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.call(null,map__33018__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var G__33020 = cljs.core.merge.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.second.call(null,via)),top_data);
var G__33020__$1 = (cljs.core.truth_(source)?cljs.core.assoc.call(null,G__33020,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__33020);
var G__33020__$2 = (cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null).call(null,source))?cljs.core.dissoc.call(null,G__33020__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__33020__$1);
if(cljs.core.truth_(message)){
return cljs.core.assoc.call(null,G__33020__$2,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__33020__$2;
}

break;
case "compile-syntax-check":
case "compilation":
case "macro-syntax-check":
case "macroexpansion":
var G__33021 = top_data;
var G__33021__$1 = (cljs.core.truth_(source)?cljs.core.assoc.call(null,G__33021,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__33021);
var G__33021__$2 = (cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null).call(null,source))?cljs.core.dissoc.call(null,G__33021__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__33021__$1);
var G__33021__$3 = (cljs.core.truth_(type)?cljs.core.assoc.call(null,G__33021__$2,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__33021__$2);
var G__33021__$4 = (cljs.core.truth_(message)?cljs.core.assoc.call(null,G__33021__$3,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__33021__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.call(null,G__33021__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__33021__$4;
}

break;
case "read-eval-result":
case "print-eval-result":
var vec__33022 = cljs.core.first.call(null,trace);
var source__$1 = cljs.core.nth.call(null,vec__33022,(0),null);
var method = cljs.core.nth.call(null,vec__33022,(1),null);
var file = cljs.core.nth.call(null,vec__33022,(2),null);
var line = cljs.core.nth.call(null,vec__33022,(3),null);
var G__33025 = top_data;
var G__33025__$1 = (cljs.core.truth_(line)?cljs.core.assoc.call(null,G__33025,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),line):G__33025);
var G__33025__$2 = (cljs.core.truth_(file)?cljs.core.assoc.call(null,G__33025__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file):G__33025__$1);
var G__33025__$3 = (cljs.core.truth_((function (){var and__4120__auto__ = source__$1;
if(cljs.core.truth_(and__4120__auto__)){
return method;
} else {
return and__4120__auto__;
}
})())?cljs.core.assoc.call(null,G__33025__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null))):G__33025__$2);
var G__33025__$4 = (cljs.core.truth_(type)?cljs.core.assoc.call(null,G__33025__$3,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__33025__$3);
if(cljs.core.truth_(message)){
return cljs.core.assoc.call(null,G__33025__$4,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__33025__$4;
}

break;
case "execution":
var vec__33026 = cljs.core.first.call(null,trace);
var source__$1 = cljs.core.nth.call(null,vec__33026,(0),null);
var method = cljs.core.nth.call(null,vec__33026,(1),null);
var file = cljs.core.nth.call(null,vec__33026,(2),null);
var line = cljs.core.nth.call(null,vec__33026,(3),null);
var file__$1 = cljs.core.first.call(null,cljs.core.remove.call(null,((function (vec__33026,source__$1,method,file,line,G__33017,G__33017__$1,map__33009,map__33009__$1,via,trace,phase,map__33010,map__33010__$1,type,message,data,map__33011,map__33011__$1,problems,fn,caller,map__33012,map__33012__$1,top_data,source){
return (function (p1__33008_SHARP_){
var or__4131__auto__ = (p1__33008_SHARP_ == null);
if(or__4131__auto__){
return or__4131__auto__;
} else {
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null).call(null,p1__33008_SHARP_);
}
});})(vec__33026,source__$1,method,file,line,G__33017,G__33017__$1,map__33009,map__33009__$1,via,trace,phase,map__33010,map__33010__$1,type,message,data,map__33011,map__33011__$1,problems,fn,caller,map__33012,map__33012__$1,top_data,source))
,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(caller),file], null)));
var err_line = (function (){var or__4131__auto__ = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(caller);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return line;
}
})();
var G__33029 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type], null);
var G__33029__$1 = (cljs.core.truth_(err_line)?cljs.core.assoc.call(null,G__33029,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),err_line):G__33029);
var G__33029__$2 = (cljs.core.truth_(message)?cljs.core.assoc.call(null,G__33029__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__33029__$1);
var G__33029__$3 = (cljs.core.truth_((function (){var or__4131__auto__ = fn;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
var and__4120__auto__ = source__$1;
if(cljs.core.truth_(and__4120__auto__)){
return method;
} else {
return and__4120__auto__;
}
}
})())?cljs.core.assoc.call(null,G__33029__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(function (){var or__4131__auto__ = fn;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null));
}
})()):G__33029__$2);
var G__33029__$4 = (cljs.core.truth_(file__$1)?cljs.core.assoc.call(null,G__33029__$3,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file__$1):G__33029__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.call(null,G__33029__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__33029__$4;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__33017__$1)].join('')));

}
})(),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),phase);
});
/**
 * Returns a string from exception data, as produced by ex-triage.
 *   The first line summarizes the exception phase and location.
 *   The subsequent lines describe the cause.
 */
cljs.repl.ex_str = (function cljs$repl$ex_str(p__33033){
var map__33034 = p__33033;
var map__33034__$1 = (((((!((map__33034 == null))))?(((((map__33034.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__33034.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__33034):map__33034);
var triage_data = map__33034__$1;
var phase = cljs.core.get.call(null,map__33034__$1,new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358));
var source = cljs.core.get.call(null,map__33034__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
var line = cljs.core.get.call(null,map__33034__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.call(null,map__33034__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var symbol = cljs.core.get.call(null,map__33034__$1,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994));
var class$ = cljs.core.get.call(null,map__33034__$1,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890));
var cause = cljs.core.get.call(null,map__33034__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742));
var spec = cljs.core.get.call(null,map__33034__$1,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595));
var loc = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__4131__auto__ = source;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return "<cljs repl>";
}
})()),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__4131__auto__ = line;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return (1);
}
})()),(cljs.core.truth_(column)?[":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join(''):"")].join('');
var class_name = cljs.core.name.call(null,(function (){var or__4131__auto__ = class$;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return "";
}
})());
var simple_class = class_name;
var cause_type = ((cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["RuntimeException",null,"Exception",null], null), null),simple_class))?"":[" (",simple_class,")"].join(''));
var format = goog.string.format;
var G__33036 = phase;
var G__33036__$1 = (((G__33036 instanceof cljs.core.Keyword))?G__33036.fqn:null);
switch (G__33036__$1) {
case "read-source":
return format.call(null,"Syntax error reading source at (%s).\n%s\n",loc,cause);

break;
case "macro-syntax-check":
return format.call(null,"Syntax error macroexpanding %sat (%s).\n%s",(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,(cljs.core.truth_(spec)?(function (){var sb__4661__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__33037_33046 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__33038_33047 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__33039_33048 = true;
var _STAR_print_fn_STAR__temp_val__33040_33049 = ((function (_STAR_print_newline_STAR__orig_val__33037_33046,_STAR_print_fn_STAR__orig_val__33038_33047,_STAR_print_newline_STAR__temp_val__33039_33048,sb__4661__auto__,G__33036,G__33036__$1,loc,class_name,simple_class,cause_type,format,map__33034,map__33034__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec){
return (function (x__4662__auto__){
return sb__4661__auto__.append(x__4662__auto__);
});})(_STAR_print_newline_STAR__orig_val__33037_33046,_STAR_print_fn_STAR__orig_val__33038_33047,_STAR_print_newline_STAR__temp_val__33039_33048,sb__4661__auto__,G__33036,G__33036__$1,loc,class_name,simple_class,cause_type,format,map__33034,map__33034__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec))
;
cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__33039_33048;

cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__33040_33049;

try{cljs.spec.alpha.explain_out.call(null,cljs.core.update.call(null,spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),((function (_STAR_print_newline_STAR__orig_val__33037_33046,_STAR_print_fn_STAR__orig_val__33038_33047,_STAR_print_newline_STAR__temp_val__33039_33048,_STAR_print_fn_STAR__temp_val__33040_33049,sb__4661__auto__,G__33036,G__33036__$1,loc,class_name,simple_class,cause_type,format,map__33034,map__33034__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec){
return (function (probs){
return cljs.core.map.call(null,((function (_STAR_print_newline_STAR__orig_val__33037_33046,_STAR_print_fn_STAR__orig_val__33038_33047,_STAR_print_newline_STAR__temp_val__33039_33048,_STAR_print_fn_STAR__temp_val__33040_33049,sb__4661__auto__,G__33036,G__33036__$1,loc,class_name,simple_class,cause_type,format,map__33034,map__33034__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec){
return (function (p1__33031_SHARP_){
return cljs.core.dissoc.call(null,p1__33031_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
});})(_STAR_print_newline_STAR__orig_val__33037_33046,_STAR_print_fn_STAR__orig_val__33038_33047,_STAR_print_newline_STAR__temp_val__33039_33048,_STAR_print_fn_STAR__temp_val__33040_33049,sb__4661__auto__,G__33036,G__33036__$1,loc,class_name,simple_class,cause_type,format,map__33034,map__33034__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec))
,probs);
});})(_STAR_print_newline_STAR__orig_val__33037_33046,_STAR_print_fn_STAR__orig_val__33038_33047,_STAR_print_newline_STAR__temp_val__33039_33048,_STAR_print_fn_STAR__temp_val__33040_33049,sb__4661__auto__,G__33036,G__33036__$1,loc,class_name,simple_class,cause_type,format,map__33034,map__33034__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec))
)
);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__33038_33047;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__33037_33046;
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4661__auto__);
})():format.call(null,"%s\n",cause)));

break;
case "macroexpansion":
return format.call(null,"Unexpected error%s macroexpanding %sat (%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);

break;
case "compile-syntax-check":
return format.call(null,"Syntax error%s compiling %sat (%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);

break;
case "compilation":
return format.call(null,"Unexpected error%s compiling %sat (%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);

break;
case "read-eval-result":
return format.call(null,"Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause);

break;
case "print-eval-result":
return format.call(null,"Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause);

break;
case "execution":
if(cljs.core.truth_(spec)){
return format.call(null,"Execution error - invalid arguments to %s at (%s).\n%s",symbol,loc,(function (){var sb__4661__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__33041_33050 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__33042_33051 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__33043_33052 = true;
var _STAR_print_fn_STAR__temp_val__33044_33053 = ((function (_STAR_print_newline_STAR__orig_val__33041_33050,_STAR_print_fn_STAR__orig_val__33042_33051,_STAR_print_newline_STAR__temp_val__33043_33052,sb__4661__auto__,G__33036,G__33036__$1,loc,class_name,simple_class,cause_type,format,map__33034,map__33034__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec){
return (function (x__4662__auto__){
return sb__4661__auto__.append(x__4662__auto__);
});})(_STAR_print_newline_STAR__orig_val__33041_33050,_STAR_print_fn_STAR__orig_val__33042_33051,_STAR_print_newline_STAR__temp_val__33043_33052,sb__4661__auto__,G__33036,G__33036__$1,loc,class_name,simple_class,cause_type,format,map__33034,map__33034__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec))
;
cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__33043_33052;

cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__33044_33053;

try{cljs.spec.alpha.explain_out.call(null,cljs.core.update.call(null,spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),((function (_STAR_print_newline_STAR__orig_val__33041_33050,_STAR_print_fn_STAR__orig_val__33042_33051,_STAR_print_newline_STAR__temp_val__33043_33052,_STAR_print_fn_STAR__temp_val__33044_33053,sb__4661__auto__,G__33036,G__33036__$1,loc,class_name,simple_class,cause_type,format,map__33034,map__33034__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec){
return (function (probs){
return cljs.core.map.call(null,((function (_STAR_print_newline_STAR__orig_val__33041_33050,_STAR_print_fn_STAR__orig_val__33042_33051,_STAR_print_newline_STAR__temp_val__33043_33052,_STAR_print_fn_STAR__temp_val__33044_33053,sb__4661__auto__,G__33036,G__33036__$1,loc,class_name,simple_class,cause_type,format,map__33034,map__33034__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec){
return (function (p1__33032_SHARP_){
return cljs.core.dissoc.call(null,p1__33032_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
});})(_STAR_print_newline_STAR__orig_val__33041_33050,_STAR_print_fn_STAR__orig_val__33042_33051,_STAR_print_newline_STAR__temp_val__33043_33052,_STAR_print_fn_STAR__temp_val__33044_33053,sb__4661__auto__,G__33036,G__33036__$1,loc,class_name,simple_class,cause_type,format,map__33034,map__33034__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec))
,probs);
});})(_STAR_print_newline_STAR__orig_val__33041_33050,_STAR_print_fn_STAR__orig_val__33042_33051,_STAR_print_newline_STAR__temp_val__33043_33052,_STAR_print_fn_STAR__temp_val__33044_33053,sb__4661__auto__,G__33036,G__33036__$1,loc,class_name,simple_class,cause_type,format,map__33034,map__33034__$1,triage_data,phase,source,line,column,symbol,class$,cause,spec))
)
);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__33042_33051;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__33041_33050;
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4661__auto__);
})());
} else {
return format.call(null,"Execution error%s at %s(%s).\n%s\n",cause_type,(cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):""),loc,cause);
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__33036__$1)].join('')));

}
});
cljs.repl.error__GT_str = (function cljs$repl$error__GT_str(error){
return cljs.repl.ex_str.call(null,cljs.repl.ex_triage.call(null,cljs.repl.Error__GT_map.call(null,error)));
});

//# sourceMappingURL=repl.js.map?rel=1567785978753
