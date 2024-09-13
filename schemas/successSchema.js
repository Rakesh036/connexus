const Joi = require("joi");

module.exports.successSchema = Joi.object({
  success: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().allow("", null),
  }).required(),
});
