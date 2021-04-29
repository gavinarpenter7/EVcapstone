const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
  name: String,
  model: String,
  year: String,
  price: String,
  body: String,
  image: [
		{
			url: String,
			filename: String,
		},
	],
  description: String,
  tripRange: String,
  driveTrain: String,
  fullChargeTime: String,
  quickChargeTime: String,
  ownershipCostOverTime: String,
  selfDriving: String,
  passengers: String,
  storageSize: String,
  costToInsureAnnual: String,
  chargerType: String,
  zeroSixty: String,
  hp: String,
  submittedBy:{
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Review',
		},
	],
});

CarSchema.post('findOneAndDelete', async function (data) {
	if (data) {
		await Review.deleteMany({
			_id: {
				$in: data.reviews,
			},
		});
	}
});

module.exports = mongoose.model("Car", CarSchema);

