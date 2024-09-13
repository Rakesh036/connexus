const Joi = require("joi");

module.exports.paymentSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().optional(),
  eventTitle: Joi.string().optional(),
  amount: Joi.number().positive().required(),
  paymentMethod: Joi.string()
    .valid("UPI", "Credit Card", "Debit Card")
    .required(),
  upiId: Joi.string().when("paymentMethod", {
    is: "UPI",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  cardNumber: Joi.string().when("paymentMethod", {
    is: "Credit Card",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  expiryDate: Joi.string().when("paymentMethod", {
    is: "Credit Card",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  cvv: Joi.string().when("paymentMethod", {
    is: "Credit Card",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
});