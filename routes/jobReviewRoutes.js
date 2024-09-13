const express = require("express");
const router = express.Router({ mergeParams: true });
const jobReviewController = require("../controllers/jobReviewController");

const { isLoggedIn } = require("../middlewares/auth");
const { isJobReviewAuthor, validateJobReview } = require("../middlewares/job");
const wrapAsync = require("../utils/wrapAsync");

// Route to create a new job review
router.post("/", isLoggedIn, validateJobReview, wrapAsync(jobReviewController.create));

// Route to delete an existing job review
router.delete("/:reviewId", isLoggedIn, isJobReviewAuthor, wrapAsync(jobReviewController.delete));

module.exports = router;
