(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var cfx = module.exports = {};
if(typeof window !== 'undefined') window.cfx = cfx;

cfx.env = require('./env');
cfx.window = require('./window');
cfx.objects = require('./objects');
cfx.arrays = require('./arrays');
cfx.events = require('./events');
cfx.paths = require('./paths');
},{"./arrays":3,"./env":10,"./events":11,"./objects":12,"./paths":18,"./window":20}],2:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
var arrays = module.exports = {};

arrays.forEach = require('./arrays/forEach');
arrays.generate = require('./arrays/generate');
arrays.removeAt = require('./arrays/removeAt');
arrays.remove = require('./arrays/remove');
arrays.removeWhere = require('./arrays/removeWhere');
arrays.simultaneous = require('./arrays/simultaneous');
},{"./arrays/forEach":4,"./arrays/generate":5,"./arrays/remove":6,"./arrays/removeAt":7,"./arrays/removeWhere":8,"./arrays/simultaneous":9}],4:[function(require,module,exports){
// Modified from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// on 7/10/2014

/**
 * Apply the given function on each element in an array
 * @param array
 * @param callback called with (element, index, array)
 */
var forEach = function (array, callback) {

    var k;

    if (array == null) {
        throw new TypeError(" this is null or not defined");
    }

    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(array);

    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
        throw new TypeError(callback + " is not a function");
    }

    // 6. Let k be 0
    k = 0;

    // 7. Repeat, while k < len
    while (k < len) {

        var kValue;

        // a. Let Pk be ToString(k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then
        if (k in O) {

            // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
            kValue = O[k];

            // ii. Call the Call internal method of callback with T as the this value and
            // argument list containing kValue, k, and O.
            callback.call(array, kValue, k, O);
        }
        // d. Increase k by 1.
        k++;
    }
    // 8. return undefined
};

module.exports = forEach;
},{}],5:[function(require,module,exports){
var clone = require('../objects/clone');

/**
 * Generates a new array of given size. Each index is equal to the value given. If the value is a function, each index will be equal to the return value of the function.
 * If a function is given as the value, that function will be called with the current index being generated: <i>callback(i)</i>
 * @param count the size of the new array
 * @param value the value (or generator function) for each index
 * @returns {Array}
 */
function generate(count, value) {
    var results = [];

    for(var i = 0; i < count; i++) {
        var v;
        if(typeof value === 'function') {
            v = value(i);
        } else {
            v = clone(value);
        }
        results.push(v);
    }

    return results;
}

module.exports = generate;
},{"../objects/clone":13}],6:[function(require,module,exports){
/**
 * Splices the given index out of the array
 * @param array source array
 * @param element element to remove
 * @returns {Array} new array
 */
function remove(array, element) {
    var newArray = array.slice(0),
        index = newArray.indexOf(element);

    if(index > -1) {
        newArray.splice(index, 1);
    }

    return newArray;
}

module.exports = remove;
},{}],7:[function(require,module,exports){
/**
 * Splices the given index out of the array
 * @param array source array
 * @param index index to remove
 * @returns {Array} new array
 */
function removeAt(array, index) {
    var newArray = array.slice(0);

    newArray.splice(index, 1);

    return newArray;
}

module.exports = removeAt;
},{}],8:[function(require,module,exports){
/**
 * @callback removeCallback
 * @param {*} element - Element at the index
 * @param {number} index - Index of the element
 * @param {Array} source - The entire array being iterated upon
 * @return {boolean} keep - If true, remove the index, if false, keep it.
 */

/**
 * Removes all indexes that pass the callback from the array. Indexes will be removed if the callback returns exactly true
 * @param {Array} array source array
 * @param {removeCallback} callback callback called with (element, index, source)
 * @returns {Array} new array
 */
function removeWhere(array, callback) {
    var newArray = array.slice(0);

    newArray.forEach(function(item, i, arr) {
        var shouldRemove = callback(item, i, arr) === true;

        if(shouldRemove) {
            arr.splice(i, 1);
        }
    });

    return newArray;
}

module.exports = removeWhere;
},{}],9:[function(require,module,exports){
/**
 * @callback forEachCallback
 * @param {...*} elements - Elements at the index, for each array (first iteration: a[0], b[0]. Second: a[1], b[1], etc.)
 * @param {number} index - Index of the element
 */

/**
 * Loops over each index in all of the given arrays
 * @function forEach
 * @param {forEachCallback} callback - The callback to handle each iteration
 */

/**
 * @typedef simultaneousMethods
 * @type {Object}
 * @property {until} until - Tells the iterator when to stop looping over the arrays
 * @function {forEach} forEach - Function that will iterator over i, i+1, i+2, etc of each array
 */

/**
 * Returns a list of methods that, when called, will iterate over the given arrays simultaneously
 * @param {...Array} arrays - Takes any number of arrays to be iterated upon
 * @returns {simultaneousMethods}
 */
function simultaneous() {
    var arrays = Array.prototype.slice.call(arguments, 0),
        defaultSorting = 1;

    function args(i) {
        var args = [];
        for (var a = 0; a < arrays.length; a++) {
            args.push(arrays[a][i]);
        }
        return args;
    }

    function length(type) {
        var initial = arrays[0].length,
            longest = initial,
            shortest = initial;

        for (var a = 0; a < arrays.length; a++) {
            var len = arrays[a].length;
            if (len > longest) {
                longest = len
            }
            if (len < shortest) {
                shortest = len;
            }
        }

        return {
            '-1': shortest,
            0: initial,
            1: longest
        }[type || defaultSorting];
    }

    return {
        until: function (sorting) {
            defaultSorting = sorting == 'longest' ? 1
                : sorting == 'shortest' ? -1
                : sorting == 'initial' ? 0
                : 1;
            return this;
        },
        forEach: function (callback) {
            for (var i = 0, len = length(); i < len; i++) {
                callback.apply(null, args(i).concat(i));
            }
        }
    };
}

module.exports = simultaneous;
},{}],10:[function(require,module,exports){
(function (process){
var env = module.exports = {}
    , win = require('./window');

env.LOCAL = 'local';
env.DEV = 'dev';
env.ALPHA = 'alpha';
env.BETA = 'beta';
env.PROD = 'prod';

/**
 * Check whether or not code is running in a browser or in a Node process.
 * @returns {boolean}
 */
env.isBrowser = function() {
    return process.title == 'browser';
};

/**
 * Determines the current environment based on the window hostname.
 * @returns {String} the environment level
 */
env.determine = function() {
    if( env.isBrowser() ) {
        var domain = win.domain;

        return env.ENV = (domain.indexOf('my.') == 0
            || domain.indexOf('mysecure.') == 0
            || domain.indexOf('mysecured.') == 0
            || domain.indexOf('localhost') == 0 ? env.LOCAL
            : domain.indexOf('dev') == 0 ? env.DEV
            : domain.indexOf('alpha') == 0 ? env.ALPHA
            : domain.indexOf('beta') == 0 ? env.BETA
            : env.PROD);
    } else {
        return env.ENV = process.env.NODE_ENV;
    }
};

/**
 * The current environment level.
 * @type {String}
 */
env.ENV = env.determine();
}).call(this,require('_process'))
},{"./window":20,"_process":2}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
var objects = module.exports = {};

objects.contains = require('./objects/contains');
objects.clone = require('./objects/clone');
objects.extend = require('./objects/extend');
objects.toArray = require('./objects/toArray');
objects.forEach = require('./objects/forEach');
},{"./objects/clone":13,"./objects/contains":14,"./objects/extend":15,"./objects/forEach":16,"./objects/toArray":17}],13:[function(require,module,exports){
/**
 * Creates a copy of an object.
 * @param {Object} obj object to clone
 * @returns {Object}
 */
function clone(obj) {
    if(typeof obj === 'undefined' || obj === null) return obj;
    if(Array.isArray(obj)) return obj.slice(0);
    if(typeof obj !== 'object') return obj;
    var result = {};

    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            result[key] = clone(obj[key]);
        }
    }

    return result;
}

