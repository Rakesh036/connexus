const Notification = require("../models/notification");

module.exports.getNotifications = async (req, res) => {
  try {
    console.log("Notification route called");

    // Check if the user is available in the request object
    if (!req.user || !req.user._id) {
      console.error("User not found in request");
      return res.status(400).send("User not authenticated");
    }

    // Debugging user ID
    console.log("Fetching notifications for user ID:", req.user._id);

    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    // Debugging the retrieved notifications
    console.log("Notifications retrieved:", notifications.length);

    const unreadCount = await Notification.countDocuments({
      user: req.user._id,
      isRead: false,
    });

    // Debugging unread notifications count
    console.log("Unread notifications count:", unreadCount);

    res.render("notification", { 
      notifications, 
      unreadCount, 
      cssFile: "notification/notificationIndex.css" 
    });
    
    // Debugging successful render
    console.log("Notification page rendered successfully");

  } catch (error) {
    // Detailed error message
    console.error("Error retrieving notifications:", error);
    res.status(500).send("Error retrieving notifications");
  }
};
