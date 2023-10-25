export const getRestaurantData = (data) => {
	return (dispatch, getState, { getFirebase }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		let uid;
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
			.collection("menus")
			.where("city", "==", data.city)
			.get()
			.then((snapshot) => {
				const restaurant = [];
				snapshot.forEach((doc) => {
					restaurant.push(doc.data());
				});
				dispatch({ type: "GET_RESTAURANT", payload: restaurant });
			})
			.catch((err) => {
				dispatch({ type: "GET_RESTAURANT_ERROR", err });
			});
	};
};

const setUsersCollection = (buildingFunction) => {
	let userCollection;
	switch (buildingFunction) {
		case buildingFunction === "Farm":
			userCollection = "farm_user";
			break;
		case buildingFunction === "Households":
			userCollection = "household_users";
			break;
		case buildingFunction === "Restaurants":
			userCollection = "restaurant_users";
			break;
		case buildingFunction === "Consultant":
			userCollection = "consultants";
			break;
		case buildingFunction === "Offices":
			userCollection = "office_users";
			break;
		case buildingFunction === "Hotels":
			userCollection = "hotel_users";
			break;
		case buildingFunction === "Shop":
			userCollection = "shop_users";
			break;

		default:
			// userCollection = "Machinery/Supplier";
			userCollection = "supply_users";
			break;
	}

	return userCollection;
};

export const getRestaurantExpenseForDuration = (duration, period) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;
		let uid;
		let startOfMonth, endOfMonth;
		let startOfYear, endOfYear;
		let startOfWeek, endOfWeek;
		let day;

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
			// console.log(year, period.monthYear);

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

		// console.log(startOfMonth, `this is the start of month`);
		// console.log(endOfMonth, `this is the end of month`);

		let inventoryCollectionRef = getFirestore()
			.collection("restaurant_users")
			.doc(uid)
			.collection("inventory");
		let expenseCollectionRef = getFirestore()
			.collection("restaurant_users")
			.doc(uid)
			.collection("expense");

		let query;
		let query2;

		switch (duration) {
			case "Week":
				query = inventoryCollectionRef
					.where("created_at", ">=", startOfWeek)
					.where("created_at", "<=", endOfWeek);

				query2 = expenseCollectionRef
					.where("date", ">=", startOfWeek)
					.where("date", "<=", endOfWeek);
				break;

			case "Month":
				query = inventoryCollectionRef
					.where("created_at", ">=", startOfMonth)
					.where("created_at", "<=", endOfMonth);
				query2 = expenseCollectionRef
					.where("date", ">=", startOfMonth)
					.where("date", "<=", endOfMonth);
				break;

			case "Year":
				query = inventoryCollectionRef
					.where("created_at", ">=", startOfYear)
					.where("created_at", "<=", endOfYear);
				query2 = expenseCollectionRef
					.where("date", ">=", startOfYear)
					.where("date", "<=", endOfYear);
				break;

			default:
				query = inventoryCollectionRef
					.where("created_at", ">=", day)
					//this calculate the beginning of the day to when the day ends i.e added 864000000milliseconds which is 24 hours
					.where("created_at", "<", new Date(day.getTime() + 86400000));
				query2 = expenseCollectionRef
					.where("date", ">=", day)
					//this calculate the beginning of the day to when the day ends i.e added 864000000milliseconds which is 24 hours
					.where("date", "<", new Date(day.getTime() + 86400000));

				break;
		}

		const inventoryExpensePromise = new Promise((resolve, reject) => {
			query.onSnapshot(
				(doc) => {
					// dispatch({
					//   type: "SET_FETCHING",
					//   payload: true,
					// });
					let data = [];
					doc.forEach((doc) => {
						data.push({
							...doc.data(),
							inventoryId: doc.id,
							sortKey: doc.data().created_at,
						});
						// console.log(doc.id, " => ", doc.data());
					});
					console.log(
						"inventory expense data from the food in the inventory: ",
						data
					);
					resolve(data);
				},
				(err) => {
					console.log(err);
					reject(err);
				}
			);
		});
		const extExpensePromise = new Promise((resolve, reject) => {
			query2.onSnapshot(
				(doc) => {
					// dispatch({
					//   type: "SET_FETCHING",
					//   payload: true,
					// });
					let data = [];
					doc.forEach((doc) => {
						data.push({
							...doc.data(),
							expenseId: doc.id,
							sortKey: doc.data().date,
						});
						// console.log(doc.id, " => ", doc.data());
					});
					console.log(
						"this is the expense from the expense collection itself  data: ",
						data
					);
					resolve(data);
				},
				(err) => {
					console.log(err);
					reject(err);
				}
			);
		});

		Promise.all([inventoryExpensePromise, extExpensePromise])
			.then(([inventory, expense]) => {
				console.log(`this ran again`);
				console.log(inventory, `this is the inventory`);
				console.log(expense, `this is the expense`);

				let newExpense = [...inventory, ...expense];
				console.log(
					newExpense.sort((a, b) => {
						return a.sortKey.toDate() - b.sortKey.toDate();
					}),
					`this is the sorted list`
				);

				newExpense = newExpense.sort((a, b) => {
					return a.sortKey.toDate() - b.sortKey.toDate();
				});

				dispatch({
					type: "FETCH_RESTURANT_EXPENSE_SUCCESS",
					payload: newExpense,
				});

				// dispatch({
				// 	type: "FETCH_RESTURANT_SALES_FOR_TURNOVER_SUCCESS",
				// 	payload: expense,
				// });
			})
			.catch((err) => {
				console.error("Error:", err);
				dispatch({
					type: "FETCH_RESTURANT_EXPENSE_ERROR",
					payload: err,
				});
			});

		// query.onSnapshot(
		// 	(doc) => {
		// 		// dispatch({
		// 		//   type: "SET_FETCHING",
		// 		//   payload: true,
		// 		// });
		// 		let data = [];
		// 		doc.forEach((doc) => {
		// 			data.push({ ...doc.data(), saleId: doc.id });
		// 			// console.log(doc.id, " => ", doc.data());
		// 		});
		// 		// console.log("Current data: ", data);
		// 		dispatch({ type: "GET_SALES", payload: data });
		// 	},
		// 	(err) => {
		// 		console.log(err);
		// 		dispatch({ type: "GET_SALES_ERROR", err });
		// 	}
		// );
		// query2.onSnapshot(
		// 	(doc) => {
		// 		// dispatch({
		// 		//   type: "SET_FETCHING",
		// 		//   payload: true,
		// 		// });
		// 		let data = [];
		// 		doc.forEach((doc) => {
		// 			data.push({ ...doc.data(), saleId: doc.id });
		// 			// console.log(doc.id, " => ", doc.data());
		// 		});
		// 		console.log("Current data: ", data);
		// 		dispatch({ type: "GET_SALES", payload: data });
		// 	},
		// 	(err) => {
		// 		console.log(err);
		// 		dispatch({ type: "GET_SALES_ERROR", err });
		// 	}
		// );
	};
};

