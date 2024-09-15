const Donation = require("../models/donation");
const { donationSchema } = require("../schemas/donationSchema");
const ExpressError = require("../utils/expressError");
const logger = require("../utils/logger")('donationMiddleware'); // Specify label

// Middleware to check if the logged-in user is the owner of the donation
module.exports.isDonationOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    logger.info(`Checking ownership for donation ID: ${id}`);

    const donation = await Donation.findById(id);
    
    if (!donation) {
      logger.warn(`Donation with ID: ${id} not found`);
      req.flash("error", "Donation not found.");
      return res.redirect("/donations");
    }

    logger.info(`Donation owner ID: ${donation.owner}, Logged-in user ID: ${req.user._id}`);

    if (!donation.owner.equals(req.user._id)) {
      logger.warn("Ownership mismatch. User is not authorized.");
      req.flash("error", "You do not have permission to modify this donation.");
      return res.redirect(`/donations/${id}`);
    }

    logger.info("Ownership confirmed. Proceeding to the next middleware.");
    next();
  } catch (err) {
    logger.error(`Error in isDonationOwner middleware: ${err.message}`);
    next(err);
  }
};

// Middleware to validate donation schema
module.exports.validateDonation = (req, res, next) => {
  try {
    logger.info("Validating donation schema...");
    logger.debug(`Request body before conversion: ${JSON.stringify(req.body)}`);

    // Convert isEmergency to a boolean
    req.body.donation.isEmergency = req.body.donation.isEmergency === 'true';
    logger.debug(`Request body after conversion: ${JSON.stringify(req.body)}`);

    const { error } = donationSchema.validate(req.body);

    if (error) {
      const msg = error.details.map((el) => el.message).join(",");
      logger.error(`Validation error: ${msg}`);
      throw new ExpressError(msg, 400);
    }

    logger.info("Donation schema validation passed. Proceeding to the next middleware.");
    next();
  } catch (err) {
    logger.error(`Error in validateDonation middleware: ${err.message}`);
    next(err);
  }
};
