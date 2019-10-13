function optional(obj, evalFunc, def) {

    // Our proxy handler
    const handler = {
      // Intercept all property access
      get: function(target, prop, receiver) {
        const res = Reflect.get(...arguments);
  
        // If our response is an object then wrap it in a proxy else just return
        return typeof res === "object" ? proxify(res) : res != null ? res : def;
      }
    };
  
    const proxify = target => {
      return new Proxy(target, handler);
    };
  
    // Call function with our proxified object
    return evalFunc(proxify(obj, handler));
}

function promiseLog(promise, p1, p2) {
    return new Promise((res, res) => {
        promise.then(() => {
            console.log(p1)
            res(p1)
        }).catch(() => {
            console.log(p2)
            res(p2)
        })
    })
}

module.exports = {
    safe: function(obj, evalFunc, def) {
        return optional(obj, evalFunc, def)
    },
    promise: function(promise, p1, p2) {
        return promiseLog(promise, p1, p2)
    }
}