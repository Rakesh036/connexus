const express = require("express");
const router = express.Router();
const logger = require("../utils/logger")("notificationRoutes");


const notificationController = require("../controllers/notificationController");
const { isLoggedIn } = require("../middlewares/auth");

// Route to get notifications
router.get("/", isLoggedIn, (req, res, next) => {
    logger.info("======= [ROUTE: Get Notifications] =======");
    logger.info("[ACTION: Requesting Notifications]");
    logger.info("User ID: %s is requesting notifications", req.user._id);
    next();
}, notificationController.getNotifications);

module.exports = router;