export const createMenu = (menu) => {
	return (dispatch, getState, { getFirebase }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		let uid;
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
			.collection("menus")
			.add(menu.upload)
			.then((docRef) => {
				// make the docId easily acsessible so that we can delete it later if we want.
				getFirebase()
					.firestore()
					.collection("menus")
					.doc(docRef.id)
					.set({ id: docRef.id, restaurantID: uid }, { merge: true });
				// dispatch({ type: "CREATE_MENUS", menu });
			});
	};
};
export const addRestaurantSale = (data) => {
	return (dispatch, getState, { getFirebase }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		let uid;
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

		const menuCollection = getFirebase().firestore().collection("menus");

		return menuCollection
			.where("meal", "==", data.meal)
			.where("restaurantID", "==", uid)
			.get()
			.then((querySnapshot) => {
				if (!querySnapshot.empty) {
					// The query returned results

					let documentId;
					let valueToReturn;
					querySnapshot.forEach((doc) => {
						// const productData = doc.data();
						// Handle the product data here
						console.log("meal data is not empty");
						documentId = doc.id;

						getFirebase()
							.firestore()
							.collection("sales")
							.add(data)
							.then((docRef) => {
								// make the docId easily acsessible so that we can delete it later if we want.
								getFirebase()
									.firestore()
									.collection("sales")
									.doc(docRef.id)
									.set(
										{ saleId: docRef.id, restaurantID: uid },
										{ merge: true }
									);
							});
						valueToReturn = "success";
					});
					console.log(documentId);
					return valueToReturn;
				} else {
					// The query did not return any results
					console.log("No matching products found.");
					return null;
				}
			});
	};
};

