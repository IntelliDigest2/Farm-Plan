export const AddSupplierProduct = (data) => {
	return (dispatch, getState, { getFirebase }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		var uid;
		switch (profile.type) {
			case "business_admin":
				uid = authUID;
				break;
			case "business_sub":
				uid = profile.admin;
				break;
			case "academic_admin":
				uid = authUID;
				break;
			case "academic_sub":
				uid = profile.admin;
				break;
			case "household_admin":
				uid = authUID;
				break;
			case "household_sub":
				uid = profile.admin;
				break;
			default:
				uid = authUID;
				break;
		}

		return getFirebase()
			.firestore()
			.collection("products")
			.add(data.upload)
			.then((docRef) => {
				// make the docId easily acsessible so that we can delete it later if we want.
				getFirebase()
					.firestore()
					.collection("products")
					.doc(docRef.id)
					.set({ id: docRef.id, companyID: uid }, { merge: true });
				// dispatch({ type: "CREATE_PRODUCT", data });
			});
		// .catch((err) => {
		// 	dispatch({ type: "CREATE_PRODUCT_ERROR", err });
		// });
	};
};

export const getProducts = (duration, period) => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database

		let startOfWeek, endOfWeek;
		let day;

		let startOfMonth, endOfMonth;
		let startOfYear, endOfYear;

		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		var uid;

		if (duration === "Week") {
			const currentDate = new Date();
			const firstDayOfMonth = new Date(
				currentDate.getFullYear(),
				currentDate.getMonth()
			);
			const weekOfMonth = period;

			// console.log(`week ${weekOfMonth} of month`);

			// console.log(firstDayOfMonth, `first day of month`);

			// Calculate the start and end timestamps for the week of the month
			startOfWeek = new Date();
			startOfWeek.setDate((weekOfMonth - 1) * 7 + 1);
			startOfWeek.setHours(0, 0, 0, 0);

			endOfWeek = new Date();
			endOfWeek.setDate(weekOfMonth * 7);
			endOfWeek.setHours(23, 59, 59, 999);

			// console.log(startOfWeek, `this is the start of the week`);
			// console.log(endOfWeek, `this is the end of the week`);
		} else if (duration === "Month") {
			const currentDate = new Date();
			let year = currentDate.getFullYear();

			// Calculate the start and end timestamps for the week of the month

			startOfMonth = new Date(period.monthYear, period.monthNumber - 1, 1); // Month is 0-indexed, so we subtract 1 from the specified month
			endOfMonth = new Date(period.monthYear, period.monthNumber, 0);
			startOfMonth.setHours(0, 0, 0, 0);
			endOfMonth.setHours(23, 59, 59, 999);
			const weekOfMonth = period;

			// console.log(startOfMonth, `this is the start of the month`);
			// console.log(endOfMonth, `this is the end of the month`);
		} else if (duration === "Year") {
			const currentDate = new Date();
			const year = period;

			startOfYear = new Date(year, 0, 1);
			startOfYear.setHours(0, 0, 0, 0);

			endOfYear = new Date(year, 11, 31);
			endOfYear.setHours(23, 59, 59, 999);

			// console.log(startOfYear, `this is the start of the year`);
			// console.log(endOfYear, `this is the end of the year`);
		} else {
			day = period;
			day.setHours(0, 0, 0, 0);
		}
		switch (profile.type) {
			case "business_admin":
				uid = authUID;
				break;
			case "business_sub":
				uid = profile.admin;
				break;
			case "academic_admin":
				uid = authUID;
				break;
			case "academic_sub":
				uid = profile.admin;
				break;
			case "household_admin":
				uid = authUID;
				break;
			case "household_sub":
				uid = profile.admin;
				break;
			default:
				uid = authUID;
				break;
		}

		let collectionRef = getFirestore()
			.collection("products")
			.where("companyID", "==", uid)
			.orderBy("createdAt", "desc");

		let query;

		switch (duration) {
			case "Week":
				query = collectionRef
					.where("createdAt", ">=", startOfWeek)
					.where("createdAt", "<=", endOfWeek);
				break;

			case "Month":
				query = collectionRef
					.where("createdAt", ">=", startOfMonth)
					.where("createdAt", "<=", endOfMonth);
				break;

			case "Year":
				query = collectionRef
					.where("createdAt", ">=", startOfYear)
					.where("createdAt", "<=", endOfYear);
				break;

			default:
				query = collectionRef
					.where("createdAt", ">=", day)
					//this calculate the beginning of the day to when the day ends i.e added 864000000milliseconds which is 24 hours
					.where("createdAt", "<", new Date(day.getTime() + 86400000));

				break;
		}

		query.onSnapshot(
			(snapshot) => {
				let supplierProducts = [];

				snapshot.forEach((doc) => {
					supplierProducts.push({ ...doc.data(), salesId: doc.id });
				});

				// Do something with the values array, e.g., update the UI
				console.log(supplierProducts, `this is what is returned for the stock`);
				dispatch({ type: "GET_PRODUCTS", payload: supplierProducts });
			},
			(err) => {
				console.error("Error getting real-time updates:", err);
				dispatch({ type: "GET_PRODUCTS_ERROR", err });
			}
		);
		// .then((snapshot) => {
		//   const data = [];
		//   snapshot.forEach((doc) => {
		//     data.push(doc.data());
		//   });
		//   dispatch({ type: "GET_PRODUCTS", payload: data });
		// })
		// .catch((err) => {
		//   dispatch({ type: "GET_PRODUCTS_ERROR", err });
		// });
	};
};

