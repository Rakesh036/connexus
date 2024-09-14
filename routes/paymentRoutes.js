const express = require("express");
const router = express.Router();
const logger = require("../utils/logger"); // Import the logger

const { isLoggedIn } = require("../middlewares/auth");
const { validatePayment } = require("../middlewares/payment"); // Import validatePayment middleware
const PaymentController = require("../controllers/paymentController");

// Route to render payment form
router.get("/:donationId", isLoggedIn, (req, res, next) => {
    logger.info(`User ${req.user._id} is accessing the payment form for donation ID: ${req.params.donationId}`);
    next();
}, PaymentController.renderPaymentForm);

// Route to handle payment submission
router.post(
  "/:donationId",
  isLoggedIn,
  (req, res, next) => {
    logger.info(`User ${req.user._id} is submitting payment for donation ID: ${req.params.donationId}`);
    next();
  },
  validatePayment, // Add validation middleware here
  (req, res, next) => {
    logger.info(`Payment validation completed for donation ID: ${req.params.donationId}`);
    next();
  },
  PaymentController.processPayment
);

module.exports = router;
