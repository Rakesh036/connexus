const express = require("express");
const router = express.Router({ mergeParams: true });
const logger = require("../utils/logger"); // Import the logger

const jobReviewController = require("../controllers/jobReviewController");
const { isLoggedIn } = require("../middlewares/auth");
const { isJobReviewAuthor, validateJobReview } = require("../middlewares/job");

// Route to create a new job review
router.post("/", isLoggedIn, (req, res, next) => {
    logger.info("======= [ROUTE: Create Job Review] =======");
    logger.info("[ACTION: Creating New Job Review]");
    logger.info("User ID: %s is creating a new job review", req.user._id);
    logger.debug("Request body: %s", JSON.stringify(req.body));
    next();
}, validateJobReview, (req, res, next) => {
    logger.debug("Job review validation passed. Proceeding to create the review.");
    next();
}, jobReviewController.create);

// Route to delete an existing job review
router.delete("/:reviewId", isLoggedIn, isJobReviewAuthor, (req, res, next) => {
    logger.info("======= [ROUTE: Delete Job Review] =======");
    logger.info("[ACTION: Deleting Job Review]");
    logger.info("User ID: %s is deleting job review ID: %s", req.user._id, req.params.reviewId);
    next();
}, jobReviewController.delete);

module.exports = router;
