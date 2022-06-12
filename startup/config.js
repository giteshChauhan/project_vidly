const config = require('config');
const {logger} = require('../logger/');

module.exports = function (){
    if(!config.get('jwtPrivateKey')){
        logger.error('FATAL ERROR: jwtPrivateKey is not defined');
        process.nextTick(function() {setTimeout(process.exit, 10);});
    }

    if(!config.get('env')){
        logger.error('FATAL ERROR: app_environment is not set');
        process.nextTick(function() {setTimeout(process.exit, 10);});
    }
}