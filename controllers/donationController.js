const Donation = require("../models/donation");
const Payment = require("../models/payment");
const wrapAsync = require("../utils/wrapAsync");

module.exports.index = wrapAsync(async (req, res) => {
  try {
    console.log("Fetching donations..."); // Debugging line
    const filter =
      req.query.filter === "emergency" ? { isEmergency: true } : {};
    const donations = await Donation.find(filter)
      .populate({
        path: "payments",
        populate: {
          path: "donor",
          model: "User",
        },
      })
      .populate("owner");

    console.log(`Found ${donations.length} donations.`); // Debugging line

    res.render("donations/index.ejs", {
      donations,
      cssFile: "donate/donateIndex.css",
    });
  } catch (err) {
    console.error("Error fetching donations:", err); // Debugging line
    req.flash("error", "Unable to retrieve donations at the moment.");
    res.redirect("/");
  }
});

module.exports.renderNewForm = (req, res) => {
  console.log("Rendering new donation form."); // Debugging line
  res.render("donations/new.ejs", { cssFile: "donate/donateNew.css" });
};

module.exports.create = wrapAsync(async (req, res) => {
  try {
    console.log("Creating new donation...");

    const newDonation = new Donation(req.body.donation);
    newDonation.owner = req.user._id;
    await newDonation.save();
    console.log("New donation created with ID:", newDonation._id);
    req.flash("success", "New donation created!");
    res.redirect("/donations");
  } catch (err) {
    console.error("Error creating donation:", err);
    req.flash("error", "Failed to create donation.");
    res.redirect("/donations");
  }
});
module.exports.show = wrapAsync(async (req, res) => {
  try {
    console.log(`Fetching donation with ID: ${req.params.id}`); // Debugging line
    const donation = await Donation.findById(req.params.id)
      .populate({
        path: "payments",
        populate: {
          path: "donor",
        },
      })
      .populate("owner");

    if (!donation) {
      console.log("Donation not found."); // Debugging line
      req.flash("error", "Donation not found.");
      return res.redirect("/donations");
    }

    console.log("Donation found:", donation._id); // Debugging line
    res.render("donations/show.ejs", {
      donation,
      cssFile: "donate/donateShow.css",
    });
  } catch (err) {
    console.error("Error fetching donation:", err); // Debugging line
    req.flash("error", "Unable to retrieve the donation.");
    res.redirect("/donations");
  }
});

module.exports.renderEditForm = wrapAsync(async (req, res) => {
  try {
    console.log(`Fetching donation for editing with ID: ${req.params.id}`); // Debugging line
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      console.log("Donation not found."); // Debugging line
      req.flash("error", "Donation not found.");
      return res.redirect("/donations");
    }
    res.render("donations/edit.ejs", {
      donation,
      cssFile: "donate/donateEdit.css",
    });
  } catch (err) {
    console.error("Error fetching donation for editing:", err); // Debugging line
    req.flash("error", "Failed to load donation for editing.");
    res.redirect("/donations");
  }
});
module.exports.update = wrapAsync(async (req, res) => {
  try {
    console.log(`Updating donation with ID: ${req.params.id}`);
    console.log(" in update controller req.body: ", req.body); // Debugging line

    const donation = await Donation.findByIdAndUpdate(req.params.id, {
      ...req.body.donation,
    });

    if (!donation) {
      console.log("Donation not found for update.");
      req.flash("error", "Donation not found.");
      return res.redirect("/donations");
    }

    console.log("Donation updated successfully:", donation._id);
    req.flash("success", "Donation updated successfully.");
    res.redirect(`/donations/${req.params.id}`);
  } catch (err) {
    console.error("Error updating donation:", err);
    req.flash("error", "Failed to update donation.");
    res.redirect("/donations");
  }
});

module.exports.delete = wrapAsync(async (req, res) => {
  try {
    console.log(`Deleting donation with ID: ${req.params.id}`); // Debugging line
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if (!donation) {
      console.log("Donation not found for deletion."); // Debugging line
      req.flash("error", "Donation not found.");
      return res.redirect("/donations");
    }
    console.log("Donation deleted successfully:", donation._id); // Debugging line
    req.flash("success", "Donation deleted successfully.");
    res.redirect("/donations");
  } catch (err) {
    console.error("Error deleting donation:", err); // Debugging line
    req.flash("error", "Failed to delete donation.");
    res.redirect("/donations");
  }
});

module.exports.createPayment = wrapAsync(async (req, res) => {
  try {
    console.log(`Creating payment for donation with ID: ${req.params.id}`); // Debugging line
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      console.log("Donation not found for payment creation."); // Debugging line
      req.flash("error", "Donation not found.");
      return res.redirect("/donations");
    }

    const payment = new Payment(req.body.payment);
    payment.donor = req.user._id;
    await payment.save();

    donation.payments.push(payment._id);
    await donation.save();

    console.log(
      `Payment created and added to donation with ID: ${donation._id}`
    ); // Debugging line
    req.flash("success", "Thank you for your donation!");
    res.redirect(`/donations/${req.params.id}`);
  } catch (err) {
    console.error("Error creating payment:", err); // Debugging line
    req.flash("error", "Failed to process your payment.");
    res.redirect(`/donations/${req.params.id}`);
  }
});
