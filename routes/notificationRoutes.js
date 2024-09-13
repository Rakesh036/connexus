const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

const { isLoggedIn } = require("../middlewares/auth");
const wrapAsync = require("../utils/wrapAsync");

router.get("/notifications", isLoggedIn, wrapAsync(notificationController.getNotifications));

module.exports = router;
