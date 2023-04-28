import axios from "axios";

function createChat(userId, consultantId) {
	axios.post("/api/chats", {
		user1: userId,
		user2: consultantId,
	});
}

export const editBookingPurchaseStatus = (
	bookingId,
	eventType,
	userId,
	consultantId
) => {
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

		getFirestore()
			.collection("marketplace")
			.doc(uid)
			.collection("bookings")
			.doc(bookingId)
			.set({ status: "completed" }, { merge: true })
			.then((result) => {
				dispatch({ type: "EDIT_PURCHASE_STATUS", payload: result });
				if (eventType === "Chat") {
					createChat(userId, consultantId);
				}
			})
			.catch((err) => {
				dispatch({ type: "EDIT_PURCHASE_STATUS_ERROR", err });
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
