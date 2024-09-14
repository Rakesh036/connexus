const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const logger = require("../utils/logger"); // Import the logger

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
  logger.info("User ID: %s is accessing the new success story form", req.user._id);
  next();
}, successController.renderNewForm);

router.post(
  "/",
  isLoggedIn,
  (req, res, next) => {
    logger.info("======= [ROUTE: Create Success Story] =======");
    logger.info("[ACTION: Creating New Success Story]");
    logger.info("User ID: %s is creating a new success story", req.user._id);
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
  logger.info("Fetching success story with ID %s", req.params.id);
  next();
}, successController.show);

router.get("/:id/edit", isLoggedIn, isStoryOwner, (req, res, next) => {
  logger.info("======= [ROUTE: Edit Success Story Form] =======");
  logger.info("[ACTION: Accessing Edit Success Story Form]");
  logger.info("User ID: %s is accessing the edit form for success story %s", req.user._id, req.params.id);
  next();
}, successController.renderEditForm);

router.put("/:id", isLoggedIn, isStoryOwner, (req, res, next) => {
  logger.info("======= [ROUTE: Update Success Story] =======");
  logger.info("[ACTION: Updating Success Story]");
  logger.info("User ID: %s is updating success story %s", req.user._id, req.params.id);
  next();
}, successController.update);

router.delete("/:id", isLoggedIn, isStoryOwner, (req, res, next) => {
  logger.info("======= [ROUTE: Delete Success Story] =======");
  logger.info("[ACTION: Deleting Success Story]");
  logger.info("User ID: %s is deleting success story %s", req.user._id, req.params.id);
  next();
}, successController.delete);

router.get("/:id/like", isLoggedIn, (req, res, next) => {
  logger.info("======= [ROUTE: Like Success Story] =======");
  logger.info("[ACTION: Liking Success Story]");
  logger.info("User ID: %s is liking success story %s", req.user._id, req.params.id);
  next();
}, successController.toggleLike);

router.get("/:id/report", isLoggedIn, (req, res, next) => {
  logger.info("======= [ROUTE: Report Success Story] =======");
  logger.info("[ACTION: Reporting Success Story]");
  logger.info("User ID: %s is reporting success story %s", req.user._id, req.params.id);
  next();
}, successController.toggleReport);

module.exports = router;
