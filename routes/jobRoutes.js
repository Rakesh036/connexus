const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");

const { isLoggedIn } = require("../middlewares/auth");
const { isJobOwner, validateJob } = require("../middlewares/job");

router
  .route("/")
  .get(jobController.index)
  .post(isLoggedIn, validateJob, jobController.create);

router.route("/new").get(isLoggedIn, jobController.renderNewForm);

router
  .route("/:id")
  .get(jobController.show)
  .put(isLoggedIn, isJobOwner, validateJob, jobController.update)
  .delete(isLoggedIn, isJobOwner, jobController.delete);

router
  .route("/:id/edit")
  .get(isLoggedIn, isJobOwner, jobController.renderEditForm);

router.route("/:id/like").get(isLoggedIn, jobController.like);

router.route("/:id/comment").get(isLoggedIn, jobController.comment);

router.route("/:id/report").get(isLoggedIn, jobController.report);

module.exports = router;
