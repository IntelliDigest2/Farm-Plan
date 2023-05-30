import firebase from "firebase";
import { fs } from "./../../config/fbConfig";
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
	// return (dispatch, getState, { getFirebase, getFirestore }) => {
	let consultantRef = db
		.collection("consultants")
		.doc(event.consultant.id)
		.collection("calendarEvents")
		.doc(event.eventId);

	// dispatch({
	// 	type: "BOOKING_CONSULTANT",
	// 	payload: true,
	// });

	return db.runTransaction(async (transaction) => {
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
	});
	// .then((result) => {
	// 	dispatch({
	// 		type: "BOOKING_CONSULTANT_SUCCESS",
	// 		payload: result,
	// 	});
	// })
	// .catch((error) => {
	// 	console.log("Transaction failed: ", error);
	// 	dispatch({
	// 		type: "BOOKING_CONSULTANT_FAILED",
	// 	});
	// });
	// };
};

export const fetchOtherConsultingBookings = (userId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		getFirestore()
			.collection("marketplace")
			.doc(userId)
			.collection("bookings")
			.where("event.eventType", "!=", "Chat")
			.where("status", "==", "completed")
			.where("eventCompleted", "==", false)
			.onSnapshot(
				(querySnapshot) => {
					let otherBookings = [];
					querySnapshot.forEach((doc) => {
						// console.log(doc.data());
						otherBookings.push({ id: doc.id, ...doc.data() });
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

export const markEventAsComplete = async (userId, consultantId, eventId) => {
	console.log(userId, consultantId, eventId, `this is the flaggeer`);
	const batch = db.batch();

	let consultRef = db
		.collection("marketplace")
		.doc(userId)
		.collection("bookings")
		.doc(eventId);

	let consultantRef = db
		.collection("consultants")
		.doc(consultantId)
		.collection("calendarEvents")
		.doc(eventId);

	batch.update(consultRef, {
		eventCompleted: true,
	});

	batch.update(consultantRef, {
		eventCompleted: true,
	});

	batch.commit();
};

export const fetchAllCompletedEvents = (userId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		getFirestore()
			.collection("marketplace")
			.doc(userId)
			.collection("bookings")
			.where("event.eventType", "!=", "Chat")
			.where("status", "==", "completed")
			.where("eventCompleted", "==", true)
			.onSnapshot(
				(querySnapshot) => {
					let completedBookings = [];
					querySnapshot.forEach((doc) => {
						// console.log(doc.data());
						completedBookings.push({ id: doc.id, ...doc.data() });
					});

					dispatch({
						type: "GET_COMPLETED_CONSULTING_BOOKINGS_SUCCESS",
						payload: completedBookings,
					});
				},
				(error) => {
					console.log(error);
					dispatch({
						type: "GET_COMPLETED_CONSULTING_BOOKINGS_ERROR",
						payload: error,
					});
				}
			);
	};
};
