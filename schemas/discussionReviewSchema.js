const Joi = require("joi");

module.exports.discussionReviewSchema = Joi.object({
  discussionReview: Joi.object({
    comment: Joi.string().required(),
  }).required(),
});
