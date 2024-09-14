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
    logger.info("======= [ROUTE: Create Success Review] =======");
    logger.info("[ACTION: Creating New Success Review]");
    logger.info("User ID: %s is creating a new success review", req.user._id);
    next();
  },
  validateSuccessReview,
  (req, res, next) => {
    logger.info("[ACTION: Validation Completed]");
    logger.info("Validation for the success review passed");
    next();
  },
  successReviewController.create
);

// Delete a review
router.delete(
  "/:reviewId",
  isLoggedIn,
  (req, res, next) => {
    logger.info("======= [ROUTE: Delete Success Review] =======");
    logger.info("[ACTION: Attempting to Delete Review]");
    logger.info("User ID: %s is attempting to delete success review %s", req.user._id, req.params.reviewId);
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
    logger.info("======= [ROUTE: Comment on Success Review] =======");
    logger.info("[ACTION: Commenting on Review]");
    logger.info("User ID: %s is commenting on success review %s", req.user._id, req.params.reviewId);
    next();
  },
  successReviewController.comment
);

module.exports = router;
