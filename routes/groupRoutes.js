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
  logger.info("======= [ROUTE: List Groups] =======");
  logger.info("[ACTION: Fetching All Groups]");
  logger.info("User ID: %s is fetching the list of all groups", req.user._id);
  next();
}, listGroups);

// Route to display the form for creating a new group
router.get("/new", isLoggedIn, (req, res, next) => {
  logger.info("======= [ROUTE: New Group Form] =======");
  logger.info("[ACTION: Requesting New Group Form]");
  logger.info("User ID: %s is requesting the form to create a new group", req.user._id);
  next();
}, renderNewForm);

// Route to create a new group
router.post("/", isLoggedIn, (req, res, next) => {
  logger.info("======= [ROUTE: Create Group] =======");
  logger.info("[ACTION: Creating New Group]");
  logger.info("User ID: %s is creating a new group", req.user._id);
  next();
}, validateGroup, createGroup);

// Route to view a specific group
router.get("/:groupId", isLoggedIn, isGroupMember, (req, res, next) => {
  logger.info("======= [ROUTE: View Group] =======");
  logger.info("[ACTION: Viewing Group Details]");
  logger.info("User ID: %s is viewing details for group %s", req.user._id, req.params.groupId);
  next();
}, showGroup);

// Route to display the form for editing a group
router.get("/:groupId/edit", isLoggedIn, isGroupOwner, (req, res, next) => {
  logger.info("======= [ROUTE: Edit Group Form] =======");
  logger.info("[ACTION: Requesting Edit Group Form]");
  logger.info("User ID: %s is requesting the form to edit group %s", req.user._id, req.params.groupId);
  next();
}, renderEditForm);

// Route to update a specific group
router.put("/:groupId", isLoggedIn, isGroupOwner, (req, res, next) => {
  logger.info("======= [ROUTE: Update Group] =======");
  logger.info("[ACTION: Updating Group]");
  logger.info("User ID: %s is updating group %s", req.user._id, req.params.groupId);
  next();
}, validateGroup, updateGroup);

// Route to join a specific group
router.post("/:groupId/join", isLoggedIn, (req, res, next) => {
  logger.info("======= [ROUTE: Join Group] =======");
  logger.info("[ACTION: Joining Group]");
  logger.info("User ID: %s is joining group %s", req.user._id, req.params.groupId);
  next();
}, joinGroup);

// Route to leave a specific group
router.post("/:groupId/leave", isLoggedIn, (req, res, next) => {
  logger.info("======= [ROUTE: Leave Group] =======");
  logger.info("[ACTION: Leaving Group]");
  logger.info("User ID: %s is leaving group %s", req.user._id, req.params.groupId);
  next();
}, leaveGroup);

// Route to delete a specific group
router.delete("/:groupId", isLoggedIn, isGroupOwner, (req, res, next) => {
  logger.info("======= [ROUTE: Delete Group] =======");
  logger.info("[ACTION: Attempting to Delete Group]");
  logger.info("User ID: %s is attempting to delete group %s", req.user._id, req.params.groupId);
  next();
}, deleteGroup);

// Uncomment these routes if you are implementing quiz functionalities
// router.post("/:groupId/quizzes", isLoggedIn, validateQuiz, (req, res, next) => {
//   logger.info("======= [ROUTE: Add Quiz] =======");
//   logger.info("[ACTION: Adding Quiz to Group]");
//   logger.info("User ID: %s is adding a quiz to group %s", req.user._id, req.params.groupId);
//   next();
// }, addQuiz);

// router.get("/:groupId/quizzes/:quizId", isLoggedIn, (req, res, next) => {
//   logger.info("======= [ROUTE: View Quiz] =======");
//   logger.info("[ACTION: Viewing Quiz]");
//   logger.info("User ID: %s is viewing quiz %s in group %s", req.user._id, req.params.quizId, req.params.groupId);
//   next();
// }, showQuiz);

// router.post("/:groupId/quizzes/:quizId/submit", isLoggedIn, (req, res, next) => {
//   logger.info("======= [ROUTE: Submit Quiz] =======");
//   logger.info("[ACTION: Submitting Quiz]");
//   logger.info("User ID: %s is submitting quiz %s in group %s", req.user._id, req.params.quizId, req.params.groupId);
//   next();
// }, submitQuiz);

module.exports = router;
