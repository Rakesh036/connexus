const { userSchema } = require("../schemas/userSchema");
const ExpressError = require("../utils/expressError");

module.exports.validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(", ");
    req.flash("error", msg);
    return res.redirect("back");
  }
  next();
};
