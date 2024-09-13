const Success = require("../models/success.js");
const SuccessReview = require("../models/successReview.js");
const wrapAsync = require("../utils/wrapAsync.js");

// Create a new review for a success story
module.exports.create = wrapAsync(async (req, res) => {
  const successStory = await Success.findById(req.params.id);
  if (!successStory) {
    req.flash("error", "Success story not found.");
    return res.redirect("/successes");
  }

  const newReview = new SuccessReview(req.body.review);
  newReview.author = req.user._id;
  successStory.reviews.push(newReview);
  await newReview.save();
  await successStory.save();

  req.flash("success", "New review created!");
  res.redirect(`/successes/${req.params.id}`);
});

// Delete a review from a success story
module.exports.delete = wrapAsync(async (req, res) => {
  const { id, reviewId } = req.params;

  const successStory = await Success.findById(id);
  if (!successStory) {
    req.flash("error", "Success story not found.");
    return res.redirect("/successes");
  }

  await Success.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await SuccessReview.findByIdAndDelete(reviewId);

  req.flash("success", "Review deleted!");
  res.redirect(`/successes`);
});

// Like or unlike a review
module.exports.toggleLike = wrapAsync(async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user._id;

  const review = await SuccessReview.findById(reviewId);
  if (!review) {
    req.flash("error", "Review does not exist!");
    return res.redirect(`/successes`);
  }

  const hasLiked = review.likes.some((like) => like.equals(userId));
  if (hasLiked) {
    await SuccessReview.findByIdAndUpdate(reviewId, { $pull: { likes: userId } });
  } else {
    await SuccessReview.findByIdAndUpdate(reviewId, { $push: { likes: userId } });
  }

  res.redirect(`/successes`);
});

// Comment on a review
module.exports.comment = wrapAsync(async (req, res) => {
  const { reviewId } = req.params;
  const review = await SuccessReview.findById(reviewId);
  if (!review) {
    req.flash("error", "Review not found");
    return res.redirect(`/successes`);
  }
  res.redirect(`/successes/${req.params.id}#comment-section`);
});

// Report a review
module.exports.toggleReport = wrapAsync(async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user._id;

  const review = await SuccessReview.findById(reviewId);
  if (!review) {
    req.flash("error", "Review does not exist!");
    return res.redirect(`/successes`);
  }

  const hasReported = review.reports.some((report) => report.equals(userId));

  if (hasReported) {
    await SuccessReview.findByIdAndUpdate(reviewId, { $pull: { reports: userId } });
  } else {
    await SuccessReview.findByIdAndUpdate(reviewId, { $push: { reports: userId } });
  }

  req.flash("success", "Review reported!");
  res.redirect(`/successes`);
});
