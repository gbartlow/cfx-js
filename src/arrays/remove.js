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