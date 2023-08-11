import { format } from "date-fns";

export const getFarmerData = () => {
	return (dispatch, getState, { getFirebase }) => {
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		var uid;
		switch (profile.type) {
			default:
			case "farm_admin":
				uid = authUID;
				break;
			case "farm_sub":
				uid = profile.admin;
		}
		var db = getFirebase().firestore();
		var docRef = db.collection("marketplace").doc(uid);

		docRef
			.get()
			.then((doc) => {
				const data = [];
				data.push(doc.data());
				dispatch({ type: "GET_DATA", payload: data });
			})
			.catch((err) => {
				dispatch({ type: "GET_DATA_ERROR", err });
			});
	};
};

export const getFarmTurnOverFunction = (duration, period) => {
	// if (duration === 'Month'){
	// 	{month,year} = period
	// }else{
	// 	{startMonth,endMonth,startYear,endYear}= period
	// }
	let startMonth, endMonth;
	let cycleStart, cycleEnd;

	return (dispatch, getState, { getFirestore, getFirebase }) => {
		const authUID = getState().firebase.auth.uid;

		if (duration === "Month") {
			let month = period.month;
			let year = period.year;

			// Calculate the start and end timestamps for the week of the month

			startMonth = new Date(year, month - 1, 1); // Month is 0-indexed, so we subtract 1 from the specified month

			endMonth = new Date(year, month, 0);
			startMonth.setHours(0, 0, 0, 0);
			endMonth.setHours(23, 59, 59, 999);
			console.log(startMonth, `this  is the start month`);
			console.log(endMonth, `this  is the end month`);
			console.log(year, `this  is the start year`);
		} else {
			cycleStart = new Date(period.startYear, period.startMonth - 1, 1);
			cycleStart.setHours(0, 0, 0, 0);
			cycleEnd = new Date(period.endYear, period.endMonth - 1, 1);
			cycleEnd.setHours(23, 59, 59, 999);
		}

		let collectionRef = getFirestore()
			.collection("marketplace")
			.doc(authUID)
			.collection("produce");

		let query;

		switch (duration) {
			case "Month":
				query = collectionRef
					.where("date", ">=", startMonth)
					.where("date", "<=", endMonth);
				break;

			default:
				query = collectionRef
					.where("date", ">=", cycleStart)
					//this calculate the beginning of the day to when the day ends i.e added 864000000milliseconds which is 24 hours
					.where("date", "<=", cycleEnd);

				break;
		}

		query.onSnapshot(
			(snapshot) => {
				const products = [];
				dispatch({
					type: "FETCH_PRODUCE_FOR_PROFIT_LOADER",
					payload: true,
				});
				snapshot.forEach((doc) => {
					const data = doc.data();

					products.push({ ...doc.data(), salesId: doc.id });
				});
				console.log(products, `these are the products returned`);
				// Do something with the values array, e.g., update the UI
				// console.log(products);
				dispatch({
					type: "FETCH_PRODUCE_FOR_PROFIT_SUCCESS",
					payload: products,
				});
			},
			(error) => {
				console.error("Error getting real-time updates:", error);
				dispatch({
					type: "FETCH_PRODUCE_FOR_PROFIT_ERROR",
					payload: error,
				});
			}
		);
	};
};

export const getFarmProductsForDuration = (duration, period) => {
	let startOfWeek, endOfWeek;
	let day;

	let startOfMonth, endOfMonth;
	let startOfYear, endOfYear;

	return (dispatch, getState, { getFirestore, getFirebase }) => {
		// console.log(duration, `this is the duration`);
		// console.log(period, `this is the period`);

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

			startOfMonth = new Date(year, period - 1, 1); // Month is 0-indexed, so we subtract 1 from the specified month
			endOfMonth = new Date(year, period, 0);
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

		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;
		let collectionRef = getFirestore()
			.collection("marketplace")
			.doc(authUID)
			.collection("produce");

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
					type: "FETCH_PRODUCE_FOR_CHART_LOADER",
					payload: true,
				});
				snapshot.forEach((doc) => {
					const data = doc.data();

					products.push({ ...doc.data(), salesId: doc.id });
				});
				// Do something with the values array, e.g., update the UI
				// console.log(products);
				dispatch({
					type: "FETCH_PRODUCE_FOR_CHART_SUCCESS",
					payload: products,
				});
			},
			(error) => {
				console.error("Error getting real-time updates:", error);
				dispatch({
					type: "FETCH_PRODUCE_FOR_CHART_ERROR",
					payload: error,
				});
			}
		);
	};
};
const getFarmPlanData = () => {
	return (dispatch, getState, { getFirebase }) => {
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		var uid;
		switch (profile.type) {
			default:
			case "farm_admin":
				uid = authUID;
				break;
			case "farm_sub":
				uid = profile.admin;
		}
		var db = getFirebase().firestore();
		var docRef = db
			.collection("marketplace")
			.doc(uid)
			.collection("farmPlanData");

		docRef
			.get()
			.then((doc) => {
				const data = [];
				data.push(doc.data());
				dispatch({ type: "GET_FARM_PLAN", payload: data });
			})
			.catch((err) => {
				dispatch({ type: "GET_FARM_PLAN_ERROR", err });
			});
	};
};

