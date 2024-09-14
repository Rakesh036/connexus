const express = require("express");
const router = express.Router({ mergeParams: true });

const logger = require("../utils/logger"); // Import the logger

const { isLoggedIn } = require("../middlewares/auth.js");
const {
  validateSuccessReview,
  isSuccessReviewAuthor,
} = require("../middlewares/success.js");
const successReviewController = require("../controllers/successReviewController.js");

// Create a new review
router.post(
  "/",
  isLoggedIn,
  (req, res, next) => {
    logger.info(`User ${req.user._id} is creating a new success review`);
    next();
  },
  validateSuccessReview,
  (req, res, next) => {
    logger.info(`Success review validation completed`);
    next();
  },
  successReviewController.create
);

// Delete a review
router.delete(
  "/:reviewId",
  isLoggedIn,
  (req, res, next) => {
    logger.info(`User ${req.user._id} is attempting to delete success review ${req.params.reviewId}`);
    next();
  },
  isSuccessReviewAuthor,
  successReviewController.delete
);

// Comment on a review (redirects to comment section)
router.get(
  "/:reviewId/comment",
  isLoggedIn,
  (req, res, next) => {
    logger.info(`User ${req.user._id} is commenting on success review ${req.params.reviewId}`);
    next();
  },
  successReviewController.comment
);

module.exports = router;
