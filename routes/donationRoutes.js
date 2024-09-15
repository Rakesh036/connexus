const express = require("express");
const router = express.Router();
const logger = require("../utils/logger")("route"); // Import the logger
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
router.get(
  "/",
  (req, res, next) => {
    logger.info(`======= [ROUTE: List Donations] =======`);
    logger.info(`[ACTION: Fetching List of All Donations]`);
    next();
  },
  index
);

// Route to display the form for creating a new donation
router.get("/new", isLoggedIn, (req, res, next) => {
  logger.info(`======= [ROUTE: New Donation Form] =======`);
  logger.info(`[ACTION: Requesting New Donation Form]`);
  logger.info(
    `User ID: ${req.user._id} is requesting the form to create a new donation`
  );
  next();
}, renderNewForm);

// Route to create a new donation
router.post(
  "/",
  isLoggedIn,
  (req, res, next) => {
    logger.info(`======= [ROUTE: Create Donation] =======`);
    logger.info(`[ACTION: Creating New Donation]`);
    logger.info(`User ID: ${req.user._id} is creating a new donation`);
    next();
  },
  validateDonation,
  create
);

// Route to view a specific donation
router.get(
  "/:id",
  (req, res, next) => {
    logger.info(`======= [ROUTE: View Donation] =======`);
    logger.info(`[ACTION: Fetching Donation Details]`);
    logger.info(`Fetching details for donation ID: ${req.params.id}`);
    next();
  },
  show
);

// Route to display the form for editing a donation
router.get("/:id/edit", isLoggedIn, isDonationOwner, (req, res, next) => {
  logger.info(`======= [ROUTE: Edit Donation Form] =======`);
  logger.info(`[ACTION: Requesting Edit Donation Form]`);
  logger.info(
    `User ID: ${req.user._id} is requesting the form to edit donation ID: ${req.params.id}`
  );
  next();
}, renderEditForm);

// Route to update a specific donation
router.put("/:id", isLoggedIn, isDonationOwner, (req, res, next) => {
  logger.info(`======= [ROUTE: Update Donation] =======`);
  logger.info(`[ACTION: Updating Donation]`);
  logger.info(
    `User ID: ${req.user._id} is updating donation ID: ${req.params.id}`
  );
  next();
}, validateDonation, update);

// Route to delete a specific donation
router.delete("/:id", isLoggedIn, isDonationOwner, (req, res, next) => {
  logger.info(`======= [ROUTE: Delete Donation] =======`);
  logger.info(`[ACTION: Attempting to Delete Donation]`);
  logger.info(
    `User ID: ${req.user._id} is attempting to delete donation ID: ${req.params.id}`
  );
  next();
}, deleteDonation);

// Route to create a payment for a specific donation
router.post("/:id/payments", isLoggedIn, (req, res, next) => {
  logger.info(`======= [ROUTE: Create Payment] =======`);
  logger.info(`[ACTION: Creating Payment for Donation]`);
  logger.info(
    `User ID: ${req.user._id} is creating a payment for donation ID: ${req.params.id}`
  );
  next();
}, createPayment);

module.exports = router;
