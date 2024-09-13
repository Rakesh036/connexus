const Joi = require("joi");

module.exports.successReviewSchema = Joi.object({
  successReview: Joi.object({
    comment: Joi.string().required(),
  }).required(),
});
