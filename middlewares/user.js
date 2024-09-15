const { userSchema } = require("../schemas/userSchema");
const ExpressError = require("../utils/expressError");
const logger = require("../utils/logger")('userMiddleware'); // Specify label

// Middleware to validate user schema
module.exports.validateUser = (req, res, next) => {
  try {
    logger.info("Validating user schema...");
    logger.debug(`Request body: ${JSON.stringify(req.body)}`);

    const { error } = userSchema.validate(req.body, { abortEarly: false }); // `abortEarly: false` to capture all validation errors

    if (error) {
      const errMsg = error.details.map((el) => el.message).join(", ");
      logger.error(`Validation error: ${errMsg}`);
      req.flash("error", errMsg);
      return res.redirect("back"); // Redirect back to the previous page with errors
    }

    logger.info("User schema validation passed. Proceeding to the next middleware.");
    next();
  } catch (err) {
    logger.error(`Error in validateUser middleware: ${err.message}`);
    next(err);
  }
};
