const express = require("express");
const router = express.Router();
const {
  isLoggedIn,
  isDonationOwner,
  validateDonation,
  validateTransaction,
} = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");
const { Donation, Transaction } = require("../models/donation");

// Index route - Show all donations
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const donations = await Donation.find({}).populate("owner transactions");
    res.render("donations/index.ejs", { donations });
  })
);

// New route - Form for creating a new donation
router.get("/new", (req, res) => {
  res.render("donations/new.ejs");
});
// Create route - Add a new donation
router.post(
  "/",
  isLoggedIn,
  validateDonation,
  wrapAsync(async (req, res) => {
    const newDonation = new Donation(req.body.donation);
    newDonation.owner = req.user._id; // Set the owner to the current user's ID
    await newDonation.save();
    req.flash("success", "New donation created!");
    res.redirect("/donations");
  })
);

// Show route - Show details for a single donation
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const donation = await Donation.findById(req.params.id)
      .populate({
        path: "transactions",
        populate: {
          path: "donor",
        },
      })
      .populate("owner");
    if (!donation) {
      req.flash("error", "Donation does not exist!");
      return res.redirect("/donations");
    }
    res.render("donations/show.ejs", { donation });
  })
);

// Edit route - Form for editing an existing donation
router.get(
  "/:id/edit",
  isLoggedIn,
  isDonationOwner,
  wrapAsync(async (req, res) => {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      req.flash("error", "Donation does not exist!");
      return res.redirect("/donations");
    }
    res.render("donations/edit.ejs", { donation });
  })
);

// Update route - Update a specific donation
router.put(
  "/:id",
  isLoggedIn,
  isDonationOwner,
  validateDonation,
  wrapAsync(async (req, res) => {
    await Donation.findByIdAndUpdate(req.params.id, { ...req.body.donation });
    req.flash("success", "Donation updated!");
    res.redirect(`/donations/${req.params.id}`);
  })
);

// Delete route - Delete a specific donation
router.delete(
  "/:id",
  isLoggedIn,
  isDonationOwner,
  wrapAsync(async (req, res) => {
    await Donation.findByIdAndDelete(req.params.id);
    req.flash("success", "Donation deleted!");
    res.redirect("/donations");
  })
);

// Create a new transaction for a donation
router.post(
  "/:id/transactions",
  isLoggedIn,
  validateTransaction,
  wrapAsync(async (req, res) => {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      req.flash("error", "Donation not found");
      return res.redirect("/donations");
    }

    const transaction = new Transaction(req.body.transaction);
    transaction.donor = req.user._id;
    transaction.donation = donation._id;
    await transaction.save();

    donation.transactions.push(transaction);
    await donation.save();

    req.flash("success", "Thank you for your donation!");
    res.redirect(`/donations/${req.params.id}`);
  })
);

module.exports = router;
