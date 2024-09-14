const express = require("express");
const router = express.Router();
const logger = require("../utils/logger"); // Import the logger

const { isLoggedIn } = require("../middlewares/auth");
const { validatePayment } = require("../middlewares/payment"); // Import validatePayment middleware
const PaymentController = require("../controllers/paymentController");

// Route to render payment form
router.get("/:donationId", isLoggedIn, (req, res, next) => {
    logger.info("======= [ROUTE: Render Payment Form] =======");
    logger.info("[ACTION: Accessing Payment Form]");
    logger.info("User ID: %s is accessing the payment form for donation ID: %s", req.user._id, req.params.donationId);
    next();
}, PaymentController.renderPaymentForm);

// Route to handle payment submission
router.post(
  "/:donationId",
  isLoggedIn,
  (req, res, next) => {
    logger.info("======= [ROUTE: Handle Payment Submission] =======");
    logger.info("[ACTION: Submitting Payment]");
    logger.info("User ID: %s is submitting payment for donation ID: %s", req.user._id, req.params.donationId);
    next();
  },
  validatePayment, // Add validation middleware here
  (req, res, next) => {
    logger.info("[ACTION: Payment Validation Completed]");
    logger.info("Payment validation completed for donation ID: %s", req.params.donationId);
    next();
  },
  PaymentController.processPayment
);

module.exports = router;
