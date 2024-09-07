// routes/payments.js
const express = require("express");
const router = express.Router();
const Payment = require("../models/payment");
const Donation = require("../models/donation");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const donation = require("../models/donation");

// Show payment form for a specific donation
router.get("/:donationId", (req, res) => {
  const { donationId } = req.params;
  console.log(`[DEBUG] [GET /:donationId] Donation ID received: ${donationId}`); // Debugging Donation ID
  res.render("donations/paymentForm", { donationId }); // Pass donationId to the EJS template
});

// Handle payment submission
router.post(
  "/:donationId",
  wrapAsync(async (req, res) => {
    const {
      fullName,
      email,
      eventTitle,
      amount,
      paymentMethod,
      upiId,
      cardNumber,
      expiryDate,
      cvv,
    } = req.body;
    const { donationId } = req.params; // Retrieve donationId from the URL parameters

    console.log(
      `[DEBUG] [POST /:donationId] Donation ID received: ${donationId}`
    ); // Debugging Donation ID
    console.log("[DEBUG] [POST /:donationId] Request body data:", {
      fullName,
      email,
      eventTitle,
      amount,
      paymentMethod,
      upiId,
      cardNumber,
      expiryDate,
      cvv,
    }); // Debugging Request Body Data

    if (!donationId) {
      console.log("[DEBUG] [POST /:donationId] Donation ID missing."); // Debugging missing Donation ID
      req.flash("error", "Donation ID is missing.");
      return res.redirect("/donations");
    }

    const donorId = req.user._id; // Assuming req.user contains the logged-in user's info

    // Create a new payment
    const payment = new Payment({
      fullName,
      email,
      eventTitle,
      amount,
      paymentMethod,
      upiId,
      cardNumber,
      expiryDate,
      cvv,
      donor: donorId, // Save the donor ID
    });

    console.log("[DEBUG] [POST /:donationId] Payment created:", payment); // Debugging Payment Object

    await payment.save();
    console.log(
      `[DEBUG] [POST /:donationId] Payment saved with ID: ${payment._id}`
    ); // Debugging Payment Save

    // Update the related donation with the payment reference
    await Donation.findByIdAndUpdate(donationId, {
      $push: { transactions: payment._id },
    });

    await User.findByIdAndUpdate(payment.donor, {
      $push: { donations: donationId },
      $inc: { point: 10 },
    });

    console.log(
      `[DEBUG] [POST /:donationId] Donation updated with payment reference: ${payment._id}`
    ); // Debugging Donation Update

    req.flash("success", `Payment successful! Transaction ID: ${payment._id}`);
    res.redirect(`/donations/${donationId}`); // Redirect to the donation details page
  })
);

module.exports = router;