module.exports = clone;
},{}],14:[function(require,module,exports){
/**
 * Checks whether or not an object contains the given keys-value pairs.
 * @param sources source object
 * @param test test keys & values
 * @returns {boolean}
 */
function contains(sources, test) {
    var matches = true;

    for(var k in test) {
        if( !test.hasOwnProperty(k) ) continue;

        if( !sources.hasOwnProperty(k) ) {
            matches = false;
            continue;
        }

        if( typeof sources[k] !== typeof test[k] ) {
            matches = false;
            continue;
        }

        if( typeof test[k] === 'object' ) {
            matches = contains(sources[k], test[k]);
            continue;
        }

        if( sources[k] != test[k] ) {
            matches = false;
        }
    }

    return matches;
}

module.exports = contains;
},{}],15:[function(require,module,exports){
var clone = require('./clone');

/**
 * Extends object A with values from object B. Overrides values in object A.
 * @param {Object} a base object
 * @param {Object} b new values
 * @param {boolean} [modify=false] if true - mutates the original. If false - returns a clone
 * @returns {Object} Combined object
 */
function extend(a, b, modify) {
    a = modify === true ? a : clone(a);
    b = b || {};

    for(var k in b) {
        if(!b.hasOwnProperty(k)) continue;
        a[k] = b[k];
    }

    return a;
}

module.exports = extend;
},{"./clone":13}],16:[function(require,module,exports){
/**
 * @callback forEachCallback
 * @param {*} element - Value of the index
 * @param {String|number} key - Key of the index
 * @param {Object} source - The entire object being iterated upon
 */

/**
 * Apply the given function on each element in an array
 * @param {Object} obj object to iterate over
 * @param {forEachCallback} callback called with (element, key, source)
 */
var forEach = function (obj, callback) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            callback(obj[key], key, obj);
        }
    }
};

module.exports = forEach;
},{}],17:[function(require,module,exports){
/**
 * Adds each value in an object to an array
 * @param {Object} obj source object
 * @returns {Array}
 */
function toArray(obj) {
    var array = [];

    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            array.push(obj[key]);
    }

    return array;
}

module.exports = toArray;
},{}],18:[function(require,module,exports){
var paths = module.exports = {};

paths.join = require('./paths/join');
},{"./paths/join":19}],19:[function(require,module,exports){
/**
 * Joins any number of paths together, normalizing slashes (/ vs \), and removing duplicate slashes.
 * @param {String...} paths the paths to be joined
 * @returns {string} the final path
 */
var join = function(paths) {
    var paths = Array.prototype.slice.call(arguments, 0);

    return paths.join('/')
        .replace(/\\/g, '/')
        .replace(/(\/\/+)/g, '/');
};

module.exports = join;
},{}],20:[function(require,module,exports){
var win = module.exports = {};

/**
 * Alias for window.location.hostname
 * @type {string}
 */
win.domain = window.location.hostname;

/**
 * Alias for window.location.pathname
 * @type {string}
 */
win.path = window.location.pathname;

/**
 * Redirects the current window to the given URL
 * @param {String} url
 */
win.redirect = function(url) {
    window.location.href = url;
};

/**
 * Calculates the vertical scroll distance from the top of the window.
 * @returns {Number} distance in pixels
 */
win.scrollY = function() {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
};
},{}]},{},[1]);
