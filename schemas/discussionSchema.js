const Joi = require("joi");

module.exports.discussionSchema = Joi.object({
  discussion: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    queryType: Joi.string().required(),
  }).required(),
});
