export const fetchConsultantData = (consultantExpertise, consultationDate) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		console.log(consultantExpertise, consultationDate);
		getFirestore()
			.collection("consultants")
			.where("expertise", "==", `${consultantExpertise}`)
			.where("eventDaysArray", "array-contains", `${consultationDate}`)
			.onSnapshot(
				(doc) => {
					let consultants = [];
					doc.forEach((doc) => {
						consultants.push(doc.data());
						// doc.data() is never undefined for query doc snapshots
						console.log(doc.id, " => ", doc.data());
					});
					console.log("Current data: ", data);
					dispatch({
						type: "SET_FETCHING",
						payload: true,
					});
				},
				(error) => {
					console.log(error);
					dispatch({
						type: "FETCH_CONSULTING_DATA_SUCCESS",
						payload: consultants,
					});
				}
			);
		// .then((querySnapshot) => {
		// 	console.log(querySnapshot);
		// 	dispatch({
		// 		type: "SET_FETCHING",
		// 		payload: true,
		// 	});
		// 	let consultants = [];
		// 	querySnapshot.forEach((doc) => {
		// 		consultants.push(doc.data());
		// 		// doc.data() is never undefined for query doc snapshots
		// 		console.log(doc.id, " => ", doc.data());
		// 	});
		// 	dispatch({
		// 		type: "FETCH_CONSULTING_DATA_SUCCESS",
		// 		payload: consultants,
		// 	});
		// })
		// .catch((err) => {
		// 	dispatch({ type: "FETCH_CONSULTING_DATA_ERROR", payload: err });
		// });
	};
};
