const Joi = require("joi");

// Define the schema
module.exports.jobReviewSchema = Joi.object({
  jobReview: Joi.object({
    comment: Joi.string().required(),
  }).required(),
});

// Debugging example
const debugLog = (msg) => console.log(`DEBUG: ${msg}`);

module.exports.validateJobReview = (data) => {
  debugLog("Starting validation for job review schema...");
  const { error } = module.exports.jobReviewSchema.validate(data, { abortEarly: false });
  if (error) {
    debugLog(`Validation error: ${error.details.map(el => el.message).join(", ")}`);
    throw new Error(`Validation error: ${error.details.map(el => el.message).join(", ")}`);
  }
  debugLog("Validation passed successfully.");
  return true;
};
