const mongoose = require("mongoose");
const Job = require("../models/job");
const User = require("../models/user");

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
    console.log("Existing jobs cleared.");

    // Fetch all user IDs
    const users = await User.find({});
    const userIds = users.map(user => user._id);

    for (const job of jobData) {
      // Pick a random user ID for the job owner
      job.owner = userIds[Math.floor(Math.random() * userIds.length)];

      // Create the job
      const newJob = await Job.create(job);
      console.log(`Job "${job.title}" added.`);

      // Optionally, add logic to automatically seed reviews, likes, or reports if needed
    }

    console.log("Job data seeded successfully!");
  } catch (error) {
    console.error("Error seeding job data:", error);
  }
}

module.exports = jobSeeder;
