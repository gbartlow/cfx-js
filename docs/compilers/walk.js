var fs = require('fs'),
    path = require('path');

module.exports = function walk(dir) {
    var paths = fs.readdirSync(dir)
        .map(function(pathString) {
            return path.join(dir, pathString);
        });

    var dirs = paths
        .filter(function(pathString) {
            return fs.lstatSync(pathString).isDirectory()
        })
        .map(function(pathString) {
            return walk(pathString);
        })
        .reduce(function(array, files) {
            return array.concat(files);
        }, []);

    var files = paths.filter(function(pathString) {
        return !fs.lstatSync(pathString).isDirectory()
    });

    return files.concat(dirs);
};