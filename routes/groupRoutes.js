const express = require("express");
const router = express.Router();
const logger = require("../utils/logger"); // Import the logger

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

// Route to list all groups
router.get("/", isLoggedIn, (req, res, next) => {
  logger.info(`User ${req.user._id} is fetching the list of all groups`);
  next();
}, listGroups);

// Route to display the form for creating a new group
router.get("/new", isLoggedIn, (req, res, next) => {
  logger.info(`User ${req.user._id} is requesting the form to create a new group`);
  next();
}, renderNewForm);

// Route to create a new group
router.post("/", isLoggedIn, (req, res, next) => {
  logger.info(`User ${req.user._id} is creating a new group`);
  next();
}, validateGroup, createGroup);

// Route to view a specific group
router.get("/:groupId", isLoggedIn, isGroupMember, (req, res, next) => {
  logger.info(`User ${req.user._id} is viewing details for group ${req.params.groupId}`);
  next();
}, showGroup);

// Route to display the form for editing a group
router.get("/:groupId/edit", isLoggedIn, isGroupOwner, (req, res, next) => {
  logger.info(`User ${req.user._id} is requesting the form to edit group ${req.params.groupId}`);
  next();
}, renderEditForm);

// Route to update a specific group
router.put("/:groupId", isLoggedIn, isGroupOwner, (req, res, next) => {
  logger.info(`User ${req.user._id} is updating group ${req.params.groupId}`);
  next();
}, validateGroup, updateGroup);

// Route to join a specific group
router.post("/:groupId/join", isLoggedIn, (req, res, next) => {
  logger.info(`User ${req.user._id} is joining group ${req.params.groupId}`);
  next();
}, joinGroup);

// Route to leave a specific group
router.post("/:groupId/leave", isLoggedIn, (req, res, next) => {
  logger.info(`User ${req.user._id} is leaving group ${req.params.groupId}`);
  next();
}, leaveGroup);

// Route to delete a specific group
router.delete("/:groupId", isLoggedIn, isGroupOwner, (req, res, next) => {
  logger.info(`User ${req.user._id} is attempting to delete group ${req.params.groupId}`);
  next();
}, deleteGroup);

// Uncomment these routes if you are implementing quiz functionalities
// router.post("/:groupId/quizzes", isLoggedIn, validateQuiz, (req, res, next) => {
//   logger.info(`User ${req.user._id} is adding a quiz to group ${req.params.groupId}`);
//   next();
// }, addQuiz);

// router.get("/:groupId/quizzes/:quizId", isLoggedIn, (req, res, next) => {
//   logger.info(`User ${req.user._id} is viewing quiz ${req.params.quizId} in group ${req.params.groupId}`);
//   next();
// }, showQuiz);

// router.post("/:groupId/quizzes/:quizId/submit", isLoggedIn, (req, res, next) => {
//   logger.info(`User ${req.user._id} is submitting quiz ${req.params.quizId} in group ${req.params.groupId}`);
//   next();
// }, submitQuiz);

module.exports = router;
