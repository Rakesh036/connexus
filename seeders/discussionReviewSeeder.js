const mongoose = require('mongoose');
const DiscussionReview = require('../models/discussionReview');
const Discussion = require('../models/discussion');
const User = require('../models/user');
const { validateDiscussionReview } = require('../utils/validation'); // Import validation function
const logger = require('../utils/logger'); // Import the logger

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
    logger.info("Existing discussion reviews cleared.");

    // Fetch all discussion and user IDs
    const discussions = await Discussion.find({});
    const users = await User.find({});
    const discussionIds = discussions.map(discussion => discussion._id);
    const userIds = users.map(user => user._id);

    for (const review of discussionReviewData) {
      // Validate the review data
      try {
        validateDiscussionReview(review);
      } catch (validationError) {
        logger.error(`Failed to validate review: ${validationError.message}`);
        continue; // Skip this review and move to the next one
      }

      // Assign a random discussion and user (author) to each review
      review.author = userIds[Math.floor(Math.random() * userIds.length)];
      const randomDiscussion = discussionIds[Math.floor(Math.random() * discussionIds.length)];

      // Create the review
      const newReview = await DiscussionReview.create(review);
      logger.info(`Review "${review.comment}" added.`);

      // Update the discussion's reviews array
      await Discussion.findByIdAndUpdate(randomDiscussion, { $push: { reviews: newReview._id } });
      logger.info(`Discussion "${randomDiscussion}" updated with new review.`);
    }

    logger.info("Discussion review data seeded successfully!");
  } catch (error) {
    logger.error("Error seeding discussion review data:", error);
  }
}

module.exports = discussionReviewSeeder;
