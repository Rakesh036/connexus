const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { isLoggedIn, isCurrentUser } = require("../middleware");


// Utils
const wrapAsync = require("../utils/wrapAsync.js");

// Models
const User = require("../models/user.js");

// Signup Routes
router
  .route("/signup")
  .get((req, res) => {
    res.render("users/signup");
  })
  .post(
    wrapAsync(async (req, res) => {
      try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
          if (err) {
            return next(err);
          }
          req.flash("success", "Welcome to connexus");
          res.redirect("/listings");
        });
      } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
      }
    })
  );

// Login Routes
router
  .route("/login")
  .get((req, res) => {
    res.render("users/login.ejs");
  })
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    async (req, res) => {
      req.flash("success", "Welcome back!");
      const redirectUrl = res.locals.redirectUrl || "/";
      res.redirect(redirectUrl);
    }
  );

// Logout Route
router.get("/logout", (req, res) => {
  req.session.currentUrl = req.originalUrl;
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have logged out successfully!");
    const redirectUrl = req.session.currentUrl || "/";
    delete req.session.currentUrl;
    res.redirect(redirectUrl);
  });
});




// Route to view user profile
router.get("/profile/:id", isLoggedIn, isCurrentUser, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/");
    }
    res.render("users/profile", { user });
  } catch (err) {
    req.flash("error", "Something went wrong");
    res.redirect("/");
  }
});

// Route to edit user profile
router.get("/profile/:id/edit", isLoggedIn, isCurrentUser, (req, res) => {
  res.render("users/edit", { user: req.user });
});

router.put("/profile/:id", isLoggedIn, isCurrentUser, async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email },
      { new: true }
    );
    req.flash("success", "Profile updated successfully");
    res.redirect(`/profile/${user._id}`);
  } catch (err) {
    req.flash("error", "Something went wrong");
    res.redirect(`/profile/${req.params.id}/edit`);
  }
});

module.exports = router;

module.exports = router;
