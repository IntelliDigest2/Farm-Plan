export const fetchConsultantData = (consultantExpertise, consultationDate) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		console.log(consultantExpertise, consultationDate);
		// getFirestore()
		// 	.collection("consultants")
		// 	.where("expertise", "==", `${consultantExpertise}`)
		// 	.where("eventDaysArray", "==", `${consultationDate}`)
		// 	.get()
		// 	.then((data) => {
		// 		dispatch({ type: "FETCH_CONSULTING_DATA_SUCCESS", payload: data });
		// 	})
		// 	.catch((err) => {
		// 		dispatch({ type: "FETCH_CONSULTING_DATA_ERROR", payload: err });
		// 	});
	};
};
