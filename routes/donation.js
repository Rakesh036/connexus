const express = require("express");
const router = express.Router();
const {
  isLoggedIn,
  isDonationOwner,
  validateDonation,
  validateTransaction,
} = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");
const Donation = require("../models/donation.js");

// Index route - Show all donations
router.get(
  "/",
  (req, res, next) => {
    console.log("donation route call ");
    console.log("Filter query: ", req.query.filter); // Debugging filter query
    console.log("Donation model: ", Donation); // Debugging model import
    next();
  },
  wrapAsync(async (req, res) => {
    try {
      const filter = {};
      if (req.query.filter === "emergency") {
        filter.isEmergency = true;
      }

      console.log("Filter to apply: ", filter); // Debugging filter applied

      const donations = await Donation.find(filter)
        .populate({
          path: "transactions",
          populate: {
            path: "donor", // Populate the 'donor' field inside 'transactions'
            model: "User",
          },
        })
        .populate("owner");

      res.render("donations/index.ejs", {
        donations,
        cssFile: "donateIndex.css",
      });
    } catch (err) {
      console.error(err);
      req.flash("error", "Unable to retrieve donations at the moment.");
      res.redirect("/");
    }
  })
);

// New route - Form for creating a new donation
router.get("/new", isLoggedIn, (req, res) => {
  res.render("donations/new.ejs", { cssFile: "donateNew.css" });
});

// Create route - Add a new donation
router.post(
  "/",
  isLoggedIn,
  validateDonation,
  wrapAsync(async (req, res) => {
    const newDonation = new Donation(req.body.donation);

    if (!req.body.donation.isEmergency) {
      newDonation.isEmergency = false;
    }

    newDonation.owner = req.user._id;
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
      req.flash("error", "Donation not found.");
      return res.redirect("/donations");
    }
    res.render("donations/show.ejs", { donation, cssFile: "donateShow.css" });
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
      req.flash("error", "Donation not found.");
      return res.redirect("/donations");
    }
    res.render("donations/edit.ejs", { donation, cssFile: "donateEdit.css" });
  })
);

// Update route - Update a specific donation
router.put(
  "/:id",
  isLoggedIn,
  isDonationOwner,
  validateDonation,
  wrapAsync(async (req, res) => {
    const donation = await Donation.findByIdAndUpdate(req.params.id, {
      ...req.body.donation,
    });
    if (!donation) {
      req.flash("error", "Donation not found.");
      return res.redirect("/donations");
    }
    req.flash("success", "Donation updated successfully.");
    res.redirect(`/donations/${req.params.id}`);
  })
);

// Delete route - Delete a specific donation
router.delete(
  "/:id",
  isLoggedIn,
  isDonationOwner,
  wrapAsync(async (req, res) => {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if (!donation) {
      req.flash("error", "Donation not found.");
      return res.redirect("/donations");
    }
    req.flash("success", "Donation deleted successfully.");
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
      req.flash("error", "Donation not found.");
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
