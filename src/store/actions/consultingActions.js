import firebase from "firebase";
const db = firebase.firestore();

// const batch = firebase.firestore().batch();

export const fetchConsultantData = (consultantExpertise, consultationDate) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// console.log(consultantExpertise, consultationDate);

		getFirestore()
			.collection("consultants")
			.where("expertise", "==", `${consultantExpertise}`)
			.where("eventDaysArray", "array-contains", `${consultationDate}`)
			.onSnapshot(
				(doc) => {
					dispatch({
						type: "SET_FETCHING",
						payload: true,
					});
					let consultants = [];
					doc.forEach((doc) => {
						consultants.push({ consultant: doc.data(), consultantId: doc.id });
						console.log(doc.id, " => ", doc.data());
					});
					console.log("Current data: ", consultants);
					dispatch({
						type: "FETCH_CONSULTING_DATA_SUCCESS",
						payload: consultants,
					});
				},
				(err) => {
					console.log(err);
					dispatch({ type: "FETCH_CONSULTING_DATA_ERROR", payload: err });
				}
			);

		// getFirestore()
		// .collection("consultants")
	};
};

export const fetchConsultantForDate = (
	consultantExpertise,
	consultationDate
) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		getFirestore()
			.collectionGroup("calendarEvents")
			.where("date", "==", `${consultationDate}`)
			.where("industry", "==", `${consultantExpertise}`)
			.onSnapshot(
				(doc) => {
					dispatch({
						type: "SET_FETCHING",
						payload: true,
					});
					let consultants = [];
					doc.forEach((doc) => {
						consultants.push({ consultant: doc.data(), consultantId: doc.id });
						console.log(doc.id, " => ", doc.data());
					});
					console.log("Current data: ", consultants);
					// dispatch({
					// 	type: "FETCH_CONSULTING_DATA_SUCCESS",
					// 	payload: consultants,
					// });
				},
				(err) => {
					console.log(err);
					dispatch({ type: "FETCH_CONSULTING_DATA_ERROR", payload: err });
				}
			);
	};
};

export const bookEvent = (
	event,
	consultantName,
	consultantId,
	userId,
	eventId,
	userName
) => {
	console.log(event, consultantId, userId, `this the information passed`);
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		let consultantRef = getFirestore()
			.collection("consultants")
			.doc(consultantId)
			.collection("calendarEvent")
			.doc(eventId);

		console.log(consultantRef, `this is the consultantRef`);

		dispatch({
			type: "BOOKING_CONSULTANT",
			payload: true,
		});

		return db
			.runTransaction(async (transaction) => {
				// This code may get re-run multiple times if there are conflicts.

				return transaction.get(consultantRef).then((sfDoc) => {
					console.log(sfDoc.data(), `this is the sfDoc`);
					let data = sfDoc.data();
					// console.log(newArray, `this is the new Arry`);
					if (!data.status === null) {
						throw new Error("opening has been booked");
					}

					transaction.update(consultantRef, {
						status: { ...event.status, requesterId: userId },
					});
				});
			})
			.then(() => {
				console.log("Transaction successfully committed!");
				dispatch({
					type: "BOOKING_CONSULTANT_SUCCESS",
				});
			})
			.catch((error) => {
				console.log("Transaction failed: ", error);
				dispatch({
					type: "BOOKING_CONSULTANT_FAILED",
				});
			});
	};
};

export const fetchOtherBookings = (userId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		getFirestore()
			.collection("consultants")
			.doc(userId)
			.collection("calendarEvents")
			.where("eventType", "!=", "Chat")
			.where("booked", "===", true)
			.get()
			.then((querySnapshot) => {
				let otherBookings;
				querySnapshot.forEach((doc) => {
					console.log(doc.data());
					otherBookings.push({ id: doc.id, data: doc.data() });
				});

				dispatch({
					type: "BOOKING_CONSULTANT_SUCCESS",
				});
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
	};
};
