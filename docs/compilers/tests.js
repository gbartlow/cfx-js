var fs = require('fs'),
    path = require('path'),
    walk = require('./walk'),
    format = require('mb-strings');

module.exports = function() {
    var template = fs.readFileSync('template_test.html', 'utf8');
    var testSrcPath = path.join(__dirname, '..', '..', 'test'),
        testFiles = walk(testSrcPath);

    testFiles.forEach(function(testFilePath, i) {
        var content = fs.readFileSync(testFilePath, 'utf8'),
            filename = 'cfx'+testFilePath.substring(testSrcPath.length).replace(/\/+|\\+/g, '.').replace('.test.js', '');

        content = format(template, {
            content: content,
            title: filename
        });

        if(!fs.existsSync('test')) {
            fs.mkdirSync('test');
        }
        fs.writeFileSync('test/'+filename+'.html', content, 'utf8');
    });
};