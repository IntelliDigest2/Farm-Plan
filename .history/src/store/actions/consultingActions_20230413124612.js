import firebase from "firebase";

export const fetchConsultantData = (consultantExpertise, consultationDate) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		console.log(consultantExpertise, consultationDate);
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

export const bookEvent = (event, consultantId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		console.log({ ...event, status: "requested" }, consultantId);
		// getFirestore()
		// 	.collection("consultants")
		// 	.doc(consultantId)
		// 	.update({
		// 		calendarEvents: firebase.firestore.FieldValue.arrayRemove(event),
		// 	})
		// 	.update({});
	};
};
