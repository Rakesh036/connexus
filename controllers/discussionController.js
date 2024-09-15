const Discussion = require("../models/discussion");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const logger = require("../utils/logger");

module.exports.index = wrapAsync(async (req, res) => {
  logger.info("======= [CONTROLLER: Discussion] =======");
  logger.info("[ACTION: Index]");

  const { queryType } = req.query;
  let discussions;

  try {
    if (queryType) {
      logger.info(`Querying discussions by type: ${queryType}`);
      discussions = await Discussion.find({ queryType });
    } else {
      logger.info("Querying all discussions");
      discussions = await Discussion.find({});
    }

    res.render("discussions/index", {
      discussions,
      cssFile: "discussion/discussionIndex.css",
    });

  } catch (err) {
    logger.error(`Error retrieving discussions: ${err}`);
    res.status(500).send("Internal Server Error");
  }

  logger.info("======= [END OF ACTION: Index] =======\n");
});

module.exports.new = (req, res) => {
  logger.info("======= [CONTROLLER: Discussion] =======");
  logger.info("[ACTION: New]");

  res.render("discussions/new", { cssFile: "discussion/discussionNew.css" });

  logger.info("======= [END OF ACTION: New] =======\n");
};

module.exports.create = wrapAsync(async (req, res) => {
  logger.info("======= [CONTROLLER: Discussion] =======");
  logger.info("[ACTION: Create]");
  logger.info(`Request Body: ${JSON.stringify(req.body)}`);

  try {
    const newDiscussion = new Discussion(req.body.discussion);
    newDiscussion.owner = req.user._id;
    await newDiscussion.save();

    logger.info(`New discussion created with ID: ${newDiscussion._id}`);

    req.flash("success", "New discussion created!");
    res.redirect("/discussions");

  } catch (err) {
    logger.error(`Error creating discussion: ${err}`);
    req.flash("error", "Failed to create discussion.");
    res.redirect("/discussions/new");
  }

  logger.info("======= [END OF ACTION: Create] =======\n");
});

module.exports.show = wrapAsync(async (req, res) => {
  logger.info("======= [CONTROLLER: Discussion] =======");
  logger.info("[ACTION: Show]");
  logger.info(`Discussion ID: ${req.params.id}`);

  try {
    const discussion = await Discussion.findById(req.params.id)
      .populate({
        path: "reviews",
        populate: { path: "author" },
      })
      .populate("owner");

    if (!discussion) {
      logger.error("Discussion not found!");
      req.flash("error", "Discussion does not exist!");
      return res.redirect("/discussions");
    }

    logger.info(`Discussion found: ${discussion._id}`);

    res.render("discussions/show", {
      discussion,
      cssFile: "discussion/discussionShow.css",
    });

  } catch (err) {
    logger.error(`Error retrieving discussion: ${err}`);
    req.flash("error", "Failed to retrieve discussion.");
    res.redirect("/discussions");
  }

  logger.info("======= [END OF ACTION: Show] =======\n");
});

module.exports.edit = wrapAsync(async (req, res) => {
  logger.info("======= [CONTROLLER: Discussion] =======");
  logger.info("[ACTION: Edit]");
  logger.info(`Discussion ID: ${req.params.id}`);

  try {
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      logger.error("Discussion not found!");
      req.flash("error", "Discussion does not exist!");
      return res.redirect("/discussions");
    }

    logger.info(`Discussion found for edit: ${discussion._id}`);

    res.render("discussions/edit", {
      discussion,
      cssFile: "discussion/discussionedit.css",
    });

  } catch (err) {
    logger.error(`Error retrieving discussion for edit: ${err}`);
    req.flash("error", "Failed to retrieve discussion for editing.");
    res.redirect("/discussions");
  }

  logger.info("======= [END OF ACTION: Edit] =======\n");
});

module.exports.update = wrapAsync(async (req, res) => {
  logger.info("======= [CONTROLLER: Discussion] =======");
  logger.info("[ACTION: Update]");
  logger.info(`Discussion ID: ${req.params.id}`);

  try {
    await Discussion.findByIdAndUpdate(req.params.id, { ...req.body.discussion });
    req.flash("success", "Discussion updated!");

    logger.info(`Discussion updated: ${req.params.id}`);

    res.redirect(`/discussions/${req.params.id}`);

  } catch (err) {
    logger.error(`Error updating discussion: ${err}`);
    req.flash("error", "Failed to update discussion.");
    res.redirect(`/discussions/${req.params.id}/edit`);
  }

  logger.info("======= [END OF ACTION: Update] =======\n");
});

