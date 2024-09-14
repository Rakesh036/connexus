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
  logger.info("Fetching list of success stories");
  next();
}, successController.index);

router.get("/new", isLoggedIn, (req, res, next) => {
  logger.info(`User ${req.user._id} is accessing new success story form`);
  next();
}, successController.renderNewForm);

router.post(
  "/",
  isLoggedIn,
  (req, res, next) => {
    logger.info(`User ${req.user._id} is creating a new success story`);
    next();
  },
  validateSuccess,
  upload.single("success[image]"),
  (req, res, next) => {
    logger.info(`Success story validation and file upload completed`);
    next();
  },
  successController.create
);

router.get("/:id", (req, res, next) => {
  logger.info(`Fetching success story with ID ${req.params.id}`);
  next();
}, successController.show);

router.get("/:id/edit", isLoggedIn, isStoryOwner, (req, res, next) => {
  logger.info(`User ${req.user._id} is accessing edit form for success story ${req.params.id}`);
  next();
}, successController.renderEditForm);

router.put("/:id", isLoggedIn, isStoryOwner, (req, res, next) => {
  logger.info(`User ${req.user._id} is updating success story ${req.params.id}`);
  next();
}, successController.update);

router.delete("/:id", isLoggedIn, isStoryOwner, (req, res, next) => {
  logger.info(`User ${req.user._id} is deleting success story ${req.params.id}`);
  next();
}, successController.delete);

router.get("/:id/like", isLoggedIn, (req, res, next) => {
  logger.info(`User ${req.user._id} is liking success story ${req.params.id}`);
  next();
}, successController.toggleLike);

router.get("/:id/report", isLoggedIn, (req, res, next) => {
  logger.info(`User ${req.user._id} is reporting success story ${req.params.id}`);
  next();
}, successController.toggleReport);

module.exports = router;
