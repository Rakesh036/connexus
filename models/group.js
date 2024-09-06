const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupSchema = new Schema(
  {
    name: {
      // Changed from title to name
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    motto: {
      // Added motto field
      type: String,
      trim: true,
    },
    website: {
      // Added website field
      type: String,
      trim: true,
    },
    contactEmail: {
      // Added contactEmail field
      type: String,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quizzes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Quiz",
      },
    ],
    memberCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Group", groupSchema);
