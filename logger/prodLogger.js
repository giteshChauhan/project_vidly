const { format, transports, createLogger } = require('winston');
const {combine, colorize, timestamp, simple} = format;
require('express-async-errors');


const logger =createLogger({
        transports: [
            new transports.File({
              filename: './logs/logFile.log',
              level: 'info',
              format: combine(
                  timestamp(),
                  format.json()
              )
            }),
            new transports.Console({
                level: 'info',
                format: combine(
                  colorize(),
                  timestamp(),
                  simple()
                )
              }),
        ],
});

module.exports = logger;