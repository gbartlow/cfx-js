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