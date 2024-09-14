const express = require("express");
const router = express.Router();
const logger = require("../utils/logger"); // Import the logger
const { isLoggedIn } = require("../middlewares/auth");
const ConnectionController = require("../controllers/connectionController");

// Route to view connections
router.get(
  "/profile/:id/connections",
  isLoggedIn,
  (req, res, next) => {
    logger.info(`User ${req.user._id} is attempting to view connections for profile ${req.params.id}`);
    next();
  },
  ConnectionController.viewConnections
);

// Route to send a connection request
router.post(
  "/connect/:id",
  isLoggedIn,
  (req, res, next) => {
    logger.info(`User ${req.user._id} is sending a connection request to user ${req.params.id}`);
    next();
  },
  ConnectionController.sendConnectionRequest
);

module.exports = router;
