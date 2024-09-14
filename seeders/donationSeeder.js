const mongoose = require("mongoose");
const Donation = require("../models/donation");
const Notification = require("../models/notification");

const donationData = [
  {
    title: "Support for Education",
    description:
      "A donation to support education for underprivileged children.",
    owner: new  mongoose.Types.ObjectId("66e59f8b8ab71b0c88c0505d"), // Example user ID
    isEmergency: false,
  },
  {
    title: "Medical Aid",
    description: "Emergency medical aid for a critical case.",
    owner: new  mongoose.Types.ObjectId("66e59f8b8ab71b0c88c0505e"), // Example user ID
    isEmergency: true,
  },
  {
    title: "Environmental Conservation",
    description: "Funding for a project aimed at environmental conservation.",
    owner: new  mongoose.Types.ObjectId("66e59f8b8ab71b0c88c0505f"), // Example user ID
    isEmergency: false,
  },
  {
    title: "Support for Local Artisans",
    description:
      "Helping local artisans with financial support to grow their businesses.",
    owner: new  mongoose.Types.ObjectId("66e59f8b8ab71b0c88c05060"), // Example user ID
    isEmergency: false,
  },
  {
    title: "Disaster Relief Fund",
    description: "Aid for disaster relief efforts in affected areas.",
    owner: new  mongoose.Types.ObjectId("66e59f8b8ab71b0c88c05061"), // Example user ID
    isEmergency: true,
  },
  // Add more donation entries as needed
];

async function donationSeeder() {
  try {
    await Donation.deleteMany({}); // Clear existing donations
    console.log("Existing donations cleared.");

    for (const donation of donationData) {
      await Donation.create(donation); // Insert each donation
      console.log(`Donation "${donation.title}" added.`);
    }

    console.log("Donation data seeded successfully!");
  } catch (error) {
    console.error("Error seeding donation data:", error);
  }
}

module.exports = donationSeeder;
