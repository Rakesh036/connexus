const Discussion = require("../models/discussion");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");

module.exports.index = wrapAsync(async (req, res) => {
  const { queryType } = req.query;
  let discussions;

  if (queryType) {
    discussions = await Discussion.find({ queryType });
  } else {
    discussions = await Discussion.find({});
  }

  res.render("discussions/index", {
    discussions,
    cssFile: "discussion/discussionIndex.css",
  });
});

module.exports.new = (req, res) => {
  res.render("discussions/new", { cssFile: "discussion/discussionNew.css" });
};

module.exports.create = wrapAsync(async (req, res) => {
  const newDiscussion = new Discussion(req.body.discussion);
  newDiscussion.owner = req.user._id;
  await newDiscussion.save();
  req.flash("success", "New discussion created!");
  res.redirect("/discussions");
});

module.exports.show = wrapAsync(async (req, res) => {
  const discussion = await Discussion.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");
  if (!discussion) {
    req.flash("error", "Discussion does not exist!");
    return res.redirect("/discussions");
  }
  res.render("discussions/show", { discussion, cssFile: "discussion/discussionShow.css" });
});

module.exports.edit = wrapAsync(async (req, res) => {
  const discussion = await Discussion.findById(req.params.id);
  if (!discussion) {
    req.flash("error", "Discussion does not exist!");
    return res.redirect("/discussions");
  }
  res.render("discussions/edit", {
    discussion,
    cssFile: "discussion/discussionedit.css",
  });
});

module.exports.update = wrapAsync(async (req, res) => {
  await Discussion.findByIdAndUpdate(req.params.id, { ...req.body.discussion });
  req.flash("success", "Discussion updated!");
  res.redirect(`/discussions/${req.params.id}`);
});

module.exports.delete = wrapAsync(async (req, res) => {
  await Discussion.findByIdAndDelete(req.params.id);
  req.flash("success", "Discussion deleted!");
  res.redirect("/discussions");
});

module.exports.like = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const discussion = await Discussion.findById(id);

  if (!discussion) {
    req.flash("error", "Discussion does not exist!");
    return res.redirect("/discussions");
  }

  const hasLiked = discussion.likes.some((like) => like.equals(userId));

  if (hasLiked) {
    await Discussion.findByIdAndUpdate(id, { $pull: { likes: userId } });
  } else {
    await Discussion.findByIdAndUpdate(id, { $push: { likes: userId } });
  }

  res.redirect(`/discussions`);
});

module.exports.comment = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const discussion = await Discussion.findById(id);
  if (!discussion) {
    req.flash("error", "Discussion not found");
    return res.redirect("/discussions");
  }
  res.redirect(`/discussions/${id}#comment-section`);
});

module.exports.report = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const discussion = await Discussion.findById(id);

  if (!discussion) {
    req.flash("error", "Discussion does not exist!");
    return res.redirect("/discussions");
  }

  const hasReported = discussion.reports.some((report) =>
    report.equals(userId)
  );

  if (hasReported) {
    await Discussion.findByIdAndUpdate(id, { $pull: { reports: userId } });
  } else {
    await Discussion.findByIdAndUpdate(id, { $push: { reports: userId } });
  }

  req.flash("success", "Discussion reported!");
  res.redirect(`/discussions`);
});
