const Joi = require('joi');
const logger = require('../utils/logger'); // Import logger

// Define the schema
module.exports.discussionReviewSchema = Joi.object({
  comment: Joi.string().required(),
});

// Logging schema validation
module.exports.validateDiscussionReview = (data) => {
  logger.info("======= [SCHEMA: Discussion Review] =======");
  logger.info("[ACTION: Starting validation for Discussion Review schema]");
  logger.debug("Received data for validation: %o", data);

  const { error } = module.exports.discussionReviewSchema.validate(data);
  
  if (error) {
    const errorMessage = error.details.map(el => el.message).join(", ");
    logger.error(`[VALIDATION ERROR] ${errorMessage}`);
    throw new Error(`Validation error: ${errorMessage}`);
  }

  logger.info("[Validation passed successfully]");
  logger.info("======= [END OF ACTION: Validation for Discussion Review schema] =======\n");
  
  return true;
};
