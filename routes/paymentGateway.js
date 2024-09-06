const express = require("express");
const router = express.Router();
const Payment = require("../models/payment");
const { validatePayment } = require("../middleware");

const wrapAsync = require("../utils/wrapAsync.js");

router.get("/", (req, res) => {
  res.render("donations/paymentForm");
});
// POST route to process the payment
router.post(
  "/",
  //   validatePayment,
  wrapAsync(async (req, res) => {
    const payment = new Payment(req.body);
    // console.log("payment ka req.body: ", req.body);
    // console.log("payment: ", payment);

    await payment.save();
    req.flash("success", `Payment successful! transaction id: ${payment._id}`);
    res.redirect("/donations"); // or wherever you want to redirect after payment
  })
);

module.exports = router;
