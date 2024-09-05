const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateQuiz, isQuizCreator, isGroupOwner } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/expressError");
const Quiz = require("../models/quiz");
const Group = require("../models/group");
const { isLoggedIn, isGroupMember, isGroup } = require("../middleware"); // Assuming you have a middleware to check if the user is logged in

router.get(
  "/",
  isGroup,
  isGroupMember,
  wrapAsync(async (req, res) => {
    const { groupId } = req.params;
    const group = await Group.findById(groupId).populate("quizzes");
    res.render("quizzes/index", { group });
  })
);

// Route to show form to create a new quiz
// Add this to the /new route
router.get(
  "/new",
  isLoggedIn,
  isGroup,
  isGroupOwner,
  wrapAsync(async (req, res) => {
    const group = req.group; // Get the group from the isGroup middleware
    res.render("quizzes/new", { group });
  })
);
// Route to create a new quiz
router.post(
  "/",
  isLoggedIn,
  isGroup,
  isGroupOwner,
  validateQuiz,

  wrapAsync(async (req, res) => {
    const { groupId } = req.params; // Get the group ID from URL
    const group = await Group.findById(groupId); // Find the group by ID

    if (!group) {
      req.flash("error", "Group not found.");
      return res.redirect("/groups");
    }

    const quizData = req.body.quiz;

    // Create a new quiz with the form data
    const quiz = new Quiz({
      title: quizData.title,
      questions: quizData.questions.map((q) => ({
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer - 1, // Adjust index to be 0-based
      })),
      group: group._id, // Associate quiz with the group
      createdBy: req.user._id, // Associate quiz with the quiz creator (owner)
    });

    // Save the quiz and associate it with the group
    await quiz.save();

    // Push the quiz into the group's quizzes array and save the group
    group.quizzes.push(quiz._id);
    await group.save();

    req.flash("success", "Quiz created successfully!");
    res.redirect(`/groups/${groupId}/quizzes`);
  })
);

// Route to show a single quiz
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id, groupId } = req.params;
    const quiz = await Quiz.findById(id)
      .populate("group")
      .populate("scores.user");
    if (!quiz) {
      throw new ExpressError("Quiz not found", 404);
    }
    res.render("quizzes/show", {
      quiz,
      groupId,
      currUser: req.user._id,
    });
  })
);

// Route to show form to edit a quiz
router.get(
  "/:id/edit",
  isLoggedIn,
  isQuizCreator,
  wrapAsync(async (req, res) => {
    const { id, groupId } = req.params;
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      throw new ExpressError("Quiz not found", 404);
    }
    res.render("quizzes/edit", { quiz, groupId });
  })
);

// Route to update a quiz
router.put(
  "/:id",
  isLoggedIn,
  validateQuiz,
  isQuizCreator,
  wrapAsync(async (req, res) => {
    const { id, groupId } = req.params;
    const quiz = await Quiz.findByIdAndUpdate(id, { ...req.body.quiz });
    req.flash("success", "Successfully updated the quiz!");
    res.redirect(`/groups/${groupId}/quizzes/${id}`);
  })
);

// Route to delete a quiz
router.delete(
  "/:id",
  isLoggedIn,
  isQuizCreator,
  wrapAsync(async (req, res) => {
    const { id, groupId } = req.params;
    await Quiz.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted the quiz");
    res.redirect(`/groups/${groupId}`);
  })
);

// router.post(
//   "/:id/submit",
//   isLoggedIn,
//   isGroupMember,
//   wrapAsync(async (req, res) => {
//     const { id, groupId } = req.params;
//     const quiz = await Quiz.findById(id);
//     const userAnswers = req.body.answers || {}; // Default to an empty object if no answers

//     // Compare userAnswers with correct answers in the quiz
//     const score = quiz.questions.reduce((acc, question, index) => {
//       // If userAnswers[index] is undefined, they didn't answer the question
//       if (
//         userAnswers[index] !== undefined &&
//         parseInt(userAnswers[index]) === question.correctAnswer
//       ) {
//         acc += 1;
//       }
//       return acc;
//     }, 0);

//     // Do something with the score, like saving it to the user's record
//     req.flash(
//       "success",
//       `You scored ${score}/${quiz.questions.length} correct answers!`
//     );
//     res.redirect(`/groups/${groupId}/quizzes/${id}/leaderboard`);
//   })
// );

router.post(
  "/:id/submit",
  isLoggedIn,
  isGroupMember,
  wrapAsync(async (req, res) => {
    const { id, groupId } = req.params;
    const quiz = await Quiz.findById(id);
    const userAnswers = req.body.answers || {}; // Default to empty object if no answers

    // Calculate the user's score
    const score = quiz.questions.reduce((acc, question, index) => {
      if (
        userAnswers[index] !== undefined &&
        parseInt(userAnswers[index]) === question.correctAnswer
      ) {
        acc += 1;
      }
      return acc;
    }, 0);

    // Find if this user has already taken the quiz
    const existingScore = quiz.scores.find((s) => s.user.equals(req.user._id));

    if (existingScore) {
      // If user already has a score, update it
      existingScore.score = score;
    } else {
      // Otherwise, add a new score entry
      quiz.scores.push({ user: req.user._id, score });
    }

    // Save the updated quiz
    await quiz.save();

    req.flash(
      "success",
      `You scored ${score}/${quiz.questions.length} correct answers!`
    );
    res.redirect(`/groups/${groupId}/quizzes`);
  })
);
router.get(
  "/:id/leaderboard",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id, groupId } = req.params; // Quiz ID and Group ID
    const quiz = await Quiz.findById(id).populate("scores.user");

    // Get the logged-in user's score (if they've participated)
    const userScoreEntry = quiz.scores.find((score) =>
      score.user.equals(req.user._id)
    );
    const userScore = userScoreEntry ? userScoreEntry.score : null;

    // Prepare leaderboard data and sort by score in descending order
    const leaderboard = quiz.scores
      .map((score) => ({
        username: score.user.username,
        score: score.score,
      }))
      .sort((a, b) => b.score - a.score); // Sort by highest score first

    res.render("quizzes/leaderboard", {
      quiz,
      groupId,
      leaderboard,
      userScore,
    });
  })
);
// start quiz
router.get("/:id/start", isLoggedIn, (req, res) => {
  wrapAsync(async (req, res) => {
    const { id, groupId } = req.params;
    const quiz = await Quiz.findById(id)
      .populate("group")
      .populate("scores.user");
    if (!quiz) {
      throw new ExpressError("Quiz not found", 404);
    }
    res.render("quizzes/show", { quiz, groupId });
  });
});
module.exports = router;
