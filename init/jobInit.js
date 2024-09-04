const mongoose = require("mongoose");
const Job = require("../models/job.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Connect to MongoDB
main()
  .then(() => {
    console.log("Connected to DB");
    insertJobsData();
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Sample job data
const jobsData = [
  {
    title: "Software Engineer",
    salary: 90000,
    location: "New York, NY",
    jobType: "Full-time",
    companyName: "Tech Innovators",
    applyLink: "https://techinnovators.com/careers/apply/123",
    owner: new mongoose.Types.ObjectId("66d3c42e50219a68dd897296"), 
    reviews: [],
    reports: [],
    likes: [],
  },
  {
    title: "Marketing Specialist",
    salary: 55000,
    location: "San Francisco, CA",
    jobType: "Full-time",
    companyName: "Creative Agency",
    applyLink: "https://creativeagency.com/jobs/apply/456",
    owner: new mongoose.Types.ObjectId("66d3d050899baa2e7f21555f"), 
    reviews: [],
    reports: [],
    likes: [],
  },
  {
    title: "Data Analyst Intern",
    salary: 30000,
    location: "Austin, TX",
    jobType: "Internship",
    companyName: "Data Insights Inc.",
    applyLink: "https://datainsights.com/internship/apply/789",
    owner: new mongoose.Types.ObjectId("66d3d17076c42c0a972eeea9"), 
    reviews: [],
    reports: [],
    likes: [],
  },
  {
    title: "Part-time Customer Service Representative",
    salary: 20000,
    location: "Remote",
    jobType: "Part-time",
    companyName: "Customer First Solutions",
    applyLink: "https://customerfirst.com/jobs/apply/012",
    owner: new mongoose.Types.ObjectId("66d3d1897799635dbe62a1ed"), 
    reviews: [],
    reports: [],
    likes: [],
  },
  {
    title: "Full Stack Developer",
    salary: 120000,
    location: "Seattle, WA",
    jobType: "Full-time",
    companyName: "Web Works",
    applyLink: "https://webworks.com/careers/apply/345",
    owner: new mongoose.Types.ObjectId("66d3d6558e44506deea41313"), 
    reviews: [],
    reports: [],
    likes: [],
  },
];

// Function to insert job data into the database
async function insertJobsData() {
  try {
    await Job.insertMany(jobsData);
    console.log("Jobs data initialized successfully");
  } catch (err) {
    console.error("Error initializing jobs data:", err);
  } finally {
    mongoose.connection.close(); // Close the connection after the operation is complete
  }
}
