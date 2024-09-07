const express = require("express");
const router = express.Router();
const Group = require("../models/group");
const Quiz = require("../models/quiz");
const User = require("../models/user");
const { isLoggedIn, isGroupOwner, isGroupMember } = require("../middleware");
const { validateGroup, validateQuiz } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");



// Render the page with all users
// res.render("users/leaderboard", { allUsers });



// List all groups
router.get(
  "/",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const groups = await Group.find({}).populate("owner");
    const currUserT = req.user._id;
    const allUsers = await User.find({}).sort({ point: -1 }); // Sort all users by points in decreasing order

    // Loop through the users and mark the top 10 as "Star Alumni"
    allUsers.forEach((user, index) => {
      user.isStarAlumni = index < 2; // Mark only the top 10 users as Star Alumni
    });

    res.render("groups/index", {
      groups,
      currUserT,
      allUsers,
      cssFile: "groupIndex.css",
    });
  })
);

// Show form to create a new group
router.get("/new", isLoggedIn, (req, res) => {
  res.render("groups/new", { cssFile: "groupNew.css" });
});

// Create a new group
router.post(
  "/",
  isLoggedIn,
  validateGroup,
  wrapAsync(async (req, res) => {
    const group = new Group(req.body.group);
    group.owner = req.user._id;
    group.members.push(req.user._id);
    await group.save();
    res.redirect(`/groups`);
  })
);
// Show group details along with quizzes
router.get(
  "/:groupId",
  isLoggedIn,
  isGroupMember,
  wrapAsync(async (req, res) => {
    const groupId = req.params.groupId;
    const group = await Group.findById(groupId).populate("members");
    if (!group) {
      req.flash("error", "Group does not exist!");
      return res.redirect("/groups");
    }

    res.render("groups/show", { group, cssFile: "groupShow.css" });
  })
);

// Show form to edit a group
router.get(
  "/:groupId/edit",
  isLoggedIn,
  isGroupOwner,
  wrapAsync(async (req, res) => {
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      req.flash("error", "Group not found");
      return res.redirect("/groups");
    }
    res.render("groups/edit", { group, cssFile: "groupEdit.css" });
  })
);

// Update a group
router.put(
  "/:groupId",
  isLoggedIn,
  isGroupOwner,
  validateGroup,
  wrapAsync(async (req, res) => {
    const { groupId } = req.params;
    const group = await Group.findByIdAndUpdate(groupId, { ...req.body.group });
    res.redirect(`/groups/${group._id}`);
  })
);

// Join a group
router.post(
  "/:groupId/join",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      req.flash("error", "Group not found");
      return res.redirect("/groups");
    }

    // Check if the user is already a member
    const memberExists = group.members.some((member) =>
      member.equals(req.user._id)
    );
    if (memberExists) {
      req.flash("error", "You are already a member of this group");
      return res.redirect(`/groups/${group._id}`);
    }

    // Add the user to the members array
    group.members.push(req.user._id);
    group.memberCount += 1; // Increment member count
    await group.save();

    req.flash("success", "You have joined the group");
    res.redirect(`/groups/${group._id}`);
  })
);

// Leave a group
router.post(
  "/:groupId/leave",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const group = await Group.findById(req.params.id);
    if (!group) {
      req.flash("error", "Group not found");
      return res.redirect("/groups");
    }

    // Check if the user is a member
    const memberIndex = group.members.findIndex((member) =>
      member.equals(req.user._id)
    );
    if (memberIndex === -1) {
      req.flash("error", "You are not a member of this group");
      return res.redirect(`/groups/${group._id}`);
    }

    // Remove the user from the members array
    group.members.splice(memberIndex, 1);
    group.memberCount -= 1; // Decrement member count
    await group.save();

    req.flash("success", "You have left the group");
    res.redirect(`/groups/${group._id}`);
  })
);

// Delete a group
router.delete(
  "/:groupId",
  isLoggedIn,
  isGroupOwner,
  wrapAsync(async (req, res) => {
    const { groupId } = req.params;
    await Group.findByIdAndDelete(groupId);
    res.redirect("/groups");
  })
);

// // Add quiz to group
// router.post(
//   "/:groupId/quizzes",
//   isLoggedIn,
//   validateQuiz,
//   wrapAsync(async (req, res) => {
//     const { groupId } = req.params;
//     const group = await Group.findById(groupId);
//     const quiz = new Quiz(req.body.quiz);
//     quiz.group = group._id;
//     quiz.createdBy = req.user._id;
//     await quiz.save();
//     group.quizzes.push(quiz);
//     await group.save();
//     res.redirect(`/groups/${groupId}`);
//   })
// );

// // Show quiz and allow members to take it
// router.get(
//   "/:groupId/quizzes/:quizId",
//   isLoggedIn,
//   wrapAsync(async (req, res) => {
//     const { groupId, quizId } = req.params;
//     const quiz = await Quiz.findById(quizId).populate("group");
//     if (!quiz) {
//       req.flash("error", "Quiz not found");
//       return res.redirect(`/groups/${groupId}`);
//     }
//     res.render("quizzes/show", { quiz });
//   })
// );

// // Submit quiz answers
// router.post(
//   "/:groupId/quizzes/:quizId/submit",
//   isLoggedIn,
//   wrapAsync(async (req, res) => {
//     const { quizId } = req.params;
//     const quiz = await Quiz.findById(quizId);
//     const score = calculateScore(req.body.answers, quiz);
//     quiz.scores.push({ user: req.user._id, score });
//     await quiz.save();
//     res.redirect(`/groups/${quiz.group}`);
//   })
// );

// // Function to calculate score based on submitted answers
// function calculateScore(userAnswers, quiz) {
//   let score = 0;
//   quiz.questions.forEach((question, index) => {
//     if (question.correctAnswer === userAnswers[index]) {
//       score++;
//     }
//   });
//   return score;
// }

module.exports = router;
