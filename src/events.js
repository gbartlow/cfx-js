var events = module.exports = {};

var eventList = {};

/**
 * Stores a listener with the given name
 * @param name
 * @param fn callback
 */
events.on = function(name, fn) {
    if( !eventList[name] ) {
        eventList[name] = [];
    }
    eventList[name].push(fn);
};

/**
 * Call all listeners of the given name, with any extra values
 * @param name the name of the listener
 */
events.broadcast = function(name) {
    var args = Array.prototype.slice.call(arguments, 1);

    if( eventList[name] ) {
        eventList[name].forEach(function(fn) {
            fn.apply(null, args);
        });
    }
};