const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user"); // Import User model
const Donation = require("./donation"); // Import Donation model
const Group = require("./group"); // Import Group model if you have one
const Notification = require("./notification"); // Import Notification model

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, "Title must be at least 1 characters long"],
    maxlength: [200, "Title cannot exceed 200 characters"],
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, "Description must be at least 1 character long"],
    maxlength: [1000, "Description cannot exceed 1000 characters"],
  },
  organiser: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the event organiser
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, // Time when the event is going to happen (e.g., "14:00")
    required: true,
  },
  isOnline: {
    type: Boolean,
    default: false, // Default set to false
  },
  link: {
    type: String, // Link for online events
    required: function() { return this.isOnline; }, // Required if the event is online
  },
  venue: {
    type: String, // Venue for offline events
    required: function() { return !this.isOnline; }, // Required if the event is offline
  },
  images: [
    {
      url: {
        type: String, // URL to the image
        required: false, // Image is optional
      },
      filename: {
        type: String, // Filename of the image
        required: false, // Filename is optional
      },
    },
  ],
  joinMembers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to users joining the event
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "EventReview", // Optionally add review feature similar to jobs
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  reports: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  group: {
    type: Schema.Types.ObjectId,
    ref: "Group", // Reference to the Group model, if applicable
    required: false, // Optional, if not all events are associated with groups
  },
}, { timestamps: true });

// Middleware to handle notifications when an event is created
eventSchema.post("save", async function(event) {
  try {
    // Notify the organiser when the event is created
    await Notification.create({
      user: event.organiser,
      message: `Your event "${event.title}" has been created successfully!`,
      link: `/events/${event._id}`,
    });

    // Notify users who join the event
    for (const userId of event.joinMembers) {
      await Notification.create({
        user: userId,
        message: `Thank you for joining the event "${event.title}".`,
        link: `/events/${event._id}`,
      });
    }

    // Update the organiser's record
    await User.findByIdAndUpdate(event.organiser, {
      $push: { events: event._id }, // Assuming `events` is an array field in the User model
    });

    // Update join members' records
    await User.updateMany(
      { _id: { $in: event.joinMembers } },
      { $push: { joinedEvents: event._id } } // Assuming `joinedEvents` is an array field in the User model
    );

    // Update the donation record if there's a donation associated
    if (event.donation) {
      await Donation.findByIdAndUpdate(event.donation, {
        $push: { events: event._id }, // Assuming `events` is an array field in the Donation model
      });
    }

    // Update the group's record if there's a group associated
    if (event.group) {
      await Group.findByIdAndUpdate(event.group, {
        $push: { events: event._id }, // Assuming `events` is an array field in the Group model
      });
    }
  } catch (err) {
    console.error("Error handling event creation:", err);
  }
});

// Middleware to handle notifications and data updates when an event is deleted
eventSchema.post("findOneAndDelete", async function(event) {
  try {
    // Remove the event from the organiser's record
    await User.findByIdAndUpdate(event.organiser, {
      $pull: { events: event._id },
    });

    // Remove the event from join members' records
    await User.updateMany(
      { _id: { $in: event.joinMembers } },
      { $pull: { joinedEvents: event._id } }
    );

    // Remove the event from the donation record if applicable
    if (event.donation) {
      await Donation.findByIdAndUpdate(event.donation, {
        $pull: { events: event._id },
      });
    }

    // Remove the event from the group's record if applicable
    if (event.group) {
      await Group.findByIdAndUpdate(event.group, {
        $pull: { events: event._id },
      });
    }
  } catch (err) {
    console.error("Error handling event deletion:", err);
  }
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
