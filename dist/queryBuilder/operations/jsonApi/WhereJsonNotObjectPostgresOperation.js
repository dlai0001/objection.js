var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var jsonApi=require('./postgresJsonApi');var ObjectionToKnexConvertingOperation=require('../ObjectionToKnexConvertingOperation');var WhereJsonNotObjectPostgresOperation=function(_ObjectionToKnexConve){_inherits(WhereJsonNotObjectPostgresOperation,_ObjectionToKnexConve);function WhereJsonNotObjectPostgresOperation(){_classCallCheck(this,WhereJsonNotObjectPostgresOperation);return _possibleConstructorReturn(this,(WhereJsonNotObjectPostgresOperation.__proto__||Object.getPrototypeOf(WhereJsonNotObjectPostgresOperation)).apply(this,arguments));}_createClass(WhereJsonNotObjectPostgresOperation,[{key:'onBuildKnex',value:function onBuildKnex(knexBuilder,builder){this.whereJsonNotObject(knexBuilder,builder.knex(),this.args[0]);}},{key:'whereJsonNotObject',value:function whereJsonNotObject(knexBuilder,knex,fieldExpression){var _this2=this;var innerQuery=function innerQuery(_innerQuery){var builder=jsonApi.whereJsonbRefOnLeftJsonbValOrRefOnRight(_innerQuery,fieldExpression,'@>',_this2.opt.compareValue,'not');builder.orWhereRaw(jsonApi.whereJsonFieldQuery(knex,fieldExpression,'IS',null));};if(this.opt.bool==='or'){knexBuilder.orWhere(innerQuery);}else{knexBuilder.where(innerQuery);}}}]);return WhereJsonNotObjectPostgresOperation;}(ObjectionToKnexConvertingOperation);module.exports=WhereJsonNotObjectPostgresOperation;