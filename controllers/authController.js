const User = require("../models/user");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const logger = require("../utils/logger")('authController'); // Specify label

module.exports.renderSignupForm = (req, res) => {
  logger.info("======= [CONTROLLER: User] =======");
  logger.info("[ACTION: Render Signup Form]");

  res.render("users/signup");

  logger.info("======= [END OF ACTION: Render Signup Form] =======\n");
};

module.exports.signupUser = wrapAsync(async (req, res, next) => {
  try {
    logger.info("======= [CONTROLLER: User] =======");
    logger.info("[ACTION: Signup User]");
    logger.info("Received data: %o", req.body);

    const { username, email, password } = req.body;
    const newUser = new User({ username, email });

    logger.info("Creating new user: %o", newUser);

    const registeredUser = await User.register(newUser, password);

    logger.info("User successfully registered: %s", registeredUser._id);

    req.login(registeredUser, (err) => {
      if (err) {
        logger.error("Error during login: %o", err);
        return next(err);
      }
      logger.info("User logged in successfully.");
      req.flash("success", "Welcome to connexus");
      res.redirect("/");
    });

    logger.info("======= [END OF ACTION: Signup User] =======\n");
  } catch (e) {
    logger.error("Error during signup: %s", e.message);
    req.flash("error", e.message);
    res.redirect("/auth/login");
  }
});

module.exports.renderLoginForm = (req, res) => {
  logger.info("======= [CONTROLLER: User] =======");
  logger.info("[ACTION: Render Login Form]");

  res.render("users/login");

  logger.info("======= [END OF ACTION: Render Login Form] =======\n");
};

module.exports.loginUser = passport.authenticate("local", {
  failureRedirect: "/auth/login",
  failureFlash: true,
});

module.exports.logoutUser = (req, res, next) => {
  logger.info("======= [CONTROLLER: User] =======");
  logger.info("[ACTION: Logout User]");

  req.logout((err) => {
    if (err) {
      logger.error("Logout error: %o", err);
      return next(err);
    }
    logger.info("User logged out successfully.");
    req.flash("success", "You have logged out successfully!");
    res.redirect("/");
  });

  logger.info("======= [END OF ACTION: Logout User] =======\n");
};
