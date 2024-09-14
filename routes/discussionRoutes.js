const express = require("express");
const router = express.Router();
const logger = require("../utils/logger"); // Import the logger
const discussionController = require("../controllers/discussionController");
const { isLoggedIn } = require("../middlewares/auth");
const { isDiscussionOwner, validateDiscussion } = require("../middlewares/discussion");

// Route to list discussions and create a new discussion
router
  .route("/")
  .get((req, res, next) => {
    logger.info("======= [ROUTE: List Discussions] =======");
    logger.info("[ACTION: Fetching List of Discussions]");
    next();
  }, discussionController.index)
  .post(
    isLoggedIn,
    (req, res, next) => {
      logger.info("======= [ROUTE: Create Discussion] =======");
      logger.info("[ACTION: Creating New Discussion]");
      logger.info("User ID: %s is creating a new discussion", req.user._id);
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
      logger.info("======= [ROUTE: New Discussion Form] =======");
      logger.info("[ACTION: Requesting New Discussion Form]");
      logger.info("User ID: %s is requesting the form to create a new discussion", req.user._id);
      next();
    },
    discussionController.new
  );

// Routes for specific discussion actions
router
  .route("/:id")
  .get(
    (req, res, next) => {
      logger.info("======= [ROUTE: View Discussion] =======");
      logger.info("[ACTION: Fetching Discussion Details]");
      logger.info("Fetching details for discussion ID: %s", req.params.id);
      next();
    },
    discussionController.show
  )
  .put(
    isLoggedIn,
    (req, res, next) => {
      logger.info("======= [ROUTE: Update Discussion] =======");
      logger.info("[ACTION: Attempting to Update Discussion]");
      logger.info("User ID: %s is attempting to update discussion ID: %s", req.user._id, req.params.id);
      next();
    },
    isDiscussionOwner,
    validateDiscussion,
    discussionController.update
  )
  .delete(
    isLoggedIn,
    (req, res, next) => {
      logger.info("======= [ROUTE: Delete Discussion] =======");
      logger.info("[ACTION: Attempting to Delete Discussion]");
      logger.info("User ID: %s is attempting to delete discussion ID: %s", req.user._id, req.params.id);
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
      logger.info("======= [ROUTE: Edit Discussion Form] =======");
      logger.info("[ACTION: Requesting Edit Discussion Form]");
      logger.info("User ID: %s is requesting the form to edit discussion ID: %s", req.user._id, req.params.id);
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
      logger.info("======= [ROUTE: Like Discussion] =======");
      logger.info("[ACTION: Liking Discussion]");
      logger.info("User ID: %s is liking discussion ID: %s", req.user._id, req.params.id);
      next();
    },
    discussionController.like
  );

router
  .route("/:id/comment")
  .get(
    isLoggedIn,
    (req, res, next) => {
      logger.info("======= [ROUTE: Comment on Discussion] =======");
      logger.info("[ACTION: Commenting on Discussion]");
      logger.info("User ID: %s is commenting on discussion ID: %s", req.user._id, req.params.id);
      next();
    },
    discussionController.comment
  );

router
  .route("/:id/report")
  .get(
    isLoggedIn,
    (req, res, next) => {
      logger.info("======= [ROUTE: Report Discussion] =======");
      logger.info("[ACTION: Reporting Discussion]");
      logger.info("User ID: %s is reporting discussion ID: %s", req.user._id, req.params.id);
      next();
    },
    discussionController.report
  );

module.exports = router;
