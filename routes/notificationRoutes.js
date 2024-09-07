const express = require("express");
const router = express.Router();
const Notification = require("../models/notification"); // Import the Notification model

// Route to get notifications for the logged-in user
router.get("/notifications", async (req, res) => {
  try {
    console.log("notification routes called");

    const notifications = await Notification.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    // Find the count of unread notifications for the logged-in user
    const unreadCount = await Notification.countDocuments({
      user: req.user._id,
      isRead: false,
    });

    res.render("notification", { notifications, unreadCount });
  } catch (error) {
    res.status(500).send("Error retrieving notifications");
  }
});

module.exports = router;
