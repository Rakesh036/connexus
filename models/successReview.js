const mongoose = require("mongoose");
const { Schema } = mongoose;

const successreviewSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const SuccessReview = mongoose.model("SuccessReview",successreviewSchema);
module.exports = SuccessReview;
