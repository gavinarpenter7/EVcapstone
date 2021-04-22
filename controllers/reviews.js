const Car = require('../models/car');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
	const { id } = req.params;
	const car = await Car.findById(id);
	const review = new Review(req.body.review);
	review.author = req.user._id;
	car.reviews.push(review);
	await review.save();
	await car.save();
	req.flash('success', 'Review was successfully created!');
	res.redirect(`/cars/${id}`);
};

module.exports.deleteReview = async (req, res) => {
	const { id, reviewId } = req.params;
	await Car.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
	await Review.findByIdAndDelete(reviewId);
	req.flash('success', 'Review was successfully deleted!');
	res.redirect(`/cars/${id}`);
};
