const Discussion = require("../models/discussion");
const { discussionSchema } = require("../schemas/discussionSchema");
const DiscussionReview = require("../models/discussionReview");
const { discussionReviewSchema } = require("../schemas/discussionReviewSchema");
const ExpressError = require("../utils/expressError");

module.exports.isDiscussionOwner = async (req, res, next) => {
  const { id } = req.params;
  const discussion = await Discussion.findById(id);
  if (!discussion.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have permission");
    return res.redirect(`/discussions/${id}`);
  }
  next();
};

module.exports.validateDiscussion = (req, res, next) => {
  const { error } = discussionSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};



module.exports.isDiscussionReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await DiscussionReview.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have permission");
    return res.redirect(`/discussions/${id}`);
  }
  next();
};

module.exports.validateDiscussionReview = (req, res, next) => {
  const { error } = discussionReviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};
