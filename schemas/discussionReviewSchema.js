const Joi = require("joi");

module.exports.discussionReviewSchema = Joi.object({
  discussionReview: Joi.object({
    comment: Joi.string().required(),
  }).required(),
});

// Debugging example
const debugLog = (msg) => console.log(`DEBUG: ${msg}`);

module.exports.validateDiscussionReview = (data) => {
  debugLog("Starting validation for discussion review schema...");
  const { error } = module.exports.discussionReviewSchema.validate(data);
  if (error) {
    debugLog(`Validation error: ${error.details.map(el => el.message).join(", ")}`);
    throw new Error(`Validation error: ${error.details.map(el => el.message).join(", ")}`);
  }
  debugLog("Validation passed successfully.");
  return true;
};
