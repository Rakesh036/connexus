const Joi = require("joi");
const logger = require("../utils/logger")('paymentMiddleware'); // Specify label

// Middleware to validate payment details using Joi
module.exports.validatePayment = (req, res, next) => {
  try {
    logger.info("Validating payment details...");

    const paymentSchema = Joi.object({
      fullName: Joi.string().required(),
      email: Joi.string().email().optional(),
      donationTitle: Joi.string().optional(),  // Changed from eventTitle for clarity
      amount: Joi.number().required().min(0),
      paymentMethod: Joi.string()
        .valid("UPI", "Credit Card", "Debit Card")
        .required(),
      upiId: Joi.string().when("paymentMethod", {
        is: "UPI",
        then: Joi.required(),
      }),
      cardNumber: Joi.string().when("paymentMethod", {
        is: Joi.string().valid("Credit Card", "Debit Card"),
        then: Joi.required(),
      }),
      expiryDate: Joi.string().when("paymentMethod", {
        is: Joi.string().valid("Credit Card", "Debit Card"),
        then: Joi.required(),
      }),
    });

    logger.debug(`Request body for payment validation: ${JSON.stringify(req.body)}`);

    const { error } = paymentSchema.validate(req.body);

    if (error) {
      const msg = error.details.map((el) => el.message).join(", ");
      logger.error(`Validation error: ${msg}`);
      req.flash("error", msg);
      return res.redirect("back");
    }

    logger.info("Payment details validation passed.");
    next();
  } catch (e) {
    logger.error(`Error in validatePayment middleware: ${e.message}`);
    next(e);
  }
};
