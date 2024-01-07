const functions = require("firebase-functions");
const algoliasearch = require("algoliasearch");

const express = require("express");
const itrackerPaymentFunction = express();
const getFarmersInLocationWithProducts = express();
const sendFarmersNotification = express();
const admin = require("firebase-admin");
var cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY1);

const useEmulator = process.env.FIRESTORE_ENVIRONMENT;
console.log(useEmulator, `this is the useEmulator env`);
if (useEmulator === "development") {
	admin.initializeApp({
		//projectId inserted here for local testing
		projectId: "itracker-development",
		//this is the host if you are using firebase emulator
		host: "localhost",
		port: 8080,
		// Disable SSL when using the emulator
		ssl: false,
	});
	console.log(`i am connected to the local`);
} else {
	admin.initializeApp();
	console.log(`i am connected to the live firestore`);
}

const fireStoreDB = admin.firestore();

// Set up Algolia.
// The app id and API key are coming from the cloud functions environment

const algoliaClient = algoliasearch(
	functions.config().algolia.appid,
	functions.config().algolia.apikey
);

// // Since I'm using develop and production environments, I'm automatically defining
// // the index name according to which environment is running. functions.config().projectId is a default
// // property set by Cloud Functions.

const collectionIndexName =
	functions.config().projectId === "itracker-development"
		? "sales_dev"
		: "sales_dev";
const collectionIndex = algoliaClient.initIndex(collectionIndexName);

//shop/supermarket index
const shopCollectionIndexName =
  functions.config().projectId === "itracker-development"
    ? "shop_items"
    : "shop_items"; // Set the appropriate index name for the new collection
const shopCollectionIndex = algoliaClient.initIndex(shopCollectionIndexName);

// Create a HTTP request cloud function.
exports.sendCollectionToAlgolia = functions.https.onRequest(
	async (req, res) => {
		// This array will contain all records to be indexed in Algolia.
		const algoliaRecords = [];

		// Retrieve all documents from the PRODUCT collection.
		const querySnapshot = await fireStoreDB.collection("products").get();

		querySnapshot.docs.forEach((doc) => {
			const document = doc.data();
			// Essentially, you want your records to contain any information that facilitates search,
			// display, filtering, or relevance. Otherwise, you can leave it out.
			const record = {
				objectID: doc.id,
				productName: doc.productName,
				createdAt: doc.createdAt,
				productDescription: doc.productDescription,
				productPrice: doc.productPrice,
				companyID: doc.companyID,
				isFreelancer: doc.isFreelancer,
				companyName: doc.companyName,
				city: doc.city,
				region: doc.region,
			};

			algoliaRecords.push(record);
		});

		// After all records are created, we save them to
		collectionIndex.saveObjects(algoliaRecords, (error, content) => {
			if (error) {
				console.error(error);
				res
					.status(500)
					.send("An error occurred while indexing COLLECTION to Algolia.");
			} else {
				console.log("COLLECTION was indexed to Algolia successfully.");
				res.status(200).send("COLLECTION was indexed to Algolia successfully.");
			}
		});
	}
);

exports.sendShopCollectionToAlgolia = functions.https.onRequest(
	async (req, res) => {
	  const algoliaRecordsShop = [];
  
	  // Retrieve all documents from the new collection.
	  const querySnapshot = await fireStoreDB.collection("shopItems").get();
  
	  querySnapshot.docs.forEach((doc) => {
		const document = doc.data();
		const record = {
			objectID: doc.id,
			item: document.item,
			imageURL: document.imageURL,
			createdAt: document.createdAt,
			price: document.price,
			quantity: document.quantity,
		  // ...
		};
  
		algoliaRecordsShop.push(record);
	  });
  
	  // Save the records to the Algolia index for the new collection
	  shopCollectionIndex.saveObjects(algoliaRecordsShop, (error, content) => {
		if (error) {
		  console.error(error);
		  res
			.status(500)
			.send("An error occurred while indexing SHOP_COLLECTION to Algolia.");
		} else {
		  console.log("SHOP_COLLECTION was indexed to Algolia successfully.");
		  res
			.status(200)
			.send("SHOP_COLLECTION was indexed to Algolia successfully.");
		}
	  });
	}
);

  

exports.collectionOnCreate = functions.firestore
	.document("products/{uid}")
	.onCreate(async (snapshot, context) => {
		await saveDocumentInAlgolia(snapshot);
	});

	exports.shopCollectionOnCreate = functions.firestore
  .document("shopItems/{uid}")
  .onCreate(async (snapshot, context) => {
    await saveDocumentInAlgoliaForShopCollection(snapshot);
  });

exports.collectionOnUpdate = functions.firestore
	.document("products/{uid}")
	.onUpdate(async (change, context) => {
		await updateDocumentInAlgolia(change);
	});
	
	exports.shopCollectionOnUpdate = functions.firestore
	.document("shopItems/{uid}")
	.onUpdate(async (change, context) => {
	  await updateDocumentInAlgoliaForCollection(change);
	});

