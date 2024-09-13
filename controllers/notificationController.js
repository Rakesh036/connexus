const Notification = require("../models/notification");

module.exports.getNotifications = async (req, res) => {
  try {
    console.log("Notification route called");

    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    const unreadCount = await Notification.countDocuments({
      user: req.user._id,
      isRead: false,
    });

    res.render("notification", { notifications, unreadCount });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving notifications");
  }
};
