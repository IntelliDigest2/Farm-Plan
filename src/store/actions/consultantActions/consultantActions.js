// for the email

import firebase from "firebase";
import axios from "axios";
const db = firebase.firestore();
const batch = db.batch();

export const createExample = (data) => {
	return (dispatch, getState, { getFirestore }, { getFirebase }) => {
		//create account for consultant through auth
		const firestore = getFirebase().firestore();
		const firebase = getFirebase();
		firebase
			.auth()
			.createUserWithEmailAndPassword(data.email, data.password)
			.then((resp) => {
				firestore.collection("consultants").doc(resp.user.uid).set({
					fullName: data.fullName,
					email: data.email,
					password: data.password,
				});
			});

		//async call
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
			case "farm_admin":
				uid = authUID;
				break;
			case "farm_sub":
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
			.collection("consultants")
			.add(data)
			.then(() => {
				dispatch({ type: "CREATE-DATA" });
			})
			.catch((err) => {
				dispatch({ type: "CREATE-DATA-ERROR" });
			});
	};
};

// Fetching consultant data
export const getUserData = () => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		getFirestore()
			.collection("consultants")
			.get()
			.then((snapshot) => {
				const data = [];
				snapshot.forEach((doc) => {
					data.push(doc.data());
				});
				dispatch({ type: "GET_DATA", payload: data });
			})
			.catch((err) => {
				dispatch({ type: "GET_DATA_ERROR", err });
			});
	};
};

//fetch consultant data

export const fetchConsultantInfo = (consultantId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		console.log(consultantId);
		getFirestore()
			.collection("consultants")
			.doc(consultantId)
			.onSnapshot(
				(doc) => {
					let data = doc.data();
					// console.log(
					// 	data,
					// 	`this is the data result gotten from fetching the consultant information`
					// );

					dispatch({ type: "FETCH_CONSULTANT_DATA_SUCCESS", payload: data });
				},
				(error) => {
					console.log(error);
					dispatch({ type: "FETCH_CONSULTANT_DATA_ERROR", payload: error });
				}
			);
	};
};

export const fetchConsultantCalendarInfo = (consultantId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// console.log(consultantId, `this is the consultantId that was passed`);

		let data = [];
		getFirestore()
			.collection("consultants")
			.doc(consultantId)
			.collection("calendarEvents")
			.onSnapshot(
				(querySnapshot) => {
					querySnapshot.forEach((doc) => {
						console.log(doc.id, " => ", doc.data()); // Log the document ID and data
						data.push({ eventId: doc.id, ...doc.data() });
					});
					console.log(data);
					// (doc) => {
					// 	// let data = doc.data();
					// 	// console.log(
					// 	// 	data,
					// 	// 	`this is the data result gotten from fetching the consultant information`
					// 	// );

					// 	console.log(doc);

					dispatch({
						type: "FETCH_CONSULTANT_CALENDAR_SUCCESS",
						payload: data,
					});
				},
				(error) => {
					console.log(error);
					dispatch({ type: "FETCH_CONSULTANT_CALENDAR_ERROR", payload: error });
				}
			);
	};
};

export const addConsultantEventToDatabase = (
	newEvent,
	consultantId,
	consultantInfo
) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		console.log(
			newEvent,
			consultantId,
			consultantInfo,
			`this is what we needed`
		);
		let date = newEvent.start.split("T")[0];
		// // let industry = industry;

		let arr = consultantInfo.services.filter(({ price, service }) => {
			return service === newEvent.eventType;
		});

		dispatch({ type: "EVENT_ADD_LOADING", payload: true });
		getFirestore()
			.collection("consultants")
			.doc(consultantId)
			.collection("calendarEvents")
			.add({
				...newEvent,
				date,
				price: arr[0].price,
				industry: consultantInfo.expertise,
				consultant: {
					id: consultantId,
					name: consultantInfo.fullName,
					experience: consultantInfo.experience,
					summary: consultantInfo.summary,
				},
			})
			// 	// .update({
			// 	// 	calendarEvents: firebase.firestore.FieldValue.arrayUnion(newEvent),
			// 	// 	eventDaysArray: firebase.firestore.FieldValue.arrayUnion(newEventDay),
			// 	// })
			.then((result) => {
				dispatch({ type: "EVENT_ADD_SUCCESS", payload: result });
			})
			.catch((err) => {
				dispatch({ type: "EVENT_ADD_ERROR", payload: err });
			});
	};
};