export const addToSales = (data, currentQuantity) => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		const db = getFirestore();

		const batch = db.batch();
		console.log(batch);

		var uid;
		switch (profile.type) {
			case "business_admin":
				uid = authUID;
				break;
			case "business_sub":
				uid = profile.admin;
				break;
			case "academic_admin":
				uid = authUID;
				break;
			case "academic_sub":
				uid = profile.admin;
				break;
			case "household_admin":
				uid = authUID;
				break;
			case "household_sub":
				uid = profile.admin;
				break;
			default:
				uid = authUID;
				break;
		}

		console.log(data, `this is the data that is sent to batch write`);
		console.log(
			currentQuantity,
			`this is the current quantity that is sent to the batch write`
		);

		const productsCollectionRef = getFirestore().collection("products");

		const productsCollectionQuery = getFirestore()
			.collection("products")
			.where("productName", "==", data.productName)
			.where("brandName", "==", data.brandName)
			.where("batchNumber", "==", data.batchNumber);
		const newDocRef = db.collection("sales").doc(); // Firestore will generate a unique document ID

		// // Set data for the new document in the batch
		batch.set(newDocRef, { ...data, companyID: uid });
		return productsCollectionQuery.get().then((snapshot) => {
			snapshot.forEach((doc) => {
				// You can access and update each document here
				const documentRef = productsCollectionRef.doc(doc.id);

				// Add the update operation to the batch
				batch.update(documentRef, {
					currentQuantity:
						parseInt(currentQuantity) - parseInt(data.productQty),
				});
			});

			return batch.commit();
		});
	};
};

export const addToRent = (data) => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		var uid;
		switch (profile.type) {
			case "business_admin":
				uid = authUID;
				break;
			case "business_sub":
				uid = profile.admin;
				break;
			case "academic_admin":
				uid = authUID;
				break;
			case "academic_sub":
				uid = profile.admin;
				break;
			case "household_admin":
				uid = authUID;
				break;
			case "household_sub":
				uid = profile.admin;
				break;
			default:
				uid = authUID;
				break;
		}

		getFirestore()
			.collection("rent")
			.add(data.upload)
			.then((docRef) => {
				// make the docId easily accessible so that we can delete it later if we want.
				getFirestore().collection("rent").doc(docRef.id);
				// .set({ id: data.upload.id }, { merge: true });
				dispatch({ type: "ADD_TO_RENT" });
			})
			.catch((err) => {
				dispatch({ type: "ADD_TO_RENT_ERROR", err });
			});
	};
};

