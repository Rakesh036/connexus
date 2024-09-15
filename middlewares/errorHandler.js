const logger = require("../utils/logger")('errorHandler'); // Specify label

module.exports.errorHandler = (err, req, res, next) => {
  const middlewareName = err.middlewareName || "Unknown Middleware";
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Something went wrong";

  // Log detailed error information
  logger.error(`Error in ${middlewareName}: ${errorMessage}`, {
    stack: err.stack,
    statusCode: statusCode,
    requestUrl: req.originalUrl,
    method: req.method,
    user: req.user ? req.user._id : "Anonymous",
  });

  // Set the status code and render the error page
  res.status(statusCode).render("error", { 
    error: {
      message: errorMessage,
      statusCode: statusCode,
    }
  });
};
