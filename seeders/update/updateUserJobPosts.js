const mongoose = require("mongoose");
const Job = require("../../models/job");
const User = require("../../models/user");

async function resetAndUpdateUserJobPosts(connection) {
  try {
    await User.updateMany({}, { $set: { jobPosts: [] } });
    console.log("Cleared old job data from users.");

    const jobs = await Job.find().populate("owner");

    for (const job of jobs) {
      const ownerId = job.owner?._id;

      if (!ownerId) {
        console.log(`Job ${job.title} has no owner, skipping...`);
        continue;
      }

      const user = await User.findById(ownerId);
      if (user && !user.jobPosts.includes(job._id)) {
        user.jobPosts.push(job._id);
        await user.save();
        console.log(`Updated user ${user.username}: added job ${job.title}`);
      } else if (user) {
        console.log(`User ${user.username} already has job ${job.title} in jobPosts.`);
      }
    }
    
    console.log("Job update completed successfully.");
  } catch (error) {
    console.error("Error resetting and updating user job posts:", error);
  }
}

// Export the function
module.exports.resetAndUpdateUserJobPosts = resetAndUpdateUserJobPosts;
