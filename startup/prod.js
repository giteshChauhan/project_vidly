const helmet = require('helmet');
const compress = require('compression');

module.exports = function(app){
    app.use(helmet());
    app.use(compression());
}