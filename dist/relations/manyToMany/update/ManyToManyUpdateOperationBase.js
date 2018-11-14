var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _get=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if("value"in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var UpdateOperation=require('../../../queryBuilder/operations/UpdateOperation');var ManyToManyUpdateOperationBase=function(_UpdateOperation){_inherits(ManyToManyUpdateOperationBase,_UpdateOperation);function ManyToManyUpdateOperationBase(name,opt){_classCallCheck(this,ManyToManyUpdateOperationBase);var _this=_possibleConstructorReturn(this,(ManyToManyUpdateOperationBase.__proto__||Object.getPrototypeOf(ManyToManyUpdateOperationBase)).call(this,name,opt));_this.relation=opt.relation;_this.owner=opt.owner;_this.hasExtraProps=false;_this.joinTablePatch={};_this.joinTablePatchFilterQuery=null;return _this;}_createClass(ManyToManyUpdateOperationBase,[{key:'onAdd',value:function onAdd(builder,args){var modelClass=builder.modelClass();var obj=args[0];for(var i=0;i<this.relation.joinTableExtras.length;++i){var extra=this.relation.joinTableExtras[i];if(extra.aliasProp in obj){this.hasExtraProps=true;this.joinTablePatch[extra.joinTableProp]=obj[extra.aliasProp];}}var res=_get(ManyToManyUpdateOperationBase.prototype.__proto__||Object.getPrototypeOf(ManyToManyUpdateOperationBase.prototype),'onAdd',this).call(this,builder,args);if(this.hasExtraProps){this.relation.omitExtraProps([this.model]);}return res;}},{key:'onBefore3',value:function onBefore3(builder){var row=this.model.$toDatabaseJson(builder);if(Object.keys(row).length===0){builder.resolve([0]);}return _get(ManyToManyUpdateOperationBase.prototype.__proto__||Object.getPrototypeOf(ManyToManyUpdateOperationBase.prototype),'onBefore3',this).call(this,builder);}},{key:'onAfter1',value:function onAfter1(builder,result){if(this.hasExtraProps){var joinTableUpdateQuery=this.relation.getJoinModelClass(builder.knex()).query().childQueryOf(builder).patch(this.joinTablePatch);return this.applyModifyFilterForJoinTable(joinTableUpdateQuery).return(result);}else{return result;}}},{key:'applyModifyFilterForRelatedTable',value:function applyModifyFilterForRelatedTable(builder){throw new Error('not implemented');}},{key:'applyModifyFilterForJoinTable',value:function applyModifyFilterForJoinTable(builder){throw new Error('not implemented');}}]);return ManyToManyUpdateOperationBase;}(UpdateOperation);module.exports=ManyToManyUpdateOperationBase;