export const getRestaurantSales = (duration, period) => {
	return (dispatch, getState, { getFirestore }) => {
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;
		let uid;
		let startOfMonth, endOfMonth;
		let startOfYear, endOfYear;
		let startOfWeek, endOfWeek;
		let day;

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
			console.log(year, period.monthYear);

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

		// console.log(startOfMonth, `this is the start of month`);
		// console.log(endOfMonth, `this is the end of month`);

		let collectionRef = getFirestore()
			.collection("sales")
			.where("restaurantID", "==", uid);

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
			(doc) => {
				// dispatch({
				//   type: "SET_FETCHING",
				//   payload: true,
				// });
				let data = [];
				doc.forEach((doc) => {
					data.push({ ...doc.data(), saleId: doc.id });
					// console.log(doc.id, " => ", doc.data());
				});
				console.log("Current data: ", data);
				dispatch({ type: "GET_SALES", payload: data });
			},
			(err) => {
				console.log(err);
				dispatch({ type: "GET_SALES_ERROR", err });
			}
		);
	};
};

export const getRestuarantSalesForChart = (duration, period) => {
	return (dispatch, getState, { getFirestore }) => {
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;
		let uid;
		let startOfMonth, endOfMonth;
		let startOfYear, endOfYear;
		let startOfWeek, endOfWeek;
		let day;

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
			console.log(year, period.monthYear);

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

		// console.log(startOfMonth, `this is the start of month`);
		// console.log(endOfMonth, `this is the end of month`);

		let collectionRef = getFirestore()
			.collection("sales")
			.where("restaurantID", "==", uid);

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
			(doc) => {
				// dispatch({
				//   type: "SET_FETCHING",
				//   payload: true,
				// });
				let data = [];
				doc.forEach((doc) => {
					data.push({ ...doc.data(), saleId: doc.id });
					// console.log(doc.id, " => ", doc.data());
				});
				// console.log("Current data: ", data);
				dispatch({ type: "GET_SALES_FOR_CHART", payload: data });
			},
			(err) => {
				console.log(err);
				dispatch({ type: "GET_SALES__FOR_CHART_ERROR", err });
			}
		);
	};
};

export const getRestuarantInfoForTurnover = (duration, period) => {
	return (dispatch, getState, { getFirestore }) => {
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;
		let uid;
		let startOfMonth, endOfMonth;
		let startOfYear, endOfYear;

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

		if (duration === "Month") {
			const currentDate = new Date();
			let year = currentDate.getFullYear();
			console.log(year, period.monthYear);

			// Calculate the start and end timestamps for the week of the month

			startOfMonth = new Date(period.monthYear, period.monthNumber - 1, 1); // Month is 0-indexed, so we subtract 1 from the specified month
			endOfMonth = new Date(period.monthYear, period.monthNumber, 0);
			startOfMonth.setHours(0, 0, 0, 0);
			endOfMonth.setHours(23, 59, 59, 999);
			const weekOfMonth = period;

			// console.log(startOfMonth, `this is the start of the month`);
			// console.log(endOfMonth, `this is the end of the month`);
		} else {
			const currentDate = new Date();
			const year = period;

			startOfYear = new Date(year, 0, 1);
			startOfYear.setHours(0, 0, 0, 0);

			endOfYear = new Date(year, 11, 31);
			endOfYear.setHours(23, 59, 59, 999);

			// console.log(startOfYear, `this is the start of the year`);
			// console.log(endOfYear, `this is the end of the year`);
		}

		let query, salesQuery;

		let collectionRef = getFirestore()
			.collection("sales")
			.where("restaurantID", "==", uid);

		let productsCollectionRef = getFirestore()
			.collection("menus")
			.where("restaurantID", "==", uid);

		switch (duration) {
			case "Month":
				salesQuery = collectionRef
					.where("date", ">=", startOfMonth)
					.where("date", "<=", endOfMonth);
				// salesQuery = collectionRef2
				// 	.where("date", ">=", startOfMonth)
				// 	.where("date", "<=", endOfMonth);
				break;

			default:
				salesQuery = collectionRef
					.where("date", ">=", startOfYear)
					.where("date", "<=", endOfYear);
				// salesQuery = collectionRef2
				// 	.where("date", ">=", startOfYear)
				// 	.where("date", "<=", endOfYear);
				break;
		}

		let produceResult = new Promise((resolve, reject) => {
			productsCollectionRef.onSnapshot(
				(snapshot) => {
					const products = [];

					snapshot.forEach((doc) => {
						products.push({ ...doc.data(), salesId: doc.id });
					});

					resolve(products);
				},
				(error) => {
					console.error("Error getting real-time updates:", error);

					reject(error);
				}
			);
		});
		let salesResult = new Promise((resolve, reject) => {
			salesQuery.onSnapshot(
				(snapshot) => {
					const sales = [];

					snapshot.forEach((doc) => {
						sales.push({ ...doc.data(), salesId: doc.id });
					});

					resolve(sales);
				},
				(error) => {
					console.error("Error getting real-time updates:", error);

					reject(error);
				}
			);
		});

		Promise.all([produceResult, salesResult])
			.then(([products, sales]) => {
				// console.log(`this ran again`);
				// console.log(products, `these are the menus`);
				// console.log(sales, `these are the sales for the period`);
				dispatch({
					type: "FETCH_RESTURANT_PRODUCE_FOR_TURNOVER_SUCCESS",
					payload: products,
				});

				dispatch({
					type: "FETCH_RESTURANT_SALES_FOR_TURNOVER_SUCCESS",
					payload: sales,
				});
			})
			.catch((err) => {
				console.error("Error:", err);
				dispatch({
					type: "FETCH_RESTAURANT_TURNOVER_ERROR",
					payload: err,
				});
			});
	};
};

