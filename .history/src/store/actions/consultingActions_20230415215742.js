import firebase from "firebase";

// const batch = firebase.firestore().batch();

export const fetchConsultantData = (consultantExpertise, consultationDate) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		console.log(consultantExpertise, consultationDate);

		console.log\

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
	return (dispatch, getState, { getFirebase, getFirestore }) => {

		console.log(getFirestore.batch)
		console.log(consultantId, userId);

		let consultantRef = getFirestore()
			.collection("consultants")
			.doc(consultantId);

		batch.update(consultantRef, {
			calendarEvents: firebase.firestore.FieldValue.arrayRemove(event),
		});

		batch.update(consultantRef, {
			calendarEvents: firebase.firestore.FieldValue.arrayUnion({
				...event,
				status: { requesterId: userId },
			}),
		});
	};
};
