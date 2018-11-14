var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _get=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if("value"in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var FindOperation=require('../queryBuilder/operations/FindOperation');var _require=require('../utils/objectUtils'),uniqBy=_require.uniqBy;var RelationFindOperation=function(_FindOperation){_inherits(RelationFindOperation,_FindOperation);function RelationFindOperation(name,opt){_classCallCheck(this,RelationFindOperation);var _this=_possibleConstructorReturn(this,(RelationFindOperation.__proto__||Object.getPrototypeOf(RelationFindOperation)).call(this,name,opt));_this.relation=opt.relation;_this.owners=opt.owners;_this.alwaysReturnArray=false;_this.assignResultToOwner=true;_this.relationProperty=opt.relationProperty||_this.relation.name;_this.omitProps=[];return _this;}_createClass(RelationFindOperation,[{key:'onBuild',value:function onBuild(builder){var ids=new Array(this.owners.length);for(var i=0,l=this.owners.length;i<l;++i){ids[i]=this.relation.ownerProp.getProps(this.owners[i]);}this.relation.findQuery(builder,{ownerIds:uniqBy(ids,join)});this.selectMissingJoinColumns(builder);}},{key:'onAfter2',value:function onAfter2(builder,related){var isOneToOne=this.relation.isOneToOne();if(this.assignResultToOwner){var owners=this.owners;var relatedByOwnerId=new Map();for(var i=0,l=related.length;i<l;++i){var rel=related[i];var key=this.relation.relatedProp.propKey(rel);var arr=relatedByOwnerId.get(key);if(!arr){arr=[];relatedByOwnerId.set(key,arr);}arr.push(rel);}for(var _i=0,_l=owners.length;_i<_l;++_i){var own=owners[_i];var _key=this.relation.ownerProp.propKey(own);var _related=relatedByOwnerId.get(_key);if(isOneToOne){own[this.relationProperty]=_related&&_related[0]||null;}else{own[this.relationProperty]=_related||[];}}}return related;}},{key:'onAfter3',value:function onAfter3(builder,related){var isOneToOne=this.relation.isOneToOne();var intOpt=builder.internalOptions();if(!intOpt.keepImplicitJoinProps){this.omitImplicitJoinProps(related);}if(!this.alwaysReturnArray&&isOneToOne&&related.length<=1){related=related[0]||undefined;}return _get(RelationFindOperation.prototype.__proto__||Object.getPrototypeOf(RelationFindOperation.prototype),'onAfter3',this).call(this,builder,related);}},{key:'selectMissingJoinColumns',value:function selectMissingJoinColumns(builder){var relatedProp=this.relation.relatedProp;var addedSelects=[];for(var c=0,lc=relatedProp.size;c<lc;++c){var fullCol=relatedProp.fullCol(builder,c);var prop=relatedProp.props[c];var col=relatedProp.cols[c];if(!builder.hasSelectionAs(fullCol,col)&&addedSelects.indexOf(fullCol)===-1){this.omitProps.push(prop);addedSelects.push(fullCol);}}if(addedSelects.length){builder.select(addedSelects);}}},{key:'omitImplicitJoinProps',value:function omitImplicitJoinProps(related){var relatedModelClass=this.relation.relatedModelClass;if(!this.omitProps.length||!related){return related;}if(!Array.isArray(related)){return this.omitImplicitJoinPropsFromOne(relatedModelClass,related);}if(!related.length){return related;}for(var i=0,l=related.length;i<l;++i){this.omitImplicitJoinPropsFromOne(relatedModelClass,related[i]);}return related;}},{key:'omitImplicitJoinPropsFromOne',value:function omitImplicitJoinPropsFromOne(relatedModelClass,model){for(var c=0,lc=this.omitProps.length;c<lc;++c){relatedModelClass.omitImpl(model,this.omitProps[c]);}return model;}}]);return RelationFindOperation;}(FindOperation);function join(arr){return arr.join();}module.exports=RelationFindOperation;