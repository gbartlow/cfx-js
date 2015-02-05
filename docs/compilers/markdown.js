var fs = require('fs'),
    path = require('path'),
    compileArticle = require('./article'),
    asideCompiler = require('./aside');

module.exports = function() {
    var markdownFiles = ['intro.md']
        .concat(
            fs.readdirSync( path.join(__dirname, '..', 'markdown') ).map(function(f){
                return path.join('markdown', f);
            })
        ).map(function(filename) {
            return fs.readFileSync(filename, 'UTF-8');
        });

    var articleHtml = markdownFiles
        .map(function(md) {
            return compileArticle(md);
        }).reduce(function(html, fileHtml) {
            return html + fileHtml;
        }, '');

    markdownFiles.forEach(asideCompiler.feed);
    var asideHtml = asideCompiler.render();

    return {
        article: articleHtml,
        aside: asideHtml
    }
};