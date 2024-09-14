const Success = require("../models/success");
const SuccessReview = require("../models/successReview");
const { successReviewSchema } = require("../schemas/successReviewSchema");
const { successSchema } = require("../schemas/successSchema");
const ExpressError = require("../utils/expressError");

module.exports.isStoryOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const successStory = await Success.findById(id);
    if (!successStory) {
      req.flash("error", "Success story not found");
      return res.redirect("/successes");
    }
    if (!successStory.owner.equals(res.locals.currUser._id)) {
      req.flash("error", "You don't have permission");
      return res.redirect(`/successes`);
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports.validateSuccess = (req, res, next) => {
  const { error } = successSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};

module.exports.isSuccessReviewAuthor = async (req, res, next) => {
  try {
    const { id, reviewId } = req.params;
    const review = await SuccessReview.findById(reviewId);
    if (!review) {
      req.flash("error", "Review not found");
      return res.redirect(`/successes`);
    }
    if (!review.author.equals(res.locals.currUser._id)) {
      req.flash("error", "You don't have permission");
      return res.redirect(`/successes`);
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports.validateSuccessReview = (req, res, next) => {
console.log("validate success review validate hone wala h, req.body: ",req.body);

  const { error } = successReviewSchema.validate(req.body);
  console.log("in validate success review after validate fxn");
  
  if (error) {
    console.log("validate success review me schema validate hogya error:  ", error);
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  console.log("validate success review ho gya ab next call hoga");
  
  next();
};
