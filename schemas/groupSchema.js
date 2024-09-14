const Joi = require("joi");

// Define the schema
module.exports.groupSchema = Joi.object({
  name: Joi.string().required().trim(),
  description: Joi.string().trim(),
  motto: Joi.string().trim(),
  website: Joi.string().uri().trim(),
  contactEmail: Joi.string().email().trim(),
});

// Debugging example
const debugLog = (msg) => console.log(`DEBUG: ${msg}`);

module.exports.validateGroup = (data) => {
  debugLog("Starting validation for group schema...");
  const { error } = module.exports.groupSchema.validate(data, { abortEarly: false });
  if (error) {
    debugLog(`Validation error: ${error.details.map(el => el.message).join(", ")}`);
    throw new Error(`Validation error: ${error.details.map(el => el.message).join(", ")}`);
  }
  debugLog("Validation passed successfully.");
  return true;
};
