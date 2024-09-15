const mongoose = require("mongoose");
const User = require("../models/user"); // Adjust the path as necessary
const logger = require('../utils/logger'); // Import your logger

const users = [
  {
    username: "priya_m",
    email: "priya@domain.com",
    phone: "+919988776655",
    dob: "1990-05-15",
    city: "Mumbai",
    country: "India",
    graduationYear: 2012,
    degree: "MBA",
    department: "Marketing",
    employer: "BrandX",
    jobTitle: "Brand Manager",
    industry: "Marketing",
    experience: 8,
    skills: ["Marketing Strategy", "Campaign Management"],
    projects: ["Campaign X", "Campaign L"],
    achievements: ["Top Brand Manager"],
    linkedin: "https://www.linkedin.com/in/priya",
    github: "https://github.com/priya",
    connections: [],
    groupJoined: [],
    quizParticipated: [],
    donations: [],
    jobPosts: [],
    discussionPosts: [],
    eventsOrganised: [],
    eventsJoined: [],
    points: 170,
    isStarAlumni: true,
    password: "password123", // Add password
  },

  {
    username: "n",
    email: "rahul@domain.com",
    phone: "+919876543210",
    dob: "1990-01-15",
    city: "Delhi",
    country: "India",
    graduationYear: 2012,
    degree: "B.Tech",
    department: "Computer Science",
    employer: "TechCorp",
    jobTitle: "Software Engineer",
    industry: "IT",
    experience: 5,
    skills: ["JavaScript", "Node.js", "MongoDB"],
    projects: ["Project A", "Project B"],
    achievements: ["Employee of the Month"],
    linkedin: "https://www.linkedin.com/in/rahul",
    github: "https://github.com/rahul",
    connections: [],
    groupJoined: [],
    quizParticipated: [],
    donations: [],
    jobPosts: [],
    discussionPosts: [],
    eventsOrganised: [],
    eventsJoined: [],
    points: 100,
    isStarAlumni: false,
    password: "n", // Add password
  },
  {
    username: "anjali_s",
    email: "anjali@domain.com",
    phone: "+919988776655",
    dob: "1988-05-22",
    city: "Mumbai",
    country: "India",
    graduationYear: 2010,
    degree: "M.Sc",
    department: "Data Science",
    employer: "DataSolutions",
    jobTitle: "Data Scientist",
    industry: "Analytics",
    experience: 7,
    skills: ["Python", "R", "Machine Learning"],
    projects: ["Project X", "Project Y"],
    achievements: ["Published Paper in Data Science Journal"],
    linkedin: "https://www.linkedin.com/in/anjali",
    github: "https://github.com/anjali",
    connections: [],
    groupJoined: [],
    quizParticipated: [],
    donations: [],
    jobPosts: [],
    discussionPosts: [],
    eventsOrganised: [],
    eventsJoined: [],
    points: 150,
    isStarAlumni: true,
    password: "password123", // Add password
  },
  {
    username: "m",
    email: "vikram@domain.com",
    phone: "+917007007007",
    dob: "1992-10-30",
    city: "Ahmedabad",
    country: "India",
    graduationYear: 2014,
    degree: "MBA",
    department: "Marketing",
    employer: "MarketInc",
    jobTitle: "Marketing Manager",
    industry: "Marketing",
    experience: 6,
    skills: ["SEO", "Digital Marketing", "Content Strategy"],
    projects: ["Campaign A", "Campaign B"],
    achievements: ["Top Marketer of the Year"],
    linkedin: "https://www.linkedin.com/in/vikram",
    github: "https://github.com/vikram",
    connections: [],
    groupJoined: [],
    quizParticipated: [],
    donations: [],
    jobPosts: [],
    discussionPosts: [],
    eventsOrganised: [],
    eventsJoined: [],
    points: 200,
    isStarAlumni: false,
    password: "m", // Add password
  },
  {
    username: "neha_jain",
    email: "neha@domain.com",
    phone: "+918855446688",
    dob: "1985-12-05",
    city: "Bangalore",
    country: "India",
    graduationYear: 2007,
    degree: "B.Com",
    department: "Finance",
    employer: "FinCorp",
    jobTitle: "Finance Analyst",
    industry: "Finance",
    experience: 12,
    skills: ["Financial Analysis", "Budgeting", "Forecasting"],
    projects: ["Financial Report A", "Budget Plan B"],
    achievements: ["Certified Financial Analyst"],
    linkedin: "https://www.linkedin.com/in/neha",
    github: "https://github.com/neha",
    connections: [],
    groupJoined: [],
    quizParticipated: [],
    donations: [],
    jobPosts: [],
    discussionPosts: [],
    eventsOrganised: [],
    eventsJoined: [],
    points: 250,
    isStarAlumni: true,
    password: "password123", // Add password
  },
];

const seedUsers = async () => {
  try {
    // Ensure connection to the database
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect('mongodb://localhost:27017/wanderlust', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
    
    // Iterate over users array to create and save each user
    for (const userData of users) {
      // Check if the user already exists
      // const existingUser = await User.findOne({ username: userData.username });
      
      // if (!existingUser) {
        // Set defaults for missing fields
        const user = {
          username: userData.username || '',
          email: userData.email || '',
          phone: userData.phone || '',
          dob: userData.dob ? new Date(userData.dob) : null,
          city: userData.city || '',
          country: userData.country || '',
          graduationYear: userData.graduationYear || null,
          degree: userData.degree || '',
          department: userData.department || '',
          employer: userData.employer || '',
          jobTitle: userData.jobTitle || '',
          industry: userData.industry || '',
          experience: userData.experience || 0,
          skills: userData.skills || [],
          projects: userData.projects || [],
          achievements: userData.achievements || [],
          linkedin: userData.linkedin || '',
          github: userData.github || '',
          profilePicture: userData.profilePicture || '',
          connections: userData.connections || [],
          groupCreated: userData.groupCreated || [],
          groupJoined: userData.groupJoined || [],
          quizParticipated: userData.quizParticipated || [],
          donations: userData.donations || [],
          jobPosts: userData.jobPosts || [],
          discussionPosts: userData.discussionPosts || [],
          eventsOrganised: userData.eventsOrganised || [],
          eventsJoined: userData.eventsJoined || [],
          points: userData.points || 0,
          isStarAlumni: userData.isStarAlumni || false,
        };

        // Create and save the new user
        await User.register(new User(user), userData.password || 'rakesh');
        logger.info(`Created user: ${userData.username}`);
      // } else {
      //   logger.info(`User with username ${userData.username} already exists.`);
      // }
    }

    logger.info('User seeding completed successfully.');
  } catch (error) {
    logger.error('Error seeding users:', error);
  
  }
};

module.exports = seedUsers;
