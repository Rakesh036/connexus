const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");

// View Connections
router.get(
  "/profile/:id/connections",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const user = await User.findById(req.params.id).populate("connections");
    res.render("users/connections", { user });
  })
);

// Send Connection Request
router.post(
  "/connect/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const user = await User.findById(req.user._id);
    const otherUser = await User.findById(req.params.id);

    if (!user.connections.includes(otherUser._id)) {
      user.connections.push(otherUser._id);
      otherUser.connections.push(user._id);
      await user.save();
      await otherUser.save();
    }

    res.redirect(`/profile/${req.params.id}`);
  })
);

module.exports = router;
