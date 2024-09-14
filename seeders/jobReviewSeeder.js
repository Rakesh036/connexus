const mongoose = require("mongoose");
const Job = require("../models/job");
const JobReview = require("../models/jobReview");
const User = require("../models/user");

const { validateJobReview} = require('../schemas/jobReviewSchema');
const logger = require("../utils/logger"); // Import logger

const reviewData = [
  {
    comment: "Great work environment and amazing learning opportunities.",
  },
  {
    comment: "The salary was good, but work-life balance needs improvement.",
  },
  {
    comment: "Excellent mentorship and team collaboration.",
  },
  {
    comment: "Had some challenges with management but overall a good experience.",
  },
  // Add more review comments as needed
];

async function jobReviewSeeder() {
  try {
    // Clear existing job reviews
    await JobReview.deleteMany({});
    logger.info("Existing job reviews cleared.");

    // Fetch all job and user IDs
    const jobs = await Job.find({});
    const users = await User.find({});
    const jobIds = jobs.map(job => job._id);
    const userIds = users.map(user => user._id);

    for (const review of reviewData) {
      // Validate the review data
      try {
        await validateJobReview({ jobReview: review });
      } catch (validationError) {
        logger.error(`Failed to validate review: ${validationError.message}`);
        continue; // Skip this review and move to the next one
      }

      // Pick a random job and user for the review
      const randomJob = jobIds[Math.floor(Math.random() * jobIds.length)];
      review.author = userIds[Math.floor(Math.random() * userIds.length)];

      // Create the job review
      const newReview = await JobReview.create(review);
      logger.info(`Review added for Job ID "${randomJob}".`);

      // Update the job with the new review
      await Job.findByIdAndUpdate(randomJob, { $push: { reviews: newReview._id } });
    }

    logger.info("Job reviews seeded successfully!");
  } catch (error) {
    logger.error("Error seeding job reviews:", error);
  }
}

module.exports = jobReviewSeeder;
