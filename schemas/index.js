// <%- layout("layouts/boilerplate") -%>

// <link rel="stylesheet" href="/css/event/newEvent.css">

// <div class="container">
//   <div class="row">
//     <div class="col-6 offset-3">
//       <h1 class="mt-4">Create New Event</h1>
     
//       <form action="/events" method="POST" class="needs-validation" novalidate>
//         <div class="mb-3">
//           <label for="title" class="form-label">Event Title <span class="text-danger">*</span></label>
//           <input type="text" class="form-control" id="title" name="event[title]" placeholder="Enter the event title" required minlength="1" maxlength="200">
//           <div class="invalid-feedback">Please enter an event title.</div>
//         </div>

//         <div class="mb-3">
//           <label for="description" class="form-label">Event Description <span class="text-danger">*</span></label>
//           <textarea class="form-control" id="description" name="event[description]" placeholder="Describe the event" required minlength="1" maxlength="1000"></textarea>
//           <div class="invalid-feedback">Please enter an event description.</div>
//         </div>

//         <div class="mb-3">
//           <label for="eventPoster" class="form-label">Event Poster (optional)</label>
//           <input type="file" class="form-control" id="eventPoster" name="event[images]" accept="image/*">
//         </div>

//         <div class="row mb-3">
//           <div class="mb-3 col-6">
//             <label for="date" class="form-label">Event Date <span class="text-danger">*</span></label>
//             <input type="date" class="form-control" id="date" name="event[date]" required>
//             <div class="invalid-feedback">Please select an event date.</div>
//           </div>

//           <div class="mb-3 col-6">
//             <label for="time" class="form-label">Event Time <span class="text-danger">*</span></label>
//             <input type="time" class="form-control" id="time" name="event[time]" required>
//             <div class="invalid-feedback">Please select an event time.</div>
//           </div>
//         </div>

//         <div class="mb-3">
//           <label class="form-label">Is the event online? <span class="text-danger">*</span></label>
//           <div class="form-check form-check-inline">
//             <input class="form-check-input" type="radio" name="event[isOnline]" id="isOnlineYes" value="true" required onchange="toggleEventLocation()">
//             <label class="form-check-label" for="isOnlineYes">Yes</label>
//           </div>
//           <div class="form-check form-check-inline">
//             <input class="form-check-input" type="radio" name="event[isOnline]" id="isOnlineNo" value="false" required onchange="toggleEventLocation()">
//             <label class="form-check-label" for="isOnlineNo">No</label>
//           </div>
        
//           <div class="row mb-3">
//             <div class="col-6 d-none" id="venueField">
//               <label for="venue" class="form-label">Event Venue <span class="text-danger">*</span></label>
//               <input type="text" class="form-control" id="venue" name="event[venue]" placeholder="e.g., Community Hall" required>
//               <div class="invalid-feedback">Please enter the event venue.</div>
//             </div>
//             <div class="col-6 d-none" id="linkField">
//               <label for="link" class="form-label">Event Link <span class="text-danger">*</span></label>
//               <input type="url" class="form-control" id="link" name="event[link]" placeholder="e.g., https://example.com" required>
//               <div class="invalid-feedback">Please enter a valid event link.</div>
//             </div>
//           </div>
//         </div>
        
//         <div class="row mb-3">
//           <div class="col-6">
//             <label for="chiefGuests" class="form-label">Chief Guest Name</label>
//             <input type="text" class="form-control" id="chiefGuests" name="event[chiefGuests][name]" placeholder="Enter the chief guest's name">
//           </div>
//           <div class="col-6">
//             <label for="chiefGuestImage" class="form-label">Chief Guest Image</label>
//             <input type="file" class="form-control" id="chiefGuestImage" name="event[chiefGuests][image]" accept="image/*">
//           </div>
//         </div>

