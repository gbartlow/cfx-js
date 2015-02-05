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