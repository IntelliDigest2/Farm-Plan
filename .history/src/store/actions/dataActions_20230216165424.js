//startData has been moved to happen within authActions/signup but has been left here for now as some accounts still need to use it currently.
//Feel free to delete in the future
export const startData = (data) => {
	return (dispatch, getState, { getFirebase }) => {
		getFirebase()
			.firestore()
			.collection("data")
			.doc(data.uid)
			.set({
				user: data.name,
				email: data.email,
			})
			.then(() => {
				dispatch({ type: "START_DATA" });
			})
			.catch((err) => {
				dispatch({ type: "START_DATA_ERROR", err });
			});
	};
};

//Works for new Admin/Sub acount structure
export const createFoodWasteData = (data) => {
	return (dispatch, getState, { getFirebase }) => {
		getFirebase()
			.firestore()
			.collection(data.masterCollection)
			.doc(data.uid)
			.collection(data.collection)
			.add(data.upload)
			.then(() => {
				dispatch({ type: "CREATE_DATA" });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_DATA_ERROR", err });
			});
	};
};

//Works for new Admin/Sub acount structure
export const createGiftFoodData = (data) => {
	return (dispatch, getState, { getFirebase }) => {
		getFirebase()
			.firestore()
			.collection(data.masterCollection)
			.doc(data.uid)
			.collection(data.collection)
			.add(data.upload)
			.then(() => {
				dispatch({ type: "CREATE_DATA" });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_DATA_ERROR", err });
			});
	};
};

export const createMarketplaceData = (product) => {
	return (dispatch, getState, { getFirebase }) => {
		getFirebase()
			.firestore()
			.collection("marketplace")
			.doc(product.uid)
			.collection("farmPlanData")
			.add(product.upload)
			.then(() => {
				dispatch({ type: "CREATE_DATA" });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_DATA_ERROR", err });
			});
	};
};

export const createResearchData = (data) => {
	return (dispatch, getState, { getFirebase }) => {
		getFirebase()
			.firestore()
			.collection("data")
			.doc(data.uid)
			.collection("researchData")
			.add(data.upload)
			.then(() => {
				dispatch({ type: "CREATE_DATA" });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_DATA_ERROR", err });
			});
	};
};

export const createMapData = (data) => {
	return (dispatch, getState, { getFirebase }) => {
		const increment = getFirebase().firestore.FieldValue.increment(
			data.upload.foodWasteWeight
		);
		console.log("catch");
		getFirebase()
			.firestore()
			.collection(data.masterCollection)
			.doc(data.uid)
			.set({ ...data.upload, foodWasteWeight: increment }, { merge: true })
			.then(() => {
				dispatch({ type: "CREATE_DATA" });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_DATA_ERROR", err });
			});
	};
};

export const getMapData = (data) => {
	return (dispatch, getState, { getFirebase }) => {
		getFirebase()
			.firestore()
			.collection(data.masterCollection)
			.get()
			.then((snapshot) => {
				const data = [];
				snapshot.forEach((doc) => {
					data.push(doc.data());
				});
				dispatch({ type: "GET_DATA", payload: data });
			})
			.catch((err) => {
				dispatch({ type: "GET_DATA_ERROR", err });
			});
	};
};

//Works for new Admin/Sub acount structure
export const getFirestoreData = (data) => {
	return (dispatch, getState, { getFirebase }) => {
		getFirebase()
			.firestore()
			.collection(data.masterCollection)
			.doc(data.uid)
			.collection(data.collection)
			.get()
			.then((snapshot) => {
				const data = [];
				snapshot.forEach((doc) => {
					data.push(doc.data());
				});
				dispatch({ type: "GET_DATA", payload: data });
			})
			.catch((err) => {
				dispatch({ type: "GET_DATA_ERROR", err });
			});
	};
};

