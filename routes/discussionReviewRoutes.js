const express = require("express");
const router = express.Router({ mergeParams: true });
const logger = require("../utils/logger"); // Import the logger
const discussionReviewController = require("../controllers/discussionReviewController");
const { isLoggedIn } = require("../middlewares/auth");
const { isDiscussionReviewAuthor, validateDiscussionReview } = require("../middlewares/discussion");

// Route to create a discussion review
router
  .route("/")
  .post(
    isLoggedIn,
    (req, res, next) => {
      logger.info(`User ${req.user._id} is attempting to create a discussion review for discussion ${req.params.id}`);
      next();
    },
    validateDiscussionReview,
    discussionReviewController.create
  );

// Route to delete a discussion review
router
  .route("/:reviewId")
  .delete(
    isLoggedIn,
    (req, res, next) => {
      logger.info(`User ${req.user._id} is attempting to delete discussion review ${req.params.reviewId}`);
      next();
    },
    isDiscussionReviewAuthor,
    discussionReviewController.delete
  );

module.exports = router;
