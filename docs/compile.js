var fs = require('fs'),
    path = require('path');

function walk(dir) {
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
}

function htmlreplace(body, trigger, replacement) {
    return body.replace(new RegExp("<!-- *build:"+trigger+" *-->(.*)<!-- *endbuild *-->", 'g'), replacement)
}

module.exports = {
    tests: function(dir) {
        var template = fs.readFileSync('template_test.html', 'utf8');
        var testSrcPath = path.join(__dirname, '..', 'test'),
        testFiles = walk(testSrcPath);

        testFiles.forEach(function(testFilePath, i) {
            if(i > 0) return;
            var content = fs.readFileSync(testFilePath, 'utf8'),
                filename = path.basename(testFilePath);

            console.log('pre', content);
            content = htmlreplace(template, 'content', content);
            console.log('post', content);
            content = htmlreplace(content, 'title', filename + ' | cfx-js | CARFAX');
            content = htmlreplace(content, 'h1', filename + ' | cfx-js | CARFAX');

            fs.writeFileSync('test/'+filename+'.html', content, 'utf8');
        });
    }
};