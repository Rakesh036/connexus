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
        questionText: {
          type: String,
          required: true,
        },
        options: {
          type: [String],
          validate: [
            arrayLimit,
            "Each question should have at least two options.",
          ], // Validation for minimum 2 options
        },
        correctAnswer: {
          type: Number,
          required: true, // Ensure a correct answer is selected
        },
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

function arrayLimit(val) {
  return val.length >= 2;
}

module.exports = mongoose.model("Quiz", quizSchema);
