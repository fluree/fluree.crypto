// Compiled by ClojureScript 1.10.520 {:static-fns false, :optimize-constants false}
goog.provide('figwheel.client.file_reloading');
goog.require('cljs.core');
goog.require('figwheel.client.utils');
goog.require('goog.Uri');
goog.require('goog.string');
goog.require('goog.object');
goog.require('goog.net.jsloader');
goog.require('goog.html.legacyconversions');
goog.require('clojure.string');
goog.require('clojure.set');
goog.require('cljs.core.async');
goog.require('goog.async.Deferred');
if((typeof figwheel !== 'undefined') && (typeof figwheel.client !== 'undefined') && (typeof figwheel.client.file_reloading !== 'undefined') && (typeof figwheel.client.file_reloading.figwheel_meta_pragmas !== 'undefined')){
} else {
figwheel.client.file_reloading.figwheel_meta_pragmas = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
figwheel.client.file_reloading.on_jsload_custom_event = (function figwheel$client$file_reloading$on_jsload_custom_event(url){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.js-reload",url);
});
figwheel.client.file_reloading.before_jsload_custom_event = (function figwheel$client$file_reloading$before_jsload_custom_event(files){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.before-js-reload",files);
});
figwheel.client.file_reloading.on_cssload_custom_event = (function figwheel$client$file_reloading$on_cssload_custom_event(files){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.css-reload",files);
});
figwheel.client.file_reloading.namespace_file_map_QMARK_ = (function figwheel$client$file_reloading$namespace_file_map_QMARK_(m){
var or__4131__auto__ = ((cljs.core.map_QMARK_.call(null,m)) && (typeof new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(m) === 'string') && ((((new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(m) == null)) || (typeof new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(m) === 'string'))) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"namespace","namespace",-377510372))));
if(or__4131__auto__){
return or__4131__auto__;
} else {
cljs.core.println.call(null,"Error not namespace-file-map",cljs.core.pr_str.call(null,m));

return false;
}
});
figwheel.client.file_reloading.add_cache_buster = (function figwheel$client$file_reloading$add_cache_buster(url){

return goog.Uri.parse(url).makeUnique();
});
figwheel.client.file_reloading.name__GT_path = (function figwheel$client$file_reloading$name__GT_path(ns){

return goog.object.get(goog.dependencies_.nameToPath,ns);
});
figwheel.client.file_reloading.provided_QMARK_ = (function figwheel$client$file_reloading$provided_QMARK_(ns){
return goog.object.get(goog.dependencies_.written,figwheel.client.file_reloading.name__GT_path.call(null,ns));
});
figwheel.client.file_reloading.immutable_ns_QMARK_ = (function figwheel$client$file_reloading$immutable_ns_QMARK_(name){
var or__4131__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, ["cljs.nodejs",null,"goog",null,"cljs.core",null], null), null).call(null,name);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
var or__4131__auto____$1 = goog.string.startsWith("clojure.",name);
if(cljs.core.truth_(or__4131__auto____$1)){
return or__4131__auto____$1;
} else {
return goog.string.startsWith("goog.",name);
}
}
});
figwheel.client.file_reloading.get_requires = (function figwheel$client$file_reloading$get_requires(ns){
return cljs.core.set.call(null,cljs.core.filter.call(null,(function (p1__30579_SHARP_){
return cljs.core.not.call(null,figwheel.client.file_reloading.immutable_ns_QMARK_.call(null,p1__30579_SHARP_));
}),goog.object.getKeys(goog.object.get(goog.dependencies_.requires,figwheel.client.file_reloading.name__GT_path.call(null,ns)))));
});
if((typeof figwheel !== 'undefined') && (typeof figwheel.client !== 'undefined') && (typeof figwheel.client.file_reloading !== 'undefined') && (typeof figwheel.client.file_reloading.dependency_data !== 'undefined')){
} else {
figwheel.client.file_reloading.dependency_data = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"dependents","dependents",136812837),cljs.core.PersistentArrayMap.EMPTY], null));
}
figwheel.client.file_reloading.path_to_name_BANG_ = (function figwheel$client$file_reloading$path_to_name_BANG_(path,name){
return cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependency_data,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),path], null),cljs.core.fnil.call(null,clojure.set.union,cljs.core.PersistentHashSet.EMPTY),cljs.core.PersistentHashSet.createAsIfByAssoc([name]));
});
/**
 * Setup a path to name dependencies map.
 * That goes from path -> #{ ns-names }
 */
figwheel.client.file_reloading.setup_path__GT_name_BANG_ = (function figwheel$client$file_reloading$setup_path__GT_name_BANG_(){
var nameToPath = goog.object.filter(goog.dependencies_.nameToPath,(function (v,k,o){
return goog.string.startsWith(v,"../");
}));
return goog.object.forEach(nameToPath,((function (nameToPath){
return (function (v,k,o){
return figwheel.client.file_reloading.path_to_name_BANG_.call(null,v,k);
});})(nameToPath))
);
});
/**
 * returns a set of namespaces defined by a path
 */
figwheel.client.file_reloading.path__GT_name = (function figwheel$client$file_reloading$path__GT_name(path){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.dependency_data),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),path], null));
});
figwheel.client.file_reloading.name_to_parent_BANG_ = (function figwheel$client$file_reloading$name_to_parent_BANG_(ns,parent_ns){
return cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependency_data,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dependents","dependents",136812837),ns], null),cljs.core.fnil.call(null,clojure.set.union,cljs.core.PersistentHashSet.EMPTY),cljs.core.PersistentHashSet.createAsIfByAssoc([parent_ns]));
});
/**
 * This reverses the goog.dependencies_.requires for looking up ns-dependents.
 */
