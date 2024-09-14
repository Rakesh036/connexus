const Quiz = require("../models/quiz");
const Group = require("../models/group");
const ExpressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");

module.exports.viewQuizzes = wrapAsync(async (req, res) => {
  const { groupId } = req.params;
  const group = await Group.findById(groupId).populate("quizzes");
  if (!group) {
    req.flash("error", "Group not found.");
    return res.redirect("/groups");
  }
  res.render("quizzes/index", { group, cssFile: "quiz/quizIndex.css" });
});

module.exports.showNewQuizForm = wrapAsync(async (req, res) => {
  const group = req.group; // Get the group from the isGroup middleware
  res.render("quizzes/new", { group, cssFile: "quiz/quizNew.css" });
});

module.exports.createQuiz = wrapAsync(async (req, res) => {
  const { groupId } = req.params;
  const group = await Group.findById(groupId);
  if (!group) {
    req.flash("error", "Group not found.");
    return res.redirect("/groups");
  }

  const quizData = req.body.quiz;
  const quiz = new Quiz({
    title: quizData.title,
    questions: quizData.questions.map(q => ({
      questionText: q.questionText,
      options: q.options,
      correctAnswer: q.correctAnswer - 1, // Adjust index to be 0-based
    })),
    group: group._id,
    createdBy: req.user._id,
  });

  await quiz.save();
  group.quizzes.push(quiz._id);
  await group.save();

  req.flash("success", "Quiz created successfully!");
  res.redirect(`/groups/${groupId}/quizzes`);
});

module.exports.showQuiz = wrapAsync(async (req, res) => {
  const { id, groupId } = req.params;
  const quiz = await Quiz.findById(id).populate("group").populate("scores.user");
  if (!quiz) {
    throw new ExpressError("Quiz not found", 404);
  }
  res.render("quizzes/show", {
    quiz,
    groupId,
    currUser: req.user._id,
    cssFile: "quiz/quizShow.css",
  });
});

module.exports.showEditQuizForm = wrapAsync(async (req, res) => {
  const { id, groupId } = req.params;
  const quiz = await Quiz.findById(id);
  if (!quiz) {
    throw new ExpressError("Quiz not found", 404);
  }
  res.render("quizzes/edit", { quiz, groupId, cssFile: "quiz/quizEdit.css" });
});

module.exports.updateQuiz = wrapAsync(async (req, res) => {
  const { id, groupId } = req.params;
  await Quiz.findByIdAndUpdate(id, { ...req.body.quiz });
  req.flash("success", "Successfully updated the quiz!");
  res.redirect(`/groups/${groupId}/quizzes/${id}`);
});

module.exports.deleteQuiz = wrapAsync(async (req, res) => {
  const { id, groupId } = req.params;
  await Quiz.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted the quiz");
  res.redirect(`/groups/${groupId}`);
});

module.exports.submitQuiz = wrapAsync(async (req, res) => {
  const { id, groupId } = req.params;
  const quiz = await Quiz.findById(id);
  const userAnswers = req.body.answers || {};
  
  const score = quiz.questions.reduce((acc, question, index) => {
    if (userAnswers[index] !== undefined && parseInt(userAnswers[index]) === question.correctAnswer) {
      acc += 1;
    }
    return acc;
  }, 0);

  const existingScore = quiz.scores.find(s => s.user.equals(req.user._id));
  if (existingScore) {
    existingScore.score = score;
  } else {
    quiz.scores.push({ user: req.user._id, score });
  }

  await quiz.save();
  req.flash("success", `You scored ${score}/${quiz.questions.length} correct answers!`);
  res.redirect(`/groups/${groupId}/quizzes`);
});

module.exports.showLeaderboard = wrapAsync(async (req, res) => {
  const { id, groupId } = req.params;
  const quiz = await Quiz.findById(id).populate("scores.user");

  const userScoreEntry = quiz.scores.find(score => score.user.equals(req.user._id));
  const userScore = userScoreEntry ? userScoreEntry.score : null;

  const leaderboard = quiz.scores
    .map(score => ({ username: score.user.username, score: score.score }))
    .sort((a, b) => b.score - a.score);

  res.render("quizzes/leaderboard", {
    quiz,
    groupId,
    leaderboard,
    userScore,
    cssFile: "quiz/quizLeaderboard.css",
  });
});

module.exports.startQuiz = wrapAsync(async (req, res) => {
  const { id, groupId } = req.params;
  const quiz = await Quiz.findById(id).populate("group").populate("scores.user");
  if (!quiz) {
    throw new ExpressError("Quiz not found", 404);
  }
  res.render("quizzes/show", { quiz, groupId, cssFile: "quiz/quizShow.css" });
});
