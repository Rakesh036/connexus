const quizzes = [
  {
    title: "Introduction to AI",
    questions: [
      {
        questionText: "What does AI stand for?",
        options: ["Artificial Intelligence", "Advanced Integration", "Automatic Input", "None of the above"],
        correctAnswer: 0
      },
      {
        questionText: "Which company is known for its AI research?",
        options: ["Google", "Microsoft", "Apple", "All of the above"],
        correctAnswer: 3
      }
    ],
    group: "64b27d1f8a8b8d8d8d8d8d8d",
    createdBy: "64b27d1f8a8b8d8d8d8d8d8d",
    scores: []
  },
  {
    title: "Web Development Basics",
    questions: [
      {
        questionText: "What does HTML stand for?",
        options: ["Hypertext Markup Language", "Hyperlink and Text Markup Language", "High-level Text Markup Language", "None of the above"],
        correctAnswer: 0
      },
      {
        questionText: "Which of these is a CSS property?",
        options: ["font-size", "color-scheme", "text-align", "All of the above"],
        correctAnswer: 3
      }
    ],
    group: "64b27d1f8a8b8d8d8d8d8d9e",
    createdBy: "64b27d1f8a8b8d8d8d8d8d9e",
    scores: []
  },
  {
    title: "Data Science Fundamentals",
    questions: [
      {
        questionText: "What is the primary language used for data science?",
        options: ["Python", "Java", "C++", "Ruby"],
        correctAnswer: 0
      },
      {
        questionText: "Which library is commonly used for data manipulation in Python?",
        options: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
        correctAnswer: 1
      }
    ],
    group: "64b27d1f8a8b8d8d8d8d8d0f",
    createdBy: "64b27d1f8a8b8d8d8d8d8d0f",
    scores: []
  },
  {
    title: "Blockchain Basics",
    questions: [
      {
        questionText: "What is a blockchain?",
        options: ["A decentralized ledger", "A type of database", "A programming language", "None of the above"],
        correctAnswer: 0
      },
      {
        questionText: "Which cryptocurrency is based on blockchain technology?",
        options: ["Bitcoin", "Ethereum", "Ripple", "All of the above"],
        correctAnswer: 3
      }
    ],
    group: "64b27d1f8a8b8d8d8d8d8d1g",
    createdBy: "64b27d1f8a8b8d8d8d8d8d1g",
    scores: []
  },
  {
    title: "Cybersecurity Awareness",
    questions: [
      {
        questionText: "What is a common method of phishing?",
        options: ["Email scams", "Social media hacking", "Malware", "None of the above"],
        correctAnswer: 0
      },
      {
        questionText: "Which of these is a good practice for password security?",
        options: ["Using the same password for all accounts", "Changing passwords frequently", "Sharing passwords with trusted friends", "None of the above"],
        correctAnswer: 1
      }
    ],
    group: "64b27d1f8a8b8d8d8d8d8d2h",
    createdBy: "64b27d1f8a8b8d8d8d8d8d2h",
    scores: []
  },
  {
    title: "Machine Learning Algorithms",
    questions: [
      {
        questionText: "What is supervised learning?",
        options: ["Training with labeled data", "Training with unlabeled data", "Training with semi-labeled data", "None of the above"],
        correctAnswer: 0
      },
      {
        questionText: "Which algorithm is used for classification tasks?",
        options: ["K-Means", "Linear Regression", "Support Vector Machines", "None of the above"],
        correctAnswer: 2
      }
    ],
    group: "64b27d1f8a8b8d8d8d8d8d8d",
    createdBy: "64b27d1f8a8b8d8d8d8d8d",
    scores: []
  },
  {
    title: "Cloud Computing Basics",
    questions: [
      {
        questionText: "What is cloud computing?",
        options: ["Internet-based computing", "Local server computing", "Private network computing", "None of the above"],
        correctAnswer: 0
      },
      {
        questionText: "Which of these is a cloud service provider?",
        options: ["Amazon Web Services", "Google Drive", "Dropbox", "All of the above"],
        correctAnswer: 3
      }
    ],
    group: "64b27d1f8a8b8d8d8d8d8d8d",
    createdBy: "64b27d1f8a8b8d8d8d8d8d",
    scores: []
  },
  {
    title: "Software Testing Techniques",
    questions: [
      {
        questionText: "What is unit testing?",
        options: ["Testing individual components", "Testing integrated components", "Testing the entire application", "None of the above"],
        correctAnswer: 0
      },
      {
        questionText: "Which tool is used for automated testing?",
        options: ["Selenium", "JIRA", "Postman", "None of the above"],
        correctAnswer: 0
      }
    ],
    group: "64b27d1f8a8b8d8d8d8d8d9e",
    createdBy: "64b27d1f8a8b8d8d8d8d8d9e",
    scores: []
  },
  {
    title: "Ethical Hacking",
    questions: [
      {
        questionText: "What is ethical hacking?",
        options: ["Hacking for legal and security purposes", "Hacking for illegal gain", "Hacking to harm others", "None of the above"],
        correctAnswer: 0
      },
      {
        questionText: "Which certification is popular for ethical hackers?",
        options: ["CEH", "CISSP", "CompTIA Security+", "None of the above"],
        correctAnswer: 0
      }
    ],
    group: "64b27d1f8a8b8d8d8d8d8d8d",
    createdBy: "64b27d1f8a8b8d8d8d8d8d",
    scores: []
  },
  {
    title: "Digital Transformation",
    questions: [
      {
        questionText: "What is digital transformation?",
        options: ["Integrating digital technology into all areas of business", "Switching to digital marketing only", "Replacing physical products with digital ones", "None of the above"],
        correctAnswer: 0
      },
      {
        questionText: "Which technology is commonly used in digital transformation?",
        options: ["Cloud Computing", "Blockchain", "IoT", "All of the above"],
        correctAnswer: 3
      }
    ],
    group: "64b27d1f8a8b8d8d8d8d8d0f",
    createdBy: "64b27d1f8a8b8d8d8d8d8d0f",
    scores: []
  },
  {
    title: "Networking Basics",
    questions: [
      {
        questionText: "What does IP stand for in networking?",
        options: ["Internet Protocol", "Internal Protocol", "Integrated Protocol", "None of the above"],
        correctAnswer: 0
      },
      {
        questionText: "What is a router used for?",
        options: ["Connecting networks", "Storing data", "Processing transactions", "None of the above"],
        correctAnswer: 0
      }
    ],
    group: "64b27d1f8a8b8d8d8d8d8d1g",
    createdBy: "64b27d1f8a8b8d8d8d8d8d1g",
    scores: []
  },
  {
    title: "Introduction to Python",
    questions: [
      {
        questionText: "What is Python used for?",
        options: ["Web Development", "Data Analysis", "Machine Learning", "All of the above"],
        correctAnswer: 3
      },
      {
        questionText: "Which of these is a Python data type?",
        options: ["Integer", "String", "List", "All of the above"],
        correctAnswer: 3
      }
    ],
  }];

module.exports = { data:quizzes };