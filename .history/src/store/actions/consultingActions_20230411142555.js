export const fetchConsultantData = (consultantExpertise, consultationDate) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		if (!consultationDate) {
			getFirestore()
				.collection("consultants")
				.where("expertise", "==", `${consultantExpertise}`)
				.get()
				.then((data) => {
					dispatch({ type: "FETCH_CONSULTING_DATA_SUCCESS", payload: data });
				})
				.catch((err) => {
					dispatch({ type: "FETCH_CONSULTING_DATA_ERROR", payload: err });
				});
		} else {
			getFirestore()
				.collection("consultants")
				.where("expertise", "==", `${consultantExpertise}`)
				.where("eventDays", "==", `${consultantExpertise}`)
				.get()
				.then((data) => {
					dispatch({ type: "FETCH_CONSULTING_DATA_SUCCESS", payload: data });
				})
				.catch((err) => {
					dispatch({ type: "FETCH_CONSULTING_DATA_ERROR", payload: err });
				});
		}
	};
};