exports.collectionOnDelete = functions.firestore
	.document("products/{uid}")
	.onDelete(async (snapshot, context) => {
		await deleteDocumentFromAlgolia(snapshot);
	});

	exports.shopCollectionOnDelete = functions.firestore
  .document("shopItems/{uid}")
  .onDelete(async (snapshot, context) => {
    await deleteDocumentFromAlgoliaForShopCollection(snapshot);
  });

async function saveDocumentInAlgolia(snapshot) {
	if (snapshot.exists) {
		const record = snapshot.data();
		if (record) {
			// Removes the possibility of snapshot.data() being undefined.
			record.objectID = snapshot.id;

			await collectionIndex.saveObject(record); // Adds or replaces a specific object.
		}
	}
}

async function updateDocumentInAlgolia(change) {
	const docBeforeChange = change.before.data();
	const docAfterChange = change.after.data();
	if (docBeforeChange && docAfterChange) {
		await deleteDocumentFromAlgolia(change.before); // Deletes the document from Algolia.
		await saveDocumentInAlgolia(change.after); // Indexes the updated document in Algolia.
	}
}
async function deleteDocumentFromAlgolia(snapshot) {
	if (snapshot.exists) {
		const objectID = snapshot.id;
		await collectionIndex.deleteObject(objectID);
	}
}

async function saveDocumentInAlgoliaForShopCollection(snapshot) {
	if (snapshot.exists) {
	  const record = snapshot.data();
	  if (record) {
		// Removes the possibility of snapshot.data() being undefined.
		record.objectID = snapshot.id;
  
		await shopCollectionIndex.saveObject(record); // Adds or replaces a specific object in the shop collection index.
	  }
	}
  }
  
  
  async function updateDocumentInAlgoliaForCollection(change) {
	const docBeforeChange = change.before.data();
	const docAfterChange = change.after.data();
	if (docBeforeChange && docAfterChange) {
		await deleteDocumentFromAlgoliaForShopCollection(change.before); // Deletes the document from Algolia.
		await saveDocumentInAlgoliaForShopCollection(change.after); // Indexes the updated document in Algolia.
	}
  }
  
  async function deleteDocumentFromAlgoliaForShopCollection(snapshot) {
	// Similar to deleteDocumentFromAlgolia function, but for the new collection
	if (snapshot.exists) {
		const objectID = snapshot.id;
		await collectionIndex.deleteObject(objectID);
	}
  }

itrackerPaymentFunction.use(express.static("public"));
itrackerPaymentFunction.use(express.json());

