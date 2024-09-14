const Job = require("../models/job");
const { jobSchema } = require("../schemas/jobSchema");
const JobReview = require("../models/jobReview");
const { jobReviewSchema } = require("../schemas/jobReviewSchema");
const ExpressError = require("../utils/expressError");

module.exports.isJobOwner = async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id).populate("owner");
    if (!job) {
      req.flash("error", "Job not found!");
      return res.redirect("/jobs");
    }
    if (!job.owner._id.equals(res.locals.currUser._id)) {
      req.flash("error", "You don't have permission");
      return res.redirect(`/jobs/${id}`);
    }
    next();
  } catch (e) {
    next(e);
  }
};

module.exports.validateJob = (req, res, next) => {
  const { error } = jobSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};

module.exports.validateJobReview = (req, res, next) => {
  // console.log("validateJobReview me schema validate hone wala h: req.body:  ", req.body);
  
  const { error } = jobReviewSchema.validate(req.body);
  if (error) {
    // console.log("validateJobReview me schema validate hogya error:  ", error);
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  // console.log("validateJobReview me schema validate ho gya");
  next();
};


module.exports.isJobReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const jobReview = await JobReview.findById(reviewId);
  if (!jobReview.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have permission");
    return res.redirect(`/jobs/${id}`);
  }
  next();
};
