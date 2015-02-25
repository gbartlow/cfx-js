/**
 * Formats a string by replacing ${#} with it's numerically corresponding argument.
 * eg: <i>formatString("Hello ${0}! Good to see ${1}", 'World', 'you!')</i> returns <i>"Hello World! Good to see you!"</i>
 * @param {string} subject The source string to perform the format on
 * @returns {string} the formatted string
 */
function replace(subject) {
    var args = Array.prototype.slice.call(arguments, 1),
        pattern = this.pattern || replace.pattern,
        map;

    // If first and only arg is an object, assume this object is to be used to format the string, using a key-value relationship
    if(typeof args[0] === 'object') {
        map = args[0];
        return subject.replace(pattern, function(match, key) {
            if( typeof map[key] == 'undefined' ) return match;
            return map[key];
        });
    }

    map = (subject.match(pattern) || [])        // get list of keys
        .filter(function(item, pos, self) {     // remove duplicates
            return self.indexOf(item) == pos;
        })
        .reduce(function(map, key, i) {         // turn into map of { key: value }
            map[key] = args[i];
            return map;
        }, {});

    return subject.replace(pattern, function(match) {
        if( typeof map[match] == 'undefined' ) return match;
        return map[match];
    });
}

/**
 * Pattern used by replace to find keys in a string
 * @type {RegExp}
 */
replace.pattern = /\${(.+?)}/g;

/**
 * Replaces the pattern that replace uses to find keys. The given strings will be placed into a RegExp, so escape accordingly.
 * @param left {string} left marker ('\\${' in ${TOKEN})
 * @param right {string} right marker ('}' in ${TOKEN})
 */
replace.format = function(left, right) {
    var pattern = new RegExp(left+"(.+?)"+right, 'g');
    return replace.bind({ pattern: pattern });
};

module.exports = replace;