//         <div class="row mb-3">
//           <div class="col-6">
//             <label for="donationId" class="form-label">Donation ID (if linked to a group)</label>
//             <input type="text" class="form-control" id="donationId" name="event[donation]" placeholder="Enter Donation ID">
//           </div>
//           <div class="col-6">
//             <label for="group" class="form-label">Group ID (if linked to a group)</label>
//             <input type="text" class="form-control" id="group" name="event[group]" placeholder="Enter Group ID">
//           </div>
//         </div>
//         <p class="text-warning">Note: If you provide a Donation ID or Group ID, you must be the owner of the respective group or donation for the event to be created.</p>

//         <input type="submit" class="btn btn-primary" value="Create Event">
//       </form>
//     </div>
//   </div>
// </div>

// <script src="/js/new-event.js"></script>

// when i filling all input and click submit button then nothing happen

// common js code is here 
// // Example starter JavaScript for disabling form submissions if there are invalid fields
// (() => {
//   "use strict";

//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
//   const forms = document.querySelectorAll(".needs-validation");

//   // Loop over them and prevent submission
//   Array.from(forms).forEach((form) => {
//     form.addEventListener(
//       "submit",
//       (event) => {
//         if (!form.checkValidity()) {
//           event.preventDefault();
//           event.stopPropagation();
//         }

//         form.classList.add("was-validated");
//       },
//       false
//     );
//   });
// })();

// // for toggling nav bar
//     function toggleMenu() {
//         const navLinks = document.querySelector(".nav-links");
//         const buttons = document.querySelector(".buttons");
//         navLinks.classList.toggle("show");
//         buttons.classList.toggle("show");
//     }

// new-event.js
// function toggleEventLocation() {
//     const isOnline = document.querySelector('input[name="event[isOnline]"]:checked').value === 'true';
//     document.getElementById('linkField').classList.toggle('d-none', !isOnline);
//     document.getElementById('venueField').classList.toggle('d-none', isOnline);
// }

// function toggleDonationField() {
//     const isDonationRequired = document.getElementById('isDonationRequired').value === 'true';
//     document.getElementById('donationField').classList.toggle('d-none', !isDonationRequired);
// }

// event.js for routing
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { storage } = require("../cloudConfig.js");
// const upload = multer({ storage });
// const logger = require("../utils/logger")('eventRoutes');
// const eventController = require("../controllers/eventController");
// const { isLoggedIn } = require("../middlewares/auth");
// const {
//   validateEvent,
//   // isEventOwner,
// } = require("../middlewares/event");

// // Route to get all events and create a new event
// router
//   .route("/")
//   .get((req, res, next) => {
//             // .....
//             console.log("hbj");
            
//     }, eventController.index)
//   );

// // Route to render the form for creating a new event
// router.route("/new").get((req, res, next) => {
//   logger.info("======= [ROUTE: Render New Event Form] =======");
//   logger.info("[ACTION: Rendering New Event Form]");
//   next();
// }, eventController.renderNewForm);

// // Route to get, update, and delete a specific event
// router
//   .route("/:id")
//   .get((req, res, next) => {
//     logger.info("======= [ROUTE: Get Event Details] =======");
//     logger.info("[ACTION: Fetching Event Details]");
//     logger.info(Event ID: ${req.params.id});
//     next();
//   }, eventController.show) // Ensure this method exists in eventController
//   .put((req, res, next) => {
//     logger.info("======= [ROUTE: Update Event] =======");
//     logger.info("[ACTION: Updating Event]");
//     logger.info(User ID: ${req.user ? req.user._id : 'Not logged in'} is updating event ID: ${req.params.id});
//     logger.debug(Request body: ${JSON.stringify(req.body)});
//     next();
//   }, eventController.update) // Ensure this method exists in eventController
//   .delete((req, res, next) => {
//     logger.info("======= [ROUTE: Delete Event] =======");
//     logger.info("[ACTION: Deleting Event]");
//     logger.info(User ID: ${req.user ? req.user._id : 'Not logged in'} is deleting event ID: ${req.params.id});
//     next();
//   }, eventController.delete); // Ensure this method exists in eventController

