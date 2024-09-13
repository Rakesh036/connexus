const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");

module.exports.viewConnections = wrapAsync(async (req, res) => {
  const user = await User.findById(req.params.id).populate("connections");
  res.render("users/connections", { user });
});

module.exports.sendConnectionRequest = wrapAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  const otherUser = await User.findById(req.params.id);

  if (!user.connections.includes(otherUser._id)) {
    user.connections.push(otherUser._id);
    otherUser.connections.push(user._id);
    await user.save();
    await otherUser.save();
  }

  res.redirect(`/profile/${req.params.id}`);
});
