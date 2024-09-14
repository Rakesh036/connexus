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
    logger.info("======= [ROUTE: View Connections] =======");
    logger.info("[ACTION: Viewing Connections]");
    logger.info("User ID: %s is attempting to view connections for profile ID: %s", req.user._id, req.params.id);
    next();
  },
  ConnectionController.viewConnections
);

// Route to send a connection request
router.post(
  "/connect/:id",
  isLoggedIn,
  (req, res, next) => {
    logger.info("======= [ROUTE: Send Connection Request] =======");
    logger.info("[ACTION: Sending Connection Request]");
    logger.info("User ID: %s is sending a connection request to user ID: %s", req.user._id, req.params.id);
    next();
  },
  ConnectionController.sendConnectionRequest
);

module.exports = router;
