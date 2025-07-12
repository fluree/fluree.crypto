// Compiled by ClojureScript 1.10.520 {:static-fns false, :optimize-constants false}
goog.provide('figwheel.client');
goog.require('cljs.core');
goog.require('goog.Uri');
goog.require('goog.userAgent.product');
goog.require('goog.object');
goog.require('cljs.reader');
goog.require('cljs.core.async');
goog.require('figwheel.client.socket');
goog.require('figwheel.client.utils');
goog.require('figwheel.client.heads_up');
goog.require('figwheel.client.file_reloading');
goog.require('clojure.string');
goog.require('cljs.repl');
figwheel.client._figwheel_version_ = "0.5.18";
figwheel.client.js_stringify = (((((typeof JSON !== 'undefined')) && ((!((JSON.stringify == null))))))?(function (x){
return ["#js ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(JSON.stringify(x,null," "))].join('');
}):(function (x){
try{return cljs.core.str.cljs$core$IFn$_invoke$arity$1(x);
}catch (e33911){if((e33911 instanceof Error)){
var e = e33911;
return "Error: Unable to stringify";
} else {
throw e33911;

}
}}));
figwheel.client.figwheel_repl_print = (function figwheel$client$figwheel_repl_print(var_args){
var G__33914 = arguments.length;
switch (G__33914) {
case 2:
return figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$2 = (function (stream,args){
figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),"figwheel-repl-print",new cljs.core.Keyword(null,"content","content",15833224),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"stream","stream",1534941648),stream,new cljs.core.Keyword(null,"args","args",1315556576),cljs.core.mapv.call(null,(function (p1__33912_SHARP_){
if(typeof p1__33912_SHARP_ === 'string'){
return p1__33912_SHARP_;
} else {
return figwheel.client.js_stringify.call(null,p1__33912_SHARP_);
}
}),args)], null)], null));

return null;
});

figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$1 = (function (args){
return figwheel.client.figwheel_repl_print.call(null,new cljs.core.Keyword(null,"out","out",-910545517),args);
});

figwheel.client.figwheel_repl_print.cljs$lang$maxFixedArity = 2;

figwheel.client.console_out_print = (function figwheel$client$console_out_print(args){
return console.log.apply(console,cljs.core.into_array.call(null,args));
});
figwheel.client.console_err_print = (function figwheel$client$console_err_print(args){
return console.error.apply(console,cljs.core.into_array.call(null,args));
});
figwheel.client.repl_out_print_fn = (function figwheel$client$repl_out_print_fn(var_args){
var args__4736__auto__ = [];
var len__4730__auto___33917 = arguments.length;
var i__4731__auto___33918 = (0);
while(true){
if((i__4731__auto___33918 < len__4730__auto___33917)){
args__4736__auto__.push((arguments[i__4731__auto___33918]));

var G__33919 = (i__4731__auto___33918 + (1));
i__4731__auto___33918 = G__33919;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((0) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((0)),(0),null)):null);
return figwheel.client.repl_out_print_fn.cljs$core$IFn$_invoke$arity$variadic(argseq__4737__auto__);
});

figwheel.client.repl_out_print_fn.cljs$core$IFn$_invoke$arity$variadic = (function (args){
figwheel.client.console_out_print.call(null,args);

figwheel.client.figwheel_repl_print.call(null,new cljs.core.Keyword(null,"out","out",-910545517),args);

return null;
});

figwheel.client.repl_out_print_fn.cljs$lang$maxFixedArity = (0);

/** @this {Function} */
figwheel.client.repl_out_print_fn.cljs$lang$applyTo = (function (seq33916){
var self__4718__auto__ = this;
return self__4718__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq33916));
});

figwheel.client.repl_err_print_fn = (function figwheel$client$repl_err_print_fn(var_args){
var args__4736__auto__ = [];
var len__4730__auto___33921 = arguments.length;
var i__4731__auto___33922 = (0);
while(true){
if((i__4731__auto___33922 < len__4730__auto___33921)){
args__4736__auto__.push((arguments[i__4731__auto___33922]));

var G__33923 = (i__4731__auto___33922 + (1));
i__4731__auto___33922 = G__33923;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((0) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((0)),(0),null)):null);
return figwheel.client.repl_err_print_fn.cljs$core$IFn$_invoke$arity$variadic(argseq__4737__auto__);
});

figwheel.client.repl_err_print_fn.cljs$core$IFn$_invoke$arity$variadic = (function (args){
figwheel.client.console_err_print.call(null,args);

figwheel.client.figwheel_repl_print.call(null,new cljs.core.Keyword(null,"err","err",-2089457205),args);

return null;
});

figwheel.client.repl_err_print_fn.cljs$lang$maxFixedArity = (0);

/** @this {Function} */
figwheel.client.repl_err_print_fn.cljs$lang$applyTo = (function (seq33920){
var self__4718__auto__ = this;
return self__4718__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq33920));
});

figwheel.client.enable_repl_print_BANG_ = (function figwheel$client$enable_repl_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core.set_print_fn_BANG_.call(null,figwheel.client.repl_out_print_fn);

cljs.core.set_print_err_fn_BANG_.call(null,figwheel.client.repl_err_print_fn);

return null;
});
figwheel.client.autoload_QMARK_ = (function figwheel$client$autoload_QMARK_(){
return figwheel.client.utils.persistent_config_get.call(null,new cljs.core.Keyword(null,"figwheel-autoload","figwheel-autoload",-2044741728),true);
});
figwheel.client.toggle_autoload = (function figwheel$client$toggle_autoload(){
var res = figwheel.client.utils.persistent_config_set_BANG_.call(null,new cljs.core.Keyword(null,"figwheel-autoload","figwheel-autoload",-2044741728),cljs.core.not.call(null,figwheel.client.autoload_QMARK_.call(null)));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),"Toggle autoload deprecated! Use (figwheel.client/set-autoload! false)");

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),["Figwheel autoloading ",(cljs.core.truth_(figwheel.client.autoload_QMARK_.call(null))?"ON":"OFF")].join(''));

return res;
});
goog.exportSymbol('figwheel.client.toggle_autoload', figwheel.client.toggle_autoload);
/**
 * Figwheel by default loads code changes as you work. Sometimes you
 *   just want to work on your code without the ramifications of
 *   autoloading and simply load your code piecemeal in the REPL. You can
 *   turn autoloading on and of with this method.
 * 
 *   (figwheel.client/set-autoload false)
 * 
 *   NOTE: This is a persistent setting, meaning that it will persist
 *   through browser reloads.
 */
figwheel.client.set_autoload = (function figwheel$client$set_autoload(b){
if(((b === true) || (b === false))){
} else {
throw (new Error("Assert failed: (or (true? b) (false? b))"));
}

return figwheel.client.utils.persistent_config_set_BANG_.call(null,new cljs.core.Keyword(null,"figwheel-autoload","figwheel-autoload",-2044741728),b);
});
goog.exportSymbol('figwheel.client.set_autoload', figwheel.client.set_autoload);
figwheel.client.repl_pprint = (function figwheel$client$repl_pprint(){
return figwheel.client.utils.persistent_config_get.call(null,new cljs.core.Keyword(null,"figwheel-repl-pprint","figwheel-repl-pprint",1076150873),true);
});
goog.exportSymbol('figwheel.client.repl_pprint', figwheel.client.repl_pprint);
/**
 * This method gives you the ability to turn the pretty printing of
 *   the REPL's return value on and off.
 * 
 *   (figwheel.client/set-repl-pprint false)
 * 
 *   NOTE: This is a persistent setting, meaning that it will persist
 *   through browser reloads.
 */
