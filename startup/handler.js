const {xlogger,rlogger} = require('../logger/')

module.exports = function () {
    process.on('uncaughtException', (ex) => {
        xlogger.error(ex.message, ex);
        process.nextTick(function() {setTimeout(process.exit, 10);});
    });
    
    process.on('unhandledRejection', ex => {
        rlogger.error(ex.message, ex);
        process.nextTick(function() {setTimeout(process.exit, 10);});
    })
}