const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please enter a valid email address.",
      },
    },
    donationTitle: {  // Changed from eventTitle for clarity
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be a positive number."],
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["UPI", "Credit Card", "Debit Card"],
    },
    upiId: {
      type: String,
      validate: {
        validator: function (v) {
          return this.paymentMethod === "UPI" ? !!v : true;
        },
        message: "UPI ID is required for UPI payments.",
      },
    },
    cardNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return this.paymentMethod === "Credit Card" || this.paymentMethod === "Debit Card" ? (!!v && v.length === 4) : true;
        },
        message: "Store only the last 4 digits of the card number.",
      },
    },
    expiryDate: {
      type: String,
      validate: {
        validator: function (v) {
          return this.paymentMethod === "Credit Card" || this.paymentMethod === "Debit Card" ? !!v : true;
        },
        message: "Expiry date is required for card payments.",
      },
    },
    donor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
