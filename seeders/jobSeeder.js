const mongoose = require("mongoose");
const Job = require("../models/job");
const User = require("../models/user");
const logger = require("../utils/logger"); // Import logger

const jobData = [
  {
    title: "Software Engineer",
    salary: 120000,
    location: "San Francisco, CA",
    jobType: "Full-time",
    companyName: "Tech Corp",
    applyLink: "https://techcorp.com/apply",
  },
  {
    title: "Frontend Developer",
    salary: 95000,
    location: "New York, NY",
    jobType: "Full-time",
    companyName: "Web Innovations",
    applyLink: "https://webinnovations.com/careers",
  },
  {
    title: "Data Analyst Intern",
    salary: 20000,
    location: "Remote",
    jobType: "Internship",
    companyName: "Data Insights",
    applyLink: "https://datainsights.com/apply",
  },
  // Add more job listings as needed
];

async function jobSeeder() {
  try {
    // Clear existing jobs
    await Job.deleteMany({});
    logger.info("Existing jobs cleared.");

    // Fetch all user IDs
    const users = await User.find({});
    const userIds = users.map(user => user._id);

    for (const job of jobData) {
      // Validate the job data
      try {
        await validateJob(job);
      } catch (validationError) {
        logger.error(`Failed to validate job: ${validationError.message}`);
        continue; // Skip this job and move to the next one
      }

      // Pick a random user ID for the job owner
      job.owner = userIds[Math.floor(Math.random() * userIds.length)];

      // Create the job
      const newJob = await Job.create(job);
      logger.info(`Job "${job.title}" added.`);
    }

    logger.info("Job data seeded successfully!");
  } catch (error) {
    logger.error("Error seeding job data:", error);
  }
}

module.exports = jobSeeder;
