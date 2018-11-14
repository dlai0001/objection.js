var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _require=require('../utils/objectUtils'),asArray=_require.asArray,isString=_require.isString;var Type={ModelValidation:'ModelValidation',RelationExpression:'RelationExpression',UnallowedRelation:'UnallowedRelation',InvalidGraph:'InvalidGraph'};var ValidationError=function(_Error){_inherits(ValidationError,_Error);_createClass(ValidationError,null,[{key:'Type',get:function get(){return Type;}}]);function ValidationError(_ref){var type=_ref.type,message=_ref.message,_ref$data=_ref.data,data=_ref$data===undefined?{}:_ref$data,_ref$statusCode=_ref.statusCode,statusCode=_ref$statusCode===undefined?400:_ref$statusCode;_classCallCheck(this,ValidationError);var _this=_possibleConstructorReturn(this,(ValidationError.__proto__||Object.getPrototypeOf(ValidationError)).call(this,message||errorsToMessage(data)));_this.name=_this.constructor.name;_this.type=type;_this.data=data;_this.statusCode=statusCode;return _this;}return ValidationError;}(Error);function errorsToMessage(data){return Object.keys(data).reduce(function(messages,key){messages.push(key+': '+asArray(data[key]).map(message).join(', '));return messages;},[]).join(', ');}function message(it){if(isString(it)){return it;}else{return it.message;}}module.exports=ValidationError;