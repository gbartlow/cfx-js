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