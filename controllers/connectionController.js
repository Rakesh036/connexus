const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const logger = require("../utils/logger");

module.exports.viewConnections = wrapAsync(async (req, res) => {
  logger.info("======= [CONTROLLER: User] =======");
  logger.info("[ACTION: View Connections]");
  logger.info(`User ID: ${req.params.id}`);

  try {
    const user = await User.findById(req.params.id).populate("connections");

    if (!user) {
      logger.error("User not found");
      return res.status(404).send("User not found");
    }

    logger.info(`Connections found for User: ${user._id}, Count: ${user.connections.length}`);

    res.render("users/connections", { user });

  } catch (err) {
    logger.error("Error retrieving user connections:", err);
    res.status(500).send("Internal Server Error");
  }

  logger.info("======= [END OF ACTION: View Connections] =======\n");
});

module.exports.sendConnectionRequest = wrapAsync(async (req, res) => {
  logger.info("======= [CONTROLLER: User] =======");
  logger.info("[ACTION: Send Connection Request]");
  logger.info(`Request from User: ${req.user._id} to User: ${req.params.id}`);

  try {
    const user = await User.findById(req.user._id);
    const otherUser = await User.findById(req.params.id);

    if (!user || !otherUser) {
      logger.error("User or Other User not found");
      return res.status(404).send("User not found");
    }

    if (!user.connections.includes(otherUser._id)) {
      logger.info("Users not connected yet. Sending connection request...");
      
      user.connections.push(otherUser._id);
      otherUser.connections.push(user._id);

      await user.save();
      await otherUser.save();

      logger.info("Connection request successful.");
    } else {
      logger.info("Users are already connected.");
    }

    res.redirect(`/profile/${req.params.id}`);

  } catch (err) {
    logger.error("Error sending connection request:", err);
    res.status(500).send("Internal Server Error");
  }

  logger.info("======= [END OF ACTION: Send Connection Request] =======\n");
});
