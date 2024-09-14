const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const {
  isStoryOwner,
  validateSuccess,
} = require("../middlewares/success.js");

const { isLoggedIn } = require("../middlewares/auth.js");
const successController = require("../controllers/successController.js");
const successReviewController = require("../controllers/successReviewController.js");

// Routes
router.get("/", successController.index);
router.get("/new", isLoggedIn, successController.renderNewForm);
router.post(
  "/",
  isLoggedIn,
  validateSuccess,
  upload.single("success[image]"),
  successController.create
);
router.get("/:id", successController.show);
router.get("/:id/edit", isLoggedIn, isStoryOwner, successController.renderEditForm);
router.put("/:id", isLoggedIn, isStoryOwner, successController.update);
router.delete("/:id", isLoggedIn, isStoryOwner, successController.delete);
// Like a review
router.get("/:id/like", isLoggedIn, successController.toggleLike);
// Report a review
router.get("/:id/report", isLoggedIn, successController.toggleReport);

module.exports = router;
