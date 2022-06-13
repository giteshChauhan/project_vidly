const {logger} = require('./logger/');
const express = require('express');
const app = express();

require('./startup/handler')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

let port = process.env.PORT || 3000;
app.listen(port,() => logger.info(`Listening on port ${port}......`));