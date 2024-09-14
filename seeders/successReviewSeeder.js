const mongoose = require("mongoose");
const SuccessReview = require("../models/successReview");
const Success = require("../models/success");
const User = require("../models/user");

const successReviewData = [
  {
    comment: "Incredible story, really inspiring!",
  },
  {
    comment: "Great journey, I learned a lot from this.",
  },
  {
    comment: "I can relate to this experience.",
  },
  // Add more reviews as needed
];

async function successReviewSeeder() {
  try {
    // Clear existing success reviews
    await SuccessReview.deleteMany({});
    console.log("Existing success reviews cleared.");

    // Fetch all success stories and user IDs
    const successStories = await Success.find({});
    const users = await User.find({});
    const successIds = successStories.map(success => success._id);
    const userIds = users.map(user => user._id);

    for (const review of successReviewData) {
      // Pick a random success story ID for the review
      review.success = successIds[Math.floor(Math.random() * successIds.length)];
      // Pick a random user ID for the review author
      review.author = userIds[Math.floor(Math.random() * userIds.length)];

      // Create the review
      const newReview = await SuccessReview.create(review);
      console.log(`Review added: "${review.comment}"`);

      // Update the success story's reviews array
      await Success.findByIdAndUpdate(review.success, { $push: { reviews: newReview._id } });
      console.log(`Success story "${review.success}" updated with new review.`);
    }

    console.log("Success reviews seeded successfully!");
  } catch (error) {
    console.error("Error seeding success reviews:", error);
  }
}

module.exports = successReviewSeeder;
