const express = require("express");
const router = express.Router({ mergeParams: true });

// Utils
const wrapAsync = require("../utils/wrapAsync.js");

// Models
const Review = require("../models/successReview.js");
const Success = require("../models/success.js"); // Adjust path as necessary

// Middleware
const {
  validateSuccessReview,
  isLoggedIn,
  isSuccessReviewAuthor,
} = require("../middleware.js");

// Create a new review for a success story
router.post(
  "/",
  isLoggedIn,
  validateSuccessReview,
  wrapAsync(async (req, res) => {
    const successStory = await Success.findById(req.params.id);
    if (!successStory) {
      req.flash("error", "Success story not found.");
      return res.redirect(`/successes`);
    }

    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    successStory.reviews.push(newReview);
    await newReview.save();
    await successStory.save();

    req.flash("success", "New review created!");
    res.redirect(`/successes/${req.params.id}`);
  })
);

// Delete a review for a success story
router.delete(
  "/:reviewId", (req, res, next) => {
    console.log("delete hone wala hai");
    next();
  },
  isLoggedIn,
  isSuccessReviewAuthor,
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    
    // Log parameters for debugging
    console.log(`Attempting to delete review with ID: ${reviewId} from success story with ID: ${id}`);
    
    // Verify success story exists
    const successStory = await Success.findById(id);
    if (!successStory) {
      req.flash("error", "Success story not found.");
      return res.redirect(`/successes`);
    }

    // Verify review exists
    const review = await Review.findById(reviewId);
    if (!review) {
      req.flash("error", "Review not found.");
      return res.redirect(`/successes`);
    }

    // Remove review from success story and delete review
    await Success.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted!");
    res.redirect(`/successes`);
  })
);

module.exports = router;
