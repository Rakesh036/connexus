const Listing = require("./models/listing");
const Review = require("./models/review");
const Job = require("./models/job");
const JobReview = require("./models/jobReview");
const { Donation, Transaction } = require("./models/donation");
const Group = require("./models/group.js");
const Quiz = require("./models/quiz.js");
const ExpressError = require("./utils/expressError");
const Success = require("./models/success.js");
const SuccessReview = require("./models/successReview.js");
const Joi = require("joi");

// middleware/errorHandler.js
module.exports.errorHandler = (err, req, res, next) => {
  // Determine the middleware name from the error object if provided
  const middlewareName = err.middlewareName || "Unknown Middleware";

  console.error(`Error in ${middlewareName}:`, err.message);

  res.status(err.statusCode || 500).render("error", { err });
};

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
  successReviewSchema,
  successSchema,
} = require("./schema.js");

// Middleware to check if user is logged in
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "Login required");
    return res.redirect("/auth/login");
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
    res.locals.redirectUrl = "/"; // Default fallback URL
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
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  console.log("review body: ", review);
  console.log("res.locals: ", res.locals);

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

// Middleware to validate a donation
module.exports.validateDonation = (req, res, next) => {
  const { error } = donationSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
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

module.exports.isGroup = async (req, res, next) => {
  console.log("req.params: ", req.params);
  const { groupId } = req.params;
  console.log("Group ID:", groupId); // Debugging step
  const group = await Group.findById(groupId);

  if (!group) {
    req.flash("error", "Group does not exist!");
    return res.redirect("/groups");
  }

  req.group = group;
  next();
};
// Middleware to check if user is the owner of a group
module.exports.isGroupOwner = async (req, res, next) => {
  const id = req.params.groupId;
  const group = await Group.findById(id).populate("owner");
  if (!group || !group.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that.");
    return res.redirect(`/groups/${id}`);
  }
  next();
};

// Middleware to check if the user is a member of the group
module.exports.isGroupMember = async (req, res, next) => {
  const { groupId } = req.params;
  const group = await Group.findById(groupId);

  if (!group) {
    req.flash("error", "Group not found.");
    return res.redirect("/groups");
  }

  // Check if the user is a member of the group
  const isMember = group.members.some((member) => member.equals(req.user._id));

  if (!isMember) {
    req.flash("error", "You need to join the group to access this.");
    return res.redirect(`/groups`);
  }

  next();
};

module.exports.validateGroup = (req, res, next) => {
  console.log("Group Data:", req.body.group); // Debugging line
  const { error } = groupSchema.validate(req.body.group);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    console.error("Validation Error:", errMsg); // Debugging line
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Middleware for validating Quiz data
module.exports.validateQuiz = (req, res, next) => {
  const { error } = quizSchema.validate(req.body.quiz);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Middleware to check if user is the creator of the quiz
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

// Middleware function to validate the quiz data
module.exports.validateQuiz = (req, res, next) => {
  const { error } = quizSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    req.flash("error", errorMessages.join(", "));
    return res.redirect("/groups"); // Redirect the user back to the form
  }
  next(); // Proceed if no validation errors
};

module.exports.isStoryOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const successStory = await Success.findById(id);
    if (!successStory) {
      req.flash("error", "Success story not found");
      return res.redirect("/successes"); // Adjust path as necessary
    }
    if (!successStory.owner.equals(res.locals.currUser._id)) {
      req.flash("error", "You don't have permission");
      return res.redirect(`/successes`); // Adjust path as necessary
    }
    next();
  } catch (err) {
    next(err);
  }
};

// Middleware for validating Success story data
module.exports.validateSuccess = (req, res, next) => {
  const { error } = successSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg); // Ensure ExpressError is correctly imported
  }
  next();
};

// Middleware to check if user is the author of a review
module.exports.isSuccessReviewAuthor = async (req, res, next) => {
  try {
    const { id, reviewId } = req.params;
    const review = await SuccessReview.findById(reviewId);
    if (!review) {
      req.flash("error", "Review not found");
      return res.redirect(`/successes`); // Adjust path as necessary
    }
    if (!review.author.equals(res.locals.currUser._id)) {
      req.flash("error", "You don't have permission");
      return res.redirect(`/successes`); // Adjust path as necessary
    }
    next();
  } catch (err) {
    next(err);
  }
};

// Middleware for validating Review data
module.exports.validateSuccessReview = (req, res, next) => {
  const { error } = successReviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

const { paymentSchema } = require("./schema");


module.exports.validatePayment = (req, res, next) => {
  const paymentSchema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().optional(),
    eventTitle: Joi.string().optional(),
    amount: Joi.number().required().min(0),
    paymentMethod: Joi.string()
      .valid("UPI", "Credit Card", "Debit Card")
      .required(),
    upiId: Joi.string().when("paymentMethod", {
      is: "UPI",
      then: Joi.required(),
    }),
    cardNumber: Joi.string().when("paymentMethod", {
      is: Joi.string().valid("Credit Card", "Debit Card"),
      then: Joi.required(),
    }),
    expiryDate: Joi.string().when("paymentMethod", {
      is: Joi.string().valid("Credit Card", "Debit Card"),
      then: Joi.required(),
    }),
    // Add other validation rules as necessary
  });

  const { error } = paymentSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    req.flash("error", msg);
    return res.redirect("back"); // Or send an appropriate response for an API
  }
  next();
};


module.exports.isUser = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // If the user is not authenticated, redirect to login or send an appropriate response
    req.flash("error", "You must be signed in to access this page.");
    return res.redirect("/login"); // or any other page like `/signin`
  }
  next();
};

module.exports.validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    req.flash("error", msg);
    return res.redirect("back"); // or return an error response for an API
  }
  next();
};

module.exports.isCurrentUser = (req, res, next) => {
  // Check if the user is logged in and if the user ID in the request params matches the logged-in user ID
  if (req.isAuthenticated() && req.user._id.equals(req.params.id)) {
    return next(); // User is authorized to access or modify this resource
  }
  req.flash("error", "You do not have permission to do that.");
  res.redirect("/"); // Redirect to the home page or any other appropriate route
};