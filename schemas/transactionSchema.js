const Joi = require("joi");
const logger = require("../utils/logger"); // Ensure the path to your logger is correct

// Define the schema
module.exports.transactionSchema = Joi.object({
  transaction: Joi.object({
    amount: Joi.number().min(10).required().messages({
      "number.base": "Amount must be a number",
      "number.min": "Amount must be at least 10",
      "any.required": "Amount is required",
    }),
    donor: Joi.string().hex().length(24).required().messages({
      "string.hex": "Donor ID must be a valid hexadecimal string",
      "string.length": "Donor ID must be 24 characters long",
      "any.required": "Donor ID is required",
    }),
    donation: Joi.string().hex().length(24).required().messages({
      "string.hex": "Donation ID must be a valid hexadecimal string",
      "string.length": "Donation ID must be 24 characters long",
      "any.required": "Donation ID is required",
    }),
  }).required().messages({
    "object.required": "Transaction object is required",
  }),
});

// Logging-based validation
module.exports.validateTransaction = (data) => {
  logger.info("======= [SCHEMA: Transaction] =======");
  logger.info("[ACTION: Starting validation for Transaction schema]");
  logger.debug("Received data for validation: %o", data);

  const { error } = module.exports.transactionSchema.validate(data, { abortEarly: false });

  if (error) {
    const errorMessage = error.details.map(el => el.message).join(", ");
    logger.error(`[VALIDATION ERROR] ${errorMessage}`);
    throw new Error(`Validation error: ${errorMessage}`);
  }

  logger.info("[Validation passed successfully]");
  logger.info("======= [END OF ACTION: Validation for Transaction schema] =======\n");

  return true;
};
