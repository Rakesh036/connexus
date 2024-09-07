const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
    },
    eventTitle: {
      type: String,
      required: false,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["UPI", "Credit Card", "Debit Card"],
    },
    upiId: {
      type: String,
    },
    cardNumber: {
      type: String,
    },
    expiryDate: {
      type: String,
    },
    donor: {
      type: Schema.Types.ObjectId,
      ref: "User", // Assuming the user model is named "User"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
