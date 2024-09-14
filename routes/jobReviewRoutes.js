const express = require("express");
const router = express.Router({ mergeParams: true });
const jobReviewController = require("../controllers/jobReviewController");

const { isLoggedIn } = require("../middlewares/auth");
const { isJobReviewAuthor, validateJobReview } = require("../middlewares/job");


// Route to create a new job review
router.post("/", isLoggedIn, (req, res, next) => {
    console.log("job review post routes, ab schema validate hoga");
    next();
},validateJobReview, (req, res, next) => {
    console.log("job review post routes, ab controller kam krega");
    next();
},jobReviewController.create);

// Route to delete an existing job review
router.delete("/:reviewId", isLoggedIn, isJobReviewAuthor, jobReviewController.delete);

module.exports = router;
