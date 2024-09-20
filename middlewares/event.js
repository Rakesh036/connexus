const eventSchema = require("../schemas/eventSchema");
const logger = require("../utils/logger")('eventValidationMware');

module.exports.validateEvent = (req, res, next) => {
  console.log("validateEvent middleware");

  // Log the request body for debugging
  logger.info(`Request body: ${JSON.stringify(req.body.event)}`);

  // Convert fields to their appropriate types
  req.body.event.isOnline = req.body.event.isOnline === "true";
  req.body.event.isDonationRequired = req.body.event.isDonationRequired === "true";

  // Handle the chiefGuests field
  if (typeof req.body.event.chiefGuests === 'string' && req.body.event.chiefGuests.trim()) {
    req.body.event.chiefGuests = {
      name: req.body.event.chiefGuests,
      image: { url: '', filename: '' } // Set defaults for image
    };
  } else {
    req.body.event.chiefGuests = null; // Set to null if empty or not provided
  }

  // Log the user attempting to create an event
  if (req.user) {
    logger.info(`User ID: ${req.user._id} is trying to create a new event`, { label: 'eventValidation' });
  }

  console.log("Updated req.body.event=", req.body.event);

  // Validate the event data against the schema
  const { error } = eventSchema.validate(req.body.event);

  if (error) {
    // Log validation error to the console and logger
    console.error("Validation Error:", error.details);
    logger.error(`Validation Error: ${JSON.stringify(error.details)}`, { label: 'eventRoutes' });

    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};