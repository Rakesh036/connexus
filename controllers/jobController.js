const Job = require("../models/job");
const wrapAsync = require("../utils/wrapAsync");

module.exports.index = wrapAsync(async (req, res) => {
  const jobs = await Job.find({}).populate("likes").populate("reports");
  res.render("jobs/index", { jobs, cssFile: "job/jobIndex.css" });
});

module.exports.renderNewForm = (req, res) => {
  res.render("jobs/new", { cssFile: "job/jobNew.css" });
};

module.exports.create = wrapAsync(async (req, res) => {
  const newJob = new Job(req.body.job);
  newJob.owner = req.user._id;
  await newJob.save();
  req.flash("success", "New job created!");
  res.redirect("/jobs");
});

module.exports.show = wrapAsync(async (req, res) => {
  const job = await Job.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!job) {
    req.flash("error", "Job does not exist!");
    return res.redirect("/jobs");
  }

  res.render("jobs/show", { job, cssFile: "job/jobShow.css" });
});

module.exports.renderEditForm = wrapAsync(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    req.flash("error", "Job does not exist!");
    return res.redirect("/jobs");
  }

  res.render("jobs/edit", { job, cssFile: "job/jobEdit.css" });
});

module.exports.update = wrapAsync(async (req, res) => {
  await Job.findByIdAndUpdate(req.params.id, { ...req.body.job });
  req.flash("success", "Job updated!");
  res.redirect(`/jobs/${req.params.id}`);
});

module.exports.delete = wrapAsync(async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  req.flash("success", "Job deleted!");
  res.redirect("/jobs");
});

module.exports.like = wrapAsync(async (req, res) => {
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
});

module.exports.comment = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  if (!job) {
    req.flash("error", "Job not found");
    return res.redirect("/jobs");
  }

  res.redirect(`/jobs/${id}#comment-section`);
});

module.exports.report = wrapAsync(async (req, res) => {
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
});
