const Job = require("../models/job");
const JobReview = require("../models/jobReview");
const wrapAsync = require("../utils/wrapAsync");
const logger = require("../utils/logger");

module.exports.create = wrapAsync(async (req, res) => {
  const jobId = req.params.id;
  logger.info(`Creating a new job review for job ID: ${jobId}`);
  try {
    const job = await Job.findById(jobId);
    if (!job) {
      logger.info("Job not found.");
      req.flash("error", "Job not found.");
      return res.redirect("/jobs");
    }

    const newJobReview = new JobReview(req.body.jobReview);
    newJobReview.author = req.user._id;

    job.reviews.push(newJobReview);
    await newJobReview.save();
    await job.save();

    logger.info("New job review created:", newJobReview._id);
    req.flash("success", "New job review created!");
    res.redirect(`/jobs/${jobId}`);
  } catch (err) {
    logger.error("Error creating job review:", err);
    req.flash("error", "Failed to create job review.");
    res.redirect(`/jobs/${jobId}`);
  }
});

module.exports.delete = wrapAsync(async (req, res) => {
  const { id: jobId, reviewId } = req.params;
  logger.info(`Deleting job review with ID: ${reviewId} from job ID: ${jobId}`);
  try {
    const job = await Job.findById(jobId);
    if (!job) {
      logger.info("Job not found.");
      req.flash("error", "Job not found.");
      return res.redirect("/jobs");
    }

    await Job.findByIdAndUpdate(jobId, { $pull: { reviews: reviewId } });
    await JobReview.findByIdAndDelete(reviewId);

    logger.info("Job review deleted:", reviewId);
    req.flash("success", "Job review deleted!");
    res.redirect(`/jobs/${jobId}`);
  } catch (err) {
    logger.error("Error deleting job review:", err);
    req.flash("error", "Failed to delete job review.");
    res.redirect(`/jobs/${jobId}`);
  }
});
