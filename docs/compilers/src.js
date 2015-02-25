var fs = require('fs'),
    path = require('path'),
    walk = require('./walk'),
    format = require('mb-strings');

module.exports = function() {
    var template = fs.readFileSync('template_src.html', 'utf8');
    var testSrcPath = path.join(__dirname, '..', '..', 'src'),
        testFiles = walk(testSrcPath);

    console.log('srcFiles', testSrcPath);

    testFiles.forEach(function(testFilePath, i) {
        var content = fs.readFileSync(testFilePath, 'utf8'),
            filename = 'cfx'+testFilePath.substring(testSrcPath.length).replace(/\/+|\\+/g, '.').replace('.js', '');

        content = format(template, {
            content: content,
            title: filename
        });

        if(!fs.existsSync('src')) {
            fs.mkdirSync('src');
        }
        fs.writeFileSync('src/'+filename+'.html', content, 'utf8');
    });
};