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
	process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";
	admin.initializeApp({
		projectId: "suschemtrade-93a26",
	});
} else {
	admin.initializeApp(functions.config().firebase);
}

const fireStoreDB = admin.firestore();

console.log("---------------------------------------------");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY1);

itrackerPaymentFunction.use(express.static("public"));
itrackerPaymentFunction.use(express.json());

itrackerPaymentFunction.options("*", cors());
itrackerPaymentFunction.use(
	cors([
		{
			origin: [
                //insert the name of the firebase account ere
				"firebase application  name suschemtrade-93a26.web.app",
				"another example suschemtrade-93a26.firebaseapp.com",
			],
			
			methods: [["GET", "PUT", "POST"]],
		},
	])
);





const calculateOrderAmount = async (orderId) => {
	// let totalCost = [];
	console.log("here");

	// assuming purchase request is the name of the collection

	// also assumming that the structure of the data stored in the database is in the format

	

	let QuerySnapshot = await fireStoreDB
		.collection("purchases")
        .doc(orderId)
		.get();

	QuerySnapshot.((doc) => {
		if (item.productId === doc.id) {
			totalCost.push(item.numberOfProductForPurchase * doc.data().price);
	    }
		})

	let totalArray = [];

	 QuerySnapshot.cartList.forEach((cartItem)=>{
        totalArray.push(cartItem.price * cartItem.quantity)
     }) 

	// calculation of the order amount
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
	const { orderId } = req.body;

	// Create a PaymentIntent with the order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
		amount: await calculateOrderAmount(orderId),
		currency: "usd",
		automatic_payment_methods: {
			enabled: true,
		},
	});

	res.send({
		clientSecret: paymentIntent.client_secret,
	});
});

exports.itrackerPaymentFunction = functions.https.onRequest(itrackerPaymentFunction);