export const createFoodLossData = (data) => {
	return (dispatch, getState, { getFirebase }) => {
		const profile = getState().firebase.profile;
		const auth = getState().firebase.auth;

		// const costInDollars = Number(data.weightOfFoodSurplus) * 0.85;
		// const costInPounds = Number(data.weightOfFoodSurplus) * 0.62;

		const FOODNAME = data.foodName;
		const EDIBLEORINEDIBLE = data.edibleOrInedible;
		const GHG = data.ghg * data.weightMultiplier;

		const WDAY = data.chartSubmissionDay;
		const WEEK = data.chartSubmissionWeek;
		const MONTH = data.chartSubmissionMonth;
		const MDATE = data.chartSubmissionDate;
		const YEAR = data.chartSubmissionYear;
		const FULLDATE = data.chartSubmissionFullDate;

		const EXPIRYDATE = data.expiryDate;
		const CURRENCY = data.currency;
		const COST = (
			data.foodLossCost *
			data.weightMultiplier *
			data.currencyMultiplier
		).toFixed(2);
		const WEIGHTUNIT = data.weightType;

		const DATE = new Date().getHours();
		let t = "";
		if (DATE >= 0 && DATE < 6) {
			t = "T1";
		} else if (DATE >= 6 && DATE < 12) {
			t = "T2";
		} else if (DATE >= 12 && DATE < 18) {
			t = "T3";
		} else {
			t = "T4";
		}

		getFirebase()
			.firestore()
			.collection("data")
			.doc(auth.uid)
			.collection("writtenFoodSurplusData")
			.add({
				date: getFirebase().firestore.Timestamp.fromDate(new Date()),
				// costInDollars: costInDollars,
				// costInPounds: costInPounds,
				weight: Number(data.foodLossWeight),
				type: t,

				GHG: GHG,
				FOODNAME: FOODNAME,
				EDIBLEORINEDIBLE: EDIBLEORINEDIBLE,

				WDAY: WDAY,
				WEEK: WEEK,
				MONTH: MONTH,
				MDATE: MDATE,
				YEAR: YEAR,
				FULLDATE: FULLDATE,

				EXPIRYDATE: EXPIRYDATE,
				CURRENCY: CURRENCY,
				COST: Number(COST),
				WEIGHTUNIT: WEIGHTUNIT,
			})
			.then(() => {
				dispatch({ type: "CREATE_DATA" });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_DATA_ERROR", err });
			});
	};
};

export const createFoodSurplusData = (data) => {
	return (dispatch, getState, { getFirebase }) => {
		const profile = getState().firebase.profile;
		const auth = getState().firebase.auth;

		const SUBMISSIONTYPE = data.submissionType;

		const FOODNAME = data.foodName;
		const FOODCATEGORY = data.foodCategory;
		const LOCALORNOT = data.producedLocally;
		const EXPIRYDATE = data.expiryDate;
		const GHG = data.ghg * data.weightMultiplier;
		const COST = (
			data.foodSurplusCost *
			data.weightMultiplier *
			data.currencyMultiplier
		).toFixed(2);
		const CURRENCY = data.currency;
		const WEIGHTUNIT = data.weightType;

		const NOTES = data.notes;

		const WDAY = data.chartSubmissionDay;
		const WEEK = data.chartSubmissionWeek;
		const MONTH = data.chartSubmissionMonth;
		const MDATE = data.chartSubmissionDate;
		const YEAR = data.chartSubmissionYear;
		const FULLDATE = data.chartSubmissionFullDate;

		const PRICE = data.price;
		const POSTCODE = data.postcode;

		const CARBSCONTENT = data.carbsContent;
		const PROTEINCONTENT = data.proteinContent;
		const FIBRECONTENT = data.fibreContent;
		const FATCONTENT = data.fatContent;

		const DATE = new Date().getHours();
		let t = "";
		if (DATE >= 0 && DATE < 6) {
			t = "T1";
		} else if (DATE >= 6 && DATE < 12) {
			t = "T2";
		} else if (DATE >= 12 && DATE < 18) {
			t = "T3";
		} else {
			t = "T4";
		}

		getFirebase()
			.firestore()
			.collection("data")
			.doc(auth.uid)
			.collection("writtenFoodSurplusData")
			.add({
				date: getFirebase().firestore.Timestamp.fromDate(new Date()),
				// costInDollars: costInDollars,
				// costInPounds: costInPounds,

				weight: Number(data.foodSurplusWeight),

				type: t,

				SUBMISSIONTYPE: SUBMISSIONTYPE,

				FOODNAME: FOODNAME,
				FOODCATEGORY: FOODCATEGORY,
				LOCALORNOT: LOCALORNOT,
				EXPIRYDATE: EXPIRYDATE,
				GHG: GHG,
				COST: Number(COST),
				CURRENCY: CURRENCY,
				WEIGHTUNIT: WEIGHTUNIT,

				NOTES: NOTES,

				WDAY: WDAY,
				WEEK: WEEK,
				MONTH: MONTH,
				MDATE: MDATE,
				YEAR: YEAR,
				FULLDATE: FULLDATE,

				PRICE: PRICE,
				POSTCODE: POSTCODE,

				CARBSCONTENT: CARBSCONTENT,
				PROTEINCONTENT: PROTEINCONTENT,
				FIBRECONTENT: FIBRECONTENT,
				FATCONTENT: FATCONTENT,
			})
			.then(() => {
				dispatch({ type: "CREATE_DATA" });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_DATA_ERROR", err });
			});
	};
};

