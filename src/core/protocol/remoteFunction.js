
dop.core.remoteFunction = function $DOP_REMOTE_function(object, property) {

    return function $DOP_REMOTE_FUNCTION() {

        // return that.call(path, Array.prototype.slice.call(arguments));
        console.log(dop.getObjectDop(object), property, Array.prototype.slice.call(arguments,0));

    };

    // // http://jsperf.com/dynamic-name-of-functions
    // return new function(
    //     "return function " + dop.core.remoteFunction.name + "() {  return that.call(path, arguments); }"
    //)();

};