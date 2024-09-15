const logger = require("../utils/logger")('middleware'); // Use a specific label for middleware

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    logger.info("======= [MIDDLEWARE: isLoggedIn] =======");
    logger.info("[ACTION: Check Authentication] User not authenticated, redirecting to login.");
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "Login required");
    return res.redirect("/auth/login");
  }
  logger.info("[ACTION: Check Authentication] User is authenticated.");
  logger.info("======= [END OF ACTION: isLoggedIn] =======\n");
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  logger.info("======= [MIDDLEWARE: saveRedirectUrl] =======");
  
  if (req.session.returnTo) {
    res.locals.redirectUrl = req.session.returnTo;
    delete req.session.returnTo;
    logger.info(`Saved redirect URL from 'returnTo': ${res.locals.redirectUrl}`);
  } else if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
    delete req.session.redirectUrl;
    logger.info(`Saved redirect URL from 'redirectUrl': ${res.locals.redirectUrl}`);
  } else if (req.session.currentUrl) {
    res.locals.redirectUrl = req.session.currentUrl;
    logger.info(`Saved redirect URL from 'currentUrl': ${res.locals.redirectUrl}`);
  } else {
    res.locals.redirectUrl = "/";
    logger.info("No redirect URL found, defaulting to '/'.");
  }
  
  logger.info("======= [END OF ACTION: saveRedirectUrl] =======\n");
  next();
};

module.exports.isUser = (req, res, next) => {
  if (!req.isAuthenticated()) {
    logger.info("======= [MIDDLEWARE: isUser] =======");
    logger.info("[ACTION: Check Authentication] User not authenticated, redirecting to login.");
    req.flash("error", "You must be signed in to access this page.");
    return res.redirect("/login");
  }
  logger.info("[ACTION: Check Authentication] User is authenticated.");
  logger.info("======= [END OF ACTION: isUser] =======\n");
  next();
};

module.exports.isCurrentUser = (req, res, next) => {
  if (req.isAuthenticated() && req.user._id.equals(req.params.id)) {
    logger.info("======= [MIDDLEWARE: isCurrentUser] =======");
    logger.info("[ACTION: Check User Authorization] User is authenticated and matches the current user ID.");
    return next();
  }
  logger.warn("User is either not authenticated or does not match the current user ID.");
  req.flash("error", "You do not have permission to do that.");
  res.redirect("/");
  logger.info("======= [END OF ACTION: isCurrentUser] =======\n");
};
