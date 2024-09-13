const express = require("express");
const router = express.Router();
const discussionController = require("../controllers/discussionController");
const { isLoggedIn } = require("../middlewares/auth");
const { isDiscussionOwner, validateDiscussion } = require("../middlewares/discussion");

router
  .route("/")
  .get(discussionController.index)
  .post(isLoggedIn, validateDiscussion, discussionController.create);

router
  .route("/new")
  .get(isLoggedIn, discussionController.new);

router
  .route("/:id")
  .get(discussionController.show)
  .put(isLoggedIn, isDiscussionOwner, validateDiscussion, discussionController.update)
  .delete(isLoggedIn, isDiscussionOwner, discussionController.delete);

router
  .route("/:id/edit")
  .get(isLoggedIn, isDiscussionOwner, discussionController.edit);

router
  .route("/:id/like")
  .get(isLoggedIn, discussionController.like);

router
  .route("/:id/comment")
  .get(isLoggedIn, discussionController.comment);

router
  .route("/:id/report")
  .get(isLoggedIn, discussionController.report);

module.exports = router;
