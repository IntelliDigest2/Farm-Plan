const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require("express");
const itrackerPaymentFunction = express();
const getFarmersInLocationWithProducts = express();
const sendFarmersNotification = express();
const admin = require("firebase-admin");

var cors = require("cors");

const useEmulator = process.env.FIRESTORE_ENVIRONMENT;

if (useEmulator === "development") {
	// process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";
	admin.initializeApp({
		//projectId inserted here for local testing
		projectId: "itracker-development",
	});
} else {
	admin.initializeApp(functions.config().firebase);
}

const fireStoreDB = admin.firestore();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY1);

itrackerPaymentFunction.use(express.static("public"));
itrackerPaymentFunction.use(express.json());

itrackerPaymentFunction.options("*", cors());
itrackerPaymentFunction.use(
	cors([
		{
			origin: [
				//insert the link of the app link here
				// -----------------------------------
				// -----------------------------------
				"http://localhost:3000/", //this is just a sample eg http://worldfoodtracker.com/
				"http://worldfoodtracker.com/", //another example incase it has two links
			],

			methods: [["GET", "PUT", "POST"]],
		},
	])
);

const calculateOrderAmount = async (userId, orderId) => {
	let QuerySnapshot = await fireStoreDB
		.collection("marketplace")
		.doc(userId)
		.collection("messages")
		.doc(orderId)
		.get();

	let totalArray = [];

	QuerySnapshot.data().cart.forEach((cartItem) => {
		totalArray.push(cartItem.price * cartItem.quantity);
	});

	// // // calculation of the order amount
	return totalArray.reduce((total, num) => {
		return total + num;
	}, 0);

	// const orderTotal = product.price * items.multiplier;
	// Calculate the order total on the server to prevent
	// people from directly manipulating the amount on the client
	// return totalCost;
	// return 2500;
};

itrackerPaymentFunction.post("/create-payment-intent", async (req, res) => {
	const { userId, orderId } = req.body;

	// Create a PaymentIntent with the order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
		amount: await calculateOrderAmount(userId, orderId),
		currency: "gbp",
		automatic_payment_methods: { enabled: true },
	});

	res.send({
		clientSecret: paymentIntent.client_secret,
	});
});

exports.itrackerPaymentFunction = functions.https.onRequest(
	itrackerPaymentFunction
);

// function to get the farmers In Same Location
const getFarmersInSameLocation = async (city) => {
	console.log(city);
	const result = await fireStoreDB
		.collection("users")
		.where("city", "==", city)
		.where("buildingFunction", "==", "Farm")
		.get();

	result.forEach((doc) => {
		if (!doc.exists) {
			console.log("No such document!");
		} else {
			console.log("Document data:", doc.data());
			// console.log(doc.id, "this is the documents id");
		}
	});

	return result;
};

// section for the http Request to send farmers Notifications
sendFarmersNotification.use(express.json());
sendFarmersNotification.use(express.static("public"));

sendFarmersNotification.options("*", cors());
sendFarmersNotification.use(
	cors([
		{
			origin: [
				//insert the link of the app link here
				// -----------------------------------
				// -----------------------------------
				"http://localhost:3000/", //this is just a sample eg http://worldfoodtracker.com/
				"http://worldfoodtracker.com/", //another example incase it has two links
			],

			methods: [["GET", "PUT", "POST"]],
		},
	])
);

sendFarmersNotification.post("/send-message", async (req, res) => {
	const { cart, city } = req.body;

	let cartPass = cart;

	let farmersInCity = await getFarmersInSameLocation(city);

	farmersInCity.forEach((doc) => {
		fireStoreDB
			.collection("farm_users")
			.doc(`${doc.id}`)
			.collection("messages")
			.add({ cart: cartPass });
	});

	res.send({ status: "success" });
});

exports.sendFarmersNotification = functions.https.onRequest(
	sendFarmersNotification
);

//firestore trigger for user request

getFarmersInLocationWithProducts.use(express.json());
sendFarmersNotification.use(express.static("public"));

getFarmersInLocationWithProducts.options("*", cors());
getFarmersInLocationWithProducts.use(
	cors([
		{
			origin: [
				"http://localhost:3000/", //this is just a sample eg http://worldfoodtracker.com/
				"http://worldfoodtracker.com/", //another example incase it has two links
			],

			methods: [["GET", "PUT", "POST"]],
		},
	])
);

const farmersProduce = async (id, arrayOfNamesOfObjectInCart) => {
	let result = await fireStoreDB
		.collection("marketplace")
		.doc(id)
		.collection("produce")
		.where("item", "in", arrayOfNamesOfObjectInCart)
		.get();

	return result;
};

getFarmersInLocationWithProducts.post("/farmers", async (req, res) => {
	const { adminInfo, cart, city } = req.body;
	let arrayOfNamesOfObjectInCart = cart.map((obj) => {
		return obj.data;
	});

	// if (adminInfo.role === "admin") {
	let farmersInCity = await getFarmersInSameLocation(city);
	let response = [];
	farmersInCity
		.forEach(async (farmer) => {
			let result = await farmersProduce(farmer.id, arrayOfNamesOfObjectInCart);

			result.forEach((doc) => {
				// console.log(doc.data(),farmer.data().name, farmer.id, "over here");
				response.push({
					name: farmer.data().name,
					id: farmer.id,
					products: doc.data(),
				});
			});
			return response;
		})
		.then((value) => {
			console.log(value);
		});

	// console.log(response);

	// res.send({
	// 	farmersInfo: farmerArray,
	// });
	res.send({ status: "success" });
});

exports.getFarmersInLocationWithProducts = functions.https.onRequest(
	getFarmersInLocationWithProducts
);
