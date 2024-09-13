const express = require("express");
const router = express.Router({ mergeParams: true });
const discussionReviewController = require("../controllers/discussionReviewController");
const { isLoggedIn } = require("../middlewares/auth");
const { isDiscussionReviewAuthor, validateDiscussionReview } = require("../middlewares/discussion");

router
  .route("/")
  .post(
    isLoggedIn,
    validateDiscussionReview,
    discussionReviewController.create
  );

router
  .route("/:reviewId")
  .delete(
    isLoggedIn,
    isDiscussionReviewAuthor,
    discussionReviewController.delete
  );

module.exports = router;
