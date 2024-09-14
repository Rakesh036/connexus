const express = require("express");
const router = express.Router();
const logger = require("../utils/logger"); // Import the logger
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
    logger.info("Rendering signup form");
    next();
  }, renderSignupForm)
  .post((req, res, next) => {
    logger.info("Processing signup form submission");
    next();
  }, signupUser);

// Render and handle Login
router.route("/login")
  .get((req, res, next) => {
    logger.info("Rendering login form");
    next();
  }, renderLoginForm)
  .post((req, res, next) => {
    logger.info("Processing login form submission");
    loginUser(req, res, (err) => {
      if (err) {
        logger.error(`Login error: ${err.message}`);
        return next(err);
      }
      req.flash("success", "Welcome back!");
      const redirectUrl = res.locals.redirectUrl || "/";
      logger.info(`Redirecting to: ${redirectUrl}`);
      res.redirect(redirectUrl);
    });
  });

// Logout User
router.get("/logout", (req, res, next) => {
  logger.info("User logging out");
  logoutUser(req, res, (err) => {
    if (err) {
      logger.error(`Logout error: ${err.message}`);
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