export const getUserChatsData = (userId) => {
	// console.log(userId);
	return (dispatch) => {
		axios
			.post(`http://localhost:3001/api/chats/getChats`, {
				userId: userId,
			})
			.then((result) => {
				let chats = result.data.data;
				// console.log(chats, "this is the chat from the db");
				dispatch({ type: "FETCH_USER_CHATS_SUCCESS", payload: chats });
			})
			.catch((err) => {
				console.log(err);
				dispatch({ type: "FETCH_USER_CHATS_ERROR", payload: err });
			});
	};
};
export const getChatMessages = (chatId) => {
	return (dispatch) => {
		axios
			.get(`http://localhost:3001/api/messages/${chatId}`)
			.then((result) => {
				dispatch({
					type: "FETCH_CHAT_MESSAGES_SUCCESS",
					payload: result.data.data,
				});
			})
			.catch((err) => {
				console.log(err);
				dispatch({ type: "FETCH_CHAT_MESSAGES_ERROR", payload: err });
			});
	};
};

export const setErrorToDefault = (errorName) => {
	return (dispatch) => {
		dispatch({ type: "SET_DEFAULT_ERROR", payload: errorName });
	};
};

//
//work on this
export const acceptBookingRequest = (event) => {
	// console.log(
	// 	event,
	// 	consultantId,
	// 	consultantName,
	// 	serviceCost,
	// 	`these are the params`
	// );

	// let batch = db.batch();
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		console.log(event);
		dispatch({
			type: "ACCEPT_BOOKING_LOAD",
		});
		getFirestore()
			.collection("consultants")
			.doc(event.consultant.id)
			.collection("calendarEvents")
			.doc(event.eventId)
			.update({ status: { ...event.status, requestAccepted: true } })
			.then((result) => {
				dispatch({
					type: "ACCEPT_BOOKING_SUCCESS",
				});
				getFirestore()
					.collection("marketplace")
					.doc(event.status.requesterId)
					.collection("bookings")
					.doc(event.eventId)
					.set({
						status: "pending",
						consultant: {
							consultantId: event.consultant.id,
							consultantName: event.consultant.name,
						},
						event: {
							start: event.start,
							end: event.end,
							description: event.description,
							price: event.price,
							eventType: event.eventType,
						},
					});
			})
			.catch((err) => {
				console.log(err);
				dispatch({
					type: "ACCEPT_BOOKING_FAILED",
					payload: err,
				});
			});
	};
};

export const cancelBookingRequest = (event) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: "CANCEL_BOOKING_LOAD",
		});
		// const batch = db.batch();

		let consultantRef = getFirestore()
			.collection("consultants")
			.doc(event.consultant.id)
			.collection("consultantEvents")
			.doc(event.eventId);

		//firestore transaction

		// .update({
		// 	calendarEvents: firebase.firestore.FieldValue.arrayRemove(event),
		// })
		// .then(() => {
		consultantRef
			.update({
				status: {
					requesterId: null,
					requestAccepted: false,
				},
			})
			.then(() => {
				dispatch({
					type: "CANCEL_BOOKING_SUCCESS",
				});
			})
			.catch((err) => {
				dispatch({
					type: "CANCEL_BOOKING_FAILED",
					payload: err,
				});
			});
	};
};

export const getBookingRequest = (consultantId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		let docArray = [];
		console.log(`it go to this place hold on a second`);
		getFirestore()
			.collection("consultants")
			.doc(consultantId)
			.collection("calendarEvents")
			.where("status.requestAccepted", "==", false)
			.where("status.requesterId", "!=", null)
			.onSnapshot(
				(querySnapshot) => {
					querySnapshot.forEach((doc) => {
						// Access the document data
						//   doc.push({id: })
						const data = { eventId: doc.id, ...doc.data() };
						docArray.push(data);
					});

					dispatch({
						type: "FETCH_REQUESTS_SUCCESS",
						payload: docArray,
					});
				},
				(error) => {
					console.log(error);
					dispatch({
						type: "FETCH_REQUESTS_SUCCESS",
						payload: docArray,
					});
				}
			);
	};
};
