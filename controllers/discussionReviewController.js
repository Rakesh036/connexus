const Discussion = require("../models/discussion");
const DiscussionReview = require("../models/discussionReview");
const wrapAsync = require("../utils/wrapAsync");

module.exports.create = wrapAsync(async (req, res) => {
  const discussion = await Discussion.findById(req.params.id);
  const newDiscussionReview = new DiscussionReview(req.body.discussionReview);
  newDiscussionReview.author = req.user._id;
  discussion.reviews.push(newDiscussionReview);
  await newDiscussionReview.save();
  await discussion.save();

  req.flash("success", "New review created!");
  res.redirect(`/discussions/${req.params.id}`);
});

module.exports.delete = wrapAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  await Discussion.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await DiscussionReview.findByIdAndDelete(reviewId);

  req.flash("success", "Review deleted!");
  res.redirect(`/discussions/${id}`);
});
