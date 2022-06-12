const prodLogger = require('./prodLogger');
const xlogger = require('./exceptionLogger');
const rlogger = require('./rejectionLogger');

// by default logger will export prodLogger
let logger =prodLogger;


module.exports.logger = logger;
module.exports.xlogger = xlogger;
module.exports.rlogger = rlogger;