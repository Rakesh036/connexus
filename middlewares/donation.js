const { Donation } = require("../models/donation");
const { donationSchema } = require("../schemas/donationSchema");
const ExpressError = require("../utils/expressError");

// Middleware to check if the logged-in user is the owner of the donation
module.exports.isDonationOwner = async (req, res, next) => {
  const { id } = req.params;
  const donation = await Donation.findById(id);
  if (donation && !donation.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to modify this donation.");
    return res.redirect(`/donations/${id}`);
  }
  next();
};

// Middleware to validate donation schema
module.exports.validateDonation = (req, res, next) => {
  const { error } = donationSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  }
  next();
};