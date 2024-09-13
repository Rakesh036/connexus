const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  viewQuizzes,
  showNewQuizForm,
  createQuiz,
  showQuiz,
  showEditQuizForm,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
  showLeaderboard,
  startQuiz,
} = require("../controllers/quizController");

const { isLoggedIn } = require("../middlewares/auth");
const {
  isGroupOwner,
  isGroupMember,
  isGroup,
} = require("../middlewares/group");
const { validateQuiz, isQuizCreator } = require("../middlewares/quiz");

router.get("/", isGroup, isGroupMember, viewQuizzes);

router.get(
  "/new",
  isLoggedIn,
  isGroup,
  isGroupOwner,
  showNewQuizForm
);

router.post(
  "/",
  isLoggedIn,
  isGroup,
  isGroupOwner,
  validateQuiz,
  createQuiz
);

router.get("/:id", showQuiz);

router.get("/:id/edit", isLoggedIn, isQuizCreator, showEditQuizForm);

router.put("/:id", isLoggedIn, validateQuiz, isQuizCreator, updateQuiz);

router.delete("/:id", isLoggedIn, isQuizCreator, deleteQuiz);

router.post("/:id/submit", isLoggedIn, isGroupMember, submitQuiz);

router.get("/:id/leaderboard", isLoggedIn, showLeaderboard);

router.get("/:id/start", isLoggedIn, startQuiz);

module.exports = router;
