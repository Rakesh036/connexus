const Joi = require("joi");

// Listing Schema
module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
});

// Review Schema
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    comment: Joi.string().required(),
  }).required(),
});

// Job Schema
module.exports.jobSchema = Joi.object({
  job: Joi.object({
    title: Joi.string().required(),
    salary: Joi.number().required(),
    location: Joi.string().required(),
    jobType: Joi.string()
      .valid("Full-time", "Part-time", "Internship")
      .required(),
    companyName: Joi.string().required(),
    applyLink: Joi.string().uri().required(),
  }).required(),
});

// Job Review Schema
module.exports.jobReviewSchema = Joi.object({
  jobReview: Joi.object({
    comment: Joi.string().required(),
  }).required(),
});

// Donation Schema
module.exports.donationSchema = Joi.object({
  donation: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
});

// Transaction Schema
module.exports.transactionSchema = Joi.object({
  transaction: Joi.object({
    amount: Joi.number().min(10).required(),
    donor: Joi.string().hex().length(24).required(),
    donation: Joi.string().hex().length(24).required(),
  }).required(),
});

// Group Schema
module.exports.groupSchema = Joi.object({
  title: Joi.string().required().trim(),
  description: Joi.string().trim(),
});

// Quiz Schema
module.exports.quizSchema = Joi.object({
  title: Joi.string().required().trim(),
  questions: Joi.array()
    .items(
      Joi.object({
        questionText: Joi.string().required(),
        options: Joi.array().items(Joi.string()).required(),
        correctAnswer: Joi.number().min(0),
      })
    )
    .required(),
});

// Middleware for validating Transaction data
module.exports.validateTransaction = (req, res, next) => {
  const { error } = transactionSchema.validate(req.body.transaction);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    req.flash("error", errMsg);
    return res.redirect(`/donations/${req.params.id}`);
  }
  next();
};

// Middleware for validating Donation data
module.exports.validateDonation = (req, res, next) => {
  const { error } = donationSchema.validate(req.body.donation);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(",");
    req.flash("error", errMsg);
    return res.redirect("/donations/new"); // Adjust the redirect as needed
  }
  next();
};
