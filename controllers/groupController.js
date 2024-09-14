const Group = require("../models/group");
const Quiz = require("../models/quiz");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");

module.exports.listGroups = wrapAsync(async (req, res) => {
  try {
    const groups = await Group.find({}).populate("owner");
    const currUserT = req.user._id;
    const allUsers = await User.find({}).sort({ point: -1 });

    allUsers.forEach((user, index) => {
      user.isStarAlumni = index < 2; // Mark only the top 2 users as Star Alumni
    });

    res.render("groups/index", {
      groups,
      currUserT,
      allUsers,
      cssFile: "/group/groupIndex.css",
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Unable to retrieve groups at the moment.");
    res.redirect("/");
  }
});

module.exports.renderNewForm = (req, res) => {
  res.render("groups/new", { cssFile: "group/groupNew.css" });
};

module.exports.createGroup = wrapAsync(async (req, res) => {
  const group = new Group(req.body.group);
  group.owner = req.user._id;
  group.members.push(req.user._id);
  await group.save();
  res.redirect(`/groups`);
});

module.exports.showGroup = wrapAsync(async (req, res) => {
  const groupId = req.params.groupId;
  const group = await Group.findById(groupId).populate("members");
  if (!group) {
    req.flash("error", "Group does not exist!");
    return res.redirect("/groups");
  }
  res.render("groups/show", { group, cssFile: "group/groupShow.css" });
});

module.exports.renderEditForm = wrapAsync(async (req, res) => {
  const group = await Group.findById(req.params.groupId);
  if (!group) {
    req.flash("error", "Group not found");
    return res.redirect("/groups");
  }
  res.render("groups/edit", { group, cssFile: "group/groupEdit.css" });
});

module.exports.updateGroup = wrapAsync(async (req, res) => {
  const { groupId } = req.params;
  const group = await Group.findByIdAndUpdate(groupId, { ...req.body.group });
  res.redirect(`/groups/${group._id}`);
});

module.exports.joinGroup = wrapAsync(async (req, res) => {
  const group = await Group.findById(req.params.groupId);
  if (!group) {
    req.flash("error", "Group not found");
    return res.redirect("/groups");
  }

  const memberExists = group.members.some((member) => member.equals(req.user._id));
  if (memberExists) {
    req.flash("error", "You are already a member of this group");
    return res.redirect(`/groups/${group._id}`);
  }

  group.members.push(req.user._id);
  group.memberCount += 1;
  await group.save();

  req.flash("success", "You have joined the group");
  res.redirect(`/groups/${group._id}`);
});

module.exports.leaveGroup = wrapAsync(async (req, res) => {
  const group = await Group.findById(req.params.groupId);
  if (!group) {
    req.flash("error", "Group not found");
    return res.redirect("/groups");
  }

  const memberIndex = group.members.findIndex((member) => member.equals(req.user._id));
  if (memberIndex === -1) {
    req.flash("error", "You are not a member of this group");
    return res.redirect(`/groups/${group._id}`);
  }

  group.members.splice(memberIndex, 1);
  group.memberCount -= 1;
  await group.save();

  req.flash("success", "You have left the group");
  res.redirect(`/groups/${group._id}`);
});

module.exports.deleteGroup = wrapAsync(async (req, res) => {
  const { groupId } = req.params;
  await Group.findByIdAndDelete(groupId);
  res.redirect("/groups");
});

// Uncomment and add these methods if you want to use quiz functionalities
// module.exports.addQuiz = wrapAsync(async (req, res) => {
//   const { groupId } = req.params;
//   const group = await Group.findById(groupId);
//   const quiz = new Quiz(req.body.quiz);
//   quiz.group = group._id;
//   quiz.createdBy = req.user._id;
//   await quiz.save();
//   group.quizzes.push(quiz);
//   await group.save();
//   res.redirect(`/groups/${groupId}`);
// });

// module.exports.showQuiz = wrapAsync(async (req, res) => {
//   const { groupId, quizId } = req.params;
//   const quiz = await Quiz.findById(quizId).populate("group");
//   if (!quiz) {
//     req.flash("error", "Quiz not found");
//     return res.redirect(`/groups/${groupId}`);
//   }
//   res.render("quizzes/show", { quiz });
// });

// module.exports.submitQuiz = wrapAsync(async (req, res) => {
//   const { quizId } = req.params;
//   const quiz = await Quiz.findById(quizId);
//   const score = calculateScore(req.body.answers, quiz);
//   quiz.scores.push({ user: req.user._id, score });
//   await quiz.save();
//   res.redirect(`/groups/${quiz.group}`);
// });

// function calculateScore(userAnswers, quiz) {
//   let score = 0;
//   quiz.questions.forEach((question, index) => {
//     if (question.correctAnswer === userAnswers[index]) {
//       score++;
//     }
//   });
//   return score;
// }
