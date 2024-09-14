const Joi = require("joi");

// Define the schema
module.exports.discussionSchema = Joi.object({
  discussion: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    queryType: Joi.string().required(),
  }).required(),
});

// Debugging example
const debugLog = (msg) => console.log(`DEBUG: ${msg}`);

module.exports.validateDiscussion = (data) => {
  debugLog("Starting validation for discussion schema...");
  const { error } = module.exports.discussionSchema.validate(data);
  if (error) {
    debugLog(`Validation error: ${error.details.map(el => el.message).join(", ")}`);
    throw new Error(`Validation error: ${error.details.map(el => el.message).join(", ")}`);
  }
  debugLog("Validation passed successfully.");
  return true;
};
