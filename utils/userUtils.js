// utils/userUtils.js

const User = require('../models/user');
const Donation = require('../models/donation'); // Import the Donation model

async function getUserProfile(userId) {
  try {
    const userProfile = await User.findById(userId)
      .populate('groupsCreated')
      .populate('groupsJoined')
      .populate('quizzesParticipated')
      .populate('quizzesCreated')
      .populate({
        path: 'donations',
        populate: {
          path: 'donors.user',
          model: 'User',
          // select: 'username',
        }
      })
      .populate({
        path: 'payments',
        populate: {
          path: 'donationId',
          model: 'Donation',
          select:'title',
        },
      }) // Ensure payment's donationId is populated
      .populate('jobPosts')
      .populate('discussionPosts')
      .populate('eventsOrganised')
      .populate('eventsJoined')
      .populate('successStories')
      .exec();

    return userProfile;
  } catch (error) {
    throw new Error(`Error fetching user profile: ${error.message}`);
  }
}

module.exports = { getUserProfile };
