const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middlewares/auth");
const { isGroupOwner, isGroupMember, validateGroup } = require("../middlewares/group");
const { validateQuiz } = require("../middlewares/quiz");
const {
  listGroups,
  renderNewForm,
  createGroup,
  showGroup,
  renderEditForm,
  updateGroup,
  joinGroup,
  leaveGroup,
  deleteGroup,
  // Uncomment and add these if you want quiz functionalities
  // addQuiz,
  // showQuiz,
  // submitQuiz
} = require("../controllers/groupController");

router.get("/", isLoggedIn, listGroups);

router.get("/new", isLoggedIn, renderNewForm);

router.post("/", isLoggedIn, validateGroup, createGroup);

router.get("/:groupId", isLoggedIn, isGroupMember, showGroup);

router.get("/:groupId/edit", isLoggedIn, isGroupOwner, renderEditForm);

router.put("/:groupId", isLoggedIn, isGroupOwner, validateGroup, updateGroup);

router.post("/:groupId/join", isLoggedIn, joinGroup);

router.post("/:groupId/leave", isLoggedIn, leaveGroup);

router.delete("/:groupId", isLoggedIn, isGroupOwner, deleteGroup);

// Uncomment these routes if you are implementing quiz functionalities
// router.post("/:groupId/quizzes", isLoggedIn, validateQuiz, addQuiz);
// router.get("/:groupId/quizzes/:quizId", isLoggedIn, showQuiz);
// router.post("/:groupId/quizzes/:quizId/submit", isLoggedIn, submitQuiz);

module.exports = router;
