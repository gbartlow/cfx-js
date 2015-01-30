var marked = require('marked'),
    fs = require('fs'),
    format = require('mb-strings'),
    renderer = new marked.Renderer();

renderer.heading = function (text, level) {
//    var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

    if(level == 2) {
        return format("<a class='anchor' name='{text}' href='#'></a>", {
            text: text
        });
    }
    
    return format("<h{level} id='{text}'>{text}</h{level}>", {
        level: level == 1 ? level + 1 : level,
        text: text
    });
};

var content = fs.readFileSync('docs.md', 'UTF-8');

var html = marked(content, { renderer: renderer });

fs.writeFileSync('docs.html', html, 'UTF-8');