const Joi = require('joi');

module.exports.restaurantSchema = Joi.object({
	restaurant: Joi.object({
		name: Joi.string().required(),
		// image: Joi.string().required(),
		price: Joi.string().required(),
		description: Joi.string().required(),
		location: Joi.string().required(),
		dateOpened: Joi.number().required(),
	}).required(),
	selectedImages: Joi.array(),
});

module.exports.reviewSchema = Joi.object({
	review: Joi.object({
		body: Joi.string().required(),
		rating: Joi.number().required().min(1).max(5),
	}).required(),
});
