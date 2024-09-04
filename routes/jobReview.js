const express = require("express");
const router = express.Router({ mergeParams: true });

// Utils
const wrapAsync = require("../utils/wrapAsync.js");

// Models
const JobReview = require("../models/jobReview.js");
const Job = require("../models/job.js");
const {
  validateJobReview,
  isLoggedIn,
  isJobReviewAuthor,
} = require("../middleware.js");

// Create a new job review
router.post(
  "/",
  isLoggedIn,
  validateJobReview,
  wrapAsync(async (req, res) => {
    const job = await Job.findById(req.params.id);
    const newJobReview = new JobReview(req.body.jobReview);
    newJobReview.author = req.user._id;

    job.reviews.push(newJobReview);
    await newJobReview.save();
    await job.save();

    req.flash("success", "New job review created!");
    res.redirect(`/jobs/${req.params.id}`);
  })
);

// Delete a job review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isJobReviewAuthor,
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;

    await Job.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await JobReview.findByIdAndDelete(reviewId);

    req.flash("success", "Job review deleted!");
    res.redirect(`/jobs/${id}`);
  })
);

module.exports = router;
