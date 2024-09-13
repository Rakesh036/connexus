const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");

// View User Profile
module.exports.viewProfile = wrapAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    req.flash("error", "User not found");
    return res.redirect("/");
  }
  res.render("users/profile", { user, cssFile: "userShow.css" });
});

// Edit User Profile Form
module.exports.editProfileForm = wrapAsync(async (req, res) => {
  res.render("users/edit", { user: req.user, cssFile: "userEdit.css" });
});

// Update User Profile
module.exports.updateProfile = wrapAsync(async (req, res) => {
  const { username, email } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { username, email }, { new: true });
  req.flash("success", "Profile updated successfully");
  res.redirect(`/profile/${user._id}`);
});

// Search Users
module.exports.searchUsers = wrapAsync(async (req, res) => {
  const { location, department, year, interests, page = 1 } = req.query;
  let filter = {};
  if (location) filter.location = location;
  if (department) filter.department = department;
  if (year) filter.year = year;
  if (interests) filter.interests = { $in: interests };

  const limit = 10; // Results per page
  const skip = (page - 1) * limit;
  const users = await User.find(filter).skip(skip).limit(limit);
  const count = await User.countDocuments(filter);

  if (users.length === 0) {
    req.flash("info", "No users found matching your search criteria.");
  }

  res.render("users/search", {
    users,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
  });
});
