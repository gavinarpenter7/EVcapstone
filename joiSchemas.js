const Joi = require('joi');

module.exports.carSchema = Joi.object({
	car: Joi.object({
		name: Joi.string().required(),
		model: Joi.string().required(),
		year: Joi.string().required(),
		body: Joi.string().required(),
		// image: Joi.string().required(),
		price: Joi.string().required(),
		description: Joi.string().required(),
		tripRange: Joi.string().required(),
		driveTrain: Joi.string().required(),
		fullChargeTime: Joi.string().required(),
			quickChargeTime: Joi.string().required(),
			ownershipCostOverTime: Joi.string().required(),
			selfDriving: Joi.string().required(),
			passengers: Joi.string().required(),
			storageSize: Joi.string().required(),
			costToInsureAnnual: Joi.string().required(),
			chargerType: Joi.string().required(),
			zeroSixty: Joi.string().required(),
			hp: Joi.string().required(),
		}).required(),
	selectedImages: Joi.array(),
});

module.exports.reviewSchema = Joi.object({
	review: Joi.object({
		body: Joi.string().required(),
		rating: Joi.number().required().min(1).max(5),
	}).required(),
});
