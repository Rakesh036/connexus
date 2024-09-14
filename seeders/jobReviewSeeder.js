const mongoose = require("mongoose");
const Job = require("../models/job");
const JobReview = require("../models/jobReview");
const User = require("../models/user");

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
    console.log("Existing job reviews cleared.");

    // Fetch all job and user IDs
    const jobs = await Job.find({});
    const users = await User.find({});
    const jobIds = jobs.map(job => job._id);
    const userIds = users.map(user => user._id);

    for (const review of reviewData) {
      // Pick a random job and user for the review
      const randomJob = jobIds[Math.floor(Math.random() * jobIds.length)];
      review.author = userIds[Math.floor(Math.random() * userIds.length)];

      // Create the job review
      const newReview = await JobReview.create(review);
      console.log(`Review added for Job ID "${randomJob}".`);

      // Update the job with the new review
      await Job.findByIdAndUpdate(randomJob, { $push: { reviews: newReview._id } });
    }

    console.log("Job reviews seeded successfully!");
  } catch (error) {
    console.error("Error seeding job reviews:", error);
  }
}

module.exports = jobReviewSeeder;
