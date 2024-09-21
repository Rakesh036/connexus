const eventSchema = require("../schemas/eventSchema");
const logger = require("../utils/logger")('eventValidationMware');


const mongoose = require("mongoose");
const multer = require("multer");
const { body, validationResult } = require("express-validator");
const Event = require("../models/event");

module.exports.validateEvent = async (req, res, next) => {
  try {
    const { title, description, date, time, isOnline, venue, link, chiefGuests, donation, group } = req.body.event;

    // 1. Chief Guest: Handle string name + image (via multer)
    let chiefGuestData = { name: "", image: { url: "", filename: "" } };
    if (chiefGuests) {
      if (chiefGuests.name) {
        chiefGuestData.name = chiefGuests.name;
      }
      if (req.file && req.file.fieldname === "chiefGuestImage") {
        // Assume multer is set up for chiefGuestImage
        chiefGuestData.image.url = req.file.path;  // Assuming multer gives path
        chiefGuestData.image.filename = req.file.filename;
      }
    }
console.log("hellooo 1");

    // 2. Convert donation/group IDs to ObjectId if valid
    let donationId = null;
    if (donation && mongoose.isValidObjectId(donation)) {
      donationId = new mongoose.Types.ObjectId(donation);
    }

    console.log("hello 1.1");
    let groupId = null;
    if (group && mongoose.isValidObjectId(group)) {
      groupId = new mongoose.Types.ObjectId(group);
    }

    console.log("hello 2");
    // 3. Determine if group association is valid
    const isGroupAssociated = groupId ? true : false;

    // 4. Convert boolean fields from string to boolean
    const isOnlineEvent = (isOnline === "true");

    // 5. Handle Event Poster (from multer)
    let eventPoster = { url: "", filename: "" };
    if (req.file && req.file.fieldname === "eventPoster") {
      eventPoster = {
        url: req.file.path,  // Assuming multer gives path
        filename: req.file.filename,
      };
    }



    console.log("hello 3");
    // 6. Default values for non-required fields
    const eventData = {
      title,
      description: description || "No description provided",
      date,
      time: time || "00:00",
      isOnline: isOnlineEvent,
      venue: isOnlineEvent ? "" : venue || "",
      link: isOnlineEvent ? link || "" : "",
      chiefGuests: chiefGuestData,
      donation: donationId || null,
      group: groupId || null,
      isGroupAssociated,
      poster: eventPoster,
    };

    console.log("hello 4");
    // Attach processed data to req.body
    req.body.event = eventData;

    next();
  } catch (err) {
    console.error("Error during event preprocessing", { error: err });
    logger.error(`Error during event preprocessing ${err }`);
    res.status(500).send("Server error during event processing.");
  }
};