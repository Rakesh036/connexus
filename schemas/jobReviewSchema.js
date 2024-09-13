const Joi = require("joi");

module.exports.jobReviewSchema = Joi.object({
  jobReview: Joi.object({
    comment: Joi.string().required(),
  }).required(),
});
