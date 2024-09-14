const mongoose = require('mongoose');
const Donation = require('../models/donation');
const User = require('../models/user');
const { validateDonation } = require('../utils/validation'); // Import validation function
const logger = require('../utils/logger'); // Import logger

const donationData = [
  {
    title: "Support for Education",
    description: "A donation to support education for underprivileged children.",
    isEmergency: false,
  },
  {
    title: "Medical Aid",
    description: "Emergency medical aid for a critical case.",
    isEmergency: true,
  },
  {
    title: "Environmental Conservation",
    description: "Funding for a project aimed at environmental conservation.",
    isEmergency: false,
  },
  {
    title: "Support for Local Artisans",
    description: "Helping local artisans with financial support to grow their businesses.",
    isEmergency: false,
  },
  {
    title: "Disaster Relief Fund",
    description: "Aid for disaster relief efforts in affected areas.",
    isEmergency: true,
  },
  // Add more donation entries as needed
];

async function donationSeeder() {
  try {
    // Clear existing donations
    await Donation.deleteMany({});
    logger.info("Existing donations cleared.");

    // Fetch all user IDs
    const users = await User.find({});
    const userIds = users.map(user => user._id);

    for (const donation of donationData) {
      // Validate the donation data
      try {
        validateDonation(donation);
      } catch (validationError) {
        logger.error(`Failed to validate donation: ${validationError.message}`);
        continue; // Skip this donation and move to the next one
      }

      // Pick a random user ID
      donation.owner = userIds[Math.floor(Math.random() * userIds.length)];

      // Create the donation
      const newDonation = await Donation.create(donation);
      logger.info(`Donation "${donation.title}" added.`);

      // Update the user's donations array
      await User.findByIdAndUpdate(donation.owner, { $push: { donations: newDonation._id } });
      logger.info(`User "${donation.owner}" updated with new donation.`);
    }

    logger.info("Donation data seeded successfully!");
  } catch (error) {
    logger.error("Error seeding donation data:", error);
  }
}

module.exports = donationSeeder;
