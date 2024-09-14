const mongoose = require("mongoose");
const DiscussionReview = require("../models/discussionReview");
const Discussion = require("../models/discussion");
const User = require("../models/user");

const discussionReviewData = [
  {
    comment: "Great discussion! Thanks for sharing.",
  },
  {
    comment: "I had a similar issue, here's how I solved it...",
  },
  {
    comment: "This is a very informative post, thanks!",
  },
  {
    comment: "I appreciate the advice, really helpful!",
  },
  {
    comment: "Congrats on your achievement! Keep going!",
  },
  // Add more reviews as needed
];

async function discussionReviewSeeder() {
  try {
    // Clear existing discussion reviews
    await DiscussionReview.deleteMany({});
    console.log("Existing discussion reviews cleared.");

    // Fetch all discussion and user IDs
    const discussions = await Discussion.find({});
    const users = await User.find({});
    const discussionIds = discussions.map(discussion => discussion._id);
    const userIds = users.map(user => user._id);

    for (const review of discussionReviewData) {
      // Assign a random discussion and user (author) to each review
      review.author = userIds[Math.floor(Math.random() * userIds.length)];
      const randomDiscussion = discussionIds[Math.floor(Math.random() * discussionIds.length)];

      // Create the review
      const newReview = await DiscussionReview.create(review);
      console.log(`Review "${review.comment}" added.`);

      // Update the discussion's reviews array
      await Discussion.findByIdAndUpdate(randomDiscussion, { $push: { reviews: newReview._id } });
      console.log(`Discussion "${randomDiscussion}" updated with new review.`);
    }

    console.log("Discussion review data seeded successfully!");
  } catch (error) {
    console.error("Error seeding discussion review data:", error);
  }
}

module.exports = discussionReviewSeeder;
