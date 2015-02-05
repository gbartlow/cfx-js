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