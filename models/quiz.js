const mongoose = require("mongoose");
const { Schema } = mongoose;

const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    questions: [
      {
        questionText: String,
        options: [String],
        correctAnswer: Number, // Index of the correct answer in the options array
      },
    ],
    group: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    scores: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        score: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quiz", quizSchema);
