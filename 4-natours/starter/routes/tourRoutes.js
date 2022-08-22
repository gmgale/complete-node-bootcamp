const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tourController");

// Param middleware (only executes when 'id' is passes in url, and only fir tourRoutes)

// We can use param middleware to check ID to elimenate duplicate code in the handlers
router.param("id", tourController.checkId);

router
	.route("/")
	.get(tourController.getAllTours)
	.post(tourController.checkBody, tourController.createTour);

router
	.route("/:id")
	.get(tourController.getTour)
	.patch(tourController.updateTour)
	.put(tourController.updateWholeTour)
	.delete(tourController.deleteTour);

module.exports = router;
