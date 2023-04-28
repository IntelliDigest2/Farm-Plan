export const fetchConsultantData = (consultantExpertise) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		getFirestore()
			.collection("consultants")
			.where("expertise", "==", `${consultantExpertise}`)
			.get()
			.then(dispatch({ type: "FETCH_CONSULTING_DATA", payload: err }))
			.catch((err) => {
				dispatch({ type: "FETCH_CONSULTING_DATA_ERROR", payload: err });
			});
	};
};
