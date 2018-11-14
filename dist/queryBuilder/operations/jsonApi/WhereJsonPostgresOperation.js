var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var jsonApi=require('./postgresJsonApi');var ObjectionToKnexConvertingOperation=require('../ObjectionToKnexConvertingOperation');var WhereJsonPostgresOperation=function(_ObjectionToKnexConve){_inherits(WhereJsonPostgresOperation,_ObjectionToKnexConve);function WhereJsonPostgresOperation(){_classCallCheck(this,WhereJsonPostgresOperation);return _possibleConstructorReturn(this,(WhereJsonPostgresOperation.__proto__||Object.getPrototypeOf(WhereJsonPostgresOperation)).apply(this,arguments));}_createClass(WhereJsonPostgresOperation,[{key:'onBuildKnex',value:function onBuildKnex(knexBuilder){var rawArgs=jsonApi.whereJsonbRefOnLeftJsonbValOrRefOnRightRawQueryParams(this.args[0],this.opt.operator,this.args[1],this.opt.prefix);if(this.opt.bool==='or'){knexBuilder.orWhereRaw.apply(knexBuilder,rawArgs);}else{knexBuilder.whereRaw.apply(knexBuilder,rawArgs);}}}]);return WhereJsonPostgresOperation;}(ObjectionToKnexConvertingOperation);module.exports=WhereJsonPostgresOperation;