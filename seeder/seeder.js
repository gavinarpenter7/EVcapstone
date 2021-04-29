const mongoose = require('mongoose');

// const Dog = require('../models/dog')
const Car = require('../models/car')

//mongoose connecting to mongo

mongoose
	.connect('mongodb://localhost:27017/eVCapstone', {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Mongo Connection Open');
	})
	.catch((error) => handleError(error));

  // const sampleData = [
  //   {name: "Rottweiler", price: "Medium", protection:"High", companionship:"High",allergies: "Yes", childFriendly:"Low", insuranceRisk: "High", size: "Large", hairLength:"Short", athleticism:"Medium", expOwnReq:"Yes"},
  //   {name: "Chihuahua", price: "Low", protection:"Low", companionship:"Low",allergies: "Yes", childFriendly:"High", insuranceRisk: "Low", size: "Small", hairLength:"Varies", athleticism:"Low", expOwnReq:"No"},
  //   {name: "Golden Retriever", price: "High", protection:"Low", companionship:"High",allergies: "Yes", childFriendly:"High", insuranceRisk: "Low", size: "Large", hairLength:"Long", athleticism:"Medium", expOwnReq:"No"}
  // ]
	const sampleData = [
		{
			name: "Tesla",
			model: "X",
			year: "2020",
			image: [
				{
					url:
						'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/eeyytsqq0fls4n6gaae0.jpg',
					filename: 'Laci Capstone/eeyytsqq0fls4n6gaae0',
				},
				{
					url:
						'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/dztv3cb3acvishlrsoie.jpg',
					filename: 'Laci Capstone/dztv3cb3acvishlrsoie',
				},
			],
			price: "$80,000",
			body: "SUV",
			description: "Mid-size all electric luxury crossover with rear falcon wing doors.",
			tripRange: "340-370 miles",
			driveTrain: "AWD",
			fullChargeTime: "10.5 hours",
			quickChargeTime: "40 minutes",
			ownershipCostOverTime: "$96,000",
			selfDriving: "In-Beta",
			passengers: "5-7",
			storageSize: "88.1 cubic feet",
			costToInsureAnnual: "$2,400",
			chargerType: "Type-2",
			zeroSixty: "3.8 seconds",
			hp:"670-1,020",
			submittedBy:"606f52eff9e42c65bc528365",
		},
		{
			name: "Audi",
			model: "e-tron",
			year: "2021",
			image: [
				{
					url:
						'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/eeyytsqq0fls4n6gaae0.jpg',
					filename: 'Laci Capstone/eeyytsqq0fls4n6gaae0',
				},
				{
					url:
						'https://res.cloudinary.com/dxg5gei8r/image/upload/v1616630319/Laci%20Capstone/dztv3cb3acvishlrsoie.jpg',
					filename: 'Laci Capstone/dztv3cb3acvishlrsoie',
				},
			],
			price: "$65,000",
			body: "SUV",
			description: "Four door all electric crossover.",
			tripRange: "200-220 miles",
			driveTrain: "AWD",
			fullChargeTime: "10 hours",
			quickChargeTime: "30 minutes",
			ownershipCostOverTime: "N/A",
			selfDriving: "N/A",
			passengers: "5",
			storageSize: "88.1 cubic feet",
			costToInsureAnnual: "$2,400",
			chargerType: "Type-2",
			zeroSixty: "3.8 seconds",
			hp:"355",
			submittedBy:"606f52eff9e42c65bc528365",

		}
	];


  
// We first clear our database and then add in our dogs sample
const seedDB = async () => {
	await Car.deleteMany({});
	const res = await Car.insertMany(sampleData)
		.then((data) => console.log('Data inserted'))
		.catch((e) => console.log(e));
};

// We run our seeder function then close the database after.
seedDB().then(() => {
	mongoose.connection.close();
});