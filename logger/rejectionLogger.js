const { format, transports, createLogger } = require('winston');
const {combine, colorize, timestamp, simple} = format;


const rlogger =createLogger({
        transports: [
            new transports.File({
                filename: './logs/rejection.log',
                level: 'error',
                format: combine(
                    colorize(),
                    timestamp(),
                    format.json()
                )
            }),
            new transports.Console({
                level: 'error',
                format: combine(
                  colorize(),
                  simple()
                )
              }),
        ],
});

module.exports = rlogger;