var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Dependency=require('./Dependency');var HasManyDependency=function(_Dependency){_inherits(HasManyDependency,_Dependency);function HasManyDependency(node,relation){_classCallCheck(this,HasManyDependency);var _this=_possibleConstructorReturn(this,(HasManyDependency.__proto__||Object.getPrototypeOf(HasManyDependency)).call(this,node));_this.relation=relation;return _this;}_createClass(HasManyDependency,[{key:'resolve',value:function resolve(model){var _relation=this.relation,ownerProp=_relation.ownerProp,relatedProp=_relation.relatedProp;for(var i=0,l=ownerProp.size;i<l;++i){relatedProp.setProp(this.node.model,i,ownerProp.getProp(model,i));}}}]);return HasManyDependency;}(Dependency);module.exports=HasManyDependency;