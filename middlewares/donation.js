const  Donation = require("../models/donation");
const { donationSchema } = require("../schemas/donationSchema");
const ExpressError = require("../utils/expressError");

// Middleware to check if the logged-in user is the owner of the donation
module.exports.isDonationOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`Checking ownership for donation ID: ${id}`); // Debugging line

    const donation = await Donation.findById(id);
    
    if (!donation) {
      console.log(`Donation with ID: ${id} not found`); // Debugging line
      req.flash("error", "Donation not found.");
      return res.redirect("/donations");
    }

    console.log(`Donation owner ID: ${donation.owner}, Logged-in user ID: ${req.user._id}`); // Debugging line

    if (!donation.owner.equals(req.user._id)) {
      console.log("Ownership mismatch. User is not authorized."); // Debugging line
      req.flash("error", "You do not have permission to modify this donation.");
      return res.redirect(`/donations/${id}`);
    }

    console.log("Ownership confirmed. Proceeding to the next middleware."); // Debugging line
    next();
  } catch (err) {
    console.log("Error in isDonationOwner middleware:", err); // Debugging line
    next(err);
  }
};

// Middleware to validate donation schema
module.exports.validateDonation = (req, res, next) => {
  try {
    console.log("Validating donation schema..."); // Debugging line
    console.log("before i use === to set true false from string to boolean req.body:", req.body); // Debugging line
    // Convert isEmergency to a boolean
    req.body.donation.isEmergency = req.body.donation.isEmergency === 'true';
    console.log("after that set === req.body:", req.body); // Debugging line
    const { error } = donationSchema.validate(req.body);

    if (error) {
      const msg = error.details.map((el) => el.message).join(",");
      console.log(`Validation error: ${msg}`); // Debugging line
      throw new ExpressError(msg, 400);
    }

    console.log("Donation schema validation passed. Proceeding to the next middleware."); // Debugging line
    next();
  } catch (err) {
    console.log("Error in validateDonation middleware:", err); // Debugging line
    next(err);
  }
};