module.exports.delete = wrapAsync(async (req, res) => {
  logger.info("======= [CONTROLLER: Discussion] =======");
  logger.info("[ACTION: Delete]");
  logger.info(`Discussion ID: ${req.params.id}`);

  try {
    await Discussion.findByIdAndDelete(req.params.id);
    req.flash("success", "Discussion deleted!");

    logger.info(`Discussion deleted: ${req.params.id}`);

    res.redirect("/discussions");

  } catch (err) {
    logger.error(`Error deleting discussion: ${err}`);
    req.flash("error", "Failed to delete discussion.");
    res.redirect("/discussions");
  }

  logger.info("======= [END OF ACTION: Delete] =======\n");
});

module.exports.like = wrapAsync(async (req, res) => {
  logger.info("======= [CONTROLLER: Discussion] =======");
  logger.info("[ACTION: Like]");
  logger.info(`Discussion ID: ${req.params.id}, User ID: ${req.user._id}`);

  try {
    const { id } = req.params;
    const userId = req.user._id;
    const discussion = await Discussion.findById(id);

    if (!discussion) {
      logger.error("Discussion not found!");
      req.flash("error", "Discussion does not exist!");
      return res.redirect("/discussions");
    }

    const hasLiked = discussion.likes.some((like) => like.equals(userId));

    if (hasLiked) {
      logger.info("User already liked this discussion. Removing like.");
      await Discussion.findByIdAndUpdate(id, { $pull: { likes: userId } });
    } else {
      logger.info("Liking the discussion.");
      await Discussion.findByIdAndUpdate(id, { $push: { likes: userId } });
    }

    res.redirect(`/discussions`);

  } catch (err) {
    logger.error(`Error processing like: ${err}`);
    req.flash("error", "Failed to process like.");
    res.redirect(`/discussions`);
  }

  logger.info("======= [END OF ACTION: Like] =======\n");
});

module.exports.comment = wrapAsync(async (req, res) => {
  logger.info("======= [CONTROLLER: Discussion] =======");
  logger.info("[ACTION: Comment]");
  logger.info(`Discussion ID: ${req.params.id}`);

  try {
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      logger.error("Discussion not found!");
      req.flash("error", "Discussion not found");
      return res.redirect("/discussions");
    }

    res.redirect(`/discussions/${req.params.id}#comment-section`);

  } catch (err) {
    logger.error(`Error processing comment: ${err}`);
    req.flash("error", "Failed to process comment.");
    res.redirect(`/discussions/${req.params.id}`);
  }

  logger.info("======= [END OF ACTION: Comment] =======\n");
});

module.exports.report = wrapAsync(async (req, res) => {
  logger.info("======= [CONTROLLER: Discussion] =======");
  logger.info("[ACTION: Report]");
  logger.info(`Discussion ID: ${req.params.id}, User ID: ${req.user._id}`);

  try {
    const { id } = req.params;
    const userId = req.user._id;
    const discussion = await Discussion.findById(id);

    if (!discussion) {
      logger.error("Discussion not found!");
      req.flash("error", "Discussion does not exist!");
      return res.redirect("/discussions");
    }

    const hasReported = discussion.reports.some((report) => report.equals(userId));

    if (hasReported) {
      logger.info("User already reported this discussion. Removing report.");
      await Discussion.findByIdAndUpdate(id, { $pull: { reports: userId } });
    } else {
      logger.info("Reporting the discussion.");
      await Discussion.findByIdAndUpdate(id, { $push: { reports: userId } });
    }

    req.flash("success", "Discussion reported!");
    res.redirect(`/discussions`);

  } catch (err) {
    logger.error(`Error processing report: ${err}`);
    req.flash("error", "Failed to report discussion.");
    res.redirect(`/discussions`);
  }

  logger.info("======= [END OF ACTION: Report] =======\n");
});
