const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middlewares/auth");
const { validatePayment } = require("../middlewares/payment");  // Import validatePayment middleware
const PaymentController = require("../controllers/paymentController");

// Route to render payment form
router.get("/:donationId", isLoggedIn, PaymentController.renderPaymentForm);

// Route to handle payment submission
router.post(
  "/:donationId",
  isLoggedIn,
  validatePayment,  // Add validation middleware here
  wrapAsync(PaymentController.processPayment)
);

module.exports = router;
