module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
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
    } else if (req.session.redirectUrl) {
      res.locals.redirectUrl = req.session.redirectUrl;
      delete req.session.redirectUrl;
    } else if (req.session.currentUrl) {
      res.locals.redirectUrl = req.session.currentUrl;
    } else {
      res.locals.redirectUrl = "/";
    }
    next();
  };
  
  module.exports.isUser = (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.flash("error", "You must be signed in to access this page.");
      return res.redirect("/login");
    }
    next();
  };
  
  module.exports.isCurrentUser = (req, res, next) => {
    if (req.isAuthenticated() && req.user._id.equals(req.params.id)) {
      return next();
    }
    req.flash("error", "You do not have permission to do that.");
    res.redirect("/");
  };
  