figwheel.client.set_repl_pprint = (function figwheel$client$set_repl_pprint(b){
if(((b === true) || (b === false))){
} else {
throw (new Error("Assert failed: (or (true? b) (false? b))"));
}

return figwheel.client.utils.persistent_config_set_BANG_.call(null,new cljs.core.Keyword(null,"figwheel-repl-pprint","figwheel-repl-pprint",1076150873),b);
});
goog.exportSymbol('figwheel.client.set_repl_pprint', figwheel.client.set_repl_pprint);
figwheel.client.repl_result_pr_str = (function figwheel$client$repl_result_pr_str(v){
if(cljs.core.truth_(figwheel.client.repl_pprint.call(null))){
return figwheel.client.utils.pprint_to_string.call(null,v);
} else {
return cljs.core.pr_str.call(null,v);
}
});
goog.exportSymbol('figwheel.client.repl_result_pr_str', figwheel.client.repl_result_pr_str);
figwheel.client.get_essential_messages = (function figwheel$client$get_essential_messages(ed){
if(cljs.core.truth_(ed)){
return cljs.core.cons.call(null,cljs.core.select_keys.call(null,ed,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"message","message",-406056002),new cljs.core.Keyword(null,"class","class",-2030961996)], null)),figwheel.client.get_essential_messages.call(null,new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(ed)));
} else {
return null;
}
});
figwheel.client.error_msg_format = (function figwheel$client$error_msg_format(p__33924){
var map__33925 = p__33924;
var map__33925__$1 = (((((!((map__33925 == null))))?(((((map__33925.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__33925.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__33925):map__33925);
var message = cljs.core.get.call(null,map__33925__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var class$ = cljs.core.get.call(null,map__33925__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(class$)," : ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(message)].join('');
});
figwheel.client.format_messages = cljs.core.comp.call(null,cljs.core.partial.call(null,cljs.core.map,figwheel.client.error_msg_format),figwheel.client.get_essential_messages);
figwheel.client.focus_msgs = (function figwheel$client$focus_msgs(name_set,msg_hist){
return cljs.core.cons.call(null,cljs.core.first.call(null,msg_hist),cljs.core.filter.call(null,cljs.core.comp.call(null,name_set,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863)),cljs.core.rest.call(null,msg_hist)));
});
figwheel.client.reload_file_QMARK__STAR_ = (function figwheel$client$reload_file_QMARK__STAR_(msg_name,opts){
var or__4131__auto__ = new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.not_EQ_.call(null,msg_name,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356));
}
});
figwheel.client.reload_file_state_QMARK_ = (function figwheel$client$reload_file_state_QMARK_(msg_names,opts){
var and__4120__auto__ = cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563));
if(and__4120__auto__){
return figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts);
} else {
return and__4120__auto__;
}
});
figwheel.client.block_reload_file_state_QMARK_ = (function figwheel$client$block_reload_file_state_QMARK_(msg_names,opts){
return ((cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563))) && (cljs.core.not.call(null,figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts))));
});
figwheel.client.warning_append_state_QMARK_ = (function figwheel$client$warning_append_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.warning_state_QMARK_ = (function figwheel$client$warning_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),cljs.core.first.call(null,msg_names));
});
figwheel.client.rewarning_state_QMARK_ = (function figwheel$client$rewarning_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(3),msg_names));
});
figwheel.client.compile_fail_state_QMARK_ = (function figwheel$client$compile_fail_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),cljs.core.first.call(null,msg_names));
});
figwheel.client.compile_refail_state_QMARK_ = (function figwheel$client$compile_refail_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.css_loaded_state_QMARK_ = (function figwheel$client$css_loaded_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874),cljs.core.first.call(null,msg_names));
});
figwheel.client.file_reloader_plugin = (function figwheel$client$file_reloader_plugin(opts){
var ch = cljs.core.async.chan.call(null);
var c__23368__auto___34004 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto___34004,ch){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto___34004,ch){
return (function (state_33976){
var state_val_33977 = (state_33976[(1)]);
if((state_val_33977 === (7))){
var inst_33972 = (state_33976[(2)]);
var state_33976__$1 = state_33976;
var statearr_33978_34005 = state_33976__$1;
(statearr_33978_34005[(2)] = inst_33972);

(statearr_33978_34005[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33977 === (1))){
var state_33976__$1 = state_33976;
var statearr_33979_34006 = state_33976__$1;
(statearr_33979_34006[(2)] = null);

(statearr_33979_34006[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33977 === (4))){
var inst_33929 = (state_33976[(7)]);
var inst_33929__$1 = (state_33976[(2)]);
var state_33976__$1 = (function (){var statearr_33980 = state_33976;
(statearr_33980[(7)] = inst_33929__$1);

return statearr_33980;
})();
if(cljs.core.truth_(inst_33929__$1)){
var statearr_33981_34007 = state_33976__$1;
(statearr_33981_34007[(1)] = (5));

} else {
var statearr_33982_34008 = state_33976__$1;
(statearr_33982_34008[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33977 === (15))){
var inst_33936 = (state_33976[(8)]);
var inst_33951 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_33936);
var inst_33952 = cljs.core.first.call(null,inst_33951);
var inst_33953 = new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(inst_33952);
var inst_33954 = ["Figwheel: Not loading code with warnings - ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_33953)].join('');
var inst_33955 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),inst_33954);
var state_33976__$1 = state_33976;
var statearr_33983_34009 = state_33976__$1;
(statearr_33983_34009[(2)] = inst_33955);

(statearr_33983_34009[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33977 === (13))){
var inst_33960 = (state_33976[(2)]);
var state_33976__$1 = state_33976;
var statearr_33984_34010 = state_33976__$1;
(statearr_33984_34010[(2)] = inst_33960);

(statearr_33984_34010[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33977 === (6))){
var state_33976__$1 = state_33976;
var statearr_33985_34011 = state_33976__$1;
(statearr_33985_34011[(2)] = null);

(statearr_33985_34011[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33977 === (17))){
var inst_33958 = (state_33976[(2)]);
var state_33976__$1 = state_33976;
var statearr_33986_34012 = state_33976__$1;
(statearr_33986_34012[(2)] = inst_33958);

(statearr_33986_34012[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33977 === (3))){
var inst_33974 = (state_33976[(2)]);
var state_33976__$1 = state_33976;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_33976__$1,inst_33974);
} else {
if((state_val_33977 === (12))){
var inst_33935 = (state_33976[(9)]);
var inst_33949 = figwheel.client.block_reload_file_state_QMARK_.call(null,inst_33935,opts);
var state_33976__$1 = state_33976;
if(inst_33949){
var statearr_33987_34013 = state_33976__$1;
(statearr_33987_34013[(1)] = (15));

} else {
var statearr_33988_34014 = state_33976__$1;
(statearr_33988_34014[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33977 === (2))){
var state_33976__$1 = state_33976;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_33976__$1,(4),ch);
} else {
if((state_val_33977 === (11))){
var inst_33936 = (state_33976[(8)]);
var inst_33941 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_33942 = figwheel.client.file_reloading.reload_js_files.call(null,opts,inst_33936);
var inst_33943 = cljs.core.async.timeout.call(null,(1000));
var inst_33944 = [inst_33942,inst_33943];
var inst_33945 = (new cljs.core.PersistentVector(null,2,(5),inst_33941,inst_33944,null));
var state_33976__$1 = state_33976;
return cljs.core.async.ioc_alts_BANG_.call(null,state_33976__$1,(14),inst_33945);
} else {
if((state_val_33977 === (9))){
var inst_33936 = (state_33976[(8)]);
var inst_33962 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),"Figwheel: code autoloading is OFF");
var inst_33963 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_33936);
var inst_33964 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_33963);
var inst_33965 = ["Not loading: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(inst_33964)].join('');
var inst_33966 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),inst_33965);
var state_33976__$1 = (function (){var statearr_33989 = state_33976;
(statearr_33989[(10)] = inst_33962);

return statearr_33989;
})();
var statearr_33990_34015 = state_33976__$1;
(statearr_33990_34015[(2)] = inst_33966);

(statearr_33990_34015[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33977 === (5))){
var inst_33929 = (state_33976[(7)]);
var inst_33931 = [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null];
var inst_33932 = (new cljs.core.PersistentArrayMap(null,2,inst_33931,null));
var inst_33933 = (new cljs.core.PersistentHashSet(null,inst_33932,null));
var inst_33934 = figwheel.client.focus_msgs.call(null,inst_33933,inst_33929);
var inst_33935 = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),inst_33934);
var inst_33936 = cljs.core.first.call(null,inst_33934);
var inst_33937 = figwheel.client.autoload_QMARK_.call(null);
var state_33976__$1 = (function (){var statearr_33991 = state_33976;
(statearr_33991[(9)] = inst_33935);

(statearr_33991[(8)] = inst_33936);

return statearr_33991;
})();
if(cljs.core.truth_(inst_33937)){
var statearr_33992_34016 = state_33976__$1;
(statearr_33992_34016[(1)] = (8));

} else {
var statearr_33993_34017 = state_33976__$1;
(statearr_33993_34017[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33977 === (14))){
var inst_33947 = (state_33976[(2)]);
var state_33976__$1 = state_33976;
var statearr_33994_34018 = state_33976__$1;
(statearr_33994_34018[(2)] = inst_33947);

(statearr_33994_34018[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33977 === (16))){
var state_33976__$1 = state_33976;
var statearr_33995_34019 = state_33976__$1;
(statearr_33995_34019[(2)] = null);

(statearr_33995_34019[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33977 === (10))){
var inst_33968 = (state_33976[(2)]);
var state_33976__$1 = (function (){var statearr_33996 = state_33976;
(statearr_33996[(11)] = inst_33968);

return statearr_33996;
})();
var statearr_33997_34020 = state_33976__$1;
(statearr_33997_34020[(2)] = null);

(statearr_33997_34020[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_33977 === (8))){
var inst_33935 = (state_33976[(9)]);
var inst_33939 = figwheel.client.reload_file_state_QMARK_.call(null,inst_33935,opts);
var state_33976__$1 = state_33976;
if(cljs.core.truth_(inst_33939)){
var statearr_33998_34021 = state_33976__$1;
(statearr_33998_34021[(1)] = (11));

} else {
var statearr_33999_34022 = state_33976__$1;
(statearr_33999_34022[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__23368__auto___34004,ch))
;
return ((function (switch__23201__auto__,c__23368__auto___34004,ch){
return (function() {
var figwheel$client$file_reloader_plugin_$_state_machine__23202__auto__ = null;
var figwheel$client$file_reloader_plugin_$_state_machine__23202__auto____0 = (function (){
var statearr_34000 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_34000[(0)] = figwheel$client$file_reloader_plugin_$_state_machine__23202__auto__);

(statearr_34000[(1)] = (1));

return statearr_34000;
});
var figwheel$client$file_reloader_plugin_$_state_machine__23202__auto____1 = (function (state_33976){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_33976);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e34001){if((e34001 instanceof Object)){
var ex__23205__auto__ = e34001;
var statearr_34002_34023 = state_33976;
(statearr_34002_34023[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_33976);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34001;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34024 = state_33976;
state_33976 = G__34024;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
figwheel$client$file_reloader_plugin_$_state_machine__23202__auto__ = function(state_33976){
switch(arguments.length){
case 0:
return figwheel$client$file_reloader_plugin_$_state_machine__23202__auto____0.call(this);
case 1:
return figwheel$client$file_reloader_plugin_$_state_machine__23202__auto____1.call(this,state_33976);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloader_plugin_$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloader_plugin_$_state_machine__23202__auto____0;
figwheel$client$file_reloader_plugin_$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloader_plugin_$_state_machine__23202__auto____1;
return figwheel$client$file_reloader_plugin_$_state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto___34004,ch))
})();
var state__23370__auto__ = (function (){var statearr_34003 = f__23369__auto__.call(null);
(statearr_34003[(6)] = c__23368__auto___34004);

return statearr_34003;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto___34004,ch))
);


return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.truncate_stack_trace = (function figwheel$client$truncate_stack_trace(stack_str){
return cljs.core.take_while.call(null,(function (p1__34025_SHARP_){
return cljs.core.not.call(null,cljs.core.re_matches.call(null,/.*eval_javascript_STAR__STAR_.*/,p1__34025_SHARP_));
}),clojure.string.split_lines.call(null,stack_str));
});
figwheel.client.get_ua_product = (function figwheel$client$get_ua_product(){
if(figwheel.client.utils.node_env_QMARK_.call(null)){
return new cljs.core.Keyword(null,"chrome","chrome",1718738387);
} else {
if(cljs.core.truth_(goog.userAgent.product.SAFARI)){
return new cljs.core.Keyword(null,"safari","safari",497115653);
} else {
if(cljs.core.truth_(goog.userAgent.product.CHROME)){
return new cljs.core.Keyword(null,"chrome","chrome",1718738387);
} else {
if(cljs.core.truth_(goog.userAgent.product.FIREFOX)){
return new cljs.core.Keyword(null,"firefox","firefox",1283768880);
} else {
if(cljs.core.truth_(goog.userAgent.product.IE)){
return new cljs.core.Keyword(null,"ie","ie",2038473780);
} else {
return null;
}
}
}
}
}
});
var base_path_34031 = figwheel.client.utils.base_url_path.call(null);
figwheel.client.eval_javascript_STAR__STAR_ = ((function (base_path_34031){
return (function figwheel$client$eval_javascript_STAR__STAR_(code,opts,result_handler){
try{var sb = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__34027 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__34028 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__34029 = true;
var _STAR_print_fn_STAR__temp_val__34030 = ((function (_STAR_print_newline_STAR__orig_val__34027,_STAR_print_fn_STAR__orig_val__34028,_STAR_print_newline_STAR__temp_val__34029,sb,base_path_34031){
return (function (x){
return sb.append(x);
});})(_STAR_print_newline_STAR__orig_val__34027,_STAR_print_fn_STAR__orig_val__34028,_STAR_print_newline_STAR__temp_val__34029,sb,base_path_34031))
;
cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__34029;

cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__34030;

try{var result_value = figwheel.client.utils.eval_helper.call(null,code,opts);
var result_value__$1 = (((!(typeof result_value === 'string')))?cljs.core.pr_str.call(null,result_value):result_value);
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"success","success",1890645906),new cljs.core.Keyword(null,"out","out",-910545517),cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),result_value__$1], null));
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__34028;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__34027;
}}catch (e34026){if((e34026 instanceof Error)){
var e = e34026;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),clojure.string.join.call(null,"\n",figwheel.client.truncate_stack_trace.call(null,e.stack)),new cljs.core.Keyword(null,"base-path","base-path",495760020),base_path_34031], null));
} else {
var e = e34026;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),"No stacktrace available."], null));

}
}});})(base_path_34031))
;
/**
 * The REPL can disconnect and reconnect lets ensure cljs.user exists at least.
 */
figwheel.client.ensure_cljs_user = (function figwheel$client$ensure_cljs_user(){
if(cljs.core.truth_(cljs.user)){
return null;
} else {
return cljs.user = ({});
}
});
figwheel.client.repl_plugin = (function figwheel$client$repl_plugin(p__34032){
var map__34033 = p__34032;
var map__34033__$1 = (((((!((map__34033 == null))))?(((((map__34033.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__34033.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34033):map__34033);
var opts = map__34033__$1;
var build_id = cljs.core.get.call(null,map__34033__$1,new cljs.core.Keyword(null,"build-id","build-id",1642831089));
return ((function (map__34033,map__34033__$1,opts,build_id){
return (function (p__34035){
var vec__34036 = p__34035;
var seq__34037 = cljs.core.seq.call(null,vec__34036);
var first__34038 = cljs.core.first.call(null,seq__34037);
var seq__34037__$1 = cljs.core.next.call(null,seq__34037);
var map__34039 = first__34038;
var map__34039__$1 = (((((!((map__34039 == null))))?(((((map__34039.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__34039.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34039):map__34039);
var msg = map__34039__$1;
var msg_name = cljs.core.get.call(null,map__34039__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = seq__34037__$1;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"repl-eval","repl-eval",-1784727398),msg_name)){
figwheel.client.ensure_cljs_user.call(null);

return figwheel.client.eval_javascript_STAR__STAR_.call(null,new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(msg),opts,((function (vec__34036,seq__34037,first__34038,seq__34037__$1,map__34039,map__34039__$1,msg,msg_name,_,map__34033,map__34033__$1,opts,build_id){
return (function (res){
return figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),new cljs.core.Keyword(null,"callback-name","callback-name",336964714).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"content","content",15833224),res], null));
});})(vec__34036,seq__34037,first__34038,seq__34037__$1,map__34039,map__34039__$1,msg,msg_name,_,map__34033,map__34033__$1,opts,build_id))
);
} else {
return null;
}
});
;})(map__34033,map__34033__$1,opts,build_id))
});
figwheel.client.css_reloader_plugin = (function figwheel$client$css_reloader_plugin(opts){
return (function (p__34041){
var vec__34042 = p__34041;
var seq__34043 = cljs.core.seq.call(null,vec__34042);
var first__34044 = cljs.core.first.call(null,seq__34043);
var seq__34043__$1 = cljs.core.next.call(null,seq__34043);
var map__34045 = first__34044;
var map__34045__$1 = (((((!((map__34045 == null))))?(((((map__34045.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__34045.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34045):map__34045);
var msg = map__34045__$1;
var msg_name = cljs.core.get.call(null,map__34045__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = seq__34043__$1;
if(cljs.core._EQ_.call(null,msg_name,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874))){
return figwheel.client.file_reloading.reload_css_files.call(null,opts,msg);
} else {
return null;
}
});
});
figwheel.client.compile_fail_warning_plugin = (function figwheel$client$compile_fail_warning_plugin(p__34047){
var map__34048 = p__34047;
var map__34048__$1 = (((((!((map__34048 == null))))?(((((map__34048.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__34048.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34048):map__34048);
var on_compile_warning = cljs.core.get.call(null,map__34048__$1,new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947));
var on_compile_fail = cljs.core.get.call(null,map__34048__$1,new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036));
return ((function (map__34048,map__34048__$1,on_compile_warning,on_compile_fail){
return (function (p__34050){
var vec__34051 = p__34050;
var seq__34052 = cljs.core.seq.call(null,vec__34051);
var first__34053 = cljs.core.first.call(null,seq__34052);
var seq__34052__$1 = cljs.core.next.call(null,seq__34052);
var map__34054 = first__34053;
var map__34054__$1 = (((((!((map__34054 == null))))?(((((map__34054.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__34054.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34054):map__34054);
var msg = map__34054__$1;
var msg_name = cljs.core.get.call(null,map__34054__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = seq__34052__$1;
var pred__34056 = cljs.core._EQ_;
var expr__34057 = msg_name;
if(cljs.core.truth_(pred__34056.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),expr__34057))){
return on_compile_warning.call(null,msg);
} else {
if(cljs.core.truth_(pred__34056.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),expr__34057))){
return on_compile_fail.call(null,msg);
} else {
return null;
}
}
});
;})(map__34048,map__34048__$1,on_compile_warning,on_compile_fail))
});
figwheel.client.auto_jump_to_error = (function figwheel$client$auto_jump_to_error(opts,error){
if(cljs.core.truth_(new cljs.core.Keyword(null,"auto-jump-to-source-on-error","auto-jump-to-source-on-error",-960314920).cljs$core$IFn$_invoke$arity$1(opts))){
return figwheel.client.heads_up.auto_notify_source_file_line.call(null,error);
} else {
return null;
}
});
figwheel.client.heads_up_plugin_msg_handler = (function figwheel$client$heads_up_plugin_msg_handler(opts,msg_hist_SINGLEQUOTE_){
var msg_hist = figwheel.client.focus_msgs.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null], null), null),msg_hist_SINGLEQUOTE_);
var msg_names = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),msg_hist);
var msg = cljs.core.first.call(null,msg_hist);
var c__23368__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto__,msg_hist,msg_names,msg){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto__,msg_hist,msg_names,msg){
return (function (state_34146){
var state_val_34147 = (state_34146[(1)]);
if((state_val_34147 === (7))){
var inst_34066 = (state_34146[(2)]);
var state_34146__$1 = state_34146;
if(cljs.core.truth_(inst_34066)){
var statearr_34148_34195 = state_34146__$1;
(statearr_34148_34195[(1)] = (8));

} else {
var statearr_34149_34196 = state_34146__$1;
(statearr_34149_34196[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (20))){
var inst_34140 = (state_34146[(2)]);
var state_34146__$1 = state_34146;
var statearr_34150_34197 = state_34146__$1;
(statearr_34150_34197[(2)] = inst_34140);

(statearr_34150_34197[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (27))){
var inst_34136 = (state_34146[(2)]);
var state_34146__$1 = state_34146;
var statearr_34151_34198 = state_34146__$1;
(statearr_34151_34198[(2)] = inst_34136);

(statearr_34151_34198[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (1))){
var inst_34059 = figwheel.client.reload_file_state_QMARK_.call(null,msg_names,opts);
var state_34146__$1 = state_34146;
if(cljs.core.truth_(inst_34059)){
var statearr_34152_34199 = state_34146__$1;
(statearr_34152_34199[(1)] = (2));

} else {
var statearr_34153_34200 = state_34146__$1;
(statearr_34153_34200[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (24))){
var inst_34138 = (state_34146[(2)]);
var state_34146__$1 = state_34146;
var statearr_34154_34201 = state_34146__$1;
(statearr_34154_34201[(2)] = inst_34138);

(statearr_34154_34201[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (4))){
var inst_34144 = (state_34146[(2)]);
var state_34146__$1 = state_34146;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_34146__$1,inst_34144);
} else {
if((state_val_34147 === (15))){
var inst_34142 = (state_34146[(2)]);
var state_34146__$1 = state_34146;
var statearr_34155_34202 = state_34146__$1;
(statearr_34155_34202[(2)] = inst_34142);

(statearr_34155_34202[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (21))){
var inst_34095 = (state_34146[(2)]);
var inst_34096 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_34097 = figwheel.client.auto_jump_to_error.call(null,opts,inst_34096);
var state_34146__$1 = (function (){var statearr_34156 = state_34146;
(statearr_34156[(7)] = inst_34095);

return statearr_34156;
})();
var statearr_34157_34203 = state_34146__$1;
(statearr_34157_34203[(2)] = inst_34097);

(statearr_34157_34203[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (31))){
var inst_34125 = figwheel.client.css_loaded_state_QMARK_.call(null,msg_names);
var state_34146__$1 = state_34146;
if(inst_34125){
var statearr_34158_34204 = state_34146__$1;
(statearr_34158_34204[(1)] = (34));

} else {
var statearr_34159_34205 = state_34146__$1;
(statearr_34159_34205[(1)] = (35));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (32))){
var inst_34134 = (state_34146[(2)]);
var state_34146__$1 = state_34146;
var statearr_34160_34206 = state_34146__$1;
(statearr_34160_34206[(2)] = inst_34134);

(statearr_34160_34206[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (33))){
var inst_34121 = (state_34146[(2)]);
var inst_34122 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_34123 = figwheel.client.auto_jump_to_error.call(null,opts,inst_34122);
var state_34146__$1 = (function (){var statearr_34161 = state_34146;
(statearr_34161[(8)] = inst_34121);

return statearr_34161;
})();
var statearr_34162_34207 = state_34146__$1;
(statearr_34162_34207[(2)] = inst_34123);

(statearr_34162_34207[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (13))){
var inst_34080 = figwheel.client.heads_up.clear.call(null);
var state_34146__$1 = state_34146;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34146__$1,(16),inst_34080);
} else {
if((state_val_34147 === (22))){
var inst_34101 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_34102 = figwheel.client.heads_up.append_warning_message.call(null,inst_34101);
var state_34146__$1 = state_34146;
var statearr_34163_34208 = state_34146__$1;
(statearr_34163_34208[(2)] = inst_34102);

(statearr_34163_34208[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (36))){
var inst_34132 = (state_34146[(2)]);
var state_34146__$1 = state_34146;
var statearr_34164_34209 = state_34146__$1;
(statearr_34164_34209[(2)] = inst_34132);

(statearr_34164_34209[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (29))){
var inst_34112 = (state_34146[(2)]);
var inst_34113 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_34114 = figwheel.client.auto_jump_to_error.call(null,opts,inst_34113);
var state_34146__$1 = (function (){var statearr_34165 = state_34146;
(statearr_34165[(9)] = inst_34112);

return statearr_34165;
})();
var statearr_34166_34210 = state_34146__$1;
(statearr_34166_34210[(2)] = inst_34114);

(statearr_34166_34210[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (6))){
var inst_34061 = (state_34146[(10)]);
var state_34146__$1 = state_34146;
var statearr_34167_34211 = state_34146__$1;
(statearr_34167_34211[(2)] = inst_34061);

(statearr_34167_34211[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (28))){
var inst_34108 = (state_34146[(2)]);
var inst_34109 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_34110 = figwheel.client.heads_up.display_warning.call(null,inst_34109);
var state_34146__$1 = (function (){var statearr_34168 = state_34146;
(statearr_34168[(11)] = inst_34108);

return statearr_34168;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34146__$1,(29),inst_34110);
} else {
if((state_val_34147 === (25))){
var inst_34106 = figwheel.client.heads_up.clear.call(null);
var state_34146__$1 = state_34146;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34146__$1,(28),inst_34106);
} else {
if((state_val_34147 === (34))){
var inst_34127 = figwheel.client.heads_up.flash_loaded.call(null);
var state_34146__$1 = state_34146;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34146__$1,(37),inst_34127);
} else {
if((state_val_34147 === (17))){
var inst_34086 = (state_34146[(2)]);
var inst_34087 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_34088 = figwheel.client.auto_jump_to_error.call(null,opts,inst_34087);
var state_34146__$1 = (function (){var statearr_34169 = state_34146;
(statearr_34169[(12)] = inst_34086);

return statearr_34169;
})();
var statearr_34170_34212 = state_34146__$1;
(statearr_34170_34212[(2)] = inst_34088);

(statearr_34170_34212[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (3))){
var inst_34078 = figwheel.client.compile_refail_state_QMARK_.call(null,msg_names);
var state_34146__$1 = state_34146;
if(inst_34078){
var statearr_34171_34213 = state_34146__$1;
(statearr_34171_34213[(1)] = (13));

} else {
var statearr_34172_34214 = state_34146__$1;
(statearr_34172_34214[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (12))){
var inst_34074 = (state_34146[(2)]);
var state_34146__$1 = state_34146;
var statearr_34173_34215 = state_34146__$1;
(statearr_34173_34215[(2)] = inst_34074);

(statearr_34173_34215[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (2))){
var inst_34061 = (state_34146[(10)]);
var inst_34061__$1 = figwheel.client.autoload_QMARK_.call(null);
var state_34146__$1 = (function (){var statearr_34174 = state_34146;
(statearr_34174[(10)] = inst_34061__$1);

return statearr_34174;
})();
if(cljs.core.truth_(inst_34061__$1)){
var statearr_34175_34216 = state_34146__$1;
(statearr_34175_34216[(1)] = (5));

} else {
var statearr_34176_34217 = state_34146__$1;
(statearr_34176_34217[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (23))){
var inst_34104 = figwheel.client.rewarning_state_QMARK_.call(null,msg_names);
var state_34146__$1 = state_34146;
if(inst_34104){
var statearr_34177_34218 = state_34146__$1;
(statearr_34177_34218[(1)] = (25));

} else {
var statearr_34178_34219 = state_34146__$1;
(statearr_34178_34219[(1)] = (26));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (35))){
var state_34146__$1 = state_34146;
var statearr_34179_34220 = state_34146__$1;
(statearr_34179_34220[(2)] = null);

(statearr_34179_34220[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (19))){
var inst_34099 = figwheel.client.warning_append_state_QMARK_.call(null,msg_names);
var state_34146__$1 = state_34146;
if(inst_34099){
var statearr_34180_34221 = state_34146__$1;
(statearr_34180_34221[(1)] = (22));

} else {
var statearr_34181_34222 = state_34146__$1;
(statearr_34181_34222[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (11))){
var inst_34070 = (state_34146[(2)]);
var state_34146__$1 = state_34146;
var statearr_34182_34223 = state_34146__$1;
(statearr_34182_34223[(2)] = inst_34070);

(statearr_34182_34223[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (9))){
var inst_34072 = figwheel.client.heads_up.clear.call(null);
var state_34146__$1 = state_34146;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34146__$1,(12),inst_34072);
} else {
if((state_val_34147 === (5))){
var inst_34063 = new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(opts);
var state_34146__$1 = state_34146;
var statearr_34183_34224 = state_34146__$1;
(statearr_34183_34224[(2)] = inst_34063);

(statearr_34183_34224[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (14))){
var inst_34090 = figwheel.client.compile_fail_state_QMARK_.call(null,msg_names);
var state_34146__$1 = state_34146;
if(inst_34090){
var statearr_34184_34225 = state_34146__$1;
(statearr_34184_34225[(1)] = (18));

} else {
var statearr_34185_34226 = state_34146__$1;
(statearr_34185_34226[(1)] = (19));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (26))){
var inst_34116 = figwheel.client.warning_state_QMARK_.call(null,msg_names);
var state_34146__$1 = state_34146;
if(inst_34116){
var statearr_34186_34227 = state_34146__$1;
(statearr_34186_34227[(1)] = (30));

} else {
var statearr_34187_34228 = state_34146__$1;
(statearr_34187_34228[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (16))){
var inst_34082 = (state_34146[(2)]);
var inst_34083 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_34084 = figwheel.client.heads_up.display_exception.call(null,inst_34083);
var state_34146__$1 = (function (){var statearr_34188 = state_34146;
(statearr_34188[(13)] = inst_34082);

return statearr_34188;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34146__$1,(17),inst_34084);
} else {
if((state_val_34147 === (30))){
var inst_34118 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_34119 = figwheel.client.heads_up.display_warning.call(null,inst_34118);
var state_34146__$1 = state_34146;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34146__$1,(33),inst_34119);
} else {
if((state_val_34147 === (10))){
var inst_34076 = (state_34146[(2)]);
var state_34146__$1 = state_34146;
var statearr_34189_34229 = state_34146__$1;
(statearr_34189_34229[(2)] = inst_34076);

(statearr_34189_34229[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (18))){
var inst_34092 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_34093 = figwheel.client.heads_up.display_exception.call(null,inst_34092);
var state_34146__$1 = state_34146;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34146__$1,(21),inst_34093);
} else {
if((state_val_34147 === (37))){
var inst_34129 = (state_34146[(2)]);
var state_34146__$1 = state_34146;
var statearr_34190_34230 = state_34146__$1;
(statearr_34190_34230[(2)] = inst_34129);

(statearr_34190_34230[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34147 === (8))){
var inst_34068 = figwheel.client.heads_up.flash_loaded.call(null);
var state_34146__$1 = state_34146;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34146__$1,(11),inst_34068);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__23368__auto__,msg_hist,msg_names,msg))
;
return ((function (switch__23201__auto__,c__23368__auto__,msg_hist,msg_names,msg){
return (function() {
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__23202__auto__ = null;
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__23202__auto____0 = (function (){
var statearr_34191 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_34191[(0)] = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__23202__auto__);

(statearr_34191[(1)] = (1));

return statearr_34191;
});
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__23202__auto____1 = (function (state_34146){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_34146);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e34192){if((e34192 instanceof Object)){
var ex__23205__auto__ = e34192;
var statearr_34193_34231 = state_34146;
(statearr_34193_34231[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34146);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34192;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34232 = state_34146;
state_34146 = G__34232;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__23202__auto__ = function(state_34146){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__23202__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__23202__auto____1.call(this,state_34146);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__23202__auto____0;
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__23202__auto____1;
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto__,msg_hist,msg_names,msg))
})();
var state__23370__auto__ = (function (){var statearr_34194 = f__23369__auto__.call(null);
(statearr_34194[(6)] = c__23368__auto__);

return statearr_34194;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto__,msg_hist,msg_names,msg))
);

return c__23368__auto__;
});
figwheel.client.heads_up_plugin = (function figwheel$client$heads_up_plugin(opts){
var ch = cljs.core.async.chan.call(null);
figwheel.client.heads_up_config_options_STAR__STAR_ = opts;

var c__23368__auto___34261 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto___34261,ch){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto___34261,ch){
return (function (state_34247){
var state_val_34248 = (state_34247[(1)]);
if((state_val_34248 === (1))){
var state_34247__$1 = state_34247;
var statearr_34249_34262 = state_34247__$1;
(statearr_34249_34262[(2)] = null);

(statearr_34249_34262[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (2))){
var state_34247__$1 = state_34247;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34247__$1,(4),ch);
} else {
if((state_val_34248 === (3))){
var inst_34245 = (state_34247[(2)]);
var state_34247__$1 = state_34247;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_34247__$1,inst_34245);
} else {
if((state_val_34248 === (4))){
var inst_34235 = (state_34247[(7)]);
var inst_34235__$1 = (state_34247[(2)]);
var state_34247__$1 = (function (){var statearr_34250 = state_34247;
(statearr_34250[(7)] = inst_34235__$1);

return statearr_34250;
})();
if(cljs.core.truth_(inst_34235__$1)){
var statearr_34251_34263 = state_34247__$1;
(statearr_34251_34263[(1)] = (5));

} else {
var statearr_34252_34264 = state_34247__$1;
(statearr_34252_34264[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (5))){
var inst_34235 = (state_34247[(7)]);
var inst_34237 = figwheel.client.heads_up_plugin_msg_handler.call(null,opts,inst_34235);
var state_34247__$1 = state_34247;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34247__$1,(8),inst_34237);
} else {
if((state_val_34248 === (6))){
var state_34247__$1 = state_34247;
var statearr_34253_34265 = state_34247__$1;
(statearr_34253_34265[(2)] = null);

(statearr_34253_34265[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (7))){
var inst_34243 = (state_34247[(2)]);
var state_34247__$1 = state_34247;
var statearr_34254_34266 = state_34247__$1;
(statearr_34254_34266[(2)] = inst_34243);

(statearr_34254_34266[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_34248 === (8))){
var inst_34239 = (state_34247[(2)]);
var state_34247__$1 = (function (){var statearr_34255 = state_34247;
(statearr_34255[(8)] = inst_34239);

return statearr_34255;
})();
var statearr_34256_34267 = state_34247__$1;
(statearr_34256_34267[(2)] = null);

(statearr_34256_34267[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
});})(c__23368__auto___34261,ch))
;
return ((function (switch__23201__auto__,c__23368__auto___34261,ch){
return (function() {
var figwheel$client$heads_up_plugin_$_state_machine__23202__auto__ = null;
var figwheel$client$heads_up_plugin_$_state_machine__23202__auto____0 = (function (){
var statearr_34257 = [null,null,null,null,null,null,null,null,null];
(statearr_34257[(0)] = figwheel$client$heads_up_plugin_$_state_machine__23202__auto__);

(statearr_34257[(1)] = (1));

return statearr_34257;
});
var figwheel$client$heads_up_plugin_$_state_machine__23202__auto____1 = (function (state_34247){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_34247);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e34258){if((e34258 instanceof Object)){
var ex__23205__auto__ = e34258;
var statearr_34259_34268 = state_34247;
(statearr_34259_34268[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34247);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34258;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34269 = state_34247;
state_34247 = G__34269;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_$_state_machine__23202__auto__ = function(state_34247){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_$_state_machine__23202__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_$_state_machine__23202__auto____1.call(this,state_34247);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_$_state_machine__23202__auto____0;
figwheel$client$heads_up_plugin_$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_$_state_machine__23202__auto____1;
return figwheel$client$heads_up_plugin_$_state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto___34261,ch))
})();
var state__23370__auto__ = (function (){var statearr_34260 = f__23369__auto__.call(null);
(statearr_34260[(6)] = c__23368__auto___34261);

return statearr_34260;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto___34261,ch))
);


figwheel.client.heads_up.ensure_container.call(null);

return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.enforce_project_plugin = (function figwheel$client$enforce_project_plugin(opts){
return (function (msg_hist){
if(((1) < cljs.core.count.call(null,cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"project-id","project-id",206449307),cljs.core.take.call(null,(5),msg_hist)))))){
figwheel.client.socket.close_BANG_.call(null);

console.error("Figwheel: message received from different project. Shutting socket down.");

if(cljs.core.truth_(new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(opts))){
var c__23368__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto__){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto__){
return (function (state_34275){
var state_val_34276 = (state_34275[(1)]);
if((state_val_34276 === (1))){
var inst_34270 = cljs.core.async.timeout.call(null,(3000));
var state_34275__$1 = state_34275;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34275__$1,(2),inst_34270);
} else {
if((state_val_34276 === (2))){
var inst_34272 = (state_34275[(2)]);
var inst_34273 = figwheel.client.heads_up.display_system_warning.call(null,"Connection from different project","Shutting connection down!!!!!");
var state_34275__$1 = (function (){var statearr_34277 = state_34275;
(statearr_34277[(7)] = inst_34272);

return statearr_34277;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_34275__$1,inst_34273);
} else {
return null;
}
}
});})(c__23368__auto__))
;
return ((function (switch__23201__auto__,c__23368__auto__){
return (function() {
var figwheel$client$enforce_project_plugin_$_state_machine__23202__auto__ = null;
var figwheel$client$enforce_project_plugin_$_state_machine__23202__auto____0 = (function (){
var statearr_34278 = [null,null,null,null,null,null,null,null];
(statearr_34278[(0)] = figwheel$client$enforce_project_plugin_$_state_machine__23202__auto__);

(statearr_34278[(1)] = (1));

return statearr_34278;
});
var figwheel$client$enforce_project_plugin_$_state_machine__23202__auto____1 = (function (state_34275){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_34275);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e34279){if((e34279 instanceof Object)){
var ex__23205__auto__ = e34279;
var statearr_34280_34282 = state_34275;
(statearr_34280_34282[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34275);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34279;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34283 = state_34275;
state_34275 = G__34283;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
figwheel$client$enforce_project_plugin_$_state_machine__23202__auto__ = function(state_34275){
switch(arguments.length){
case 0:
return figwheel$client$enforce_project_plugin_$_state_machine__23202__auto____0.call(this);
case 1:
return figwheel$client$enforce_project_plugin_$_state_machine__23202__auto____1.call(this,state_34275);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$enforce_project_plugin_$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$enforce_project_plugin_$_state_machine__23202__auto____0;
figwheel$client$enforce_project_plugin_$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$enforce_project_plugin_$_state_machine__23202__auto____1;
return figwheel$client$enforce_project_plugin_$_state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto__))
})();
var state__23370__auto__ = (function (){var statearr_34281 = f__23369__auto__.call(null);
(statearr_34281[(6)] = c__23368__auto__);

return statearr_34281;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto__))
);

return c__23368__auto__;
} else {
return null;
}
} else {
return null;
}
});
});
figwheel.client.enforce_figwheel_version_plugin = (function figwheel$client$enforce_figwheel_version_plugin(opts){
return (function (msg_hist){
var temp__5735__auto__ = new cljs.core.Keyword(null,"figwheel-version","figwheel-version",1409553832).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,msg_hist));
if(cljs.core.truth_(temp__5735__auto__)){
var figwheel_version = temp__5735__auto__;
if(cljs.core.not_EQ_.call(null,figwheel_version,figwheel.client._figwheel_version_)){
figwheel.client.socket.close_BANG_.call(null);

console.error("Figwheel: message received from different version of Figwheel.");

if(cljs.core.truth_(new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(opts))){
var c__23368__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto__,figwheel_version,temp__5735__auto__){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto__,figwheel_version,temp__5735__auto__){
return (function (state_34290){
var state_val_34291 = (state_34290[(1)]);
if((state_val_34291 === (1))){
var inst_34284 = cljs.core.async.timeout.call(null,(2000));
var state_34290__$1 = state_34290;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_34290__$1,(2),inst_34284);
} else {
if((state_val_34291 === (2))){
var inst_34286 = (state_34290[(2)]);
var inst_34287 = ["Figwheel Client Version <strong>",figwheel.client._figwheel_version_,"</strong> is not equal to ","Figwheel Sidecar Version <strong>",cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel_version),"</strong>",".  Shutting down Websocket Connection!","<h4>To fix try:</h4>","<ol><li>Reload this page and make sure you are not getting a cached version of the client.</li>","<li>You may have to clean (delete compiled assets) and rebuild to make sure that the new client code is being used.</li>","<li>Also, make sure you have consistent Figwheel dependencies.</li></ol>"].join('');
var inst_34288 = figwheel.client.heads_up.display_system_warning.call(null,"Figwheel Client and Server have different versions!!",inst_34287);
var state_34290__$1 = (function (){var statearr_34292 = state_34290;
(statearr_34292[(7)] = inst_34286);

return statearr_34292;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_34290__$1,inst_34288);
} else {
return null;
}
}
});})(c__23368__auto__,figwheel_version,temp__5735__auto__))
;
return ((function (switch__23201__auto__,c__23368__auto__,figwheel_version,temp__5735__auto__){
return (function() {
var figwheel$client$enforce_figwheel_version_plugin_$_state_machine__23202__auto__ = null;
var figwheel$client$enforce_figwheel_version_plugin_$_state_machine__23202__auto____0 = (function (){
var statearr_34293 = [null,null,null,null,null,null,null,null];
(statearr_34293[(0)] = figwheel$client$enforce_figwheel_version_plugin_$_state_machine__23202__auto__);

(statearr_34293[(1)] = (1));

return statearr_34293;
});
var figwheel$client$enforce_figwheel_version_plugin_$_state_machine__23202__auto____1 = (function (state_34290){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_34290);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e34294){if((e34294 instanceof Object)){
var ex__23205__auto__ = e34294;
var statearr_34295_34297 = state_34290;
(statearr_34295_34297[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_34290);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e34294;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__34298 = state_34290;
state_34290 = G__34298;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
figwheel$client$enforce_figwheel_version_plugin_$_state_machine__23202__auto__ = function(state_34290){
switch(arguments.length){
case 0:
return figwheel$client$enforce_figwheel_version_plugin_$_state_machine__23202__auto____0.call(this);
case 1:
return figwheel$client$enforce_figwheel_version_plugin_$_state_machine__23202__auto____1.call(this,state_34290);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$enforce_figwheel_version_plugin_$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$enforce_figwheel_version_plugin_$_state_machine__23202__auto____0;
figwheel$client$enforce_figwheel_version_plugin_$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$enforce_figwheel_version_plugin_$_state_machine__23202__auto____1;
return figwheel$client$enforce_figwheel_version_plugin_$_state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto__,figwheel_version,temp__5735__auto__))
})();
var state__23370__auto__ = (function (){var statearr_34296 = f__23369__auto__.call(null);
(statearr_34296[(6)] = c__23368__auto__);

return statearr_34296;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto__,figwheel_version,temp__5735__auto__))
);

return c__23368__auto__;
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
});
});
figwheel.client.default_on_jsload = cljs.core.identity;
figwheel.client.file_line_column = (function figwheel$client$file_line_column(p__34299){
var map__34300 = p__34299;
var map__34300__$1 = (((((!((map__34300 == null))))?(((((map__34300.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__34300.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34300):map__34300);
var file = cljs.core.get.call(null,map__34300__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var line = cljs.core.get.call(null,map__34300__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column = cljs.core.get.call(null,map__34300__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var G__34302 = "";
var G__34302__$1 = (cljs.core.truth_(file)?[G__34302,"file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(file)].join(''):G__34302);
var G__34302__$2 = (cljs.core.truth_(line)?[G__34302__$1," at line ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line)].join(''):G__34302__$1);
if(cljs.core.truth_((function (){var and__4120__auto__ = line;
if(cljs.core.truth_(and__4120__auto__)){
return column;
} else {
return and__4120__auto__;
}
})())){
return [G__34302__$2,", column ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join('');
} else {
return G__34302__$2;
}
});
figwheel.client.default_on_compile_fail = (function figwheel$client$default_on_compile_fail(p__34303){
var map__34304 = p__34303;
var map__34304__$1 = (((((!((map__34304 == null))))?(((((map__34304.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__34304.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34304):map__34304);
var ed = map__34304__$1;
var exception_data = cljs.core.get.call(null,map__34304__$1,new cljs.core.Keyword(null,"exception-data","exception-data",-512474886));
var cause = cljs.core.get.call(null,map__34304__$1,new cljs.core.Keyword(null,"cause","cause",231901252));
var message_34307 = (function (){var G__34306 = cljs.core.apply.call(null,cljs.core.str,"Figwheel: Compile Exception ",figwheel.client.format_messages.call(null,exception_data));
if(cljs.core.truth_(new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(exception_data))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__34306)," Error on ",figwheel.client.file_line_column.call(null,exception_data)].join('');
} else {
return G__34306;
}
})();
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),message_34307);

return ed;
});
figwheel.client.default_on_compile_warning = (function figwheel$client$default_on_compile_warning(p__34308){
var map__34309 = p__34308;
var map__34309__$1 = (((((!((map__34309 == null))))?(((((map__34309.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__34309.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34309):map__34309);
var w = map__34309__$1;
var message = cljs.core.get.call(null,map__34309__$1,new cljs.core.Keyword(null,"message","message",-406056002));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),["Figwheel: Compile Warning - ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(message))," in ",figwheel.client.file_line_column.call(null,message)].join(''));

return w;
});
figwheel.client.default_before_load = (function figwheel$client$default_before_load(files){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: notified of file changes");

return files;
});
figwheel.client.default_on_cssload = (function figwheel$client$default_on_cssload(files){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded CSS files");

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),cljs.core.pr_str.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),files)));

return files;
});
if((typeof figwheel !== 'undefined') && (typeof figwheel.client !== 'undefined') && (typeof figwheel.client.config_defaults !== 'undefined')){
} else {
figwheel.client.config_defaults = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947),new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"reload-dependents","reload-dependents",-956865430),new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036),new cljs.core.Keyword(null,"debug","debug",-1608172596),new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202),new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938),new cljs.core.Keyword(null,"auto-jump-to-source-on-error","auto-jump-to-source-on-error",-960314920),new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128),new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223),new cljs.core.Keyword(null,"eval-fn","eval-fn",-1111644294),new cljs.core.Keyword(null,"retry-count","retry-count",1936122875),new cljs.core.Keyword(null,"autoload","autoload",-354122500),new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318)],[new cljs.core.Var(function(){return figwheel.client.default_on_compile_warning;},new cljs.core.Symbol("figwheel.client","default-on-compile-warning","figwheel.client/default-on-compile-warning",584144208,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[new cljs.core.Symbol(null,"figwheel.client","figwheel.client",-538710252,null),new cljs.core.Symbol(null,"default-on-compile-warning","default-on-compile-warning",-18911586,null),"resources/public/js/out/figwheel/client.cljs",33,1,362,362,cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"message","message",1234475525,null)], null),new cljs.core.Keyword(null,"as","as",1148689641),new cljs.core.Symbol(null,"w","w",1994700528,null)], null)], null)),null,(cljs.core.truth_(figwheel.client.default_on_compile_warning)?figwheel.client.default_on_compile_warning.cljs$lang$test:null)])),figwheel.client.default_on_jsload,true,new cljs.core.Var(function(){return figwheel.client.default_on_compile_fail;},new cljs.core.Symbol("figwheel.client","default-on-compile-fail","figwheel.client/default-on-compile-fail",1384826337,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[new cljs.core.Symbol(null,"figwheel.client","figwheel.client",-538710252,null),new cljs.core.Symbol(null,"default-on-compile-fail","default-on-compile-fail",-158814813,null),"resources/public/js/out/figwheel/client.cljs",30,1,355,355,cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"exception-data","exception-data",1128056641,null),new cljs.core.Symbol(null,"cause","cause",1872432779,null)], null),new cljs.core.Keyword(null,"as","as",1148689641),new cljs.core.Symbol(null,"ed","ed",2076825751,null)], null)], null)),null,(cljs.core.truth_(figwheel.client.default_on_compile_fail)?figwheel.client.default_on_compile_fail.cljs$lang$test:null)])),false,true,["ws://",cljs.core.str.cljs$core$IFn$_invoke$arity$1(((figwheel.client.utils.html_env_QMARK_.call(null))?location.host:"localhost:3449")),"/figwheel-ws"].join(''),false,figwheel.client.default_before_load,false,false,(100),true,figwheel.client.default_on_cssload]);
}
figwheel.client.handle_deprecated_jsload_callback = (function figwheel$client$handle_deprecated_jsload_callback(config){
if(cljs.core.truth_(new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config))){
return cljs.core.dissoc.call(null,cljs.core.assoc.call(null,config,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config)),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369));
} else {
return config;
}
});
figwheel.client.fill_url_template = (function figwheel$client$fill_url_template(config){
if(figwheel.client.utils.html_env_QMARK_.call(null)){
return cljs.core.update_in.call(null,config,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938)], null),(function (x){
return clojure.string.replace.call(null,clojure.string.replace.call(null,x,"[[client-hostname]]",location.hostname),"[[client-port]]",location.port);
}));
} else {
return config;
}
});
figwheel.client.base_plugins = (function figwheel$client$base_plugins(system_options){
var base = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"enforce-project-plugin","enforce-project-plugin",959402899),figwheel.client.enforce_project_plugin,new cljs.core.Keyword(null,"enforce-figwheel-version-plugin","enforce-figwheel-version-plugin",-1916185220),figwheel.client.enforce_figwheel_version_plugin,new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733),figwheel.client.file_reloader_plugin,new cljs.core.Keyword(null,"comp-fail-warning-plugin","comp-fail-warning-plugin",634311),figwheel.client.compile_fail_warning_plugin,new cljs.core.Keyword(null,"css-reloader-plugin","css-reloader-plugin",2002032904),figwheel.client.css_reloader_plugin,new cljs.core.Keyword(null,"repl-plugin","repl-plugin",-1138952371),figwheel.client.repl_plugin], null);
var base__$1 = (((!(figwheel.client.utils.html_env_QMARK_.call(null))))?cljs.core.select_keys.call(null,base,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733),new cljs.core.Keyword(null,"comp-fail-warning-plugin","comp-fail-warning-plugin",634311),new cljs.core.Keyword(null,"repl-plugin","repl-plugin",-1138952371)], null)):base);
var base__$2 = ((new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(system_options) === false)?cljs.core.dissoc.call(null,base__$1,new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733)):base__$1);
if(cljs.core.truth_((function (){var and__4120__auto__ = new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(system_options);
if(cljs.core.truth_(and__4120__auto__)){
return figwheel.client.utils.html_env_QMARK_.call(null);
} else {
return and__4120__auto__;
}
})())){
return cljs.core.assoc.call(null,base__$2,new cljs.core.Keyword(null,"heads-up-display-plugin","heads-up-display-plugin",1745207501),figwheel.client.heads_up_plugin);
} else {
return base__$2;
}
});
figwheel.client.add_message_watch = (function figwheel$client$add_message_watch(key,callback){
return cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,key,(function (_,___$1,___$2,msg_hist){
return callback.call(null,cljs.core.first.call(null,msg_hist));
}));
});
figwheel.client.add_json_message_watch = (function figwheel$client$add_json_message_watch(key,callback){
return figwheel.client.add_message_watch.call(null,key,cljs.core.comp.call(null,callback,cljs.core.clj__GT_js));
});
goog.exportSymbol('figwheel.client.add_json_message_watch', figwheel.client.add_json_message_watch);
figwheel.client.add_plugins = (function figwheel$client$add_plugins(plugins,system_options){
var seq__34311 = cljs.core.seq.call(null,plugins);
var chunk__34312 = null;
var count__34313 = (0);
var i__34314 = (0);
while(true){
if((i__34314 < count__34313)){
var vec__34321 = cljs.core._nth.call(null,chunk__34312,i__34314);
var k = cljs.core.nth.call(null,vec__34321,(0),null);
var plugin = cljs.core.nth.call(null,vec__34321,(1),null);
if(cljs.core.truth_(plugin)){
var pl_34327 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__34311,chunk__34312,count__34313,i__34314,pl_34327,vec__34321,k,plugin){
return (function (_,___$1,___$2,msg_hist){
return pl_34327.call(null,msg_hist);
});})(seq__34311,chunk__34312,count__34313,i__34314,pl_34327,vec__34321,k,plugin))
);
} else {
}


var G__34328 = seq__34311;
var G__34329 = chunk__34312;
var G__34330 = count__34313;
var G__34331 = (i__34314 + (1));
seq__34311 = G__34328;
chunk__34312 = G__34329;
count__34313 = G__34330;
i__34314 = G__34331;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq.call(null,seq__34311);
if(temp__5735__auto__){
var seq__34311__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__34311__$1)){
var c__4550__auto__ = cljs.core.chunk_first.call(null,seq__34311__$1);
var G__34332 = cljs.core.chunk_rest.call(null,seq__34311__$1);
var G__34333 = c__4550__auto__;
var G__34334 = cljs.core.count.call(null,c__4550__auto__);
var G__34335 = (0);
seq__34311 = G__34332;
chunk__34312 = G__34333;
count__34313 = G__34334;
i__34314 = G__34335;
continue;
} else {
var vec__34324 = cljs.core.first.call(null,seq__34311__$1);
var k = cljs.core.nth.call(null,vec__34324,(0),null);
var plugin = cljs.core.nth.call(null,vec__34324,(1),null);
if(cljs.core.truth_(plugin)){
var pl_34336 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__34311,chunk__34312,count__34313,i__34314,pl_34336,vec__34324,k,plugin,seq__34311__$1,temp__5735__auto__){
return (function (_,___$1,___$2,msg_hist){
return pl_34336.call(null,msg_hist);
});})(seq__34311,chunk__34312,count__34313,i__34314,pl_34336,vec__34324,k,plugin,seq__34311__$1,temp__5735__auto__))
);
} else {
}


var G__34337 = cljs.core.next.call(null,seq__34311__$1);
var G__34338 = null;
var G__34339 = (0);
var G__34340 = (0);
seq__34311 = G__34337;
chunk__34312 = G__34338;
count__34313 = G__34339;
i__34314 = G__34340;
continue;
}
} else {
return null;
}
}
break;
}
});
figwheel.client.start = (function figwheel$client$start(var_args){
var G__34342 = arguments.length;
switch (G__34342) {
case 1:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 0:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$0();

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

figwheel.client.start.cljs$core$IFn$_invoke$arity$1 = (function (opts){
if((goog.dependencies_ == null)){
return null;
} else {
if((typeof figwheel !== 'undefined') && (typeof figwheel.client !== 'undefined') && (typeof figwheel.client.__figwheel_start_once__ !== 'undefined')){
return null;
} else {
return (
figwheel.client.__figwheel_start_once__ = setTimeout((function (){
var plugins_SINGLEQUOTE_ = new cljs.core.Keyword(null,"plugins","plugins",1900073717).cljs$core$IFn$_invoke$arity$1(opts);
var merge_plugins = new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370).cljs$core$IFn$_invoke$arity$1(opts);
var system_options = figwheel.client.fill_url_template.call(null,figwheel.client.handle_deprecated_jsload_callback.call(null,cljs.core.merge.call(null,figwheel.client.config_defaults,cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"plugins","plugins",1900073717),new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370)))));
var plugins = (cljs.core.truth_(plugins_SINGLEQUOTE_)?plugins_SINGLEQUOTE_:cljs.core.merge.call(null,figwheel.client.base_plugins.call(null,system_options),merge_plugins));
figwheel.client.utils._STAR_print_debug_STAR_ = new cljs.core.Keyword(null,"debug","debug",-1608172596).cljs$core$IFn$_invoke$arity$1(opts);

figwheel.client.enable_repl_print_BANG_.call(null);

figwheel.client.add_plugins.call(null,plugins,system_options);

figwheel.client.file_reloading.patch_goog_base.call(null);

var seq__34343_34348 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"initial-messages","initial-messages",2057377771).cljs$core$IFn$_invoke$arity$1(system_options));
var chunk__34344_34349 = null;
var count__34345_34350 = (0);
var i__34346_34351 = (0);
while(true){
if((i__34346_34351 < count__34345_34350)){
var msg_34352 = cljs.core._nth.call(null,chunk__34344_34349,i__34346_34351);
figwheel.client.socket.handle_incoming_message.call(null,msg_34352);


var G__34353 = seq__34343_34348;
var G__34354 = chunk__34344_34349;
var G__34355 = count__34345_34350;
var G__34356 = (i__34346_34351 + (1));
seq__34343_34348 = G__34353;
chunk__34344_34349 = G__34354;
count__34345_34350 = G__34355;
i__34346_34351 = G__34356;
continue;
} else {
var temp__5735__auto___34357 = cljs.core.seq.call(null,seq__34343_34348);
if(temp__5735__auto___34357){
var seq__34343_34358__$1 = temp__5735__auto___34357;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__34343_34358__$1)){
var c__4550__auto___34359 = cljs.core.chunk_first.call(null,seq__34343_34358__$1);
var G__34360 = cljs.core.chunk_rest.call(null,seq__34343_34358__$1);
var G__34361 = c__4550__auto___34359;
var G__34362 = cljs.core.count.call(null,c__4550__auto___34359);
var G__34363 = (0);
seq__34343_34348 = G__34360;
chunk__34344_34349 = G__34361;
count__34345_34350 = G__34362;
i__34346_34351 = G__34363;
continue;
} else {
var msg_34364 = cljs.core.first.call(null,seq__34343_34358__$1);
figwheel.client.socket.handle_incoming_message.call(null,msg_34364);


var G__34365 = cljs.core.next.call(null,seq__34343_34358__$1);
var G__34366 = null;
var G__34367 = (0);
var G__34368 = (0);
seq__34343_34348 = G__34365;
chunk__34344_34349 = G__34366;
count__34345_34350 = G__34367;
i__34346_34351 = G__34368;
continue;
}
} else {
}
}
break;
}

return figwheel.client.socket.open.call(null,system_options);
})))
;
}
}
});

figwheel.client.start.cljs$core$IFn$_invoke$arity$0 = (function (){
return figwheel.client.start.call(null,cljs.core.PersistentArrayMap.EMPTY);
});

figwheel.client.start.cljs$lang$maxFixedArity = 1;

figwheel.client.watch_and_reload_with_opts = figwheel.client.start;
figwheel.client.watch_and_reload = (function figwheel$client$watch_and_reload(var_args){
var args__4736__auto__ = [];
var len__4730__auto___34373 = arguments.length;
var i__4731__auto___34374 = (0);
while(true){
if((i__4731__auto___34374 < len__4730__auto___34373)){
args__4736__auto__.push((arguments[i__4731__auto___34374]));

var G__34375 = (i__4731__auto___34374 + (1));
i__4731__auto___34374 = G__34375;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((0) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((0)),(0),null)):null);
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(argseq__4737__auto__);
});

figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic = (function (p__34370){
var map__34371 = p__34370;
var map__34371__$1 = (((((!((map__34371 == null))))?(((((map__34371.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__34371.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34371):map__34371);
var opts = map__34371__$1;
return figwheel.client.start.call(null,opts);
});

figwheel.client.watch_and_reload.cljs$lang$maxFixedArity = (0);

/** @this {Function} */
figwheel.client.watch_and_reload.cljs$lang$applyTo = (function (seq34369){
var self__4718__auto__ = this;
return self__4718__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq34369));
});

figwheel.client.fetch_data_from_env = (function figwheel$client$fetch_data_from_env(){
try{return cljs.reader.read_string.call(null,goog.object.get(window,"FIGWHEEL_CLIENT_CONFIGURATION"));
}catch (e34376){if((e34376 instanceof Error)){
var e = e34376;
cljs.core._STAR_print_err_fn_STAR_.call(null,"Unable to load FIGWHEEL_CLIENT_CONFIGURATION from the environment");

return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"autoload","autoload",-354122500),false], null);
} else {
throw e34376;

}
}});
figwheel.client.console_intro_message = "Figwheel has compiled a temporary helper application to your :output-file.\n\nThe code currently in your configured output file does not\nrepresent the code that you are trying to compile.\n\nThis temporary application is intended to help you continue to get\nfeedback from Figwheel until the build you are working on compiles\ncorrectly.\n\nWhen your ClojureScript source code compiles correctly this helper\napplication will auto-reload and pick up your freshly compiled\nClojureScript program.";
figwheel.client.bad_compile_helper_app = (function figwheel$client$bad_compile_helper_app(){
cljs.core.enable_console_print_BANG_.call(null);

var config = figwheel.client.fetch_data_from_env.call(null);
cljs.core.println.call(null,figwheel.client.console_intro_message);

figwheel.client.heads_up.bad_compile_screen.call(null);

if(cljs.core.truth_(goog.dependencies_)){
} else {
goog.dependencies_ = true;
}

figwheel.client.start.call(null,config);

return figwheel.client.add_message_watch.call(null,new cljs.core.Keyword(null,"listen-for-successful-compile","listen-for-successful-compile",-995277603),((function (config){
return (function (p__34377){
var map__34378 = p__34377;
var map__34378__$1 = (((((!((map__34378 == null))))?(((((map__34378.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__34378.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__34378):map__34378);
var msg_name = cljs.core.get.call(null,map__34378__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
if(cljs.core._EQ_.call(null,msg_name,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563))){
return location.href = location.href;
} else {
return null;
}
});})(config))
);
});

//# sourceMappingURL=client.js.map?rel=1567785979304
