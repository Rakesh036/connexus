const express = require("express");
const router = express.Router();
const { isLoggedIn, isCurrentUser } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");



// View User Profile
router.get(
  "/profile/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/");
    }
    res.render("users/profile", { user, cssFile: "userShow.css" });
  })
);

// Edit User Profile
router.get("/profile/:id/edit", isLoggedIn, isCurrentUser, (req, res) => {
  res.render("users/edit", { user: req.user, cssFile: "userEdit.css" });
});

router.put(
  "/profile/:id",
  isLoggedIn,
  isCurrentUser,
  wrapAsync(async (req, res) => {
    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email },
      { new: true }
    );
    req.flash("success", "Profile updated successfully");
    res.redirect(`/profile/${user._id}`);
  })
);

// Search Users
router.get(
  "/search",
  wrapAsync(async (req, res) => {
    const { location, department, year, interests } = req.query;
    let filter = {};
    if (location) filter.location = location;
    if (department) filter.department = department;
    if (year) filter.year = year;
    if (interests) filter.interests = { $in: interests };
    const users = await User.find(filter);
    res.render("users/search", { users });
  })
);

module.exports = router;