// // Route to render the edit form for a specific event
// router.route("/:id/edit").get((req, res, next) => {
//   logger.info("======= [ROUTE: Render Edit Event Form] =======");
//   logger.info("[ACTION: Rendering Edit Event Form]");
//   logger.info(User ID: ${req.user ? req.user._id : 'Not logged in'} is requesting to edit event ID: ${req.params.id});
//   next();
// }, eventController.renderEditForm); // Ensure this method exists in eventController
// module.exports = router;
// here below is event middleware
// const eventSchema = require("../schemas/eventSchema");
// const logger = require("../utils/logger")('eventValidationMware');


// module.exports.validateEvent = async (req, res, next) => {
//   try {
//     // Log the request body for debugging
//     logger.info(Request body: ${JSON.stringify(req.body.event)});

//     // Convert fields to their appropriate types
//     req.body.event.isOnline = req.body.event.isOnline === "true";
//     req.body.event.isDonationRequired = req.body.event.isDonationRequired === "true";

//     // Handle the chiefGuests field
//     if (typeof req.body.event.chiefGuests === 'string' && req.body.event.chiefGuests.trim()) {
//       req.body.event.chiefGuests = {
//         name: req.body.event.chiefGuests,
//         image: { url: '', filename: '' } // Set defaults for image
//       };
//     } else {
//       req.body.event.chiefGuests = null; // Set to null if empty or not provided
//     }

//     // Log the user attempting to create an event
//     if (req.user) {
//       logger.info(User ID: ${req.user._id} is trying to create a new event, { label: 'eventValidation' });
//     }

//     console.log("Updated req.body.event=", req.body.event);

//     // Validate the event data against the schema
//     const { error } = await eventSchema.validate(req.body.event, { abortEarly: false });

//     if (error) {
//       // Log validation error to the console and logger
//       console.error("Validation Error:", error.details);
//       logger.error(Validation Error: ${JSON.stringify(error.details)}, { label: 'eventRoutes' });

//       const errors = error.details.map(err => err.message);
//       return res.status(400).json({ errors });
//     }

//     next();
//   } catch (err) {
//     console.error('Internal server error:', err);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// here is eventSchema
// const Joi = require('joi');

// const eventSchema = Joi.object({
//   title: Joi.string()
//     .min(1)
//     .max(200)
//     .required()
//     .messages({
//       'string.empty': 'Event title is required.',
//       'string.min': 'Event title must be at least 1 character long.',
//       'string.max': 'Event title must be less than or equal to 200 characters long.',
//     }),
//   description: Joi.string()
//     .min(1)
//     .max(1000)
//     .required()
//     .messages({
//       'string.empty': 'Event description is required.',
//       'string.min': 'Event description must be at least 1 character long.',
//       'string.max': 'Event description must be less than or equal to 1000 characters long.',
//     }),
//   date: Joi.date()
//     .greater('now')
//     .required()
//     .messages({
//       'date.base': 'Event date must be a valid date.',
//       'date.greater': 'Event date must be in the future.',
//     }),
//   time: Joi.string().required(),
//   isOnline: Joi.boolean().required(),
//   venue: Joi.string().allow('').optional(),
//   link: Joi.string().uri().allow('').optional(),
//   chiefGuests: Joi.object({
//     name: Joi.string().allow('').optional(),
//     image: Joi.any().optional(),
//   }),
//   donation: Joi.string().allow('').optional(),
//   group: Joi.string().allow('').optional(),
// }).required();

// module.exports = eventSchema;

// here is eventController
// const Event = require("../models/event");
// const EventReview = require("../models/eventReview"); // Assuming the event review model
// const User = require("../models/user"); // Assuming the user model
// const wrapAsync = require("../utils/wrapAsync");
// const logger = require("../utils/logger")('eventController');

