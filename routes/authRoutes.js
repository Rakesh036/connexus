const express = require("express");
const passport = require("passport");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");

// Signup Routes
router
  .route("/signup")
  .get((req, res) => res.render("users/signup"))
  .post(
    wrapAsync(async (req, res) => {
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
    })
  );

// Login Routes
router
  .route("/login")
  .get((req, res) => res.render("users/login"))
  .post(
    passport.authenticate("local", {
      failureRedirect: "/auth/login",
      failureFlash: true,
    }),
    (req, res) => {
      req.flash("success", "Welcome back!");
      const redirectUrl = res.locals.redirectUrl || "/";
      res.redirect(redirectUrl);
    }
  );

// Logout Route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You have logged out successfully!");
    res.redirect("/");
  });
});

module.exports = router;
