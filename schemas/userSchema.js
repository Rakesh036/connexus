const Joi = require("joi");
const logger = require("../utils/logger")('user schema'); // Ensure the path to your logger is correct

// Define the schema
module.exports.userSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Username is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email.",
    "string.empty": "Email is required.",
  }),
  location: Joi.string().required().messages({
    "string.empty": "Location is required.",
  }),
  phone: Joi.string().optional(),
  dob: Joi.date().optional(),
  city: Joi.string().optional(),
  country: Joi.string().optional(),
  graduationYear: Joi.number().optional(),
  degree: Joi.string().optional(),
  department: Joi.string().optional(),
  employer: Joi.string().optional(),
  jobTitle: Joi.string().optional(),
  industry: Joi.string().optional(),
  experience: Joi.number().optional(),
  skills: Joi.array().items(Joi.string()).optional(),
  projects: Joi.array().items(Joi.string()).optional(),
  achievements: Joi.array().items(Joi.string()).optional(),
  linkedin: Joi.string().uri().optional(),
  github: Joi.string().uri().optional(),
  profilePicture: Joi.string().optional(),
});

// Logging-based validation
module.exports.validateUser = (data) => {
  logger.info("======= [SCHEMA: User] =======");
  logger.info("[ACTION: Starting validation for User schema]");
  logger.debug("Received data for validation: %o", data);

  const { error } = module.exports.userSchema.validate(data, { abortEarly: false });

  if (error) {
    const errorMessage = error.details.map(el => el.message).join(", ");
    logger.error(`[VALIDATION ERROR] ${errorMessage}`);
    throw new Error(`Validation error: ${errorMessage}`);
  }

  logger.info("[Validation passed successfully]");
  logger.info("======= [END OF ACTION: Validation for User schema] =======\n");

  return true;
};