export const getMenus = () => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		let uid;
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
			.collection("menus")
			.where("restaurantID", "==", uid)
			.onSnapshot(
				(doc) => {
					// dispatch({
					//   type: "SET_FETCHING",
					//   payload: true,
					// });
					let data = [];
					doc.forEach((doc) => {
						data.push({ ...doc.data(), menuId: doc.id });
						// console.log(doc.id, " => ", doc.data());
					});
					// console.log("Current data: ", consultants);
					dispatch({ type: "GET_MENUS", payload: data });
				},
				(err) => {
					console.log(err);
					dispatch({ type: "GET_MENUS_ERROR", err });
				}
			);
		// .then((snapshot) => {
		//   const data = [];
		//   snapshot.forEach((doc) => {
		//     data.push(doc.data());
		//   });
		//   dispatch({ type: "GET_MENUS", payload: data });
		// })
		// .catch((err) => {
		//   dispatch({ type: "GET_MENUS_ERROR", err });
		// });
	};
};

export const sendToRes = (data) => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		let uid;
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

		const firestore = getFirestore();
		const batch = firestore.batch();

		// TODO NOTIFICATION
		// i think this is the notification to send to the restaurant that the purchase is in progress
		let restaurantCollection = getFirestore()
			.collection("restaurant_users")
			.doc(data.restaurantID);

		let restaurantNotificationCollection =
			restaurantCollection.collection("notifications");

		let notification = {
			notification_type: "eatingOut_request",
			created_at: new Date(),
		};

		let restaurantMessagesCollection =
			restaurantCollection.collection("messages");

		batch.set(restaurantMessagesCollection, data.upload);

		batch.set(restaurantNotificationCollection, notification);

		return batch.commit();

		// .add(data.upload)
		// .then((docRef) => {
		// 	// make the docId easily accessible so that we can delete it later if we want.
		// 	getFirestore()
		// 		.collection("restaurant_users")
		// 		.doc(data.restaurantID)
		// 		.collection("messages")
		// 		.doc(docRef.id)
		// 		.set({ id: docRef.id, uid: uid }, { merge: true });
		// 	dispatch({ type: "SEND_TO_RESTAURANT" });
		// })
		// .catch((err) => {
		// 	dispatch({ type: "SEND_TO_RESTAURANT_ERROR", err });
		// });
	};
};

export const sendOrderToUser = (data) => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		let uid;
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
			.collection("marketplace")
			.doc(data.item.uid)
			.collection("restaurantOrders")
			.add(data.item)
			.then((docRef) => {
				// make the docId easily accessible so that we can delete it later if we want.
				getFirestore()
					.collection("marketplace")
					.doc(data.item.uid)
					.collection("restaurantOrders")
					.doc(docRef.id)
					.set({ id: docRef.id, status: data.status }, { merge: true });
				dispatch({ type: "SEND_ORDER_TO_USER" });
			})
			.catch((err) => {
				dispatch({ type: "SEND_ORDER_TO_USER_ERROR", err });
			});
	};
};

