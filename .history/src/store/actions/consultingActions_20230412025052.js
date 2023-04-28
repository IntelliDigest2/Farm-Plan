export const fetchConsultantData = (consultantExpertise, consultationDate) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		console.log(consultantExpertise, consultationDate);
		getFirestore()
			.collection("consultants")
			.where("expertise", "==", `${consultantExpertise}`)
			.where("eventDaysArray", "array-contains", `${consultationDate}`)
			.get()
			.then((querySnapshot) => {
				console.log(querySnapshot);
				let consultants = [];
				querySnapshot.forEach((doc) => {
					consultants.push(doc.data());
					// doc.data() is never undefined for query doc snapshots
					console.log(doc.id, " => ", doc.data());
				});
				dispatch({
					type: "FETCH_CONSULTING_DATA_SUCCESS",
					payload: consultants,
				});

				// (data) => {
			})
			.catch((err) => {
				dispatch({ type: "FETCH_CONSULTING_DATA_ERROR", payload: err });
			});
	};
};