export const getSales = (duration, period) => {
	let startOfWeek, endOfWeek;
	let day;

	let startOfMonth, endOfMonth;
	let startOfYear, endOfYear;
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		var uid;

		if (duration === "Week") {
			const currentDate = new Date();
			const firstDayOfMonth = new Date(
				currentDate.getFullYear(),
				currentDate.getMonth()
			);
			const weekOfMonth = period;

			// console.log(`week ${weekOfMonth} of month`);

			// console.log(firstDayOfMonth, `first day of month`);

			// Calculate the start and end timestamps for the week of the month
			startOfWeek = new Date();
			startOfWeek.setDate((weekOfMonth - 1) * 7 + 1);
			startOfWeek.setHours(0, 0, 0, 0);

			endOfWeek = new Date();
			endOfWeek.setDate(weekOfMonth * 7);
			endOfWeek.setHours(23, 59, 59, 999);

			// console.log(startOfWeek, `this is the start of the week`);
			// console.log(endOfWeek, `this is the end of the week`);
		} else if (duration === "Month") {
			const currentDate = new Date();
			let year = currentDate.getFullYear();

			// Calculate the start and end timestamps for the week of the month

			startOfMonth = new Date(period.monthYear, period.monthNumber - 1, 1); // Month is 0-indexed, so we subtract 1 from the specified month
			endOfMonth = new Date(period.monthYear, period.monthNumber, 0);
			startOfMonth.setHours(0, 0, 0, 0);
			endOfMonth.setHours(23, 59, 59, 999);
			const weekOfMonth = period;

			// console.log(startOfMonth, `this is the start of the month`);
			// console.log(endOfMonth, `this is the end of the month`);
		} else if (duration === "Year") {
			const currentDate = new Date();
			const year = period;

			startOfYear = new Date(year, 0, 1);
			startOfYear.setHours(0, 0, 0, 0);

			endOfYear = new Date(year, 11, 31);
			endOfYear.setHours(23, 59, 59, 999);

			// console.log(startOfYear, `this is the start of the year`);
			// console.log(endOfYear, `this is the end of the year`);
		} else {
			day = period;
			day.setHours(0, 0, 0, 0);
		}

		switch (profile.type) {
			case "business_admin":
				uid = authUID;
				break;
			case "business_sub":
				uid = profile.admin;
				break;
			case "academic_admin":
				uid = authUID;
				break;
			case "academic_sub":
				uid = profile.admin;
				break;
			case "household_admin":
				uid = authUID;
				break;
			case "household_sub":
				uid = profile.admin;
				break;
			default:
				uid = authUID;
				break;
		}

		let collectionRef = getFirestore()
			.collection("sales")
			.where("companyID", "==", uid);

		console.log(uid, `this is the user id`);
		let query;

		switch (duration) {
			case "Week":
				query = collectionRef
					.where("createdAt", ">=", startOfWeek)
					.where("createdAt", "<=", endOfWeek);
				break;

			case "Month":
				query = collectionRef
					.where("createdAt", ">=", startOfMonth)
					.where("createdAt", "<=", endOfMonth);
				break;

			case "Year":
				query = collectionRef
					.where("createdAt", ">=", startOfYear)
					.where("createdAt", "<=", endOfYear);
				break;

			default:
				query = collectionRef
					.where("createdAt", ">=", day)
					//this calculate the beginning of the day to when the day ends i.e added 864000000milliseconds which is 24 hours
					.where("createdAt", "<", new Date(day.getTime() + 86400000));

				break;
		}

		query.onSnapshot(
			(snapshot) => {
				const data = [];

				snapshot.forEach((doc) => {
					data.push({ ...doc.data(), salesId: doc.id });
				});
				console.log(data, `this is the data rerurned for the sales`);
				// Do something with the values array, e.g., update the UI
				// console.log(products);
				dispatch({ type: "GET_SALES", payload: data });
			},
			(error) => {
				console.error("Error getting real-time updates:", error);

				dispatch({ type: "GET_SALES_ERROR", error });
			}
		);
	};
};
export const getRent = (duration, period) => {
	let startOfWeek, endOfWeek;
	let day;

	let startOfMonth, endOfMonth;
	let startOfYear, endOfYear;
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		var uid;

		if (duration === "Week") {
			const currentDate = new Date();
			const firstDayOfMonth = new Date(
				currentDate.getFullYear(),
				currentDate.getMonth()
			);
			const weekOfMonth = period;

			// console.log(`week ${weekOfMonth} of month`);

			// console.log(firstDayOfMonth, `first day of month`);

			// Calculate the start and end timestamps for the week of the month
			startOfWeek = new Date();
			startOfWeek.setDate((weekOfMonth - 1) * 7 + 1);
			startOfWeek.setHours(0, 0, 0, 0);

			endOfWeek = new Date();
			endOfWeek.setDate(weekOfMonth * 7);
			endOfWeek.setHours(23, 59, 59, 999);

			// console.log(startOfWeek, `this is the start of the week`);
			// console.log(endOfWeek, `this is the end of the week`);
		} else if (duration === "Month") {
			const currentDate = new Date();
			let year = currentDate.getFullYear();

			// Calculate the start and end timestamps for the week of the month

			startOfMonth = new Date(period.monthYear, period.monthNumber - 1, 1); // Month is 0-indexed, so we subtract 1 from the specified month
			endOfMonth = new Date(period.monthYear, period.monthNumber, 0);
			startOfMonth.setHours(0, 0, 0, 0);
			endOfMonth.setHours(23, 59, 59, 999);
			const weekOfMonth = period;

			// console.log(startOfMonth, `this is the start of the month`);
			// console.log(endOfMonth, `this is the end of the month`);
		} else if (duration === "Year") {
			const currentDate = new Date();
			const year = period;

			startOfYear = new Date(year, 0, 1);
			startOfYear.setHours(0, 0, 0, 0);

			endOfYear = new Date(year, 11, 31);
			endOfYear.setHours(23, 59, 59, 999);

			// console.log(startOfYear, `this is the start of the year`);
			// console.log(endOfYear, `this is the end of the year`);
		} else {
			day = period;
			day.setHours(0, 0, 0, 0);
		}

		switch (profile.type) {
			case "business_admin":
				uid = authUID;
				break;
			case "business_sub":
				uid = profile.admin;
				break;
			case "academic_admin":
				uid = authUID;
				break;
			case "academic_sub":
				uid = profile.admin;
				break;
			case "household_admin":
				uid = authUID;
				break;
			case "household_sub":
				uid = profile.admin;
				break;
			default:
				uid = authUID;
				break;
		}

		let collectionRef = getFirestore()
			.collection("rent")
			.where("companyID", "==", uid);

		let query;

		switch (duration) {
			case "Week":
				query = collectionRef
					.where("createdAt", ">=", startOfWeek)
					.where("createdAt", "<=", endOfWeek);
				break;

			case "Month":
				query = collectionRef
					.where("createdAt", ">=", startOfMonth)
					.where("createdAt", "<=", endOfMonth);
				break;

			case "Year":
				query = collectionRef
					.where("createdAt", ">=", startOfYear)
					.where("createdAt", "<=", endOfYear);
				break;

			default:
				query = collectionRef
					.where("createdAt", ">=", day)
					//this calculate the beginning of the day to when the day ends i.e added 864000000milliseconds which is 24 hours
					.where("createdAt", "<", new Date(day.getTime() + 86400000));

				break;
		}

		query.onSnapshot(
			(snapshot) => {
				const data = [];

				snapshot.forEach((doc) => {
					data.push({ ...doc.data(), salesId: doc.id });
				});
				console.log(data, `this is the data rerurned for the rent`);
				// Do something with the values array, e.g., update the UI
				// console.log(products);
				dispatch({ type: "GET_RENT", payload: data });
			},
			(error) => {
				console.error("Error getting real-time rent updates:", error);

				dispatch({ type: "GET_RENT_ERROR", error });
			}
		);
	};
};

