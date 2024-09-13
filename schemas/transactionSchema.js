const Joi = require("joi");

module.exports.transactionSchema = Joi.object({
  transaction: Joi.object({
    amount: Joi.number().min(10).required(),
    donor: Joi.string().hex().length(24).required(),
    donation: Joi.string().hex().length(24).required(),
  }).required(),
});
