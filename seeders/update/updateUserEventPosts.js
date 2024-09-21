const mongoose = require("mongoose");
const Event = require("../../models/event"); // Adjust the path as necessary
const User = require("../../models/user"); // Adjust the path as necessary

async function resetAndUpdateUserEventPosts(connection) {
  try {
    // Use the passed connection
    await connection;

    // Step 1: Clear `eventsOrganised` and `eventsJoined` fields for all users
    await User.updateMany({}, { $set: { eventsOrganised: [], eventsJoined: [] } });
    console.log("Cleared old event data from users.");

    // Step 2: Fetch all events with populated organiser and joinMembers
    const events = await Event.find().populate("organiser joinMembers");

    // Step 3: Loop through each event
    for (const event of events) {
      const organiserId = event.organiser?._id; // Use optional chaining for safety

      // Ensure the organiser ID exists
      if (!organiserId) {
        console.log(`Event ${event.title} has no organiser, skipping...`);
        continue;
      }

      // Step 4: Update the organiser's eventsOrganised field
      const organiser = await User.findById(organiserId);
      if (organiser && !organiser.eventsOrganised.includes(event._id)) {
        organiser.eventsOrganised.push(event._id);
        await organiser.save();
        console.log(`Updated organiser ${organiser.username}: added event ${event.title}`);
      } else if (organiser) {
        console.log(`Organiser ${organiser.username} already has event ${event.title} in eventsOrganised.`);
      }

      // Step 5: Update participants' eventsJoined field
      for (const participant of event.joinMembers) {
        const user = await User.findById(participant._id);
        if (user && !user.eventsJoined.includes(event._id)) {
          user.eventsJoined.push(event._id);
          await user.save();
          console.log(`Updated participant ${user.username}: added event ${event.title}`);
        } else if (user) {
          console.log(`Participant ${user.username} already has event ${event.title} in eventsJoined.`);
        }
      }
    }

    console.log("Event update completed successfully.");
  } catch (error) {
    console.error("Error resetting and updating user event posts:", error);
  }
}

// Export the function
module.exports.resetAndUpdateUserEventPosts = resetAndUpdateUserEventPosts;
