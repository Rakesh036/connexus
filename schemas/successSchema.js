const Joi = require("joi");

// Define the schema
module.exports.successSchema = Joi.object({
  success: Joi.object({
    title: Joi.string().required().messages({
      "string.empty": "Title is required",
    }),
    description: Joi.string().required().messages({
      "string.empty": "Description is required",
    }),
    image: Joi.string().allow("", null).messages({
      "string.base": "Image must be a string",
    }),
  }).required().messages({
    "object.required": "Success object is required",
  }),
});

// Debugging example
const debugLog = (msg) => console.log(`DEBUG: ${msg}`);

module.exports.validateSuccess = (data) => {
  debugLog("Starting validation for success schema...");
  const { error } = module.exports.successSchema.validate(data, { abortEarly: false });
  if (error) {
    debugLog(`Validation error: ${error.details.map(el => el.message).join(", ")}`);
    throw new Error(`Validation error: ${error.details.map(el => el.message).join(", ")}`);
  }
  debugLog("Validation passed successfully.");
  return true;
};