figwheel.client.file_reloading.setup_ns__GT_dependents_BANG_ = (function figwheel$client$file_reloading$setup_ns__GT_dependents_BANG_(){
var requires = goog.object.filter(goog.dependencies_.requires,(function (v,k,o){
return goog.string.startsWith(k,"../");
}));
return goog.object.forEach(requires,((function (requires){
return (function (v,k,_){
return goog.object.forEach(v,((function (requires){
return (function (v_SINGLEQUOTE_,k_SINGLEQUOTE_,___$1){
var seq__30580 = cljs.core.seq.call(null,figwheel.client.file_reloading.path__GT_name.call(null,k));
var chunk__30581 = null;
var count__30582 = (0);
var i__30583 = (0);
while(true){
if((i__30583 < count__30582)){
var n = cljs.core._nth.call(null,chunk__30581,i__30583);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);


var G__30584 = seq__30580;
var G__30585 = chunk__30581;
var G__30586 = count__30582;
var G__30587 = (i__30583 + (1));
seq__30580 = G__30584;
chunk__30581 = G__30585;
count__30582 = G__30586;
i__30583 = G__30587;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq.call(null,seq__30580);
if(temp__5735__auto__){
var seq__30580__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__30580__$1)){
var c__4550__auto__ = cljs.core.chunk_first.call(null,seq__30580__$1);
var G__30588 = cljs.core.chunk_rest.call(null,seq__30580__$1);
var G__30589 = c__4550__auto__;
var G__30590 = cljs.core.count.call(null,c__4550__auto__);
var G__30591 = (0);
seq__30580 = G__30588;
chunk__30581 = G__30589;
count__30582 = G__30590;
i__30583 = G__30591;
continue;
} else {
var n = cljs.core.first.call(null,seq__30580__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);


var G__30592 = cljs.core.next.call(null,seq__30580__$1);
var G__30593 = null;
var G__30594 = (0);
var G__30595 = (0);
seq__30580 = G__30592;
chunk__30581 = G__30593;
count__30582 = G__30594;
i__30583 = G__30595;
continue;
}
} else {
return null;
}
}
break;
}
});})(requires))
);
});})(requires))
);
});
figwheel.client.file_reloading.ns__GT_dependents = (function figwheel$client$file_reloading$ns__GT_dependents(ns){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.dependency_data),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dependents","dependents",136812837),ns], null));
});
figwheel.client.file_reloading.in_upper_level_QMARK_ = (function figwheel$client$file_reloading$in_upper_level_QMARK_(topo_state,current_depth,dep){
return cljs.core.some.call(null,(function (p__30596){
var vec__30597 = p__30596;
var _ = cljs.core.nth.call(null,vec__30597,(0),null);
var v = cljs.core.nth.call(null,vec__30597,(1),null);
var and__4120__auto__ = v;
if(cljs.core.truth_(and__4120__auto__)){
return v.call(null,dep);
} else {
return and__4120__auto__;
}
}),cljs.core.filter.call(null,(function (p__30600){
var vec__30601 = p__30600;
var k = cljs.core.nth.call(null,vec__30601,(0),null);
var v = cljs.core.nth.call(null,vec__30601,(1),null);
return (k > current_depth);
}),topo_state));
});
figwheel.client.file_reloading.build_topo_sort = (function figwheel$client$file_reloading$build_topo_sort(get_deps){
var get_deps__$1 = cljs.core.memoize.call(null,get_deps);
var topo_sort_helper_STAR_ = ((function (get_deps__$1){
return (function figwheel$client$file_reloading$build_topo_sort_$_topo_sort_helper_STAR_(x,depth,state){
var deps = get_deps__$1.call(null,x);
if(cljs.core.empty_QMARK_.call(null,deps)){
return null;
} else {
return topo_sort_STAR_.call(null,deps,depth,state);
}
});})(get_deps__$1))
;
var topo_sort_STAR_ = ((function (get_deps__$1){
return (function() {
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_ = null;
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1 = (function (deps){
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.call(null,deps,(0),cljs.core.atom.call(null,cljs.core.sorted_map.call(null)));
});
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3 = (function (deps,depth,state){
cljs.core.swap_BANG_.call(null,state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [depth], null),cljs.core.fnil.call(null,cljs.core.into,cljs.core.PersistentHashSet.EMPTY),deps);

var seq__30613_30621 = cljs.core.seq.call(null,deps);
var chunk__30614_30622 = null;
var count__30615_30623 = (0);
var i__30616_30624 = (0);
while(true){
if((i__30616_30624 < count__30615_30623)){
var dep_30625 = cljs.core._nth.call(null,chunk__30614_30622,i__30616_30624);
if(cljs.core.truth_((function (){var and__4120__auto__ = dep_30625;
if(cljs.core.truth_(and__4120__auto__)){
return cljs.core.not.call(null,figwheel.client.file_reloading.in_upper_level_QMARK_.call(null,cljs.core.deref.call(null,state),depth,dep_30625));
} else {
return and__4120__auto__;
}
})())){
topo_sort_helper_STAR_.call(null,dep_30625,(depth + (1)),state);
} else {
}


var G__30626 = seq__30613_30621;
var G__30627 = chunk__30614_30622;
var G__30628 = count__30615_30623;
var G__30629 = (i__30616_30624 + (1));
seq__30613_30621 = G__30626;
chunk__30614_30622 = G__30627;
count__30615_30623 = G__30628;
i__30616_30624 = G__30629;
continue;
} else {
var temp__5735__auto___30630 = cljs.core.seq.call(null,seq__30613_30621);
if(temp__5735__auto___30630){
var seq__30613_30631__$1 = temp__5735__auto___30630;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__30613_30631__$1)){
var c__4550__auto___30632 = cljs.core.chunk_first.call(null,seq__30613_30631__$1);
var G__30633 = cljs.core.chunk_rest.call(null,seq__30613_30631__$1);
var G__30634 = c__4550__auto___30632;
var G__30635 = cljs.core.count.call(null,c__4550__auto___30632);
var G__30636 = (0);
seq__30613_30621 = G__30633;
chunk__30614_30622 = G__30634;
count__30615_30623 = G__30635;
i__30616_30624 = G__30636;
continue;
} else {
var dep_30637 = cljs.core.first.call(null,seq__30613_30631__$1);
if(cljs.core.truth_((function (){var and__4120__auto__ = dep_30637;
if(cljs.core.truth_(and__4120__auto__)){
return cljs.core.not.call(null,figwheel.client.file_reloading.in_upper_level_QMARK_.call(null,cljs.core.deref.call(null,state),depth,dep_30637));
} else {
return and__4120__auto__;
}
})())){
topo_sort_helper_STAR_.call(null,dep_30637,(depth + (1)),state);
} else {
}


var G__30638 = cljs.core.next.call(null,seq__30613_30631__$1);
var G__30639 = null;
var G__30640 = (0);
var G__30641 = (0);
seq__30613_30621 = G__30638;
chunk__30614_30622 = G__30639;
count__30615_30623 = G__30640;
i__30616_30624 = G__30641;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.call(null,depth,(0))){
return elim_dups_STAR_.call(null,cljs.core.reverse.call(null,cljs.core.vals.call(null,cljs.core.deref.call(null,state))));
} else {
return null;
}
});
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_ = function(deps,depth,state){
switch(arguments.length){
case 1:
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1.call(this,deps);
case 3:
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3.call(this,deps,depth,state);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1;
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.cljs$core$IFn$_invoke$arity$3 = figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3;
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_;
})()
;})(get_deps__$1))
;
var elim_dups_STAR_ = ((function (get_deps__$1){
return (function figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_(p__30617){
var vec__30618 = p__30617;
var seq__30619 = cljs.core.seq.call(null,vec__30618);
var first__30620 = cljs.core.first.call(null,seq__30619);
var seq__30619__$1 = cljs.core.next.call(null,seq__30619);
var x = first__30620;
var xs = seq__30619__$1;
if((x == null)){
return cljs.core.List.EMPTY;
} else {
return cljs.core.cons.call(null,x,figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_.call(null,cljs.core.map.call(null,((function (vec__30618,seq__30619,first__30620,seq__30619__$1,x,xs,get_deps__$1){
return (function (p1__30604_SHARP_){
return clojure.set.difference.call(null,p1__30604_SHARP_,x);
});})(vec__30618,seq__30619,first__30620,seq__30619__$1,x,xs,get_deps__$1))
,xs)));
}
});})(get_deps__$1))
;
return topo_sort_STAR_;
});
figwheel.client.file_reloading.get_all_dependencies = (function figwheel$client$file_reloading$get_all_dependencies(ns){
var topo_sort_SINGLEQUOTE_ = figwheel.client.file_reloading.build_topo_sort.call(null,figwheel.client.file_reloading.get_requires);
return cljs.core.apply.call(null,cljs.core.concat,topo_sort_SINGLEQUOTE_.call(null,cljs.core.set.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ns], null))));
});
figwheel.client.file_reloading.get_all_dependents = (function figwheel$client$file_reloading$get_all_dependents(nss){
var topo_sort_SINGLEQUOTE_ = figwheel.client.file_reloading.build_topo_sort.call(null,figwheel.client.file_reloading.ns__GT_dependents);
return cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.not,figwheel.client.file_reloading.immutable_ns_QMARK_),cljs.core.reverse.call(null,cljs.core.apply.call(null,cljs.core.concat,topo_sort_SINGLEQUOTE_.call(null,cljs.core.set.call(null,nss)))));
});
figwheel.client.file_reloading.unprovide_BANG_ = (function figwheel$client$file_reloading$unprovide_BANG_(ns){
var path = figwheel.client.file_reloading.name__GT_path.call(null,ns);
goog.object.remove(goog.dependencies_.visited,path);

goog.object.remove(goog.dependencies_.written,path);

return goog.object.remove(goog.dependencies_.written,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.basePath),cljs.core.str.cljs$core$IFn$_invoke$arity$1(path)].join(''));
});
figwheel.client.file_reloading.resolve_ns = (function figwheel$client$file_reloading$resolve_ns(ns){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.basePath),cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.client.file_reloading.name__GT_path.call(null,ns))].join('');
});
figwheel.client.file_reloading.addDependency = (function figwheel$client$file_reloading$addDependency(path,provides,requires){
var seq__30642 = cljs.core.seq.call(null,provides);
var chunk__30643 = null;
var count__30644 = (0);
var i__30645 = (0);
while(true){
if((i__30645 < count__30644)){
var prov = cljs.core._nth.call(null,chunk__30643,i__30645);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__30654_30662 = cljs.core.seq.call(null,requires);
var chunk__30655_30663 = null;
var count__30656_30664 = (0);
var i__30657_30665 = (0);
while(true){
if((i__30657_30665 < count__30656_30664)){
var req_30666 = cljs.core._nth.call(null,chunk__30655_30663,i__30657_30665);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_30666,prov);


var G__30667 = seq__30654_30662;
var G__30668 = chunk__30655_30663;
var G__30669 = count__30656_30664;
var G__30670 = (i__30657_30665 + (1));
seq__30654_30662 = G__30667;
chunk__30655_30663 = G__30668;
count__30656_30664 = G__30669;
i__30657_30665 = G__30670;
continue;
} else {
var temp__5735__auto___30671 = cljs.core.seq.call(null,seq__30654_30662);
if(temp__5735__auto___30671){
var seq__30654_30672__$1 = temp__5735__auto___30671;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__30654_30672__$1)){
var c__4550__auto___30673 = cljs.core.chunk_first.call(null,seq__30654_30672__$1);
var G__30674 = cljs.core.chunk_rest.call(null,seq__30654_30672__$1);
var G__30675 = c__4550__auto___30673;
var G__30676 = cljs.core.count.call(null,c__4550__auto___30673);
var G__30677 = (0);
seq__30654_30662 = G__30674;
chunk__30655_30663 = G__30675;
count__30656_30664 = G__30676;
i__30657_30665 = G__30677;
continue;
} else {
var req_30678 = cljs.core.first.call(null,seq__30654_30672__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_30678,prov);


var G__30679 = cljs.core.next.call(null,seq__30654_30672__$1);
var G__30680 = null;
var G__30681 = (0);
var G__30682 = (0);
seq__30654_30662 = G__30679;
chunk__30655_30663 = G__30680;
count__30656_30664 = G__30681;
i__30657_30665 = G__30682;
continue;
}
} else {
}
}
break;
}


var G__30683 = seq__30642;
var G__30684 = chunk__30643;
var G__30685 = count__30644;
var G__30686 = (i__30645 + (1));
seq__30642 = G__30683;
chunk__30643 = G__30684;
count__30644 = G__30685;
i__30645 = G__30686;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq.call(null,seq__30642);
if(temp__5735__auto__){
var seq__30642__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__30642__$1)){
var c__4550__auto__ = cljs.core.chunk_first.call(null,seq__30642__$1);
var G__30687 = cljs.core.chunk_rest.call(null,seq__30642__$1);
var G__30688 = c__4550__auto__;
var G__30689 = cljs.core.count.call(null,c__4550__auto__);
var G__30690 = (0);
seq__30642 = G__30687;
chunk__30643 = G__30688;
count__30644 = G__30689;
i__30645 = G__30690;
continue;
} else {
var prov = cljs.core.first.call(null,seq__30642__$1);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__30658_30691 = cljs.core.seq.call(null,requires);
var chunk__30659_30692 = null;
var count__30660_30693 = (0);
var i__30661_30694 = (0);
while(true){
if((i__30661_30694 < count__30660_30693)){
var req_30695 = cljs.core._nth.call(null,chunk__30659_30692,i__30661_30694);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_30695,prov);


var G__30696 = seq__30658_30691;
var G__30697 = chunk__30659_30692;
var G__30698 = count__30660_30693;
var G__30699 = (i__30661_30694 + (1));
seq__30658_30691 = G__30696;
chunk__30659_30692 = G__30697;
count__30660_30693 = G__30698;
i__30661_30694 = G__30699;
continue;
} else {
var temp__5735__auto___30700__$1 = cljs.core.seq.call(null,seq__30658_30691);
if(temp__5735__auto___30700__$1){
var seq__30658_30701__$1 = temp__5735__auto___30700__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__30658_30701__$1)){
var c__4550__auto___30702 = cljs.core.chunk_first.call(null,seq__30658_30701__$1);
var G__30703 = cljs.core.chunk_rest.call(null,seq__30658_30701__$1);
var G__30704 = c__4550__auto___30702;
var G__30705 = cljs.core.count.call(null,c__4550__auto___30702);
var G__30706 = (0);
seq__30658_30691 = G__30703;
chunk__30659_30692 = G__30704;
count__30660_30693 = G__30705;
i__30661_30694 = G__30706;
continue;
} else {
var req_30707 = cljs.core.first.call(null,seq__30658_30701__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_30707,prov);


var G__30708 = cljs.core.next.call(null,seq__30658_30701__$1);
var G__30709 = null;
var G__30710 = (0);
var G__30711 = (0);
seq__30658_30691 = G__30708;
chunk__30659_30692 = G__30709;
count__30660_30693 = G__30710;
i__30661_30694 = G__30711;
continue;
}
} else {
}
}
break;
}


var G__30712 = cljs.core.next.call(null,seq__30642__$1);
var G__30713 = null;
var G__30714 = (0);
var G__30715 = (0);
seq__30642 = G__30712;
chunk__30643 = G__30713;
count__30644 = G__30714;
i__30645 = G__30715;
continue;
}
} else {
return null;
}
}
break;
}
});
figwheel.client.file_reloading.figwheel_require = (function figwheel$client$file_reloading$figwheel_require(src,reload){
goog.require = figwheel.client.file_reloading.figwheel_require;

if(cljs.core._EQ_.call(null,reload,"reload-all")){
var seq__30716_30720 = cljs.core.seq.call(null,figwheel.client.file_reloading.get_all_dependencies.call(null,src));
var chunk__30717_30721 = null;
var count__30718_30722 = (0);
var i__30719_30723 = (0);
while(true){
if((i__30719_30723 < count__30718_30722)){
var ns_30724 = cljs.core._nth.call(null,chunk__30717_30721,i__30719_30723);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_30724);


var G__30725 = seq__30716_30720;
var G__30726 = chunk__30717_30721;
var G__30727 = count__30718_30722;
var G__30728 = (i__30719_30723 + (1));
seq__30716_30720 = G__30725;
chunk__30717_30721 = G__30726;
count__30718_30722 = G__30727;
i__30719_30723 = G__30728;
continue;
} else {
var temp__5735__auto___30729 = cljs.core.seq.call(null,seq__30716_30720);
if(temp__5735__auto___30729){
var seq__30716_30730__$1 = temp__5735__auto___30729;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__30716_30730__$1)){
var c__4550__auto___30731 = cljs.core.chunk_first.call(null,seq__30716_30730__$1);
var G__30732 = cljs.core.chunk_rest.call(null,seq__30716_30730__$1);
var G__30733 = c__4550__auto___30731;
var G__30734 = cljs.core.count.call(null,c__4550__auto___30731);
var G__30735 = (0);
seq__30716_30720 = G__30732;
chunk__30717_30721 = G__30733;
count__30718_30722 = G__30734;
i__30719_30723 = G__30735;
continue;
} else {
var ns_30736 = cljs.core.first.call(null,seq__30716_30730__$1);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_30736);


var G__30737 = cljs.core.next.call(null,seq__30716_30730__$1);
var G__30738 = null;
var G__30739 = (0);
var G__30740 = (0);
seq__30716_30720 = G__30737;
chunk__30717_30721 = G__30738;
count__30718_30722 = G__30739;
i__30719_30723 = G__30740;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(reload)){
figwheel.client.file_reloading.unprovide_BANG_.call(null,src);
} else {
}

return goog.require_figwheel_backup_(src);
});
/**
 * Reusable browser REPL bootstrapping. Patches the essential functions
 *   in goog.base to support re-loading of namespaces after page load.
 */
