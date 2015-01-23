var env = module.exports = {}
    , win = require('./window');

env.LOCAL = 'local';
env.DEV = 'dev';
env.ALPHA = 'alpha';
env.BETA = 'beta';
env.PROD = 'prod';

/**
 * Check whether or not code is running in a browser or in a Node process.
 * @returns {boolean}
 */
env.isBrowser = function() {
    return process.title == 'browser';
};

/**
 * Determines the current environment based on the window hostname.
 * @returns {String} the environment level
 */
env.determine = function() {
    if( env.isBrowser() ) {
        var domain = win.domain;

        return env.ENV = (domain.indexOf('my.') == 0
            || domain.indexOf('mysecure.') == 0
            || domain.indexOf('mysecured.') == 0
            || domain.indexOf('localhost') == 0 ? env.LOCAL
            : domain.indexOf('dev') == 0 ? env.DEV
            : domain.indexOf('alpha') == 0 ? env.ALPHA
            : domain.indexOf('beta') == 0 ? env.BETA
            : env.PROD);
    } else {
        return env.ENV = process.env.NODE_ENV;
    }
};

/**
 * The current environment level.
 * @type {String}
 */
env.ENV = env.determine();