// TODO Fix this
export const createFoodIntakeData = (data) => {
	return (dispatch, getState, { getFirebase }) => {
		const profile = getState().firebase.profile;
		const auth = getState().firebase.auth;

		const SUBMISSIONTYPE = data.submissionType;

		const MEAL = data.meal;
		const FOODNAME = data.foodName;
		const EATINGINOROUT = data.eatingInOrOut;

		const LOCALORNOT = data.producedLocally;

		const NOTES = data.notes;

		const WDAY = data.chartSubmissionDay;
		const WEEK = data.chartSubmissionWeek;
		const MONTH = data.chartSubmissionMonth;
		const MDATE = data.chartSubmissionDate;
		const YEAR = data.chartSubmissionYear;
		const FULLDATE = data.chartSubmissionFullDate;

		const DATE = new Date().getHours();
		let t = "";
		if (DATE >= 0 && DATE < 6) {
			t = "T1";
		} else if (DATE >= 6 && DATE < 12) {
			t = "T2";
		} else if (DATE >= 12 && DATE < 18) {
			t = "T3";
		} else {
			t = "T4";
		}

		getFirebase()
			.firestore()
			.collection("data")
			.doc(auth.uid)
			.collection("writtenFoodIntakeData")
			.add({
				date: getFirebase().firestore.Timestamp.fromDate(new Date()),
				type: t,

				MEAL: MEAL,
				FOODNAME: FOODNAME,
				EATINGINOROUT: EATINGINOROUT,

				LOCALORNOT: LOCALORNOT,

				NOTES: NOTES,

				WDAY: WDAY,
				WEEK: WEEK,
				MONTH: MONTH,
				MDATE: MDATE,
				YEAR: YEAR,
				FULLDATE: FULLDATE,

				SUBMISSIONTYPE: SUBMISSIONTYPE,
			})
			.then(() => {
				dispatch({ type: "CREATE_DATA" });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_DATA_ERROR", err });
			});
	};
};

