import axios from "axios";

function createChat(uid, userName, consultantId, consultantName) {
	console.log(
		uid,
		userName,
		consultantId,
		consultantName,
		`these are the information we want to send to the chat`
	);
	try {
		axios.post("http://localhost:3001/api/chats/newChat", {
			user1: uid,
			user2: consultantId,
			userName: userName,
			consultantName: consultantName,
		});
	} catch (err) {
		console.log(err);
	}
}

export const changePurchaseStatus = (
	bookingId,
	consultantId,
	consultantName,
	eventType
) => {
	console.log(bookingId, consultantId, consultantName, eventType);
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		var uid;
		switch (profile.type) {
			case "business_admin":
				uid = authUID;
				break;
			case "business_sub":
				uid = profile.admin;
				break;
			case "academic_admin":
				uid = authUID;
				break;
			case "academic_sub":
				uid = profile.admin;
				break;
			case "household_admin":
				uid = authUID;
				break;
			case "household_sub":
				uid = profile.admin;
				break;
			default:
				uid = authUID;
				break;
		}
		// dispatch({ type: "CHANGE_PURCHASE_STATUS_LOADING" });
		// console.log(bookingId, consultantId, consultantName, eventType);
		// getFirestore()
		// 	.collection("marketplace")
		// 	.doc(uid)
		// 	.collection("bookings")
		// 	.doc(bookingId)
		// 	.set({ status: "completed" }, { merge: true })
		// 	.then((result) => {
		// 		dispatch({ type: "CHANGE_PURCHASE_STATUS_SUCCESS", payload: result });

		if (eventType === "Chat") {
			createChat(
				uid,
				`${profile.firstName} ${profile.lastName}`,
				consultantId,
				consultantName
			);
		}
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 		dispatch({ type: "CHANGE_PURCHASE_STATUS_ERROR", err });
		// 	});
	};
};

export const getConsultingBookingsForPurchase = (data) => {
	return (dispatch, getState, { getFirestore }) => {
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		var uid;
		switch (profile.type) {
			case "business_admin":
				uid = authUID;
				break;
			case "business_sub":
				uid = profile.admin;
				break;
			case "academic_admin":
				uid = authUID;
				break;
			case "academic_sub":
				uid = profile.admin;
				break;
			case "household_admin":
				uid = authUID;
				break;
			case "household_sub":
				uid = profile.admin;
				break;
			default:
				uid = authUID;
				break;
		}

		getFirestore()
			.collection("marketplace")
			.doc(uid)
			.collection("bookings")
			// .where("status", "==", "pending")
			.onSnapshot(
				(doc) => {
					// dispatch({
					// 	type: "SET_FETCHING",
					// 	payload: true,
					// });
					let bookings = [];
					doc.forEach((doc) => {
						bookings.push({ booking: doc.data(), bookingId: doc.id });
					});

					dispatch({
						type: "FETCH_PURCHASE_BOOKING_SUCCESS",
						payload: bookings,
					});
				},
				(err) => {
					console.log(err);
					dispatch({ type: "FETCH_PURCHASE_BOOKING__ERROR", payload: err });
				}
			);
	};
};
