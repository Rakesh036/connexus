const Success = require("../models/success.js");
const SuccessReview = require("../models/successReview.js");
const wrapAsync = require("../utils/wrapAsync.js");
const logger = require("../utils/logger");

// Create a new review for a success story
module.exports.create = wrapAsync(async (req, res) => {
  const { id } = req.params;
  try {
    logger.info("Creating review for success story with ID:", id);

    const successStory = await Success.findById(id);
    if (!successStory) {
      logger.error("Success story not found with ID:", id);
      req.flash("error", "Success story not found.");
      return res.redirect("/successes");
    }

    const newReview = new SuccessReview(req.body.successReview);
    newReview.author = req.user._id;
    logger.info("New review created:", newReview);

    successStory.reviews.push(newReview);
    await newReview.save();
    await successStory.save();

    logger.info("New review saved to success story:", successStory);

    req.flash("success", "New review created!");
    res.redirect(`/successes/${id}`);
  } catch (error) {
    logger.error("Error creating review for success story with ID:", id, error);
    req.flash("error", "Error creating review.");
    res.redirect(`/successes/${id}`);
  }
});

// Delete a review from a success story
module.exports.delete = wrapAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  try {
    logger.info("Deleting review with ID:", reviewId, "from success story with ID:", id);

    const successStory = await Success.findById(id);
    if (!successStory) {
      logger.error("Success story not found with ID:", id);
      req.flash("error", "Success story not found.");
      return res.redirect("/successes");
    }

    await Success.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    logger.info("Review with ID:", reviewId, "deleted from success story with ID:", id);

    await SuccessReview.findByIdAndDelete(reviewId);
    logger.info("Review with ID:", reviewId, "deleted from the database");

    req.flash("success", "Review deleted!");
    res.redirect(`/successes`);
  } catch (error) {
    logger.error("Error deleting review with ID:", reviewId, "from success story with ID:", id, error);
    req.flash("error", "Error deleting review.");
    res.redirect(`/successes`);
  }
});

// Comment on a review
module.exports.comment = wrapAsync(async (req, res) => {
  const { reviewId, id } = req.params;
  try {
    logger.info("Commenting on review with ID:", reviewId);

    const review = await SuccessReview.findById(reviewId);
    if (!review) {
      logger.error("Review not found with ID:", reviewId);
      req.flash("error", "Review not found");
      return res.redirect(`/successes`);
    }

    logger.info("Redirecting to comment section of success story with ID:", id);
    res.redirect(`/successes/${id}#comment-section`);
  } catch (error) {
    logger.error("Error commenting on review with ID:", reviewId, error);
    req.flash("error", "Error commenting on review.");
    res.redirect(`/successes`);
  }
});
