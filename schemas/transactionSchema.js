const Joi = require("joi");

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

// Debugging example
const debugLog = (msg) => console.log(`DEBUG: ${msg}`);

module.exports.validateTransaction = (data) => {
  debugLog("Starting validation for transaction schema...");
  const { error } = module.exports.transactionSchema.validate(data, { abortEarly: false });
  if (error) {
    debugLog(`Validation error: ${error.details.map(el => el.message).join(", ")}`);
    throw new Error(`Validation error: ${error.details.map(el => el.message).join(", ")}`);
  }
  debugLog("Validation passed successfully.");
  return true;
};
