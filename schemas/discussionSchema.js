const Joi = require('joi');
const logger = require('../utils/logger'); // Import your custom logger

// Define the schema
const discussionSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  queryType: Joi.string().valid(
    "Job",
    "Internship",
    "General Query",
    "Life Update",
    "Achievement",
    "Pledge",
    "Technical Query",
    "Notes",
    "Help",
    "Other"
  ).required()
});

// Validate function
module.exports.validateDiscussion = (data) => {
  logger.info("======= [SCHEMA: Discussion] =======");
  logger.info("[ACTION: Starting validation for Discussion schema]");
  logger.debug("Received data for validation: %o", data);

  const { error } = discussionSchema.validate(data);

  if (error) {
    const errorMessage = error.details.map(el => el.message).join(", ");
    logger.error(`[VALIDATION ERROR] ${errorMessage}`);
    throw new Error(`Validation error: ${errorMessage}`);
  }

  logger.info("[Validation passed successfully]");
  logger.info("======= [END OF ACTION: Validation for Discussion schema] =======\n");

  return true;
};
