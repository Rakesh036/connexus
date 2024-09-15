// utils/userUtils.js

const User = require('../models/user');

async function getUserProfile(userId) {
  try {
    const userProfile = await User.findById(userId)
    //   .populate('connections')
      .populate('groupCreated')
      .populate('groupJoined')
      .populate('quizParticipated')
      .populate('donations')
      .populate('jobPosts')
      .populate('discussionPosts')
    //   .populate('eventsOrganised')
    //   .populate('eventsJoined')
      .exec();

    return userProfile;
  } catch (error) {
    throw new Error(`Error fetching user profile: ${error.message}`);
  }
}

module.exports = { getUserProfile };
