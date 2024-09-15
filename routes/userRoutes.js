const express = require("express");
const router = express.Router();
const logger = require("../utils/logger")('userRoutes'); // Specify label
const usersController = require("../controllers/userController");
const { isLoggedIn, isCurrentUser } = require("../middlewares/auth");

// View User Profile
router.get("/profile/:id", isLoggedIn, (req, res, next) => {
  logger.info("======= [ROUTE: View User Profile] =======");
  logger.info("[ACTION: Accessing Profile View]");
  logger.info(`User ID: ${req.user._id} is viewing profile of User ID: ${req.params.id}`);
  next();
}, usersController.viewProfile);

// Edit User Profile
router.get("/profile/:id/edit", isLoggedIn, isCurrentUser, (req, res, next) => {
  logger.info("======= [ROUTE: Edit User Profile] =======");
  logger.info("[ACTION: Accessing Edit Profile Form]");
  logger.info(`User ID: ${req.user._id} is accessing edit profile form for User ID: ${req.params.id}`);
  next();
}, usersController.editProfileForm);

// Update User Profile
router.put("/profile/:id", isLoggedIn, isCurrentUser, (req, res, next) => {
  logger.info("======= [ROUTE: Update User Profile] =======");
  logger.info("[ACTION: Updating Profile]");
  logger.info(`User ID: ${req.user._id} is updating profile of User ID: ${req.params.id}`);
  next();
}, usersController.updateProfile);

// Search Users
router.get("/search", (req, res, next) => {
  logger.info("======= [ROUTE: Search Users] =======");
  logger.info("[ACTION: Searching for Users]");
  logger.info(`User ID: ${req.user ? req.user._id : 'guest'} is searching for users`);
  next();
}, usersController.searchUsers);

module.exports = router;
