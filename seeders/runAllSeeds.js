const mongoose = require("mongoose");
const mongoUrl = "mongodb://127.0.0.1:27017/wanderlust";
const User = require("../models/user");

// Import seeders
const discussionSeeder = require("./discussionSeeder");
const discussionReviewSeeder = require("./discussionReviewSeeder");
const donationSeeder = require("./donationSeeder");
const groupSeeder = require("./groupSeeder");
const jobSeeder = require("./jobSeeder");
const jobReviewSeeder = require("./jobReviewSeeder");
const notificationSeeder = require("./notificationSeeder");
const paymentSeeder = require("./paymentSeeder");
const quizSeeder = require("./quizSeeder");
const successSeeder = require("./successSeeder");
const successReviewSeeder = require("./successReviewSeeder");
const userSeeder = require("./userSeeder");

async function runSeeds() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Clear other collections
    await Promise.all([
      // require("../models/discussion").deleteMany({}),
      // require("../models/discussionReview").deleteMany({}),
      // require("../models/donation").deleteMany({}),
      // require("../models/group").deleteMany({}),
      // require("../models/job").deleteMany({}),
      // require("../models/jobReview").deleteMany({}),
      // require("../models/notification").deleteMany({}),
      // require("../models/payment").deleteMany({}),
      // require("../models/quiz").deleteMany({}),
      // require("../models/success").deleteMany({}),
      // require("../models/successReview").deleteMany({}),
    ]);
    // console.log("Old data cleared.");

    // Seed in proper sequence
    // await userSeeder();
    // await discussionSeeder();
    // await discussionReviewSeeder();
    await donationSeeder();
    // await groupSeeder();
    // await jobSeeder();
    // await jobReviewSeeder();
    // await notificationSeeder();
    // await paymentSeeder();
    // await quizSeeder();
    // await successSeeder();
    // await successReviewSeeder();

    console.log("Database successfully seeded!");
  } catch (error) {
    console.error("Error running seeders:", error);
  } finally {
    // Close MongoDB connection
    mongoose.connection.close();
  }
}

runSeeds();
