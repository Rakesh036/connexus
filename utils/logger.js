const winston = require('winston');
const fs = require('fs');
const path = require('path');
const DailyRotateFile = require('winston-daily-rotate-file');

// Define the log directory and file paths
const logDirectory = path.join(__dirname, '../logs');
const logFilePath = path.join(logDirectory, 'application-%DATE%.log');

// Ensure the logs directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// Define custom format
const myFormat = winston.format.printf(({ level, message, timestamp, label }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

// Configure the daily rotate file transport
const transport = new DailyRotateFile({
  filename: logFilePath,
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '14d'
});

// Create the logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    myFormat
  ),
  transports: [
    new winston.transports.Console(),  // For console output
    transport  // For file output with rotation
  ],
});

module.exports = logger;
