var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _get=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if("value"in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var EagerOperation=require('./EagerOperation');var RelationJoinBuilder=require('./RelationJoinBuilder');var JoinEagerOperation=function(_EagerOperation){_inherits(JoinEagerOperation,_EagerOperation);function JoinEagerOperation(name,opt){_classCallCheck(this,JoinEagerOperation);var _this=_possibleConstructorReturn(this,(JoinEagerOperation.__proto__||Object.getPrototypeOf(JoinEagerOperation)).call(this,name,opt));_this.joinBuilder=null;return _this;}_createClass(JoinEagerOperation,[{key:'onAdd',value:function onAdd(builder,args){var ret=_get(JoinEagerOperation.prototype.__proto__||Object.getPrototypeOf(JoinEagerOperation.prototype),'onAdd',this).call(this,builder,args);var modelClass=builder.modelClass();if(ret){this.joinBuilder=new RelationJoinBuilder({modelClass:modelClass,expression:this.expression,modifiers:this.modifiers});}return ret;}},{key:'onBefore2',value:function onBefore2(builder){this.joinBuilder.setOptions(builder.eagerOptions());return this.joinBuilder.fetchColumnInfo(builder);}},{key:'onBuild',value:function onBuild(builder){builder.findOptions({callAfterGetDeeply:true});this.joinBuilder.build(builder);}},{key:'onRawResult',value:function onRawResult(builder,rows){return this.joinBuilder.rowsToTree(rows);}}]);return JoinEagerOperation;}(EagerOperation);module.exports=JoinEagerOperation;