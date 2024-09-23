// controllers/alumniController.js
const User = require("../models/user"); // Import the User model

// Fetch and render the alumni list
exports.getAlumniList = async (req, res) => {
  try {
    const alumniList = await User.find(); // Fetch all alumni
    res.render("findAlumni", {
      alumniList,
      cssFile: "FindAlumni/findAlumniIndex.css",
    }); // Render the alumni list
  } catch (error) {
    res.status(500).send("Error retrieving alumni"); // Handle errors
  }
};
