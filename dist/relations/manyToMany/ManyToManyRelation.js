var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _get=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if("value"in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var getModel=function getModel(){return require('../../model/Model');};var Relation=require('../Relation');var RelationProperty=require('../RelationProperty');var _require=require('../../queryBuilder/ReferenceBuilder'),ref=_require.ref;var _require2=require('../../utils/knexUtils'),isSqlite=_require2.isSqlite,isMySql=_require2.isMySql;var _require3=require('../../model/inheritModel'),inheritModel=_require3.inheritModel;var _require4=require('../../utils/resolveModel'),resolveModel=_require4.resolveModel;var _require5=require('../../utils/promiseUtils'),mapAfterAllReturn=_require5.mapAfterAllReturn;var _require6=require('../../utils/objectUtils'),isFunction=_require6.isFunction,isObject=_require6.isObject;var ManyToManyFindOperation=require('./find/ManyToManyFindOperation');var ManyToManyInsertOperation=require('./insert/ManyToManyInsertOperation');var ManyToManyRelateOperation=require('./relate/ManyToManyRelateOperation');var ManyToManyUnrelateOperation=require('./unrelate/ManyToManyUnrelateOperation');var ManyToManyUnrelateMySqlOperation=require('./unrelate/ManyToManyUnrelateMySqlOperation');var ManyToManyUnrelateSqliteOperation=require('./unrelate/ManyToManyUnrelateSqliteOperation');var ManyToManyUpdateOperation=require('./update/ManyToManyUpdateOperation');var ManyToManyUpdateMySqlOperation=require('./update/ManyToManyUpdateMySqlOperation');var ManyToManyUpdateSqliteOperation=require('./update/ManyToManyUpdateSqliteOperation');var ManyToManyDeleteOperation=require('./delete/ManyToManyDeleteOperation');var ManyToManyDeleteMySqlOperation=require('./delete/ManyToManyDeleteMySqlOperation');var ManyToManyDeleteSqliteOperation=require('./delete/ManyToManyDeleteSqliteOperation');var ManyToManyRelation=function(_Relation){_inherits(ManyToManyRelation,_Relation);function ManyToManyRelation(){_classCallCheck(this,ManyToManyRelation);return _possibleConstructorReturn(this,(ManyToManyRelation.__proto__||Object.getPrototypeOf(ManyToManyRelation)).apply(this,arguments));}_createClass(ManyToManyRelation,[{key:'setMapping',value:function setMapping(mapping){var _this2=this;var retVal=_get(ManyToManyRelation.prototype.__proto__||Object.getPrototypeOf(ManyToManyRelation.prototype),'setMapping',this).call(this,mapping);var ctx={mapping:mapping,ownerModelClass:this.ownerModelClass,relatedModelClass:this.relatedModelClass,ownerProp:this.ownerProp,relatedProp:this.relatedProp,joinTableModelClass:null,joinTableOwnerProp:null,joinTableRelatedProp:null,joinTableBeforeInsert:null,joinTableExtras:[],createError:function createError(msg){return _this2.createError(msg);}};ctx=checkThroughObject(ctx);ctx=resolveJoinModelClassIfDefined(ctx);ctx=createJoinProperties(ctx);ctx=parseExtras(ctx);ctx=parseBeforeInsert(ctx);ctx=finalizeJoinModelClass(ctx);this.joinTableExtras=ctx.joinTableExtras;this.joinTableModelClass=ctx.joinTableModelClass;this.joinTableOwnerProp=ctx.joinTableOwnerProp;this.joinTableRelatedProp=ctx.joinTableRelatedProp;this.joinTableBeforeInsert=ctx.joinTableBeforeInsert;return retVal;}},{key:'findQuery',value:function findQuery(builder,opt){var _this3=this;var joinTableOwnerRefs=this.joinTableOwnerProp.refs(builder);var joinTable=builder.tableNameFor(this.joinTable);var joinTableAlias=builder.tableRefFor(this.joinTable);builder.join(aliasedTableName(joinTable,joinTableAlias),function(join){for(var i=0,l=_this3.relatedProp.size;i<l;++i){var relatedRef=_this3.relatedProp.ref(builder,i);var joinTableRelatedRef=_this3.joinTableRelatedProp.ref(builder,i);join.on(relatedRef,joinTableRelatedRef);}});if(opt.isColumnRef){for(var i=0,l=joinTableOwnerRefs.length;i<l;++i){builder.where(joinTableOwnerRefs[i],ref(opt.ownerIds[i]));}}else if(containsNonNull(opt.ownerIds)){builder.whereInComposite(joinTableOwnerRefs,opt.ownerIds);}else{builder.resolve([]);}return builder.modify(this.modify);}},{key:'join',value:function join(builder){var _this4=this;var _ref=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{},_ref$joinOperation=_ref.joinOperation,joinOperation=_ref$joinOperation===undefined?defaultJoinOperation(this,builder):_ref$joinOperation,_ref$relatedTableAlia=_ref.relatedTableAlias,relatedTableAlias=_ref$relatedTableAlia===undefined?defaultRelatedTablealias(this,builder):_ref$relatedTableAlia,_ref$relatedJoinSelec=_ref.relatedJoinSelectQuery,relatedJoinSelectQuery=_ref$relatedJoinSelec===undefined?defaultRelatedJoinSelectQuery(this,builder):_ref$relatedJoinSelec,_ref$relatedTable=_ref.relatedTable,relatedTable=_ref$relatedTable===undefined?defaultRelatedTable(this,builder):_ref$relatedTable,_ref$ownerTable=_ref.ownerTable,ownerTable=_ref$ownerTable===undefined?defaultOwnerTable(this,builder):_ref$ownerTable,_ref$joinTableAlias=_ref.joinTableAlias,joinTableAlias=_ref$joinTableAlias===undefined?defaultJoinTableAlias(this,relatedTableAlias,builder):_ref$joinTableAlias;var relatedJoinSelect=relatedJoinSelectQuery.modify(this.modify).as(relatedTableAlias);if(relatedJoinSelect.isSelectAll()){relatedJoinSelect=aliasedTableName(relatedTable,relatedTableAlias);}return builder[joinOperation](aliasedTableName(this.joinTable,joinTableAlias),function(join){var ownerProp=_this4.ownerProp;var joinTableOwnerProp=_this4.joinTableOwnerProp;for(var i=0,l=ownerProp.size;i<l;++i){var joinTableOwnerRef=joinTableOwnerProp.ref(builder,i).table(joinTableAlias);var ownerRef=ownerProp.ref(builder,i).table(ownerTable);join.on(joinTableOwnerRef,ownerRef);}})[joinOperation](relatedJoinSelect,function(join){var relatedProp=_this4.relatedProp;var joinTableRelatedProp=_this4.joinTableRelatedProp;for(var i=0,l=relatedProp.size;i<l;++i){var joinTableRelatedRef=joinTableRelatedProp.ref(builder,i).table(joinTableAlias);var relatedRef=relatedProp.ref(builder,i).table(relatedTableAlias);join.on(joinTableRelatedRef,relatedRef);}});}},{key:'find',value:function find(builder,owners){return new ManyToManyFindOperation('find',{relation:this,owners:owners});}},{key:'insert',value:function insert(builder,owner){return new ManyToManyInsertOperation('insert',{relation:this,owner:owner});}},{key:'update',value:function update(builder,owner){if(isSqlite(builder.knex())){return new ManyToManyUpdateSqliteOperation('update',{relation:this,owner:owner});}else if(isMySql(builder.knex())){return new ManyToManyUpdateMySqlOperation('update',{relation:this,owner:owner});}else{return new ManyToManyUpdateOperation('update',{relation:this,owner:owner});}}},{key:'patch',value:function patch(builder,owner){if(isSqlite(builder.knex())){return new ManyToManyUpdateSqliteOperation('patch',{modelOptions:{patch:true},relation:this,owner:owner});}else if(isMySql(builder.knex())){return new ManyToManyUpdateMySqlOperation('patch',{modelOptions:{patch:true},relation:this,owner:owner});}else{return new ManyToManyUpdateOperation('patch',{modelOptions:{patch:true},relation:this,owner:owner});}}},{key:'delete',value:function _delete(builder,owner){if(isSqlite(builder.knex())){return new ManyToManyDeleteSqliteOperation('delete',{relation:this,owner:owner});}else if(isMySql(builder.knex())){return new ManyToManyDeleteMySqlOperation('delete',{relation:this,owner:owner});}else{return new ManyToManyDeleteOperation('delete',{relation:this,owner:owner});}}},{key:'relate',value:function relate(builder,owner){return new ManyToManyRelateOperation('relate',{relation:this,owner:owner});}},{key:'unrelate',value:function unrelate(builder,owner){if(isSqlite(builder.knex())){return new ManyToManyUnrelateSqliteOperation('unrelate',{relation:this,owner:owner});}else if(isMySql(builder.knex())){return new ManyToManyUnrelateMySqlOperation('unrelate',{relation:this,owner:owner});}else{return new ManyToManyUnrelateOperation('unrelate',{relation:this,owner:owner});}}},{key:'createJoinModels',value:function createJoinModels(ownerId,related){var joinModels=new Array(related.length);for(var i=0,lr=related.length;i<lr;++i){var rel=related[i];var joinModel={};for(var j=0,lp=this.joinTableOwnerProp.size;j<lp;++j){this.joinTableOwnerProp.setProp(joinModel,j,ownerId[j]);}for(var _j=0,_lp=this.joinTableRelatedProp.size;_j<_lp;++_j){this.joinTableRelatedProp.setProp(joinModel,_j,this.relatedProp.getProp(rel,_j));}for(var _j2=0,_lp2=this.joinTableExtras.length;_j2<_lp2;++_j2){var extra=this.joinTableExtras[_j2];var extraValue=rel[extra.aliasProp];if(extraValue!==undefined){joinModel[extra.joinTableProp]=extraValue;}}joinModels[i]=joinModel;}return joinModels;}},{key:'omitExtraProps',value:function omitExtraProps(models){if(this.joinTableExtras&&this.joinTableExtras.length){var props=this.joinTableExtras.map(function(extra){return extra.aliasProp;});for(var i=0,l=models.length;i<l;++i){var queryProps=models[i].$$queryProps;models[i].$omitFromDatabaseJson(props);if(queryProps){for(var j=0;j<props.length;++j){var prop=props[j];if(prop in queryProps){delete queryProps[prop];}}}}}}},{key:'executeJoinTableBeforeInsert',value:function executeJoinTableBeforeInsert(models,queryContext,result){var _this5=this;return mapAfterAllReturn(models,function(model){return _this5.joinTableBeforeInsert(model,queryContext);},result);}},{key:'forbiddenMappingProperties',get:function get(){return[];}}]);return ManyToManyRelation;}(Relation);function defaultJoinOperation(){return'join';}function defaultRelatedTablealias(relation,builder){return builder.tableRefFor(relation.relatedModelClass.getTableName());}function defaultRelatedJoinSelectQuery(relation,builder){return relation.relatedModelClass.query().childQueryOf(builder);}function defaultRelatedTable(relation,builder){return builder.tableNameFor(relation.relatedModelClass.getTableName());}function defaultOwnerTable(relation,builder){return builder.tableRefFor(relation.ownerModelClass.getTableName());}function defaultJoinTableAlias(relation,relatedTableAlias,builder){var alias=builder.tableRefFor(relation.joinTable);if(alias===relation.joinTable){return relation.ownerModelClass.joinTableAlias(relatedTableAlias);}else{return alias;}}function aliasedTableName(tableName,alias){if(tableName===alias){return tableName;}else{return tableName+' as '+alias;}}function checkThroughObject(ctx){var mapping=ctx.mapping;if(!isObject(mapping.join.through)){throw ctx.createError('join must have a `through` object that describes the join table.');}if(!mapping.join.through.from||!mapping.join.through.to){throw ctx.createError('join.through must be an object that describes the join table. For example: {from: "JoinTable.someId", to: "JoinTable.someOtherId"}');}return ctx;}function resolveJoinModelClassIfDefined(ctx){var joinTableModelClass=null;if(ctx.mapping.join.through.modelClass){try{joinTableModelClass=resolveModel(ctx.mapping.join.through.modelClass,ctx.ownerModelClass.modelPaths,'join.through.modelClass');}catch(err){throw ctx.createError(err.message);}}return _extends(ctx,{joinTableModelClass:joinTableModelClass});}function createJoinProperties(ctx){var ret=void 0;var fromProp=void 0;var toProp=void 0;var relatedProp=void 0;var ownerProp=void 0;ret=createRelationProperty(ctx,ctx.mapping.join.through.from,'join.through.from');fromProp=ret.prop;ctx=ret.ctx;ret=createRelationProperty(ctx,ctx.mapping.join.through.to,'join.through.to');toProp=ret.prop;ctx=ret.ctx;if(fromProp.modelClass.getTableName()!==toProp.modelClass.getTableName()){throw ctx.createError('join.through `from` and `to` must point to the same join table.');}if(ctx.relatedProp.modelClass.getTableName()===fromProp.modelClass.getTableName()){relatedProp=fromProp;ownerProp=toProp;}else{relatedProp=toProp;ownerProp=fromProp;}return _extends(ctx,{joinTableOwnerProp:ownerProp,joinTableRelatedProp:relatedProp});}function createRelationProperty(ctx,refString,messagePrefix){var prop=null;var joinTableModelClass=ctx.joinTableModelClass;var resolveModelClass=function resolveModelClass(table){if(joinTableModelClass===null){joinTableModelClass=inheritModel(getModel());joinTableModelClass.tableName=table;joinTableModelClass.idColumn=null;joinTableModelClass.concurrency=ctx.ownerModelClass.concurrency;}if(joinTableModelClass.getTableName()===table){return joinTableModelClass;}else{return null;}};try{prop=new RelationProperty(refString,resolveModelClass);}catch(err){if(err instanceof RelationProperty.ModelNotFoundError){throw ctx.createError('join.through `from` and `to` must point to the same join table.');}else{throw ctx.createError(messagePrefix+' must have format JoinTable.columnName. For example "JoinTable.someId" or in case of composite key ["JoinTable.a", "JoinTable.b"].');}}return{ctx:_extends(ctx,{joinTableModelClass:joinTableModelClass}),prop:prop};}function parseExtras(ctx){var extraDef=ctx.mapping.join.through.extra;if(!extraDef){return ctx;}if(Array.isArray(extraDef)){extraDef=extraDef.reduce(function(extraDef,col){extraDef[col]=col;return extraDef;},{});}var joinTableExtras=Object.keys(extraDef).map(function(key){var val=extraDef[key];return{joinTableCol:val,joinTableProp:ctx.joinTableModelClass.columnNameToPropertyName(val),aliasCol:key,aliasProp:ctx.joinTableModelClass.columnNameToPropertyName(key)};});return _extends(ctx,{joinTableExtras:joinTableExtras});}function parseBeforeInsert(ctx){var joinTableBeforeInsert=void 0;if(isFunction(ctx.mapping.join.through.beforeInsert)){joinTableBeforeInsert=ctx.mapping.join.through.beforeInsert;}else{joinTableBeforeInsert=function joinTableBeforeInsert(model){return model;};}return _extends(ctx,{joinTableBeforeInsert:joinTableBeforeInsert});}function finalizeJoinModelClass(ctx){if(ctx.joinTableModelClass.getIdColumn()===null){ctx.joinTableModelClass.idColumn=ctx.joinTableRelatedProp.cols;}return ctx;}function containsNonNull(arr){for(var i=0,l=arr.length;i<l;++i){var val=arr[i];if(Array.isArray(val)&&containsNonNull(val)){return true;}else if(val!==null&&val!==undefined){return true;}}return false;}module.exports=ManyToManyRelation;