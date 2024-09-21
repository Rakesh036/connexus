const mongoose = require("mongoose");
const Job = require("../models/job"); // Adjust the path as necessary
const User = require("../models/user"); // Adjust the path as necessary

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/connexus20", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function updateUserJobPosts() {
  try {
    // Find all job posts
    const jobs = await Job.find().populate("owner"); // Populating the owner field

    // Loop through each job
    for (const job of jobs) {
      const ownerId = job.owner._id;

      // Check if the job ID is already in the user's jobPosts array
      const user = await User.findById(ownerId);
      if (user && !user.jobPosts.includes(job._id)) {
        // Add job ID to user's jobPosts if not already present
        user.jobPosts.push(job._id);
        await user.save();
        console.log(`Updated user ${user.username}: added job ${job.title}`);
      }
    }
    
    console.log("Update completed successfully.");
  } catch (error) {
    console.error("Error updating user job posts:", error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the update function
updateUserJobPosts();