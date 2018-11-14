var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var _require=require('../../../utils/objectUtils'),isString=_require.isString;var ALIAS_REGEX=/\s+as\s+/i;var Selection=function(){function Selection(table,column,alias){_classCallCheck(this,Selection);this.table=table||null;this.column=column||null;this.alias=alias||null;}_createClass(Selection,[{key:'includes',value:function includes(that){var tablesMatch=that.table===this.table||this.table===null;var colsMatch=this.column===that.column||this.column==='*';return tablesMatch&&colsMatch;}},{key:'name',get:function get(){return this.alias||this.column;}}],[{key:'create',value:function create(selection){var table=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var dotIdx=void 0,column=void 0;var alias=null;if(!isString(selection)){return null;}if(ALIAS_REGEX.test(selection)){var parts=selection.split(ALIAS_REGEX);selection=parts[0].trim();alias=parts[1].trim();}dotIdx=selection.lastIndexOf('.');if(dotIdx!==-1){table=selection.substr(0,dotIdx);column=selection.substr(dotIdx+1);}else{column=selection;}return new this(table,column,alias);}},{key:'SelectAll',get:function get(){return SELECT_ALL;}}]);return Selection;}();var SELECT_ALL=new Selection(null,'*');module.exports=Selection;