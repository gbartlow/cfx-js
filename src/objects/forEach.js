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