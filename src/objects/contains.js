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