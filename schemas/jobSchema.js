const Joi = require("joi");

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
