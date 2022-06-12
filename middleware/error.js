const {logger }= require('../logger/');

module.exports = function(err,req,res,next){
    logger.error(err.message);

    res.send(500).send('Something failed.');
}