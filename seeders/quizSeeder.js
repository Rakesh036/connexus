const mongoose = require("mongoose");
const Quiz = require("../models/quiz");
const Group = require("../models/group");

const quizData = [
  {
    title: "JavaScript Basics",
    questions: [
      {
        questionText: "What is the correct syntax for referring to an external script called 'script.js'?",
        options: [
          "<script src='script.js'>",
          "<script href='script.js'>",
          "<script name='script.js'>",
          "<script link='script.js'>",
        ],
        correctAnswer: 0,
      },
      {
        questionText: "How do you create a function in JavaScript?",
        options: [
          "function myFunction()",
          "function:myFunction()",
          "function = myFunction()",
          "create function myFunction()",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    title: "Node.js Fundamentals",
    questions: [
      {
        questionText: "Which module is used to create a web server in Node.js?",
        options: [
          "http",
          "express",
          "mongoose",
          "fs",
        ],
        correctAnswer: 0,
      },
      {
        questionText: "What does 'npm' stand for?",
        options: [
          "Node Package Manager",
          "Node Programming Module",
          "Network Programming Module",
          "New Package Manager",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    title: "MongoDB Basics",
    questions: [
      {
        questionText: "Which command is used to insert a document into a MongoDB collection?",
        options: [
          "db.collection.insertOne()",
          "db.collection.add()",
          "db.collection.save()",
          "db.collection.push()",
        ],
        correctAnswer: 0,
      },
      {
        questionText: "Which method is used to retrieve documents from a MongoDB collection?",
        options: [
          "find()",
          "get()",
          "search()",
          "query()",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    title: "React.js Essentials",
    questions: [
      {
        questionText: "What is the main purpose of React?",
        options: [
          "To build user interfaces",
          "To create databases",
          "To manage HTTP requests",
          "To manage server-side rendering",
        ],
        correctAnswer: 0,
      },
      {
        questionText: "Which of the following is a valid React component lifecycle method?",
        options: [
          "componentDidMount",
          "componentWillRender",
          "componentIsReady",
          "componentDidLoad",
        ],
        correctAnswer: 0,
      },
    ],
  },
];

async function quizSeeder() {
  try {
    // Clear existing quizzes
    await Quiz.deleteMany({});
    console.log("Existing quizzes cleared.");

    // Fetch all groups with their owners
    const groups = await Group.find({}).populate("owner");

    if (groups.length === 0) {
      console.log("No groups found to assign quizzes to.");
      return;
    }

    for (const quiz of quizData) {
      // Randomly select a group and assign its owner as the quiz creator
      const randomGroup = groups[Math.floor(Math.random() * groups.length)];
      quiz.group = randomGroup._id;
      quiz.createdBy = randomGroup.owner._id;

      // Create the quiz
      const newQuiz = await Quiz.create(quiz);
      console.log(`Quiz "${quiz.title}" added, created by ${randomGroup.owner.username}.`);

      // Update the group's quizzes array with the newly created quiz
      await Group.findByIdAndUpdate(randomGroup._id, { $push: { quizzes: newQuiz._id } });
      console.log(`Group "${randomGroup._id}" updated with new quiz.`);
    }

    console.log("Quiz data seeded successfully!");
  } catch (error) {
    console.error("Error seeding quiz data:", error);
  }
}

module.exports = quizSeeder;
