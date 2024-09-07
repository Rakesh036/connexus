const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the user receiving the notification
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  link: {
    type: String, // URL link for the notification if applicable
  },
  isRead: {
    type: Boolean,
    default: false, // Mark if the user has read the notification
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
