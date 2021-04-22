const Car = require('../models/car');
const { cloudinary } = require('../cloudinary/index');

module.exports.renderIndex = async (req, res) => {
	const cars = await Car.find({});
	console.log(cars);
	res.render('cars/index', { cars });
};

module.exports.renderNew = (req, res) => {
	res.render('cars/new');
};

module.exports.postNewCar = async (req, res) => {
	const car = new Car(req.body.car);
	car.image = req.files.map((f) => ({
		url: f.path,
		filename: f.filename,
	}));
	car.submittedBy = req.user._id;
	await car.save();
	req.flash('success', 'New electric vehicle was successfully added!');
	res.redirect(`/cars/${car.id}`);
};

module.exports.renderShow = async (req, res, next) => {
	const { id } = req.params;
	const car = await Car.findById(id)
		.populate({
			path: 'reviews',
			populate: {
				path: 'author',
			},
		})
		.populate('submittedBy');
	if (!car) {
		req.flash('error', 'Electric Vehicle does not exist!');
		res.redirect('/cars');
	}
	res.render('cars/show', { car });
};

module.exports.renderEdit = async (req, res) => {
	const { id } = req.params;
	const car = await Car.findById(id);
	if (!car) {
		req.flash('error', 'Electric Vehicle does not exist!');
		res.redirect('/cars');
	}
	res.render('cars/edit', { car });
};

module.exports.updateCar = async (req, res) => {
	const { id } = req.params;
	const car = await Car.findByIdAndUpdate(id, {
		...req.body.car,
	});
	const imgs = req.files.map((f) => ({
		url: f.path,
		filename: f.filename,
	}));
	car.image.push(...imgs);
	await car.save();
	if (req.body.selectedImages) {
		for (let filename of req.body.selectedImages) {
			await cloudinary.uploader.destroy(filename);
		}
		await car.updateOne({
			$pull: { image: { filename: { $in: req.body.selectedImages } } },
		});
	}
	req.flash('success', 'Electric Vehicle was successfully updated!');
	res.redirect(`/cars/${car.id}`);
};

module.exports.deleteCar = async (req, res) => {
	const { id } = req.params;
	await Car.findByIdAndDelete(id);
	req.flash('success', 'Electric Vehicle was successfully deleted!');
	res.redirect('/cars');
};