figwheel.client.file_reloading.bootstrap_goog_base = (function figwheel$client$file_reloading$bootstrap_goog_base(){
if(cljs.core.truth_(COMPILED)){
return null;
} else {
goog.require_figwheel_backup_ = (function (){var or__4131__auto__ = goog.require__;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return goog.require;
}
})();

goog.isProvided_ = (function (name){
return false;
});

figwheel.client.file_reloading.setup_path__GT_name_BANG_.call(null);

figwheel.client.file_reloading.setup_ns__GT_dependents_BANG_.call(null);

goog.addDependency_figwheel_backup_ = goog.addDependency;

goog.addDependency = (function() { 
var G__30741__delegate = function (args){
cljs.core.apply.call(null,figwheel.client.file_reloading.addDependency,args);

return cljs.core.apply.call(null,goog.addDependency_figwheel_backup_,args);
};
var G__30741 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__30742__i = 0, G__30742__a = new Array(arguments.length -  0);
while (G__30742__i < G__30742__a.length) {G__30742__a[G__30742__i] = arguments[G__30742__i + 0]; ++G__30742__i;}
  args = new cljs.core.IndexedSeq(G__30742__a,0,null);
} 
return G__30741__delegate.call(this,args);};
G__30741.cljs$lang$maxFixedArity = 0;
G__30741.cljs$lang$applyTo = (function (arglist__30743){
var args = cljs.core.seq(arglist__30743);
return G__30741__delegate(args);
});
G__30741.cljs$core$IFn$_invoke$arity$variadic = G__30741__delegate;
return G__30741;
})()
;

goog.constructNamespace_("cljs.user");

goog.global.CLOSURE_IMPORT_SCRIPT = figwheel.client.file_reloading.queued_file_reload;

return goog.require = figwheel.client.file_reloading.figwheel_require;
}
});
figwheel.client.file_reloading.patch_goog_base = (function figwheel$client$file_reloading$patch_goog_base(){
if((typeof figwheel !== 'undefined') && (typeof figwheel.client !== 'undefined') && (typeof figwheel.client.file_reloading !== 'undefined') && (typeof figwheel.client.file_reloading.bootstrapped_cljs !== 'undefined')){
return null;
} else {
return (
figwheel.client.file_reloading.bootstrapped_cljs = (function (){
figwheel.client.file_reloading.bootstrap_goog_base.call(null);

return true;
})()
)
;
}
});
figwheel.client.file_reloading.gloader = (((typeof goog !== 'undefined') && (typeof goog.net !== 'undefined') && (typeof goog.net.jsloader !== 'undefined') && (typeof goog.net.jsloader.safeLoad !== 'undefined'))?(function (p1__30744_SHARP_,p2__30745_SHARP_){
return goog.net.jsloader.safeLoad(goog.html.legacyconversions.trustedResourceUrlFromString(cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__30744_SHARP_)),p2__30745_SHARP_);
}):(((typeof goog !== 'undefined') && (typeof goog.net !== 'undefined') && (typeof goog.net.jsloader !== 'undefined') && (typeof goog.net.jsloader.load !== 'undefined'))?(function (p1__30746_SHARP_,p2__30747_SHARP_){
return goog.net.jsloader.load(cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__30746_SHARP_),p2__30747_SHARP_);
}):(function(){throw cljs.core.ex_info.call(null,"No remote script loading function found.",cljs.core.PersistentArrayMap.EMPTY)})()
));
figwheel.client.file_reloading.reload_file_in_html_env = (function figwheel$client$file_reloading$reload_file_in_html_env(request_url,callback){

var G__30748 = figwheel.client.file_reloading.gloader.call(null,figwheel.client.file_reloading.add_cache_buster.call(null,request_url),({"cleanupWhenDone": true}));
G__30748.addCallback(((function (G__30748){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [true], null));
});})(G__30748))
);

G__30748.addErrback(((function (G__30748){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [false], null));
});})(G__30748))
);

