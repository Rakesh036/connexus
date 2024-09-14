const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

const { isLoggedIn } = require("../middlewares/auth");

router.get("/notifications", isLoggedIn, notificationController.getNotifications);

module.exports = router;