export const getPurchaseInfoRes = (info) => {
	return (dispatch, getState, { getFirebase }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		let uid;
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
			.collection("restaurant_users")
			.doc(uid)
			.collection("messages")
			.get()
			.then((snapshot) => {
				const orderInfo = [];
				snapshot.forEach((doc) => {
					orderInfo.push(doc.data());
				});
				dispatch({ type: "GET_ORDER_INFO_RES", payload: orderInfo });
			})
			.catch((err) => {
				dispatch({ type: "GET_ORDER_INFO_RES_ERROR", err });
			});
	};
};

export const editMenuStatusOnRes = (data) => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		let uid;
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
			.collection("restaurant_users")
			.doc(uid)
			.collection("messages")
			.doc(data.id)
			.set({ status: data.status }, { merge: true })
			.then(() => dispatch({ type: "EDIT_MENU_STATUS", payload: data }))
			.catch((err) => {
				dispatch({ type: "EDIT_MENU_STATUS_ERROR", err });
			});
	};
};

export const createMealPlannerDataRes = (mealPlanner) => {
	return (dispatch, getState, { getFirebase }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		let uid;
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
			.collection("restaurant_users")
			.doc(uid)
			.collection("mealPlannerData")
			.add(mealPlanner.upload)
			.then((docRef) => {
				// make the docId easily accessible so that we can delete it later if we want.
				getFirebase()
					.firestore()
					.collection("restaurant_users")
					.doc(uid)
					.collection("mealPlannerData")
					.doc(docRef.id)
					.set({ id: docRef.id }, { merge: true });
				dispatch({ type: "CREATE_MEAL_PLANNER_RES", mealPlanner });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_MEAL_PLANNER_RES_ERROR", err });
			});
	};
};

export const getMealPlannerDataRes = () => {
	return (dispatch, getState, { getFirebase }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		let uid;
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
			.collection("restaurant_users")
			.doc(uid)
			.collection("mealPlannerData")
			.get()
			.then((snapshot) => {
				const data = [];
				snapshot.forEach((doc) => {
					data.push(doc.data());
				});
				dispatch({ type: "GET_MEAL_PLANS_RES", payload: data });
			})
			.catch((err) => {
				dispatch({ type: "GET_MEAL_PLANS_RES_ERROR", err });
			});
	};
};

export const addToShoppingListRes = (data) => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		let uid;
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

		const item = data.upload.item;

		getFirestore()
			.collection("restaurant_users")
			.doc(uid)
			.collection("shoppingList")
			.add(data.upload)
			.then((docRef) => {
				// make the docId easily accessible so that we can delete it later if we want.
				getFirestore()
					.collection("restaurant_users")
					.doc(uid)
					.collection("shoppingList")
					.doc(docRef.id)
					.set({ id: docRef.id }, { merge: true });
				dispatch({ type: "CREATE_SHOP_RES" });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_SHOP_RES_ERROR", err });
			});
	};
};

export const addToShoppingListUpdateRes = (data) => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		let uid;
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

		const ingr = data.upload.result;

		//console.log("checking what error ===> ", ingr)

		const firestore = getFirestore();
		const batch = firestore.batch();

		//send each separate ingredient to its own document
		ingr.forEach((element) => {
			let docRef = firestore
				.collection("restaurant_users")
				.doc(uid)
				.collection("newShoppingList")
				// .doc(data.week)
				// .collection(data.week)
				.doc();
			batch.set(docRef, { id: docRef.id, item: element });
		});
		batch
			.commit()
			.then(() => {
				dispatch({ type: "CREATE_NEW_SHOP_RES", ingr });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_NEW_SHOP__RES_ERROR", err });
			});
	};
};

export const getPlanData = () => {
	return (dispatch, getState, { getFirebase }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		let uid;
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
			.collection("restaurant_users")
			.doc(uid)
			.collection("mealPlannerData")
			.get()
			.then((snapshot) => {
				const data = [];
				snapshot.forEach((doc) => {
					data.push(doc.data());
				});
				dispatch({ type: "GET_NEW_PLANS_RES", payload: data });
			})
			.catch((err) => {
				dispatch({ type: "GET_NEW_PLANS_RES_ERROR", err });
			});
	};
};