// export const getRent = (rent) => {
// 	return (dispatch, getState, { getFirestore }) => {
// 		//make async call to database
// 		const profile = getState().firebase.profile;
// 		const authUID = getState().firebase.auth.uid;

// 		var uid;
// 		switch (profile.type) {
// 			case "business_admin":
// 				uid = authUID;
// 				break;
// 			case "business_sub":
// 				uid = profile.admin;
// 				break;
// 			case "academic_admin":
// 				uid = authUID;
// 				break;
// 			case "academic_sub":
// 				uid = profile.admin;
// 				break;
// 			case "household_admin":
// 				uid = authUID;
// 				break;
// 			case "household_sub":
// 				uid = profile.admin;
// 				break;
// 			default:
// 				uid = authUID;
// 				break;
// 		}

// 		getFirestore()
// 			.collection("rent")
// 			.where("companyID", "==", uid)
// 			.get()
// 			.then((snapshot) => {
// 				const data = [];
// 				snapshot.forEach((doc) => {
// 					data.push(doc.data());
// 				});
// 				dispatch({ type: "GET_RENT", payload: data });
// 			})
// 			.catch((err) => {
// 				dispatch({ type: "GET_RENT_ERROR", err });
// 			});
// 	};
// };

export const addToSupplyItems = (data) => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		var uid;
		switch (profile.type) {
			case "business_admin":
				uid = authUID;
				break;
			case "business_sub":
				uid = profile.admin;
				break;
			case "academic_admin":
				uid = authUID;
				break;
			case "academic_sub":
				uid = profile.admin;
				break;
			case "household_admin":
				uid = authUID;
				break;
			case "household_sub":
				uid = profile.admin;
				break;
			default:
				uid = authUID;
				break;
		}

		getFirestore()
			.collection("supply_users")
			.doc(data.upload.companyID)
			.collection("messages")
			.add(data.upload)
			.then((docRef) => {
				// make the docId easily accessible so that we can delete it later if we want.
				getFirestore()
					.collection("supply_users")
					.doc(data.upload.companyID)
					.collection("messages")
					.doc(docRef.id)
					.set({ id: docRef.id, uid: uid }, { merge: true });
				dispatch({ type: "ADD_SUPPLY_PURCHASE_ITEM", data });
			})
			.catch((err) => {
				dispatch({ type: "ADD_SUPPLY_PURCHASE_ITEM_ERROR", err });
			});
	};
};

