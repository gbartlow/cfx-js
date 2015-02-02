var marked = require('marked'),
    fs = require('fs'),
    format = require('mb-strings'),
    renderer = new marked.Renderer();

var tree = {},
    lastHeading;

renderer.heading = function (text, level) {
    if(level == 1 && text != 'cfx') {
        tree[text] = {};
        lastHeading = text;
    }
    
    if(level == 2 && lastHeading) {
        var anchor = text.match(/[^\(]*/g)[0].trim(),
            heading = text.substring(anchor.lastIndexOf('.')+1),
            comments = heading.match(/\(\(.*\)\)/g);
        
        if(comments) {
            heading = heading.replace(/\(\(.*\)\)/g, '');
        }
        
        heading = heading.replace(/\(.*\)/g, '()');

        tree[lastHeading][anchor] = heading.trim();
    }
};

function render(tree) {
    var html = '';
    
    for(var h1 in tree) {
        html += format("<label>{text}</label>", { text: h1 });
        
        var h2s = tree[h1];
        for(var h2 in h2s) {
            var anchor = '#' + h1 + '.' + h2,
                heading = h2s[h2];
            html += format("<a href='{anchor}'>{heading}</a>", { anchor: anchor, heading: heading });
        }
    }

    return html;
}

module.exports = {
    feed: function(content) {
        marked(content, { renderer: renderer });
        lastHeading = null;
    },
    render: function(_tree) {
        var html = render(_tree || tree);
        tree = {};
        return html;
    }
};