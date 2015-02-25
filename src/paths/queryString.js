/**
 * Constructs a query string from an object of key-value pairs
 * @param {Object} values key-value pairs to fill the string with
 * @returns {string} a query string
 */
var queryString = function(values) {
    var string;

    for(var key in values) {
        if(!values.hasOwnProperty(key)) continue;
        var value = values[key];

        if(!string) {
            string = '?' + key + '=' + value;
        } else {
            string += '&' + key + '=' + value;
        }
    }

    return string;
};

module.exports = queryString;