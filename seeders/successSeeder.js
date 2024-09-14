const mongoose = require("mongoose");
const Success = require("../models/success");
const User = require("../models/user");
const logger = require('../utils/logger'); // Import your logger

const successData = [
  {
    title: "Achieved Promotion at Work",
    description: "After years of hard work and dedication, I was promoted to a senior role at my company.",
  },
  {
    title: "Completed Marathon",
    description: "Ran my first full marathon and achieved my personal best time of 4 hours.",
  },
  {
    title: "Launched My Own Business",
    description: "Started my own e-commerce platform selling sustainable products and gained over 1000 customers in the first month!",
  },
  {
    title: "Graduated with Honors",
    description: "Graduated from university with top honors in my Computer Science degree.",
  },
];

async function successSeeder() {
  try {
    // Clear existing success stories
    await Success.deleteMany({});
    logger.info("Existing success stories cleared.");

    // Fetch all users
    const users = await User.find({});
    const userIds = users.map(user => user._id);

    if (userIds.length === 0) {
      logger.warn("No users found to assign success stories to.");
      return;
    }

    for (const successStory of successData) {
      // Pick a random user as the owner of the success story
      const randomUser = users[Math.floor(Math.random() * users.length)];
      successStory.owner = randomUser._id;

      // Randomly assign some users to like the success story
      const randomLikes = [];
      const numberOfLikes = Math.floor(Math.random() * userIds.length); // Random number of likes
      for (let i = 0; i < numberOfLikes; i++) {
        const randomLiker = userIds[Math.floor(Math.random() * userIds.length)];
        if (!randomLikes.includes(randomLiker)) {
          randomLikes.push(randomLiker);
        }
      }
      successStory.likes = randomLikes;

      // Create the success story
      const newSuccessStory = await Success.create(successStory);
      logger.info(`Success story "${successStory.title}" added, created by ${randomUser.username}.`);

      // Optionally, if you want to handle other relationships or further modifications, you can do so here.
    }

    logger.info("Success stories seeded successfully!");
  } catch (error) {
    logger.error("Error seeding success stories:", error);
  }
}

module.exports = successSeeder;
