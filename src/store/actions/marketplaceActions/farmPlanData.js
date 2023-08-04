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
			.add(data.upload)
			.then((docRef) => {
				// make the docId easily accessible so that we can delete it later if we want.
				getFirestore()
					.collection("marketplace")
					.doc(uid)
					.collection("produce")
					.doc(docRef.id)
					.set({ id: docRef.id }, { merge: true });
				dispatch({ type: "CREATE_PRODUCE_ITEM", payload: data });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_PRODUCE_ITEM_ERROR", err });
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

		console.log(weekOfMonth, `week of month`);
		console.log(firstDayOfMonth, `first day of month`);

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
