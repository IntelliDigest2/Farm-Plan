export const fetchConsultantData = (consultantExpertise) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		getFirestore()
			.collection("consultants")
			.where("expertise", "==", `${consultantExpertise}`)

			.catch((err) => {
				dispatch({ type: "FETCH_CONSULTANT_DATA_ERROR", payload: err });
			});
	};
};