itrackerPaymentFunction.options("*", cors());
itrackerPaymentFunction.use(
	cors({								
		origin: [
			//insert the link of the app link here
			// -----------------------------------
			// -----------------------------------
			"http://localhost:3000", //this is just a sample eg http://worldfoodtracker.com/
			"http://worldfoodtracker.com", //another example incase it has two links
		],

		methods: ["GET", "PUT", "POST"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

const calculateOrderAmount = async (userId, orderId, paymentType) => {
	if (paymentType === "consultant") {
		// console.log(`this is the consultant calculation path that it passed`);
		// console.log(userId, orderId, `first is userId second is orderId`);

		try {
			let result = await fireStoreDB
				.collection("marketplace")
				.doc(userId)
				.collection("bookings")
				.doc(orderId)
				.get();

			// if (result.exists) {
			// 	// 	// Access the document data
			// 	const documentData = result.data();
			// 	console.log(documentData);
			// 	// 	// res.send(documentData);
			// } else {
			// 	// res.status(404).send('Document not found');
			// 	console.log("Document not found");
			// }
			// console.log(result.data().event.price, `this is the result data`);
			// console.log(result.data().event.price, `this is the price of the item`);
			return result.data().event.price;
		} catch (err) {
			console.log(err);
			return err;
		}
	} else if (paymentType === "supplier") {
		// console.log(`this is the supplier calculation path that it passed`);

		try {
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
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	// return result;

	// const orderTotal = product.price * items.multiplier;
	// Calculate the order total on the server to prevent
	// people from directly manipulating the amount on the client
	// return totalCost;
	// return 2500;
};

itrackerPaymentFunction.post("/create-payment-intent", async (req, res) => {
	try {
		const { userId, orderId, paymentType } = req.body;

		// Create a PaymentIntent with the order amount and currency
		const paymentIntent = await stripe.paymentIntents.create({
			amount: await calculateOrderAmount(userId, orderId, paymentType),
			currency: "gbp",
			automatic_payment_methods: { enabled: true },
		});

		// console.log(
		// 	paymentIntent.client_secret,
		// 	`this is the paymentIntent generated`
		// );

		res.send({
			clientSecret: paymentIntent.client_secret,
		});
	} catch (err) {
		res.status(500).json({
			message: "something went wrong",
		});
	}
});

exports.itrackerPaymentFunction = functions.https.onRequest(
	itrackerPaymentFunction
);

//payment process for the restaurant
const calculateOrderAmountRes = async (userId, orderId) => {
	try {
		let result = await fireStoreDB
			.collection("marketplace")
			.doc(userId)
			.collection("restaurantOrders")
			// .where("orderId", "==", orderId)
			.doc(orderId)
			.get();

		return result.data().order.mealPrice;
	} catch (err) {
		console.log(err);
		return err;
	}

	// const orderTotal = product.price * items.multiplier;
	// Calculate the order total on the server to prevent
	// people from directly manipulating the amount on the client
	// return totalCost;
	// return 2500;
};

itrackerPaymentFunction.post("/create-payment-intent-res", async (req, res) => {
	try {
		const { userId, orderId } = req.body;

		// // Create a PaymentIntent with the order amount and currency
		const paymentIntent = await stripe.paymentIntents.create({
			amount: await calculateOrderAmountRes(userId, orderId),
			currency: "gbp",
			automatic_payment_methods: { enabled: true },
		});

		res.send({
			clientSecret: paymentIntent.client_secret,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
});

exports.itrackerPaymentFunction = functions.https.onRequest(
	itrackerPaymentFunction
);

// function to get the farmers In Same Location
const getFarmersInSameLocation = async (city) => {
	try {
		const result = await fireStoreDB
			.collection("users")
			.where("city", "==", city)
			.where("buildingFunction", "==", "Farm")
			.get();

		return result;
	} catch (err) {
		return err;
	}
};

// section for the http Request to send farmers Notifications
sendFarmersNotification.use(express.json());
sendFarmersNotification.use(express.static("public"));

sendFarmersNotification.options("*", cors());
sendFarmersNotification.use(
	cors({
		origin: [
			//insert the link of the app link here
			// -----------------------------------
			// -----------------------------------
			"http://localhost:3000", //this is just a sample eg http://worldfoodtracker.com/
			"http://worldfoodtracker.com", //another example incase it has two links
			"https://worldfoodtracker.com", //another example incase it has two linkss
		],

		methods: ["GET", "PUT", "POST"],
	})
);

sendFarmersNotification.post("/send-message", async (req, res) => {
	try {
		const { cartList, city } = req.body;

		let cartPass = cartList;

		let farmersInCity = await getFarmersInSameLocation(city);

		farmersInCity.forEach((doc) => {
			fireStoreDB
				.collection("farm_users")
				.doc(`${doc.id}`)
				.collection("messages")
				.add({ cart: cartPass });
		});

		res.send({ status: "success" });
	} catch {
		res.status(500).json({
			message: "something went wrong",
		});
	}
});

exports.sendFarmersNotification = functions.https.onRequest(
	sendFarmersNotification
);

//firestore trigger for user request

getFarmersInLocationWithProducts.use(express.json());
sendFarmersNotification.use(express.static("public"));

getFarmersInLocationWithProducts.options("*", cors());
getFarmersInLocationWithProducts.use(
	cors({
		origin: [
			"http://localhost:3000", //this is just a sample eg http://worldfoodtracker.com/
			"https://worldfoodtracker.com", //another example incase it has two links
			// "http://worldfoodtracker.com"
		],

		methods: ["GET", "PUT", "POST"],
	})
);

const farmersProduce = async (id, farmerName, arrayOfNamesOfObjectInCart) => {
	try {
		let result = await fireStoreDB
			.collection("marketplace")
			.doc(id)
			.collection("produce")
			.where("item", "in", arrayOfNamesOfObjectInCart)
			.get();

		return { farmerId: id, farmerName: farmerName, result: result };
	} catch (err) {
		return err;
	}
};

getFarmersInLocationWithProducts.post("/farmers", async (req, res) => {
	try {
		const { cart, city } = req.body;
		let arrayOfNamesOfObjectInCart = cart.map((obj) => {
			return obj.data;
		});

		let farmers = await getFarmersInSameLocation(city);

		let promises = [];

		farmers.forEach(async (farmer) => {
			let farmerName = farmer.data().firstName;
			let producePromises = farmersProduce(
				farmer.id,
				farmerName,
				arrayOfNamesOfObjectInCart
			);
			promises.push(producePromises);
		});

		let values = await Promise.all(promises);

		const getAllInfo = (values) => {
			return new Promise((resolve, reject) => {
				let results = values.map((value) => {
					const { farmerId, farmerName, result } = value;
					let arr = [];

					result.forEach((doc) => {
						arr.push({
							product: doc.data(),
							productId: doc.id,
						});
					});

					// console.log(arr);

					return {
						farmerId: farmerId,
						farmerName: farmerName,
						farmerProducts: arr,
					};
				});

				resolve(results);
			});
		};

		// result here
		let result = await getAllInfo(values);

		res.json({ data: result });
	} catch {
		res.status(500).json({
			message: "something went wrong",
		});
	}
});

exports.getFarmersInLocationWithProducts = functions.https.onRequest(
	getFarmersInLocationWithProducts
);