return G__30748;
});
figwheel.client.file_reloading.write_script_tag_import = figwheel.client.file_reloading.reload_file_in_html_env;
goog.exportSymbol('figwheel.client.file_reloading.write_script_tag_import', figwheel.client.file_reloading.write_script_tag_import);
figwheel.client.file_reloading.worker_import_script = (function figwheel$client$file_reloading$worker_import_script(request_url,callback){

return callback.call(null,(function (){try{self.importScripts(figwheel.client.file_reloading.add_cache_buster.call(null,request_url));

return true;
}catch (e30749){if((e30749 instanceof Error)){
var e = e30749;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),["Figwheel: Error loading file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),e.stack);

return false;
} else {
throw e30749;

}
}})());
});
goog.exportSymbol('figwheel.client.file_reloading.worker_import_script', figwheel.client.file_reloading.worker_import_script);
figwheel.client.file_reloading.create_node_script_import_fn = (function figwheel$client$file_reloading$create_node_script_import_fn(){
var node_path_lib = require("path");
var util_pattern = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(node_path_lib.sep),cljs.core.str.cljs$core$IFn$_invoke$arity$1(node_path_lib.join("goog","bootstrap","nodejs.js"))].join('');
var util_path = goog.object.findKey(require.cache,((function (node_path_lib,util_pattern){
return (function (v,k,o){
return goog.string.endsWith(k,util_pattern);
});})(node_path_lib,util_pattern))
);
var parts = cljs.core.pop.call(null,cljs.core.pop.call(null,clojure.string.split.call(null,util_path,/[\/\\]/)));
var root_path = clojure.string.join.call(null,node_path_lib.sep,parts);
return ((function (node_path_lib,util_pattern,util_path,parts,root_path){
return (function (request_url,callback){

var cache_path = node_path_lib.resolve(root_path,request_url);
goog.object.remove(require.cache,cache_path);

return callback.call(null,(function (){try{return require(cache_path);
}catch (e30750){if((e30750 instanceof Error)){
var e = e30750;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),["Figwheel: Error loading file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cache_path)].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),e.stack);

return false;
} else {
throw e30750;

}
}})());
});
;})(node_path_lib,util_pattern,util_path,parts,root_path))
});
goog.exportSymbol('figwheel.client.file_reloading.create_node_script_import_fn', figwheel.client.file_reloading.create_node_script_import_fn);
figwheel.client.file_reloading.reload_file_STAR_ = (function (){var pred__30751 = cljs.core._EQ_;
var expr__30752 = figwheel.client.utils.host_env_QMARK_.call(null);
if(cljs.core.truth_(pred__30751.call(null,new cljs.core.Keyword(null,"node","node",581201198),expr__30752))){
return figwheel.client.file_reloading.create_node_script_import_fn.call(null);
} else {
if(cljs.core.truth_(pred__30751.call(null,new cljs.core.Keyword(null,"html","html",-998796897),expr__30752))){
return figwheel.client.file_reloading.write_script_tag_import;
} else {
if(cljs.core.truth_(pred__30751.call(null,new cljs.core.Keyword(null,"worker","worker",938239996),expr__30752))){
return figwheel.client.file_reloading.worker_import_script;
} else {
return ((function (pred__30751,expr__30752){
return (function (a,b){
throw "Reload not defined for this platform";
});
;})(pred__30751,expr__30752))
}
}
}
})();
figwheel.client.file_reloading.reload_file = (function figwheel$client$file_reloading$reload_file(p__30754,callback){
var map__30755 = p__30754;
var map__30755__$1 = (((((!((map__30755 == null))))?(((((map__30755.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30755.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30755):map__30755);
var file_msg = map__30755__$1;
var request_url = cljs.core.get.call(null,map__30755__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));

figwheel.client.utils.debug_prn.call(null,["FigWheel: Attempting to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

return (function (){var or__4131__auto__ = goog.object.get(goog.global,"FIGWHEEL_IMPORT_SCRIPT");
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return figwheel.client.file_reloading.reload_file_STAR_;
}
})().call(null,request_url,((function (map__30755,map__30755__$1,file_msg,request_url){
return (function (success_QMARK_){
if(cljs.core.truth_(success_QMARK_)){
figwheel.client.utils.debug_prn.call(null,["FigWheel: Successfully loaded ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,file_msg,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),true)], null));
} else {
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),["Figwheel: Error loading file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});})(map__30755,map__30755__$1,file_msg,request_url))
);
});
if((typeof figwheel !== 'undefined') && (typeof figwheel.client !== 'undefined') && (typeof figwheel.client.file_reloading !== 'undefined') && (typeof figwheel.client.file_reloading.reload_chan !== 'undefined')){
} else {
figwheel.client.file_reloading.reload_chan = cljs.core.async.chan.call(null);
}
if((typeof figwheel !== 'undefined') && (typeof figwheel.client !== 'undefined') && (typeof figwheel.client.file_reloading !== 'undefined') && (typeof figwheel.client.file_reloading.on_load_callbacks !== 'undefined')){
} else {
figwheel.client.file_reloading.on_load_callbacks = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
if((typeof figwheel !== 'undefined') && (typeof figwheel.client !== 'undefined') && (typeof figwheel.client.file_reloading !== 'undefined') && (typeof figwheel.client.file_reloading.dependencies_loaded !== 'undefined')){
} else {
figwheel.client.file_reloading.dependencies_loaded = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
}
figwheel.client.file_reloading.blocking_load = (function figwheel$client$file_reloading$blocking_load(url){
var out = cljs.core.async.chan.call(null);
figwheel.client.file_reloading.reload_file.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"request-url","request-url",2100346596),url], null),((function (out){
return (function (file_msg){
cljs.core.async.put_BANG_.call(null,out,file_msg);

return cljs.core.async.close_BANG_.call(null,out);
});})(out))
);

return out;
});
if((typeof figwheel !== 'undefined') && (typeof figwheel.client !== 'undefined') && (typeof figwheel.client.file_reloading !== 'undefined') && (typeof figwheel.client.file_reloading.reloader_loop !== 'undefined')){
} else {
figwheel.client.file_reloading.reloader_loop = (function (){var c__23368__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto__){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto__){
return (function (state_30793){
var state_val_30794 = (state_30793[(1)]);
if((state_val_30794 === (7))){
var inst_30789 = (state_30793[(2)]);
var state_30793__$1 = state_30793;
var statearr_30795_30821 = state_30793__$1;
(statearr_30795_30821[(2)] = inst_30789);

(statearr_30795_30821[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30794 === (1))){
var state_30793__$1 = state_30793;
var statearr_30796_30822 = state_30793__$1;
(statearr_30796_30822[(2)] = null);

(statearr_30796_30822[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30794 === (4))){
var inst_30759 = (state_30793[(7)]);
var inst_30759__$1 = (state_30793[(2)]);
var state_30793__$1 = (function (){var statearr_30797 = state_30793;
(statearr_30797[(7)] = inst_30759__$1);

return statearr_30797;
})();
if(cljs.core.truth_(inst_30759__$1)){
var statearr_30798_30823 = state_30793__$1;
(statearr_30798_30823[(1)] = (5));

} else {
var statearr_30799_30824 = state_30793__$1;
(statearr_30799_30824[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30794 === (15))){
var inst_30772 = (state_30793[(8)]);
var inst_30774 = (state_30793[(9)]);
var inst_30776 = inst_30774.call(null,inst_30772);
var state_30793__$1 = state_30793;
var statearr_30800_30825 = state_30793__$1;
(statearr_30800_30825[(2)] = inst_30776);

(statearr_30800_30825[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30794 === (13))){
var inst_30783 = (state_30793[(2)]);
var state_30793__$1 = state_30793;
var statearr_30801_30826 = state_30793__$1;
(statearr_30801_30826[(2)] = inst_30783);

(statearr_30801_30826[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30794 === (6))){
var state_30793__$1 = state_30793;
var statearr_30802_30827 = state_30793__$1;
(statearr_30802_30827[(2)] = null);

(statearr_30802_30827[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30794 === (17))){
var inst_30780 = (state_30793[(2)]);
var state_30793__$1 = state_30793;
var statearr_30803_30828 = state_30793__$1;
(statearr_30803_30828[(2)] = inst_30780);

(statearr_30803_30828[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30794 === (3))){
var inst_30791 = (state_30793[(2)]);
var state_30793__$1 = state_30793;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30793__$1,inst_30791);
} else {
if((state_val_30794 === (12))){
var state_30793__$1 = state_30793;
var statearr_30804_30829 = state_30793__$1;
(statearr_30804_30829[(2)] = null);

(statearr_30804_30829[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30794 === (2))){
var state_30793__$1 = state_30793;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30793__$1,(4),figwheel.client.file_reloading.reload_chan);
} else {
if((state_val_30794 === (11))){
var inst_30764 = (state_30793[(10)]);
var inst_30770 = figwheel.client.file_reloading.blocking_load.call(null,inst_30764);
var state_30793__$1 = state_30793;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30793__$1,(14),inst_30770);
} else {
if((state_val_30794 === (9))){
var inst_30764 = (state_30793[(10)]);
var state_30793__$1 = state_30793;
if(cljs.core.truth_(inst_30764)){
var statearr_30805_30830 = state_30793__$1;
(statearr_30805_30830[(1)] = (11));

} else {
var statearr_30806_30831 = state_30793__$1;
(statearr_30806_30831[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30794 === (5))){
var inst_30759 = (state_30793[(7)]);
var inst_30765 = (state_30793[(11)]);
var inst_30764 = cljs.core.nth.call(null,inst_30759,(0),null);
var inst_30765__$1 = cljs.core.nth.call(null,inst_30759,(1),null);
var state_30793__$1 = (function (){var statearr_30807 = state_30793;
(statearr_30807[(10)] = inst_30764);

(statearr_30807[(11)] = inst_30765__$1);

return statearr_30807;
})();
if(cljs.core.truth_(inst_30765__$1)){
var statearr_30808_30832 = state_30793__$1;
(statearr_30808_30832[(1)] = (8));

} else {
var statearr_30809_30833 = state_30793__$1;
(statearr_30809_30833[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30794 === (14))){
var inst_30774 = (state_30793[(9)]);
var inst_30764 = (state_30793[(10)]);
var inst_30772 = (state_30793[(2)]);
var inst_30773 = cljs.core.deref.call(null,figwheel.client.file_reloading.on_load_callbacks);
var inst_30774__$1 = cljs.core.get.call(null,inst_30773,inst_30764);
var state_30793__$1 = (function (){var statearr_30810 = state_30793;
(statearr_30810[(8)] = inst_30772);

(statearr_30810[(9)] = inst_30774__$1);

return statearr_30810;
})();
if(cljs.core.truth_(inst_30774__$1)){
var statearr_30811_30834 = state_30793__$1;
(statearr_30811_30834[(1)] = (15));

} else {
var statearr_30812_30835 = state_30793__$1;
(statearr_30812_30835[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30794 === (16))){
var inst_30772 = (state_30793[(8)]);
var inst_30778 = cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,cljs.core.conj,inst_30772);
var state_30793__$1 = state_30793;
var statearr_30813_30836 = state_30793__$1;
(statearr_30813_30836[(2)] = inst_30778);

(statearr_30813_30836[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30794 === (10))){
var inst_30785 = (state_30793[(2)]);
var state_30793__$1 = (function (){var statearr_30814 = state_30793;
(statearr_30814[(12)] = inst_30785);

return statearr_30814;
})();
var statearr_30815_30837 = state_30793__$1;
(statearr_30815_30837[(2)] = null);

(statearr_30815_30837[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30794 === (8))){
var inst_30765 = (state_30793[(11)]);
var inst_30767 = eval(inst_30765);
var state_30793__$1 = state_30793;
var statearr_30816_30838 = state_30793__$1;
(statearr_30816_30838[(2)] = inst_30767);

(statearr_30816_30838[(1)] = (10));


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
});})(c__23368__auto__))
;
return ((function (switch__23201__auto__,c__23368__auto__){
return (function() {
var figwheel$client$file_reloading$state_machine__23202__auto__ = null;
var figwheel$client$file_reloading$state_machine__23202__auto____0 = (function (){
var statearr_30817 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_30817[(0)] = figwheel$client$file_reloading$state_machine__23202__auto__);

(statearr_30817[(1)] = (1));

return statearr_30817;
});
var figwheel$client$file_reloading$state_machine__23202__auto____1 = (function (state_30793){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_30793);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e30818){if((e30818 instanceof Object)){
var ex__23205__auto__ = e30818;
var statearr_30819_30839 = state_30793;
(statearr_30819_30839[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30793);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e30818;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__30840 = state_30793;
state_30793 = G__30840;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
figwheel$client$file_reloading$state_machine__23202__auto__ = function(state_30793){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$state_machine__23202__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$state_machine__23202__auto____1.call(this,state_30793);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$state_machine__23202__auto____0;
figwheel$client$file_reloading$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$state_machine__23202__auto____1;
return figwheel$client$file_reloading$state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto__))
})();
var state__23370__auto__ = (function (){var statearr_30820 = f__23369__auto__.call(null);
(statearr_30820[(6)] = c__23368__auto__);

return statearr_30820;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto__))
);

return c__23368__auto__;
})();
}
figwheel.client.file_reloading.queued_file_reload = (function figwheel$client$file_reloading$queued_file_reload(var_args){
var G__30842 = arguments.length;
switch (G__30842) {
case 1:
return figwheel.client.file_reloading.queued_file_reload.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return figwheel.client.file_reloading.queued_file_reload.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

figwheel.client.file_reloading.queued_file_reload.cljs$core$IFn$_invoke$arity$1 = (function (url){
return figwheel.client.file_reloading.queued_file_reload.call(null,url,null);
});

figwheel.client.file_reloading.queued_file_reload.cljs$core$IFn$_invoke$arity$2 = (function (url,opt_source_text){
return cljs.core.async.put_BANG_.call(null,figwheel.client.file_reloading.reload_chan,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [url,opt_source_text], null));
});

figwheel.client.file_reloading.queued_file_reload.cljs$lang$maxFixedArity = 2;

figwheel.client.file_reloading.require_with_callback = (function figwheel$client$file_reloading$require_with_callback(p__30844,callback){
var map__30845 = p__30844;
var map__30845__$1 = (((((!((map__30845 == null))))?(((((map__30845.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30845.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30845):map__30845);
var file_msg = map__30845__$1;
var namespace = cljs.core.get.call(null,map__30845__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var request_url = figwheel.client.file_reloading.resolve_ns.call(null,namespace);
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.assoc,request_url,((function (request_url,map__30845,map__30845__$1,file_msg,namespace){
return (function (file_msg_SINGLEQUOTE_){
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.dissoc,request_url);

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.call(null,file_msg,cljs.core.select_keys.call(null,file_msg_SINGLEQUOTE_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375)], null)))], null));
});})(request_url,map__30845,map__30845__$1,file_msg,namespace))
);

return figwheel.client.file_reloading.figwheel_require.call(null,cljs.core.name.call(null,namespace),true);
});
figwheel.client.file_reloading.figwheel_no_load_QMARK_ = (function figwheel$client$file_reloading$figwheel_no_load_QMARK_(p__30847){
var map__30848 = p__30847;
var map__30848__$1 = (((((!((map__30848 == null))))?(((((map__30848.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30848.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30848):map__30848);
var file_msg = map__30848__$1;
var namespace = cljs.core.get.call(null,map__30848__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var meta_pragmas = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
return new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
});
figwheel.client.file_reloading.ns_exists_QMARK_ = (function figwheel$client$file_reloading$ns_exists_QMARK_(namespace){
return (!((cljs.core.reduce.call(null,cljs.core.fnil.call(null,goog.object.get,({})),goog.global,clojure.string.split.call(null,cljs.core.name.call(null,namespace),".")) == null)));
});
figwheel.client.file_reloading.reload_file_QMARK_ = (function figwheel$client$file_reloading$reload_file_QMARK_(p__30850){
var map__30851 = p__30850;
var map__30851__$1 = (((((!((map__30851 == null))))?(((((map__30851.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30851.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30851):map__30851);
var file_msg = map__30851__$1;
var namespace = cljs.core.get.call(null,map__30851__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

var meta_pragmas = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
var and__4120__auto__ = cljs.core.not.call(null,figwheel.client.file_reloading.figwheel_no_load_QMARK_.call(null,file_msg));
if(and__4120__auto__){
var or__4131__auto__ = new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
var or__4131__auto____$1 = new cljs.core.Keyword(null,"figwheel-load","figwheel-load",1316089175).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
if(cljs.core.truth_(or__4131__auto____$1)){
return or__4131__auto____$1;
} else {
var or__4131__auto____$2 = figwheel.client.file_reloading.provided_QMARK_.call(null,cljs.core.name.call(null,namespace));
if(cljs.core.truth_(or__4131__auto____$2)){
return or__4131__auto____$2;
} else {
return figwheel.client.file_reloading.ns_exists_QMARK_.call(null,namespace);
}
}
}
} else {
return and__4120__auto__;
}
});
figwheel.client.file_reloading.js_reload = (function figwheel$client$file_reloading$js_reload(p__30853,callback){
var map__30854 = p__30853;
var map__30854__$1 = (((((!((map__30854 == null))))?(((((map__30854.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30854.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30854):map__30854);
var file_msg = map__30854__$1;
var request_url = cljs.core.get.call(null,map__30854__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
var namespace = cljs.core.get.call(null,map__30854__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

if(cljs.core.truth_(figwheel.client.file_reloading.reload_file_QMARK_.call(null,file_msg))){
return figwheel.client.file_reloading.require_with_callback.call(null,file_msg,callback);
} else {
figwheel.client.utils.debug_prn.call(null,["Figwheel: Not trying to load file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});
figwheel.client.file_reloading.reload_js_file = (function figwheel$client$file_reloading$reload_js_file(file_msg){
var out = cljs.core.async.chan.call(null);
figwheel.client.file_reloading.js_reload.call(null,file_msg,((function (out){
return (function (url){
cljs.core.async.put_BANG_.call(null,out,url);

return cljs.core.async.close_BANG_.call(null,out);
});})(out))
);

return out;
});
/**
 * Returns a chanel with one collection of loaded filenames on it.
 */
figwheel.client.file_reloading.load_all_js_files = (function figwheel$client$file_reloading$load_all_js_files(files){
var out = cljs.core.async.chan.call(null);
var c__23368__auto___30904 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto___30904,out){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto___30904,out){
return (function (state_30889){
var state_val_30890 = (state_30889[(1)]);
if((state_val_30890 === (1))){
var inst_30863 = cljs.core.seq.call(null,files);
var inst_30864 = cljs.core.first.call(null,inst_30863);
var inst_30865 = cljs.core.next.call(null,inst_30863);
var inst_30866 = files;
var state_30889__$1 = (function (){var statearr_30891 = state_30889;
(statearr_30891[(7)] = inst_30864);

(statearr_30891[(8)] = inst_30866);

(statearr_30891[(9)] = inst_30865);

return statearr_30891;
})();
var statearr_30892_30905 = state_30889__$1;
(statearr_30892_30905[(2)] = null);

(statearr_30892_30905[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30890 === (2))){
var inst_30872 = (state_30889[(10)]);
var inst_30866 = (state_30889[(8)]);
var inst_30871 = cljs.core.seq.call(null,inst_30866);
var inst_30872__$1 = cljs.core.first.call(null,inst_30871);
var inst_30873 = cljs.core.next.call(null,inst_30871);
var inst_30874 = (inst_30872__$1 == null);
var inst_30875 = cljs.core.not.call(null,inst_30874);
var state_30889__$1 = (function (){var statearr_30893 = state_30889;
(statearr_30893[(10)] = inst_30872__$1);

(statearr_30893[(11)] = inst_30873);

return statearr_30893;
})();
if(inst_30875){
var statearr_30894_30906 = state_30889__$1;
(statearr_30894_30906[(1)] = (4));

} else {
var statearr_30895_30907 = state_30889__$1;
(statearr_30895_30907[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30890 === (3))){
var inst_30887 = (state_30889[(2)]);
var state_30889__$1 = state_30889;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_30889__$1,inst_30887);
} else {
if((state_val_30890 === (4))){
var inst_30872 = (state_30889[(10)]);
var inst_30877 = figwheel.client.file_reloading.reload_js_file.call(null,inst_30872);
var state_30889__$1 = state_30889;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_30889__$1,(7),inst_30877);
} else {
if((state_val_30890 === (5))){
var inst_30883 = cljs.core.async.close_BANG_.call(null,out);
var state_30889__$1 = state_30889;
var statearr_30896_30908 = state_30889__$1;
(statearr_30896_30908[(2)] = inst_30883);

(statearr_30896_30908[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30890 === (6))){
var inst_30885 = (state_30889[(2)]);
var state_30889__$1 = state_30889;
var statearr_30897_30909 = state_30889__$1;
(statearr_30897_30909[(2)] = inst_30885);

(statearr_30897_30909[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_30890 === (7))){
var inst_30873 = (state_30889[(11)]);
var inst_30879 = (state_30889[(2)]);
var inst_30880 = cljs.core.async.put_BANG_.call(null,out,inst_30879);
var inst_30866 = inst_30873;
var state_30889__$1 = (function (){var statearr_30898 = state_30889;
(statearr_30898[(12)] = inst_30880);

(statearr_30898[(8)] = inst_30866);

return statearr_30898;
})();
var statearr_30899_30910 = state_30889__$1;
(statearr_30899_30910[(2)] = null);

(statearr_30899_30910[(1)] = (2));


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
});})(c__23368__auto___30904,out))
;
return ((function (switch__23201__auto__,c__23368__auto___30904,out){
return (function() {
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__23202__auto__ = null;
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__23202__auto____0 = (function (){
var statearr_30900 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_30900[(0)] = figwheel$client$file_reloading$load_all_js_files_$_state_machine__23202__auto__);

(statearr_30900[(1)] = (1));

return statearr_30900;
});
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__23202__auto____1 = (function (state_30889){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_30889);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e30901){if((e30901 instanceof Object)){
var ex__23205__auto__ = e30901;
var statearr_30902_30911 = state_30889;
(statearr_30902_30911[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_30889);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e30901;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__30912 = state_30889;
state_30889 = G__30912;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
figwheel$client$file_reloading$load_all_js_files_$_state_machine__23202__auto__ = function(state_30889){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__23202__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__23202__auto____1.call(this,state_30889);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$load_all_js_files_$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__23202__auto____0;
figwheel$client$file_reloading$load_all_js_files_$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__23202__auto____1;
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto___30904,out))
})();
var state__23370__auto__ = (function (){var statearr_30903 = f__23369__auto__.call(null);
(statearr_30903[(6)] = c__23368__auto___30904);

return statearr_30903;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto___30904,out))
);


return cljs.core.async.into.call(null,cljs.core.PersistentVector.EMPTY,out);
});
figwheel.client.file_reloading.eval_body = (function figwheel$client$file_reloading$eval_body(p__30913,opts){
var map__30914 = p__30913;
var map__30914__$1 = (((((!((map__30914 == null))))?(((((map__30914.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30914.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30914):map__30914);
var eval_body = cljs.core.get.call(null,map__30914__$1,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883));
var file = cljs.core.get.call(null,map__30914__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_((function (){var and__4120__auto__ = eval_body;
if(cljs.core.truth_(and__4120__auto__)){
return typeof eval_body === 'string';
} else {
return and__4120__auto__;
}
})())){
var code = eval_body;
try{figwheel.client.utils.debug_prn.call(null,["Evaling file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(file)].join(''));

return figwheel.client.utils.eval_helper.call(null,code,opts);
}catch (e30916){var e = e30916;
return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),["Unable to evaluate ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(file)].join(''));
}} else {
return null;
}
});
figwheel.client.file_reloading.expand_files = (function figwheel$client$file_reloading$expand_files(files){
var deps = figwheel.client.file_reloading.get_all_dependents.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372),files));
return cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.not,cljs.core.partial.call(null,cljs.core.re_matches,/figwheel\.connect.*/),new cljs.core.Keyword(null,"namespace","namespace",-377510372)),cljs.core.map.call(null,((function (deps){
return (function (n){
var temp__5733__auto__ = cljs.core.first.call(null,cljs.core.filter.call(null,((function (deps){
return (function (p1__30917_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__30917_SHARP_),n);
});})(deps))
,files));
if(cljs.core.truth_(temp__5733__auto__)){
var file_msg = temp__5733__auto__;
return file_msg;
} else {
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namespace","namespace",-377510372),new cljs.core.Keyword(null,"namespace","namespace",-377510372),n], null);
}
});})(deps))
,deps));
});
figwheel.client.file_reloading.sort_files = (function figwheel$client$file_reloading$sort_files(files){
if((cljs.core.count.call(null,files) <= (1))){
return files;
} else {
var keep_files = cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372),files));
return cljs.core.filter.call(null,cljs.core.comp.call(null,keep_files,new cljs.core.Keyword(null,"namespace","namespace",-377510372)),figwheel.client.file_reloading.expand_files.call(null,files));
}
});
figwheel.client.file_reloading.get_figwheel_always = (function figwheel$client$file_reloading$get_figwheel_always(){
return cljs.core.map.call(null,(function (p__30918){
var vec__30919 = p__30918;
var k = cljs.core.nth.call(null,vec__30919,(0),null);
var v = cljs.core.nth.call(null,vec__30919,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"namespace","namespace",-377510372),k,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namespace","namespace",-377510372)], null);
}),cljs.core.filter.call(null,(function (p__30922){
var vec__30923 = p__30922;
var k = cljs.core.nth.call(null,vec__30923,(0),null);
var v = cljs.core.nth.call(null,vec__30923,(1),null);
return new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(v);
}),cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas)));
});
figwheel.client.file_reloading.reload_js_files = (function figwheel$client$file_reloading$reload_js_files(p__30929,p__30930){
var map__30931 = p__30929;
var map__30931__$1 = (((((!((map__30931 == null))))?(((((map__30931.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30931.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30931):map__30931);
var opts = map__30931__$1;
var before_jsload = cljs.core.get.call(null,map__30931__$1,new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128));
var on_jsload = cljs.core.get.call(null,map__30931__$1,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602));
var reload_dependents = cljs.core.get.call(null,map__30931__$1,new cljs.core.Keyword(null,"reload-dependents","reload-dependents",-956865430));
var map__30932 = p__30930;
var map__30932__$1 = (((((!((map__30932 == null))))?(((((map__30932.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30932.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30932):map__30932);
var msg = map__30932__$1;
var files = cljs.core.get.call(null,map__30932__$1,new cljs.core.Keyword(null,"files","files",-472457450));
var figwheel_meta = cljs.core.get.call(null,map__30932__$1,new cljs.core.Keyword(null,"figwheel-meta","figwheel-meta",-225970237));
var recompile_dependents = cljs.core.get.call(null,map__30932__$1,new cljs.core.Keyword(null,"recompile-dependents","recompile-dependents",523804171));
if(cljs.core.empty_QMARK_.call(null,figwheel_meta)){
} else {
cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas,figwheel_meta);
}

var c__23368__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto__,map__30931,map__30931__$1,opts,before_jsload,on_jsload,reload_dependents,map__30932,map__30932__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto__,map__30931,map__30931__$1,opts,before_jsload,on_jsload,reload_dependents,map__30932,map__30932__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (state_31086){
var state_val_31087 = (state_31086[(1)]);
if((state_val_31087 === (7))){
var inst_30947 = (state_31086[(7)]);
var inst_30948 = (state_31086[(8)]);
var inst_30946 = (state_31086[(9)]);
var inst_30949 = (state_31086[(10)]);
var inst_30954 = cljs.core._nth.call(null,inst_30947,inst_30949);
var inst_30955 = figwheel.client.file_reloading.eval_body.call(null,inst_30954,opts);
var inst_30956 = (inst_30949 + (1));
var tmp31088 = inst_30947;
var tmp31089 = inst_30948;
var tmp31090 = inst_30946;
var inst_30946__$1 = tmp31090;
var inst_30947__$1 = tmp31088;
var inst_30948__$1 = tmp31089;
var inst_30949__$1 = inst_30956;
var state_31086__$1 = (function (){var statearr_31091 = state_31086;
(statearr_31091[(7)] = inst_30947__$1);

(statearr_31091[(8)] = inst_30948__$1);

(statearr_31091[(11)] = inst_30955);

(statearr_31091[(9)] = inst_30946__$1);

(statearr_31091[(10)] = inst_30949__$1);

return statearr_31091;
})();
var statearr_31092_31175 = state_31086__$1;
(statearr_31092_31175[(2)] = null);

(statearr_31092_31175[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (20))){
var inst_30989 = (state_31086[(12)]);
var inst_30997 = figwheel.client.file_reloading.sort_files.call(null,inst_30989);
var state_31086__$1 = state_31086;
var statearr_31093_31176 = state_31086__$1;
(statearr_31093_31176[(2)] = inst_30997);

(statearr_31093_31176[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (27))){
var state_31086__$1 = state_31086;
var statearr_31094_31177 = state_31086__$1;
(statearr_31094_31177[(2)] = null);

(statearr_31094_31177[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (1))){
var inst_30938 = (state_31086[(13)]);
var inst_30935 = before_jsload.call(null,files);
var inst_30936 = figwheel.client.file_reloading.before_jsload_custom_event.call(null,files);
var inst_30937 = (function (){return ((function (inst_30938,inst_30935,inst_30936,state_val_31087,c__23368__auto__,map__30931,map__30931__$1,opts,before_jsload,on_jsload,reload_dependents,map__30932,map__30932__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__30926_SHARP_){
return new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__30926_SHARP_);
});
;})(inst_30938,inst_30935,inst_30936,state_val_31087,c__23368__auto__,map__30931,map__30931__$1,opts,before_jsload,on_jsload,reload_dependents,map__30932,map__30932__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_30938__$1 = cljs.core.filter.call(null,inst_30937,files);
var inst_30939 = cljs.core.not_empty.call(null,inst_30938__$1);
var state_31086__$1 = (function (){var statearr_31095 = state_31086;
(statearr_31095[(13)] = inst_30938__$1);

(statearr_31095[(14)] = inst_30936);

(statearr_31095[(15)] = inst_30935);

return statearr_31095;
})();
if(cljs.core.truth_(inst_30939)){
var statearr_31096_31178 = state_31086__$1;
(statearr_31096_31178[(1)] = (2));

} else {
var statearr_31097_31179 = state_31086__$1;
(statearr_31097_31179[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (24))){
var state_31086__$1 = state_31086;
var statearr_31098_31180 = state_31086__$1;
(statearr_31098_31180[(2)] = null);

(statearr_31098_31180[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (39))){
var inst_31039 = (state_31086[(16)]);
var state_31086__$1 = state_31086;
var statearr_31099_31181 = state_31086__$1;
(statearr_31099_31181[(2)] = inst_31039);

(statearr_31099_31181[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (46))){
var inst_31081 = (state_31086[(2)]);
var state_31086__$1 = state_31086;
var statearr_31100_31182 = state_31086__$1;
(statearr_31100_31182[(2)] = inst_31081);

(statearr_31100_31182[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (4))){
var inst_30983 = (state_31086[(2)]);
var inst_30984 = cljs.core.List.EMPTY;
var inst_30985 = cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,inst_30984);
var inst_30986 = (function (){return ((function (inst_30983,inst_30984,inst_30985,state_val_31087,c__23368__auto__,map__30931,map__30931__$1,opts,before_jsload,on_jsload,reload_dependents,map__30932,map__30932__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__30927_SHARP_){
var and__4120__auto__ = new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__30927_SHARP_);
if(cljs.core.truth_(and__4120__auto__)){
return ((cljs.core.not.call(null,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__30927_SHARP_))) && (cljs.core.not.call(null,figwheel.client.file_reloading.figwheel_no_load_QMARK_.call(null,p1__30927_SHARP_))));
} else {
return and__4120__auto__;
}
});
;})(inst_30983,inst_30984,inst_30985,state_val_31087,c__23368__auto__,map__30931,map__30931__$1,opts,before_jsload,on_jsload,reload_dependents,map__30932,map__30932__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_30987 = cljs.core.filter.call(null,inst_30986,files);
var inst_30988 = figwheel.client.file_reloading.get_figwheel_always.call(null);
var inst_30989 = cljs.core.concat.call(null,inst_30987,inst_30988);
var state_31086__$1 = (function (){var statearr_31101 = state_31086;
(statearr_31101[(12)] = inst_30989);

(statearr_31101[(17)] = inst_30985);

(statearr_31101[(18)] = inst_30983);

return statearr_31101;
})();
if(cljs.core.truth_(reload_dependents)){
var statearr_31102_31183 = state_31086__$1;
(statearr_31102_31183[(1)] = (16));

} else {
var statearr_31103_31184 = state_31086__$1;
(statearr_31103_31184[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (15))){
var inst_30973 = (state_31086[(2)]);
var state_31086__$1 = state_31086;
var statearr_31104_31185 = state_31086__$1;
(statearr_31104_31185[(2)] = inst_30973);

(statearr_31104_31185[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (21))){
var inst_30999 = (state_31086[(19)]);
var inst_30999__$1 = (state_31086[(2)]);
var inst_31000 = figwheel.client.file_reloading.load_all_js_files.call(null,inst_30999__$1);
var state_31086__$1 = (function (){var statearr_31105 = state_31086;
(statearr_31105[(19)] = inst_30999__$1);

return statearr_31105;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_31086__$1,(22),inst_31000);
} else {
if((state_val_31087 === (31))){
var inst_31084 = (state_31086[(2)]);
var state_31086__$1 = state_31086;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_31086__$1,inst_31084);
} else {
if((state_val_31087 === (32))){
var inst_31039 = (state_31086[(16)]);
var inst_31044 = inst_31039.cljs$lang$protocol_mask$partition0$;
var inst_31045 = (inst_31044 & (64));
var inst_31046 = inst_31039.cljs$core$ISeq$;
var inst_31047 = (cljs.core.PROTOCOL_SENTINEL === inst_31046);
var inst_31048 = ((inst_31045) || (inst_31047));
var state_31086__$1 = state_31086;
if(cljs.core.truth_(inst_31048)){
var statearr_31106_31186 = state_31086__$1;
(statearr_31106_31186[(1)] = (35));

} else {
var statearr_31107_31187 = state_31086__$1;
(statearr_31107_31187[(1)] = (36));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (40))){
var inst_31061 = (state_31086[(20)]);
var inst_31060 = (state_31086[(2)]);
var inst_31061__$1 = cljs.core.get.call(null,inst_31060,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179));
var inst_31062 = cljs.core.get.call(null,inst_31060,new cljs.core.Keyword(null,"not-required","not-required",-950359114));
var inst_31063 = cljs.core.not_empty.call(null,inst_31061__$1);
var state_31086__$1 = (function (){var statearr_31108 = state_31086;
(statearr_31108[(20)] = inst_31061__$1);

(statearr_31108[(21)] = inst_31062);

return statearr_31108;
})();
if(cljs.core.truth_(inst_31063)){
var statearr_31109_31188 = state_31086__$1;
(statearr_31109_31188[(1)] = (41));

} else {
var statearr_31110_31189 = state_31086__$1;
(statearr_31110_31189[(1)] = (42));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (33))){
var state_31086__$1 = state_31086;
var statearr_31111_31190 = state_31086__$1;
(statearr_31111_31190[(2)] = false);

(statearr_31111_31190[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (13))){
var inst_30959 = (state_31086[(22)]);
var inst_30963 = cljs.core.chunk_first.call(null,inst_30959);
var inst_30964 = cljs.core.chunk_rest.call(null,inst_30959);
var inst_30965 = cljs.core.count.call(null,inst_30963);
var inst_30946 = inst_30964;
var inst_30947 = inst_30963;
var inst_30948 = inst_30965;
var inst_30949 = (0);
var state_31086__$1 = (function (){var statearr_31112 = state_31086;
(statearr_31112[(7)] = inst_30947);

(statearr_31112[(8)] = inst_30948);

(statearr_31112[(9)] = inst_30946);

(statearr_31112[(10)] = inst_30949);

return statearr_31112;
})();
var statearr_31113_31191 = state_31086__$1;
(statearr_31113_31191[(2)] = null);

(statearr_31113_31191[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (22))){
var inst_31007 = (state_31086[(23)]);
var inst_31002 = (state_31086[(24)]);
var inst_31003 = (state_31086[(25)]);
var inst_30999 = (state_31086[(19)]);
var inst_31002__$1 = (state_31086[(2)]);
var inst_31003__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_31002__$1);
var inst_31004 = (function (){var all_files = inst_30999;
var res_SINGLEQUOTE_ = inst_31002__$1;
var res = inst_31003__$1;
return ((function (all_files,res_SINGLEQUOTE_,res,inst_31007,inst_31002,inst_31003,inst_30999,inst_31002__$1,inst_31003__$1,state_val_31087,c__23368__auto__,map__30931,map__30931__$1,opts,before_jsload,on_jsload,reload_dependents,map__30932,map__30932__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__30928_SHARP_){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375).cljs$core$IFn$_invoke$arity$1(p1__30928_SHARP_));
});
;})(all_files,res_SINGLEQUOTE_,res,inst_31007,inst_31002,inst_31003,inst_30999,inst_31002__$1,inst_31003__$1,state_val_31087,c__23368__auto__,map__30931,map__30931__$1,opts,before_jsload,on_jsload,reload_dependents,map__30932,map__30932__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_31005 = cljs.core.filter.call(null,inst_31004,inst_31002__$1);
var inst_31006 = cljs.core.deref.call(null,figwheel.client.file_reloading.dependencies_loaded);
var inst_31007__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_31006);
var inst_31008 = cljs.core.not_empty.call(null,inst_31007__$1);
var state_31086__$1 = (function (){var statearr_31114 = state_31086;
(statearr_31114[(23)] = inst_31007__$1);

(statearr_31114[(24)] = inst_31002__$1);

(statearr_31114[(26)] = inst_31005);

(statearr_31114[(25)] = inst_31003__$1);

return statearr_31114;
})();
if(cljs.core.truth_(inst_31008)){
var statearr_31115_31192 = state_31086__$1;
(statearr_31115_31192[(1)] = (23));

} else {
var statearr_31116_31193 = state_31086__$1;
(statearr_31116_31193[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (36))){
var state_31086__$1 = state_31086;
var statearr_31117_31194 = state_31086__$1;
(statearr_31117_31194[(2)] = false);

(statearr_31117_31194[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (41))){
var inst_31061 = (state_31086[(20)]);
var inst_31065 = cljs.core.comp.call(null,figwheel.client.file_reloading.name__GT_path,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var inst_31066 = cljs.core.map.call(null,inst_31065,inst_31061);
var inst_31067 = cljs.core.pr_str.call(null,inst_31066);
var inst_31068 = ["figwheel-no-load meta-data: ",inst_31067].join('');
var inst_31069 = figwheel.client.utils.log.call(null,inst_31068);
var state_31086__$1 = state_31086;
var statearr_31118_31195 = state_31086__$1;
(statearr_31118_31195[(2)] = inst_31069);

(statearr_31118_31195[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (43))){
var inst_31062 = (state_31086[(21)]);
var inst_31072 = (state_31086[(2)]);
var inst_31073 = cljs.core.not_empty.call(null,inst_31062);
var state_31086__$1 = (function (){var statearr_31119 = state_31086;
(statearr_31119[(27)] = inst_31072);

return statearr_31119;
})();
if(cljs.core.truth_(inst_31073)){
var statearr_31120_31196 = state_31086__$1;
(statearr_31120_31196[(1)] = (44));

} else {
var statearr_31121_31197 = state_31086__$1;
(statearr_31121_31197[(1)] = (45));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (29))){
var inst_31039 = (state_31086[(16)]);
var inst_31007 = (state_31086[(23)]);
var inst_31002 = (state_31086[(24)]);
var inst_31005 = (state_31086[(26)]);
var inst_31003 = (state_31086[(25)]);
var inst_30999 = (state_31086[(19)]);
var inst_31035 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: NOT loading these files ");
var inst_31038 = (function (){var all_files = inst_30999;
var res_SINGLEQUOTE_ = inst_31002;
var res = inst_31003;
var files_not_loaded = inst_31005;
var dependencies_that_loaded = inst_31007;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_31039,inst_31007,inst_31002,inst_31005,inst_31003,inst_30999,inst_31035,state_val_31087,c__23368__auto__,map__30931,map__30931__$1,opts,before_jsload,on_jsload,reload_dependents,map__30932,map__30932__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__31037){
var map__31122 = p__31037;
var map__31122__$1 = (((((!((map__31122 == null))))?(((((map__31122.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__31122.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31122):map__31122);
var namespace = cljs.core.get.call(null,map__31122__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var meta_data = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
if((meta_data == null)){
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);
} else {
if(cljs.core.truth_(meta_data.call(null,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179)))){
return new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179);
} else {
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);

}
}
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_31039,inst_31007,inst_31002,inst_31005,inst_31003,inst_30999,inst_31035,state_val_31087,c__23368__auto__,map__30931,map__30931__$1,opts,before_jsload,on_jsload,reload_dependents,map__30932,map__30932__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_31039__$1 = cljs.core.group_by.call(null,inst_31038,inst_31005);
var inst_31041 = (inst_31039__$1 == null);
var inst_31042 = cljs.core.not.call(null,inst_31041);
var state_31086__$1 = (function (){var statearr_31124 = state_31086;
(statearr_31124[(16)] = inst_31039__$1);

(statearr_31124[(28)] = inst_31035);

return statearr_31124;
})();
if(inst_31042){
var statearr_31125_31198 = state_31086__$1;
(statearr_31125_31198[(1)] = (32));

} else {
var statearr_31126_31199 = state_31086__$1;
(statearr_31126_31199[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (44))){
var inst_31062 = (state_31086[(21)]);
var inst_31075 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_31062);
var inst_31076 = cljs.core.pr_str.call(null,inst_31075);
var inst_31077 = ["not required: ",inst_31076].join('');
var inst_31078 = figwheel.client.utils.log.call(null,inst_31077);
var state_31086__$1 = state_31086;
var statearr_31127_31200 = state_31086__$1;
(statearr_31127_31200[(2)] = inst_31078);

(statearr_31127_31200[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (6))){
var inst_30980 = (state_31086[(2)]);
var state_31086__$1 = state_31086;
var statearr_31128_31201 = state_31086__$1;
(statearr_31128_31201[(2)] = inst_30980);

(statearr_31128_31201[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (28))){
var inst_31005 = (state_31086[(26)]);
var inst_31032 = (state_31086[(2)]);
var inst_31033 = cljs.core.not_empty.call(null,inst_31005);
var state_31086__$1 = (function (){var statearr_31129 = state_31086;
(statearr_31129[(29)] = inst_31032);

return statearr_31129;
})();
if(cljs.core.truth_(inst_31033)){
var statearr_31130_31202 = state_31086__$1;
(statearr_31130_31202[(1)] = (29));

} else {
var statearr_31131_31203 = state_31086__$1;
(statearr_31131_31203[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (25))){
var inst_31003 = (state_31086[(25)]);
var inst_31019 = (state_31086[(2)]);
var inst_31020 = cljs.core.not_empty.call(null,inst_31003);
var state_31086__$1 = (function (){var statearr_31132 = state_31086;
(statearr_31132[(30)] = inst_31019);

return statearr_31132;
})();
if(cljs.core.truth_(inst_31020)){
var statearr_31133_31204 = state_31086__$1;
(statearr_31133_31204[(1)] = (26));

} else {
var statearr_31134_31205 = state_31086__$1;
(statearr_31134_31205[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (34))){
var inst_31055 = (state_31086[(2)]);
var state_31086__$1 = state_31086;
if(cljs.core.truth_(inst_31055)){
var statearr_31135_31206 = state_31086__$1;
(statearr_31135_31206[(1)] = (38));

} else {
var statearr_31136_31207 = state_31086__$1;
(statearr_31136_31207[(1)] = (39));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (17))){
var state_31086__$1 = state_31086;
var statearr_31137_31208 = state_31086__$1;
(statearr_31137_31208[(2)] = recompile_dependents);

(statearr_31137_31208[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (3))){
var state_31086__$1 = state_31086;
var statearr_31138_31209 = state_31086__$1;
(statearr_31138_31209[(2)] = null);

(statearr_31138_31209[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (12))){
var inst_30976 = (state_31086[(2)]);
var state_31086__$1 = state_31086;
var statearr_31139_31210 = state_31086__$1;
(statearr_31139_31210[(2)] = inst_30976);

(statearr_31139_31210[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (2))){
var inst_30938 = (state_31086[(13)]);
var inst_30945 = cljs.core.seq.call(null,inst_30938);
var inst_30946 = inst_30945;
var inst_30947 = null;
var inst_30948 = (0);
var inst_30949 = (0);
var state_31086__$1 = (function (){var statearr_31140 = state_31086;
(statearr_31140[(7)] = inst_30947);

(statearr_31140[(8)] = inst_30948);

(statearr_31140[(9)] = inst_30946);

(statearr_31140[(10)] = inst_30949);

return statearr_31140;
})();
var statearr_31141_31211 = state_31086__$1;
(statearr_31141_31211[(2)] = null);

(statearr_31141_31211[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (23))){
var inst_31007 = (state_31086[(23)]);
var inst_31002 = (state_31086[(24)]);
var inst_31005 = (state_31086[(26)]);
var inst_31003 = (state_31086[(25)]);
var inst_30999 = (state_31086[(19)]);
var inst_31010 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these dependencies");
var inst_31012 = (function (){var all_files = inst_30999;
var res_SINGLEQUOTE_ = inst_31002;
var res = inst_31003;
var files_not_loaded = inst_31005;
var dependencies_that_loaded = inst_31007;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_31007,inst_31002,inst_31005,inst_31003,inst_30999,inst_31010,state_val_31087,c__23368__auto__,map__30931,map__30931__$1,opts,before_jsload,on_jsload,reload_dependents,map__30932,map__30932__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__31011){
var map__31142 = p__31011;
var map__31142__$1 = (((((!((map__31142 == null))))?(((((map__31142.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__31142.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31142):map__31142);
var request_url = cljs.core.get.call(null,map__31142__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
return clojure.string.replace.call(null,request_url,goog.basePath,"");
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_31007,inst_31002,inst_31005,inst_31003,inst_30999,inst_31010,state_val_31087,c__23368__auto__,map__30931,map__30931__$1,opts,before_jsload,on_jsload,reload_dependents,map__30932,map__30932__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_31013 = cljs.core.reverse.call(null,inst_31007);
var inst_31014 = cljs.core.map.call(null,inst_31012,inst_31013);
var inst_31015 = cljs.core.pr_str.call(null,inst_31014);
var inst_31016 = figwheel.client.utils.log.call(null,inst_31015);
var state_31086__$1 = (function (){var statearr_31144 = state_31086;
(statearr_31144[(31)] = inst_31010);

return statearr_31144;
})();
var statearr_31145_31212 = state_31086__$1;
(statearr_31145_31212[(2)] = inst_31016);

(statearr_31145_31212[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (35))){
var state_31086__$1 = state_31086;
var statearr_31146_31213 = state_31086__$1;
(statearr_31146_31213[(2)] = true);

(statearr_31146_31213[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (19))){
var inst_30989 = (state_31086[(12)]);
var inst_30995 = figwheel.client.file_reloading.expand_files.call(null,inst_30989);
var state_31086__$1 = state_31086;
var statearr_31147_31214 = state_31086__$1;
(statearr_31147_31214[(2)] = inst_30995);

(statearr_31147_31214[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (11))){
var state_31086__$1 = state_31086;
var statearr_31148_31215 = state_31086__$1;
(statearr_31148_31215[(2)] = null);

(statearr_31148_31215[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (9))){
var inst_30978 = (state_31086[(2)]);
var state_31086__$1 = state_31086;
var statearr_31149_31216 = state_31086__$1;
(statearr_31149_31216[(2)] = inst_30978);

(statearr_31149_31216[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (5))){
var inst_30948 = (state_31086[(8)]);
var inst_30949 = (state_31086[(10)]);
var inst_30951 = (inst_30949 < inst_30948);
var inst_30952 = inst_30951;
var state_31086__$1 = state_31086;
if(cljs.core.truth_(inst_30952)){
var statearr_31150_31217 = state_31086__$1;
(statearr_31150_31217[(1)] = (7));

} else {
var statearr_31151_31218 = state_31086__$1;
(statearr_31151_31218[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (14))){
var inst_30959 = (state_31086[(22)]);
var inst_30968 = cljs.core.first.call(null,inst_30959);
var inst_30969 = figwheel.client.file_reloading.eval_body.call(null,inst_30968,opts);
var inst_30970 = cljs.core.next.call(null,inst_30959);
var inst_30946 = inst_30970;
var inst_30947 = null;
var inst_30948 = (0);
var inst_30949 = (0);
var state_31086__$1 = (function (){var statearr_31152 = state_31086;
(statearr_31152[(7)] = inst_30947);

(statearr_31152[(8)] = inst_30948);

(statearr_31152[(32)] = inst_30969);

(statearr_31152[(9)] = inst_30946);

(statearr_31152[(10)] = inst_30949);

return statearr_31152;
})();
var statearr_31153_31219 = state_31086__$1;
(statearr_31153_31219[(2)] = null);

(statearr_31153_31219[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (45))){
var state_31086__$1 = state_31086;
var statearr_31154_31220 = state_31086__$1;
(statearr_31154_31220[(2)] = null);

(statearr_31154_31220[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (26))){
var inst_31007 = (state_31086[(23)]);
var inst_31002 = (state_31086[(24)]);
var inst_31005 = (state_31086[(26)]);
var inst_31003 = (state_31086[(25)]);
var inst_30999 = (state_31086[(19)]);
var inst_31022 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these files");
var inst_31024 = (function (){var all_files = inst_30999;
var res_SINGLEQUOTE_ = inst_31002;
var res = inst_31003;
var files_not_loaded = inst_31005;
var dependencies_that_loaded = inst_31007;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_31007,inst_31002,inst_31005,inst_31003,inst_30999,inst_31022,state_val_31087,c__23368__auto__,map__30931,map__30931__$1,opts,before_jsload,on_jsload,reload_dependents,map__30932,map__30932__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__31023){
var map__31155 = p__31023;
var map__31155__$1 = (((((!((map__31155 == null))))?(((((map__31155.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__31155.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31155):map__31155);
var namespace = cljs.core.get.call(null,map__31155__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var file = cljs.core.get.call(null,map__31155__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_(namespace)){
return figwheel.client.file_reloading.name__GT_path.call(null,cljs.core.name.call(null,namespace));
} else {
return file;
}
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_31007,inst_31002,inst_31005,inst_31003,inst_30999,inst_31022,state_val_31087,c__23368__auto__,map__30931,map__30931__$1,opts,before_jsload,on_jsload,reload_dependents,map__30932,map__30932__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_31025 = cljs.core.map.call(null,inst_31024,inst_31003);
var inst_31026 = cljs.core.pr_str.call(null,inst_31025);
var inst_31027 = figwheel.client.utils.log.call(null,inst_31026);
var inst_31028 = (function (){var all_files = inst_30999;
var res_SINGLEQUOTE_ = inst_31002;
var res = inst_31003;
var files_not_loaded = inst_31005;
var dependencies_that_loaded = inst_31007;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_31007,inst_31002,inst_31005,inst_31003,inst_30999,inst_31022,inst_31024,inst_31025,inst_31026,inst_31027,state_val_31087,c__23368__auto__,map__30931,map__30931__$1,opts,before_jsload,on_jsload,reload_dependents,map__30932,map__30932__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
figwheel.client.file_reloading.on_jsload_custom_event.call(null,res);

return cljs.core.apply.call(null,on_jsload,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [res], null));
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_31007,inst_31002,inst_31005,inst_31003,inst_30999,inst_31022,inst_31024,inst_31025,inst_31026,inst_31027,state_val_31087,c__23368__auto__,map__30931,map__30931__$1,opts,before_jsload,on_jsload,reload_dependents,map__30932,map__30932__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_31029 = setTimeout(inst_31028,(10));
var state_31086__$1 = (function (){var statearr_31157 = state_31086;
(statearr_31157[(33)] = inst_31022);

(statearr_31157[(34)] = inst_31027);

return statearr_31157;
})();
var statearr_31158_31221 = state_31086__$1;
(statearr_31158_31221[(2)] = inst_31029);

(statearr_31158_31221[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (16))){
var state_31086__$1 = state_31086;
var statearr_31159_31222 = state_31086__$1;
(statearr_31159_31222[(2)] = reload_dependents);

(statearr_31159_31222[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (38))){
var inst_31039 = (state_31086[(16)]);
var inst_31057 = cljs.core.apply.call(null,cljs.core.hash_map,inst_31039);
var state_31086__$1 = state_31086;
var statearr_31160_31223 = state_31086__$1;
(statearr_31160_31223[(2)] = inst_31057);

(statearr_31160_31223[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (30))){
var state_31086__$1 = state_31086;
var statearr_31161_31224 = state_31086__$1;
(statearr_31161_31224[(2)] = null);

(statearr_31161_31224[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (10))){
var inst_30959 = (state_31086[(22)]);
var inst_30961 = cljs.core.chunked_seq_QMARK_.call(null,inst_30959);
var state_31086__$1 = state_31086;
if(inst_30961){
var statearr_31162_31225 = state_31086__$1;
(statearr_31162_31225[(1)] = (13));

} else {
var statearr_31163_31226 = state_31086__$1;
(statearr_31163_31226[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (18))){
var inst_30993 = (state_31086[(2)]);
var state_31086__$1 = state_31086;
if(cljs.core.truth_(inst_30993)){
var statearr_31164_31227 = state_31086__$1;
(statearr_31164_31227[(1)] = (19));

} else {
var statearr_31165_31228 = state_31086__$1;
(statearr_31165_31228[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (42))){
var state_31086__$1 = state_31086;
var statearr_31166_31229 = state_31086__$1;
(statearr_31166_31229[(2)] = null);

(statearr_31166_31229[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (37))){
var inst_31052 = (state_31086[(2)]);
var state_31086__$1 = state_31086;
var statearr_31167_31230 = state_31086__$1;
(statearr_31167_31230[(2)] = inst_31052);

(statearr_31167_31230[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_31087 === (8))){
var inst_30946 = (state_31086[(9)]);
var inst_30959 = (state_31086[(22)]);
var inst_30959__$1 = cljs.core.seq.call(null,inst_30946);
var state_31086__$1 = (function (){var statearr_31168 = state_31086;
(statearr_31168[(22)] = inst_30959__$1);

return statearr_31168;
})();
if(inst_30959__$1){
var statearr_31169_31231 = state_31086__$1;
(statearr_31169_31231[(1)] = (10));

} else {
var statearr_31170_31232 = state_31086__$1;
(statearr_31170_31232[(1)] = (11));

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
});})(c__23368__auto__,map__30931,map__30931__$1,opts,before_jsload,on_jsload,reload_dependents,map__30932,map__30932__$1,msg,files,figwheel_meta,recompile_dependents))
;
return ((function (switch__23201__auto__,c__23368__auto__,map__30931,map__30931__$1,opts,before_jsload,on_jsload,reload_dependents,map__30932,map__30932__$1,msg,files,figwheel_meta,recompile_dependents){
return (function() {
var figwheel$client$file_reloading$reload_js_files_$_state_machine__23202__auto__ = null;
var figwheel$client$file_reloading$reload_js_files_$_state_machine__23202__auto____0 = (function (){
var statearr_31171 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_31171[(0)] = figwheel$client$file_reloading$reload_js_files_$_state_machine__23202__auto__);

(statearr_31171[(1)] = (1));

return statearr_31171;
});
var figwheel$client$file_reloading$reload_js_files_$_state_machine__23202__auto____1 = (function (state_31086){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_31086);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e31172){if((e31172 instanceof Object)){
var ex__23205__auto__ = e31172;
var statearr_31173_31233 = state_31086;
(statearr_31173_31233[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_31086);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e31172;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__31234 = state_31086;
state_31086 = G__31234;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
figwheel$client$file_reloading$reload_js_files_$_state_machine__23202__auto__ = function(state_31086){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__23202__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__23202__auto____1.call(this,state_31086);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$reload_js_files_$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$reload_js_files_$_state_machine__23202__auto____0;
figwheel$client$file_reloading$reload_js_files_$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$reload_js_files_$_state_machine__23202__auto____1;
return figwheel$client$file_reloading$reload_js_files_$_state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto__,map__30931,map__30931__$1,opts,before_jsload,on_jsload,reload_dependents,map__30932,map__30932__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var state__23370__auto__ = (function (){var statearr_31174 = f__23369__auto__.call(null);
(statearr_31174[(6)] = c__23368__auto__);

return statearr_31174;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto__,map__30931,map__30931__$1,opts,before_jsload,on_jsload,reload_dependents,map__30932,map__30932__$1,msg,files,figwheel_meta,recompile_dependents))
);

return c__23368__auto__;
});
figwheel.client.file_reloading.current_links = (function figwheel$client$file_reloading$current_links(){
return Array.prototype.slice.call(document.getElementsByTagName("link"));
});
figwheel.client.file_reloading.truncate_url = (function figwheel$client$file_reloading$truncate_url(url){
return clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,cljs.core.first.call(null,clojure.string.split.call(null,url,/\?/)),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(location.protocol),"//"].join(''),""),".*://",""),/^\/\//,""),/[^\\/]*/,"");
});
figwheel.client.file_reloading.matches_file_QMARK_ = (function figwheel$client$file_reloading$matches_file_QMARK_(p__31237,link){
var map__31238 = p__31237;
var map__31238__$1 = (((((!((map__31238 == null))))?(((((map__31238.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__31238.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31238):map__31238);
var file = cljs.core.get.call(null,map__31238__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__5735__auto__ = link.href;
if(cljs.core.truth_(temp__5735__auto__)){
var link_href = temp__5735__auto__;
var match = clojure.string.join.call(null,"/",cljs.core.take_while.call(null,cljs.core.identity,cljs.core.map.call(null,((function (link_href,temp__5735__auto__,map__31238,map__31238__$1,file){
return (function (p1__31235_SHARP_,p2__31236_SHARP_){
if(cljs.core._EQ_.call(null,p1__31235_SHARP_,p2__31236_SHARP_)){
return p1__31235_SHARP_;
} else {
return false;
}
});})(link_href,temp__5735__auto__,map__31238,map__31238__$1,file))
,cljs.core.reverse.call(null,clojure.string.split.call(null,file,"/")),cljs.core.reverse.call(null,clojure.string.split.call(null,figwheel.client.file_reloading.truncate_url.call(null,link_href),"/")))));
var match_length = cljs.core.count.call(null,match);
var file_name_length = cljs.core.count.call(null,cljs.core.last.call(null,clojure.string.split.call(null,file,"/")));
if((match_length >= file_name_length)){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"link","link",-1769163468),link,new cljs.core.Keyword(null,"link-href","link-href",-250644450),link_href,new cljs.core.Keyword(null,"match-length","match-length",1101537310),match_length,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083),cljs.core.count.call(null,figwheel.client.file_reloading.truncate_url.call(null,link_href))], null);
} else {
return null;
}
} else {
return null;
}
});
figwheel.client.file_reloading.get_correct_link = (function figwheel$client$file_reloading$get_correct_link(f_data){
var temp__5735__auto__ = cljs.core.first.call(null,cljs.core.sort_by.call(null,(function (p__31241){
var map__31242 = p__31241;
var map__31242__$1 = (((((!((map__31242 == null))))?(((((map__31242.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__31242.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31242):map__31242);
var match_length = cljs.core.get.call(null,map__31242__$1,new cljs.core.Keyword(null,"match-length","match-length",1101537310));
var current_url_length = cljs.core.get.call(null,map__31242__$1,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083));
return (current_url_length - match_length);
}),cljs.core.keep.call(null,(function (p1__31240_SHARP_){
return figwheel.client.file_reloading.matches_file_QMARK_.call(null,f_data,p1__31240_SHARP_);
}),figwheel.client.file_reloading.current_links.call(null))));
if(cljs.core.truth_(temp__5735__auto__)){
var res = temp__5735__auto__;
return new cljs.core.Keyword(null,"link","link",-1769163468).cljs$core$IFn$_invoke$arity$1(res);
} else {
return null;
}
});
figwheel.client.file_reloading.clone_link = (function figwheel$client$file_reloading$clone_link(link,url){
var clone = document.createElement("link");
clone.rel = "stylesheet";

clone.media = link.media;

clone.disabled = link.disabled;

clone.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);

return clone;
});
figwheel.client.file_reloading.create_link = (function figwheel$client$file_reloading$create_link(url){
var link = document.createElement("link");
link.rel = "stylesheet";

link.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);

return link;
});
figwheel.client.file_reloading.distinctify = (function figwheel$client$file_reloading$distinctify(key,seqq){
return cljs.core.vals.call(null,cljs.core.reduce.call(null,(function (p1__31244_SHARP_,p2__31245_SHARP_){
return cljs.core.assoc.call(null,p1__31244_SHARP_,cljs.core.get.call(null,p2__31245_SHARP_,key),p2__31245_SHARP_);
}),cljs.core.PersistentArrayMap.EMPTY,seqq));
});
figwheel.client.file_reloading.add_link_to_document = (function figwheel$client$file_reloading$add_link_to_document(orig_link,klone,finished_fn){
var parent = orig_link.parentNode;
if(cljs.core._EQ_.call(null,orig_link,parent.lastChild)){
parent.appendChild(klone);
} else {
parent.insertBefore(klone,orig_link.nextSibling);
}

return setTimeout(((function (parent){
return (function (){
parent.removeChild(orig_link);

return finished_fn.call(null);
});})(parent))
,(300));
});
if((typeof figwheel !== 'undefined') && (typeof figwheel.client !== 'undefined') && (typeof figwheel.client.file_reloading !== 'undefined') && (typeof figwheel.client.file_reloading.reload_css_deferred_chain !== 'undefined')){
} else {
figwheel.client.file_reloading.reload_css_deferred_chain = cljs.core.atom.call(null,goog.async.Deferred.succeed());
}
figwheel.client.file_reloading.reload_css_file = (function figwheel$client$file_reloading$reload_css_file(f_data,fin){
var temp__5733__auto__ = figwheel.client.file_reloading.get_correct_link.call(null,f_data);
if(cljs.core.truth_(temp__5733__auto__)){
var link = temp__5733__auto__;
return figwheel.client.file_reloading.add_link_to_document.call(null,link,figwheel.client.file_reloading.clone_link.call(null,link,link.href),((function (link,temp__5733__auto__){
return (function (){
return fin.call(null,cljs.core.assoc.call(null,f_data,new cljs.core.Keyword(null,"loaded","loaded",-1246482293),true));
});})(link,temp__5733__auto__))
);
} else {
return fin.call(null,f_data);
}
});
figwheel.client.file_reloading.reload_css_files_STAR_ = (function figwheel$client$file_reloading$reload_css_files_STAR_(deferred,f_datas,on_cssload){
return figwheel.client.utils.liftContD.call(null,figwheel.client.utils.mapConcatD.call(null,deferred,figwheel.client.file_reloading.reload_css_file,f_datas),(function (f_datas_SINGLEQUOTE_,fin){
var loaded_f_datas_31246 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded","loaded",-1246482293),f_datas_SINGLEQUOTE_);
figwheel.client.file_reloading.on_cssload_custom_event.call(null,loaded_f_datas_31246);

if(cljs.core.fn_QMARK_.call(null,on_cssload)){
on_cssload.call(null,loaded_f_datas_31246);
} else {
}

return fin.call(null);
}));
});
figwheel.client.file_reloading.reload_css_files = (function figwheel$client$file_reloading$reload_css_files(p__31247,p__31248){
var map__31249 = p__31247;
var map__31249__$1 = (((((!((map__31249 == null))))?(((((map__31249.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__31249.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31249):map__31249);
var on_cssload = cljs.core.get.call(null,map__31249__$1,new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318));
var map__31250 = p__31248;
var map__31250__$1 = (((((!((map__31250 == null))))?(((((map__31250.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__31250.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__31250):map__31250);
var files_msg = map__31250__$1;
var files = cljs.core.get.call(null,map__31250__$1,new cljs.core.Keyword(null,"files","files",-472457450));
if(figwheel.client.utils.html_env_QMARK_.call(null)){
var temp__5735__auto__ = cljs.core.not_empty.call(null,figwheel.client.file_reloading.distinctify.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),files));
if(cljs.core.truth_(temp__5735__auto__)){
var f_datas = temp__5735__auto__;
return cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.reload_css_deferred_chain,figwheel.client.file_reloading.reload_css_files_STAR_,f_datas,on_cssload);
} else {
return null;
}
} else {
return null;
}
});

//# sourceMappingURL=file_reloading.js.map?rel=1567785977397
