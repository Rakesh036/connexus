const mongoose = require("mongoose");
const Payment = require("./payment");
const Schema = mongoose.Schema;

// const transactionSchema = new Schema(
//   {
//     amount: {
//       type: Number,
//       required: true,
//       // min: [10, "Donation amount must be at least 10"],
//     },
//     donor: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: false,
//     },
//     payment: {
//       type: Schema.Types.ObjectId,
//       ref: "Payment",
//     },
//   },
//   { timestamps: true }
// );

const donationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [1, "Title must be at least 5 characters long"],
      maxlength: [200, "Title cannot exceed 20 characters"],
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
  },
  { timestamps: true }
);

module.exports = {
  Donation: mongoose.model("Donation", donationSchema),
  // Transaction: mongoose.model("Transaction", transactionSchema),
};
