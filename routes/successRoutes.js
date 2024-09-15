const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const logger = require("../utils/logger")('successRoutes'); // Specify label

const {
  isStoryOwner,
  validateSuccess,
} = require("../middlewares/success.js");

const { isLoggedIn } = require("../middlewares/auth.js");
const successController = require("../controllers/successController.js");
const successReviewController = require("../controllers/successReviewController.js");

// Routes
router.get("/", (req, res, next) => {
  logger.info("======= [ROUTE: Fetch List of Success Stories] =======");
  logger.info("[ACTION: Fetching Success Stories]");
  next();
}, successController.index);

router.get("/new", isLoggedIn, (req, res, next) => {
  logger.info("======= [ROUTE: New Success Story Form] =======");
  logger.info("[ACTION: Accessing New Success Story Form]");
  logger.info(`User ID: ${req.user._id} is accessing the new success story form`);
  next();
}, successController.renderNewForm);

router.post(
  "/",
  isLoggedIn,
  (req, res, next) => {
    logger.info("======= [ROUTE: Create Success Story] =======");
    logger.info("[ACTION: Creating New Success Story]");
    logger.info(`User ID: ${req.user._id} is creating a new success story`);
    next();
  },
  validateSuccess,
  upload.single("success[image]"),
  (req, res, next) => {
    logger.info("[ACTION: Success Story Validation and File Upload Completed]");
    next();
  },
  successController.create
);

router.get("/:id", (req, res, next) => {
  logger.info("======= [ROUTE: Fetch Success Story by ID] =======");
  logger.info("[ACTION: Fetching Success Story]");
  logger.info(`Fetching success story with ID ${req.params.id}`);
  next();
}, successController.show);

router.get("/:id/edit", isLoggedIn, isStoryOwner, (req, res, next) => {
  logger.info("======= [ROUTE: Edit Success Story Form] =======");
  logger.info("[ACTION: Accessing Edit Success Story Form]");
  logger.info(`User ID: ${req.user._id} is accessing the edit form for success story ${req.params.id}`);
  next();
}, successController.renderEditForm);

router.put("/:id", isLoggedIn, isStoryOwner, (req, res, next) => {
  logger.info("======= [ROUTE: Update Success Story] =======");
  logger.info("[ACTION: Updating Success Story]");
  logger.info(`User ID: ${req.user._id} is updating success story ${req.params.id}`);
  next();
}, successController.update);

router.delete("/:id", isLoggedIn, isStoryOwner, (req, res, next) => {
  logger.info("======= [ROUTE: Delete Success Story] =======");
  logger.info("[ACTION: Deleting Success Story]");
  logger.info(`User ID: ${req.user._id} is deleting success story ${req.params.id}`);
  next();
}, successController.delete);

router.get("/:id/like", isLoggedIn, (req, res, next) => {
  logger.info("======= [ROUTE: Like Success Story] =======");
  logger.info("[ACTION: Liking Success Story]");
  logger.info(`User ID: ${req.user._id} is liking success story ${req.params.id}`);
  next();
}, successController.toggleLike);

router.get("/:id/report", isLoggedIn, (req, res, next) => {
  logger.info("======= [ROUTE: Report Success Story] =======");
  logger.info("[ACTION: Reporting Success Story]");
  logger.info(`User ID: ${req.user._id} is reporting success story ${req.params.id}`);
  next();
}, successController.toggleReport);

module.exports = router;
