const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const logger = require("../utils/logger");

// View User Profile
module.exports.viewProfile = wrapAsync(async (req, res) => {
  const userId = req.params.id;
  try {
    logger.info("Viewing profile for user with ID:", userId);

    const user = await User.findById(userId);
    if (!user) {
      logger.error("User not found with ID:", userId);
      req.flash("error", "User not found");
      return res.redirect("/");
    }

    res.render("users/profile", { user, cssFile: "user/userShow.css" });
  } catch (error) {
    logger.error("Error viewing profile for user with ID:", userId, error);
    req.flash("error", "Error viewing profile");
    res.redirect("/");
  }
});

// Edit User Profile Form
module.exports.editProfileForm = wrapAsync(async (req, res) => {
  logger.info("Rendering edit profile form for user ID:", req.user._id);
  res.render("users/edit", { user: req.user, cssFile: "user/userEdit.css" });
});

// Update User Profile
module.exports.updateProfile = wrapAsync(async (req, res) => {
  const { username, email } = req.body;
  const userId = req.params.id;
  try {
    logger.info("Updating profile for user ID:", userId);

    const user = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true }
    );

    if (!user) {
      logger.error("User not found with ID:", userId);
      req.flash("error", "User not found");
      return res.redirect(`/profile/${userId}`);
    }

    logger.info("Profile updated successfully for user ID:", userId);
    req.flash("success", "Profile updated successfully");
    res.redirect(`/profile/${userId}`);
  } catch (error) {
    logger.error("Error updating profile for user ID:", userId, error);
    req.flash("error", "Error updating profile");
    res.redirect(`/profile/${userId}`);
  }
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
  try {
    logger.info("Searching users with filter:", filter, "Page:", page);

    const users = await User.find(filter).skip(skip).limit(limit);
    const count = await User.countDocuments(filter);

    if (users.length === 0) {
      logger.info("No users found matching search criteria:", filter);
      req.flash("info", "No users found matching your search criteria.");
    }

    res.render("users/search", {
      users,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      cssFile: "user/userSearch.css"
    });
  } catch (error) {
    logger.error("Error searching users with filter:", filter, error);
    req.flash("error", "Error searching users");
    res.redirect("/");
  }
});