export const addProduceData = (data) => {
	return (dispatch, getState, { getFirestore, getFirebase }) => {
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		var uid;
		switch (profile.type) {
			default:
			case "farm_admin":
				uid = authUID;
				break;
			case "farm_sub":
				uid = profile.admin;
		}

		data.date = getFirebase().firestore.Timestamp.fromDate(data.date);

		dispatch({ type: "CREATE_PRODUCE_ITEM_LOADER", payload: true });

		getFirestore()
			.collection("marketplace")
			.doc(uid)
			.collection("produce")
			.add(data)
			.then((docRef) => {
				// make the docId easily accessible so that we can delete it later if we want.
				getFirestore()
					.collection("marketplace")
					.doc(uid)
					.collection("produce")
					.doc(docRef.id)
					.set({ id: docRef.id }, { merge: true });
				dispatch({ type: "CREATE_PRODUCE_ITEM", payload: data });
				dispatch({ type: "CREATE_PRODUCE_ITEM_LOADER", payload: false });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_PRODUCE_ITEM_ERROR", err });
				dispatch({ type: "CREATE_PRODUCE_ITEM_LOADER", payload: false });
			});
	};
};

export const getAllProductsFarmerSold = () => {
	return (dispatch, getState, { getFirestore }) => {
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		var uid;
		switch (profile.type) {
			default:
			case "farm_admin":
				uid = authUID;
				break;
			case "farm_sub":
				uid = profile.admin;
		}

		getFirestore()
			.collection("farm_users")
			.doc(uid)
			.collection("messages")
			.where("status", "=", "CONFIRMED")
			// .orderBy('date')
			.onSnapshot((querySnapshot) => {
				querySnapshot.forEach(
					(doc) => {
						dispatch({
							type: "SET_FETCHING",
							payload: true,
						});
						let sales = [];
						doc.forEach((doc) => {
							sales.push({ ...doc.data(), salesId: doc.id });
							// console.log(doc.id, " => ", doc.data());
						});
						// console.log("Current data: ", consultants);
						dispatch({
							type: "FETCH_SAlES_SUCCESS",
							payload: sales,
						});
					},
					(err) => {
						console.log(err);
						dispatch({ type: "FETCH_CONSULTING_DATA_ERROR", payload: err });
					}
				);
			});
	};
};

const filterDB = (duration, collectionRef, start, end) => {
	switch (duration) {
		// case "day":

		// break;
		case "week":
			return collectionRef.where("date", ">=", start).where("date", "<=", end);

		// break;
		case "month":
			return collectionRef.where("date", ">=", start).where("date", "<=", end);
		// break;
		case "year":
			break;

		default:
			return collectionRef.where("date", "==", start);

		// break;
	}
};

const getProductsFarmerSoldForDuration = (duration, date) => {
	let startOfWeek, endOfWeek;

	if (duration === "week") {
		const currentDate = new Date();
		const firstDayOfMonth = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			1
		);
		const weekOfMonth = Math.ceil(
			(currentDate.getDate() + firstDayOfMonth.getDay()) / 7
		);

		// console.log(weekOfMonth, `week of month`);
		// console.log(firstDayOfMonth, `first day of month`);

		// Calculate the start and end timestamps for the week of the month
		startOfWeek = new Date(currentDate);
		startOfWeek.setDate((weekOfMonth - 1) * 7 + 1);
		startOfWeek.setHours(0, 0, 0, 0);

		endOfWeek = new Date(currentDate);
		endOfWeek.setDate(weekOfMonth * 7);
		endOfWeek.setHours(23, 59, 59, 999);
	}

	let startOfMonth, endOfMonth;

	if (duration === "month") {
		const currentYear = new Date().getFullYear();
		const currentMonth = new Date().getMonth(); // Note that months are zero-based (January is 0, February is 1, and so on)

		startOfMonth = new Date(currentYear, currentMonth, 1);
		endOfMonth = new Date(currentYear, currentMonth + 1, 0);
		endOfMonth.setHours(23, 59, 59, 999);
	}

	return (dispatch, getState, { getFirestore }) => {
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		var uid;
		switch (profile.type) {
			default:
			case "farm_admin":
				uid = authUID;
				break;
			case "farm_sub":
				uid = profile.admin;
		}

		let collectionRef = getFirestore()
			.collection("farm_users")
			.doc(uid)
			.collection("messages")
			.where("status", "=", "CONFIRMED");

		switch (duration) {
			case "day":
				collectionRef.where("date", "==", date);

				break;
			case "week":
				collectionRef
					.where("date", ">=", startOfWeek)
					.where("date", "<=", endOfWeek);

				break;
			case "month":
				collectionRef
					.where("date", ">=", startOfMonth)
					.where("date", "<=", endOfMonth);
				break;
			case "year":
				break;

			default:
				break;
		}
	};
};

