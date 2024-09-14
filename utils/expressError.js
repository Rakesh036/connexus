// utils/expressError.js
const logger = require("./logger"); // Ensure the path to your logger is correct

class ExpressError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;

    // Log error details
    logger.error(`ExpressError created: StatusCode=${statusCode}, Message=${message}`);
  }
}

module.exports = ExpressError;
