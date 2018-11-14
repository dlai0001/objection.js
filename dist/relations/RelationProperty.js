var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _require=require('../utils/objectUtils'),asArray=_require.asArray,isObject=_require.isObject,uniqBy=_require.uniqBy,get=_require.get,set=_require.set;var _require2=require('../queryBuilder/ReferenceBuilder'),createRef=_require2.ref;var _require3=require('../queryBuilder/RawBuilder'),createRaw=_require3.raw;var _require4=require('../model/modelValues'),propToStr=_require4.propToStr,PROP_KEY_PREFIX=_require4.PROP_KEY_PREFIX;var ModelNotFoundError=function(_Error){_inherits(ModelNotFoundError,_Error);function ModelNotFoundError(tableName){_classCallCheck(this,ModelNotFoundError);var _this=_possibleConstructorReturn(this,(ModelNotFoundError.__proto__||Object.getPrototypeOf(ModelNotFoundError)).call(this));_this.name=_this.constructor.name;_this.tableName=tableName;return _this;}return ModelNotFoundError;}(Error);var InvalidReferenceError=function(_Error2){_inherits(InvalidReferenceError,_Error2);function InvalidReferenceError(){_classCallCheck(this,InvalidReferenceError);var _this2=_possibleConstructorReturn(this,(InvalidReferenceError.__proto__||Object.getPrototypeOf(InvalidReferenceError)).call(this));_this2.name=_this2.constructor.name;return _this2;}return InvalidReferenceError;}(Error);var RelationProperty=function(){function RelationProperty(references,modelClassResolver){_classCallCheck(this,RelationProperty);var refs=createRefs(asArray(references));var paths=createPaths(refs,modelClassResolver);var modelClass=resolveModelClass(paths);this._refs=refs;this._modelClass=modelClass;this._props=paths.map(function(it){return it.path[0];});this._cols=refs.map(function(it){return it.column;});this._propGetters=paths.map(function(it){return createGetter(it.path);});this._propSetters=paths.map(function(it){return createSetter(it.path);});}_createClass(RelationProperty,[{key:'propKey',value:function propKey(obj){var size=this.size;var key=PROP_KEY_PREFIX;for(var i=0;i<size;++i){key+=propToStr(this.getProp(obj,i));if(i!==size-1){key+=',';}}return key;}},{key:'getProps',value:function getProps(obj){var size=this.size;var props=new Array(size);for(var i=0;i<size;++i){props[i]=this.getProp(obj,i);}return props;}},{key:'getProp',value:function getProp(obj,index){return this._propGetters[index](obj);}},{key:'setProp',value:function setProp(obj,index,value){return this._propSetters[index](obj,value);}},{key:'fullCol',value:function fullCol(builder,index){var table=builder.tableRefFor(this.modelClass.getTableName());return table+'.'+this.cols[index];}},{key:'ref',value:function ref(builder,index){var table=builder.tableRefFor(this.modelClass.getTableName());return this._refs[index].clone().table(table);}},{key:'refs',value:function refs(builder){var refs=new Array(this.size);for(var i=0,l=refs.length;i<l;++i){refs[i]=this.ref(builder,i);}return refs;}},{key:'patch',value:function patch(_patch,index,value){var ref=this._refs[index];if(ref.isPlainColumnRef){_patch[this._cols[index]]=value;}else{_patch[ref.expression]=value;}}},{key:'propDescription',value:function propDescription(index){return this._refs[index].expression;}},{key:'size',get:function get(){return this._refs.length;}},{key:'modelClass',get:function get(){return this._modelClass;}},{key:'props',get:function get(){return this._props;}},{key:'cols',get:function get(){return this._cols;}}],[{key:'ModelNotFoundError',get:function get(){return ModelNotFoundError;}},{key:'InvalidReferenceError',get:function get(){return InvalidReferenceError;}}]);return RelationProperty;}();function createRefs(refs){try{return refs.map(function(it){if(!isObject(it)||!it.isObjectionReferenceBuilder){return createRef(it);}else{return it;}});}catch(err){throw new InvalidReferenceError();}}function createPaths(refs,modelClassResolver){return refs.map(function(ref){if(!ref.tableName){throw new InvalidReferenceError();}var modelClass=modelClassResolver(ref.tableName);if(!modelClass){throw new ModelNotFoundError(ref.tableName);}var prop=modelClass.columnNameToPropertyName(ref.column);var jsonPath=ref.reference.access.map(function(it){return it.ref;});return{path:[prop].concat(jsonPath),modelClass:modelClass};});}function resolveModelClass(paths){var modelClasses=paths.map(function(it){return it.modelClass;});var uniqueModelClasses=uniqBy(modelClasses);if(uniqueModelClasses.length!==1){throw new InvalidReferenceError();}return modelClasses[0];}function createGetter(path){if(path.length===1){var prop=path[0];return function(obj){return obj[prop];};}else{return function(obj){return get(obj,path);};}}function createSetter(path){if(path.length===1){var prop=path[0];return function(obj,value){return obj[prop]=value;};}else{return function(obj,value){return set(obj,path,value);};}}module.exports=RelationProperty;