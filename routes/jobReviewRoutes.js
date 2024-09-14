const express = require("express");
const router = express.Router({ mergeParams: true });
const logger = require("../utils/logger"); // Import the logger

const jobReviewController = require("../controllers/jobReviewController");
const { isLoggedIn } = require("../middlewares/auth");
const { isJobReviewAuthor, validateJobReview } = require("../middlewares/job");

// Route to create a new job review
router.post("/", isLoggedIn, (req, res, next) => {
    logger.info(`User ${req.user._id} is creating a new job review`);
    logger.debug(`Request body: ${JSON.stringify(req.body)}`);
    next();
}, validateJobReview, (req, res, next) => {
    logger.debug("Job review validation passed. Controller will handle the request now.");
    next();
}, jobReviewController.create);

// Route to delete an existing job review
router.delete("/:reviewId", isLoggedIn, isJobReviewAuthor, (req, res, next) => {
    logger.info(`User ${req.user._id} is deleting job review ${req.params.reviewId}`);
    next();
}, jobReviewController.delete);

module.exports = router;
