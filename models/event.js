const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");
const Donation = require("./donation");
const Group = require("./group");
const Notification = require("./notification");
const EventReview = require("./eventReview");

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, "Title must be at least 1 character long"],
  },
  description: {
    type: String,
    trim: true,
    default: "No description provided",
  },
  organiser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    default: "00:00",
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  link: {
    type: String,
    default: "",
    required: function () { return this.isOnline; }, // Required if the event is online
  },
  venue: {
    type: String,
    default: "",
    required: function () { return !this.isOnline; }, // Required if the event is offline
  },
  poster: {
    type: {
      url: String,
      filename: String,
    },
    default: { url: "", filename: "" }, // Event poster
  },
  images: [
    {
      url: {
        type: String,
        default: "",
      },
      filename: {
        type: String,
        default: "",
      },
    },
  ],
  chiefGuests: {
    name: {
      type: String,
      default: "",
    },
    image: {
      url: {
        type: String,
        default: "",
      },
      filename: {
        type: String,
        default: "",
      },
    },
  },
  joinMembers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "EventReview",
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
    ref: "Group",
    default: null,
  },
  donation: {
    type: Schema.Types.ObjectId,
    ref: "Donation",
    default: null,
  },
  isDonationRequired: {
    type: Boolean,
    default: false,
  },
  isGroupAssociated: {
    type: Boolean,
    default: false, // New attribute: tracks if the event is linked to a group
  },
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;