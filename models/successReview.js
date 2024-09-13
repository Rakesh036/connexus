const mongoose = require("mongoose");
const { Schema } = mongoose;

const successReviewSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Use Date.now instead of Date.now()
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const SuccessReview = mongoose.model("SuccessReview", successReviewSchema);
module.exports = SuccessReview;
