const Event = require("../models/event");
const EventReview = require("../models/eventReview"); // Assuming the event review model
const User = require("../models/user"); // Assuming the user model
const wrapAsync = require("../utils/wrapAsync");
const logger = require("../utils/logger");

// Fetch All Events
module.exports.index = wrapAsync(async (req, res) => {
  logger.info("Fetching all events...");
  try {
    const events = await Event.find({})
      .populate("likes")
      .populate("reports")
      .populate("organiser")
      .populate("group"); // Populate group if needed
    logger.info(`Found ${events.length} events.`);
    res.render("event/index", { events, cssFile: "event/eventIndex.css" });
  } catch (err) {
    logger.error("Error fetching events:", err);
    req.flash("error", "Unable to retrieve events at the moment.");
    res.redirect("/events");
  }
});

// Render Form for New Event
module.exports.renderNewForm = (req, res) => {
  logger.info("Rendering new event form.");
  res.render("event/new", { cssFile: "event/eventNew.css" });
};

// Create a New Event
module.exports.create = wrapAsync(async (req, res) => {
  logger.info("Creating new event...");
  try {
    const newEvent = new Event(req.body.event);
    newEvent.organiser = req.user._id;
    await newEvent.save();
    logger.info("New event created with ID:", newEvent._id);
    req.flash("success", "New event created!");
    res.redirect(`/events/${newEvent._id}`);
  } catch (err) {
    logger.error("Error creating event:", err);
    req.flash("error", "Failed to create event.");
    res.redirect("/events");
  }
});

// Show Event Details
module.exports.show = wrapAsync(async (req, res) => {
  const eventId = req.params.id;
  logger.info(`Fetching event with ID: ${eventId}`);
  try {
    const event = await Event.findById(eventId)
      .populate({
        path: "reviews",
        populate: { path: "reviewer" },
      })
      .populate("organiser")
      .populate("group") // Populate group
      .populate("likes")
      .populate("reports");

    if (!event) {
      logger.info("Event not found.");
      req.flash("error", "Event does not exist!");
      return res.redirect("/events");
    }

    logger.info("Event found:", event._id);
    res.render("event/show", { event, cssFile: "event/eventShow.css" });
  } catch (err) {
    logger.error("Error fetching event:", err);
    req.flash("error", "Unable to retrieve event.");
    res.redirect("/events");
  }
});

// Render Edit Event Form
module.exports.renderEditForm = wrapAsync(async (req, res) => {
  const eventId = req.params.id;
  logger.info(`Fetching event for editing with ID: ${eventId}`);
  try {
    const event = await Event.findById(eventId);

    if (!event) {
      logger.info("Event not found.");
      req.flash("error", "Event does not exist!");
      return res.redirect("/events");
    }

    logger.info("Event found for editing:", event._id);
    res.render("event/edit", { event, cssFile: "event/eventEdit.css" });
  } catch (err) {
    logger.error("Error fetching event for editing:", err);
    req.flash("error", "Failed to load event for editing.");
    res.redirect("/events");
  }
});

// Update Event
module.exports.update = wrapAsync(async (req, res) => {
  const eventId = req.params.id;
  logger.info(`Updating event with ID: ${eventId}`);
  logger.info("Request Body:", req.body);
  try {
    await Event.findByIdAndUpdate(eventId, { ...req.body.event });
    logger.info("Event updated successfully:", eventId);
    req.flash("success", "Event updated!");
    res.redirect(`/events/${eventId}`);
  } catch (err) {
    logger.error("Error updating event:", err);
    req.flash("error", "Failed to update event.");
    res.redirect(`/events/${eventId}`);
  }
});

// Delete Event
module.exports.delete = wrapAsync(async (req, res) => {
  const eventId = req.params.id;
  logger.info(`Deleting event with ID: ${eventId}`);
  try {
    await Event.findByIdAndDelete(eventId);
    logger.info("Event deleted successfully:", eventId);
    req.flash("success", "Event deleted!");
    res.redirect("/events");
  } catch (err) {
    logger.error("Error deleting event:", err);
    req.flash("error", "Failed to delete event.");
    res.redirect("/events");
  }
});

// Like Event
module.exports.like = wrapAsync(async (req, res) => {
  const eventId = req.params.id;
  const userId = req.user._id;
  logger.info(`User ${userId} attempting to like event with ID: ${eventId}`);
  try {
    const event = await Event.findById(eventId);

    if (!event) {
      logger.info("Event not found.");
      req.flash("error", "Event does not exist!");
      return res.redirect("/events");
    }

    const hasLiked = event.likes.some((like) => like.equals(userId));

    if (hasLiked) {
      await Event.findByIdAndUpdate(eventId, { $pull: { likes: userId } });
      logger.info("User unliked the event:", eventId);
    } else {
      await Event.findByIdAndUpdate(eventId, { $push: { likes: userId } });
      logger.info("User liked the event:", eventId);
    }

    res.redirect(`/events/${eventId}`);
  } catch (err) {
    logger.error("Error liking event:", err);
    req.flash("error", "Failed to like event.");
    res.redirect("/events");
  }
});

// Report Event
module.exports.report = wrapAsync(async (req, res) => {
  const eventId = req.params.id;
  const userId = req.user._id;
  logger.info(`User ${userId} attempting to report event with ID: ${eventId}`);
  try {
    const event = await Event.findById(eventId);

    if (!event) {
      logger.info("Event not found.");
      req.flash("error", "Event does not exist!");
      return res.redirect("/events");
    }

    const hasReported = event.reports.some((report) => report.equals(userId));

    if (hasReported) {
      await Event.findByIdAndUpdate(eventId, { $pull: { reports: userId } });
      logger.info("User removed report from event:", eventId);
    } else {
      await Event.findByIdAndUpdate(eventId, { $push: { reports: userId } });
      logger.info("User reported the event:", eventId);
    }

    req.flash("success", "Event reported!");
    res.redirect(`/events/${eventId}`);
  } catch (err) {
    logger.error("Error reporting event:", err);
    req.flash("error", "Failed to report event.");
    res.redirect("/events");
  }
});

// Add Event Review
module.exports.addReview = wrapAsync(async (req, res) => {
  const eventId = req.params.id;
  const userId = req.user._id;
  logger.info(`User ${userId} adding a review for event with ID: ${eventId}`);

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      logger.info("Event not found.");
      req.flash("error", "Event does not exist!");
      return res.redirect("/events");
    }

    const review = new EventReview({
      ...req.body.review,
      reviewer: userId,
      event: eventId,
    });

    await review.save();
    logger.info("Review added for event:", eventId);

    req.flash("success", "Review added!");
    res.redirect(`/events/${eventId}`);
  } catch (err) {
    logger.error("Error adding review:", err);
    req.flash("error", "Failed to add review.");
    res.redirect(`/events/${eventId}`);
  }
});
