// routes/alumniRoutes.js
const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/findAlumniController'); // Import the controller

// Route to fetch and display the alumni list
router.get('/findAlumni', alumniController.getAlumniList);

module.exports = router;













