const mongoose = require("mongoose");
const Discussion = require("../../models/discussion"); // Adjust the path as necessary
const User = require("../../models/user"); // Adjust the path as necessary

async function resetAndUpdateUserDiscussionPosts(connection) {
  try {
    // Use the passed connection
    await connection;

    // Step 1: Clear `discussionPosts` field for all users
    await User.updateMany({}, { $set: { discussionPosts: [] } });
    console.log("Cleared old discussion data from users.");

    // Step 2: Fetch all discussions with populated owner
    const discussions = await Discussion.find().populate("owner");

    // Step 3: Loop through each discussion
    for (const discussion of discussions) {
      const ownerId = discussion.owner?._id; // Use optional chaining for safety

      // Ensure the owner ID exists
      if (!ownerId) {
        console.log(`Discussion ${discussion.title} has no owner, skipping...`);
        continue;
      }

      // Step 4: Find the user by owner ID
      const user = await User.findById(ownerId);
      if (user && !user.discussionPosts.includes(discussion._id)) {
        // Add discussion ID to user's discussionPosts if not already present
        user.discussionPosts.push(discussion._id);
        await user.save();
        console.log(`Updated user ${user.username}: added discussion ${discussion.title}`);
      } else if (user) {
        console.log(`User ${user.username} already has discussion ${discussion.title} in discussionPosts.`);
      }
    }

    console.log("Discussion update completed successfully.");
  } catch (error) {
    console.error("Error resetting and updating user discussion posts:", error);
  }
}

// Export the function
module.exports.resetAndUpdateUserDiscussionPosts = resetAndUpdateUserDiscussionPosts;
