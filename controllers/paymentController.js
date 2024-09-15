const Payment = require("../models/payment");
const Donation = require("../models/donation");
const User = require("../models/user");
const Notification = require("../models/notification");
const logger = require("../utils/logger");

module.exports.renderPaymentForm = (req, res) => {
  const { donationId } = req.params;
  res.render("donations/paymentForm", { donationId });
};

module.exports.processPayment = async (req, res) => {
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
  const { donationId } = req.params;

  if (!donationId) {
    logger.error("Donation ID is missing.");
    req.flash("error", "Donation ID is missing.");
    return res.redirect("/donations");
  }

  const donorId = req.user._id;

  try {
    logger.info(`Processing payment for donation ID: ${donationId}`);

    // Validate required fields
    if (!fullName || !email || !amount || !paymentMethod) {
      logger.error("Missing required payment details.");
      req.flash("error", "Please provide all required payment details.");
      return res.redirect(`/donations/${donationId}`);
    }

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
      donor: donorId,
    });

    await payment.save();
    logger.info(`Payment saved successfully with ID: ${payment._id}`);

    await Donation.findByIdAndUpdate(donationId, {
      $push: { payments: payment._id },
    });

    await User.findByIdAndUpdate(donorId, {
      $push: { donations: donationId },
      $inc: { points: 10 },
    });

    const donation = await Donation.findById(donationId);

    await Notification.create({
      user: donorId,
      message: `Thank you for your donation of ${amount} to "${donation.title}".`,
      link: `/donations/${donationId}`,
    });

    await Notification.create({
      user: donation.owner._id,
      message: `A donation of ${amount} was made to your donation "${donation.title}".`,
      link: `/donations/${donationId}`,
    });

    logger.info(`Notifications created for donation ID: ${donationId}`);

    req.flash("success", `Payment successful! Transaction ID: ${payment._id}`);
    res.redirect(`/donations/${donationId}`);
  } catch (error) {
    logger.error(`Error processing payment for donation ID: ${donationId} - ${error}`);
    req.flash("error", "Error processing payment. Please try again.");
    res.redirect(`/donations/${donationId}`);
  }
};
