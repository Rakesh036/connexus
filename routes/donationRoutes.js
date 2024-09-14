const express = require("express");
const router = express.Router();
const logger = require("../utils/logger"); // Import the logger
const {
  isDonationOwner,
  validateDonation,
} = require("../middlewares/donation");
const { isLoggedIn } = require("../middlewares/auth");
const {
  index,
  renderNewForm,
  create,
  show,
  renderEditForm,
  update,
  delete: deleteDonation,
  createPayment,
} = require("../controllers/donationController");

// Route to list all donations
router.get("/", (req, res, next) => {
  logger.info("Fetching list of all donations");
  next();
}, index);

// Route to display the form for creating a new donation
router.get("/new", isLoggedIn, (req, res, next) => {
  logger.info(`User ${req.user._id} is requesting the form to create a new donation`);
  next();
}, renderNewForm);

// Route to create a new donation
router.post("/", isLoggedIn, (req, res, next) => {
  logger.info(`User ${req.user._id} is creating a new donation`);
  next();
}, validateDonation, create);

// Route to view a specific donation
router.get("/:id", (req, res, next) => {
  logger.info(`Fetching details for donation ${req.params.id}`);
  next();
}, show);

// Route to display the form for editing a donation
router.get("/:id/edit", isLoggedIn, isDonationOwner, (req, res, next) => {
  logger.info(`User ${req.user._id} is requesting the form to edit donation ${req.params.id}`);
  next();
}, renderEditForm);

// Route to update a specific donation
router.put("/:id", isLoggedIn, isDonationOwner, (req, res, next) => {
  logger.info(`User ${req.user._id} is updating donation ${req.params.id}`);
  next();
}, validateDonation, update);

// Route to delete a specific donation
router.delete("/:id", isLoggedIn, isDonationOwner, (req, res, next) => {
  logger.info(`User ${req.user._id} is attempting to delete donation ${req.params.id}`);
  next();
}, deleteDonation);

// Route to create a payment for a specific donation
router.post("/:id/payments", isLoggedIn, (req, res, next) => {
  logger.info(`User ${req.user._id} is creating a payment for donation ${req.params.id}`);
  next();
}, createPayment);

module.exports = router;
