const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const date = require('date-and-time');
const now = new Date();
const today = date.format(now, 'YYYY-MM-DD');

const os = require('os');
const userHomeDir = os.homedir();

const myFormat = printf(({ level, message, timestamp }) => {
  return `{'timestamp':'${timestamp}','level':'${level.toUpperCase()}','message':'${message}'}`;
});

const logger = createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'warn',
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console({
      level: 'http'
    }),
    new transports.File({
      filename: userHomeDir + `/user-management-ui/logs/${today}.log`,
      level: 'info'
    })
  ]
});

module.exports = logger;