// // Fetch All Events
// module.exports.index = wrapAsync(async (req, res) => {
//   logger.info("Fetching all events...");
//   try {
//     const events = await Event.find({})
//       .populate("likes")
//       .populate("reports")
//       .populate("organiser")
//       .populate("group"); // Populate group if needed
//     logger.info(Found ${events.length} events.);
//     res.render("event/index", { events, cssFile: "event/eventIndex.css" });
//   } catch (err) {
//     logger.error("Error fetching events:", err);
//     req.flash("error", "Unable to retrieve events at the moment.");
//     res.redirect("/events");
//   }
// });

// // Render Form for New Event
// module.exports.renderNewForm = (req, res) => {
//   logger.info("Rendering new event form.");
//   res.render("event/new", { cssFile: "event/eventNew.css" });
// };

// // Create a New Event
// module.exports.create = wrapAsync(async (req, res) => {
//   logger.info("inside create eventController ");
//   try {
//     console.log("inside event creation, req.body: ", req.body);
//     // console.log("inside event creation, req.body.event: ", req.body.event);
//     // console.log("inside event creation, req.file: ", req.file);
//     // console.log("inside event creation, req.user._id:", req.user._id);

//     const newEvent = new Event(req.body.event);
//     newEvent.organiser = req.user._id;
//     console.log("newEvent is: ", newEvent);
//     await newEvent.save();
//     logger.info(New event created with ID: ${newEvent._id});
//     req.flash("success", "New event created!");
//     res.redirect(/events/${newEvent._id});
//   } catch (err) {
//     logger.error(Error creating event: ${err});
//     req.flash("error", "Failed to create event.");
//     res.redirect("/events");
//   }
// });

// // Show Event Details
// module.exports.show = wrapAsync(async (req, res) => {
//   const eventId = req.params.id;
//   logger.info(Fetching event with ID: ${eventId});
//   try {
//     const event = await Event.findById(eventId);
//     // .populate({
//     //   path: "reviews",
//     //   populate: { path: "reviewer" },
//     // })
//     // .populate("organiser")
//     // .populate("group") // Populate group
//     // .populate("likes")
//     // .populate("reports");

//     if (!event) {
//       logger.info("Event not found.");
//       req.flash("error", "Event does not exist!");
//       return res.redirect("/events");
//     }

//     logger.info("Event found:", event._id);
//     res.render("event/show", { event, cssFile: "event/eventShow.css" });
//   } catch (err) {
//     logger.error("Error fetching event:", err);
//     req.flash("error", "Unable to retrieve event.");
//     res.redirect("/events");
//   }
// });

// // Render Edit Event Form
// module.exports.renderEditForm = wrapAsync(async (req, res) => {
//   const eventId = req.params.id;
//   logger.info(Fetching event for editing with ID: ${eventId});
//   try {
//     const event = await Event.findById(eventId);

//     if (!event) {
//       logger.info("Event not found.");
//       req.flash("error", "Event does not exist!");
//       return res.redirect("/events");
//     }

//     logger.info("Event found for editing:", event._id);
//     res.render("event/edit", { event, cssFile: "event/eventEdit.css" });
//   } catch (err) {
//     logger.error("Error fetching event for editing:", err);
//     req.flash("error", "Failed to load event for editing.");
//     res.redirect("/events");
//   }
// });

// // Update Event
// module.exports.update = wrapAsync(async (req, res) => {
//   const eventId = req.params.id;
//   logger.info(Updating event with ID: ${eventId});
//   logger.info("Request Body:", req.body);
//   try {
//     await Event.findByIdAndUpdate(eventId, { ...req.body.event });
//     logger.info("Event updated successfully:", eventId);
//     req.flash("success", "Event updated!");
//     res.redirect(/events/${eventId});
//   } catch (err) {
//     logger.error("Error updating event:", err);
//     req.flash("error", "Failed to update event.");
//     res.redirect(/events/${eventId});
//   }
// });



// here is event model
// const mongoose = require("mongoose");
// const { Schema } = mongoose;
// const User = require("./user"); // Import User model
// const Donation = require("./donation"); // Import Donation model
// const Group = require("./group"); // Import Group model if you have one
// const Notification = require("./notification"); // Import Notification model
// const EventReview = require("./eventReview"); // Import EventReview model

