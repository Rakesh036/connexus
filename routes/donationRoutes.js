const express = require("express");
const router = express.Router();
const {
  isDonationOwner,
  validateDonation,
} = require("../middlewares/donation");
const { isLoggedIn } = require("../middlewares/auth");
const {
  index,
  renderNewForm,
  create,
  show,
  renderEditForm,
  update,
  delete: deleteDonation,
  createPayment,
} = require("../controllers/donationController");

router.get("/", index);

router.get("/new", isLoggedIn, renderNewForm);

router.post("/", isLoggedIn, validateDonation, create);

router.get("/:id", show);

router.get("/:id/edit", isLoggedIn, isDonationOwner, renderEditForm);

router.put("/:id", isLoggedIn, isDonationOwner, validateDonation, update);

router.delete("/:id", isLoggedIn, isDonationOwner, deleteDonation);

router.post("/:id/payments", isLoggedIn, createPayment);

module.exports = router;
