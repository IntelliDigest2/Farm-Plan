import firebase from "firebase";
const db = firebase.firestore();

// const batch = firebase.firestore().batch();

// export const fetchConsultantData = (consultantExpertise, consultationDate) => {
// 	return (dispatch, getState, { getFirebase, getFirestore }) => {
// 		// console.log(consultantExpertise, consultationDate);

// 		getFirestore()
// 			.collection("consultants")
// 			.where("expertise", "==", `${consultantExpertise}`)
// 			.where("eventDaysArray", "array-contains", `${consultationDate}`)
// 			.onSnapshot(
// 				(doc) => {
// 					dispatch({
// 						type: "SET_FETCHING",
// 						payload: true,
// 					});
// 					let consultants = [];
// 					doc.forEach((doc) => {
// 						consultants.push({ consultant: doc.data(), consultantId: doc.id });
// 						console.log(doc.id, " => ", doc.data());
// 					});
// 					console.log("Current data: ", consultants);
// 					dispatch({
// 						type: "FETCH_CONSULTING_DATA_SUCCESS",
// 						payload: consultants,
// 					});
// 				},
// 				(err) => {
// 					console.log(err);
// 					dispatch({ type: "FETCH_CONSULTING_DATA_ERROR", payload: err });
// 				}
// 			);

// 		// getFirestore()
// 		// .collection("consultants")
// 	};
// };

export const fetchConsultantForDate = (
	consultantExpertise,
	consultationDate,
	consultationType
) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		getFirestore()
			.collectionGroup("calendarEvents")
			.where("date", "==", `${consultationDate}`)
			.where("industry", "==", `${consultantExpertise}`)
			.where("eventType", "==", `${consultationType}`)

			.onSnapshot(
				(doc) => {
					dispatch({
						type: "SET_FETCHING",
						payload: true,
					});
					let consultants = [];
					doc.forEach((doc) => {
						consultants.push({ ...doc.data(), eventId: doc.id });
						// console.log(doc.id, " => ", doc.data());
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
	};
};

export const bookEvent = (
	event,

	userId
) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		let consultantRef = getFirestore()
			.collection("consultants")
			.doc(event.consultant.id)
			.collection("calendarEvents")
			.doc(event.eventId);

		dispatch({
			type: "BOOKING_CONSULTANT",
			payload: true,
		});

		return db
			.runTransaction(async (transaction) => {
				// This code may get re-run multiple times if there are conflicts.

				return transaction.get(consultantRef).then((sfDoc) => {
					let data = sfDoc.data();

					if (data.status.requesterId !== null) {
						throw new Error("opening has been booked");
					}

					transaction.update(consultantRef, {
						status: { ...event.status, requesterId: userId },
					});
				});
			})
			.then((result) => {
				dispatch({
					type: "BOOKING_CONSULTANT_SUCCESS",
					payload: result,
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

export const fetchOtherConsultingBookings = (userId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		getFirestore()
			.collection("marketplace")
			.doc(userId)
			.collection("bookings")
			.where("event.eventType", "!=", "Chat")
			.where("status", "==", "completed")
			.onSnapshot(
				(querySnapshot) => {
					let otherBookings = [];
					querySnapshot.forEach((doc) => {
						console.log(doc.data());
						otherBookings.push({ id: doc.id, data: doc.data() });
					});

					dispatch({
						type: "GET_OTHER_CONSULTING_BOOKINGS_SUCCESS",
						payload: otherBookings,
					});
				},
				(error) => {
					console.log(error);
					dispatch({
						type: "GET_OTHER_CONSULTING_BOOKINGS_ERROR",
						payload: error,
					});
				}
			);
	};
};
