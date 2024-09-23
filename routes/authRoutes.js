const express = require("express");
const router = express.Router();
const logger = require("../utils/logger")('routes/auth'); // Use a specific label for auth routes
const {
  renderSignupForm,
  signupUser,
  renderLoginForm,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

// Render Signup Form
router.route("/signup")
  .get((req, res, next) => {
    logger.info("======= [ROUTE: Signup] =======");
    logger.info("[ACTION: Rendering Signup Form]");
    next();
  }, renderSignupForm)
  .post((req, res, next) => {
    logger.info("======= [ROUTE: Signup] =======");
    logger.info("[ACTION: Processing Signup Form Submission]");
    logger.info(`Received data: ${JSON.stringify(req.body)}`);
    next();
  }, signupUser);

// Render and handle Login
router.route("/login")
  .get((req, res, next) => {
    logger.info("======= [ROUTE: Login] =======");
    logger.info("[ACTION: Rendering Login Form]");
    next();
  }, renderLoginForm)
  .post((req, res, next) => {
    logger.info("======= [ROUTE: Login] =======");
    logger.info("[ACTION: Processing Login Form Submission]");

console.log("user id and  password: ",req.body.username, req.body.password);


    logger.info(`Received data: ${JSON.stringify(req.body)}`);
    loginUser(req, res, (err) => {
      if (err) {
        logger.error(`Login Error: ${err.message}`);
        return next(err);
      }
      req.flash("success", "Welcome back!");
      const redirectUrl = res.locals.redirectUrl || "/";
      logger.info(`Login successful. Redirecting to: ${redirectUrl}`);
      res.redirect(redirectUrl);
    });
  });

// Logout User
router.get("/logout", (req, res, next) => {
  logger.info("======= [ROUTE: Logout] =======");
  logger.info("[ACTION: User Logging Out]");
  logoutUser(req, res, (err) => {
    if (err) {
      logger.error(`Logout Error: ${err.message}`);
      return next(err);
    }
    logger.info("User logged out successfully.");
    res.redirect("/");
  });
});

module.exports = router;
