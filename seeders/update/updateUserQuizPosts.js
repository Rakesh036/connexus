const mongoose = require("mongoose");
const Quiz = require("../../models/quiz");
const User = require("../../models/user");

async function resetAndUpdateUserQuizzes(connection) {
  try {
    // Use the passed connection
    await connection;

    // Clear `quizzesCreated` and `quizzesParticipated` fields for all users
    await User.updateMany({}, { $set: { quizzesCreated: [], quizzesParticipated: [] } });
    console.log("Cleared old quiz data from users.");

    // Fetch all quizzes with populated creator and scores
    const quizzes = await Quiz.find().populate("createdBy").populate("scores.user");

    for (const quiz of quizzes) {
      const creatorId = quiz.createdBy?._id;

      if (!creatorId) {
        console.log(`Quiz ${quiz.title} has no creator, skipping...`);
        continue;
      }

      const creator = await User.findById(creatorId);
      if (creator && !creator.quizzesCreated.includes(quiz._id)) {
        creator.quizzesCreated.push(quiz._id);
        await creator.save();
        console.log(`Updated creator ${creator.username}: added quiz ${quiz.title} to quizzesCreated`);
      }

      for (const score of quiz.scores) {
        const participantId = score.user?._id;
        
        if (!participantId) {
          console.log(`Score entry in quiz ${quiz.title} has no user, skipping...`);
          continue;
        }

        const participant = await User.findById(participantId);
        if (participant && !participant.quizzesParticipated.includes(quiz._id)) {
          participant.quizzesParticipated.push(quiz._id);
          await participant.save();
          console.log(`Updated participant ${participant.username}: added quiz ${quiz.title} to quizzesParticipated`);
        }
      }
    }

    console.log("Quiz update completed successfully.");
  } catch (error) {
    console.error("Error resetting and updating quiz data:", error);
  }
}

// Export the function
module.exports.resetAndUpdateUserQuizzes = resetAndUpdateUserQuizzes;
