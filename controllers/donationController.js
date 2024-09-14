const Donation = require("../models/donation");
const Payment = require("../models/payment");
const wrapAsync = require("../utils/wrapAsync");

module.exports.index = wrapAsync(async (req, res) => {
  try {
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

    res.render("donations/index.ejs", {
      donations,
      cssFile: "donate/donateIndex.css",
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Unable to retrieve donations at the moment.");
    res.redirect("/");
  }
});

module.exports.renderNewForm = (req, res) => {
  res.render("donations/new.ejs", { cssFile: "donate/donateNew.css" });
};

module.exports.create = wrapAsync(async (req, res) => {
  const newDonation = new Donation(req.body.donation);
  if (!req.body.donation.isEmergency) {
    newDonation.isEmergency = false;
  }
  newDonation.owner = req.user._id;
  await newDonation.save();
  req.flash("success", "New donation created!");
  res.redirect("/donations");
});

module.exports.show = wrapAsync(async (req, res) => {
  const donation = await Donation.findById(req.params.id)
    .populate({
      path: "payments",
      populate: {
        path: "donor",
      },
    })
    .populate("owner");

  if (!donation) {
    req.flash("error", "Donation not found.");
    return res.redirect("/donations");
  }

  res.render("donations/show.ejs", {
    donation,
    cssFile: "donate/donateShow.css",
  });
});

module.exports.renderEditForm = wrapAsync(async (req, res) => {
  const donation = await Donation.findById(req.params.id);
  if (!donation) {
    req.flash("error", "Donation not found.");
    return res.redirect("/donations");
  }
  res.render("donations/edit.ejs", {
    donation,
    cssFile: "donate/donateEdit.css",
  });
});

module.exports.update = wrapAsync(async (req, res) => {
  const donation = await Donation.findByIdAndUpdate(req.params.id, {
    ...req.body.donation,
  });
  if (!donation) {
    req.flash("error", "Donation not found.");
    return res.redirect("/donations");
  }
  req.flash("success", "Donation updated successfully.");
  res.redirect(`/donations/${req.params.id}`);
});

module.exports.delete = wrapAsync(async (req, res) => {
  const donation = await Donation.findByIdAndDelete(req.params.id);
  if (!donation) {
    req.flash("error", "Donation not found.");
    return res.redirect("/donations");
  }
  req.flash("success", "Donation deleted successfully.");
  res.redirect("/donations");
});

module.exports.createPayment = wrapAsync(async (req, res) => {
  const donation = await Donation.findById(req.params.id);
  if (!donation) {
    req.flash("error", "Donation not found.");
    return res.redirect("/donations");
  }

  const payment = new Payment(req.body.payment);
  payment.donor = req.user._id;
  await payment.save();

  donation.payments.push(payment._id);
  await donation.save();

  req.flash("success", "Thank you for your donation!");
  res.redirect(`/donations/${req.params.id}`);
});
