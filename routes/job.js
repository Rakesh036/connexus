const express = require("express");
const router = express.Router();
const {
  isLoggedIn,
  isJobOwner,
  validateJob,
  validateJobReview,
  isJobReviewAuthor,
} = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Job = require("../models/job.js");
const JobReview = require("../models/jobReview.js");

// Index route - Show all jobs
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const jobs = await Job.find({}).populate("likes").populate("reports");
    res.render("jobs/index.ejs", { jobs });
  })
);

// New route - Form for creating a new job
router.get("/new", isLoggedIn, (req, res) => {
  res.render("jobs/new.ejs");
});

// Create route - Add a new job
router.post(
  "/",
  isLoggedIn,
  validateJob,
  wrapAsync(async (req, res) => {
    const newJob = new Job(req.body.job);
    newJob.owner = req.user._id;
    await newJob.save();
    req.flash("success", "New job created!");
    res.redirect("/jobs");
  })
);

// Show route - Show details for a single job
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const job = await Job.findById(req.params.id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");
    if (!job) {
      req.flash("error", "Job does not exist!");
      return res.redirect("/jobs");
    }
    res.render("jobs/show.ejs", { job });
  })
);

// Edit route - Form for editing an existing job
router.get(
  "/:id/edit",
  isLoggedIn,
  isJobOwner,
  wrapAsync(async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (!job) {
      req.flash("error", "Job does not exist!");
      return res.redirect("/jobs");
    }
    res.render("jobs/edit.ejs", { job });
  })
);

// Update route - Update a specific job
router.put(
  "/:id",
  isLoggedIn,
  isJobOwner,
  validateJob,
  wrapAsync(async (req, res) => {
    await Job.findByIdAndUpdate(req.params.id, { ...req.body.job });
    req.flash("success", "Job updated!");
    res.redirect(`/jobs/${req.params.id}`);
  })
);

// Delete route - Delete a specific job
router.delete(
  "/:id",
  isLoggedIn,
  isJobOwner,
  wrapAsync(async (req, res) => {
    await Job.findByIdAndDelete(req.params.id);
    req.flash("success", "Job deleted!");
    res.redirect("/jobs");
  })
);

// Like route - Like or unlike a job
router.get(
  "/:id/like",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const job = await Job.findById(id);

    if (!job) {
      req.flash("error", "Job does not exist!");
      return res.redirect("/jobs");
    }

    const hasLiked = job.likes.some((like) => like.equals(userId));

    if (hasLiked) {
      await Job.findByIdAndUpdate(id, { $pull: { likes: userId } });
    } else {
      await Job.findByIdAndUpdate(id, { $push: { likes: userId } });
    }

    res.redirect("/jobs");
  })
);

// Comment route - Redirect to the job's show page with the #comment-section anchor
router.get(
  "/:id/comment",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      req.flash("error", "Job not found");
      return res.redirect("/jobs");
    }
    res.redirect(`/jobs/${id}#comment-section`);
  })
);

// Report route - Report or unreport a job
router.get(
  "/:id/report",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const job = await Job.findById(id);

    if (!job) {
      req.flash("error", "Job does not exist!");
      return res.redirect("/jobs");
    }

    const hasReported = job.reports.some((report) => report.equals(userId));

    if (hasReported) {
      await Job.findByIdAndUpdate(id, { $pull: { reports: userId } });
    } else {
      await Job.findByIdAndUpdate(id, { $push: { reports: userId } });
    }

    req.flash("success", "Job reported!");
    res.redirect("/jobs");
  })
);

module.exports = router;
