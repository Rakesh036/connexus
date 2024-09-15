const Notification = require("../models/notification");
const logger = require("../utils/logger")('notificationController');

module.exports.getNotifications = async (req, res) => {
  logger.info("Notification route called");

  // Check if the user is available in the request object
  if (!req.user || !req.user._id) {
    logger.error("User not found in request");
    return res.status(400).send("User not authenticated");
  }

  // Debugging user ID
  logger.info("Fetching notifications for user ID:", req.user._id);

  try {
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    // Debugging the retrieved notifications
    logger.info("Notifications retrieved:", notifications.length);

    const unreadCount = await Notification.countDocuments({
      user: req.user._id,
      isRead: false,
    });

    // Debugging unread notifications count
    logger.info("Unread notifications count:", unreadCount);

    res.render("notification", { 
      notifications, 
      unreadCount, 
      cssFile: "notification/notificationIndex.css" 
    });

    // Debugging successful render
    logger.info("Notification page rendered successfully");

  } catch (error) {
    // Detailed error message
    logger.error("Error retrieving notifications:", error);
    res.status(500).send("Error retrieving notifications");
  }
};
