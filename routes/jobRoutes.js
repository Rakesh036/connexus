const express = require("express");
const router = express.Router();
const logger = require("../utils/logger"); // Import the logger

const jobController = require("../controllers/jobController");
const { isLoggedIn } = require("../middlewares/auth");
const { isJobOwner, validateJob } = require("../middlewares/job");

// Route to get all jobs and create a new job
router
  .route("/")
  .get((req, res, next) => {
    logger.info("Fetching all jobs");
    next();
  }, jobController.index)
  .post(isLoggedIn, (req, res, next) => {
    logger.info(`User ${req.user._id} is creating a new job`);
    logger.debug(`Request body: ${JSON.stringify(req.body)}`);
    next();
  }, validateJob, (req, res, next) => {
    logger.debug("Job validation passed. Controller will handle the request now.");
    next();
  }, jobController.create);

// Route to render the new job form
router.route("/new").get(isLoggedIn, (req, res, next) => {
    logger.info("Rendering new job form");
    next();
}, jobController.renderNewForm);

// Route to show, update, and delete a specific job
router
  .route("/:id")
  .get((req, res, next) => {
    logger.info(`Fetching details for job ID: ${req.params.id}`);
    next();
  }, jobController.show)
  .put(isLoggedIn, isJobOwner, (req, res, next) => {
    logger.info(`User ${req.user._id} is updating job ID: ${req.params.id}`);
    logger.debug(`Request body: ${JSON.stringify(req.body)}`);
    next();
  }, validateJob, (req, res, next) => {
    logger.debug("Job validation passed. Controller will handle the update now.");
    next();
  }, jobController.update)
  .delete(isLoggedIn, isJobOwner, (req, res, next) => {
    logger.info(`User ${req.user._id} is deleting job ID: ${req.params.id}`);
    next();
  }, jobController.delete);

// Route to render the edit form for a specific job
router.route("/:id/edit").get(isLoggedIn, isJobOwner, (req, res, next) => {
    logger.info(`Rendering edit form for job ID: ${req.params.id}`);
    next();
}, jobController.renderEditForm);

// Route to like, comment, and report a job
router.route("/:id/like").get(isLoggedIn, (req, res, next) => {
    logger.info(`User ${req.user._id} is liking job ID: ${req.params.id}`);
    next();
}, jobController.like);

router.route("/:id/comment").get(isLoggedIn, (req, res, next) => {
    logger.info(`User ${req.user._id} is commenting on job ID: ${req.params.id}`);
    next();
}, jobController.comment);

router.route("/:id/report").get(isLoggedIn, (req, res, next) => {
    logger.info(`User ${req.user._id} is reporting job ID: ${req.params.id}`);
    next();
}, jobController.report);

module.exports = router;
