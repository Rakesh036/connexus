const Success = require("../models/success.js");
const SuccessReview = require("../models/successReview.js");
const wrapAsync = require("../utils/wrapAsync.js");

// Create a new review for a success story
module.exports.create = wrapAsync(async (req, res) => {
  console.log("Create review called, req.params: ", req.params);
  const successStory = await Success.findById(req.params.id);
  
  if (!successStory) {
    console.log("Success story not found with id: ", req.params.id);
    req.flash("error", "Success story not found.");
    return res.redirect("/successes");
  }

  const newReview = new SuccessReview(req.body.successReview);
  newReview.author = req.user._id;
  console.log("New review created: ", newReview);

  successStory.reviews.push(newReview);
  await newReview.save();
  await successStory.save();

  console.log("New review saved to success story: ", successStory);

  req.flash("success", "New review created!");
  res.redirect(`/successes/${req.params.id}`);
});

// Delete a review from a success story
module.exports.delete = wrapAsync(async (req, res) => {
  console.log("Delete review called, req.params: ", req.params);
  const { id, reviewId } = req.params;

  const successStory = await Success.findById(id);
  if (!successStory) {
    console.log("Success story not found with id: ", id);
    req.flash("error", "Success story not found.");
    return res.redirect("/successes");
  }

  await Success.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  console.log("Review with id: ", reviewId, " deleted from success story with id: ", id);

  await SuccessReview.findByIdAndDelete(reviewId);
  console.log("Review with id: ", reviewId, " deleted from the database");

  req.flash("success", "Review deleted!");
  res.redirect(`/successes`);
});

// Comment on a review
module.exports.comment = wrapAsync(async (req, res) => {
  console.log("Comment on review called, req.params: ", req.params);
  const { reviewId } = req.params;

  const review = await SuccessReview.findById(reviewId);
  if (!review) {
    console.log("Review not found with id: ", reviewId);
    req.flash("error", "Review not found");
    return res.redirect(`/successes`);
  }

  console.log("Redirecting to comment section of success story with id: ", req.params.id);
  res.redirect(`/successes/${req.params.id}#comment-section`);
});
