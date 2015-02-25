var marked = require('marked'),
    fs = require('fs'),
    path = require('path'),
    format = require('mb-strings'),
    renderer = new marked.Renderer();

function hasTestFile(anchor) {
    var testPath = anchor + '.html';
    return fs.existsSync( path.join(__dirname, '..', 'test', testPath) );
}
function hasSrcFile(anchor) {
    var testPath = anchor + '.html';
    return fs.existsSync( path.join(__dirname, '..', 'src', testPath) );
}

var lastHeading = '';

renderer.heading = function (text, level) {
    var template = "<h{level} id='{anchor}'>{text}</h{level}>",
        anchor = text;

    if(level == 1) {
        lastHeading = text;
    }

    if(level == 2) {
        text = lastHeading + '.' + text;
        template = "<a class='anchor' name='{anchor}' href='#'></a>" + template;
        anchor = text.match(/[^\(]*/g)[0].trim();
        text = text.replace(/\(\((.*)\)\)/g, '($1)');
        text = text.substring(anchor.lastIndexOf('.')+1);
    }

    if(hasTestFile(anchor)) {
        console.log('has test', anchor);
        template = "<a class='btn test' target='_blank' href='docs/test/{anchor}.html'>Tests</a>" + template;
    }
    if(hasSrcFile(anchor)) {
        template = "<a class='btn src' target='_blank' href='docs/src/{anchor}.html'>Source</a>" + template;
    }

    return format(template, {
        level: level + 1,
        text: text,
        anchor: anchor
    });
};

renderer.code = function (code, language) {
    code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return format("<pre><code class='{language}'>{code}</code></pre>", { code: code, language: language || 'javascript' });
};

module.exports = function(content) {
    return marked(content, { renderer: renderer });
};