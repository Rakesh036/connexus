const Job = require("../models/job");
const JobReview = require("../models/jobReview");
const wrapAsync = require("../utils/wrapAsync");

module.exports.create = wrapAsync(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    req.flash("error", "Job not found.");
    return res.redirect("/jobs");
  }

  const newJobReview = new JobReview(req.body.jobReview);
  newJobReview.author = req.user._id;

  job.reviews.push(newJobReview);
  await newJobReview.save();
  await job.save();

  req.flash("success", "New job review created!");
  res.redirect(`/jobs/${req.params.id}`);
});

module.exports.delete = wrapAsync(async (req, res) => {
  const { id, reviewId } = req.params;

  const job = await Job.findById(id);
  if (!job) {
    req.flash("error", "Job not found.");
    return res.redirect("/jobs");
  }

  await Job.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await JobReview.findByIdAndDelete(reviewId);

  req.flash("success", "Job review deleted!");
  res.redirect(`/jobs/${id}`);
});
