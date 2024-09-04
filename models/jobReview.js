const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobReviewSchema = new Schema({
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

const JobReview = mongoose.model("JobReview", jobReviewSchema);
module.exports = JobReview;