export const getPurchaseInfoSupply = (info) => {
	return (dispatch, getState, { getFirebase }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		var uid;
		switch (profile.type) {
			case "business_admin":
				uid = authUID;
				break;
			case "business_sub":
				uid = profile.admin;
				break;
			case "academic_admin":
				uid = authUID;
				break;
			case "academic_sub":
				uid = profile.admin;
				break;
			case "household_admin":
				uid = authUID;
				break;
			case "household_sub":
				uid = profile.admin;
				break;
			default:
				uid = authUID;
				break;
		}

		getFirebase()
			.firestore()
			.collection("supply_users")
			.doc(uid)
			.collection("messages")
			.get()
			.then((snapshot) => {
				const orderInfo = [];
				snapshot.forEach((doc) => {
					orderInfo.push(doc.data());
				});
				dispatch({ type: "GET_ORDER_INFO_SUPPLY", payload: orderInfo });
			})
			.catch((err) => {
				dispatch({ type: "GET_ORDER_INFO_SUPPLY_ERROR", err });
			});
	};
};

export const getExpenseForDuration = (duration, period) => {
	let startOfWeek, endOfWeek;
	let day;

	let startOfMonth, endOfMonth;
	let startOfYear, endOfYear;

	return (dispatch, getState, { getFirestore, getFirebase }) => {
		// console.log(duration, `this is the duration for the sales`);
		// console.log(period, `this is the period for the sales`);

		if (duration === "Week") {
			const currentDate = new Date();
			const firstDayOfMonth = new Date(
				currentDate.getFullYear(),
				currentDate.getMonth(),
				1
			);
			const weekOfMonth = period;

			// console.log(`week ${weekOfMonth} of month`);

			// console.log(firstDayOfMonth, `first day of month`);

			// Calculate the start and end timestamps for the week of the month
			startOfWeek = new Date();
			startOfWeek.setDate((weekOfMonth - 1) * 7 + 1);
			startOfWeek.setHours(0, 0, 0, 0);

			endOfWeek = new Date();
			endOfWeek.setDate(weekOfMonth * 7);
			endOfWeek.setHours(23, 59, 59, 999);

			// console.log(startOfWeek, `this is the start of the week`);
			// console.log(endOfWeek, `this is the end of the week`);
		} else if (duration === "Month") {
			const currentDate = new Date();
			let year = currentDate.getFullYear();

			// Calculate the start and end timestamps for the week of the month

			startOfMonth = new Date(period.monthYear, period.monthNumber - 1, 1); // Month is 0-indexed, so we subtract 1 from the specified month
			endOfMonth = new Date(period.monthYear, period.monthNumber, 0);
			startOfMonth.setHours(0, 0, 0, 0);
			endOfMonth.setHours(23, 59, 59, 999);
			const weekOfMonth = period;

			console.log(startOfMonth, `this is the start of the month`);
			console.log(endOfMonth, `this is the end of the month`);
		} else if (duration === "Year") {
			const currentDate = new Date();
			const year = period;

			startOfYear = new Date(year, 0, 1);
			startOfYear.setHours(0, 0, 0, 0);

			endOfYear = new Date(year, 11, 31);
			endOfYear.setHours(23, 59, 59, 999);

			// console.log(startOfYear, `this is the start of the year`);
			// console.log(endOfYear, `this is the end of the year`);
		} else {
			day = period;
			day.setHours(0, 0, 0, 0);
		}

		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;
		let collectionRef = getFirestore()
			.collection("supply_users")
			.doc(authUID)
			.collection("expense");

		let query;

		switch (duration) {
			case "Week":
				query = collectionRef
					.where("date", ">=", startOfWeek)
					.where("date", "<=", endOfWeek);
				break;

			case "Month":
				query = collectionRef
					.where("date", ">=", startOfMonth)
					.where("date", "<=", endOfMonth);
				break;

			case "Year":
				query = collectionRef
					.where("date", ">=", startOfYear)
					.where("date", "<=", endOfYear);
				break;

			default:
				query = collectionRef
					.where("date", ">=", day)
					//this calculate the beginning of the day to when the day ends i.e added 864000000milliseconds which is 24 hours
					.where("date", "<", new Date(day.getTime() + 86400000));

				break;
		}

		query.onSnapshot(
			(snapshot) => {
				const products = [];
				dispatch({
					type: "FETCH_EXPENSE_LOADER",
					payload: true,
				});
				snapshot.forEach((doc) => {
					const data = doc.data();

					products.push({ ...doc.data(), salesId: doc.id });
				});
				// Do something with the values array, e.g., update the UI
				// console.log(products);
				dispatch({
					type: "FETCH_EXPENSE_SUCCESS",
					payload: products,
				});

				console.log(products, `these are the expense results`);
			},
			(error) => {
				console.error("Error getting real-time updates:", error);
				dispatch({
					type: "FETCH_EXPENSE_ERROR",
					payload: error,
				});
			}
		);
	};
};
