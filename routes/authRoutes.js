const express = require("express");
const router = express.Router();
const {
  renderSignupForm,
  signupUser,
  renderLoginForm,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

router.route("/signup").get(renderSignupForm).post(signupUser);

router
  .route("/login")
  .get(renderLoginForm)
  .post(loginUser, (req, res) => {
    req.flash("success", "Welcome back!");
    const redirectUrl = res.locals.redirectUrl || "/";
    res.redirect(redirectUrl);
  });

router.get("/logout", logoutUser);

module.exports = router;
