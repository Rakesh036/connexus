// Unhandled Rejection Handler
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Imports
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const usersRouter = require("./routes/user.js");
const jobsRouter = require("./routes/job.js");
const jobReviewsRouter = require("./routes/jobReview.js");
const donationRoutes = require("./routes/donation");
const groupRoutes = require("./routes/group.js");

const ExpressError = require("./utils/ExpressError.js");
const User = require("./models/user.js");

// Express App Initialization
const app = express();

// Mongoose Connection
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Express Configuration
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Session and Flash Configuration
const sessionOption = {
  secret: "mysupersecretcode",
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

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global Middleware for Flash Messages and Current User
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user; // Ensure req.user is set correctly
  next();
});

// Routes
app.get("/", (req, res) => {
  res.redirect("/listings");
});

// Route Definitions
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/jobs", jobsRouter);
app.use("/jobs/:id/reviews", jobReviewsRouter);
app.use("/donations", donationRoutes);
app.use("/groups", groupRoutes);
app.use("/", usersRouter);

// Error Handling for Undefined Routes
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// General Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

// Server Setup
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
