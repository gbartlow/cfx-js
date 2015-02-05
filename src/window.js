var win = module.exports = {};

/**
 * Alias for window.location.hostname
 * @type {string}
 */
win.domain = window.location.hostname;

/**
 * Alias for window.location.pathname
 * @type {string}
 */
win.path = window.location.pathname;

/**
 * Redirects the current window to the given URL
 * @param {String} url
 */
win.redirect = function(url) {
    window.location.href = url;
};

/**
 * Calculates the vertical scroll distance from the top of the window.
 * @returns {Number} distance in pixels
 */
win.scrollY = function() {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
};