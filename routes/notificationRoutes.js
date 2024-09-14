const express = require("express");
const router = express.Router();
const logger = require("../utils/logger"); // Import the logger

const notificationController = require("../controllers/notificationController");
const { isLoggedIn } = require("../middlewares/auth");

// Route to get notifications
router.get("/", isLoggedIn, (req, res, next) => {
    logger.info(`User ${req.user._id} is requesting notifications`);
    next();
}, notificationController.getNotifications);

module.exports = router;
