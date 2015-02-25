var cfx = module.exports = {};
if(typeof window !== 'undefined') window.cfx = cfx;

cfx.env = require('./env');
cfx.window = require('./window');
cfx.objects = require('./objects');
cfx.arrays = require('./arrays');
cfx.events = require('./events');
cfx.paths = require('./paths');
cfx.strings = require('./strings');