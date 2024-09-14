const express = require("express");
const router = express.Router();
const logger = require("../utils/logger"); // Import the logger
const discussionController = require("../controllers/discussionController");
const { isLoggedIn } = require("../middlewares/auth");
const { isDiscussionOwner, validateDiscussion } = require("../middlewares/discussion");

// Route to list discussions and create a new discussion
router
  .route("/")
  .get(discussionController.index)
  .post(
    isLoggedIn,
    (req, res, next) => {
      logger.info(`User ${req.user._id} is creating a new discussion`);
      next();
    },
    validateDiscussion,
    discussionController.create
  );

// Route to display the form for creating a new discussion
router
  .route("/new")
  .get(
    isLoggedIn,
    (req, res, next) => {
      logger.info(`User ${req.user._id} is requesting the form to create a new discussion`);
      next();
    },
    discussionController.new
  );

// Routes for specific discussion actions
router
  .route("/:id")
  .get(
    (req, res, next) => {
      logger.info(`Fetching details for discussion ${req.params.id}`);
      next();
    },
    discussionController.show
  )
  .put(
    isLoggedIn,
    (req, res, next) => {
      logger.info(`User ${req.user._id} is attempting to update discussion ${req.params.id}`);
      next();
    },
    isDiscussionOwner,
    validateDiscussion,
    discussionController.update
  )
  .delete(
    isLoggedIn,
    (req, res, next) => {
      logger.info(`User ${req.user._id} is attempting to delete discussion ${req.params.id}`);
      next();
    },
    isDiscussionOwner,
    discussionController.delete
  );

// Route to display the form for editing a discussion
router
  .route("/:id/edit")
  .get(
    isLoggedIn,
    (req, res, next) => {
      logger.info(`User ${req.user._id} is requesting the form to edit discussion ${req.params.id}`);
      next();
    },
    isDiscussionOwner,
    discussionController.edit
  );

// Routes for liking, commenting, and reporting discussions
router
  .route("/:id/like")
  .get(
    isLoggedIn,
    (req, res, next) => {
      logger.info(`User ${req.user._id} is liking discussion ${req.params.id}`);
      next();
    },
    discussionController.like
  );

router
  .route("/:id/comment")
  .get(
    isLoggedIn,
    (req, res, next) => {
      logger.info(`User ${req.user._id} is commenting on discussion ${req.params.id}`);
      next();
    },
    discussionController.comment
  );

router
  .route("/:id/report")
  .get(
    isLoggedIn,
    (req, res, next) => {
      logger.info(`User ${req.user._id} is reporting discussion ${req.params.id}`);
      next();
    },
    discussionController.report
  );

module.exports = router;
