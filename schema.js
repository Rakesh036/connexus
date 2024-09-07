const Joi = require("joi");

// Listing Schema
module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    queryType: Joi.string().required(),
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
    title: Joi.string(),
    description: Joi.string(),
    isEmergency:Joi.boolean().optional()
  }),
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
  name: Joi.string().required().trim(), // Changed from title to name
  description: Joi.string().trim(),
  motto: Joi.string().trim(), // Added motto
  website: Joi.string().uri().trim(), // Added website, validating as URI
  contactEmail: Joi.string().email().trim() // Added contactEmail, validating as email
});


// // Define the validation schema using Joi
// module.exports.quizSchema = Joi.object({
//   quiz: Joi.object({
//     title: Joi.string().required().min(1).max(100).messages({
//       "string.empty": "Quiz title is required",
//       "string.min": "Quiz title must be at least 1 characters long",
//       "string.max": "Quiz title cannot exceed 100 characters",
//     }),
//     questions: Joi.array()
//       .items(
//         Joi.object({
//           questionText: Joi.string().required().min(1).messages({
//             "string.empty": "Question text is required",
//             "string.min": "Question text must be at least 1 characters long",
//           }),
//           options: Joi.array()
//             .items(Joi.string().required().min(1))
//             .length(2)
//             .messages({
//               "array.length": "Each question must have exactly 4 options",
//               "string.empty": "Option text cannot be empty",
//             }),
//           correctAnswer: Joi.number()
//             .integer()
//             .min(1)
//             .max(4)
//             .required()
//             .messages({
//               "number.base": "Correct answer must be a number",
//               "number.min": "Correct answer index must be between 1 and 4",
//               "number.max": "Correct answer index must be between 1 and 4",
//             }),
//         })
//       )
//       .length(1)
//       .required()
//       .messages({
//         "array.length": "Quiz must contain exactly 5 questions",
//       }),
//   }).required(),
// });

module.exports.quizSchema = Joi.object({
  quiz: Joi.object({
    title: Joi.string().required().messages({
      "string.empty": "Quiz title is required",
    }),
    questions: Joi.array()
      .items(
        Joi.object({
          questionText: Joi.string().required().messages({
            "string.empty": "Question text is required",
          }),
          options: Joi.array()
            .items(Joi.string().required())
            .length(4)
            .messages({
              "array.length": "Each question must have exactly 4 options",
              "string.empty": "Option text cannot be empty",
            }),
          correctAnswer: Joi.number().integer().required().messages({
            "number.base": "Correct answer must be a number",
          }),
        })
      )
      .required()
      .messages({
        "array.required": "Quiz must contain questions",
      }),
  }).required(),
});

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

// Success Schema
module.exports.successSchema = Joi.object({
  success: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().allow("", null),
  }),
});

module.exports.successReviewSchema = Joi.object({
  review: Joi.object({
    comment: Joi.string().required(),
  }).required(),
});


module.exports.paymentSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email(),
  eventTitle: Joi.string(),
  amount: Joi.number().positive().required(),
  paymentMethod: Joi.string()
    .valid("UPI", "Credit Card", "Debit Card")
    .required(),
  upiId: Joi.when("paymentMethod", {
    is: "UPI",
    then: Joi.string(),
    otherwise: Joi.optional(),
  }),
  cardNumber: Joi.when("paymentMethod", {
    is: Joi.string().valid("Credit Card", "Debit Card"),
    then: Joi.string(),
    otherwise: Joi.optional(),
  }),
  expiryDate: Joi.when("paymentMethod", {
    is: Joi.string().valid("Credit Card", "Debit Card"),
    then: Joi.string(),
    otherwise: Joi.optional(),
  }),
  cvv: Joi.when("paymentMethod", {
    is: Joi.string().valid("Credit Card", "Debit Card"),
    then: Joi.string(),
    otherwise: Joi.optional(),
  }),
});

module.exports.userSearchSchema = Joi.object({
  location: Joi.string().allow(""),
  department: Joi.string().allow(""),
  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .allow(""),
  interests: Joi.array().items(Joi.string()).allow(null),
});

module.exports.validateUser = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Username is required.",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email.",
    "string.empty": "Email is required.",
  }),

  location: Joi.string().required().messages({
    "string.empty": "Location is required.",
  }),

  phone: Joi.string().optional(), // Optional phone number
  dob: Joi.date().optional(), // Optional date of birth
  city: Joi.string().optional(),
  country: Joi.string().optional(),
  graduationYear: Joi.number().optional(),
  degree: Joi.string().optional(),
  department: Joi.string().optional(),
  employer: Joi.string().optional(),
  jobTitle: Joi.string().optional(),
  industry: Joi.string().optional(),
  experience: Joi.number().optional(),
  skills: Joi.array().items(Joi.string()).optional(),
  projects: Joi.array().items(Joi.string()).optional(),
  achievements: Joi.array().items(Joi.string()).optional(),
  linkedin: Joi.string().uri().optional(),
  github: Joi.string().uri().optional(),
  profilePicture: Joi.string().optional(),
});

