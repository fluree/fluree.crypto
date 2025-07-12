// Compiled by ClojureScript 1.10.520 {:static-fns false, :optimize-constants false}
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var G__25292 = arguments.length;
switch (G__25292) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.call(null,f,true);
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async25293 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async25293 = (function (f,blockable,meta25294){
this.f = f;
this.blockable = blockable;
this.meta25294 = meta25294;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async25293.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_25295,meta25294__$1){
var self__ = this;
var _25295__$1 = this;
return (new cljs.core.async.t_cljs$core$async25293(self__.f,self__.blockable,meta25294__$1));
});

cljs.core.async.t_cljs$core$async25293.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_25295){
var self__ = this;
var _25295__$1 = this;
return self__.meta25294;
});

cljs.core.async.t_cljs$core$async25293.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async25293.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async25293.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
});

cljs.core.async.t_cljs$core$async25293.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t_cljs$core$async25293.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta25294","meta25294",1031131528,null)], null);
});

cljs.core.async.t_cljs$core$async25293.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async25293.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async25293";

cljs.core.async.t_cljs$core$async25293.cljs$lang$ctorPrWriter = (function (this__4374__auto__,writer__4375__auto__,opt__4376__auto__){
return cljs.core._write.call(null,writer__4375__auto__,"cljs.core.async/t_cljs$core$async25293");
});

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async25293.
 */
cljs.core.async.__GT_t_cljs$core$async25293 = (function cljs$core$async$__GT_t_cljs$core$async25293(f__$1,blockable__$1,meta25294){
return (new cljs.core.async.t_cljs$core$async25293(f__$1,blockable__$1,meta25294));
});

}

return (new cljs.core.async.t_cljs$core$async25293(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
});

cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2;

/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if((!((buff == null)))){
if(((false) || ((cljs.core.PROTOCOL_SENTINEL === buff.cljs$core$async$impl$protocols$UnblockingBuffer$)))){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var G__25299 = arguments.length;
switch (G__25299) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.call(null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.call(null,buf_or_n,null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.call(null,buf_or_n,xform,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error(["Assert failed: ","buffer must be supplied when transducer is","\n","buf-or-n"].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
});

cljs.core.async.chan.cljs$lang$maxFixedArity = 3;

/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed. See chan for the semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var G__25302 = arguments.length;
switch (G__25302) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.call(null,null);
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.call(null,xform,null);
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.call(null,cljs.core.async.impl.buffers.promise_buffer.call(null),xform,ex_handler);
});

cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2;

/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout.call(null,msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var G__25305 = arguments.length;
switch (G__25305) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.call(null,port,fn1,true);
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(ret)){
var val_25307 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_25307);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (val_25307,ret){
return (function (){
return fn1.call(null,val_25307);
});})(val_25307,ret))
);
}
} else {
}

return null;
});

cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3;

cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.call(null,cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn0 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn0 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var G__25309 = arguments.length;
switch (G__25309) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__5733__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__5733__auto__)){
var ret = temp__5733__auto__;
return cljs.core.deref.call(null,ret);
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.call(null,port,val,fn1,true);
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__5733__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(temp__5733__auto__)){
var retb = temp__5733__auto__;
var ret = cljs.core.deref.call(null,retb);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,ret);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (ret,retb,temp__5733__auto__){
return (function (){
return fn1.call(null,ret);
});})(ret,retb,temp__5733__auto__))
);
}

return ret;
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4;

cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__4607__auto___25311 = n;
var x_25312 = (0);
while(true){
if((x_25312 < n__4607__auto___25311)){
(a[x_25312] = (0));

var G__25313 = (x_25312 + (1));
x_25312 = G__25313;
continue;
} else {
}
break;
}

var i = (1);
while(true){
if(cljs.core._EQ_.call(null,i,n)){
return a;
} else {
var j = cljs.core.rand_int.call(null,i);
(a[i] = (a[j]));

(a[j] = i);

var G__25314 = (i + (1));
i = G__25314;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async25315 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async25315 = (function (flag,meta25316){
this.flag = flag;
this.meta25316 = meta25316;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async25315.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_25317,meta25316__$1){
var self__ = this;
var _25317__$1 = this;
return (new cljs.core.async.t_cljs$core$async25315(self__.flag,meta25316__$1));
});})(flag))
;

cljs.core.async.t_cljs$core$async25315.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_25317){
var self__ = this;
var _25317__$1 = this;
return self__.meta25316;
});})(flag))
;

cljs.core.async.t_cljs$core$async25315.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async25315.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
});})(flag))
;

cljs.core.async.t_cljs$core$async25315.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async25315.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async25315.getBasis = ((function (flag){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta25316","meta25316",-2027142564,null)], null);
});})(flag))
;

cljs.core.async.t_cljs$core$async25315.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async25315.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async25315";

cljs.core.async.t_cljs$core$async25315.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__4374__auto__,writer__4375__auto__,opt__4376__auto__){
return cljs.core._write.call(null,writer__4375__auto__,"cljs.core.async/t_cljs$core$async25315");
});})(flag))
;

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async25315.
 */
cljs.core.async.__GT_t_cljs$core$async25315 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async25315(flag__$1,meta25316){
return (new cljs.core.async.t_cljs$core$async25315(flag__$1,meta25316));
});})(flag))
;

}

return (new cljs.core.async.t_cljs$core$async25315(flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async25318 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async25318 = (function (flag,cb,meta25319){
this.flag = flag;
this.cb = cb;
this.meta25319 = meta25319;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async25318.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_25320,meta25319__$1){
var self__ = this;
var _25320__$1 = this;
return (new cljs.core.async.t_cljs$core$async25318(self__.flag,self__.cb,meta25319__$1));
});

cljs.core.async.t_cljs$core$async25318.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_25320){
var self__ = this;
var _25320__$1 = this;
return self__.meta25319;
});

cljs.core.async.t_cljs$core$async25318.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async25318.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});

cljs.core.async.t_cljs$core$async25318.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async25318.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
});

cljs.core.async.t_cljs$core$async25318.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta25319","meta25319",1057523057,null)], null);
});

cljs.core.async.t_cljs$core$async25318.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async25318.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async25318";

cljs.core.async.t_cljs$core$async25318.cljs$lang$ctorPrWriter = (function (this__4374__auto__,writer__4375__auto__,opt__4376__auto__){
return cljs.core._write.call(null,writer__4375__auto__,"cljs.core.async/t_cljs$core$async25318");
});

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async25318.
 */
cljs.core.async.__GT_t_cljs$core$async25318 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async25318(flag__$1,cb__$1,meta25319){
return (new cljs.core.async.t_cljs$core$async25318(flag__$1,cb__$1,meta25319));
});

}

