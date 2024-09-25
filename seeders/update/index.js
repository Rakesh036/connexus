const mongoose = require("mongoose");

const updateUserJobPosts = require("./updateUserJobPosts").resetAndUpdateUserJobPosts;
const updateUserEventPosts = require("./updateUserEventPosts").resetAndUpdateUserEventPosts;
const updateUserQuizPosts = require("./updateUserQuizPosts").resetAndUpdateUserQuizzes;
const updateUserGroupPosts = require("./updateUserGroupPosts").resetAndUpdateUserGroupPosts;
const updateUserSuccessStories = require("./updateUserSuccessStories").resetAndUpdateUserSuccessStories;
const updateUserDiscussionPosts = require("./updateUserDiscussionPosts").resetAndUpdateUserDiscussionPosts;
const recalculateTotalCollection=require("./recalculateTotalCollection").recalculateDonorAmountsAndTotalCollection;

async function runUpdates() {
  try {
    const connection = await mongoose.connect("mongodb://localhost:27017/connexus20", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB.");

    // Pass the connection to each update function
    // await updateUserJobPosts(connection);
    // await updateUserEventPosts(connection);
    // await updateUserQuizPosts(connection);
    // await updateUserGroupPosts(connection);
    // await updateUserSuccessStories(connection);
    // await updateUserDiscussionPosts(connection);

    await recalculateTotalCollection(connection);  // Adjust the path as necessary

    console.log("All updates completed successfully.");
  } catch (error) {
    console.error("Error during updates:", error);
  } finally {
    await mongoose.connection.close();  // Make sure to await the close
    console.log("MongoDB connection closed.");
  }
}

// Execute the updates
runUpdates();
