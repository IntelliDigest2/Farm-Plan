import { format, parse } from "date-fns";
import firebase from "firebase";
const db = firebase.firestore();

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
	let cycleStartIsoString;
	let cycleEndIsoString;

	return (dispatch, getState, { getFirestore, getFirebase }) => {
		const authUID = getState().firebase.auth.uid;
		dispatch({
			type: "FETCH_PRODUCE_FOR_PROFIT_LOADER",
			payload: true,
		});

		if (duration === "Month") {
			let month = period.month;
			let year = period.year;

			// Calculate the start and end timestamps for the week of the month

			startMonth = new Date(year, month - 1, 1); // Month is 0-indexed, so we subtract 1 from the specified month

			endMonth = new Date(year, month, 0);
			startMonth.setHours(0, 0, 0, 0);
			endMonth.setHours(23, 59, 59, 999);
			// console.log(startMonth, `this  is the start month`);
			// console.log(endMonth, `this  is the end month`);
			// console.log(year, `this  is the start year`);
		} else {
			cycleStart = new Date(period.startYear, period.startMonth - 1, 1);
			cycleStart.setHours(0, 0, 0, 0);
			cycleEnd = new Date(period.endYear, period.endMonth + 1, 0);
			cycleEnd.setHours(23, 59, 59, 999);

			cycleStartIsoString = cycleStart.toISOString();
			cycleEndIsoString = cycleEnd.toISOString();
			// console.log(cycleStartIsoString, `this  is the start period`);
			// console.log(cycleEndIsoString, `this  is the start period`);
			// console.log(cycleStart, `this  is the end period`);
			// console.log(year, `this  is the start year`);
		}

		let farmPlanCollectionRef = getFirestore()
			.collection("marketplace")
			.doc(authUID)
			.collection("farmPlanData");

		let collectionRef = getFirestore()
			.collection("marketplace")
			.doc(authUID)
			.collection("produce");

		let collectionRef2 = getFirestore()
			.collection("marketplace")
			.doc(authUID)
			.collection("sales");

		let query, salesQuery, farmPlanQuery;

		switch (duration) {
			case "Month":
				query = collectionRef
					.where("date", ">=", startMonth)
					.where("date", "<=", endMonth);
				salesQuery = collectionRef2
					.where("date", ">=", startMonth)
					.where("date", "<=", endMonth);
				break;

			default:
				farmPlanQuery = farmPlanCollectionRef
					.where("cycleStart", "==", cycleStartIsoString)
					.where("cycleEnd", "==", cycleEndIsoString);

				query = collectionRef
					.where("date", ">=", cycleStart)
					//this calculate the beginning of the day to when the day ends i.e added 864000000milliseconds which is 24 hours
					.where("date", "<=", cycleEnd);
				salesQuery = collectionRef2
					.where("date", ">=", cycleStart)
					//this calculate the beginning of the day to when the day ends i.e added 864000000milliseconds which is 24 hours
					.where("date", "<=", cycleEnd);

				break;
		}

		let produceResult = new Promise((resolve, reject) => {
			query.onSnapshot(
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

		if (duration === "farmCycle") {
			farmPlanQuery
				.get()
				.then((querySnapshot) => {
					let presentCycle;
					// querySnapshot.forEach((doc) => {
					// 	console.log(doc.id, " => ", doc.data());
					// });
					if (querySnapshot.empty) {
						console.log(
							`this shows that there is not farmCycle for the chosen period`
						);
						dispatch({
							type: "FETCH_PRODUCE_FOR_PROFIT_LOADER",
							payload: false,
						});
						dispatch({
							type: "FETCH_PRODUCE_FOR_PROFIT_SUCCESS",
							payload: undefined,
						});
						presentCycle = false;
					} else {
						presentCycle = true;
					}

					return presentCycle;
				})

				// 	// presentCycle = false;

				// 	// return presentCycle;

				// 	else {
				// 		presentCycle = true;
				// 		return presentCycle;
				// 	}
				// })
				.then((presentCycle) => {
					console.log(presentCycle, `this is the presentCycle to show`);
					if (presentCycle) {
						// TODO THIS SHOULD SEARCH FOR ALL THE PRODUCTS WITH THE TAG OF THE FARM CYCLE
						// Promise.all([produceResult, salesResult]).then(
						// 	([products, sales]) => {
						// 		console.log(`this ran again`);
						// 		dispatch({
						// 			type: "FETCH_PRODUCE_FOR_PROFIT_SUCCESS",
						// 			payload: products,
						// 		});
						// 		dispatch({
						// 			type: "FETCH_SALES_FOR_PROFIT_SUCCESS",
						// 			payload: sales,
						// 		});
						// 	}
						// );
					}
				})
				.catch((err) => {
					console.error("Error:", err);
					dispatch({
						type: "FETCH_PROFIT_ERROR",
						payload: err,
					});
				});
		}

		if (duration === "Month") {
			Promise.all([produceResult, salesResult])
				.then(([products, sales]) => {
					console.log(`this ran again`);
					dispatch({
						type: "FETCH_PRODUCE_FOR_PROFIT_SUCCESS",
						payload: products,
					});

					dispatch({
						type: "FETCH_SALES_FOR_PROFIT_SUCCESS",
						payload: sales,
					});
				})
				.catch((err) => {
					console.error("Error:", err);
					dispatch({
						type: "FETCH_PROFIT_ERROR",
						payload: err,
					});
				});
		}
	};
};

export const getTurnOverChartFunction = (duration, period) => {
	let startMonth, endMonth;
	let cycleStart, cycleEnd;
	let cycleStartIsoString;
	let cycleEndIsoString;
	return (dispatch, getState, { getFirestore, getFirebase }) => {
		const authUID = getState().firebase.auth.uid;
		dispatch({
			type: "FETCH_PRODUCE_FOR_PROFIT_LOADER",
			payload: true,
		});

		if (duration === "Month") {
			let month = period.month;
			let year = period.year;

			// Calculate the start and end timestamps for the week of the month

			startMonth = new Date(year, month - 1, 1); // Month is 0-indexed, so we subtract 1 from the specified month

			endMonth = new Date(year, month, 0);
			startMonth.setHours(0, 0, 0, 0);
			endMonth.setHours(23, 59, 59, 999);
			// console.log(startMonth, `this  is the start month`);
			// console.log(endMonth, `this  is the end month`);
			// console.log(year, `this  is the start year`);
		} else {
			cycleStart = new Date(period.startYear, period.startMonth - 1, 1);
			cycleStart.setHours(0, 0, 0, 0);
			cycleEnd = new Date(period.endYear, period.endMonth - 1, 1);
			cycleEnd.setHours(23, 59, 59, 999);
			cycleStartIsoString = cycleStart.toISOString();
			cycleEndIsoString = cycleEnd.toISOString();
		}

		let farmPlanCollectionRef = getFirestore()
			.collection("marketplace")
			.doc(authUID)
			.collection("farmPlanData");

		let collectionRef = getFirestore()
			.collection("marketplace")
			.doc(authUID)
			.collection("produce");

		let collectionRef2 = getFirestore()
			.collection("marketplace")
			.doc(authUID)
			.collection("sales");

		let query, salesQuery, farmPlanQuery;

		switch (duration) {
			case "Month":
				query = collectionRef
					.where("date", ">=", startMonth)
					.where("date", "<=", endMonth);
				salesQuery = collectionRef2
					.where("date", ">=", startMonth)
					.where("date", "<=", endMonth);
				break;

			default:
				farmPlanQuery = farmPlanCollectionRef
					.where("cycleStart", "==", cycleStartIsoString)
					.where("cycleEnd", "==", cycleEndIsoString);
				query = collectionRef
					.where("date", ">=", cycleStart)
					//this calculate the beginning of the day to when the day ends i.e added 864000000milliseconds which is 24 hours
					.where("date", "<=", cycleEnd);
				salesQuery = collectionRef2
					.where("date", ">=", cycleStart)
					//this calculate the beginning of the day to when the day ends i.e added 864000000milliseconds which is 24 hours
					.where("date", "<=", cycleEnd);

				break;
		}
		let produceResult = new Promise((resolve, reject) => {
			query.onSnapshot(
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

		if (duration === "farmCycle") {
			farmPlanQuery.get().then((querySnapshot) => {
				let presentCycle;
				// querySnapshot.forEach((doc) => {
				// 	console.log(doc.id, " => ", doc.data());
				// });
				if (querySnapshot.empty) {
					console.log(
						`this shows that there is not farmCycle for the chosen period`
					);
					dispatch({
						type: "FETCH_PRODUCE_FOR_PROFIT_LOADER",
						payload: false,
					});
					dispatch({
						type: "FETCH_PRODUCE_FOR_PROFIT_SUCCESS",
						payload: undefined,
					});
					presentCycle = false;
				} else {
					presentCycle = true;
				}

				return presentCycle;
			});

			if (duration === "Month") {
				Promise.all([produceResult, salesResult])
					.then(([products, sales]) => {
						console.log(`this ran again`);
						dispatch({
							type: "FETCH_PRODUCE_FOR_PROFIT_SUCCESS",
							payload: products,
						});

						dispatch({
							type: "FETCH_SALES_FOR_PROFIT_SUCCESS",
							payload: sales,
						});
					})
					.catch((err) => {
						console.error("Error:", err);
						dispatch({
							type: "FETCH_PROFIT_ERROR",
							payload: err,
						});
					});
			}
		}

		query.onSnapshot(
			(snapshot) => {
				const products = [];
				dispatch({
					type: "FETCH_PRODUCE_FOR_PROFITCHART_LOADER",
					payload: true,
				});
				snapshot.forEach((doc) => {
					const data = doc.data();

					products.push({ ...doc.data(), salesId: doc.id });
				});
				// console.log(
				// 	products,
				// 	`these are the products returned for the products`
				// );
				// Do something with the values array, e.g., update the UI
				// console.log(products);
				dispatch({
					type: "FETCH_PRODUCE_FOR_PROFITCHART_SUCCESS",
					payload: products,
				});
			},
			(error) => {
				console.error("Error getting real-time updates:", error);
				dispatch({
					type: "FETCH_PRODUCE_FOR_PROFITCHART_ERROR",
					payload: error,
				});
			}
		);
		salesQuery.onSnapshot(
			(snapshot) => {
				const products = [];
				dispatch({
					type: "FETCH_SALES_FOR_PROFITCHART_LOADER",
					payload: true,
				});
				snapshot.forEach((doc) => {
					const data = doc.data();

					products.push({ ...doc.data(), salesId: doc.id });
				});

				// Do something with the values array, e.g., update the UI
				// console.log(products);
				dispatch({
					type: "FETCH_SALES_FOR_PROFITCHART_SUCCESS",
					payload: products,
				});
				// console.log(
				// 	products,
				// 	`these are the SALES FOR THE PROFIT CHART returned`
				// );
			},
			(error) => {
				console.error("Error getting real-time updates:", error);
				dispatch({
					type: "FETCH_SALES_FOR_PROFITCHART_ERROR",
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

export const getSalesForDuration = (duration, period) => {
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

		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;
		let collectionRef = getFirestore()
			.collection("marketplace")
			.doc(authUID)
			.collection("sales");

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
					type: "FETCH_SALES_LOADER",
					payload: true,
				});
				snapshot.forEach((doc) => {
					const data = doc.data();

					products.push({ ...doc.data(), salesId: doc.id });
				});
				// Do something with the values array, e.g., update the UI
				// console.log(products);
				dispatch({
					type: "FETCH_SALES_SUCCESS",
					payload: products,
				});

				// console.log(products, `these are the sales products`);
			},
			(error) => {
				console.error("Error getting real-time updates:", error);
				dispatch({
					type: "FETCH_SALES_ERROR",
					payload: error,
				});
			}
		);
	};
};

export const getSalesChartForDuration = (duration, period) => {
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
			.collection("sales");

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
					type: "FETCH_SALESCHART_LOADER",
					payload: true,
				});
				snapshot.forEach((doc) => {
					const data = doc.data();

					products.push({ ...doc.data(), salesId: doc.id });
				});
				// Do something with the values array, e.g., update the UI
				// console.log(products);
				dispatch({
					type: "FETCH_SALESCHART_SUCCESS",
					payload: products,
				});

				// console.log(products, `these are the sales products`);
			},
			(error) => {
				console.error("Error getting real-time updates:", error);
				dispatch({
					type: "FETCH_SALESCHART_ERROR",
					payload: error,
				});
			}
		);
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

		return getFirestore()
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
			});
	};
};
export const addExpenseData = (data) => {
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

		// dispatch({ type: "ADD_EXPENSE_LOADER", payload: true });

		return getFirestore()
			.collection("marketplace")
			.doc(uid)
			.collection("expense")
			.add(data);
		// .then((resp) => {
		// 	console.log(resp, `this is the response`);
		// 	// dispatch({ type: "ADD_EXPENSE_SUCCESS", payload:  });
		// 	dispatch({ type: "ADD_EXPENSE_LOADER", payload: false });
		// })
		// .catch((err) => {
		// 	console.log(err, `an error occurred`);
		// 	dispatch({ type: "ADD_EXPENSE_ERROR", err });
		// 	dispatch({ type: "ADD_EXPENSE_LOADER", payload: false });
		// });
	};
};
export const addSaleData = (data) => {
	return (dispatch, getState, { getFirestore, getFirebase }) => {
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;
		// const db = getFirestore();
		const db = getFirestore();

		const batch = db.batch();

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

		// dispatch({ type: "ADD_SALES_LOADER", payload: true });

		console.log(data, `this is the data on the farmplan side`);

		const salesCollectionDoc = getFirestore()
			.collection("marketplace")
			.doc(uid)
			.collection("sales")
			.doc();

		const produceCollectionRef = getFirestore()
			.collection("marketplace")
			.doc(uid)
			.collection("produce");

		return produceCollectionRef
			.where("item", "==", data.productName)
			.where("batchNumber", "==", data.batchNumber)
			.get()

			.then((querySnapshot) => {
				if (!querySnapshot.empty) {
					// The query returned results

					let documentId;
					let valueToReturn;
					querySnapshot.forEach((doc) => {
						// const productData = doc.data();
						// Handle the product data here
						console.log("Product data is not empty");
						documentId = doc.id;

						console.log(
							doc.data().current_quantity,
							`this is the current quantity`
						);

						console.log(
							doc.data().current_quantity > data.quantity,
							`this shows if the current quantity is greater than the quantity in the form`
						);

						if (doc.data().current_quantity > data.quantity) {
							getFirestore().collection("marketplace").doc(uid);
							let decrementValue = -parseInt(data.quantity);

							console.log(decrementValue, `this is the decrement value`);

							const docToUpdate = produceCollectionRef.doc(documentId);

							batch.update(docToUpdate, {
								current_quantity: db.FieldValue.increment(decrementValue),
							});

							batch.set(salesCollectionDoc, data);
							batch.commit();
							valueToReturn = "success";
							console.log(`yes it can go through`);
						} else {
							console.log(`no it can not go through`);

							valueToReturn = "currentQuantity deficit";
						}
					});
					console.log(documentId);
					return valueToReturn;
				} else {
					// The query did not return any results
					console.log("No matching products found.");
					return null;
				}
			});

		// return db.runTransaction(async (transaction) => {
		// 	// Get the document data within the transaction
		// 	const doc = await transaction.get(productsDocRef);

		// 	// Perform operations on the document data
		// 	// const newData = { ...doc.data(), updatedField: 'new value' };
		// 	console.log(`here my boy`);
		// 	if (doc.exists) {
		// 		transaction.update(productsDocRef, {
		// 			currentQuantity: db.FieldValue.increment(-parseInt(data.quantity)),
		// 		});
		// 		getFirestore()
		// 			.collection("marketplace")
		// 			.doc(uid)
		// 			.collection("sales")
		// 			.add(data);
		// 	} else {
		// 		return null;
		// 	}

		// 	// Update the document within the transaction
		// 	// transaction.update(docRef, newData);

		// 	// Return a value if needed (e.g., for conditional updates)
		// });

		// return getFirestore()
		// 	.collection("marketplace")
		// 	.doc(uid)
		// 	.collection("sales")
		// 	.add(data);
		// .then((resp) => {
		// 	console.log(resp, `this is the response`);
		// 	// dispatch({ type: "ADD_EXPENSE_SUCCESS", payload:  });
		// 	// dispatch({ type: "ADD_SALES_LOADER", payload: false });
		// })
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
export const getProduceData2 = (duration, period) => {
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

		let startOfWeek, endOfWeek;
		let day;

		let startOfMonth, endOfMonth;
		let startOfYear, endOfYear;

		// console.log(
		// 	duration,
		// 	`this is the duration for the products in the farmPlanData`
		// );
		// console.log(
		// 	period,
		// 	`this is the period for the products in the farmPlanData`
		// );

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

		let collectionRef = getFirestore()
			.collection("marketplace")
			.doc(uid)
			.collection("produce")
			.orderBy("date", "desc");

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
			(docs) => {
				//   if (doc.exists) {
				// Document data is available in the doc object

				const items = [];
				docs.forEach((doc) => {
					let document = doc.data();

					items.push(document);
				});
				console.log(items, `reading from the farmDataPlan`);
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

		// getFirestore()
		// 	.collection("marketplace")
		// 	.doc(uid)
		// 	.collection("produce")
		// 	.orderBy("date", "desc")
		// 	.onSnapshot(
		// 		(docs) => {
		// 			//   if (doc.exists) {
		// 			// Document data is available in the doc object

		// 			const items = [];
		// 			docs.forEach((doc) => {
		// 				let document = doc.data();

		// 				items.push(document);
		// 			});
		// 			dispatch({ type: "GET_PRODUCE_ITEM", payload: items });

		// 			//   } else {
		// 			// Document doesn't exist

		// 			//   }
		// 		},
		// 		(error) => {
		// 			// Handle errors gracefully
		// 			dispatch({ type: "GET_PRODUCE_ITEM_ERROR", error });
		// 		}
		// 	);
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
			.where("status", "==", "IN PROGRESS")
			// .where("status", "!=", "ACCEPTED")
			.onSnapshot(
				(querySnapshot) => {
					let orderInfo = [];
					querySnapshot.forEach((doc) => {
						// console.log(doc.id, " => ", doc.data()); // Log the document ID and data
						orderInfo.push({ eventId: doc.id, ...doc.data() });
					});

					dispatch({
						type: "GET_PURCHASE_INFO_FARM",
						payload: orderInfo,
					});
				},
				(err) => {
					console.log(err);
					dispatch({ type: "GET_PURCHASE_INFO_FARM_ERROR", err });
				}
			);
		// .get()
		// .then((snapshot) => {
		// 	const orderInfo = [];
		// 	snapshot.forEach((doc) => {
		// 		const data = doc.data();
		// 		if (!(data.status === "COMPLETED" || data.status === "ACCEPTED")) {
		// 			orderInfo.push(data);
		// 		}
		// 	});
		// 	dispatch({ type: "GET_PURCHASE_INFO_FARM", payload: orderInfo });
		// })
		// .catch((err) => {
		// 	dispatch({ type: "GET_PURCHASE_INFO_FARM_ERROR", err });
		// });
	};
};

export const getFarmMessagesFromShoppingAdmin = () => {
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
			.onSnapshot(
				((docs) => {
					//   if (doc.exists) {
					// Document data is available in the doc object

					const messages = [];
					docs.forEach((doc) => {
						let document = doc.data();

						messages.push(document);
					});
					console.log(messages, `reading from the farmDataPlan`);
					dispatch({
						type: "GET_PURCHASEADMIN_MESSAGES_SUCCESS",
						payload: messages,
					});

					//   } else {
					// Document doesn't exist

					//   }
				},
				(error) => {
					// Handle errors gracefully
					dispatch({ type: "GET_PURCHASEADMIN_MESSAGES__ERROR", error });
				})
			);
	};
};


export const getFarmMessagesFromSupplier = () => {
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
			.collection("supplyOrders")
			.onSnapshot(
				(querySnapshot) => {
					let supplyOrders = [];
					querySnapshot.forEach((doc) => {
						// console.log(doc.id, " => ", doc.data()); // Log the document ID and data
						supplyOrders.push({ eventId: doc.id, ...doc.data() });
					});

					dispatch({
						type: "GET_FARMERSUPPLIER_MESSAGES_SUCCESS",
						payload: supplyOrders,
					});
				},
				(err) => {
					console.log(err);
					dispatch({ type: "GET_FARMERSUPPLIER_MESSAGES__ERROR", err });
				}
			);
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
			.set(
				{
					cart: data.item,
					// farmerID: data.farmerID,
					// receiversID: data.receiversID,
					status: data.status,
					deliveryDueDate: data.deliveryDueDate,
					date: date,
				},
				{ merge: true }
			)
			.then(() => dispatch({ type: "EDIT_PURCHASE_STATUS", payload: data }))
			.catch((err) => {
				dispatch({ type: "EDIT_PURCHASE_STATUS_ERROR", err });
			});
	};
};

