const Joi = require("joi");

module.exports.groupSchema = Joi.object({
  name: Joi.string().required().trim(),
  description: Joi.string().trim(),
  motto: Joi.string().trim(),
  website: Joi.string().uri().trim(),
  contactEmail: Joi.string().email().trim(),
});
