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