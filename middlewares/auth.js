const logger = require("../utils/logger");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    logger.info("User not authenticated, redirecting to login.");
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "Login required");
    return res.redirect("/auth/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.redirectUrl = req.session.returnTo;
    delete req.session.returnTo;
    logger.info("Saved redirect URL from 'returnTo':", res.locals.redirectUrl);
  } else if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
    delete req.session.redirectUrl;
    logger.info("Saved redirect URL from 'redirectUrl':", res.locals.redirectUrl);
  } else if (req.session.currentUrl) {
    res.locals.redirectUrl = req.session.currentUrl;
    logger.info("Saved redirect URL from 'currentUrl':", res.locals.redirectUrl);
  } else {
    res.locals.redirectUrl = "/";
    logger.info("No redirect URL found, defaulting to '/'.");
  }
  next();
};

module.exports.isUser = (req, res, next) => {
  if (!req.isAuthenticated()) {
    logger.info("User not authenticated, redirecting to login.");
    req.flash("error", "You must be signed in to access this page.");
    return res.redirect("/login");
  }
  next();
};

module.exports.isCurrentUser = (req, res, next) => {
  if (req.isAuthenticated() && req.user._id.equals(req.params.id)) {
    logger.info("User is authenticated and matches the current user ID.");
    return next();
  }
  logger.warn("User is either not authenticated or does not match the current user ID.");
  req.flash("error", "You do not have permission to do that.");
  res.redirect("/");
};
