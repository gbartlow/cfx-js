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