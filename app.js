// Unhandled Rejection Handler
const logger = require("./utils/logger")('app'); // Ensure label for consistency

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", { promise, reason });
  process.exit(1);
});

// Environment Configuration
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Imports
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const bodyParser = require('body-parser');
const multer = require('multer');

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const connectionRoutes = require("./routes/connectionRoutes");
const discussionRoutes = require("./routes/discussionRoutes");
const discussionReviewRoutes = require("./routes/discussionReviewRoutes");
const jobRoutes = require("./routes/jobRoutes");
const jobReviewRoutes = require("./routes/jobReviewRoutes");
const donationRoutes = require("./routes/donationRoutes");
const groupRoutes = require("./routes/groupRoutes");
const quizRoutes = require("./routes/quizRoutes");
const successRoutes = require("./routes/successRoutes");
const successReviewRoutes = require("./routes/successReviewRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const eventRoutes = require("./routes/eventRoutes");
const eventReviewRoutes = require("./routes/eventReviewRoutes");
// Error Handling
const ExpressError = require("./utils/expressError");
const User = require("./models/user");
const findAlumniRoutes = require('./routes/findAlumniRoutes');

// Express App Initialization
const app = express();
// logger.info("Express app initialized");

// Mongoose Connection
const MONGO_URL = process.env.MONGODB_URL;
// const MONGO_URL = "mongodb://127.0.0.1:27017/connexus20";

mongoose
  .connect(MONGO_URL)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((err) => logger.error("Error connecting to MongoDB:", err));

// Express Configuration
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// For handling multipart/form-data (file uploads)
// const storage = multer.memoryStorage(); // Use memory storage
// const upload = multer({ storage });

// app.use(upload.any());


// logger.info("Express configured");

// Session and Flash Configuration
const store = MongoStore.create({
  mongoUrl: MONGO_URL,
  secret: process.env.SESSION_SECRET || "defaultsecret", // Use environment variable or default
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  logger.error("Error in session store", err);
});

const sessionOption = {
  store,
  secret: process.env.SESSION_SECRET || "defaultsecret", // Use environment variable or default
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 60 * 60 * 24 * 7 * 1000,
    maxAge: 60 * 60 * 24 * 7 * 1000,
  },
};

app.use(session(sessionOption));
app.use(flash());

// logger.info("Session and flash configured");

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// logger.info("Passport configured");

// Global Middleware for Flash Messages and Current User
app.use((req, res, next) => {
  // logger.info("[Middleware] Setting flash messages and current user");
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Route Definitions
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/connections", connectionRoutes);
app.use("/discussions", discussionRoutes);
app.use("/discussions/:id/reviews", discussionReviewRoutes);
app.use("/jobs", jobRoutes);
app.use("/jobs/:id/reviews", jobReviewRoutes);
app.use("/donations", donationRoutes);
app.use("/groups", groupRoutes);
app.use("/groups/:groupId/quizzes", quizRoutes);
app.use("/successes", successRoutes);
app.use("/successes/:id/reviews", successReviewRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/notifications", notificationRoutes);
app.use("/events", (req,res,next)=>{console.log("like routes currently present in app.js");next();
},eventRoutes);
app.use("/events/:id/reviews", eventReviewRoutes);
// Use the findalumni routes
app.use(findAlumniRoutes);


// Home Route

app.get("/", (req, res) => {
  logger.info("Rendering home page");
  res.render("home/fullpage.ejs", { cssFile: "landing/index.css" });
});

// Error Handling for Undefined Routes
app.all("*", (req, res, next) => {
  // logger.warn("Undefined route: %s %s", req.method, req.originalUrl);
  next(new ExpressError(404, "Page Not Found!"));
});

// General Error Handler
app.use((err, req, res, next) => {
  // logger.error("General error handler: %o", err);
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error", { message });
});

// Server Setup
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
