const Joi = require("joi");
const logger = require('../utils/logger')('payment schema'); // Ensure the path to your logger is correct

// Define the schema
module.exports.paymentSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().optional(),
  donationTitle: Joi.string().optional(), // For consistency with the donation schema
  amount: Joi.number().positive().required(),
  paymentMethod: Joi.string()
    .valid("UPI", "Credit Card", "Debit Card")
    .required(),
  upiId: Joi.string().when("paymentMethod", {
    is: "UPI",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  cardNumber: Joi.string().when("paymentMethod", {
    is: "Credit Card",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  expiryDate: Joi.string().when("paymentMethod", {
    is: "Credit Card",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  cvv: Joi.string().when("paymentMethod", {
    is: "Credit Card",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
});

// Logging-based validation
module.exports.validatePayment = (data) => {
  logger.info("======= [SCHEMA: Payment] =======");
  logger.info("[ACTION: Starting validation for Payment schema]");
  logger.debug("Received data for validation: %o", data);

  const { error } = paymentSchema.validate(data, { abortEarly: false });

  if (error) {
    const errorMessage = error.details.map(el => el.message).join(", ");
    logger.error(`[VALIDATION ERROR] ${errorMessage}`);
    throw new Error(`Validation error: ${errorMessage}`);
  }

  logger.info("[Validation passed successfully]");
  logger.info("======= [END OF ACTION: Validation for Payment schema] =======\n");

  return true;
};

