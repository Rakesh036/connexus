const Quiz = require("../models/quiz");
const { quizSchema } = require("../schemas/quizSchema");
const ExpressError = require("../utils/expressError");

module.exports.validateQuiz = (req, res, next) => {
  const { error } = quizSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    req.flash("error", errorMessages.join(", "));
    return res.redirect("/groups");
  }
  next();
};

module.exports.isQuizCreator = async (req, res, next) => {
  const { id } = req.params;
  const quiz = await Quiz.findById(id).populate("createdBy");
  if (!quiz) {
    req.flash("error", "Quiz not found");
    return res.redirect(`/groups/${quiz.group}`);
  }
  if (!quiz.createdBy._id.equals(req.user._id)) {
    req.flash("error", "You do not have permission to edit this quiz");
    return res.redirect(`/groups/${quiz.group}`);
  }
  next();
};
