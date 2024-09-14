const mongoose = require("mongoose");
const Group = require("../models/group");
const User = require("../models/user");

const groupData = [
  {
    name: "Tech Innovators",
    description: "A group for technology enthusiasts and innovators.",
    motto: "Innovation through Collaboration",
    website: "https://techinnovators.example.com",
    contactEmail: "contact@techinnovators.example.com",
  },
  {
    name: "Environmental Advocates",
    description: "A group dedicated to environmental conservation and awareness.",
    motto: "Protecting Our Planet",
    website: "https://environmentaladvocates.example.com",
    contactEmail: "info@environmentaladvocates.example.com",
  },
  {
    name: "Local Artisans Network",
    description: "Supporting and promoting local artisans and craftsmen.",
    motto: "Craftsmanship at Its Best",
    website: "https://localartisans.example.com",
    contactEmail: "support@localartisans.example.com",
  },
  {
    name: "Health and Wellness",
    description: "A group focused on health, wellness, and fitness.",
    motto: "Wellness is Wealth",
    website: "https://healthandwellness.example.com",
    contactEmail: "contact@healthandwellness.example.com",
  },
  // Add more group entries as needed
];

async function groupSeeder() {
  try {
    // Clear existing groups
    await Group.deleteMany({});
    console.log("Existing groups cleared.");

    // Fetch all user IDs
    const users = await User.find({});
    const userIds = users.map(user => user._id);

    for (const group of groupData) {
      // Pick a random owner ID
      const ownerId = userIds[Math.floor(Math.random() * userIds.length)];

      // Pick random members (excluding the owner)
      const randomMembers = userIds
        .filter(id => id.toString() !== ownerId.toString())
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * (userIds.length - 1) + 1)); // Random number of members

      // Create the group
      const newGroup = await Group.create({
        ...group,
        owner: ownerId,
        members: randomMembers,
        memberCount: randomMembers.length + 1, // Include the owner in the count
      });
      console.log(`Group "${newGroup.name}" added.`);
    }

    console.log("Group data seeded successfully!");
  } catch (error) {
    console.error("Error seeding group data:", error);
  }
}

module.exports = groupSeeder;
