const User = require("../models/user");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup");
};

module.exports.signupUser = wrapAsync(async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to connexus");
      res.redirect("/");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/auth/login");
  }
});

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

module.exports.loginUser = passport.authenticate("local", {
  failureRedirect: "/auth/login",
  failureFlash: true,
});

module.exports.logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You have logged out successfully!");
    res.redirect("/");
  });
};
