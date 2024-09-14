const mongoose = require("mongoose");
const Discussion = require("../models/discussion");
const User = require("../models/user");

const discussionData = [
  {
    title: "How to get started with Node.js?",
    description: "I'm new to backend development. Can someone guide me on how to get started with Node.js?",
    queryType: "Technical Query",
  },
  {
    title: "Looking for internship advice",
    description: "I'm currently in my final year and seeking advice on how to apply for internships in tech companies.",
    queryType: "Internship",
  },
  {
    title: "Sharing my first coding project",
    description: "I just completed my first coding project! Would love feedback and suggestions for improvement.",
    queryType: "Achievement",
  },
  {
    title: "Help needed with debugging",
    description: "I'm stuck with a bug in my Python code. Can anyone help?",
    queryType: "Help",
  },
  {
    title: "General life update",
    description: "Just wanted to share a life update with the community.",
    queryType: "Life Update",
  },
  // Add more discussions as needed
];

async function discussionSeeder() {
  try {
    // Clear existing discussions
    await Discussion.deleteMany({});
    console.log("Existing discussions cleared.");

    // Fetch all user IDs
    const users = await User.find({});
    const userIds = users.map(user => user._id);

    for (const discussion of discussionData) {
      // Assign a random user as the owner of the discussion
      discussion.owner = userIds[Math.floor(Math.random() * userIds.length)];

      // Create the discussion
      const newDiscussion = await Discussion.create(discussion);
      console.log(`Discussion "${discussion.title}" added.`);
    }

    console.log("Discussion data seeded successfully!");
  } catch (error) {
    console.error("Error seeding discussion data:", error);
  }
}

module.exports = discussionSeeder;
