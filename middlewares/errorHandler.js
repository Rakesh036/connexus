module.exports.errorHandler = (err, req, res, next) => {
    const middlewareName = err.middlewareName || "Unknown Middleware";
    console.error(`Error in ${middlewareName}:`, err.message);
    res.status(err.statusCode || 500).render("error", { err });
  };
  