// const eventSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: [1, "Title must be at least 1 character long"],
//   },
//   description: {
//     type: String,
//     trim: true,
//     default: "No description provided",
//   },
//   organiser: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
//   time: {
//     type: String,
//     default: "00:00",
//   },
//   isOnline: {
//     type: Boolean,
//     default: false,
//   },
//   link: {
//     type: String,
//     default: "",
//     required: function () { return this.isOnline; }, // Required if the event is online
//   },
//   venue: {
//     type: String,
//     default: "",
//     required: function () { return !this.isOnline; }, // Required if the event is offline
//   },
//   images: [
//     {
//       url: {
//         type: String,
//         default: "",
//       },
//       filename: {
//         type: String,
//         default: "",
//       },
//     },
//   ],
//   chiefGuests: 
//     {
//       name: {
//         type: String,
//         default: "",
//       },
//       image: {
//         url: {
//           type: String,
//           default: "",
//         },
//         filename: {
//           type: String,
//           default: "",
//         },
//       },
//     },
  

//   group: {
//     type: Schema.Types.ObjectId,
//     ref: "Group",
//   },
//   donation: {
//     type: Schema.Types.ObjectId,
//     ref: "Donation",
//   },
//   isDonationRequired: {
//     type: Boolean,
//     default: false,
//   },
// }, { timestamps: true });

// // Middleware to handle notifications when an event is created
// eventSchema.post("save", async function (event) {
//   try {
//     // Notify the organiser when the event is created
//     await Notification.create({
//       user: event.organiser,
//       message: Your event "${event.title}" has been created successfully!,
//       link: /events/${event._id},
//     });

//     // Notify users who join the event
//     for (const userId of event.joinMembers) {
//       await Notification.create({
//         user: userId,
//         message: Thank you for joining the event "${event.title}".,
//         link: /events/${event._id},
//       });
//     }

//     // Update the organiser's record
//     await User.findByIdAndUpdate(event.organiser, {
//       $push: { events: event._id }, // Assuming events is an array field in the User model
//     });

//     // Update join members' records
//     await User.updateMany(
//       { _id: { $in: event.joinMembers } },
//       { $push: { joinedEvents: event._id } } // Assuming joinedEvents is an array field in the User model
//     );

//     // Update the donation record if there's a donation associated
//     if (event.donation) {
//       await Donation.findByIdAndUpdate(event.donation, {
//         $push: { events: event._id }, // Assuming events is an array field in the Donation model
//       });
//     }

//     // Update the group's record if there's a group associated
//     if (event.group) {
//       await Group.findByIdAndUpdate(event.group, {
//         $push: { events: event._id }, // Assuming events is an array field in the Group model
//       });
//     }
//   } catch (err) {
//     console.error("Error handling event creation:", err);
//   }
// });

// // Middleware to handle notifications and data updates when an event is deleted
// eventSchema.post("findOneAndDelete", async function (event) {
//   try {
//     // Remove the event from the organiser's record
//     await User.findByIdAndUpdate(event.organiser, {
//       $pull: { events: event._id },
//     });

//     // Remove the event from join members' records
//     await User.updateMany(
//       { _id: { $in: event.joinMembers } },
//       { $pull: { joinedEvents: event._id } }
//     );

//     // Remove the event from the donation record if applicable
//     if (event.donation) {
//       await Donation.findByIdAndUpdate(event.donation, {
//         $pull: { events: event._id },
//       });
//     }

//     // Remove the event from the group's record if applicable
//     if (event.group) {
//       await Group.findByIdAndUpdate(event.group, {
//         $pull: { events: event._id },
//       });
//     }
//   } catch (err) {
//     console.error("Error handling event deletion:", err);
//   }
// });

// const Event = mongoose.model("Event", eventSchema);
// module.exports = Event;

// if you find any error then fix it and tell me