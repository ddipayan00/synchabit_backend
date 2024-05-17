// logger.js

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

// Define your custom format
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create the logger instance
const logger = createLogger({
  level: 'info', // Set the minimum level of logs to be captured
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(), // Log to the console
    new transports.File({ filename: './logs/combined.log' }), // Log to a file
    new transports.File({ filename: './logs/errors.log', level: 'error' }), // Separate file for error logs
    new transports.File({ filename: './logs/debug.log', level: 'debug' }),
    new transports.File({ filename: './logs/info.log', level: 'info' }), // Separate file for info logs
    new transports.File({ filename: './logs/warning.log', level: 'warn' })
  ]
});

module.exports = logger;
