const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const {
  isLoggedIn,
  isStoryOwner,
  validateSuccess,
  isSuccessReviewAuthor,
} = require("../middleware.js"); // Adjust paths as necessary

// Utils
const wrapAsync = require("../utils/wrapAsync.js");

// Models
const Success = require("../models/success.js");
const SuccessReview = require("../models/successReview.js"); // If needed

// Index route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const successes = await Success.find({});
    res.render("success/index.ejs", {
      successes,
    });
  })
);

// New route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("success/new.ejs");
});

// Create route
router.post(
  "/",
  isLoggedIn,
  validateSuccess,
  upload.single("success[image]"),
  wrapAsync(async (req, res) => {
    // const {}
    // const newSuccess = new Success(req.body.success);

    const newSuccess = new Success(req.body.success);
    newSuccess.owner = req.user._id;
    let url = req.file.path;
    let filename = req.file.filename;
    newSuccess.image = { url, filename };
    await newSuccess.save();
    console.log("newSuccess", newSuccess);

    // await newSuccess.save();
    // console.log("req.file:  ", req.file);
    // console.log("req.body: ", req.body);
    req.flash("success", "New success story created!");
    res.redirect("/successes");
  })
);

// Show route
// router.get(
//   "/:id",
//   wrapAsync(async (req, res) => {
//     const successStory = await Success.findById(req.params.id)
//       .populate({
//         path: "reviews",
//         populate: {
//           path: "author",
//         },
//       })
//       .populate("owner");
//     if (!successStory) {
//       req.flash("error", "Success story does not exist!");
//       return res.redirect("/successes");
//     }
//     res.render("success/show.ejs", { successStory });
//   })
// );

// new show route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const successStory = await Success.findById(req.params.id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");

    if (!successStory) {
      req.flash("error", "Success story does not exist!");
      return res.redirect("/successes");
    }
    console.log("successStory", successStory);
    res.render("success/show", { successStory });
  })
);

// // Edit route
// router.get(
//   "/:id/edit",
//   isLoggedIn,
//   isStoryOwner,
//   wrapAsync(async (req, res) => {
//     const successStory = await Success.findById(req.params.id);
//     if (!successStory) {
//       req.flash("error", "Success story does not exist!");
//       return res.redirect("/successes");
//     }
//     res.render("success/edit.ejs", { successStory });
//   })
// );
//new edit
// // Route to render the edit form for success stories
// router.get("/:id/edit", wrapAsync(async (req, res) => {
//   const successStory = await Success.findById(req.params.id);
//   if (!successStory) {
//       req.flash("error", "Success story not found");
//       return res.redirect("/successes");
//   }
//   res.render("success/edit", { success: successStory });
// }));
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    const successStory = await Success.findById(req.params.id);
    if (!successStory) {
      req.flash("error", "Success story not found!");
      return res.redirect("/successes");
    }
    res.render("success/edit", { successStory }); // Ensure you're passing 'successStory'
  })
);

// Update route
// router.put(
//   "/:id",
//   isLoggedIn,
//   isStoryOwner,
//   validateSuccess,
//   wrapAsync(async (req, res) => {
//     await Success.findByIdAndUpdate(req.params.id, { ...req.body.success });
//     req.flash("success", "Success story updated!");
//     res.redirect(`/success/${req.params.id}`);
//   })
// );
router.put(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updatedStory = await Success.findByIdAndUpdate(id, req.body.success, {
      new: true,
    });
    req.flash("success", "Successfully updated the success story!");
    res.redirect(`/successes/${updatedStory._id}`);
  })
);
// Delete route
router.delete(
  "/:id",
  isLoggedIn,
  isStoryOwner,
  wrapAsync(async (req, res) => {
    await Success.findByIdAndDelete(req.params.id);
    req.flash("success", "Success story deleted!");
    res.redirect("/successes");
  })
);

// Like route
router.get(
  "/:id/like",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    // Find the success story by ID
    const successStory = await Success.findById(id);
    if (!successStory) {
      req.flash("error", "Success story does not exist!");
      return res.redirect("/successes");
    }

    // Check if the user already liked this success story
    const hasLiked = successStory.likes.some((like) => like.equals(userId));

    if (hasLiked) {
      // User has liked, so remove the like
      await Success.findByIdAndUpdate(id, { $pull: { likes: userId } });
    } else {
      // User has not liked, so add the like
      await Success.findByIdAndUpdate(id, { $push: { likes: userId } });
    }

    res.redirect("/successes");
  })
);

// Comment route
router.get(
  "/:id/comment",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const successStory = await Success.findById(id);
    if (!successStory) {
      req.flash("error", "Success story not found");
      return res.redirect("/successes");
    }
    res.redirect(`/successes/${id}#comment-section`);
  })
);

// Report route
router.get(
  "/:id/report",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    // Find the success story by ID
    const successStory = await Success.findById(id);
    if (!successStory) {
      req.flash("error", "Success story does not exist!");
      return res.redirect("/successes");
    }

    // Check if the user already reported this success story
    const hasReported = successStory.reports.some((report) =>
      report.equals(userId)
    );

    if (hasReported) {
      // User has reported, so remove the report
      await Success.findByIdAndUpdate(id, { $pull: { reports: userId } });
    } else {
      // User has not reported, so add the report
      await Success.findByIdAndUpdate(id, { $push: { reports: userId } });
    }

    req.flash("success", "Success story reported!");
    res.redirect("/successes");
  })
);

module.exports = router;
