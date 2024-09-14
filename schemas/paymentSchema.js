const Joi = require("joi");

// Define the schema
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

// Debugging example
const debugLog = (msg) => console.log(`DEBUG: ${msg}`);

module.exports.validatePayment = (data) => {
  debugLog("Starting validation for payment schema...");
  const { error } = module.exports.paymentSchema.validate(data, { abortEarly: false });
  if (error) {
    debugLog(`Validation error: ${error.details.map(el => el.message).join(", ")}`);
    throw new Error(`Validation error: ${error.details.map(el => el.message).join(", ")}`);
  }
  debugLog("Validation passed successfully.");
  return true;
};
