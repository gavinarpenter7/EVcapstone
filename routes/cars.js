const express = require('express');
const router = express.Router();
const { carSchema } = require('../joiSchemas');
const AppError = require('../utilities/AppError');
const asyncCatcher = require('../utilities/asyncCatcher');
const car = require('../controllers/cars');
const {
	isAuthenticated,
	validateCar,
	isCreator,
} = require('../middleware/middleware');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

const Car = require('../models/car');

router
	.route('/')
	// Restaurant Index Page
	.get(asyncCatcher(car.renderIndex))
	// Create New Restaurant Endpoint
	.post(
		isAuthenticated,
		upload.array('image'),
		validateCar,
		asyncCatcher(car.postNewCar)
	);

// Render New Restaurant Page
router.get('/new', isAuthenticated, car.renderNew);

router
	.route('/:id')
	// Show Individual Restaurant Details
	.get(asyncCatcher(car.renderShow))
	// Update Restaurant Endpoint
	.put(
		isAuthenticated,
		isCreator,
		upload.array('image'),
		validateCar,
		asyncCatcher(car.updateCar)
	);

// Render Edit Restaurant Page
router.get(
	'/:id/edit',
	isAuthenticated,
	isCreator,
	asyncCatcher(car.renderEdit)
);

// Delete Restaurant Endpoint
router.delete(
	'/:id/delete',
	isAuthenticated,
	isCreator,
	asyncCatcher(car.deleteCar)
);

module.exports = router;
