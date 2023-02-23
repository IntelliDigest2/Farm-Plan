const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

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

//firestore trigger for user request
exports.SendFarmerNotification = functions.firestore
	.document("/marketplace/{userThatSentTheRequest}/messages/{newDocumentId}")
	.onWrite(async (change, context) => {
		const beforeValue = change.before.data();
		console.log(
			"🚀 ~ file: index.js:103 ~ .onWrite ~ beforeValue:",
			beforeValue
		);

		const afterValue = change.after.data();
		console.log("🚀 ~ file: index.js:106 ~ .onWrite ~ afterValue:", afterValue);

		const userWhoSentTheRequest = context.params.userThatSentTheRequest;

		if (afterValue) {
			let userInfo = await fireStoreDB
				.collection("users")
				.doc(userWhoSentTheRequest)
				.get();

			let farmersInCity = await fireStoreDB
				.collection("users")
				.where("city", "==", userInfo.data().city)
				.where("buildingFunction", "==", "Farm")
				.get();

			farmersInCity.forEach((doc) => {
				console.log(doc.id, "loop");
				fireStoreDB
					.collection("farm_users")
					.doc(`${doc.id}`)
					.collection("messages")
					.add(afterValue);
			});
		}
	});
