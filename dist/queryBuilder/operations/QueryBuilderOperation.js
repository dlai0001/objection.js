var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var QueryBuilderOperation=function(){function QueryBuilderOperation(name,opt){_classCallCheck(this,QueryBuilderOperation);this.name=name;this.opt=opt||{};}_createClass(QueryBuilderOperation,[{key:"is",value:function is(OperationClass){return this instanceof OperationClass;}},{key:"onAdd",value:function onAdd(builder,args){return true;}},{key:"onBefore1",value:function onBefore1(builder,result){}},{key:"hasOnBefore1",value:function hasOnBefore1(){return this.onBefore1!==QueryBuilderOperation.prototype.onBefore1;}},{key:"onBefore2",value:function onBefore2(builder,result){}},{key:"hasOnBefore2",value:function hasOnBefore2(){return this.onBefore2!==QueryBuilderOperation.prototype.onBefore2;}},{key:"onBefore3",value:function onBefore3(builder,result){}},{key:"hasOnBefore3",value:function hasOnBefore3(){return this.onBefore3!==QueryBuilderOperation.prototype.onBefore3;}},{key:"onBuild",value:function onBuild(builder){}},{key:"hasOnBuild",value:function hasOnBuild(){return this.onBuild!==QueryBuilderOperation.prototype.onBuild;}},{key:"onBuildKnex",value:function onBuildKnex(knexBuilder,builder){}},{key:"hasOnBuildKnex",value:function hasOnBuildKnex(){return this.onBuildKnex!==QueryBuilderOperation.prototype.onBuildKnex;}},{key:"onRawResult",value:function onRawResult(builder,rows){return rows;}},{key:"hasOnRawResult",value:function hasOnRawResult(){return this.onRawResult!==QueryBuilderOperation.prototype.onRawResult;}},{key:"onAfter1",value:function onAfter1(builder,result){return result;}},{key:"hasOnAfter1",value:function hasOnAfter1(){return this.onAfter1!==QueryBuilderOperation.prototype.onAfter1;}},{key:"onAfter2",value:function onAfter2(builder,result){return result;}},{key:"hasOnAfter2",value:function hasOnAfter2(){return this.onAfter2!==QueryBuilderOperation.prototype.onAfter2;}},{key:"onAfter3",value:function onAfter3(builder,result){return result;}},{key:"hasOnAfter3",value:function hasOnAfter3(){return this.onAfter3!==QueryBuilderOperation.prototype.onAfter3;}},{key:"queryExecutor",value:function queryExecutor(builder){}},{key:"hasQueryExecutor",value:function hasQueryExecutor(){return this.queryExecutor!==QueryBuilderOperation.prototype.queryExecutor;}},{key:"onError",value:function onError(builder,error){}},{key:"hasOnError",value:function hasOnError(){return this.onError!==QueryBuilderOperation.prototype.onError;}}]);return QueryBuilderOperation;}();module.exports=QueryBuilderOperation;