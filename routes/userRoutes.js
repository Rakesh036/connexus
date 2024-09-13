const express = require("express");
const router = express.Router();
const usersController = require("../controllers/userController");
const { isLoggedIn, isCurrentUser } = require("../middlewares/auth");

// View User Profile
router.get("/profile/:id", isLoggedIn, usersController.viewProfile);

// Edit User Profile
router.get("/profile/:id/edit", isLoggedIn, isCurrentUser, usersController.editProfileForm);

// Update User Profile
router.put("/profile/:id", isLoggedIn, isCurrentUser, usersController.updateProfile);

// Search Users
router.get("/search", usersController.searchUsers);

module.exports = router;
