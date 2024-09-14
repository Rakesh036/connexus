const Joi = require("joi");

// Define the schema
module.exports.successReviewSchema = Joi.object({
  successReview: Joi.object({
    comment: Joi.string().required().messages({
      "string.empty": "Comment is required",
    }),
  }).required().messages({
    "object.required": "Success review object is required",
  }),
});

// Debugging example
const debugLog = (msg) => console.log(`DEBUG: ${msg}`);

module.exports.validateSuccessReview = (data) => {
  debugLog("Starting validation for success review schema...");
  const { error } = module.exports.successReviewSchema.validate(data, { abortEarly: false });
  if (error) {
    debugLog(`Validation error: ${error.details.map(el => el.message).join(", ")}`);
    throw new Error(`Validation error: ${error.details.map(el => el.message).join(", ")}`);
  }
  debugLog("Validation passed successfully.");
  return true;
};
