const express = require("express");
const router = express.Router();
const Group = require("../models/group");
const Quiz = require("../models/quiz");
const { isLoggedIn, isGroupOwner } = require("../middleware");
const { validateGroup, validateQuiz } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");

// List all groups
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const groups = await Group.find({}).populate("owner").exec();
    res.render("groups/index", { groups });
  })
);

// Show form to create a new group
router.get("/new", isLoggedIn, (req, res) => {
  res.render("groups/new");
});

// Create a new group
router.post(
  "/",
  isLoggedIn,
  validateGroup,
  wrapAsync(async (req, res) => {
    const group = new Group(req.body.group);
    group.owner = req.user._id;
    await group.save();
    res.redirect(`/groups/${group._id}`);
  })
);

// Show a single group
router.get(
  "/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const group = await Group.findById(req.params.id)
      .populate("members")
      .populate("quizzes")
      .exec();
    if (!group) {
      req.flash("error", "Group not found");
      return res.redirect("/groups");
    }
    res.render("groups/show", { group });
  })
);

// Show form to edit a group
router.get(
  "/:id/edit",
  isLoggedIn,
  isGroupOwner,
  wrapAsync(async (req, res) => {
    const group = await Group.findById(req.params.id);
    if (!group) {
      req.flash("error", "Group not found");
      return res.redirect("/groups");
    }
    res.render("groups/edit", { group });
  })
);

// Update a group
router.put(
  "/:id",
  isLoggedIn,
  isGroupOwner,
  // validateGroup,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const group = await Group.findByIdAndUpdate(id, { ...req.body.group });
    res.redirect(`/groups/${group._id}`);
  })
);

// Join a group
router.post(
  "/:id/join",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const group = await Group.findById(req.params.id);
    if (!group) {
      req.flash("error", "Group not found");
      return res.redirect("/groups");
    }
    const member = group.members.find((member) => member.equals(req.user._id));
    if (member) {
      req.flash("error", "You are already a member of this group");
      return res.redirect(`/groups/${group._id}`);
    }
    const newMember = await Member.create({
      user: req.user._id,
      group: group._id,
    });
    req.flash("success", "You have joined the group");
    res.redirect(`/groups/${group._id}`);
  })
);

// Leave a group
router.post(
  "/:id/leave",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const group = await Group.findById(req.params.id);
    if (!group) {
      req.flash("error", "Group not found");
      return res.redirect("/groups");
    }
    const member = await Member.findOne({
      user: req.user._id,
      group: group._id,
    });
    if (!member) {
      req.flash("error", "You are not a member of this group");
      return res.redirect(`/groups/${group._id}`);
    }
    await Member.findByIdAndRemove(member._id);
    req.flash("success", "You have left the group");
    res.redirect(`/groups/${group._id}`);
  })
);

// Delete a group
router.delete(
  "/:id",
  isLoggedIn,
  isGroupOwner,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Group.findByIdAndDelete(id);
    res.redirect("/groups");
  })
);

// Add quiz to group
router.post(
  "/:id/quizzes",
  isLoggedIn,
  validateQuiz,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const group = await Group.findById(id);
    const quiz = new Quiz(req.body.quiz);
    quiz.group = group._id;
    quiz.createdBy = req.user._id;
    await quiz.save();
    group.quizzes.push(quiz);
    await group.save();
    res.redirect(`/groups/${id}`);
  })
);

// Show quiz and allow members to take it
router.get(
  "/:id/quizzes/:quizId",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id, quizId } = req.params;
    const quiz = await Quiz.findById(quizId).populate("group").exec();
    if (!quiz) {
      req.flash("error", "Quiz not found");
      return res.redirect(`/groups/${id}`);
    }
    res.render("quizzes/show", { quiz });
  })
);

// Submit quiz answers
router.post(
  "/:id/quizzes/:quizId/submit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId);
    const score = calculateScore(req.body.answers, quiz);
    quiz.scores.push({ user: req.user._id, score });
    await quiz.save();
    res.redirect(`/groups/${quiz.group}`);
  })
);

// Function to calculate score based on submitted answers
function calculateScore(userAnswers, quiz) {
  let score = 0;
  quiz.questions.forEach((question, index) => {
    if (question.correctAnswer === userAnswers[index]) {
      score++;
    }
  });
  return score;
}

module.exports = router;
