// schemas/eventSchema.js
const Joi = require('joi');

// Schema for validating event data
const eventSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  description: Joi.string().min(1).max(1000).required(),
  organiser: Joi.string().required(),
  date: Joi.date().required(),
  time: Joi.string().required(),
  isOnline: Joi.boolean(),
  link: Joi.string().uri().when('isOnline', { is: true, then: Joi.required() }),
  venue: Joi.string().when('isOnline', { is: false, then: Joi.required() }),
  images: Joi.array().items(
    Joi.object({
      url: Joi.string().uri(),
      filename: Joi.string(),
    })
  ),
  chiefGuests: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      image: Joi.object({
        url: Joi.string().uri(),
        filename: Joi.string(),
      }),
    })
  ),
  joinMembers: Joi.array().items(Joi.string()),
  reviews: Joi.array().items(Joi.string()),
  likes: Joi.array().items(Joi.string()),
  reports: Joi.array().items(Joi.string()),
  group: Joi.string(),
  donation: Joi.string(),
  isDonationRequired: Joi.boolean(),
});

module.exports = { eventSchema };
