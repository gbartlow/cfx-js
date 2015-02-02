var marked = require('marked'),
    fs = require('fs'),
    format = require('mb-strings'),
    renderer = new marked.Renderer();

var lastHeading = '';

renderer.heading = function (text, level) {
    var template = "<h{level} id='{anchor}'>{text}</h{level}>",
        anchor = text;

    if(level == 1) {
        lastHeading = text;
    }

    if(level == 2) {
        text = lastHeading + '.' + text;
        anchor = text;
        template = "<a class='anchor' name='{anchor}' href='#'></a>" + template;
        anchor = text.match(/[^\(]*/g)[0].trim();
        text = text.replace(/\(\((.*)\)\)/g, '($1)');
        text = text.substring(anchor.lastIndexOf('.')+1);
    }

    return format(template, {
        level: level + 1,
        text: text,
        anchor: anchor
    });
};

module.exports = function(content) {
    return marked(content, { renderer: renderer });
};