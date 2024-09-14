const express = require("express");
const router = express.Router();
const logger = require("../utils/logger"); // Import the logger
const usersController = require("../controllers/userController");
const { isLoggedIn, isCurrentUser } = require("../middlewares/auth");

// View User Profile
router.get("/profile/:id", isLoggedIn, (req, res, next) => {
  logger.info(`User ${req.user._id} is viewing profile of user ${req.params.id}`);
  next();
}, usersController.viewProfile);

// Edit User Profile
router.get("/profile/:id/edit", isLoggedIn, isCurrentUser, (req, res, next) => {
  logger.info(`User ${req.user._id} is accessing edit profile form for user ${req.params.id}`);
  next();
}, usersController.editProfileForm);

// Update User Profile
router.put("/profile/:id", isLoggedIn, isCurrentUser, (req, res, next) => {
  logger.info(`User ${req.user._id} is updating profile of user ${req.params.id}`);
  next();
}, usersController.updateProfile);

// Search Users
router.get("/search", (req, res, next) => {
  logger.info(`User ${req.user ? req.user._id : 'guest'} is searching for users`);
  next();
}, usersController.searchUsers);

module.exports = router;
