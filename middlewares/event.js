const Joi = require("joi");
const eventSchema = require("../schemas/eventSchema"); // Adjust the path accordingly
const logger = require("../utils/logger")('eventValidationMware'); // Import logger

module.exports.validateEvent = (req, res, next) => {
    console.log("validateEvent middleware");
    
  // Log the request body for debugging

  // Convert fields to their appropriate types
  req.body.event.isOnline = req.body.event.isOnline === "true";
  req.body.event.isDonationRequired = req.body.event.isDonationRequired === "true";
  
  if (req.body.event.chiefGuests === "") {
    req.body.event.chiefGuests = [];
  }

  // Log the user trying to create the event
    logger.info(`User ID: ${req.user._id} is trying to create a new event where`, { label: 'eventValidation' });
    console.log(" req.body.event=",req.body.event);
    

  // Validate the event schema
  const { error } = eventSchema.validate(req.body.event);

  if (error) {
    // Log validation error to the console and logger
    console.error("Validation Error:", error.details);
    logger.error(`Validation Error: ${JSON.stringify(error.details)}`, { label: 'eventRoutes' });

    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
