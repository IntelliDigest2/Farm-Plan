import axios from "axios";

function createChat(userId, consultantId, profile) {
	console.log(userId, consultantId);
	axios.post("http://localhost:3001/api/chats/newChat", {
		user1: {
			userId: userId,
			userName: `${profile.firstName}${profile.lastName}`,
		},
		user2: { consultantId: consultantId, userName: "consultant" },
	});
}

export const changePurchaseStatus = (bookingId, eventType, consultantId) => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
		const profile = getState().firebase.profile;

		const authUID = getState().firebase.auth.uid;
		console.log(profile);

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
		dispatch({ type: "CHANGE_PURCHASE_STATUS_LOADING" });
		console.log(uid, consultantId);
		getFirestore()
			.collection("marketplace")
			.doc(uid)
			.collection("bookings")
			.doc(bookingId)
			.set({ status: "completed" }, { merge: true })
			.then((result) => {
				dispatch({ type: "CHANGE_PURCHASE_STATUS_SUCCESS", payload: result });
				console.log(eventType, "this is the eventType");
				if (eventType === "Chat") {
					// createChat(uid, consultantId, eventType);
				}
			})
			.catch((err) => {
				console.log(err);
				dispatch({ type: "CHANGE_PURCHASE_STATUS_ERROR", err });
			});
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
