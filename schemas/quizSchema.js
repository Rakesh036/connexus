const Joi = require("joi");

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
