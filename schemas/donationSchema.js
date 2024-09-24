const Joi = require('joi');
const logger = require('../utils/logger')('donation schema'); // Importing your custom logger

// Define the schema
module.exports.donationSchema = Joi.object({
  title: Joi.string().min(5).max(200).required(),
  description: Joi.string().min(1).max(1000).required(),
  isEmergency: Joi.boolean().optional(),
});

// Logging-based validation
module.exports.validateDonation = (data) => {
  logger.info("======= [SCHEMA: Donation] =======");
  logger.info("[ACTION: Starting validation for Donation schema]");
  logger.debug("Received data for validation: %o", data);

  const { error } = donationSchema.validate(data);

  if (error) {
    const errorMessage = error.details.map(el => el.message).join(", ");
    logger.error(`[VALIDATION ERROR] ${errorMessage}`);
    throw new Error(`Validation error: ${errorMessage}`);
  }

  logger.info("[Validation passed successfully]");
  logger.info("======= [END OF ACTION: Validation for Donation schema] =======\n");

  return true;
};
