const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const logger = require("../utils/logger")('eventRoutes');
const eventController = require("../controllers/eventController");

// Route to get all events and create a new event
router
  .route("/")
  .get((req, res, next) => {
    logger.info("======= [ROUTE: Get All Events] =======");
    logger.info("[ACTION: Fetching All Events]");
    next();
  }, eventController.index) // Ensure this method exists in eventController
  .post((req, res, next) => {
    logger.info("======= [ROUTE: Create New Event] =======");
    logger.info("[ACTION: Creating New Event]");
    logger.info(`User ID: ${req.user ? req.user._id : 'Not logged in'} is creating a new event`);
    logger.debug(`Request body: ${JSON.stringify(req.body)}`);
    next();
  }, eventController.create); // Ensure this method exists in eventController

// Route to render the form for creating a new event
router.route("/new").get((req, res, next) => {
  logger.info("======= [ROUTE: Render New Event Form] =======");
  logger.info("[ACTION: Rendering New Event Form]");
  next();
}, eventController.renderNewForm);

// Route to get, update, and delete a specific event
router
  .route("/:id")
  .get((req, res, next) => {
    logger.info("======= [ROUTE: Get Event Details] =======");
    logger.info("[ACTION: Fetching Event Details]");
    logger.info(`Event ID: ${req.params.id}`);
    next();
  }, eventController.show) // Ensure this method exists in eventController
  .put((req, res, next) => {
    logger.info("======= [ROUTE: Update Event] =======");
    logger.info("[ACTION: Updating Event]");
    logger.info(`User ID: ${req.user ? req.user._id : 'Not logged in'} is updating event ID: ${req.params.id}`);
    logger.debug(`Request body: ${JSON.stringify(req.body)}`);
    next();
  }, eventController.update) // Ensure this method exists in eventController
  .delete((req, res, next) => {
    logger.info("======= [ROUTE: Delete Event] =======");
    logger.info("[ACTION: Deleting Event]");
    logger.info(`User ID: ${req.user ? req.user._id : 'Not logged in'} is deleting event ID: ${req.params.id}`);
    next();
  }, eventController.delete); // Ensure this method exists in eventController

// Route to render the edit form for a specific event
router.route("/:id/edit").get((req, res, next) => {
  logger.info("======= [ROUTE: Render Edit Event Form] =======");
  logger.info("[ACTION: Rendering Edit Event Form]");
  logger.info(`User ID: ${req.user ? req.user._id : 'Not logged in'} is requesting to edit event ID: ${req.params.id}`);
  next();
}, eventController.renderEditForm); // Ensure this method exists in eventController

// Routes to like and report an event
router.route("/:id/like").get((req, res, next) => {
  logger.info("======= [ROUTE: Like Event] =======");
  logger.info("[ACTION: Liking Event]");
  logger.info(`User ID: ${req.user ? req.user._id : 'Not logged in'} is liking event ID: ${req.params.id}`);
  next();
}, eventController.like); // Ensure this method exists in eventController

router.route("/:id/report").get((req, res, next) => {
  logger.info("======= [ROUTE: Report Event] =======");
  logger.info("[ACTION: Reporting Event]");
  logger.info(`User ID: ${req.user ? req.user._id : 'Not logged in'} is reporting event ID: ${req.params.id}`);
  next();
}, eventController.report); // Ensure this method exists in eventController

module.exports = router;
