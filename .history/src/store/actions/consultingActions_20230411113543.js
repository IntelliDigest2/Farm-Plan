export const fetchConsultantData = (consultantExpertise) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		getFirestore()
			.collection("consultants")
			.where("expertise", "==", `${consultantExpertise}`)
			.get()
			.then((data) => {
				dispatch({ type: "FETCH_CONSULTING_DATA", payload: data });
			})
			.catch((err) => {
				dispatch({ type: "FETCH_CONSULTING_DATA_ERROR", payload: err });
			});
	};
};
