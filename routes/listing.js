const express = require("express");
const router = express.Router();
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

// Utils
const wrapAsync = require("../utils/wrapAsync.js");

// Models
const Listing = require("../models/listing.js");

// Index route
// Index route for all listings (no filter)
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const { queryType } = req.query; // Extract queryType from query parameters
    let listings;

    if (queryType) {
      // Filter the listings by queryType if provided
      listings = await Listing.find({ queryType });
    } else {
      // If no queryType is provided, return all listings
      listings = await Listing.find({});
    }

    // Render the index.ejs template with the filtered or unfiltered listings
    res.render("listings/index.ejs", {
      listings,
      cssFile: "listingIndex.css",
    });
  })
);

// router.get(
//   "/",
//   wrapAsync(async (req, res) => {
//     const listings = await Listing.find({});
//     res.render("listings/index.ejs", {
//       listings,
//       cssFile: "listingIndex.css",
//     });
//   })
// );
// router.get(
//   "/:queryType",
//   wrapAsync(async (req, res) => {
//     const { queryType } = req.params; // Extract queryType from URL path parameter
//     let listings;

//     if (queryType) {
//       // Filter the listings by the provided queryType
//       listings = await Listing.find({ queryType });
//     } else {
//       // If no queryType is provided, return all listings
//       listings = await Listing.find({});
//     }

//     // Render the index.ejs template with the filtered listings
//     res.render("listings/index.ejs", {
//       listings,
//       cssFile: "listingIndex.css",
//     });
//   })
// );

// New route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs", { cssFile: "listingNew.css" });
});

// Create route
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
  })
);

// Show route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");
    if (!listing) {
      req.flash("error", "Listing does not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing, cssFile: "listingShow.css" });
  })
);

// Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      req.flash("error", "Listing does not exist!");
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing, cssFile: "listingEdit.css" });
  })
);

// Update route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    await Listing.findByIdAndUpdate(req.params.id, { ...req.body.listing });
    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${req.params.id}`);
  })
);

// Delete route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
  })
);

// Like route
router.get(
  "/:id/like",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    // Find the listing by ID
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing does not exist!");
      return res.redirect("/listings");
    }

    // Check if the user already liked this listing
    const hasLiked = listing.likes.some((like) => like.equals(userId));

    if (hasLiked) {
      // User has liked, so remove the like
      await Listing.findByIdAndUpdate(id, { $pull: { likes: userId } });
    } else {
      // User has not liked, so add the like
      await Listing.findByIdAndUpdate(id, { $push: { likes: userId } });
    }

    res.redirect(`/listings`);
  })
);

// Comment route
router.get(
  "/:id/comment",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }
    res.redirect(`/listings/${id}#comment-section`);
  })
);

// Report route
router.get(
  "/:id/report",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    // Find the listing by ID
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing does not exist!");
      return res.redirect("/listings");
    }

    // Check if the user already reported this listing
    const hasReported = listing.reports.some((report) => report.equals(userId));

    if (hasReported) {
      // User has reported, so remove the report
      await Listing.findByIdAndUpdate(id, { $pull: { reports: userId } });
    } else {
      // User has not reported, so add the report
      await Listing.findByIdAndUpdate(id, { $push: { reports: userId } });
    }

    req.flash("success", "Listing reported!");
    res.redirect(`/listings`);
  })
);

module.exports = router;
