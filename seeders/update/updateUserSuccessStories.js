const mongoose = require("mongoose");
const Success = require("../../models/success"); // Adjust the path as necessary
const User = require("../../models/user"); // Adjust the path as necessary

async function resetAndUpdateUserSuccessStories(connection) {
  try {
    // Use the passed connection
    await connection;

    // Step 1: Clear `successStories` field for all users
    await User.updateMany({}, { $set: { successStories: [] } });
    console.log("Cleared old success story data from users.");

    // Step 2: Fetch all success stories with populated owner
    const successStories = await Success.find().populate("owner");

    // Step 3: Loop through each success story
    for (const story of successStories) {
      const ownerId = story.owner?._id; // Use optional chaining for safety

      // Ensure the owner ID exists
      if (!ownerId) {
        console.log(`Success story ${story.title} has no owner, skipping...`);
        continue;
      }

      // Step 4: Find the user by owner ID
      const user = await User.findById(ownerId);
      if (user) {
        // Ensure user.successStories is initialized
        user.successStories = user.successStories || [];
        if (!user.successStories.includes(story._id)) {
          // Add story ID to user's successStories if not already present
          user.successStories.push(story._id);
          await user.save();
          console.log(`Updated user ${user.username}: added success story ${story.title}`);
        } else {
          console.log(`User ${user.username} already has success story ${story.title} in successStories.`);
        }
      }
    }

    console.log("Success story update completed successfully.");
  } catch (error) {
    console.error("Error resetting and updating user success stories:", error);
  }
}

// Export the function
module.exports.resetAndUpdateUserSuccessStories = resetAndUpdateUserSuccessStories;
