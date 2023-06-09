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
	};
};

export const bookEvent = (event, consultantId, userId) => {
	console.log(event, consultantId, userId, `this the information passed`);
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// console.log(consultantId, userId, event, "here is the happening place");

		let consultantRef = getFirestore()
			.collection("consultants")
			.doc(consultantId);

		dispatch({
			type: "BOOKING_CONSULTANT",
			payload: true,
		});

		return db
			.runTransaction((transaction) => {
				// This code may get re-run multiple times if there are conflicts.

				return transaction.get(consultantRef).then((sfDoc) => {
					console.log(sfDoc.data(), `this is the sfDoc`);
					let newArray = sfDoc.data().calendarEvents.filter((e) => {
						return e === event;
					});
					console.log(newArray);
					if (!newArray.status === null) {
						throw new Error("opening has been booked");
					}
					transaction.update(consultantRef, {
						calendarEvents: firebase.firestore.FieldValue.arrayRemove(event),
					});

					transaction.update(consultantRef, {
						calendarEvents: firebase.firestore.FieldValue.arrayUnion({
							...event,
							status: { ...event.status, requesterId: userId },
						}),
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
