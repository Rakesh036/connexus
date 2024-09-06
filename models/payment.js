const { required } = require("joi");
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
      //   lowercase: true,
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
      // required: function () {
      //     return this.paymentMethod === "UPI";
      // },
    },
    cardNumber: {
      type: String,
      required: false,
    },

    //   required: function () {
    //     return (
    //       this.paymentMethod === "Credit Card" ||
    //       this.paymentMethod === "Debit Card"
    //     );
    //   },
    // },
    expiryDate: {
      type: String,
      required: false,
    },
    // },
    // cvv: {
    //   type: String,
    //   required: function () {
    //     return (
    //       this.paymentMethod === "Credit Card" ||
    //       this.paymentMethod === "Debit Card"
    //     );
    //   },
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