export const createFoodIntakeResearchData = (data) => {
	return (dispatch, getState, { getFirebase }) => {
		const profile = getState().firebase.profile;
		const auth = getState().firebase.auth;

		const SUBMISSIONTYPE = data.submissionType;

		const PROJECTNAME = data.projectName;
		const FOODNAME = data.foodName;

		const WEIGHTUNIT = data.weightType;

		const LOCALORNOT = data.producedLocally;
		const NOTES = data.notes;

		const WDAY = data.chartSubmissionDay;
		const WEEK = data.chartSubmissionWeek;
		const MONTH = data.chartSubmissionMonth;
		const MDATE = data.chartSubmissionDate;
		const YEAR = data.chartSubmissionYear;
		const FULLDATE = data.chartSubmissionFullDate;

		const DATE = new Date().getHours();
		let t = "";
		if (DATE >= 0 && DATE < 6) {
			t = "T1";
		} else if (DATE >= 6 && DATE < 12) {
			t = "T2";
		} else if (DATE >= 12 && DATE < 18) {
			t = "T3";
		} else {
			t = "T4";
		}

		getFirebase()
			.firestore()
			.collection("data")
			.doc(auth.uid)
			.collection("writtenFoodIntakeAcademicData")
			.add({
				date: getFirebase().firestore.Timestamp.fromDate(new Date()),
				type: t,

				PROJECTNAME: PROJECTNAME,
				FOODNAME: FOODNAME,

				weight: Number(data.foodWeight),
				WEIGHTUNIT: WEIGHTUNIT,

				LOCALORNOT: LOCALORNOT,

				NOTES: NOTES,

				WDAY: WDAY,
				WEEK: WEEK,
				MONTH: MONTH,
				MDATE: MDATE,
				YEAR: YEAR,
				FULLDATE: FULLDATE,

				SUBMISSIONTYPE: SUBMISSIONTYPE,
			})
			.then(() => {
				dispatch({ type: "CREATE_DATA" });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_DATA_ERROR", err });
			});
	};
};

export const createReserveItemsData = (data) => {
	return (dispatch, getState, { getFirebase }) => {
		const profile = getState().firebase.profile;
		const auth = getState().firebase.auth;

		const SUBMISSIONTYPE = data.submissionType;

		const ITEMLIST = data.items;
		const FROMDATE = data.fromDate;
		const TODATE = data.toDate;
		const FREQUENCY = data.frequency;

		const WDAY = data.submissionDay;
		const WEEK = data.submissionWeek;
		const MONTH = data.submissionMonth;
		const MDATE = data.submissionDate;
		const YEAR = data.submissionYear;
		const FULLDATE = data.submissionFullDate;

		const DATE = new Date().getHours();
		let t = "";
		if (DATE >= 0 && DATE < 6) {
			t = "T1";
		} else if (DATE >= 6 && DATE < 12) {
			t = "T2";
		} else if (DATE >= 12 && DATE < 18) {
			t = "T3";
		} else {
			t = "T4";
		}

		getFirebase()
			.firestore()
			.collection("data")
			.doc(auth.uid)
			.collection("writtenReserveFoodData")
			.add({
				date: getFirebase().firestore.Timestamp.fromDate(new Date()),
				type: t,

				SUBMISSIONTYPE: SUBMISSIONTYPE,

				ITEMLIST: ITEMLIST,
				FROMDATE: FROMDATE,
				TODATE: TODATE,
				FREQUENCY: FREQUENCY,

				WDAY: WDAY,
				WEEK: WEEK,
				MONTH: MONTH,
				MDATE: MDATE,
				YEAR: YEAR,
				FULLDATE: FULLDATE,
			})
			.then(() => {
				dispatch({ type: "CREATE_DATA" });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_DATA_ERROR", err });
			});
	};
};

export const getPurchaseData = (data) => {
	return (dispatch, getState, { getFirestore }) => {
		getFirestore()
			.collection("purchases")
			.get()
			.then((snapshot) => {
				const data = [];
				snapshot.forEach((doc) => {
					console.log(doc);
					data.push(doc.data());
				});
				dispatch({ type: "GET_PURCHASE_DATA", payload: data });
			})
			.catch((err) => {
				dispatch({ type: "GET_PURCHASE_DATA_ERROR", err });
			});
	};
};

export const sendToUser = (data) => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database

		getFirestore()
			.collection("marketplace")
			.doc(data.uid)
			.collection("messages")
			.add(data.upload)
			.then((docRef) => {
				// make the docId easily accessible so that we can delete it later if we want.
				getFirestore()
					.collection("marketplace")
					.doc(data.uid)
					.collection("messages")
					.doc(docRef.id)
					.set({ id: docRef.id }, { merge: true });
				dispatch({ type: "SEND_TO_USER" });
			})
			.catch((err) => {
				dispatch({ type: "SEND_TO_USER_ERROR", err });
			});
	};
};