// export const get

export const getProduceData = () => {
	return (dispatch, getState, { getFirestore }) => {
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		var uid;
		switch (profile.type) {
			default:
			case "farm_admin":
				uid = authUID;
				break;
			case "farm_sub":
				uid = profile.admin;
		}

		getFirestore()
			.collection("marketplace")
			.doc(uid)
			.collection("produce")
			.get()
			.then((snapshot) => {
				const items = [];
				snapshot.forEach((doc) => {
					items.push(doc.data());
				});
				dispatch({ type: "GET_PRODUCE_ITEM", payload: items });
			})
			.catch((err) => {
				dispatch({ type: "GET_PRODUCE_ITEM_ERROR", err });
			});
	};
};
export const getProduceData2 = () => {
	return (dispatch, getState, { getFirestore }) => {
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		var uid;
		switch (profile.type) {
			default:
			case "farm_admin":
				uid = authUID;
				break;
			case "farm_sub":
				uid = profile.admin;
		}

		getFirestore()
			.collection("marketplace")
			.doc(uid)
			.collection("produce")
			.orderBy("date", "desc")
			.onSnapshot(
				(docs) => {
					//   if (doc.exists) {
					// Document data is available in the doc object

					const items = [];
					docs.forEach((doc) => {
						let document = doc.data();

						items.push(document);
					});
					dispatch({ type: "GET_PRODUCE_ITEM", payload: items });

					//   } else {
					// Document doesn't exist

					//   }
				},
				(error) => {
					// Handle errors gracefully
					dispatch({ type: "GET_PRODUCE_ITEM_ERROR", error });
				}
			);
	};
};

export const editProduceData = (produce) => {
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
			.collection("marketplace")
			.doc(uid)
			.collection("produce")
			.doc(produce.id)
			.set(produce.upload, { merge: true })
			.then(() => dispatch({ type: "EDIT_PRODUCE", produce }))
			.catch((err) => {
				dispatch({ type: "EDIT_PRODUCE_ERROR", err });
			});
	};
};

export const deleteProduceData = (data) => {
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
			.collection("marketplace")
			.doc(uid)
			.collection("produce")
			.doc(data.id)
			.delete()
			.then(() => dispatch({ type: "DELETE_PRODUCE", data }))
			.catch((err) => {
				dispatch({ type: "DELETE_PRODUCE_ERROR", err });
			});
	};
};

export const getPurchaseInfoFarm = (info) => {
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
			.collection("farm_users")
			.doc(uid)
			.collection("messages")
			.get()
			.then((snapshot) => {
				const orderInfo = [];
				snapshot.forEach((doc) => {
					orderInfo.push(doc.data());
				});
				dispatch({ type: "GET_PURCHASE_INFO_FARM", payload: orderInfo });
			})
			.catch((err) => {
				dispatch({ type: "GET_PURCHASE_INFO_FARM_ERROR", err });
			});
	};
};

export const editPurchaseStatusOnFarmer = (data) => {
	return (dispatch, getState, { getFirestore, getFirebase }) => {
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

		let date = getFirebase().firestore.Timestamp.fromDate(new Date());

		getFirestore()
			.collection("farm_users")
			.doc(uid)
			.collection("messages")
			.doc(data.id)
			.set({ status: data.status, date: date }, { merge: true })
			.then(() => dispatch({ type: "EDIT_PURCHASE_STATUS", payload: data }))
			.catch((err) => {
				dispatch({ type: "EDIT_PURCHASE_STATUS_ERROR", err });
			});
	};
};
