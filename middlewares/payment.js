const Joi = require("joi");

// Middleware to validate payment details using Joi
module.exports.validatePayment = (req, res, next) => {
  const paymentSchema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().optional(),
    donationTitle: Joi.string().optional(),  // Changed from eventTitle for clarity
    amount: Joi.number().required().min(0),
    paymentMethod: Joi.string()
      .valid("UPI", "Credit Card", "Debit Card")
      .required(),
    upiId: Joi.string().when("paymentMethod", {
      is: "UPI",
      then: Joi.required(),
    }),
    cardNumber: Joi.string().when("paymentMethod", {
      is: Joi.string().valid("Credit Card", "Debit Card"),
      then: Joi.required(),
    }),
    expiryDate: Joi.string().when("paymentMethod", {
      is: Joi.string().valid("Credit Card", "Debit Card"),
      then: Joi.required(),
    }),
  });

  const { error } = paymentSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    req.flash("error", msg);
    return res.redirect("back");
  }
  next();
};