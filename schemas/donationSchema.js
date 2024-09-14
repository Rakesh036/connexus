const Joi = require("joi");

// Define the schema
module.exports.donationSchema = Joi.object({
  donation: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    isEmergency: Joi.boolean().optional(),
  }).required(),
});

// Debugging example
const debugLog = (msg) => console.log(`DEBUG: ${msg}`);

module.exports.validateDonation = (data) => {
  debugLog("Starting validation for donation schema...");
  const { error } = module.exports.donationSchema.validate(data);
  if (error) {
    debugLog(`Validation error: ${error.details.map(el => el.message).join(", ")}`);
    throw new Error(`Validation error: ${error.details.map(el => el.message).join(", ")}`);
  }
  debugLog("Validation passed successfully.");
  return true;
};
