const Listing = require("./models/listing");
const Review = require("./models/review");
const Job = require("./models/job");
const JobReview = require("./models/jobReview");
const { Donation, Transaction } = require("./models/donation");
const Group = require("./models/group.js");
const Quiz = require("./models/quiz.js");
const ExpressError = require("./utils/ExpressError");
const Joi = require("joi");

// Schema imports for JOI validation
const {
  listingSchema,
  reviewSchema,
  jobSchema,
  jobReviewSchema,
  donationSchema,
  transactionSchema,
  groupSchema,
  quizSchema,
} = require("./schema.js");

// Middleware to check if user is logged in
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "Login required");
    return res.redirect("/login");
  }
  next();
};

// Middleware to save redirect URL for user navigation
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.redirectUrl = req.session.returnTo;
    delete req.session.returnTo; // Clear the session after using it
  } else if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
    delete req.session.redirectUrl; // Clear the session after using it
  } else if (req.session.currentUrl) {
    res.locals.redirectUrl = req.session.currentUrl;
  } else {
    res.locals.redirectUrl = "/listings"; // Default fallback URL
  }
  next();
};

// Middleware to check if user is the owner of a listing
module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have permission");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

// Middleware for validating Listing data
module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Middleware for validating Review data
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Middleware to check if user is the author of a review
module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewsId } = req.params;
  const review = await Review.findById(reviewsId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have permission");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

// Middleware to check if user is the owner of a job
module.exports.isJobOwner = async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id).populate("owner"); // Ensure owner is populated
    if (!job) {
      req.flash("error", "Job not found!");
      return res.redirect("/jobs");
    }
    if (!job.owner._id.equals(res.locals.currUser._id)) {
      req.flash("error", "You don't have permission");
      return res.redirect(`/jobs/${id}`);
    }
    next();
  } catch (e) {
    next(e); // Pass any errors to the error-handling middleware
  }
};

// Middleware for validating Job data
module.exports.validateJob = (req, res, next) => {
  const { error } = jobSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Middleware for validating JobReview data
module.exports.validateJobReview = (req, res, next) => {
  const { error } = jobReviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Middleware to check if user is the author of a job review
module.exports.isJobReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const jobReview = await JobReview.findById(reviewId);
  if (!jobReview.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have permission");
    return res.redirect(`/jobs/${id}`);
  }
  next();
};

// Middleware to check if user is the owner of a donation
module.exports.isDonationOwner = async (req, res, next) => {
  const { id } = req.params;
  const donation = await Donation.findById(id);
  if (donation && !donation.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to modify this donation.");
    return res.redirect(`/donations/${id}`);
  }
  next();
};

// Middleware to check if user is the owner of a transaction
module.exports.isTransactionOwner = async (req, res, next) => {
  const { id, transactionId } = req.params;
  const transaction = await Transaction.findById(transactionId);
  if (!transaction.donor.equals(req.user._id)) {
    req.flash(
      "error",
      "You do not have permission to modify this transaction."
    );
    return res.redirect(`/donations/${id}`);
  }
  next();
};

// Middleware for validating Donation data
module.exports.validateDonation = (req, res, next) => {
  const { error } = donationSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Middleware for validating Transaction data
module.exports.validateTransaction = (req, res, next) => {
  const { error } = transactionSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Middleware to check if user is the owner of a group
module.exports.isGroupOwner = async (req, res, next) => {
  const { id } = req.params;
  const group = await Group.findById(id).populate("owner");
  if (!group || !group.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that.");
    return res.redirect(`/groups/${id}`);
  }
  next();
};

module.exports.validateGroup = (req, res, next) => {
  console.log('Group Data:', req.body.group); // Debugging line
  const { error } = groupSchema.validate(req.body.group);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(',');
    console.error('Validation Error:', errMsg); // Debugging line
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};



module.exports.validateQuiz = (req, res, next) => {
  console.log("Request Body:", req.body); // Log the request body
  const { error } = quizSchema.validate(req.body.quiz);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(',');
    console.error("Validation Error:", errMsg); // Log validation error details
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Middleware to check if user created the quiz
module.exports.isQuizCreator = async (req, res, next) => {
  const { id } = req.params;
  const quiz = await Quiz.findById(id).populate("createdBy");
  if (!quiz || !quiz.createdBy._id.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that.");
    return res.redirect(`/groups/${quiz.group}`);
  }
  next();
};
