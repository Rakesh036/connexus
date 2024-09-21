const mongoose = require("mongoose");
const Quiz = require("../../models/quiz"); // Adjust the path as necessary
const User = require("../../models/user"); // Adjust the path as necessary

mongoose.connect("mongodb://localhost:27017/connexus20", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function resetAndUpdateQuizzes() {
  try {
    // Step 1: Clear `quizzesCreated` and `quizzesParticipated` fields for all users
    await User.updateMany({}, { $set: { quizzesCreated: [], quizzesParticipated: [] } });
    console.log("Cleared old quiz data from users.");

    // Step 2: Fetch all quizzes with populated creator and scores
    const quizzes = await Quiz.find().populate("createdBy").populate("scores.user");

    for (const quiz of quizzes) {
      const creatorId = quiz.createdBy?._id;

      // Step 3: Ensure the creator ID exists
      if (!creatorId) {
        console.log(`Quiz ${quiz.title} has no creator, skipping...`);
        continue;
      }

      // Step 4: Update the quiz creator's `quizzesCreated`
      const creator = await User.findById(creatorId);
      if (creator && !creator.quizzesCreated.includes(quiz._id)) {
        creator.quizzesCreated.push(quiz._id);
        await creator.save();
        console.log(`Updated creator ${creator.username}: added quiz ${quiz.title} to quizzesCreated`);
      }

      // Step 5: Update each participant's `quizzesParticipated` based on the `scores` array
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
  } finally {
    mongoose.connection.close();
  }
}

// Run the update function
resetAndUpdateQuizzes();