return (new cljs.core.async.t_cljs$core$async25318(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
var flag = cljs.core.async.alt_flag.call(null);
var n = cljs.core.count.call(null,ports);
var idxs = cljs.core.async.random_array.call(null,n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.call(null,ports,idx);
var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,(0)):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,(1));
return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__25321_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__25321_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__25322_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__25322_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__4131__auto__ = wport;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return port;
}
})()], null));
} else {
var G__25323 = (i + (1));
i = G__25323;
continue;
}
} else {
return null;
}
break;
}
})();
var or__4131__auto__ = ret;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__5735__auto__ = (function (){var and__4120__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);
if(cljs.core.truth_(and__4120__auto__)){
return cljs.core.async.impl.protocols.commit.call(null,flag);
} else {
return and__4120__auto__;
}
})();
if(cljs.core.truth_(temp__5735__auto__)){
var got = temp__5735__auto__;
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__4736__auto__ = [];
var len__4730__auto___25329 = arguments.length;
var i__4731__auto___25330 = (0);
while(true){
if((i__4731__auto___25330 < len__4730__auto___25329)){
args__4736__auto__.push((arguments[i__4731__auto___25330]));

var G__25331 = (i__4731__auto___25330 + (1));
i__4731__auto___25330 = G__25331;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((1) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4737__auto__);
});

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__25326){
var map__25327 = p__25326;
var map__25327__$1 = (((((!((map__25327 == null))))?(((((map__25327.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__25327.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25327):map__25327);
var opts = map__25327__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

/** @this {Function} */
cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq25324){
var G__25325 = cljs.core.first.call(null,seq25324);
var seq25324__$1 = cljs.core.next.call(null,seq25324);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__25325,seq25324__$1);
});

/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref.call(null,ret);
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref.call(null,ret);
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var G__25333 = arguments.length;
switch (G__25333) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.call(null,from,to,true);
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__23368__auto___25379 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto___25379){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto___25379){
return (function (state_25357){
var state_val_25358 = (state_25357[(1)]);
if((state_val_25358 === (7))){
var inst_25353 = (state_25357[(2)]);
var state_25357__$1 = state_25357;
var statearr_25359_25380 = state_25357__$1;
(statearr_25359_25380[(2)] = inst_25353);

(statearr_25359_25380[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25358 === (1))){
var state_25357__$1 = state_25357;
var statearr_25360_25381 = state_25357__$1;
(statearr_25360_25381[(2)] = null);

(statearr_25360_25381[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25358 === (4))){
var inst_25336 = (state_25357[(7)]);
var inst_25336__$1 = (state_25357[(2)]);
var inst_25337 = (inst_25336__$1 == null);
var state_25357__$1 = (function (){var statearr_25361 = state_25357;
(statearr_25361[(7)] = inst_25336__$1);

return statearr_25361;
})();
if(cljs.core.truth_(inst_25337)){
var statearr_25362_25382 = state_25357__$1;
(statearr_25362_25382[(1)] = (5));

} else {
var statearr_25363_25383 = state_25357__$1;
(statearr_25363_25383[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25358 === (13))){
var state_25357__$1 = state_25357;
var statearr_25364_25384 = state_25357__$1;
(statearr_25364_25384[(2)] = null);

(statearr_25364_25384[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25358 === (6))){
var inst_25336 = (state_25357[(7)]);
var state_25357__$1 = state_25357;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25357__$1,(11),to,inst_25336);
} else {
if((state_val_25358 === (3))){
var inst_25355 = (state_25357[(2)]);
var state_25357__$1 = state_25357;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25357__$1,inst_25355);
} else {
if((state_val_25358 === (12))){
var state_25357__$1 = state_25357;
var statearr_25365_25385 = state_25357__$1;
(statearr_25365_25385[(2)] = null);

(statearr_25365_25385[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25358 === (2))){
var state_25357__$1 = state_25357;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25357__$1,(4),from);
} else {
if((state_val_25358 === (11))){
var inst_25346 = (state_25357[(2)]);
var state_25357__$1 = state_25357;
if(cljs.core.truth_(inst_25346)){
var statearr_25366_25386 = state_25357__$1;
(statearr_25366_25386[(1)] = (12));

} else {
var statearr_25367_25387 = state_25357__$1;
(statearr_25367_25387[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25358 === (9))){
var state_25357__$1 = state_25357;
var statearr_25368_25388 = state_25357__$1;
(statearr_25368_25388[(2)] = null);

(statearr_25368_25388[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25358 === (5))){
var state_25357__$1 = state_25357;
if(cljs.core.truth_(close_QMARK_)){
var statearr_25369_25389 = state_25357__$1;
(statearr_25369_25389[(1)] = (8));

} else {
var statearr_25370_25390 = state_25357__$1;
(statearr_25370_25390[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25358 === (14))){
var inst_25351 = (state_25357[(2)]);
var state_25357__$1 = state_25357;
var statearr_25371_25391 = state_25357__$1;
(statearr_25371_25391[(2)] = inst_25351);

(statearr_25371_25391[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25358 === (10))){
var inst_25343 = (state_25357[(2)]);
var state_25357__$1 = state_25357;
var statearr_25372_25392 = state_25357__$1;
(statearr_25372_25392[(2)] = inst_25343);

(statearr_25372_25392[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25358 === (8))){
var inst_25340 = cljs.core.async.close_BANG_.call(null,to);
var state_25357__$1 = state_25357;
var statearr_25373_25393 = state_25357__$1;
(statearr_25373_25393[(2)] = inst_25340);

(statearr_25373_25393[(1)] = (10));


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
});})(c__23368__auto___25379))
;
return ((function (switch__23201__auto__,c__23368__auto___25379){
return (function() {
var cljs$core$async$state_machine__23202__auto__ = null;
var cljs$core$async$state_machine__23202__auto____0 = (function (){
var statearr_25374 = [null,null,null,null,null,null,null,null];
(statearr_25374[(0)] = cljs$core$async$state_machine__23202__auto__);

(statearr_25374[(1)] = (1));

return statearr_25374;
});
var cljs$core$async$state_machine__23202__auto____1 = (function (state_25357){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_25357);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e25375){if((e25375 instanceof Object)){
var ex__23205__auto__ = e25375;
var statearr_25376_25394 = state_25357;
(statearr_25376_25394[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25357);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25375;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25395 = state_25357;
state_25357 = G__25395;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
cljs$core$async$state_machine__23202__auto__ = function(state_25357){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__23202__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__23202__auto____1.call(this,state_25357);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__23202__auto____0;
cljs$core$async$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__23202__auto____1;
return cljs$core$async$state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto___25379))
})();
var state__23370__auto__ = (function (){var statearr_25377 = f__23369__auto__.call(null);
(statearr_25377[(6)] = c__23368__auto___25379);

return statearr_25377;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto___25379))
);


return to;
});

cljs.core.async.pipe.cljs$lang$maxFixedArity = 3;

cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error("Assert failed: (pos? n)"));
}

var jobs = cljs.core.async.chan.call(null,n);
var results = cljs.core.async.chan.call(null,n);
var process = ((function (jobs,results){
return (function (p__25396){
var vec__25397 = p__25396;
var v = cljs.core.nth.call(null,vec__25397,(0),null);
var p = cljs.core.nth.call(null,vec__25397,(1),null);
var job = vec__25397;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__23368__auto___25568 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto___25568,res,vec__25397,v,p,job,jobs,results){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto___25568,res,vec__25397,v,p,job,jobs,results){
return (function (state_25404){
var state_val_25405 = (state_25404[(1)]);
if((state_val_25405 === (1))){
var state_25404__$1 = state_25404;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25404__$1,(2),res,v);
} else {
if((state_val_25405 === (2))){
var inst_25401 = (state_25404[(2)]);
var inst_25402 = cljs.core.async.close_BANG_.call(null,res);
var state_25404__$1 = (function (){var statearr_25406 = state_25404;
(statearr_25406[(7)] = inst_25401);

return statearr_25406;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25404__$1,inst_25402);
} else {
return null;
}
}
});})(c__23368__auto___25568,res,vec__25397,v,p,job,jobs,results))
;
return ((function (switch__23201__auto__,c__23368__auto___25568,res,vec__25397,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____0 = (function (){
var statearr_25407 = [null,null,null,null,null,null,null,null];
(statearr_25407[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__);

(statearr_25407[(1)] = (1));

return statearr_25407;
});
var cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____1 = (function (state_25404){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_25404);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e25408){if((e25408 instanceof Object)){
var ex__23205__auto__ = e25408;
var statearr_25409_25569 = state_25404;
(statearr_25409_25569[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25404);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25408;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25570 = state_25404;
state_25404 = G__25570;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__ = function(state_25404){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____1.call(this,state_25404);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto___25568,res,vec__25397,v,p,job,jobs,results))
})();
var state__23370__auto__ = (function (){var statearr_25410 = f__23369__auto__.call(null);
(statearr_25410[(6)] = c__23368__auto___25568);

return statearr_25410;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto___25568,res,vec__25397,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__25411){
var vec__25412 = p__25411;
var v = cljs.core.nth.call(null,vec__25412,(0),null);
var p = cljs.core.nth.call(null,vec__25412,(1),null);
var job = vec__25412;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1));
xf.call(null,v,res);

cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results,process))
;
var n__4607__auto___25571 = n;
var __25572 = (0);
while(true){
if((__25572 < n__4607__auto___25571)){
var G__25415_25573 = type;
var G__25415_25574__$1 = (((G__25415_25573 instanceof cljs.core.Keyword))?G__25415_25573.fqn:null);
switch (G__25415_25574__$1) {
case "compute":
var c__23368__auto___25576 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__25572,c__23368__auto___25576,G__25415_25573,G__25415_25574__$1,n__4607__auto___25571,jobs,results,process,async){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (__25572,c__23368__auto___25576,G__25415_25573,G__25415_25574__$1,n__4607__auto___25571,jobs,results,process,async){
return (function (state_25428){
var state_val_25429 = (state_25428[(1)]);
if((state_val_25429 === (1))){
var state_25428__$1 = state_25428;
var statearr_25430_25577 = state_25428__$1;
(statearr_25430_25577[(2)] = null);

(statearr_25430_25577[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25429 === (2))){
var state_25428__$1 = state_25428;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25428__$1,(4),jobs);
} else {
if((state_val_25429 === (3))){
var inst_25426 = (state_25428[(2)]);
var state_25428__$1 = state_25428;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25428__$1,inst_25426);
} else {
if((state_val_25429 === (4))){
var inst_25418 = (state_25428[(2)]);
var inst_25419 = process.call(null,inst_25418);
var state_25428__$1 = state_25428;
if(cljs.core.truth_(inst_25419)){
var statearr_25431_25578 = state_25428__$1;
(statearr_25431_25578[(1)] = (5));

} else {
var statearr_25432_25579 = state_25428__$1;
(statearr_25432_25579[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25429 === (5))){
var state_25428__$1 = state_25428;
var statearr_25433_25580 = state_25428__$1;
(statearr_25433_25580[(2)] = null);

(statearr_25433_25580[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25429 === (6))){
var state_25428__$1 = state_25428;
var statearr_25434_25581 = state_25428__$1;
(statearr_25434_25581[(2)] = null);

(statearr_25434_25581[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25429 === (7))){
var inst_25424 = (state_25428[(2)]);
var state_25428__$1 = state_25428;
var statearr_25435_25582 = state_25428__$1;
(statearr_25435_25582[(2)] = inst_25424);

(statearr_25435_25582[(1)] = (3));


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
});})(__25572,c__23368__auto___25576,G__25415_25573,G__25415_25574__$1,n__4607__auto___25571,jobs,results,process,async))
;
return ((function (__25572,switch__23201__auto__,c__23368__auto___25576,G__25415_25573,G__25415_25574__$1,n__4607__auto___25571,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____0 = (function (){
var statearr_25436 = [null,null,null,null,null,null,null];
(statearr_25436[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__);

(statearr_25436[(1)] = (1));

return statearr_25436;
});
var cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____1 = (function (state_25428){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_25428);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e25437){if((e25437 instanceof Object)){
var ex__23205__auto__ = e25437;
var statearr_25438_25583 = state_25428;
(statearr_25438_25583[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25428);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25437;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25584 = state_25428;
state_25428 = G__25584;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__ = function(state_25428){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____1.call(this,state_25428);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__;
})()
;})(__25572,switch__23201__auto__,c__23368__auto___25576,G__25415_25573,G__25415_25574__$1,n__4607__auto___25571,jobs,results,process,async))
})();
var state__23370__auto__ = (function (){var statearr_25439 = f__23369__auto__.call(null);
(statearr_25439[(6)] = c__23368__auto___25576);

return statearr_25439;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(__25572,c__23368__auto___25576,G__25415_25573,G__25415_25574__$1,n__4607__auto___25571,jobs,results,process,async))
);


break;
case "async":
var c__23368__auto___25585 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__25572,c__23368__auto___25585,G__25415_25573,G__25415_25574__$1,n__4607__auto___25571,jobs,results,process,async){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (__25572,c__23368__auto___25585,G__25415_25573,G__25415_25574__$1,n__4607__auto___25571,jobs,results,process,async){
return (function (state_25452){
var state_val_25453 = (state_25452[(1)]);
if((state_val_25453 === (1))){
var state_25452__$1 = state_25452;
var statearr_25454_25586 = state_25452__$1;
(statearr_25454_25586[(2)] = null);

(statearr_25454_25586[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25453 === (2))){
var state_25452__$1 = state_25452;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25452__$1,(4),jobs);
} else {
if((state_val_25453 === (3))){
var inst_25450 = (state_25452[(2)]);
var state_25452__$1 = state_25452;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25452__$1,inst_25450);
} else {
if((state_val_25453 === (4))){
var inst_25442 = (state_25452[(2)]);
var inst_25443 = async.call(null,inst_25442);
var state_25452__$1 = state_25452;
if(cljs.core.truth_(inst_25443)){
var statearr_25455_25587 = state_25452__$1;
(statearr_25455_25587[(1)] = (5));

} else {
var statearr_25456_25588 = state_25452__$1;
(statearr_25456_25588[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25453 === (5))){
var state_25452__$1 = state_25452;
var statearr_25457_25589 = state_25452__$1;
(statearr_25457_25589[(2)] = null);

(statearr_25457_25589[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25453 === (6))){
var state_25452__$1 = state_25452;
var statearr_25458_25590 = state_25452__$1;
(statearr_25458_25590[(2)] = null);

(statearr_25458_25590[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25453 === (7))){
var inst_25448 = (state_25452[(2)]);
var state_25452__$1 = state_25452;
var statearr_25459_25591 = state_25452__$1;
(statearr_25459_25591[(2)] = inst_25448);

(statearr_25459_25591[(1)] = (3));


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
});})(__25572,c__23368__auto___25585,G__25415_25573,G__25415_25574__$1,n__4607__auto___25571,jobs,results,process,async))
;
return ((function (__25572,switch__23201__auto__,c__23368__auto___25585,G__25415_25573,G__25415_25574__$1,n__4607__auto___25571,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____0 = (function (){
var statearr_25460 = [null,null,null,null,null,null,null];
(statearr_25460[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__);

(statearr_25460[(1)] = (1));

return statearr_25460;
});
var cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____1 = (function (state_25452){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_25452);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e25461){if((e25461 instanceof Object)){
var ex__23205__auto__ = e25461;
var statearr_25462_25592 = state_25452;
(statearr_25462_25592[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25452);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25461;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25593 = state_25452;
state_25452 = G__25593;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__ = function(state_25452){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____1.call(this,state_25452);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__;
})()
;})(__25572,switch__23201__auto__,c__23368__auto___25585,G__25415_25573,G__25415_25574__$1,n__4607__auto___25571,jobs,results,process,async))
})();
var state__23370__auto__ = (function (){var statearr_25463 = f__23369__auto__.call(null);
(statearr_25463[(6)] = c__23368__auto___25585);

return statearr_25463;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(__25572,c__23368__auto___25585,G__25415_25573,G__25415_25574__$1,n__4607__auto___25571,jobs,results,process,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__25415_25574__$1)].join('')));

}

var G__25594 = (__25572 + (1));
__25572 = G__25594;
continue;
} else {
}
break;
}

var c__23368__auto___25595 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto___25595,jobs,results,process,async){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto___25595,jobs,results,process,async){
return (function (state_25485){
var state_val_25486 = (state_25485[(1)]);
if((state_val_25486 === (7))){
var inst_25481 = (state_25485[(2)]);
var state_25485__$1 = state_25485;
var statearr_25487_25596 = state_25485__$1;
(statearr_25487_25596[(2)] = inst_25481);

(statearr_25487_25596[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25486 === (1))){
var state_25485__$1 = state_25485;
var statearr_25488_25597 = state_25485__$1;
(statearr_25488_25597[(2)] = null);

(statearr_25488_25597[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25486 === (4))){
var inst_25466 = (state_25485[(7)]);
var inst_25466__$1 = (state_25485[(2)]);
var inst_25467 = (inst_25466__$1 == null);
var state_25485__$1 = (function (){var statearr_25489 = state_25485;
(statearr_25489[(7)] = inst_25466__$1);

return statearr_25489;
})();
if(cljs.core.truth_(inst_25467)){
var statearr_25490_25598 = state_25485__$1;
(statearr_25490_25598[(1)] = (5));

} else {
var statearr_25491_25599 = state_25485__$1;
(statearr_25491_25599[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25486 === (6))){
var inst_25471 = (state_25485[(8)]);
var inst_25466 = (state_25485[(7)]);
var inst_25471__$1 = cljs.core.async.chan.call(null,(1));
var inst_25472 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_25473 = [inst_25466,inst_25471__$1];
var inst_25474 = (new cljs.core.PersistentVector(null,2,(5),inst_25472,inst_25473,null));
var state_25485__$1 = (function (){var statearr_25492 = state_25485;
(statearr_25492[(8)] = inst_25471__$1);

return statearr_25492;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25485__$1,(8),jobs,inst_25474);
} else {
if((state_val_25486 === (3))){
var inst_25483 = (state_25485[(2)]);
var state_25485__$1 = state_25485;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25485__$1,inst_25483);
} else {
if((state_val_25486 === (2))){
var state_25485__$1 = state_25485;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25485__$1,(4),from);
} else {
if((state_val_25486 === (9))){
var inst_25478 = (state_25485[(2)]);
var state_25485__$1 = (function (){var statearr_25493 = state_25485;
(statearr_25493[(9)] = inst_25478);

return statearr_25493;
})();
var statearr_25494_25600 = state_25485__$1;
(statearr_25494_25600[(2)] = null);

(statearr_25494_25600[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25486 === (5))){
var inst_25469 = cljs.core.async.close_BANG_.call(null,jobs);
var state_25485__$1 = state_25485;
var statearr_25495_25601 = state_25485__$1;
(statearr_25495_25601[(2)] = inst_25469);

(statearr_25495_25601[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25486 === (8))){
var inst_25471 = (state_25485[(8)]);
var inst_25476 = (state_25485[(2)]);
var state_25485__$1 = (function (){var statearr_25496 = state_25485;
(statearr_25496[(10)] = inst_25476);

return statearr_25496;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25485__$1,(9),results,inst_25471);
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
});})(c__23368__auto___25595,jobs,results,process,async))
;
return ((function (switch__23201__auto__,c__23368__auto___25595,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____0 = (function (){
var statearr_25497 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_25497[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__);

(statearr_25497[(1)] = (1));

return statearr_25497;
});
var cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____1 = (function (state_25485){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_25485);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e25498){if((e25498 instanceof Object)){
var ex__23205__auto__ = e25498;
var statearr_25499_25602 = state_25485;
(statearr_25499_25602[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25485);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25498;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25603 = state_25485;
state_25485 = G__25603;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__ = function(state_25485){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____1.call(this,state_25485);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto___25595,jobs,results,process,async))
})();
var state__23370__auto__ = (function (){var statearr_25500 = f__23369__auto__.call(null);
(statearr_25500[(6)] = c__23368__auto___25595);

return statearr_25500;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto___25595,jobs,results,process,async))
);


var c__23368__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto__,jobs,results,process,async){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto__,jobs,results,process,async){
return (function (state_25538){
var state_val_25539 = (state_25538[(1)]);
if((state_val_25539 === (7))){
var inst_25534 = (state_25538[(2)]);
var state_25538__$1 = state_25538;
var statearr_25540_25604 = state_25538__$1;
(statearr_25540_25604[(2)] = inst_25534);

(statearr_25540_25604[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25539 === (20))){
var state_25538__$1 = state_25538;
var statearr_25541_25605 = state_25538__$1;
(statearr_25541_25605[(2)] = null);

(statearr_25541_25605[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25539 === (1))){
var state_25538__$1 = state_25538;
var statearr_25542_25606 = state_25538__$1;
(statearr_25542_25606[(2)] = null);

(statearr_25542_25606[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25539 === (4))){
var inst_25503 = (state_25538[(7)]);
var inst_25503__$1 = (state_25538[(2)]);
var inst_25504 = (inst_25503__$1 == null);
var state_25538__$1 = (function (){var statearr_25543 = state_25538;
(statearr_25543[(7)] = inst_25503__$1);

return statearr_25543;
})();
if(cljs.core.truth_(inst_25504)){
var statearr_25544_25607 = state_25538__$1;
(statearr_25544_25607[(1)] = (5));

} else {
var statearr_25545_25608 = state_25538__$1;
(statearr_25545_25608[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25539 === (15))){
var inst_25516 = (state_25538[(8)]);
var state_25538__$1 = state_25538;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25538__$1,(18),to,inst_25516);
} else {
if((state_val_25539 === (21))){
var inst_25529 = (state_25538[(2)]);
var state_25538__$1 = state_25538;
var statearr_25546_25609 = state_25538__$1;
(statearr_25546_25609[(2)] = inst_25529);

(statearr_25546_25609[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25539 === (13))){
var inst_25531 = (state_25538[(2)]);
var state_25538__$1 = (function (){var statearr_25547 = state_25538;
(statearr_25547[(9)] = inst_25531);

return statearr_25547;
})();
var statearr_25548_25610 = state_25538__$1;
(statearr_25548_25610[(2)] = null);

(statearr_25548_25610[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25539 === (6))){
var inst_25503 = (state_25538[(7)]);
var state_25538__$1 = state_25538;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25538__$1,(11),inst_25503);
} else {
if((state_val_25539 === (17))){
var inst_25524 = (state_25538[(2)]);
var state_25538__$1 = state_25538;
if(cljs.core.truth_(inst_25524)){
var statearr_25549_25611 = state_25538__$1;
(statearr_25549_25611[(1)] = (19));

} else {
var statearr_25550_25612 = state_25538__$1;
(statearr_25550_25612[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25539 === (3))){
var inst_25536 = (state_25538[(2)]);
var state_25538__$1 = state_25538;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25538__$1,inst_25536);
} else {
if((state_val_25539 === (12))){
var inst_25513 = (state_25538[(10)]);
var state_25538__$1 = state_25538;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25538__$1,(14),inst_25513);
} else {
if((state_val_25539 === (2))){
var state_25538__$1 = state_25538;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25538__$1,(4),results);
} else {
if((state_val_25539 === (19))){
var state_25538__$1 = state_25538;
var statearr_25551_25613 = state_25538__$1;
(statearr_25551_25613[(2)] = null);

(statearr_25551_25613[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25539 === (11))){
var inst_25513 = (state_25538[(2)]);
var state_25538__$1 = (function (){var statearr_25552 = state_25538;
(statearr_25552[(10)] = inst_25513);

return statearr_25552;
})();
var statearr_25553_25614 = state_25538__$1;
(statearr_25553_25614[(2)] = null);

(statearr_25553_25614[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25539 === (9))){
var state_25538__$1 = state_25538;
var statearr_25554_25615 = state_25538__$1;
(statearr_25554_25615[(2)] = null);

(statearr_25554_25615[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25539 === (5))){
var state_25538__$1 = state_25538;
if(cljs.core.truth_(close_QMARK_)){
var statearr_25555_25616 = state_25538__$1;
(statearr_25555_25616[(1)] = (8));

} else {
var statearr_25556_25617 = state_25538__$1;
(statearr_25556_25617[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25539 === (14))){
var inst_25516 = (state_25538[(8)]);
var inst_25518 = (state_25538[(11)]);
var inst_25516__$1 = (state_25538[(2)]);
var inst_25517 = (inst_25516__$1 == null);
var inst_25518__$1 = cljs.core.not.call(null,inst_25517);
var state_25538__$1 = (function (){var statearr_25557 = state_25538;
(statearr_25557[(8)] = inst_25516__$1);

(statearr_25557[(11)] = inst_25518__$1);

return statearr_25557;
})();
if(inst_25518__$1){
var statearr_25558_25618 = state_25538__$1;
(statearr_25558_25618[(1)] = (15));

} else {
var statearr_25559_25619 = state_25538__$1;
(statearr_25559_25619[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25539 === (16))){
var inst_25518 = (state_25538[(11)]);
var state_25538__$1 = state_25538;
var statearr_25560_25620 = state_25538__$1;
(statearr_25560_25620[(2)] = inst_25518);

(statearr_25560_25620[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25539 === (10))){
var inst_25510 = (state_25538[(2)]);
var state_25538__$1 = state_25538;
var statearr_25561_25621 = state_25538__$1;
(statearr_25561_25621[(2)] = inst_25510);

(statearr_25561_25621[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25539 === (18))){
var inst_25521 = (state_25538[(2)]);
var state_25538__$1 = state_25538;
var statearr_25562_25622 = state_25538__$1;
(statearr_25562_25622[(2)] = inst_25521);

(statearr_25562_25622[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25539 === (8))){
var inst_25507 = cljs.core.async.close_BANG_.call(null,to);
var state_25538__$1 = state_25538;
var statearr_25563_25623 = state_25538__$1;
(statearr_25563_25623[(2)] = inst_25507);

(statearr_25563_25623[(1)] = (10));


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
});})(c__23368__auto__,jobs,results,process,async))
;
return ((function (switch__23201__auto__,c__23368__auto__,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____0 = (function (){
var statearr_25564 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_25564[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__);

(statearr_25564[(1)] = (1));

return statearr_25564;
});
var cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____1 = (function (state_25538){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_25538);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e25565){if((e25565 instanceof Object)){
var ex__23205__auto__ = e25565;
var statearr_25566_25624 = state_25538;
(statearr_25566_25624[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25538);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25565;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25625 = state_25538;
state_25538 = G__25625;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__ = function(state_25538){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____1.call(this,state_25538);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__23202__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto__,jobs,results,process,async))
})();
var state__23370__auto__ = (function (){var statearr_25567 = f__23369__auto__.call(null);
(statearr_25567[(6)] = c__23368__auto__);

return statearr_25567;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto__,jobs,results,process,async))
);

return c__23368__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). af must close!
 *   the channel before returning.  The presumption is that af will
 *   return immediately, having launched some asynchronous operation
 *   whose completion/callback will manipulate the result channel. Outputs
 *   will be returned in order relative to  the inputs. By default, the to
 *   channel will be closed when the from channel closes, but can be
 *   determined by the close?  parameter. Will stop consuming the from
 *   channel if the to channel closes.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var G__25627 = arguments.length;
switch (G__25627) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.call(null,n,to,af,from,true);
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_.call(null,n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
});

cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5;

/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var G__25630 = arguments.length;
switch (G__25630) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.call(null,n,to,xf,from,true);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.call(null,n,to,xf,from,close_QMARK_,null);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_.call(null,n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
});

cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6;

/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var G__25633 = arguments.length;
switch (G__25633) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.call(null,p,ch,null,null);
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.call(null,t_buf_or_n);
var fc = cljs.core.async.chan.call(null,f_buf_or_n);
var c__23368__auto___25682 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto___25682,tc,fc){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto___25682,tc,fc){
return (function (state_25659){
var state_val_25660 = (state_25659[(1)]);
if((state_val_25660 === (7))){
var inst_25655 = (state_25659[(2)]);
var state_25659__$1 = state_25659;
var statearr_25661_25683 = state_25659__$1;
(statearr_25661_25683[(2)] = inst_25655);

(statearr_25661_25683[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25660 === (1))){
var state_25659__$1 = state_25659;
var statearr_25662_25684 = state_25659__$1;
(statearr_25662_25684[(2)] = null);

(statearr_25662_25684[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25660 === (4))){
var inst_25636 = (state_25659[(7)]);
var inst_25636__$1 = (state_25659[(2)]);
var inst_25637 = (inst_25636__$1 == null);
var state_25659__$1 = (function (){var statearr_25663 = state_25659;
(statearr_25663[(7)] = inst_25636__$1);

return statearr_25663;
})();
if(cljs.core.truth_(inst_25637)){
var statearr_25664_25685 = state_25659__$1;
(statearr_25664_25685[(1)] = (5));

} else {
var statearr_25665_25686 = state_25659__$1;
(statearr_25665_25686[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25660 === (13))){
var state_25659__$1 = state_25659;
var statearr_25666_25687 = state_25659__$1;
(statearr_25666_25687[(2)] = null);

(statearr_25666_25687[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25660 === (6))){
var inst_25636 = (state_25659[(7)]);
var inst_25642 = p.call(null,inst_25636);
var state_25659__$1 = state_25659;
if(cljs.core.truth_(inst_25642)){
var statearr_25667_25688 = state_25659__$1;
(statearr_25667_25688[(1)] = (9));

} else {
var statearr_25668_25689 = state_25659__$1;
(statearr_25668_25689[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25660 === (3))){
var inst_25657 = (state_25659[(2)]);
var state_25659__$1 = state_25659;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25659__$1,inst_25657);
} else {
if((state_val_25660 === (12))){
var state_25659__$1 = state_25659;
var statearr_25669_25690 = state_25659__$1;
(statearr_25669_25690[(2)] = null);

(statearr_25669_25690[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25660 === (2))){
var state_25659__$1 = state_25659;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25659__$1,(4),ch);
} else {
if((state_val_25660 === (11))){
var inst_25636 = (state_25659[(7)]);
var inst_25646 = (state_25659[(2)]);
var state_25659__$1 = state_25659;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25659__$1,(8),inst_25646,inst_25636);
} else {
if((state_val_25660 === (9))){
var state_25659__$1 = state_25659;
var statearr_25670_25691 = state_25659__$1;
(statearr_25670_25691[(2)] = tc);

(statearr_25670_25691[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25660 === (5))){
var inst_25639 = cljs.core.async.close_BANG_.call(null,tc);
var inst_25640 = cljs.core.async.close_BANG_.call(null,fc);
var state_25659__$1 = (function (){var statearr_25671 = state_25659;
(statearr_25671[(8)] = inst_25639);

return statearr_25671;
})();
var statearr_25672_25692 = state_25659__$1;
(statearr_25672_25692[(2)] = inst_25640);

(statearr_25672_25692[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25660 === (14))){
var inst_25653 = (state_25659[(2)]);
var state_25659__$1 = state_25659;
var statearr_25673_25693 = state_25659__$1;
(statearr_25673_25693[(2)] = inst_25653);

(statearr_25673_25693[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25660 === (10))){
var state_25659__$1 = state_25659;
var statearr_25674_25694 = state_25659__$1;
(statearr_25674_25694[(2)] = fc);

(statearr_25674_25694[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25660 === (8))){
var inst_25648 = (state_25659[(2)]);
var state_25659__$1 = state_25659;
if(cljs.core.truth_(inst_25648)){
var statearr_25675_25695 = state_25659__$1;
(statearr_25675_25695[(1)] = (12));

} else {
var statearr_25676_25696 = state_25659__$1;
(statearr_25676_25696[(1)] = (13));

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
});})(c__23368__auto___25682,tc,fc))
;
return ((function (switch__23201__auto__,c__23368__auto___25682,tc,fc){
return (function() {
var cljs$core$async$state_machine__23202__auto__ = null;
var cljs$core$async$state_machine__23202__auto____0 = (function (){
var statearr_25677 = [null,null,null,null,null,null,null,null,null];
(statearr_25677[(0)] = cljs$core$async$state_machine__23202__auto__);

(statearr_25677[(1)] = (1));

return statearr_25677;
});
var cljs$core$async$state_machine__23202__auto____1 = (function (state_25659){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_25659);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e25678){if((e25678 instanceof Object)){
var ex__23205__auto__ = e25678;
var statearr_25679_25697 = state_25659;
(statearr_25679_25697[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25659);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25678;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25698 = state_25659;
state_25659 = G__25698;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
cljs$core$async$state_machine__23202__auto__ = function(state_25659){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__23202__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__23202__auto____1.call(this,state_25659);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__23202__auto____0;
cljs$core$async$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__23202__auto____1;
return cljs$core$async$state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto___25682,tc,fc))
})();
var state__23370__auto__ = (function (){var statearr_25680 = f__23369__auto__.call(null);
(statearr_25680[(6)] = c__23368__auto___25682);

return statearr_25680;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto___25682,tc,fc))
);


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});

cljs.core.async.split.cljs$lang$maxFixedArity = 4;

/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__23368__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto__){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto__){
return (function (state_25719){
var state_val_25720 = (state_25719[(1)]);
if((state_val_25720 === (7))){
var inst_25715 = (state_25719[(2)]);
var state_25719__$1 = state_25719;
var statearr_25721_25739 = state_25719__$1;
(statearr_25721_25739[(2)] = inst_25715);

(statearr_25721_25739[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25720 === (1))){
var inst_25699 = init;
var state_25719__$1 = (function (){var statearr_25722 = state_25719;
(statearr_25722[(7)] = inst_25699);

return statearr_25722;
})();
var statearr_25723_25740 = state_25719__$1;
(statearr_25723_25740[(2)] = null);

(statearr_25723_25740[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25720 === (4))){
var inst_25702 = (state_25719[(8)]);
var inst_25702__$1 = (state_25719[(2)]);
var inst_25703 = (inst_25702__$1 == null);
var state_25719__$1 = (function (){var statearr_25724 = state_25719;
(statearr_25724[(8)] = inst_25702__$1);

return statearr_25724;
})();
if(cljs.core.truth_(inst_25703)){
var statearr_25725_25741 = state_25719__$1;
(statearr_25725_25741[(1)] = (5));

} else {
var statearr_25726_25742 = state_25719__$1;
(statearr_25726_25742[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25720 === (6))){
var inst_25702 = (state_25719[(8)]);
var inst_25706 = (state_25719[(9)]);
var inst_25699 = (state_25719[(7)]);
var inst_25706__$1 = f.call(null,inst_25699,inst_25702);
var inst_25707 = cljs.core.reduced_QMARK_.call(null,inst_25706__$1);
var state_25719__$1 = (function (){var statearr_25727 = state_25719;
(statearr_25727[(9)] = inst_25706__$1);

return statearr_25727;
})();
if(inst_25707){
var statearr_25728_25743 = state_25719__$1;
(statearr_25728_25743[(1)] = (8));

} else {
var statearr_25729_25744 = state_25719__$1;
(statearr_25729_25744[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25720 === (3))){
var inst_25717 = (state_25719[(2)]);
var state_25719__$1 = state_25719;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25719__$1,inst_25717);
} else {
if((state_val_25720 === (2))){
var state_25719__$1 = state_25719;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25719__$1,(4),ch);
} else {
if((state_val_25720 === (9))){
var inst_25706 = (state_25719[(9)]);
var inst_25699 = inst_25706;
var state_25719__$1 = (function (){var statearr_25730 = state_25719;
(statearr_25730[(7)] = inst_25699);

return statearr_25730;
})();
var statearr_25731_25745 = state_25719__$1;
(statearr_25731_25745[(2)] = null);

(statearr_25731_25745[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25720 === (5))){
var inst_25699 = (state_25719[(7)]);
var state_25719__$1 = state_25719;
var statearr_25732_25746 = state_25719__$1;
(statearr_25732_25746[(2)] = inst_25699);

(statearr_25732_25746[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25720 === (10))){
var inst_25713 = (state_25719[(2)]);
var state_25719__$1 = state_25719;
var statearr_25733_25747 = state_25719__$1;
(statearr_25733_25747[(2)] = inst_25713);

(statearr_25733_25747[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25720 === (8))){
var inst_25706 = (state_25719[(9)]);
var inst_25709 = cljs.core.deref.call(null,inst_25706);
var state_25719__$1 = state_25719;
var statearr_25734_25748 = state_25719__$1;
(statearr_25734_25748[(2)] = inst_25709);

(statearr_25734_25748[(1)] = (10));


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
});})(c__23368__auto__))
;
return ((function (switch__23201__auto__,c__23368__auto__){
return (function() {
var cljs$core$async$reduce_$_state_machine__23202__auto__ = null;
var cljs$core$async$reduce_$_state_machine__23202__auto____0 = (function (){
var statearr_25735 = [null,null,null,null,null,null,null,null,null,null];
(statearr_25735[(0)] = cljs$core$async$reduce_$_state_machine__23202__auto__);

(statearr_25735[(1)] = (1));

return statearr_25735;
});
var cljs$core$async$reduce_$_state_machine__23202__auto____1 = (function (state_25719){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_25719);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e25736){if((e25736 instanceof Object)){
var ex__23205__auto__ = e25736;
var statearr_25737_25749 = state_25719;
(statearr_25737_25749[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25719);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25736;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25750 = state_25719;
state_25719 = G__25750;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__23202__auto__ = function(state_25719){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__23202__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__23202__auto____1.call(this,state_25719);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__23202__auto____0;
cljs$core$async$reduce_$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__23202__auto____1;
return cljs$core$async$reduce_$_state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto__))
})();
var state__23370__auto__ = (function (){var statearr_25738 = f__23369__auto__.call(null);
(statearr_25738[(6)] = c__23368__auto__);

return statearr_25738;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto__))
);

return c__23368__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = xform.call(null,f);
var c__23368__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto__,f__$1){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto__,f__$1){
return (function (state_25756){
var state_val_25757 = (state_25756[(1)]);
if((state_val_25757 === (1))){
var inst_25751 = cljs.core.async.reduce.call(null,f__$1,init,ch);
var state_25756__$1 = state_25756;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25756__$1,(2),inst_25751);
} else {
if((state_val_25757 === (2))){
var inst_25753 = (state_25756[(2)]);
var inst_25754 = f__$1.call(null,inst_25753);
var state_25756__$1 = state_25756;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25756__$1,inst_25754);
} else {
return null;
}
}
});})(c__23368__auto__,f__$1))
;
return ((function (switch__23201__auto__,c__23368__auto__,f__$1){
return (function() {
var cljs$core$async$transduce_$_state_machine__23202__auto__ = null;
var cljs$core$async$transduce_$_state_machine__23202__auto____0 = (function (){
var statearr_25758 = [null,null,null,null,null,null,null];
(statearr_25758[(0)] = cljs$core$async$transduce_$_state_machine__23202__auto__);

(statearr_25758[(1)] = (1));

return statearr_25758;
});
var cljs$core$async$transduce_$_state_machine__23202__auto____1 = (function (state_25756){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_25756);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e25759){if((e25759 instanceof Object)){
var ex__23205__auto__ = e25759;
var statearr_25760_25762 = state_25756;
(statearr_25760_25762[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25756);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25759;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25763 = state_25756;
state_25756 = G__25763;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__23202__auto__ = function(state_25756){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__23202__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__23202__auto____1.call(this,state_25756);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__23202__auto____0;
cljs$core$async$transduce_$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__23202__auto____1;
return cljs$core$async$transduce_$_state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto__,f__$1))
})();
var state__23370__auto__ = (function (){var statearr_25761 = f__23369__auto__.call(null);
(statearr_25761[(6)] = c__23368__auto__);

return statearr_25761;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto__,f__$1))
);

return c__23368__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var G__25765 = arguments.length;
switch (G__25765) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan.call(null,ch,coll,true);
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__23368__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto__){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto__){
return (function (state_25790){
var state_val_25791 = (state_25790[(1)]);
if((state_val_25791 === (7))){
var inst_25772 = (state_25790[(2)]);
var state_25790__$1 = state_25790;
var statearr_25792_25813 = state_25790__$1;
(statearr_25792_25813[(2)] = inst_25772);

(statearr_25792_25813[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25791 === (1))){
var inst_25766 = cljs.core.seq.call(null,coll);
var inst_25767 = inst_25766;
var state_25790__$1 = (function (){var statearr_25793 = state_25790;
(statearr_25793[(7)] = inst_25767);

return statearr_25793;
})();
var statearr_25794_25814 = state_25790__$1;
(statearr_25794_25814[(2)] = null);

(statearr_25794_25814[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25791 === (4))){
var inst_25767 = (state_25790[(7)]);
var inst_25770 = cljs.core.first.call(null,inst_25767);
var state_25790__$1 = state_25790;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25790__$1,(7),ch,inst_25770);
} else {
if((state_val_25791 === (13))){
var inst_25784 = (state_25790[(2)]);
var state_25790__$1 = state_25790;
var statearr_25795_25815 = state_25790__$1;
(statearr_25795_25815[(2)] = inst_25784);

(statearr_25795_25815[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25791 === (6))){
var inst_25775 = (state_25790[(2)]);
var state_25790__$1 = state_25790;
if(cljs.core.truth_(inst_25775)){
var statearr_25796_25816 = state_25790__$1;
(statearr_25796_25816[(1)] = (8));

} else {
var statearr_25797_25817 = state_25790__$1;
(statearr_25797_25817[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25791 === (3))){
var inst_25788 = (state_25790[(2)]);
var state_25790__$1 = state_25790;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25790__$1,inst_25788);
} else {
if((state_val_25791 === (12))){
var state_25790__$1 = state_25790;
var statearr_25798_25818 = state_25790__$1;
(statearr_25798_25818[(2)] = null);

(statearr_25798_25818[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25791 === (2))){
var inst_25767 = (state_25790[(7)]);
var state_25790__$1 = state_25790;
if(cljs.core.truth_(inst_25767)){
var statearr_25799_25819 = state_25790__$1;
(statearr_25799_25819[(1)] = (4));

} else {
var statearr_25800_25820 = state_25790__$1;
(statearr_25800_25820[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25791 === (11))){
var inst_25781 = cljs.core.async.close_BANG_.call(null,ch);
var state_25790__$1 = state_25790;
var statearr_25801_25821 = state_25790__$1;
(statearr_25801_25821[(2)] = inst_25781);

(statearr_25801_25821[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25791 === (9))){
var state_25790__$1 = state_25790;
if(cljs.core.truth_(close_QMARK_)){
var statearr_25802_25822 = state_25790__$1;
(statearr_25802_25822[(1)] = (11));

} else {
var statearr_25803_25823 = state_25790__$1;
(statearr_25803_25823[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25791 === (5))){
var inst_25767 = (state_25790[(7)]);
var state_25790__$1 = state_25790;
var statearr_25804_25824 = state_25790__$1;
(statearr_25804_25824[(2)] = inst_25767);

(statearr_25804_25824[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25791 === (10))){
var inst_25786 = (state_25790[(2)]);
var state_25790__$1 = state_25790;
var statearr_25805_25825 = state_25790__$1;
(statearr_25805_25825[(2)] = inst_25786);

(statearr_25805_25825[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25791 === (8))){
var inst_25767 = (state_25790[(7)]);
var inst_25777 = cljs.core.next.call(null,inst_25767);
var inst_25767__$1 = inst_25777;
var state_25790__$1 = (function (){var statearr_25806 = state_25790;
(statearr_25806[(7)] = inst_25767__$1);

return statearr_25806;
})();
var statearr_25807_25826 = state_25790__$1;
(statearr_25807_25826[(2)] = null);

(statearr_25807_25826[(1)] = (2));


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
});})(c__23368__auto__))
;
return ((function (switch__23201__auto__,c__23368__auto__){
return (function() {
var cljs$core$async$state_machine__23202__auto__ = null;
var cljs$core$async$state_machine__23202__auto____0 = (function (){
var statearr_25808 = [null,null,null,null,null,null,null,null];
(statearr_25808[(0)] = cljs$core$async$state_machine__23202__auto__);

(statearr_25808[(1)] = (1));

return statearr_25808;
});
var cljs$core$async$state_machine__23202__auto____1 = (function (state_25790){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_25790);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e25809){if((e25809 instanceof Object)){
var ex__23205__auto__ = e25809;
var statearr_25810_25827 = state_25790;
(statearr_25810_25827[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25790);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25809;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25828 = state_25790;
state_25790 = G__25828;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
cljs$core$async$state_machine__23202__auto__ = function(state_25790){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__23202__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__23202__auto____1.call(this,state_25790);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__23202__auto____0;
cljs$core$async$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__23202__auto____1;
return cljs$core$async$state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto__))
})();
var state__23370__auto__ = (function (){var statearr_25811 = f__23369__auto__.call(null);
(statearr_25811[(6)] = c__23368__auto__);

return statearr_25811;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto__))
);

return c__23368__auto__;
});

cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3;

/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,(100),coll));
cljs.core.async.onto_chan.call(null,ch,coll);

return ch;
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((((!((_ == null)))) && ((!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
var x__4433__auto__ = (((_ == null))?null:_);
var m__4434__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__4433__auto__)]);
if((!((m__4434__auto__ == null)))){
return m__4434__auto__.call(null,_);
} else {
var m__4431__auto__ = (cljs.core.async.muxch_STAR_["_"]);
if((!((m__4431__auto__ == null)))){
return m__4431__auto__.call(null,_);
} else {
throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
var x__4433__auto__ = (((m == null))?null:m);
var m__4434__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__4433__auto__)]);
if((!((m__4434__auto__ == null)))){
return m__4434__auto__.call(null,m,ch,close_QMARK_);
} else {
var m__4431__auto__ = (cljs.core.async.tap_STAR_["_"]);
if((!((m__4431__auto__ == null)))){
return m__4431__auto__.call(null,m,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
}
});

cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
var x__4433__auto__ = (((m == null))?null:m);
var m__4434__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__4433__auto__)]);
if((!((m__4434__auto__ == null)))){
return m__4434__auto__.call(null,m,ch);
} else {
var m__4431__auto__ = (cljs.core.async.untap_STAR_["_"]);
if((!((m__4431__auto__ == null)))){
return m__4431__auto__.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
}
});

cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
var x__4433__auto__ = (((m == null))?null:m);
var m__4434__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__4433__auto__)]);
if((!((m__4434__auto__ == null)))){
return m__4434__auto__.call(null,m);
} else {
var m__4431__auto__ = (cljs.core.async.untap_all_STAR_["_"]);
if((!((m__4431__auto__ == null)))){
return m__4431__auto__.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
}
});

/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var m = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async25829 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async25829 = (function (ch,cs,meta25830){
this.ch = ch;
this.cs = cs;
this.meta25830 = meta25830;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async25829.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_25831,meta25830__$1){
var self__ = this;
var _25831__$1 = this;
return (new cljs.core.async.t_cljs$core$async25829(self__.ch,self__.cs,meta25830__$1));
});})(cs))
;

cljs.core.async.t_cljs$core$async25829.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_25831){
var self__ = this;
var _25831__$1 = this;
return self__.meta25830;
});})(cs))
;

cljs.core.async.t_cljs$core$async25829.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async25829.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t_cljs$core$async25829.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async25829.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async25829.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async25829.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async25829.getBasis = ((function (cs){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta25830","meta25830",-1306444244,null)], null);
});})(cs))
;

cljs.core.async.t_cljs$core$async25829.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async25829.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async25829";

cljs.core.async.t_cljs$core$async25829.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__4374__auto__,writer__4375__auto__,opt__4376__auto__){
return cljs.core._write.call(null,writer__4375__auto__,"cljs.core.async/t_cljs$core$async25829");
});})(cs))
;

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async25829.
 */
cljs.core.async.__GT_t_cljs$core$async25829 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t_cljs$core$async25829(ch__$1,cs__$1,meta25830){
return (new cljs.core.async.t_cljs$core$async25829(ch__$1,cs__$1,meta25830));
});})(cs))
;

}

return (new cljs.core.async.t_cljs$core$async25829(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = ((function (cs,m,dchan,dctr){
return (function (_){
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,true);
} else {
return null;
}
});})(cs,m,dchan,dctr))
;
var c__23368__auto___26051 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto___26051,cs,m,dchan,dctr,done){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto___26051,cs,m,dchan,dctr,done){
return (function (state_25966){
var state_val_25967 = (state_25966[(1)]);
if((state_val_25967 === (7))){
var inst_25962 = (state_25966[(2)]);
var state_25966__$1 = state_25966;
var statearr_25968_26052 = state_25966__$1;
(statearr_25968_26052[(2)] = inst_25962);

(statearr_25968_26052[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (20))){
var inst_25865 = (state_25966[(7)]);
var inst_25877 = cljs.core.first.call(null,inst_25865);
var inst_25878 = cljs.core.nth.call(null,inst_25877,(0),null);
var inst_25879 = cljs.core.nth.call(null,inst_25877,(1),null);
var state_25966__$1 = (function (){var statearr_25969 = state_25966;
(statearr_25969[(8)] = inst_25878);

return statearr_25969;
})();
if(cljs.core.truth_(inst_25879)){
var statearr_25970_26053 = state_25966__$1;
(statearr_25970_26053[(1)] = (22));

} else {
var statearr_25971_26054 = state_25966__$1;
(statearr_25971_26054[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (27))){
var inst_25909 = (state_25966[(9)]);
var inst_25907 = (state_25966[(10)]);
var inst_25914 = (state_25966[(11)]);
var inst_25834 = (state_25966[(12)]);
var inst_25914__$1 = cljs.core._nth.call(null,inst_25907,inst_25909);
var inst_25915 = cljs.core.async.put_BANG_.call(null,inst_25914__$1,inst_25834,done);
var state_25966__$1 = (function (){var statearr_25972 = state_25966;
(statearr_25972[(11)] = inst_25914__$1);

return statearr_25972;
})();
if(cljs.core.truth_(inst_25915)){
var statearr_25973_26055 = state_25966__$1;
(statearr_25973_26055[(1)] = (30));

} else {
var statearr_25974_26056 = state_25966__$1;
(statearr_25974_26056[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (1))){
var state_25966__$1 = state_25966;
var statearr_25975_26057 = state_25966__$1;
(statearr_25975_26057[(2)] = null);

(statearr_25975_26057[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (24))){
var inst_25865 = (state_25966[(7)]);
var inst_25884 = (state_25966[(2)]);
var inst_25885 = cljs.core.next.call(null,inst_25865);
var inst_25843 = inst_25885;
var inst_25844 = null;
var inst_25845 = (0);
var inst_25846 = (0);
var state_25966__$1 = (function (){var statearr_25976 = state_25966;
(statearr_25976[(13)] = inst_25843);

(statearr_25976[(14)] = inst_25884);

(statearr_25976[(15)] = inst_25844);

(statearr_25976[(16)] = inst_25846);

(statearr_25976[(17)] = inst_25845);

return statearr_25976;
})();
var statearr_25977_26058 = state_25966__$1;
(statearr_25977_26058[(2)] = null);

(statearr_25977_26058[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (39))){
var state_25966__$1 = state_25966;
var statearr_25981_26059 = state_25966__$1;
(statearr_25981_26059[(2)] = null);

(statearr_25981_26059[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (4))){
var inst_25834 = (state_25966[(12)]);
var inst_25834__$1 = (state_25966[(2)]);
var inst_25835 = (inst_25834__$1 == null);
var state_25966__$1 = (function (){var statearr_25982 = state_25966;
(statearr_25982[(12)] = inst_25834__$1);

return statearr_25982;
})();
if(cljs.core.truth_(inst_25835)){
var statearr_25983_26060 = state_25966__$1;
(statearr_25983_26060[(1)] = (5));

} else {
var statearr_25984_26061 = state_25966__$1;
(statearr_25984_26061[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (15))){
var inst_25843 = (state_25966[(13)]);
var inst_25844 = (state_25966[(15)]);
var inst_25846 = (state_25966[(16)]);
var inst_25845 = (state_25966[(17)]);
var inst_25861 = (state_25966[(2)]);
var inst_25862 = (inst_25846 + (1));
var tmp25978 = inst_25843;
var tmp25979 = inst_25844;
var tmp25980 = inst_25845;
var inst_25843__$1 = tmp25978;
var inst_25844__$1 = tmp25979;
var inst_25845__$1 = tmp25980;
var inst_25846__$1 = inst_25862;
var state_25966__$1 = (function (){var statearr_25985 = state_25966;
(statearr_25985[(13)] = inst_25843__$1);

(statearr_25985[(18)] = inst_25861);

(statearr_25985[(15)] = inst_25844__$1);

(statearr_25985[(16)] = inst_25846__$1);

(statearr_25985[(17)] = inst_25845__$1);

return statearr_25985;
})();
var statearr_25986_26062 = state_25966__$1;
(statearr_25986_26062[(2)] = null);

(statearr_25986_26062[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (21))){
var inst_25888 = (state_25966[(2)]);
var state_25966__$1 = state_25966;
var statearr_25990_26063 = state_25966__$1;
(statearr_25990_26063[(2)] = inst_25888);

(statearr_25990_26063[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (31))){
var inst_25914 = (state_25966[(11)]);
var inst_25918 = done.call(null,null);
var inst_25919 = cljs.core.async.untap_STAR_.call(null,m,inst_25914);
var state_25966__$1 = (function (){var statearr_25991 = state_25966;
(statearr_25991[(19)] = inst_25918);

return statearr_25991;
})();
var statearr_25992_26064 = state_25966__$1;
(statearr_25992_26064[(2)] = inst_25919);

(statearr_25992_26064[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (32))){
var inst_25908 = (state_25966[(20)]);
var inst_25909 = (state_25966[(9)]);
var inst_25906 = (state_25966[(21)]);
var inst_25907 = (state_25966[(10)]);
var inst_25921 = (state_25966[(2)]);
var inst_25922 = (inst_25909 + (1));
var tmp25987 = inst_25908;
var tmp25988 = inst_25906;
var tmp25989 = inst_25907;
var inst_25906__$1 = tmp25988;
var inst_25907__$1 = tmp25989;
var inst_25908__$1 = tmp25987;
var inst_25909__$1 = inst_25922;
var state_25966__$1 = (function (){var statearr_25993 = state_25966;
(statearr_25993[(20)] = inst_25908__$1);

(statearr_25993[(9)] = inst_25909__$1);

(statearr_25993[(22)] = inst_25921);

(statearr_25993[(21)] = inst_25906__$1);

(statearr_25993[(10)] = inst_25907__$1);

return statearr_25993;
})();
var statearr_25994_26065 = state_25966__$1;
(statearr_25994_26065[(2)] = null);

(statearr_25994_26065[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (40))){
var inst_25934 = (state_25966[(23)]);
var inst_25938 = done.call(null,null);
var inst_25939 = cljs.core.async.untap_STAR_.call(null,m,inst_25934);
var state_25966__$1 = (function (){var statearr_25995 = state_25966;
(statearr_25995[(24)] = inst_25938);

return statearr_25995;
})();
var statearr_25996_26066 = state_25966__$1;
(statearr_25996_26066[(2)] = inst_25939);

(statearr_25996_26066[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (33))){
var inst_25925 = (state_25966[(25)]);
var inst_25927 = cljs.core.chunked_seq_QMARK_.call(null,inst_25925);
var state_25966__$1 = state_25966;
if(inst_25927){
var statearr_25997_26067 = state_25966__$1;
(statearr_25997_26067[(1)] = (36));

} else {
var statearr_25998_26068 = state_25966__$1;
(statearr_25998_26068[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (13))){
var inst_25855 = (state_25966[(26)]);
var inst_25858 = cljs.core.async.close_BANG_.call(null,inst_25855);
var state_25966__$1 = state_25966;
var statearr_25999_26069 = state_25966__$1;
(statearr_25999_26069[(2)] = inst_25858);

(statearr_25999_26069[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (22))){
var inst_25878 = (state_25966[(8)]);
var inst_25881 = cljs.core.async.close_BANG_.call(null,inst_25878);
var state_25966__$1 = state_25966;
var statearr_26000_26070 = state_25966__$1;
(statearr_26000_26070[(2)] = inst_25881);

(statearr_26000_26070[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (36))){
var inst_25925 = (state_25966[(25)]);
var inst_25929 = cljs.core.chunk_first.call(null,inst_25925);
var inst_25930 = cljs.core.chunk_rest.call(null,inst_25925);
var inst_25931 = cljs.core.count.call(null,inst_25929);
var inst_25906 = inst_25930;
var inst_25907 = inst_25929;
var inst_25908 = inst_25931;
var inst_25909 = (0);
var state_25966__$1 = (function (){var statearr_26001 = state_25966;
(statearr_26001[(20)] = inst_25908);

(statearr_26001[(9)] = inst_25909);

(statearr_26001[(21)] = inst_25906);

(statearr_26001[(10)] = inst_25907);

return statearr_26001;
})();
var statearr_26002_26071 = state_25966__$1;
(statearr_26002_26071[(2)] = null);

(statearr_26002_26071[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (41))){
var inst_25925 = (state_25966[(25)]);
var inst_25941 = (state_25966[(2)]);
var inst_25942 = cljs.core.next.call(null,inst_25925);
var inst_25906 = inst_25942;
var inst_25907 = null;
var inst_25908 = (0);
var inst_25909 = (0);
var state_25966__$1 = (function (){var statearr_26003 = state_25966;
(statearr_26003[(27)] = inst_25941);

(statearr_26003[(20)] = inst_25908);

(statearr_26003[(9)] = inst_25909);

(statearr_26003[(21)] = inst_25906);

(statearr_26003[(10)] = inst_25907);

return statearr_26003;
})();
var statearr_26004_26072 = state_25966__$1;
(statearr_26004_26072[(2)] = null);

(statearr_26004_26072[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (43))){
var state_25966__$1 = state_25966;
var statearr_26005_26073 = state_25966__$1;
(statearr_26005_26073[(2)] = null);

(statearr_26005_26073[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (29))){
var inst_25950 = (state_25966[(2)]);
var state_25966__$1 = state_25966;
var statearr_26006_26074 = state_25966__$1;
(statearr_26006_26074[(2)] = inst_25950);

(statearr_26006_26074[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (44))){
var inst_25959 = (state_25966[(2)]);
var state_25966__$1 = (function (){var statearr_26007 = state_25966;
(statearr_26007[(28)] = inst_25959);

return statearr_26007;
})();
var statearr_26008_26075 = state_25966__$1;
(statearr_26008_26075[(2)] = null);

(statearr_26008_26075[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (6))){
var inst_25898 = (state_25966[(29)]);
var inst_25897 = cljs.core.deref.call(null,cs);
var inst_25898__$1 = cljs.core.keys.call(null,inst_25897);
var inst_25899 = cljs.core.count.call(null,inst_25898__$1);
var inst_25900 = cljs.core.reset_BANG_.call(null,dctr,inst_25899);
var inst_25905 = cljs.core.seq.call(null,inst_25898__$1);
var inst_25906 = inst_25905;
var inst_25907 = null;
var inst_25908 = (0);
var inst_25909 = (0);
var state_25966__$1 = (function (){var statearr_26009 = state_25966;
(statearr_26009[(29)] = inst_25898__$1);

(statearr_26009[(20)] = inst_25908);

(statearr_26009[(9)] = inst_25909);

(statearr_26009[(21)] = inst_25906);

(statearr_26009[(10)] = inst_25907);

(statearr_26009[(30)] = inst_25900);

return statearr_26009;
})();
var statearr_26010_26076 = state_25966__$1;
(statearr_26010_26076[(2)] = null);

(statearr_26010_26076[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (28))){
var inst_25906 = (state_25966[(21)]);
var inst_25925 = (state_25966[(25)]);
var inst_25925__$1 = cljs.core.seq.call(null,inst_25906);
var state_25966__$1 = (function (){var statearr_26011 = state_25966;
(statearr_26011[(25)] = inst_25925__$1);

return statearr_26011;
})();
if(inst_25925__$1){
var statearr_26012_26077 = state_25966__$1;
(statearr_26012_26077[(1)] = (33));

} else {
var statearr_26013_26078 = state_25966__$1;
(statearr_26013_26078[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (25))){
var inst_25908 = (state_25966[(20)]);
var inst_25909 = (state_25966[(9)]);
var inst_25911 = (inst_25909 < inst_25908);
var inst_25912 = inst_25911;
var state_25966__$1 = state_25966;
if(cljs.core.truth_(inst_25912)){
var statearr_26014_26079 = state_25966__$1;
(statearr_26014_26079[(1)] = (27));

} else {
var statearr_26015_26080 = state_25966__$1;
(statearr_26015_26080[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (34))){
var state_25966__$1 = state_25966;
var statearr_26016_26081 = state_25966__$1;
(statearr_26016_26081[(2)] = null);

(statearr_26016_26081[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (17))){
var state_25966__$1 = state_25966;
var statearr_26017_26082 = state_25966__$1;
(statearr_26017_26082[(2)] = null);

(statearr_26017_26082[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (3))){
var inst_25964 = (state_25966[(2)]);
var state_25966__$1 = state_25966;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25966__$1,inst_25964);
} else {
if((state_val_25967 === (12))){
var inst_25893 = (state_25966[(2)]);
var state_25966__$1 = state_25966;
var statearr_26018_26083 = state_25966__$1;
(statearr_26018_26083[(2)] = inst_25893);

(statearr_26018_26083[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (2))){
var state_25966__$1 = state_25966;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25966__$1,(4),ch);
} else {
if((state_val_25967 === (23))){
var state_25966__$1 = state_25966;
var statearr_26019_26084 = state_25966__$1;
(statearr_26019_26084[(2)] = null);

(statearr_26019_26084[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (35))){
var inst_25948 = (state_25966[(2)]);
var state_25966__$1 = state_25966;
var statearr_26020_26085 = state_25966__$1;
(statearr_26020_26085[(2)] = inst_25948);

(statearr_26020_26085[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (19))){
var inst_25865 = (state_25966[(7)]);
var inst_25869 = cljs.core.chunk_first.call(null,inst_25865);
var inst_25870 = cljs.core.chunk_rest.call(null,inst_25865);
var inst_25871 = cljs.core.count.call(null,inst_25869);
var inst_25843 = inst_25870;
var inst_25844 = inst_25869;
var inst_25845 = inst_25871;
var inst_25846 = (0);
var state_25966__$1 = (function (){var statearr_26021 = state_25966;
(statearr_26021[(13)] = inst_25843);

(statearr_26021[(15)] = inst_25844);

(statearr_26021[(16)] = inst_25846);

(statearr_26021[(17)] = inst_25845);

return statearr_26021;
})();
var statearr_26022_26086 = state_25966__$1;
(statearr_26022_26086[(2)] = null);

(statearr_26022_26086[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (11))){
var inst_25843 = (state_25966[(13)]);
var inst_25865 = (state_25966[(7)]);
var inst_25865__$1 = cljs.core.seq.call(null,inst_25843);
var state_25966__$1 = (function (){var statearr_26023 = state_25966;
(statearr_26023[(7)] = inst_25865__$1);

return statearr_26023;
})();
if(inst_25865__$1){
var statearr_26024_26087 = state_25966__$1;
(statearr_26024_26087[(1)] = (16));

} else {
var statearr_26025_26088 = state_25966__$1;
(statearr_26025_26088[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (9))){
var inst_25895 = (state_25966[(2)]);
var state_25966__$1 = state_25966;
var statearr_26026_26089 = state_25966__$1;
(statearr_26026_26089[(2)] = inst_25895);

(statearr_26026_26089[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (5))){
var inst_25841 = cljs.core.deref.call(null,cs);
var inst_25842 = cljs.core.seq.call(null,inst_25841);
var inst_25843 = inst_25842;
var inst_25844 = null;
var inst_25845 = (0);
var inst_25846 = (0);
var state_25966__$1 = (function (){var statearr_26027 = state_25966;
(statearr_26027[(13)] = inst_25843);

(statearr_26027[(15)] = inst_25844);

(statearr_26027[(16)] = inst_25846);

(statearr_26027[(17)] = inst_25845);

return statearr_26027;
})();
var statearr_26028_26090 = state_25966__$1;
(statearr_26028_26090[(2)] = null);

(statearr_26028_26090[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (14))){
var state_25966__$1 = state_25966;
var statearr_26029_26091 = state_25966__$1;
(statearr_26029_26091[(2)] = null);

(statearr_26029_26091[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (45))){
var inst_25956 = (state_25966[(2)]);
var state_25966__$1 = state_25966;
var statearr_26030_26092 = state_25966__$1;
(statearr_26030_26092[(2)] = inst_25956);

(statearr_26030_26092[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (26))){
var inst_25898 = (state_25966[(29)]);
var inst_25952 = (state_25966[(2)]);
var inst_25953 = cljs.core.seq.call(null,inst_25898);
var state_25966__$1 = (function (){var statearr_26031 = state_25966;
(statearr_26031[(31)] = inst_25952);

return statearr_26031;
})();
if(inst_25953){
var statearr_26032_26093 = state_25966__$1;
(statearr_26032_26093[(1)] = (42));

} else {
var statearr_26033_26094 = state_25966__$1;
(statearr_26033_26094[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (16))){
var inst_25865 = (state_25966[(7)]);
var inst_25867 = cljs.core.chunked_seq_QMARK_.call(null,inst_25865);
var state_25966__$1 = state_25966;
if(inst_25867){
var statearr_26034_26095 = state_25966__$1;
(statearr_26034_26095[(1)] = (19));

} else {
var statearr_26035_26096 = state_25966__$1;
(statearr_26035_26096[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (38))){
var inst_25945 = (state_25966[(2)]);
var state_25966__$1 = state_25966;
var statearr_26036_26097 = state_25966__$1;
(statearr_26036_26097[(2)] = inst_25945);

(statearr_26036_26097[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (30))){
var state_25966__$1 = state_25966;
var statearr_26037_26098 = state_25966__$1;
(statearr_26037_26098[(2)] = null);

(statearr_26037_26098[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (10))){
var inst_25844 = (state_25966[(15)]);
var inst_25846 = (state_25966[(16)]);
var inst_25854 = cljs.core._nth.call(null,inst_25844,inst_25846);
var inst_25855 = cljs.core.nth.call(null,inst_25854,(0),null);
var inst_25856 = cljs.core.nth.call(null,inst_25854,(1),null);
var state_25966__$1 = (function (){var statearr_26038 = state_25966;
(statearr_26038[(26)] = inst_25855);

return statearr_26038;
})();
if(cljs.core.truth_(inst_25856)){
var statearr_26039_26099 = state_25966__$1;
(statearr_26039_26099[(1)] = (13));

} else {
var statearr_26040_26100 = state_25966__$1;
(statearr_26040_26100[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (18))){
var inst_25891 = (state_25966[(2)]);
var state_25966__$1 = state_25966;
var statearr_26041_26101 = state_25966__$1;
(statearr_26041_26101[(2)] = inst_25891);

(statearr_26041_26101[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (42))){
var state_25966__$1 = state_25966;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25966__$1,(45),dchan);
} else {
if((state_val_25967 === (37))){
var inst_25934 = (state_25966[(23)]);
var inst_25834 = (state_25966[(12)]);
var inst_25925 = (state_25966[(25)]);
var inst_25934__$1 = cljs.core.first.call(null,inst_25925);
var inst_25935 = cljs.core.async.put_BANG_.call(null,inst_25934__$1,inst_25834,done);
var state_25966__$1 = (function (){var statearr_26042 = state_25966;
(statearr_26042[(23)] = inst_25934__$1);

return statearr_26042;
})();
if(cljs.core.truth_(inst_25935)){
var statearr_26043_26102 = state_25966__$1;
(statearr_26043_26102[(1)] = (39));

} else {
var statearr_26044_26103 = state_25966__$1;
(statearr_26044_26103[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25967 === (8))){
var inst_25846 = (state_25966[(16)]);
var inst_25845 = (state_25966[(17)]);
var inst_25848 = (inst_25846 < inst_25845);
var inst_25849 = inst_25848;
var state_25966__$1 = state_25966;
if(cljs.core.truth_(inst_25849)){
var statearr_26045_26104 = state_25966__$1;
(statearr_26045_26104[(1)] = (10));

} else {
var statearr_26046_26105 = state_25966__$1;
(statearr_26046_26105[(1)] = (11));

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
});})(c__23368__auto___26051,cs,m,dchan,dctr,done))
;
return ((function (switch__23201__auto__,c__23368__auto___26051,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__23202__auto__ = null;
var cljs$core$async$mult_$_state_machine__23202__auto____0 = (function (){
var statearr_26047 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_26047[(0)] = cljs$core$async$mult_$_state_machine__23202__auto__);

(statearr_26047[(1)] = (1));

return statearr_26047;
});
var cljs$core$async$mult_$_state_machine__23202__auto____1 = (function (state_25966){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_25966);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e26048){if((e26048 instanceof Object)){
var ex__23205__auto__ = e26048;
var statearr_26049_26106 = state_25966;
(statearr_26049_26106[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25966);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26048;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26107 = state_25966;
state_25966 = G__26107;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__23202__auto__ = function(state_25966){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__23202__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__23202__auto____1.call(this,state_25966);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__23202__auto____0;
cljs$core$async$mult_$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__23202__auto____1;
return cljs$core$async$mult_$_state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto___26051,cs,m,dchan,dctr,done))
})();
var state__23370__auto__ = (function (){var statearr_26050 = f__23369__auto__.call(null);
(statearr_26050[(6)] = c__23368__auto___26051);

return statearr_26050;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto___26051,cs,m,dchan,dctr,done))
);


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var G__26109 = arguments.length;
switch (G__26109) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.call(null,mult,ch,true);
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);

return ch;
});

cljs.core.async.tap.cljs$lang$maxFixedArity = 3;

/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_.call(null,mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
var x__4433__auto__ = (((m == null))?null:m);
var m__4434__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__4433__auto__)]);
if((!((m__4434__auto__ == null)))){
return m__4434__auto__.call(null,m,ch);
} else {
var m__4431__auto__ = (cljs.core.async.admix_STAR_["_"]);
if((!((m__4431__auto__ == null)))){
return m__4431__auto__.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
}
});

cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
var x__4433__auto__ = (((m == null))?null:m);
var m__4434__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__4433__auto__)]);
if((!((m__4434__auto__ == null)))){
return m__4434__auto__.call(null,m,ch);
} else {
var m__4431__auto__ = (cljs.core.async.unmix_STAR_["_"]);
if((!((m__4431__auto__ == null)))){
return m__4431__auto__.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
}
});

cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
var x__4433__auto__ = (((m == null))?null:m);
var m__4434__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__4433__auto__)]);
if((!((m__4434__auto__ == null)))){
return m__4434__auto__.call(null,m);
} else {
var m__4431__auto__ = (cljs.core.async.unmix_all_STAR_["_"]);
if((!((m__4431__auto__ == null)))){
return m__4431__auto__.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
}
});

cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
var x__4433__auto__ = (((m == null))?null:m);
var m__4434__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__4433__auto__)]);
if((!((m__4434__auto__ == null)))){
return m__4434__auto__.call(null,m,state_map);
} else {
var m__4431__auto__ = (cljs.core.async.toggle_STAR_["_"]);
if((!((m__4431__auto__ == null)))){
return m__4431__auto__.call(null,m,state_map);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
}
});

cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
var x__4433__auto__ = (((m == null))?null:m);
var m__4434__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__4433__auto__)]);
if((!((m__4434__auto__ == null)))){
return m__4434__auto__.call(null,m,mode);
} else {
var m__4431__auto__ = (cljs.core.async.solo_mode_STAR_["_"]);
if((!((m__4431__auto__ == null)))){
return m__4431__auto__.call(null,m,mode);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__4736__auto__ = [];
var len__4730__auto___26121 = arguments.length;
var i__4731__auto___26122 = (0);
while(true){
if((i__4731__auto___26122 < len__4730__auto___26121)){
args__4736__auto__.push((arguments[i__4731__auto___26122]));

var G__26123 = (i__4731__auto___26122 + (1));
i__4731__auto___26122 = G__26123;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((3) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__4737__auto__);
});

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__26115){
var map__26116 = p__26115;
var map__26116__$1 = (((((!((map__26116 == null))))?(((((map__26116.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__26116.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26116):map__26116);
var opts = map__26116__$1;
var statearr_26118_26124 = state;
(statearr_26118_26124[(1)] = cont_block);


var temp__5735__auto__ = cljs.core.async.do_alts.call(null,((function (map__26116,map__26116__$1,opts){
return (function (val){
var statearr_26119_26125 = state;
(statearr_26119_26125[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
});})(map__26116,map__26116__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__5735__auto__)){
var cb = temp__5735__auto__;
var statearr_26120_26126 = state;
(statearr_26120_26126[(2)] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

/** @this {Function} */
cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq26111){
var G__26112 = cljs.core.first.call(null,seq26111);
var seq26111__$1 = cljs.core.next.call(null,seq26111);
var G__26113 = cljs.core.first.call(null,seq26111__$1);
var seq26111__$2 = cljs.core.next.call(null,seq26111__$1);
var G__26114 = cljs.core.first.call(null,seq26111__$2);
var seq26111__$3 = cljs.core.next.call(null,seq26111__$2);
var self__4717__auto__ = this;
return self__4717__auto__.cljs$core$IFn$_invoke$arity$variadic(G__26112,G__26113,G__26114,seq26111__$3);
});

/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.call(null);
var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){
return cljs.core.async.put_BANG_.call(null,change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;
var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){
return cljs.core.reduce_kv.call(null,((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){
if(cljs.core.truth_(attr.call(null,v))){
return cljs.core.conj.call(null,ret,c);
} else {
return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;
var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){
var chs = cljs.core.deref.call(null,cs);
var mode = cljs.core.deref.call(null,solo_mode);
var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.call(null,((((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && ((!(cljs.core.empty_QMARK_.call(null,solos))))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;
var m = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async26127 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26127 = (function (change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta26128){
this.change = change;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta26128 = meta26128;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async26127.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_26129,meta26128__$1){
var self__ = this;
var _26129__$1 = this;
return (new cljs.core.async.t_cljs$core$async26127(self__.change,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta26128__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async26127.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_26129){
var self__ = this;
var _26129__$1 = this;
return self__.meta26128;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async26127.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async26127.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async26127.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async26127.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async26127.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async26127.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async26127.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async26127.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.solo_modes.call(null,mode))){
} else {
throw (new Error(["Assert failed: ",["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join(''),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async26127.getBasis = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta26128","meta26128",-1062853339,null)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async26127.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async26127.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26127";

cljs.core.async.t_cljs$core$async26127.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__4374__auto__,writer__4375__auto__,opt__4376__auto__){
return cljs.core._write.call(null,writer__4375__auto__,"cljs.core.async/t_cljs$core$async26127");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async26127.
 */
cljs.core.async.__GT_t_cljs$core$async26127 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t_cljs$core$async26127(change__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta26128){
return (new cljs.core.async.t_cljs$core$async26127(change__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta26128));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t_cljs$core$async26127(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__23368__auto___26291 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto___26291,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto___26291,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_26231){
var state_val_26232 = (state_26231[(1)]);
if((state_val_26232 === (7))){
var inst_26146 = (state_26231[(2)]);
var state_26231__$1 = state_26231;
var statearr_26233_26292 = state_26231__$1;
(statearr_26233_26292[(2)] = inst_26146);

(statearr_26233_26292[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (20))){
var inst_26158 = (state_26231[(7)]);
var state_26231__$1 = state_26231;
var statearr_26234_26293 = state_26231__$1;
(statearr_26234_26293[(2)] = inst_26158);

(statearr_26234_26293[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (27))){
var state_26231__$1 = state_26231;
var statearr_26235_26294 = state_26231__$1;
(statearr_26235_26294[(2)] = null);

(statearr_26235_26294[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (1))){
var inst_26133 = (state_26231[(8)]);
var inst_26133__$1 = calc_state.call(null);
var inst_26135 = (inst_26133__$1 == null);
var inst_26136 = cljs.core.not.call(null,inst_26135);
var state_26231__$1 = (function (){var statearr_26236 = state_26231;
(statearr_26236[(8)] = inst_26133__$1);

return statearr_26236;
})();
if(inst_26136){
var statearr_26237_26295 = state_26231__$1;
(statearr_26237_26295[(1)] = (2));

} else {
var statearr_26238_26296 = state_26231__$1;
(statearr_26238_26296[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (24))){
var inst_26191 = (state_26231[(9)]);
var inst_26205 = (state_26231[(10)]);
var inst_26182 = (state_26231[(11)]);
var inst_26205__$1 = inst_26182.call(null,inst_26191);
var state_26231__$1 = (function (){var statearr_26239 = state_26231;
(statearr_26239[(10)] = inst_26205__$1);

return statearr_26239;
})();
if(cljs.core.truth_(inst_26205__$1)){
var statearr_26240_26297 = state_26231__$1;
(statearr_26240_26297[(1)] = (29));

} else {
var statearr_26241_26298 = state_26231__$1;
(statearr_26241_26298[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (4))){
var inst_26149 = (state_26231[(2)]);
var state_26231__$1 = state_26231;
if(cljs.core.truth_(inst_26149)){
var statearr_26242_26299 = state_26231__$1;
(statearr_26242_26299[(1)] = (8));

} else {
var statearr_26243_26300 = state_26231__$1;
(statearr_26243_26300[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (15))){
var inst_26176 = (state_26231[(2)]);
var state_26231__$1 = state_26231;
if(cljs.core.truth_(inst_26176)){
var statearr_26244_26301 = state_26231__$1;
(statearr_26244_26301[(1)] = (19));

} else {
var statearr_26245_26302 = state_26231__$1;
(statearr_26245_26302[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (21))){
var inst_26181 = (state_26231[(12)]);
var inst_26181__$1 = (state_26231[(2)]);
var inst_26182 = cljs.core.get.call(null,inst_26181__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_26183 = cljs.core.get.call(null,inst_26181__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_26184 = cljs.core.get.call(null,inst_26181__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_26231__$1 = (function (){var statearr_26246 = state_26231;
(statearr_26246[(13)] = inst_26183);

(statearr_26246[(11)] = inst_26182);

(statearr_26246[(12)] = inst_26181__$1);

return statearr_26246;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_26231__$1,(22),inst_26184);
} else {
if((state_val_26232 === (31))){
var inst_26213 = (state_26231[(2)]);
var state_26231__$1 = state_26231;
if(cljs.core.truth_(inst_26213)){
var statearr_26247_26303 = state_26231__$1;
(statearr_26247_26303[(1)] = (32));

} else {
var statearr_26248_26304 = state_26231__$1;
(statearr_26248_26304[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (32))){
var inst_26190 = (state_26231[(14)]);
var state_26231__$1 = state_26231;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26231__$1,(35),out,inst_26190);
} else {
if((state_val_26232 === (33))){
var inst_26181 = (state_26231[(12)]);
var inst_26158 = inst_26181;
var state_26231__$1 = (function (){var statearr_26249 = state_26231;
(statearr_26249[(7)] = inst_26158);

return statearr_26249;
})();
var statearr_26250_26305 = state_26231__$1;
(statearr_26250_26305[(2)] = null);

(statearr_26250_26305[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (13))){
var inst_26158 = (state_26231[(7)]);
var inst_26165 = inst_26158.cljs$lang$protocol_mask$partition0$;
var inst_26166 = (inst_26165 & (64));
var inst_26167 = inst_26158.cljs$core$ISeq$;
var inst_26168 = (cljs.core.PROTOCOL_SENTINEL === inst_26167);
var inst_26169 = ((inst_26166) || (inst_26168));
var state_26231__$1 = state_26231;
if(cljs.core.truth_(inst_26169)){
var statearr_26251_26306 = state_26231__$1;
(statearr_26251_26306[(1)] = (16));

} else {
var statearr_26252_26307 = state_26231__$1;
(statearr_26252_26307[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (22))){
var inst_26190 = (state_26231[(14)]);
var inst_26191 = (state_26231[(9)]);
var inst_26189 = (state_26231[(2)]);
var inst_26190__$1 = cljs.core.nth.call(null,inst_26189,(0),null);
var inst_26191__$1 = cljs.core.nth.call(null,inst_26189,(1),null);
var inst_26192 = (inst_26190__$1 == null);
var inst_26193 = cljs.core._EQ_.call(null,inst_26191__$1,change);
var inst_26194 = ((inst_26192) || (inst_26193));
var state_26231__$1 = (function (){var statearr_26253 = state_26231;
(statearr_26253[(14)] = inst_26190__$1);

(statearr_26253[(9)] = inst_26191__$1);

return statearr_26253;
})();
if(cljs.core.truth_(inst_26194)){
var statearr_26254_26308 = state_26231__$1;
(statearr_26254_26308[(1)] = (23));

} else {
var statearr_26255_26309 = state_26231__$1;
(statearr_26255_26309[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (36))){
var inst_26181 = (state_26231[(12)]);
var inst_26158 = inst_26181;
var state_26231__$1 = (function (){var statearr_26256 = state_26231;
(statearr_26256[(7)] = inst_26158);

return statearr_26256;
})();
var statearr_26257_26310 = state_26231__$1;
(statearr_26257_26310[(2)] = null);

(statearr_26257_26310[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (29))){
var inst_26205 = (state_26231[(10)]);
var state_26231__$1 = state_26231;
var statearr_26258_26311 = state_26231__$1;
(statearr_26258_26311[(2)] = inst_26205);

(statearr_26258_26311[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (6))){
var state_26231__$1 = state_26231;
var statearr_26259_26312 = state_26231__$1;
(statearr_26259_26312[(2)] = false);

(statearr_26259_26312[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (28))){
var inst_26201 = (state_26231[(2)]);
var inst_26202 = calc_state.call(null);
var inst_26158 = inst_26202;
var state_26231__$1 = (function (){var statearr_26260 = state_26231;
(statearr_26260[(7)] = inst_26158);

(statearr_26260[(15)] = inst_26201);

return statearr_26260;
})();
var statearr_26261_26313 = state_26231__$1;
(statearr_26261_26313[(2)] = null);

(statearr_26261_26313[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (25))){
var inst_26227 = (state_26231[(2)]);
var state_26231__$1 = state_26231;
var statearr_26262_26314 = state_26231__$1;
(statearr_26262_26314[(2)] = inst_26227);

(statearr_26262_26314[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (34))){
var inst_26225 = (state_26231[(2)]);
var state_26231__$1 = state_26231;
var statearr_26263_26315 = state_26231__$1;
(statearr_26263_26315[(2)] = inst_26225);

(statearr_26263_26315[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (17))){
var state_26231__$1 = state_26231;
var statearr_26264_26316 = state_26231__$1;
(statearr_26264_26316[(2)] = false);

(statearr_26264_26316[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (3))){
var state_26231__$1 = state_26231;
var statearr_26265_26317 = state_26231__$1;
(statearr_26265_26317[(2)] = false);

(statearr_26265_26317[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (12))){
var inst_26229 = (state_26231[(2)]);
var state_26231__$1 = state_26231;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26231__$1,inst_26229);
} else {
if((state_val_26232 === (2))){
var inst_26133 = (state_26231[(8)]);
var inst_26138 = inst_26133.cljs$lang$protocol_mask$partition0$;
var inst_26139 = (inst_26138 & (64));
var inst_26140 = inst_26133.cljs$core$ISeq$;
var inst_26141 = (cljs.core.PROTOCOL_SENTINEL === inst_26140);
var inst_26142 = ((inst_26139) || (inst_26141));
var state_26231__$1 = state_26231;
if(cljs.core.truth_(inst_26142)){
var statearr_26266_26318 = state_26231__$1;
(statearr_26266_26318[(1)] = (5));

} else {
var statearr_26267_26319 = state_26231__$1;
(statearr_26267_26319[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (23))){
var inst_26190 = (state_26231[(14)]);
var inst_26196 = (inst_26190 == null);
var state_26231__$1 = state_26231;
if(cljs.core.truth_(inst_26196)){
var statearr_26268_26320 = state_26231__$1;
(statearr_26268_26320[(1)] = (26));

} else {
var statearr_26269_26321 = state_26231__$1;
(statearr_26269_26321[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (35))){
var inst_26216 = (state_26231[(2)]);
var state_26231__$1 = state_26231;
if(cljs.core.truth_(inst_26216)){
var statearr_26270_26322 = state_26231__$1;
(statearr_26270_26322[(1)] = (36));

} else {
var statearr_26271_26323 = state_26231__$1;
(statearr_26271_26323[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (19))){
var inst_26158 = (state_26231[(7)]);
var inst_26178 = cljs.core.apply.call(null,cljs.core.hash_map,inst_26158);
var state_26231__$1 = state_26231;
var statearr_26272_26324 = state_26231__$1;
(statearr_26272_26324[(2)] = inst_26178);

(statearr_26272_26324[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (11))){
var inst_26158 = (state_26231[(7)]);
var inst_26162 = (inst_26158 == null);
var inst_26163 = cljs.core.not.call(null,inst_26162);
var state_26231__$1 = state_26231;
if(inst_26163){
var statearr_26273_26325 = state_26231__$1;
(statearr_26273_26325[(1)] = (13));

} else {
var statearr_26274_26326 = state_26231__$1;
(statearr_26274_26326[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (9))){
var inst_26133 = (state_26231[(8)]);
var state_26231__$1 = state_26231;
var statearr_26275_26327 = state_26231__$1;
(statearr_26275_26327[(2)] = inst_26133);

(statearr_26275_26327[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (5))){
var state_26231__$1 = state_26231;
var statearr_26276_26328 = state_26231__$1;
(statearr_26276_26328[(2)] = true);

(statearr_26276_26328[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (14))){
var state_26231__$1 = state_26231;
var statearr_26277_26329 = state_26231__$1;
(statearr_26277_26329[(2)] = false);

(statearr_26277_26329[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (26))){
var inst_26191 = (state_26231[(9)]);
var inst_26198 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_26191);
var state_26231__$1 = state_26231;
var statearr_26278_26330 = state_26231__$1;
(statearr_26278_26330[(2)] = inst_26198);

(statearr_26278_26330[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (16))){
var state_26231__$1 = state_26231;
var statearr_26279_26331 = state_26231__$1;
(statearr_26279_26331[(2)] = true);

(statearr_26279_26331[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (38))){
var inst_26221 = (state_26231[(2)]);
var state_26231__$1 = state_26231;
var statearr_26280_26332 = state_26231__$1;
(statearr_26280_26332[(2)] = inst_26221);

(statearr_26280_26332[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (30))){
var inst_26191 = (state_26231[(9)]);
var inst_26183 = (state_26231[(13)]);
var inst_26182 = (state_26231[(11)]);
var inst_26208 = cljs.core.empty_QMARK_.call(null,inst_26182);
var inst_26209 = inst_26183.call(null,inst_26191);
var inst_26210 = cljs.core.not.call(null,inst_26209);
var inst_26211 = ((inst_26208) && (inst_26210));
var state_26231__$1 = state_26231;
var statearr_26281_26333 = state_26231__$1;
(statearr_26281_26333[(2)] = inst_26211);

(statearr_26281_26333[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (10))){
var inst_26133 = (state_26231[(8)]);
var inst_26154 = (state_26231[(2)]);
var inst_26155 = cljs.core.get.call(null,inst_26154,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_26156 = cljs.core.get.call(null,inst_26154,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_26157 = cljs.core.get.call(null,inst_26154,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_26158 = inst_26133;
var state_26231__$1 = (function (){var statearr_26282 = state_26231;
(statearr_26282[(16)] = inst_26157);

(statearr_26282[(7)] = inst_26158);

(statearr_26282[(17)] = inst_26155);

(statearr_26282[(18)] = inst_26156);

return statearr_26282;
})();
var statearr_26283_26334 = state_26231__$1;
(statearr_26283_26334[(2)] = null);

(statearr_26283_26334[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (18))){
var inst_26173 = (state_26231[(2)]);
var state_26231__$1 = state_26231;
var statearr_26284_26335 = state_26231__$1;
(statearr_26284_26335[(2)] = inst_26173);

(statearr_26284_26335[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (37))){
var state_26231__$1 = state_26231;
var statearr_26285_26336 = state_26231__$1;
(statearr_26285_26336[(2)] = null);

(statearr_26285_26336[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26232 === (8))){
var inst_26133 = (state_26231[(8)]);
var inst_26151 = cljs.core.apply.call(null,cljs.core.hash_map,inst_26133);
var state_26231__$1 = state_26231;
var statearr_26286_26337 = state_26231__$1;
(statearr_26286_26337[(2)] = inst_26151);

(statearr_26286_26337[(1)] = (10));


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
});})(c__23368__auto___26291,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__23201__auto__,c__23368__auto___26291,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__23202__auto__ = null;
var cljs$core$async$mix_$_state_machine__23202__auto____0 = (function (){
var statearr_26287 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_26287[(0)] = cljs$core$async$mix_$_state_machine__23202__auto__);

(statearr_26287[(1)] = (1));

return statearr_26287;
});
var cljs$core$async$mix_$_state_machine__23202__auto____1 = (function (state_26231){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_26231);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e26288){if((e26288 instanceof Object)){
var ex__23205__auto__ = e26288;
var statearr_26289_26338 = state_26231;
(statearr_26289_26338[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26231);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26288;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26339 = state_26231;
state_26231 = G__26339;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__23202__auto__ = function(state_26231){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__23202__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__23202__auto____1.call(this,state_26231);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__23202__auto____0;
cljs$core$async$mix_$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__23202__auto____1;
return cljs$core$async$mix_$_state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto___26291,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__23370__auto__ = (function (){var statearr_26290 = f__23369__auto__.call(null);
(statearr_26290[(6)] = c__23368__auto___26291);

return statearr_26290;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto___26291,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
);


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_.call(null,mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
var x__4433__auto__ = (((p == null))?null:p);
var m__4434__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__4433__auto__)]);
if((!((m__4434__auto__ == null)))){
return m__4434__auto__.call(null,p,v,ch,close_QMARK_);
} else {
var m__4431__auto__ = (cljs.core.async.sub_STAR_["_"]);
if((!((m__4431__auto__ == null)))){
return m__4431__auto__.call(null,p,v,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
}
});

cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
var x__4433__auto__ = (((p == null))?null:p);
var m__4434__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__4433__auto__)]);
if((!((m__4434__auto__ == null)))){
return m__4434__auto__.call(null,p,v,ch);
} else {
var m__4431__auto__ = (cljs.core.async.unsub_STAR_["_"]);
if((!((m__4431__auto__ == null)))){
return m__4431__auto__.call(null,p,v,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var G__26341 = arguments.length;
switch (G__26341) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
var x__4433__auto__ = (((p == null))?null:p);
var m__4434__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4433__auto__)]);
if((!((m__4434__auto__ == null)))){
return m__4434__auto__.call(null,p);
} else {
var m__4431__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__4431__auto__ == null)))){
return m__4431__auto__.call(null,p);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
var x__4433__auto__ = (((p == null))?null:p);
var m__4434__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4433__auto__)]);
if((!((m__4434__auto__ == null)))){
return m__4434__auto__.call(null,p,v);
} else {
var m__4431__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__4431__auto__ == null)))){
return m__4431__auto__.call(null,p,v);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2;


/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var G__26345 = arguments.length;
switch (G__26345) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = ((function (mults){
return (function (topic){
var or__4131__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__4131__auto__,mults){
return (function (p1__26343_SHARP_){
if(cljs.core.truth_(p1__26343_SHARP_.call(null,topic))){
return p1__26343_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__26343_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__4131__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async26346 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26346 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta26347){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta26347 = meta26347;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async26346.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_26348,meta26347__$1){
var self__ = this;
var _26348__$1 = this;
return (new cljs.core.async.t_cljs$core$async26346(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta26347__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async26346.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_26348){
var self__ = this;
var _26348__$1 = this;
return self__.meta26347;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async26346.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async26346.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async26346.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async26346.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async26346.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__5735__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);
if(cljs.core.truth_(temp__5735__auto__)){
var m = temp__5735__auto__;
return cljs.core.async.untap.call(null,m,ch__$1);
} else {
return null;
}
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async26346.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async26346.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async26346.getBasis = ((function (mults,ensure_mult){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta26347","meta26347",1623082852,null)], null);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async26346.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async26346.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26346";

cljs.core.async.t_cljs$core$async26346.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__4374__auto__,writer__4375__auto__,opt__4376__auto__){
return cljs.core._write.call(null,writer__4375__auto__,"cljs.core.async/t_cljs$core$async26346");
});})(mults,ensure_mult))
;

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async26346.
 */
cljs.core.async.__GT_t_cljs$core$async26346 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t_cljs$core$async26346(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta26347){
return (new cljs.core.async.t_cljs$core$async26346(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta26347));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t_cljs$core$async26346(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__23368__auto___26466 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto___26466,mults,ensure_mult,p){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto___26466,mults,ensure_mult,p){
return (function (state_26420){
var state_val_26421 = (state_26420[(1)]);
if((state_val_26421 === (7))){
var inst_26416 = (state_26420[(2)]);
var state_26420__$1 = state_26420;
var statearr_26422_26467 = state_26420__$1;
(statearr_26422_26467[(2)] = inst_26416);

(statearr_26422_26467[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26421 === (20))){
var state_26420__$1 = state_26420;
var statearr_26423_26468 = state_26420__$1;
(statearr_26423_26468[(2)] = null);

(statearr_26423_26468[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26421 === (1))){
var state_26420__$1 = state_26420;
var statearr_26424_26469 = state_26420__$1;
(statearr_26424_26469[(2)] = null);

(statearr_26424_26469[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26421 === (24))){
var inst_26399 = (state_26420[(7)]);
var inst_26408 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_26399);
var state_26420__$1 = state_26420;
var statearr_26425_26470 = state_26420__$1;
(statearr_26425_26470[(2)] = inst_26408);

(statearr_26425_26470[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26421 === (4))){
var inst_26351 = (state_26420[(8)]);
var inst_26351__$1 = (state_26420[(2)]);
var inst_26352 = (inst_26351__$1 == null);
var state_26420__$1 = (function (){var statearr_26426 = state_26420;
(statearr_26426[(8)] = inst_26351__$1);

return statearr_26426;
})();
if(cljs.core.truth_(inst_26352)){
var statearr_26427_26471 = state_26420__$1;
(statearr_26427_26471[(1)] = (5));

} else {
var statearr_26428_26472 = state_26420__$1;
(statearr_26428_26472[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26421 === (15))){
var inst_26393 = (state_26420[(2)]);
var state_26420__$1 = state_26420;
var statearr_26429_26473 = state_26420__$1;
(statearr_26429_26473[(2)] = inst_26393);

(statearr_26429_26473[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26421 === (21))){
var inst_26413 = (state_26420[(2)]);
var state_26420__$1 = (function (){var statearr_26430 = state_26420;
(statearr_26430[(9)] = inst_26413);

return statearr_26430;
})();
var statearr_26431_26474 = state_26420__$1;
(statearr_26431_26474[(2)] = null);

(statearr_26431_26474[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26421 === (13))){
var inst_26375 = (state_26420[(10)]);
var inst_26377 = cljs.core.chunked_seq_QMARK_.call(null,inst_26375);
var state_26420__$1 = state_26420;
if(inst_26377){
var statearr_26432_26475 = state_26420__$1;
(statearr_26432_26475[(1)] = (16));

} else {
var statearr_26433_26476 = state_26420__$1;
(statearr_26433_26476[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26421 === (22))){
var inst_26405 = (state_26420[(2)]);
var state_26420__$1 = state_26420;
if(cljs.core.truth_(inst_26405)){
var statearr_26434_26477 = state_26420__$1;
(statearr_26434_26477[(1)] = (23));

} else {
var statearr_26435_26478 = state_26420__$1;
(statearr_26435_26478[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26421 === (6))){
var inst_26401 = (state_26420[(11)]);
var inst_26399 = (state_26420[(7)]);
var inst_26351 = (state_26420[(8)]);
var inst_26399__$1 = topic_fn.call(null,inst_26351);
var inst_26400 = cljs.core.deref.call(null,mults);
var inst_26401__$1 = cljs.core.get.call(null,inst_26400,inst_26399__$1);
var state_26420__$1 = (function (){var statearr_26436 = state_26420;
(statearr_26436[(11)] = inst_26401__$1);

(statearr_26436[(7)] = inst_26399__$1);

return statearr_26436;
})();
if(cljs.core.truth_(inst_26401__$1)){
var statearr_26437_26479 = state_26420__$1;
(statearr_26437_26479[(1)] = (19));

} else {
var statearr_26438_26480 = state_26420__$1;
(statearr_26438_26480[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26421 === (25))){
var inst_26410 = (state_26420[(2)]);
var state_26420__$1 = state_26420;
var statearr_26439_26481 = state_26420__$1;
(statearr_26439_26481[(2)] = inst_26410);

(statearr_26439_26481[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26421 === (17))){
var inst_26375 = (state_26420[(10)]);
var inst_26384 = cljs.core.first.call(null,inst_26375);
var inst_26385 = cljs.core.async.muxch_STAR_.call(null,inst_26384);
var inst_26386 = cljs.core.async.close_BANG_.call(null,inst_26385);
var inst_26387 = cljs.core.next.call(null,inst_26375);
var inst_26361 = inst_26387;
var inst_26362 = null;
var inst_26363 = (0);
var inst_26364 = (0);
var state_26420__$1 = (function (){var statearr_26440 = state_26420;
(statearr_26440[(12)] = inst_26364);

(statearr_26440[(13)] = inst_26386);

(statearr_26440[(14)] = inst_26362);

(statearr_26440[(15)] = inst_26361);

(statearr_26440[(16)] = inst_26363);

return statearr_26440;
})();
var statearr_26441_26482 = state_26420__$1;
(statearr_26441_26482[(2)] = null);

(statearr_26441_26482[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26421 === (3))){
var inst_26418 = (state_26420[(2)]);
var state_26420__$1 = state_26420;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26420__$1,inst_26418);
} else {
if((state_val_26421 === (12))){
var inst_26395 = (state_26420[(2)]);
var state_26420__$1 = state_26420;
var statearr_26442_26483 = state_26420__$1;
(statearr_26442_26483[(2)] = inst_26395);

(statearr_26442_26483[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26421 === (2))){
var state_26420__$1 = state_26420;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26420__$1,(4),ch);
} else {
if((state_val_26421 === (23))){
var state_26420__$1 = state_26420;
var statearr_26443_26484 = state_26420__$1;
(statearr_26443_26484[(2)] = null);

(statearr_26443_26484[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26421 === (19))){
var inst_26401 = (state_26420[(11)]);
var inst_26351 = (state_26420[(8)]);
var inst_26403 = cljs.core.async.muxch_STAR_.call(null,inst_26401);
var state_26420__$1 = state_26420;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26420__$1,(22),inst_26403,inst_26351);
} else {
if((state_val_26421 === (11))){
var inst_26361 = (state_26420[(15)]);
var inst_26375 = (state_26420[(10)]);
var inst_26375__$1 = cljs.core.seq.call(null,inst_26361);
var state_26420__$1 = (function (){var statearr_26444 = state_26420;
(statearr_26444[(10)] = inst_26375__$1);

return statearr_26444;
})();
if(inst_26375__$1){
var statearr_26445_26485 = state_26420__$1;
(statearr_26445_26485[(1)] = (13));

} else {
var statearr_26446_26486 = state_26420__$1;
(statearr_26446_26486[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26421 === (9))){
var inst_26397 = (state_26420[(2)]);
var state_26420__$1 = state_26420;
var statearr_26447_26487 = state_26420__$1;
(statearr_26447_26487[(2)] = inst_26397);

(statearr_26447_26487[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26421 === (5))){
var inst_26358 = cljs.core.deref.call(null,mults);
var inst_26359 = cljs.core.vals.call(null,inst_26358);
var inst_26360 = cljs.core.seq.call(null,inst_26359);
var inst_26361 = inst_26360;
var inst_26362 = null;
var inst_26363 = (0);
var inst_26364 = (0);
var state_26420__$1 = (function (){var statearr_26448 = state_26420;
(statearr_26448[(12)] = inst_26364);

(statearr_26448[(14)] = inst_26362);

(statearr_26448[(15)] = inst_26361);

(statearr_26448[(16)] = inst_26363);

return statearr_26448;
})();
var statearr_26449_26488 = state_26420__$1;
(statearr_26449_26488[(2)] = null);

(statearr_26449_26488[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26421 === (14))){
var state_26420__$1 = state_26420;
var statearr_26453_26489 = state_26420__$1;
(statearr_26453_26489[(2)] = null);

(statearr_26453_26489[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26421 === (16))){
var inst_26375 = (state_26420[(10)]);
var inst_26379 = cljs.core.chunk_first.call(null,inst_26375);
var inst_26380 = cljs.core.chunk_rest.call(null,inst_26375);
var inst_26381 = cljs.core.count.call(null,inst_26379);
var inst_26361 = inst_26380;
var inst_26362 = inst_26379;
var inst_26363 = inst_26381;
var inst_26364 = (0);
var state_26420__$1 = (function (){var statearr_26454 = state_26420;
(statearr_26454[(12)] = inst_26364);

(statearr_26454[(14)] = inst_26362);

(statearr_26454[(15)] = inst_26361);

(statearr_26454[(16)] = inst_26363);

return statearr_26454;
})();
var statearr_26455_26490 = state_26420__$1;
(statearr_26455_26490[(2)] = null);

(statearr_26455_26490[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26421 === (10))){
var inst_26364 = (state_26420[(12)]);
var inst_26362 = (state_26420[(14)]);
var inst_26361 = (state_26420[(15)]);
var inst_26363 = (state_26420[(16)]);
var inst_26369 = cljs.core._nth.call(null,inst_26362,inst_26364);
var inst_26370 = cljs.core.async.muxch_STAR_.call(null,inst_26369);
var inst_26371 = cljs.core.async.close_BANG_.call(null,inst_26370);
var inst_26372 = (inst_26364 + (1));
var tmp26450 = inst_26362;
var tmp26451 = inst_26361;
var tmp26452 = inst_26363;
var inst_26361__$1 = tmp26451;
var inst_26362__$1 = tmp26450;
var inst_26363__$1 = tmp26452;
var inst_26364__$1 = inst_26372;
var state_26420__$1 = (function (){var statearr_26456 = state_26420;
(statearr_26456[(12)] = inst_26364__$1);

(statearr_26456[(14)] = inst_26362__$1);

(statearr_26456[(17)] = inst_26371);

(statearr_26456[(15)] = inst_26361__$1);

(statearr_26456[(16)] = inst_26363__$1);

return statearr_26456;
})();
var statearr_26457_26491 = state_26420__$1;
(statearr_26457_26491[(2)] = null);

(statearr_26457_26491[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26421 === (18))){
var inst_26390 = (state_26420[(2)]);
var state_26420__$1 = state_26420;
var statearr_26458_26492 = state_26420__$1;
(statearr_26458_26492[(2)] = inst_26390);

(statearr_26458_26492[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26421 === (8))){
var inst_26364 = (state_26420[(12)]);
var inst_26363 = (state_26420[(16)]);
var inst_26366 = (inst_26364 < inst_26363);
var inst_26367 = inst_26366;
var state_26420__$1 = state_26420;
if(cljs.core.truth_(inst_26367)){
var statearr_26459_26493 = state_26420__$1;
(statearr_26459_26493[(1)] = (10));

} else {
var statearr_26460_26494 = state_26420__$1;
(statearr_26460_26494[(1)] = (11));

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
});})(c__23368__auto___26466,mults,ensure_mult,p))
;
return ((function (switch__23201__auto__,c__23368__auto___26466,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__23202__auto__ = null;
var cljs$core$async$state_machine__23202__auto____0 = (function (){
var statearr_26461 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_26461[(0)] = cljs$core$async$state_machine__23202__auto__);

(statearr_26461[(1)] = (1));

return statearr_26461;
});
var cljs$core$async$state_machine__23202__auto____1 = (function (state_26420){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_26420);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e26462){if((e26462 instanceof Object)){
var ex__23205__auto__ = e26462;
var statearr_26463_26495 = state_26420;
(statearr_26463_26495[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26420);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26462;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26496 = state_26420;
state_26420 = G__26496;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
cljs$core$async$state_machine__23202__auto__ = function(state_26420){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__23202__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__23202__auto____1.call(this,state_26420);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__23202__auto____0;
cljs$core$async$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__23202__auto____1;
return cljs$core$async$state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto___26466,mults,ensure_mult,p))
})();
var state__23370__auto__ = (function (){var statearr_26464 = f__23369__auto__.call(null);
(statearr_26464[(6)] = c__23368__auto___26466);

return statearr_26464;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto___26466,mults,ensure_mult,p))
);


return p;
});

cljs.core.async.pub.cljs$lang$maxFixedArity = 3;

/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var G__26498 = arguments.length;
switch (G__26498) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.call(null,p,topic,ch,true);
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
});

cljs.core.async.sub.cljs$lang$maxFixedArity = 4;

/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var G__26501 = arguments.length;
switch (G__26501) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_.call(null,p);
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
});

cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2;

/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var G__26504 = arguments.length;
switch (G__26504) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.call(null,f,chs,null);
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec.call(null,chs);
var out = cljs.core.async.chan.call(null,buf_or_n);
var cnt = cljs.core.count.call(null,chs__$1);
var rets = cljs.core.object_array.call(null,cnt);
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = cljs.core.mapv.call(null,((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){
return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,rets.slice((0)));
} else {
return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.call(null,cnt));
var c__23368__auto___26571 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto___26571,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto___26571,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_26543){
var state_val_26544 = (state_26543[(1)]);
if((state_val_26544 === (7))){
var state_26543__$1 = state_26543;
var statearr_26545_26572 = state_26543__$1;
(statearr_26545_26572[(2)] = null);

(statearr_26545_26572[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26544 === (1))){
var state_26543__$1 = state_26543;
var statearr_26546_26573 = state_26543__$1;
(statearr_26546_26573[(2)] = null);

(statearr_26546_26573[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26544 === (4))){
var inst_26507 = (state_26543[(7)]);
var inst_26509 = (inst_26507 < cnt);
var state_26543__$1 = state_26543;
if(cljs.core.truth_(inst_26509)){
var statearr_26547_26574 = state_26543__$1;
(statearr_26547_26574[(1)] = (6));

} else {
var statearr_26548_26575 = state_26543__$1;
(statearr_26548_26575[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26544 === (15))){
var inst_26539 = (state_26543[(2)]);
var state_26543__$1 = state_26543;
var statearr_26549_26576 = state_26543__$1;
(statearr_26549_26576[(2)] = inst_26539);

(statearr_26549_26576[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26544 === (13))){
var inst_26532 = cljs.core.async.close_BANG_.call(null,out);
var state_26543__$1 = state_26543;
var statearr_26550_26577 = state_26543__$1;
(statearr_26550_26577[(2)] = inst_26532);

(statearr_26550_26577[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26544 === (6))){
var state_26543__$1 = state_26543;
var statearr_26551_26578 = state_26543__$1;
(statearr_26551_26578[(2)] = null);

(statearr_26551_26578[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26544 === (3))){
var inst_26541 = (state_26543[(2)]);
var state_26543__$1 = state_26543;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26543__$1,inst_26541);
} else {
if((state_val_26544 === (12))){
var inst_26529 = (state_26543[(8)]);
var inst_26529__$1 = (state_26543[(2)]);
var inst_26530 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_26529__$1);
var state_26543__$1 = (function (){var statearr_26552 = state_26543;
(statearr_26552[(8)] = inst_26529__$1);

return statearr_26552;
})();
if(cljs.core.truth_(inst_26530)){
var statearr_26553_26579 = state_26543__$1;
(statearr_26553_26579[(1)] = (13));

} else {
var statearr_26554_26580 = state_26543__$1;
(statearr_26554_26580[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26544 === (2))){
var inst_26506 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_26507 = (0);
var state_26543__$1 = (function (){var statearr_26555 = state_26543;
(statearr_26555[(7)] = inst_26507);

(statearr_26555[(9)] = inst_26506);

return statearr_26555;
})();
var statearr_26556_26581 = state_26543__$1;
(statearr_26556_26581[(2)] = null);

(statearr_26556_26581[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26544 === (11))){
var inst_26507 = (state_26543[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_26543,(10),Object,null,(9));
var inst_26516 = chs__$1.call(null,inst_26507);
var inst_26517 = done.call(null,inst_26507);
var inst_26518 = cljs.core.async.take_BANG_.call(null,inst_26516,inst_26517);
var state_26543__$1 = state_26543;
var statearr_26557_26582 = state_26543__$1;
(statearr_26557_26582[(2)] = inst_26518);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26543__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26544 === (9))){
var inst_26507 = (state_26543[(7)]);
var inst_26520 = (state_26543[(2)]);
var inst_26521 = (inst_26507 + (1));
var inst_26507__$1 = inst_26521;
var state_26543__$1 = (function (){var statearr_26558 = state_26543;
(statearr_26558[(7)] = inst_26507__$1);

(statearr_26558[(10)] = inst_26520);

return statearr_26558;
})();
var statearr_26559_26583 = state_26543__$1;
(statearr_26559_26583[(2)] = null);

(statearr_26559_26583[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26544 === (5))){
var inst_26527 = (state_26543[(2)]);
var state_26543__$1 = (function (){var statearr_26560 = state_26543;
(statearr_26560[(11)] = inst_26527);

return statearr_26560;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26543__$1,(12),dchan);
} else {
if((state_val_26544 === (14))){
var inst_26529 = (state_26543[(8)]);
var inst_26534 = cljs.core.apply.call(null,f,inst_26529);
var state_26543__$1 = state_26543;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26543__$1,(16),out,inst_26534);
} else {
if((state_val_26544 === (16))){
var inst_26536 = (state_26543[(2)]);
var state_26543__$1 = (function (){var statearr_26561 = state_26543;
(statearr_26561[(12)] = inst_26536);

return statearr_26561;
})();
var statearr_26562_26584 = state_26543__$1;
(statearr_26562_26584[(2)] = null);

(statearr_26562_26584[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26544 === (10))){
var inst_26511 = (state_26543[(2)]);
var inst_26512 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_26543__$1 = (function (){var statearr_26563 = state_26543;
(statearr_26563[(13)] = inst_26511);

return statearr_26563;
})();
var statearr_26564_26585 = state_26543__$1;
(statearr_26564_26585[(2)] = inst_26512);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26543__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26544 === (8))){
var inst_26525 = (state_26543[(2)]);
var state_26543__$1 = state_26543;
var statearr_26565_26586 = state_26543__$1;
(statearr_26565_26586[(2)] = inst_26525);

(statearr_26565_26586[(1)] = (5));


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
});})(c__23368__auto___26571,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__23201__auto__,c__23368__auto___26571,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__23202__auto__ = null;
var cljs$core$async$state_machine__23202__auto____0 = (function (){
var statearr_26566 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_26566[(0)] = cljs$core$async$state_machine__23202__auto__);

(statearr_26566[(1)] = (1));

return statearr_26566;
});
var cljs$core$async$state_machine__23202__auto____1 = (function (state_26543){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_26543);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e26567){if((e26567 instanceof Object)){
var ex__23205__auto__ = e26567;
var statearr_26568_26587 = state_26543;
(statearr_26568_26587[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26543);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26567;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26588 = state_26543;
state_26543 = G__26588;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
cljs$core$async$state_machine__23202__auto__ = function(state_26543){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__23202__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__23202__auto____1.call(this,state_26543);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__23202__auto____0;
cljs$core$async$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__23202__auto____1;
return cljs$core$async$state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto___26571,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__23370__auto__ = (function (){var statearr_26569 = f__23369__auto__.call(null);
(statearr_26569[(6)] = c__23368__auto___26571);

return statearr_26569;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto___26571,chs__$1,out,cnt,rets,dchan,dctr,done))
);


return out;
});

cljs.core.async.map.cljs$lang$maxFixedArity = 3;

/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var G__26591 = arguments.length;
switch (G__26591) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.call(null,chs,null);
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__23368__auto___26645 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto___26645,out){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto___26645,out){
return (function (state_26623){
var state_val_26624 = (state_26623[(1)]);
if((state_val_26624 === (7))){
var inst_26603 = (state_26623[(7)]);
var inst_26602 = (state_26623[(8)]);
var inst_26602__$1 = (state_26623[(2)]);
var inst_26603__$1 = cljs.core.nth.call(null,inst_26602__$1,(0),null);
var inst_26604 = cljs.core.nth.call(null,inst_26602__$1,(1),null);
var inst_26605 = (inst_26603__$1 == null);
var state_26623__$1 = (function (){var statearr_26625 = state_26623;
(statearr_26625[(7)] = inst_26603__$1);

(statearr_26625[(8)] = inst_26602__$1);

(statearr_26625[(9)] = inst_26604);

return statearr_26625;
})();
if(cljs.core.truth_(inst_26605)){
var statearr_26626_26646 = state_26623__$1;
(statearr_26626_26646[(1)] = (8));

} else {
var statearr_26627_26647 = state_26623__$1;
(statearr_26627_26647[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26624 === (1))){
var inst_26592 = cljs.core.vec.call(null,chs);
var inst_26593 = inst_26592;
var state_26623__$1 = (function (){var statearr_26628 = state_26623;
(statearr_26628[(10)] = inst_26593);

return statearr_26628;
})();
var statearr_26629_26648 = state_26623__$1;
(statearr_26629_26648[(2)] = null);

(statearr_26629_26648[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26624 === (4))){
var inst_26593 = (state_26623[(10)]);
var state_26623__$1 = state_26623;
return cljs.core.async.ioc_alts_BANG_.call(null,state_26623__$1,(7),inst_26593);
} else {
if((state_val_26624 === (6))){
var inst_26619 = (state_26623[(2)]);
var state_26623__$1 = state_26623;
var statearr_26630_26649 = state_26623__$1;
(statearr_26630_26649[(2)] = inst_26619);

(statearr_26630_26649[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26624 === (3))){
var inst_26621 = (state_26623[(2)]);
var state_26623__$1 = state_26623;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26623__$1,inst_26621);
} else {
if((state_val_26624 === (2))){
var inst_26593 = (state_26623[(10)]);
var inst_26595 = cljs.core.count.call(null,inst_26593);
var inst_26596 = (inst_26595 > (0));
var state_26623__$1 = state_26623;
if(cljs.core.truth_(inst_26596)){
var statearr_26632_26650 = state_26623__$1;
(statearr_26632_26650[(1)] = (4));

} else {
var statearr_26633_26651 = state_26623__$1;
(statearr_26633_26651[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26624 === (11))){
var inst_26593 = (state_26623[(10)]);
var inst_26612 = (state_26623[(2)]);
var tmp26631 = inst_26593;
var inst_26593__$1 = tmp26631;
var state_26623__$1 = (function (){var statearr_26634 = state_26623;
(statearr_26634[(10)] = inst_26593__$1);

(statearr_26634[(11)] = inst_26612);

return statearr_26634;
})();
var statearr_26635_26652 = state_26623__$1;
(statearr_26635_26652[(2)] = null);

(statearr_26635_26652[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26624 === (9))){
var inst_26603 = (state_26623[(7)]);
var state_26623__$1 = state_26623;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26623__$1,(11),out,inst_26603);
} else {
if((state_val_26624 === (5))){
var inst_26617 = cljs.core.async.close_BANG_.call(null,out);
var state_26623__$1 = state_26623;
var statearr_26636_26653 = state_26623__$1;
(statearr_26636_26653[(2)] = inst_26617);

(statearr_26636_26653[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26624 === (10))){
var inst_26615 = (state_26623[(2)]);
var state_26623__$1 = state_26623;
var statearr_26637_26654 = state_26623__$1;
(statearr_26637_26654[(2)] = inst_26615);

(statearr_26637_26654[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26624 === (8))){
var inst_26603 = (state_26623[(7)]);
var inst_26602 = (state_26623[(8)]);
var inst_26593 = (state_26623[(10)]);
var inst_26604 = (state_26623[(9)]);
var inst_26607 = (function (){var cs = inst_26593;
var vec__26598 = inst_26602;
var v = inst_26603;
var c = inst_26604;
return ((function (cs,vec__26598,v,c,inst_26603,inst_26602,inst_26593,inst_26604,state_val_26624,c__23368__auto___26645,out){
return (function (p1__26589_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__26589_SHARP_);
});
;})(cs,vec__26598,v,c,inst_26603,inst_26602,inst_26593,inst_26604,state_val_26624,c__23368__auto___26645,out))
})();
var inst_26608 = cljs.core.filterv.call(null,inst_26607,inst_26593);
var inst_26593__$1 = inst_26608;
var state_26623__$1 = (function (){var statearr_26638 = state_26623;
(statearr_26638[(10)] = inst_26593__$1);

return statearr_26638;
})();
var statearr_26639_26655 = state_26623__$1;
(statearr_26639_26655[(2)] = null);

(statearr_26639_26655[(1)] = (2));


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
});})(c__23368__auto___26645,out))
;
return ((function (switch__23201__auto__,c__23368__auto___26645,out){
return (function() {
var cljs$core$async$state_machine__23202__auto__ = null;
var cljs$core$async$state_machine__23202__auto____0 = (function (){
var statearr_26640 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_26640[(0)] = cljs$core$async$state_machine__23202__auto__);

(statearr_26640[(1)] = (1));

return statearr_26640;
});
var cljs$core$async$state_machine__23202__auto____1 = (function (state_26623){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_26623);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e26641){if((e26641 instanceof Object)){
var ex__23205__auto__ = e26641;
var statearr_26642_26656 = state_26623;
(statearr_26642_26656[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26623);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26641;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26657 = state_26623;
state_26623 = G__26657;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
cljs$core$async$state_machine__23202__auto__ = function(state_26623){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__23202__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__23202__auto____1.call(this,state_26623);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__23202__auto____0;
cljs$core$async$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__23202__auto____1;
return cljs$core$async$state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto___26645,out))
})();
var state__23370__auto__ = (function (){var statearr_26643 = f__23369__auto__.call(null);
(statearr_26643[(6)] = c__23368__auto___26645);

return statearr_26643;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto___26645,out))
);


return out;
});

cljs.core.async.merge.cljs$lang$maxFixedArity = 2;

/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var G__26659 = arguments.length;
switch (G__26659) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.call(null,n,ch,null);
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__23368__auto___26704 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto___26704,out){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto___26704,out){
return (function (state_26683){
var state_val_26684 = (state_26683[(1)]);
if((state_val_26684 === (7))){
var inst_26665 = (state_26683[(7)]);
var inst_26665__$1 = (state_26683[(2)]);
var inst_26666 = (inst_26665__$1 == null);
var inst_26667 = cljs.core.not.call(null,inst_26666);
var state_26683__$1 = (function (){var statearr_26685 = state_26683;
(statearr_26685[(7)] = inst_26665__$1);

return statearr_26685;
})();
if(inst_26667){
var statearr_26686_26705 = state_26683__$1;
(statearr_26686_26705[(1)] = (8));

} else {
var statearr_26687_26706 = state_26683__$1;
(statearr_26687_26706[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26684 === (1))){
var inst_26660 = (0);
var state_26683__$1 = (function (){var statearr_26688 = state_26683;
(statearr_26688[(8)] = inst_26660);

return statearr_26688;
})();
var statearr_26689_26707 = state_26683__$1;
(statearr_26689_26707[(2)] = null);

(statearr_26689_26707[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26684 === (4))){
var state_26683__$1 = state_26683;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26683__$1,(7),ch);
} else {
if((state_val_26684 === (6))){
var inst_26678 = (state_26683[(2)]);
var state_26683__$1 = state_26683;
var statearr_26690_26708 = state_26683__$1;
(statearr_26690_26708[(2)] = inst_26678);

(statearr_26690_26708[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26684 === (3))){
var inst_26680 = (state_26683[(2)]);
var inst_26681 = cljs.core.async.close_BANG_.call(null,out);
var state_26683__$1 = (function (){var statearr_26691 = state_26683;
(statearr_26691[(9)] = inst_26680);

return statearr_26691;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26683__$1,inst_26681);
} else {
if((state_val_26684 === (2))){
var inst_26660 = (state_26683[(8)]);
var inst_26662 = (inst_26660 < n);
var state_26683__$1 = state_26683;
if(cljs.core.truth_(inst_26662)){
var statearr_26692_26709 = state_26683__$1;
(statearr_26692_26709[(1)] = (4));

} else {
var statearr_26693_26710 = state_26683__$1;
(statearr_26693_26710[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26684 === (11))){
var inst_26660 = (state_26683[(8)]);
var inst_26670 = (state_26683[(2)]);
var inst_26671 = (inst_26660 + (1));
var inst_26660__$1 = inst_26671;
var state_26683__$1 = (function (){var statearr_26694 = state_26683;
(statearr_26694[(8)] = inst_26660__$1);

(statearr_26694[(10)] = inst_26670);

return statearr_26694;
})();
var statearr_26695_26711 = state_26683__$1;
(statearr_26695_26711[(2)] = null);

(statearr_26695_26711[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26684 === (9))){
var state_26683__$1 = state_26683;
var statearr_26696_26712 = state_26683__$1;
(statearr_26696_26712[(2)] = null);

(statearr_26696_26712[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26684 === (5))){
var state_26683__$1 = state_26683;
var statearr_26697_26713 = state_26683__$1;
(statearr_26697_26713[(2)] = null);

(statearr_26697_26713[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26684 === (10))){
var inst_26675 = (state_26683[(2)]);
var state_26683__$1 = state_26683;
var statearr_26698_26714 = state_26683__$1;
(statearr_26698_26714[(2)] = inst_26675);

(statearr_26698_26714[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26684 === (8))){
var inst_26665 = (state_26683[(7)]);
var state_26683__$1 = state_26683;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26683__$1,(11),out,inst_26665);
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
});})(c__23368__auto___26704,out))
;
return ((function (switch__23201__auto__,c__23368__auto___26704,out){
return (function() {
var cljs$core$async$state_machine__23202__auto__ = null;
var cljs$core$async$state_machine__23202__auto____0 = (function (){
var statearr_26699 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_26699[(0)] = cljs$core$async$state_machine__23202__auto__);

(statearr_26699[(1)] = (1));

return statearr_26699;
});
var cljs$core$async$state_machine__23202__auto____1 = (function (state_26683){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_26683);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e26700){if((e26700 instanceof Object)){
var ex__23205__auto__ = e26700;
var statearr_26701_26715 = state_26683;
(statearr_26701_26715[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26683);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26700;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26716 = state_26683;
state_26683 = G__26716;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
cljs$core$async$state_machine__23202__auto__ = function(state_26683){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__23202__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__23202__auto____1.call(this,state_26683);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__23202__auto____0;
cljs$core$async$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__23202__auto____1;
return cljs$core$async$state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto___26704,out))
})();
var state__23370__auto__ = (function (){var statearr_26702 = f__23369__auto__.call(null);
(statearr_26702[(6)] = c__23368__auto___26704);

return statearr_26702;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto___26704,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async26718 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26718 = (function (f,ch,meta26719){
this.f = f;
this.ch = ch;
this.meta26719 = meta26719;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async26718.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_26720,meta26719__$1){
var self__ = this;
var _26720__$1 = this;
return (new cljs.core.async.t_cljs$core$async26718(self__.f,self__.ch,meta26719__$1));
});

cljs.core.async.t_cljs$core$async26718.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_26720){
var self__ = this;
var _26720__$1 = this;
return self__.meta26719;
});

cljs.core.async.t_cljs$core$async26718.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async26718.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async26718.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async26718.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async26718.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async26721 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26721 = (function (f,ch,meta26719,_,fn1,meta26722){
this.f = f;
this.ch = ch;
this.meta26719 = meta26719;
this._ = _;
this.fn1 = fn1;
this.meta26722 = meta26722;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async26721.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_26723,meta26722__$1){
var self__ = this;
var _26723__$1 = this;
return (new cljs.core.async.t_cljs$core$async26721(self__.f,self__.ch,self__.meta26719,self__._,self__.fn1,meta26722__$1));
});})(___$1))
;

cljs.core.async.t_cljs$core$async26721.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_26723){
var self__ = this;
var _26723__$1 = this;
return self__.meta26722;
});})(___$1))
;

cljs.core.async.t_cljs$core$async26721.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async26721.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;

cljs.core.async.t_cljs$core$async26721.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
});})(___$1))
;

cljs.core.async.t_cljs$core$async26721.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__26717_SHARP_){
return f1.call(null,(((p1__26717_SHARP_ == null))?null:self__.f.call(null,p1__26717_SHARP_)));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t_cljs$core$async26721.getBasis = ((function (___$1){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta26719","meta26719",1435438638,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async26718","cljs.core.async/t_cljs$core$async26718",179683530,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta26722","meta26722",622882551,null)], null);
});})(___$1))
;

cljs.core.async.t_cljs$core$async26721.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async26721.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26721";

cljs.core.async.t_cljs$core$async26721.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__4374__auto__,writer__4375__auto__,opt__4376__auto__){
return cljs.core._write.call(null,writer__4375__auto__,"cljs.core.async/t_cljs$core$async26721");
});})(___$1))
;

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async26721.
 */
cljs.core.async.__GT_t_cljs$core$async26721 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t_cljs$core$async26721(f__$1,ch__$1,meta26719__$1,___$2,fn1__$1,meta26722){
return (new cljs.core.async.t_cljs$core$async26721(f__$1,ch__$1,meta26719__$1,___$2,fn1__$1,meta26722));
});})(___$1))
;

}

return (new cljs.core.async.t_cljs$core$async26721(self__.f,self__.ch,self__.meta26719,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__4120__auto__ = ret;
if(cljs.core.truth_(and__4120__auto__)){
return (!((cljs.core.deref.call(null,ret) == null)));
} else {
return and__4120__auto__;
}
})())){
return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else {
return ret;
}
});

cljs.core.async.t_cljs$core$async26718.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async26718.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});

cljs.core.async.t_cljs$core$async26718.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta26719","meta26719",1435438638,null)], null);
});

cljs.core.async.t_cljs$core$async26718.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async26718.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26718";

cljs.core.async.t_cljs$core$async26718.cljs$lang$ctorPrWriter = (function (this__4374__auto__,writer__4375__auto__,opt__4376__auto__){
return cljs.core._write.call(null,writer__4375__auto__,"cljs.core.async/t_cljs$core$async26718");
});

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async26718.
 */
cljs.core.async.__GT_t_cljs$core$async26718 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async26718(f__$1,ch__$1,meta26719){
return (new cljs.core.async.t_cljs$core$async26718(f__$1,ch__$1,meta26719));
});

}

return (new cljs.core.async.t_cljs$core$async26718(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async26724 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26724 = (function (f,ch,meta26725){
this.f = f;
this.ch = ch;
this.meta26725 = meta26725;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async26724.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_26726,meta26725__$1){
var self__ = this;
var _26726__$1 = this;
return (new cljs.core.async.t_cljs$core$async26724(self__.f,self__.ch,meta26725__$1));
});

cljs.core.async.t_cljs$core$async26724.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_26726){
var self__ = this;
var _26726__$1 = this;
return self__.meta26725;
});

cljs.core.async.t_cljs$core$async26724.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async26724.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async26724.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async26724.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async26724.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async26724.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});

cljs.core.async.t_cljs$core$async26724.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta26725","meta26725",-1353641417,null)], null);
});

cljs.core.async.t_cljs$core$async26724.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async26724.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26724";

cljs.core.async.t_cljs$core$async26724.cljs$lang$ctorPrWriter = (function (this__4374__auto__,writer__4375__auto__,opt__4376__auto__){
return cljs.core._write.call(null,writer__4375__auto__,"cljs.core.async/t_cljs$core$async26724");
});

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async26724.
 */
cljs.core.async.__GT_t_cljs$core$async26724 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async26724(f__$1,ch__$1,meta26725){
return (new cljs.core.async.t_cljs$core$async26724(f__$1,ch__$1,meta26725));
});

}

return (new cljs.core.async.t_cljs$core$async26724(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async26727 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async26727 = (function (p,ch,meta26728){
this.p = p;
this.ch = ch;
this.meta26728 = meta26728;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async26727.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_26729,meta26728__$1){
var self__ = this;
var _26729__$1 = this;
return (new cljs.core.async.t_cljs$core$async26727(self__.p,self__.ch,meta26728__$1));
});

cljs.core.async.t_cljs$core$async26727.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_26729){
var self__ = this;
var _26729__$1 = this;
return self__.meta26728;
});

cljs.core.async.t_cljs$core$async26727.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async26727.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async26727.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async26727.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async26727.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async26727.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async26727.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});

cljs.core.async.t_cljs$core$async26727.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta26728","meta26728",-34765358,null)], null);
});

cljs.core.async.t_cljs$core$async26727.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async26727.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async26727";

cljs.core.async.t_cljs$core$async26727.cljs$lang$ctorPrWriter = (function (this__4374__auto__,writer__4375__auto__,opt__4376__auto__){
return cljs.core._write.call(null,writer__4375__auto__,"cljs.core.async/t_cljs$core$async26727");
});

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async26727.
 */
cljs.core.async.__GT_t_cljs$core$async26727 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async26727(p__$1,ch__$1,meta26728){
return (new cljs.core.async.t_cljs$core$async26727(p__$1,ch__$1,meta26728));
});

}

return (new cljs.core.async.t_cljs$core$async26727(p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var G__26731 = arguments.length;
switch (G__26731) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.call(null,p,ch,null);
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__23368__auto___26771 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto___26771,out){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto___26771,out){
return (function (state_26752){
var state_val_26753 = (state_26752[(1)]);
if((state_val_26753 === (7))){
var inst_26748 = (state_26752[(2)]);
var state_26752__$1 = state_26752;
var statearr_26754_26772 = state_26752__$1;
(statearr_26754_26772[(2)] = inst_26748);

(statearr_26754_26772[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26753 === (1))){
var state_26752__$1 = state_26752;
var statearr_26755_26773 = state_26752__$1;
(statearr_26755_26773[(2)] = null);

(statearr_26755_26773[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26753 === (4))){
var inst_26734 = (state_26752[(7)]);
var inst_26734__$1 = (state_26752[(2)]);
var inst_26735 = (inst_26734__$1 == null);
var state_26752__$1 = (function (){var statearr_26756 = state_26752;
(statearr_26756[(7)] = inst_26734__$1);

return statearr_26756;
})();
if(cljs.core.truth_(inst_26735)){
var statearr_26757_26774 = state_26752__$1;
(statearr_26757_26774[(1)] = (5));

} else {
var statearr_26758_26775 = state_26752__$1;
(statearr_26758_26775[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26753 === (6))){
var inst_26734 = (state_26752[(7)]);
var inst_26739 = p.call(null,inst_26734);
var state_26752__$1 = state_26752;
if(cljs.core.truth_(inst_26739)){
var statearr_26759_26776 = state_26752__$1;
(statearr_26759_26776[(1)] = (8));

} else {
var statearr_26760_26777 = state_26752__$1;
(statearr_26760_26777[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26753 === (3))){
var inst_26750 = (state_26752[(2)]);
var state_26752__$1 = state_26752;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26752__$1,inst_26750);
} else {
if((state_val_26753 === (2))){
var state_26752__$1 = state_26752;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26752__$1,(4),ch);
} else {
if((state_val_26753 === (11))){
var inst_26742 = (state_26752[(2)]);
var state_26752__$1 = state_26752;
var statearr_26761_26778 = state_26752__$1;
(statearr_26761_26778[(2)] = inst_26742);

(statearr_26761_26778[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26753 === (9))){
var state_26752__$1 = state_26752;
var statearr_26762_26779 = state_26752__$1;
(statearr_26762_26779[(2)] = null);

(statearr_26762_26779[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26753 === (5))){
var inst_26737 = cljs.core.async.close_BANG_.call(null,out);
var state_26752__$1 = state_26752;
var statearr_26763_26780 = state_26752__$1;
(statearr_26763_26780[(2)] = inst_26737);

(statearr_26763_26780[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26753 === (10))){
var inst_26745 = (state_26752[(2)]);
var state_26752__$1 = (function (){var statearr_26764 = state_26752;
(statearr_26764[(8)] = inst_26745);

return statearr_26764;
})();
var statearr_26765_26781 = state_26752__$1;
(statearr_26765_26781[(2)] = null);

(statearr_26765_26781[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26753 === (8))){
var inst_26734 = (state_26752[(7)]);
var state_26752__$1 = state_26752;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26752__$1,(11),out,inst_26734);
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
});})(c__23368__auto___26771,out))
;
return ((function (switch__23201__auto__,c__23368__auto___26771,out){
return (function() {
var cljs$core$async$state_machine__23202__auto__ = null;
var cljs$core$async$state_machine__23202__auto____0 = (function (){
var statearr_26766 = [null,null,null,null,null,null,null,null,null];
(statearr_26766[(0)] = cljs$core$async$state_machine__23202__auto__);

(statearr_26766[(1)] = (1));

return statearr_26766;
});
var cljs$core$async$state_machine__23202__auto____1 = (function (state_26752){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_26752);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e26767){if((e26767 instanceof Object)){
var ex__23205__auto__ = e26767;
var statearr_26768_26782 = state_26752;
(statearr_26768_26782[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26752);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26767;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26783 = state_26752;
state_26752 = G__26783;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
cljs$core$async$state_machine__23202__auto__ = function(state_26752){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__23202__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__23202__auto____1.call(this,state_26752);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__23202__auto____0;
cljs$core$async$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__23202__auto____1;
return cljs$core$async$state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto___26771,out))
})();
var state__23370__auto__ = (function (){var statearr_26769 = f__23369__auto__.call(null);
(statearr_26769[(6)] = c__23368__auto___26771);

return statearr_26769;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto___26771,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var G__26785 = arguments.length;
switch (G__26785) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.call(null,p,ch,null);
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
});

cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3;

cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__23368__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto__){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto__){
return (function (state_26848){
var state_val_26849 = (state_26848[(1)]);
if((state_val_26849 === (7))){
var inst_26844 = (state_26848[(2)]);
var state_26848__$1 = state_26848;
var statearr_26850_26888 = state_26848__$1;
(statearr_26850_26888[(2)] = inst_26844);

(statearr_26850_26888[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26849 === (20))){
var inst_26814 = (state_26848[(7)]);
var inst_26825 = (state_26848[(2)]);
var inst_26826 = cljs.core.next.call(null,inst_26814);
var inst_26800 = inst_26826;
var inst_26801 = null;
var inst_26802 = (0);
var inst_26803 = (0);
var state_26848__$1 = (function (){var statearr_26851 = state_26848;
(statearr_26851[(8)] = inst_26800);

(statearr_26851[(9)] = inst_26825);

(statearr_26851[(10)] = inst_26802);

(statearr_26851[(11)] = inst_26801);

(statearr_26851[(12)] = inst_26803);

return statearr_26851;
})();
var statearr_26852_26889 = state_26848__$1;
(statearr_26852_26889[(2)] = null);

(statearr_26852_26889[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26849 === (1))){
var state_26848__$1 = state_26848;
var statearr_26853_26890 = state_26848__$1;
(statearr_26853_26890[(2)] = null);

(statearr_26853_26890[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26849 === (4))){
var inst_26789 = (state_26848[(13)]);
var inst_26789__$1 = (state_26848[(2)]);
var inst_26790 = (inst_26789__$1 == null);
var state_26848__$1 = (function (){var statearr_26854 = state_26848;
(statearr_26854[(13)] = inst_26789__$1);

return statearr_26854;
})();
if(cljs.core.truth_(inst_26790)){
var statearr_26855_26891 = state_26848__$1;
(statearr_26855_26891[(1)] = (5));

} else {
var statearr_26856_26892 = state_26848__$1;
(statearr_26856_26892[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26849 === (15))){
var state_26848__$1 = state_26848;
var statearr_26860_26893 = state_26848__$1;
(statearr_26860_26893[(2)] = null);

(statearr_26860_26893[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26849 === (21))){
var state_26848__$1 = state_26848;
var statearr_26861_26894 = state_26848__$1;
(statearr_26861_26894[(2)] = null);

(statearr_26861_26894[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26849 === (13))){
var inst_26800 = (state_26848[(8)]);
var inst_26802 = (state_26848[(10)]);
var inst_26801 = (state_26848[(11)]);
var inst_26803 = (state_26848[(12)]);
var inst_26810 = (state_26848[(2)]);
var inst_26811 = (inst_26803 + (1));
var tmp26857 = inst_26800;
var tmp26858 = inst_26802;
var tmp26859 = inst_26801;
var inst_26800__$1 = tmp26857;
var inst_26801__$1 = tmp26859;
var inst_26802__$1 = tmp26858;
var inst_26803__$1 = inst_26811;
var state_26848__$1 = (function (){var statearr_26862 = state_26848;
(statearr_26862[(8)] = inst_26800__$1);

(statearr_26862[(14)] = inst_26810);

(statearr_26862[(10)] = inst_26802__$1);

(statearr_26862[(11)] = inst_26801__$1);

(statearr_26862[(12)] = inst_26803__$1);

return statearr_26862;
})();
var statearr_26863_26895 = state_26848__$1;
(statearr_26863_26895[(2)] = null);

(statearr_26863_26895[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26849 === (22))){
var state_26848__$1 = state_26848;
var statearr_26864_26896 = state_26848__$1;
(statearr_26864_26896[(2)] = null);

(statearr_26864_26896[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26849 === (6))){
var inst_26789 = (state_26848[(13)]);
var inst_26798 = f.call(null,inst_26789);
var inst_26799 = cljs.core.seq.call(null,inst_26798);
var inst_26800 = inst_26799;
var inst_26801 = null;
var inst_26802 = (0);
var inst_26803 = (0);
var state_26848__$1 = (function (){var statearr_26865 = state_26848;
(statearr_26865[(8)] = inst_26800);

(statearr_26865[(10)] = inst_26802);

(statearr_26865[(11)] = inst_26801);

(statearr_26865[(12)] = inst_26803);

return statearr_26865;
})();
var statearr_26866_26897 = state_26848__$1;
(statearr_26866_26897[(2)] = null);

(statearr_26866_26897[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26849 === (17))){
var inst_26814 = (state_26848[(7)]);
var inst_26818 = cljs.core.chunk_first.call(null,inst_26814);
var inst_26819 = cljs.core.chunk_rest.call(null,inst_26814);
var inst_26820 = cljs.core.count.call(null,inst_26818);
var inst_26800 = inst_26819;
var inst_26801 = inst_26818;
var inst_26802 = inst_26820;
var inst_26803 = (0);
var state_26848__$1 = (function (){var statearr_26867 = state_26848;
(statearr_26867[(8)] = inst_26800);

(statearr_26867[(10)] = inst_26802);

(statearr_26867[(11)] = inst_26801);

(statearr_26867[(12)] = inst_26803);

return statearr_26867;
})();
var statearr_26868_26898 = state_26848__$1;
(statearr_26868_26898[(2)] = null);

(statearr_26868_26898[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26849 === (3))){
var inst_26846 = (state_26848[(2)]);
var state_26848__$1 = state_26848;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26848__$1,inst_26846);
} else {
if((state_val_26849 === (12))){
var inst_26834 = (state_26848[(2)]);
var state_26848__$1 = state_26848;
var statearr_26869_26899 = state_26848__$1;
(statearr_26869_26899[(2)] = inst_26834);

(statearr_26869_26899[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26849 === (2))){
var state_26848__$1 = state_26848;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26848__$1,(4),in$);
} else {
if((state_val_26849 === (23))){
var inst_26842 = (state_26848[(2)]);
var state_26848__$1 = state_26848;
var statearr_26870_26900 = state_26848__$1;
(statearr_26870_26900[(2)] = inst_26842);

(statearr_26870_26900[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26849 === (19))){
var inst_26829 = (state_26848[(2)]);
var state_26848__$1 = state_26848;
var statearr_26871_26901 = state_26848__$1;
(statearr_26871_26901[(2)] = inst_26829);

(statearr_26871_26901[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26849 === (11))){
var inst_26800 = (state_26848[(8)]);
var inst_26814 = (state_26848[(7)]);
var inst_26814__$1 = cljs.core.seq.call(null,inst_26800);
var state_26848__$1 = (function (){var statearr_26872 = state_26848;
(statearr_26872[(7)] = inst_26814__$1);

return statearr_26872;
})();
if(inst_26814__$1){
var statearr_26873_26902 = state_26848__$1;
(statearr_26873_26902[(1)] = (14));

} else {
var statearr_26874_26903 = state_26848__$1;
(statearr_26874_26903[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26849 === (9))){
var inst_26836 = (state_26848[(2)]);
var inst_26837 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_26848__$1 = (function (){var statearr_26875 = state_26848;
(statearr_26875[(15)] = inst_26836);

return statearr_26875;
})();
if(cljs.core.truth_(inst_26837)){
var statearr_26876_26904 = state_26848__$1;
(statearr_26876_26904[(1)] = (21));

} else {
var statearr_26877_26905 = state_26848__$1;
(statearr_26877_26905[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26849 === (5))){
var inst_26792 = cljs.core.async.close_BANG_.call(null,out);
var state_26848__$1 = state_26848;
var statearr_26878_26906 = state_26848__$1;
(statearr_26878_26906[(2)] = inst_26792);

(statearr_26878_26906[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26849 === (14))){
var inst_26814 = (state_26848[(7)]);
var inst_26816 = cljs.core.chunked_seq_QMARK_.call(null,inst_26814);
var state_26848__$1 = state_26848;
if(inst_26816){
var statearr_26879_26907 = state_26848__$1;
(statearr_26879_26907[(1)] = (17));

} else {
var statearr_26880_26908 = state_26848__$1;
(statearr_26880_26908[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26849 === (16))){
var inst_26832 = (state_26848[(2)]);
var state_26848__$1 = state_26848;
var statearr_26881_26909 = state_26848__$1;
(statearr_26881_26909[(2)] = inst_26832);

(statearr_26881_26909[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26849 === (10))){
var inst_26801 = (state_26848[(11)]);
var inst_26803 = (state_26848[(12)]);
var inst_26808 = cljs.core._nth.call(null,inst_26801,inst_26803);
var state_26848__$1 = state_26848;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26848__$1,(13),out,inst_26808);
} else {
if((state_val_26849 === (18))){
var inst_26814 = (state_26848[(7)]);
var inst_26823 = cljs.core.first.call(null,inst_26814);
var state_26848__$1 = state_26848;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26848__$1,(20),out,inst_26823);
} else {
if((state_val_26849 === (8))){
var inst_26802 = (state_26848[(10)]);
var inst_26803 = (state_26848[(12)]);
var inst_26805 = (inst_26803 < inst_26802);
var inst_26806 = inst_26805;
var state_26848__$1 = state_26848;
if(cljs.core.truth_(inst_26806)){
var statearr_26882_26910 = state_26848__$1;
(statearr_26882_26910[(1)] = (10));

} else {
var statearr_26883_26911 = state_26848__$1;
(statearr_26883_26911[(1)] = (11));

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
});})(c__23368__auto__))
;
return ((function (switch__23201__auto__,c__23368__auto__){
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__23202__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__23202__auto____0 = (function (){
var statearr_26884 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_26884[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__23202__auto__);

(statearr_26884[(1)] = (1));

return statearr_26884;
});
var cljs$core$async$mapcat_STAR__$_state_machine__23202__auto____1 = (function (state_26848){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_26848);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e26885){if((e26885 instanceof Object)){
var ex__23205__auto__ = e26885;
var statearr_26886_26912 = state_26848;
(statearr_26886_26912[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26848);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26885;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26913 = state_26848;
state_26848 = G__26913;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__23202__auto__ = function(state_26848){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__23202__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__23202__auto____1.call(this,state_26848);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__23202__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__23202__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto__))
})();
var state__23370__auto__ = (function (){var statearr_26887 = f__23369__auto__.call(null);
(statearr_26887[(6)] = c__23368__auto__);

return statearr_26887;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto__))
);

return c__23368__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__26915 = arguments.length;
switch (G__26915) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.call(null,f,in$,null);
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return out;
});

cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var G__26918 = arguments.length;
switch (G__26918) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.call(null,f,out,null);
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return in$;
});

cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var G__26921 = arguments.length;
switch (G__26921) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.call(null,ch,null);
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__23368__auto___26968 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto___26968,out){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto___26968,out){
return (function (state_26945){
var state_val_26946 = (state_26945[(1)]);
if((state_val_26946 === (7))){
var inst_26940 = (state_26945[(2)]);
var state_26945__$1 = state_26945;
var statearr_26947_26969 = state_26945__$1;
(statearr_26947_26969[(2)] = inst_26940);

(statearr_26947_26969[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26946 === (1))){
var inst_26922 = null;
var state_26945__$1 = (function (){var statearr_26948 = state_26945;
(statearr_26948[(7)] = inst_26922);

return statearr_26948;
})();
var statearr_26949_26970 = state_26945__$1;
(statearr_26949_26970[(2)] = null);

(statearr_26949_26970[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26946 === (4))){
var inst_26925 = (state_26945[(8)]);
var inst_26925__$1 = (state_26945[(2)]);
var inst_26926 = (inst_26925__$1 == null);
var inst_26927 = cljs.core.not.call(null,inst_26926);
var state_26945__$1 = (function (){var statearr_26950 = state_26945;
(statearr_26950[(8)] = inst_26925__$1);

return statearr_26950;
})();
if(inst_26927){
var statearr_26951_26971 = state_26945__$1;
(statearr_26951_26971[(1)] = (5));

} else {
var statearr_26952_26972 = state_26945__$1;
(statearr_26952_26972[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26946 === (6))){
var state_26945__$1 = state_26945;
var statearr_26953_26973 = state_26945__$1;
(statearr_26953_26973[(2)] = null);

(statearr_26953_26973[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26946 === (3))){
var inst_26942 = (state_26945[(2)]);
var inst_26943 = cljs.core.async.close_BANG_.call(null,out);
var state_26945__$1 = (function (){var statearr_26954 = state_26945;
(statearr_26954[(9)] = inst_26942);

return statearr_26954;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26945__$1,inst_26943);
} else {
if((state_val_26946 === (2))){
var state_26945__$1 = state_26945;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26945__$1,(4),ch);
} else {
if((state_val_26946 === (11))){
var inst_26925 = (state_26945[(8)]);
var inst_26934 = (state_26945[(2)]);
var inst_26922 = inst_26925;
var state_26945__$1 = (function (){var statearr_26955 = state_26945;
(statearr_26955[(10)] = inst_26934);

(statearr_26955[(7)] = inst_26922);

return statearr_26955;
})();
var statearr_26956_26974 = state_26945__$1;
(statearr_26956_26974[(2)] = null);

(statearr_26956_26974[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26946 === (9))){
var inst_26925 = (state_26945[(8)]);
var state_26945__$1 = state_26945;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26945__$1,(11),out,inst_26925);
} else {
if((state_val_26946 === (5))){
var inst_26925 = (state_26945[(8)]);
var inst_26922 = (state_26945[(7)]);
var inst_26929 = cljs.core._EQ_.call(null,inst_26925,inst_26922);
var state_26945__$1 = state_26945;
if(inst_26929){
var statearr_26958_26975 = state_26945__$1;
(statearr_26958_26975[(1)] = (8));

} else {
var statearr_26959_26976 = state_26945__$1;
(statearr_26959_26976[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26946 === (10))){
var inst_26937 = (state_26945[(2)]);
var state_26945__$1 = state_26945;
var statearr_26960_26977 = state_26945__$1;
(statearr_26960_26977[(2)] = inst_26937);

(statearr_26960_26977[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26946 === (8))){
var inst_26922 = (state_26945[(7)]);
var tmp26957 = inst_26922;
var inst_26922__$1 = tmp26957;
var state_26945__$1 = (function (){var statearr_26961 = state_26945;
(statearr_26961[(7)] = inst_26922__$1);

return statearr_26961;
})();
var statearr_26962_26978 = state_26945__$1;
(statearr_26962_26978[(2)] = null);

(statearr_26962_26978[(1)] = (2));


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
});})(c__23368__auto___26968,out))
;
return ((function (switch__23201__auto__,c__23368__auto___26968,out){
return (function() {
var cljs$core$async$state_machine__23202__auto__ = null;
var cljs$core$async$state_machine__23202__auto____0 = (function (){
var statearr_26963 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_26963[(0)] = cljs$core$async$state_machine__23202__auto__);

(statearr_26963[(1)] = (1));

return statearr_26963;
});
var cljs$core$async$state_machine__23202__auto____1 = (function (state_26945){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_26945);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e26964){if((e26964 instanceof Object)){
var ex__23205__auto__ = e26964;
var statearr_26965_26979 = state_26945;
(statearr_26965_26979[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26945);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26964;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26980 = state_26945;
state_26945 = G__26980;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
cljs$core$async$state_machine__23202__auto__ = function(state_26945){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__23202__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__23202__auto____1.call(this,state_26945);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__23202__auto____0;
cljs$core$async$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__23202__auto____1;
return cljs$core$async$state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto___26968,out))
})();
var state__23370__auto__ = (function (){var statearr_26966 = f__23369__auto__.call(null);
(statearr_26966[(6)] = c__23368__auto___26968);

return statearr_26966;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto___26968,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var G__26982 = arguments.length;
switch (G__26982) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.call(null,n,ch,null);
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__23368__auto___27048 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto___27048,out){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto___27048,out){
return (function (state_27020){
var state_val_27021 = (state_27020[(1)]);
if((state_val_27021 === (7))){
var inst_27016 = (state_27020[(2)]);
var state_27020__$1 = state_27020;
var statearr_27022_27049 = state_27020__$1;
(statearr_27022_27049[(2)] = inst_27016);

(statearr_27022_27049[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27021 === (1))){
var inst_26983 = (new Array(n));
var inst_26984 = inst_26983;
var inst_26985 = (0);
var state_27020__$1 = (function (){var statearr_27023 = state_27020;
(statearr_27023[(7)] = inst_26984);

(statearr_27023[(8)] = inst_26985);

return statearr_27023;
})();
var statearr_27024_27050 = state_27020__$1;
(statearr_27024_27050[(2)] = null);

(statearr_27024_27050[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27021 === (4))){
var inst_26988 = (state_27020[(9)]);
var inst_26988__$1 = (state_27020[(2)]);
var inst_26989 = (inst_26988__$1 == null);
var inst_26990 = cljs.core.not.call(null,inst_26989);
var state_27020__$1 = (function (){var statearr_27025 = state_27020;
(statearr_27025[(9)] = inst_26988__$1);

return statearr_27025;
})();
if(inst_26990){
var statearr_27026_27051 = state_27020__$1;
(statearr_27026_27051[(1)] = (5));

} else {
var statearr_27027_27052 = state_27020__$1;
(statearr_27027_27052[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27021 === (15))){
var inst_27010 = (state_27020[(2)]);
var state_27020__$1 = state_27020;
var statearr_27028_27053 = state_27020__$1;
(statearr_27028_27053[(2)] = inst_27010);

(statearr_27028_27053[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27021 === (13))){
var state_27020__$1 = state_27020;
var statearr_27029_27054 = state_27020__$1;
(statearr_27029_27054[(2)] = null);

(statearr_27029_27054[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27021 === (6))){
var inst_26985 = (state_27020[(8)]);
var inst_27006 = (inst_26985 > (0));
var state_27020__$1 = state_27020;
if(cljs.core.truth_(inst_27006)){
var statearr_27030_27055 = state_27020__$1;
(statearr_27030_27055[(1)] = (12));

} else {
var statearr_27031_27056 = state_27020__$1;
(statearr_27031_27056[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27021 === (3))){
var inst_27018 = (state_27020[(2)]);
var state_27020__$1 = state_27020;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27020__$1,inst_27018);
} else {
if((state_val_27021 === (12))){
var inst_26984 = (state_27020[(7)]);
var inst_27008 = cljs.core.vec.call(null,inst_26984);
var state_27020__$1 = state_27020;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27020__$1,(15),out,inst_27008);
} else {
if((state_val_27021 === (2))){
var state_27020__$1 = state_27020;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27020__$1,(4),ch);
} else {
if((state_val_27021 === (11))){
var inst_27000 = (state_27020[(2)]);
var inst_27001 = (new Array(n));
var inst_26984 = inst_27001;
var inst_26985 = (0);
var state_27020__$1 = (function (){var statearr_27032 = state_27020;
(statearr_27032[(7)] = inst_26984);

(statearr_27032[(10)] = inst_27000);

(statearr_27032[(8)] = inst_26985);

return statearr_27032;
})();
var statearr_27033_27057 = state_27020__$1;
(statearr_27033_27057[(2)] = null);

(statearr_27033_27057[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27021 === (9))){
var inst_26984 = (state_27020[(7)]);
var inst_26998 = cljs.core.vec.call(null,inst_26984);
var state_27020__$1 = state_27020;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27020__$1,(11),out,inst_26998);
} else {
if((state_val_27021 === (5))){
var inst_26984 = (state_27020[(7)]);
var inst_26993 = (state_27020[(11)]);
var inst_26988 = (state_27020[(9)]);
var inst_26985 = (state_27020[(8)]);
var inst_26992 = (inst_26984[inst_26985] = inst_26988);
var inst_26993__$1 = (inst_26985 + (1));
var inst_26994 = (inst_26993__$1 < n);
var state_27020__$1 = (function (){var statearr_27034 = state_27020;
(statearr_27034[(12)] = inst_26992);

(statearr_27034[(11)] = inst_26993__$1);

return statearr_27034;
})();
if(cljs.core.truth_(inst_26994)){
var statearr_27035_27058 = state_27020__$1;
(statearr_27035_27058[(1)] = (8));

} else {
var statearr_27036_27059 = state_27020__$1;
(statearr_27036_27059[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27021 === (14))){
var inst_27013 = (state_27020[(2)]);
var inst_27014 = cljs.core.async.close_BANG_.call(null,out);
var state_27020__$1 = (function (){var statearr_27038 = state_27020;
(statearr_27038[(13)] = inst_27013);

return statearr_27038;
})();
var statearr_27039_27060 = state_27020__$1;
(statearr_27039_27060[(2)] = inst_27014);

(statearr_27039_27060[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27021 === (10))){
var inst_27004 = (state_27020[(2)]);
var state_27020__$1 = state_27020;
var statearr_27040_27061 = state_27020__$1;
(statearr_27040_27061[(2)] = inst_27004);

(statearr_27040_27061[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27021 === (8))){
var inst_26984 = (state_27020[(7)]);
var inst_26993 = (state_27020[(11)]);
var tmp27037 = inst_26984;
var inst_26984__$1 = tmp27037;
var inst_26985 = inst_26993;
var state_27020__$1 = (function (){var statearr_27041 = state_27020;
(statearr_27041[(7)] = inst_26984__$1);

(statearr_27041[(8)] = inst_26985);

return statearr_27041;
})();
var statearr_27042_27062 = state_27020__$1;
(statearr_27042_27062[(2)] = null);

(statearr_27042_27062[(1)] = (2));


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
});})(c__23368__auto___27048,out))
;
return ((function (switch__23201__auto__,c__23368__auto___27048,out){
return (function() {
var cljs$core$async$state_machine__23202__auto__ = null;
var cljs$core$async$state_machine__23202__auto____0 = (function (){
var statearr_27043 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_27043[(0)] = cljs$core$async$state_machine__23202__auto__);

(statearr_27043[(1)] = (1));

return statearr_27043;
});
var cljs$core$async$state_machine__23202__auto____1 = (function (state_27020){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_27020);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e27044){if((e27044 instanceof Object)){
var ex__23205__auto__ = e27044;
var statearr_27045_27063 = state_27020;
(statearr_27045_27063[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27020);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27044;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27064 = state_27020;
state_27020 = G__27064;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
cljs$core$async$state_machine__23202__auto__ = function(state_27020){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__23202__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__23202__auto____1.call(this,state_27020);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__23202__auto____0;
cljs$core$async$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__23202__auto____1;
return cljs$core$async$state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto___27048,out))
})();
var state__23370__auto__ = (function (){var statearr_27046 = f__23369__auto__.call(null);
(statearr_27046[(6)] = c__23368__auto___27048);

return statearr_27046;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto___27048,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var G__27066 = arguments.length;
switch (G__27066) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.call(null,f,ch,null);
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__23368__auto___27136 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__23368__auto___27136,out){
return (function (){
var f__23369__auto__ = (function (){var switch__23201__auto__ = ((function (c__23368__auto___27136,out){
return (function (state_27108){
var state_val_27109 = (state_27108[(1)]);
if((state_val_27109 === (7))){
var inst_27104 = (state_27108[(2)]);
var state_27108__$1 = state_27108;
var statearr_27110_27137 = state_27108__$1;
(statearr_27110_27137[(2)] = inst_27104);

(statearr_27110_27137[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27109 === (1))){
var inst_27067 = [];
var inst_27068 = inst_27067;
var inst_27069 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_27108__$1 = (function (){var statearr_27111 = state_27108;
(statearr_27111[(7)] = inst_27068);

(statearr_27111[(8)] = inst_27069);

return statearr_27111;
})();
var statearr_27112_27138 = state_27108__$1;
(statearr_27112_27138[(2)] = null);

(statearr_27112_27138[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27109 === (4))){
var inst_27072 = (state_27108[(9)]);
var inst_27072__$1 = (state_27108[(2)]);
var inst_27073 = (inst_27072__$1 == null);
var inst_27074 = cljs.core.not.call(null,inst_27073);
var state_27108__$1 = (function (){var statearr_27113 = state_27108;
(statearr_27113[(9)] = inst_27072__$1);

return statearr_27113;
})();
if(inst_27074){
var statearr_27114_27139 = state_27108__$1;
(statearr_27114_27139[(1)] = (5));

} else {
var statearr_27115_27140 = state_27108__$1;
(statearr_27115_27140[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27109 === (15))){
var inst_27098 = (state_27108[(2)]);
var state_27108__$1 = state_27108;
var statearr_27116_27141 = state_27108__$1;
(statearr_27116_27141[(2)] = inst_27098);

(statearr_27116_27141[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27109 === (13))){
var state_27108__$1 = state_27108;
var statearr_27117_27142 = state_27108__$1;
(statearr_27117_27142[(2)] = null);

(statearr_27117_27142[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27109 === (6))){
var inst_27068 = (state_27108[(7)]);
var inst_27093 = inst_27068.length;
var inst_27094 = (inst_27093 > (0));
var state_27108__$1 = state_27108;
if(cljs.core.truth_(inst_27094)){
var statearr_27118_27143 = state_27108__$1;
(statearr_27118_27143[(1)] = (12));

} else {
var statearr_27119_27144 = state_27108__$1;
(statearr_27119_27144[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27109 === (3))){
var inst_27106 = (state_27108[(2)]);
var state_27108__$1 = state_27108;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27108__$1,inst_27106);
} else {
if((state_val_27109 === (12))){
var inst_27068 = (state_27108[(7)]);
var inst_27096 = cljs.core.vec.call(null,inst_27068);
var state_27108__$1 = state_27108;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27108__$1,(15),out,inst_27096);
} else {
if((state_val_27109 === (2))){
var state_27108__$1 = state_27108;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27108__$1,(4),ch);
} else {
if((state_val_27109 === (11))){
var inst_27076 = (state_27108[(10)]);
var inst_27072 = (state_27108[(9)]);
var inst_27086 = (state_27108[(2)]);
var inst_27087 = [];
var inst_27088 = inst_27087.push(inst_27072);
var inst_27068 = inst_27087;
var inst_27069 = inst_27076;
var state_27108__$1 = (function (){var statearr_27120 = state_27108;
(statearr_27120[(11)] = inst_27088);

(statearr_27120[(12)] = inst_27086);

(statearr_27120[(7)] = inst_27068);

(statearr_27120[(8)] = inst_27069);

return statearr_27120;
})();
var statearr_27121_27145 = state_27108__$1;
(statearr_27121_27145[(2)] = null);

(statearr_27121_27145[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27109 === (9))){
var inst_27068 = (state_27108[(7)]);
var inst_27084 = cljs.core.vec.call(null,inst_27068);
var state_27108__$1 = state_27108;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27108__$1,(11),out,inst_27084);
} else {
if((state_val_27109 === (5))){
var inst_27076 = (state_27108[(10)]);
var inst_27069 = (state_27108[(8)]);
var inst_27072 = (state_27108[(9)]);
var inst_27076__$1 = f.call(null,inst_27072);
var inst_27077 = cljs.core._EQ_.call(null,inst_27076__$1,inst_27069);
var inst_27078 = cljs.core.keyword_identical_QMARK_.call(null,inst_27069,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_27079 = ((inst_27077) || (inst_27078));
var state_27108__$1 = (function (){var statearr_27122 = state_27108;
(statearr_27122[(10)] = inst_27076__$1);

return statearr_27122;
})();
if(cljs.core.truth_(inst_27079)){
var statearr_27123_27146 = state_27108__$1;
(statearr_27123_27146[(1)] = (8));

} else {
var statearr_27124_27147 = state_27108__$1;
(statearr_27124_27147[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27109 === (14))){
var inst_27101 = (state_27108[(2)]);
var inst_27102 = cljs.core.async.close_BANG_.call(null,out);
var state_27108__$1 = (function (){var statearr_27126 = state_27108;
(statearr_27126[(13)] = inst_27101);

return statearr_27126;
})();
var statearr_27127_27148 = state_27108__$1;
(statearr_27127_27148[(2)] = inst_27102);

(statearr_27127_27148[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27109 === (10))){
var inst_27091 = (state_27108[(2)]);
var state_27108__$1 = state_27108;
var statearr_27128_27149 = state_27108__$1;
(statearr_27128_27149[(2)] = inst_27091);

(statearr_27128_27149[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27109 === (8))){
var inst_27076 = (state_27108[(10)]);
var inst_27068 = (state_27108[(7)]);
var inst_27072 = (state_27108[(9)]);
var inst_27081 = inst_27068.push(inst_27072);
var tmp27125 = inst_27068;
var inst_27068__$1 = tmp27125;
var inst_27069 = inst_27076;
var state_27108__$1 = (function (){var statearr_27129 = state_27108;
(statearr_27129[(7)] = inst_27068__$1);

(statearr_27129[(14)] = inst_27081);

(statearr_27129[(8)] = inst_27069);

return statearr_27129;
})();
var statearr_27130_27150 = state_27108__$1;
(statearr_27130_27150[(2)] = null);

(statearr_27130_27150[(1)] = (2));


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
});})(c__23368__auto___27136,out))
;
return ((function (switch__23201__auto__,c__23368__auto___27136,out){
return (function() {
var cljs$core$async$state_machine__23202__auto__ = null;
var cljs$core$async$state_machine__23202__auto____0 = (function (){
var statearr_27131 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_27131[(0)] = cljs$core$async$state_machine__23202__auto__);

(statearr_27131[(1)] = (1));

return statearr_27131;
});
var cljs$core$async$state_machine__23202__auto____1 = (function (state_27108){
while(true){
var ret_value__23203__auto__ = (function (){try{while(true){
var result__23204__auto__ = switch__23201__auto__.call(null,state_27108);
if(cljs.core.keyword_identical_QMARK_.call(null,result__23204__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__23204__auto__;
}
break;
}
}catch (e27132){if((e27132 instanceof Object)){
var ex__23205__auto__ = e27132;
var statearr_27133_27151 = state_27108;
(statearr_27133_27151[(5)] = ex__23205__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27108);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27132;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__23203__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27152 = state_27108;
state_27108 = G__27152;
continue;
} else {
return ret_value__23203__auto__;
}
break;
}
});
cljs$core$async$state_machine__23202__auto__ = function(state_27108){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__23202__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__23202__auto____1.call(this,state_27108);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__23202__auto____0;
cljs$core$async$state_machine__23202__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__23202__auto____1;
return cljs$core$async$state_machine__23202__auto__;
})()
;})(switch__23201__auto__,c__23368__auto___27136,out))
})();
var state__23370__auto__ = (function (){var statearr_27134 = f__23369__auto__.call(null);
(statearr_27134[(6)] = c__23368__auto___27136);

return statearr_27134;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__23370__auto__);
});})(c__23368__auto___27136,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;


//# sourceMappingURL=async.js.map?rel=1567785974269
