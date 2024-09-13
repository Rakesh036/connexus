const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/auth");
const ConnectionController = require("../controllers/connectionController");

// Route to view connections
router.get(
  "/profile/:id/connections",
  isLoggedIn,
  ConnectionController.viewConnections
);

// Route to send a connection request
router.post(
  "/connect/:id",
  isLoggedIn,
  ConnectionController.sendConnectionRequest
);

module.exports = router;
