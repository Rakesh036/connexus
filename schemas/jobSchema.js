const Joi = require("joi");

// Define the schema
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

// Debugging example
const debugLog = (msg) => console.log(`DEBUG: ${msg}`);

module.exports.validateJob = (data) => {
  debugLog("Starting validation for job schema...");
  const { error } = module.exports.jobSchema.validate(data, { abortEarly: false });
  if (error) {
    debugLog(`Validation error: ${error.details.map(el => el.message).join(", ")}`);
    throw new Error(`Validation error: ${error.details.map(el => el.message).join(", ")}`);
  }
  debugLog("Validation passed successfully.");
  return true;
};
