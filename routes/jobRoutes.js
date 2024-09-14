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
    logger.info("======= [ROUTE: Get All Jobs] =======");
    logger.info("[ACTION: Fetching All Jobs]");
    next();
  }, jobController.index)
  .post(isLoggedIn, (req, res, next) => {
    logger.info("======= [ROUTE: Create New Job] =======");
    logger.info("[ACTION: Creating New Job]");
    logger.info("User ID: %s is creating a new job", req.user._id);
    logger.debug("Request body: %s", JSON.stringify(req.body));
    next();
  }, validateJob, (req, res, next) => {
    logger.debug("Job validation passed. Proceeding to create the job.");
    next();
  }, jobController.create);

// Route to render the new job form
router.route("/new").get(isLoggedIn, (req, res, next) => {
    logger.info("======= [ROUTE: Render New Job Form] =======");
    logger.info("[ACTION: Rendering New Job Form]");
    next();
}, jobController.renderNewForm);

// Route to show, update, and delete a specific job
router
  .route("/:id")
  .get((req, res, next) => {
    logger.info("======= [ROUTE: Show Job Details] =======");
    logger.info("[ACTION: Fetching Job Details]");
    logger.info("Job ID: %s", req.params.id);
    next();
  }, jobController.show)
  .put(isLoggedIn, isJobOwner, (req, res, next) => {
    logger.info("======= [ROUTE: Update Job] =======");
    logger.info("[ACTION: Updating Job]");
    logger.info("User ID: %s is updating job ID: %s", req.user._id, req.params.id);
    logger.debug("Request body: %s", JSON.stringify(req.body));
    next();
  }, validateJob, (req, res, next) => {
    logger.debug("Job validation passed. Proceeding to update the job.");
    next();
  }, jobController.update)
  .delete(isLoggedIn, isJobOwner, (req, res, next) => {
    logger.info("======= [ROUTE: Delete Job] =======");
    logger.info("[ACTION: Deleting Job]");
    logger.info("User ID: %s is deleting job ID: %s", req.user._id, req.params.id);
    next();
  }, jobController.delete);

// Route to render the edit form for a specific job
router.route("/:id/edit").get(isLoggedIn, isJobOwner, (req, res, next) => {
    logger.info("======= [ROUTE: Render Edit Job Form] =======");
    logger.info("[ACTION: Rendering Edit Form]");
    logger.info("User ID: %s is requesting to edit job ID: %s", req.user._id, req.params.id);
    next();
}, jobController.renderEditForm);

// Route to like, comment, and report a job
router.route("/:id/like").get(isLoggedIn, (req, res, next) => {
    logger.info("======= [ROUTE: Like Job] =======");
    logger.info("[ACTION: Liking Job]");
    logger.info("User ID: %s is liking job ID: %s", req.user._id, req.params.id);
    next();
}, jobController.like);

router.route("/:id/comment").get(isLoggedIn, (req, res, next) => {
    logger.info("======= [ROUTE: Comment on Job] =======");
    logger.info("[ACTION: Commenting on Job]");
    logger.info("User ID: %s is commenting on job ID: %s", req.user._id, req.params.id);
    next();
}, jobController.comment);

router.route("/:id/report").get(isLoggedIn, (req, res, next) => {
    logger.info("======= [ROUTE: Report Job] =======");
    logger.info("[ACTION: Reporting Job]");
    logger.info("User ID: %s is reporting job ID: %s", req.user._id, req.params.id);
    next();
}, jobController.report);

module.exports = router;