export const getShoppingListUpdateRes = (data) => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		let uid;
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
			.collection("restaurant_users")
			.doc(uid)
			.collection("newShoppingList")
			.where("item.week", "==", data.week)
			.get()
			.then((snapshot) => {
				const data = [];
				snapshot.forEach((doc) => {
					data.push(doc.data());
				});
				dispatch({ type: "GET_NEW_SHOPPING_LIST_RES", payload: data });
			})
			.catch((err) => {
				dispatch({ type: "GET_NEW_SHOPPING_LIST_RES_ERROR", err });
			});
	};
};

export const getShoppingListRes = (data) => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		let uid;
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
			.collection("restaurant_users")
			.doc(uid)
			.collection("shoppingList")
			.where("item.week", "==", data.week)
			.get()
			.then((snapshot) => {
				const data = [];
				snapshot.forEach((doc) => {
					data.push(doc.data());
				});
				dispatch({ type: "GET_SHOPPING_LIST_RES", payload: data });
			})
			.catch((err) => {
				dispatch({ type: "GET_SHOPPING_LIST_RES_ERROR", err });
			});
	};
};

export const addToInventoryRes = (data) => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		let uid;
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

		return getFirestore()
			.collection("restaurant_users")
			.doc(uid)
			.collection("inventory")
			.add(data.upload);
		// .then((docRef) => {
		// 	// make the docId easily accessible so that we can delete it later if we want.
		// 	getFirestore()
		// 		.collection("restaurant_users")
		// 		.doc(uid)
		// 		.collection("inventory")
		// 		.doc(docRef.id)
		// 		.set({ id: docRef.id }, { merge: true });
		// 	dispatch({ type: "CREATE_INVENTORY_ITEM_RES" });
		// })
		// .catch((err) => {
		// 	dispatch({ type: "CREATE_INVENTORY_ITEM_RES_ERROR", err });
		// });
	};
};

export const generatedRemoveFromShop = (data) => {
	return (dispatch, getState, { getFirebase }) => {
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		let uid;
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
			.collection("restaurant_users")
			.doc(uid)
			.collection("newShoppingList")
			.doc(data.id)
			.delete()
			.then(() => dispatch({ type: "DELETE_NEW_SHOP_RES" }))
			.catch((err) => {
				dispatch({ type: "DELETE_NEW_SHOP_RES_ERROR", err });
			});
	};
};

export const removeFromShop = (data) => {
	return (dispatch, getState, { getFirebase }) => {
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		let uid;
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
			.collection("marketplace")
			.doc(uid)
			.collection("shoppingList")
			.doc(data.week)
			.collection(data.week)
			.doc(data.id)
			.delete()
			.then(() => dispatch({ type: "DELETE_SHOP" }))
			.catch((err) => {
				dispatch({ type: "DELETE_SHOP_ERROR", err });
			});
	};
};

export const getInventoryRes = () => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		let uid;
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
			.collection("restaurant_users")
			.doc(uid)
			.collection("inventory")
			.onSnapshot(
				(doc) => {
					let data = [];
					doc.forEach((doc) => {
						data.push({ ...doc.data(), eventId: doc.id });
						// console.log(doc.id, " => ", doc.data());
					});
					// console.log("Current data: ", consultants);
					dispatch({ type: "GET_INVENTORY_RES", payload: data });
				},
				(err) => {
					console.log(err);
					dispatch({ type: "GET_INVENTORY_RES_ERROR", err });
				}
			);
		// .then((snapshot) => {
		// 	const data = [];
		// 	snapshot.forEach((doc) => {
		// 		data.push(doc.data());
		// 	});
		// 	dispatch({ type: "GET_INVENTORY_RES", payload: data });
		// })
		// .catch((err) => {
		// 	dispatch({ type: "GET_INVENTORY_RES_ERROR", err });
		// });
	};
};

export const addToPurchaseItemsRes = (data) => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		let uid;
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
			.collection("purchasesRes")
			.add(data.upload)
			.then((docRef) => {
				// make the docId easily accessible so that we can delete it later if we want.
				getFirestore()
					.collection("purchasesRes")
					.doc(docRef.id)
					.set({ id: docRef.id, uid: uid }, { merge: true });
				dispatch({ type: "ADD_PURCHASE_ITEM_RES", data });
			})
			.catch((err) => {
				dispatch({ type: "ADD_PURCHASE_ITEM_RES_ERROR", err });
			});
	};
};
