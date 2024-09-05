const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: [10, "Donation amount must be at least 10"],
    },
    donor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
        validator: mongoose.Types.ObjectId.isValid,
        message: "Invalid donor ID",
      },
    },
    donation: {
      type: Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
      validate: {
        validator: mongoose.Types.ObjectId.isValid,
        message: "Invalid donation ID",
      },
    },
  },
  { timestamps: true }
);

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
      minlength: [1, "Description must be at least 10 characters long"],
      maxlength: [1000, "Description cannot exceed 100 characters"],
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
        ref: "Transaction",
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
  Transaction: mongoose.model("Transaction", transactionSchema),
};
