var isPromise=require('./isPromise');function after(obj,func){if(isPromise(obj)){return obj.then(func);}else{return func(obj);}}module.exports=after;