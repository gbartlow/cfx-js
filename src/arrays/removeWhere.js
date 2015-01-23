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