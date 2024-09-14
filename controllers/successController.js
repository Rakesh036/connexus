const Success = require("../models/success.js");
const ExpressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync.js");

// Index - Show all success stories
module.exports.index = wrapAsync(async (req, res) => {
  const successes = await Success.find({});
  res.render("success/index.ejs", { successes, cssFile: "success/successIndex.css" });
});

// Show - Display a specific success story
module.exports.show = wrapAsync(async (req, res) => {
  const successStory = await Success.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!successStory) {
    req.flash("error", "Success story does not exist!");
    return res.redirect("/successes");
  }
  res.render("success/show.ejs", {
    successStory,
    cssFile: "success/successShow.css",
  });
});

// New - Render form to create a new success story
module.exports.renderNewForm = wrapAsync(async (req, res) => {
  res.render("success/new.ejs", { cssFile: "success/successNew.css" });
});

// Create - Add a new success story
module.exports.create = wrapAsync(async (req, res) => {
  const newSuccess = new Success(req.body.success);
  newSuccess.owner = req.user._id;
  newSuccess.image = { url: req.file.path, filename: req.file.filename };
  await newSuccess.save();
  req.flash("success", "New success story created!");
  res.redirect("/successes");
});

// Edit - Render form to edit a success story
module.exports.renderEditForm = wrapAsync(async (req, res) => {
  const successStory = await Success.findById(req.params.id);
  if (!successStory) {
    req.flash("error", "Success story not found!");
    return res.redirect("/successes");
  }
  res.render("success/edit.ejs", {
    successStory,
    cssFile: "success/successEdit.css",
  });
});

// Update - Update a success story
module.exports.update = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const updatedStory = await Success.findByIdAndUpdate(id, req.body.success, {
    new: true,
  });
  req.flash("success", "Successfully updated the success story!");
  res.redirect(`/successes/${updatedStory._id}`);
});

// Delete - Remove a success story
module.exports.delete = wrapAsync(async (req, res) => {
  await Success.findByIdAndDelete(req.params.id);
  req.flash("success", "Success story deleted!");
  res.redirect("/successes");
});

// Like or unlike a successPost
module.exports.toggleLike = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const successStory = await Success.findById(id);
  if (!successStory) {
    req.flash("error", "successStory does not exist!");
    return res.redirect(`/successes`);
  }

  const hasLiked = successStory.likes.some((like) => like.equals(userId));
  if (hasLiked) {
    await Success.findByIdAndUpdate(id, { $pull: { likes: userId } });
  } else {
    await Success.findByIdAndUpdate(id, { $push: { likes: userId } });
  }

  res.redirect(`/successes`);
});

// Report a successPost
module.exports.toggleReport = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const successStory = await Success.findById(reviewId);
  if (!review) {
    req.flash("error", "Review does not exist!");
    return res.redirect(`/successes`);
  }

  const hasReported = successStory.reports.some((report) => report.equals(userId));

  if (hasReported) {
    await Success.findByIdAndUpdate(id, { $pull: { reports: userId } });
  } else {
    await Success.findByIdAndUpdate(id, { $push: { reports: userId } });
  }

  req.flash("success", "Review reported!");
  res.redirect(`/successes`);
});

