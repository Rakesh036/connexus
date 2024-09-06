// Unhandled Rejection Handler
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
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
const multer = require("multer");

// Route Imports
const listingsRouter = require("./routes/listing");
const reviewsRouter = require("./routes/review");
const jobsRouter = require("./routes/job");
const jobReviewsRouter = require("./routes/jobReview");
const donationRoutes = require("./routes/donation");
const groupRoutes = require("./routes/group");
const quizRoutes = require("./routes/quiz");
const successRoutes = require("./routes/success");
const successReviewRoutes = require("./routes/successReview");
const gatewayRoutes = require("./routes/paymentGateway");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const connectionRoutes = require("./routes/connectionRoutes");

// Error Handling
const ExpressError = require("./utils/expressError");
const User = require("./models/user");

// Express App Initialization
const app = express();

// Mongoose Connection
const MONGO_URL = process.env.MONGODB_URL;
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
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
const store = MongoStore.create({
  mongoUrl: MONGO_URL,
  crypto: { secret: process.env.SECRET },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("Error in session store", err);
});

const sessionOption = {
  store,
  secret: process.env.SECRET,
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
  res.locals.currUser = req.user;
  next();
});

// Home Route
app.get("/", (req, res) => {
  res.render("home/fullpage.ejs");
});

// Route Definitions
app.use("/auth", authRoutes);
app.use("/users", profileRoutes);
app.use("/users", connectionRoutes);
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/jobs", jobsRouter);
app.use("/jobs/:id/reviews", jobReviewsRouter);
app.use("/donations", donationRoutes);
app.use("/groups", groupRoutes);
app.use("/groups/:groupId/quizzes", quizRoutes);
app.use("/successes", successRoutes);
app.use("/successes/:id/reviews", successReviewRoutes);
app.use("/api/payment", gatewayRoutes);

// Home Route
app.get("/", (req, res) => res.redirect("/listings"));

// Error Handling for Undefined Routes
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// General Error Handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error", { message });
});

// Server Setup
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
