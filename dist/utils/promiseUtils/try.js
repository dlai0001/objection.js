var isPromise=require('./isPromise');function promiseTry(callback){try{var maybePromise=callback();if(isPromise(maybePromise)){return maybePromise;}else{return Promise.resolve(maybePromise);}}catch(err){return Promise.reject(err);}}module.exports=promiseTry;