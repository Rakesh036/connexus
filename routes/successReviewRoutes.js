const express = require("express");
const router = express.Router({ mergeParams: true });

const { isLoggedIn } = require("../middlewares/auth.js");
const {
  validateSuccessReview,
  isSuccessReviewAuthor,
} = require("../middlewares/success.js");
const successReviewController = require("../controllers/successReviewController.js");

// Create a new review
router.post("/", isLoggedIn, validateSuccessReview, successReviewController.create);

// Delete a review
router.delete("/:reviewId", isLoggedIn, isSuccessReviewAuthor, successReviewController.delete);

// Like a review
router.get("/:reviewId/like", isLoggedIn, successReviewController.toggleLike);

// Comment on a review (redirects to comment section)
router.get("/:reviewId/comment", isLoggedIn, successReviewController.comment);

// Report a review
router.get("/:reviewId/report", isLoggedIn, successReviewController.toggleReport);

module.exports = router;
