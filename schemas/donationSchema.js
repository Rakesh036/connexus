const Joi = require("joi");

module.exports.donationSchema = Joi.object({
  donation: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    isEmergency: Joi.boolean().optional(),
  }).required(),
});