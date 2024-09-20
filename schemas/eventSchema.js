const Joi = require('joi');
const logger = require('../utils/logger')('event schema');


const eventSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  description: Joi.string().max(1000).default('No description provided'),
  date: Joi.date().required(),
  time: Joi.string().default('00:00'),
  isOnline: Joi.boolean().default(false),
  link: Joi.string().uri().allow('').default('') // Allow empty string and default to empty
    .when('isOnline', { is: true, then: Joi.required(), otherwise: Joi.optional() }),
  venue: Joi.string().allow('').default('') // Allow empty string for venue
    .when('isOnline', { is: false, then: Joi.required(), otherwise: Joi.optional() }),
  images: Joi.array().items(
    Joi.object({
      url: Joi.string().uri().default(''),
      filename: Joi.string().default(''),
    })
  ).default([]),
  chiefGuests: Joi.array().items(
    Joi.object({
      name: Joi.string().default(''),
      image: Joi.object({
        url: Joi.string().uri().default(''),
        filename: Joi.string().default(''),
      }).default({}),
    })
  ).default([]),
  isDonationRequired: Joi.boolean().default(false),
});

module.exports = eventSchema;
