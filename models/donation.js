const mongoose = require("mongoose");
const Payment = require("./payment");
const Notification = require("./notification");
const Schema = mongoose.Schema;

const donationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [5, "Title must be at least 5 characters long"],
      maxlength: [200, "Title cannot exceed 200 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minlength: [1, "Description must be at least 1 characters long"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
        validator: mongoose.Types.ObjectId.isValid,
        message: "Invalid owner ID",
      },
    },
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Payment",
        validate: {
          validator: mongoose.Types.ObjectId.isValid,
          message: "Invalid transaction ID",
        },
      },
    ],
    isEmergency: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

donationSchema.post("findOneAndUpdate", async function (doc, next) {
  const Notification = mongoose.model("Notification");
  console.log("during updatation in donationSchema");

  // Example: Create a notification for the owner of the donation
  await Notification.create({
    user: doc.owner, // Reference the owner of the donation
    message: `Your donation "${doc.title}" was successfully created.`,
    link: `/donations/${doc._id}`, // Link to the donation
  });

  next();
});

module.exports = mongoose.model("Donation", donationSchema);
