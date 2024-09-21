const mongoose = require("mongoose");
const Job = require("../../models/job"); // Adjust the path as necessary
const User = require("../../models/user"); // Adjust the path as necessary

async function resetAndUpdateUserGroupPosts(connection) {
  try {
    // Use the passed connection
    await connection;

    // Step 1: Clear `jobPosts` field for all users
    await User.updateMany({}, { $set: { jobPosts: [] } });
    console.log("Cleared old job data from users.");

    // Step 2: Find all job posts and populate the owner field
    const jobs = await Job.find().populate("owner");

    // Step 3: Loop through each job
    for (const job of jobs) {
      const ownerId = job.owner?._id; // Optional chaining to prevent errors

      // Ensure the owner ID exists
      if (!ownerId) {
        console.log(`Job ${job.title} has no owner, skipping...`);
        continue;
      }

      // Step 4: Find the user by owner ID
      const user = await User.findById(ownerId);
      if (user && !user.jobPosts.includes(job._id)) {
        // Add job ID to user's jobPosts if not already present
        user.jobPosts.push(job._id);
        await user.save();
        console.log(`Updated user ${user.username}: added job ${job.title}`);
      } else {
        console.log(`User ${user.username} already has job ${job.title} in jobPosts.`);
      }
    }

    console.log("Job update completed successfully.");
  } catch (error) {
    console.error("Error resetting and updating user job posts:", error);
  }
}

// Export the function
module.exports.resetAndUpdateUserGroupPosts = resetAndUpdateUserGroupPosts;
