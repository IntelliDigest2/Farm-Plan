// for the email

import firebase from "firebase";
import axios from "axios";
import { fs } from "../../../config/fbConfig";
const db = firebase.firestore();

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

const setUsersCollection = (buildingFunction) => {
	console.log(buildingFunction === "Farm", `checks if this is true`);
	let userCollection;
	switch (buildingFunction) {
		case "Farm":
			userCollection = "farm_users";
			break;
		case "Households":
			userCollection = "household_users";
			break;
		case "Restaurants":
			userCollection = "restaurant_users";
			break;
		case "Consultant":
			userCollection = "consultants";
			break;
		case "Offices":
			userCollection = "office_users";
			break;
		case "Hotels":
			userCollection = "hotel_users";
			break;
		case "Shop":
			userCollection = "shop_users";
			break;

		default:
			userCollection = "supply_users";
	}
	console.log(userCollection, `the bottom side`);

	return userCollection;
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
		// console.log(consultantId);
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

		getFirestore()
			.collection("consultants")
			.doc(consultantId)
			.collection("calendarEvents")
			.onSnapshot(
				(querySnapshot) => {
					let data = [];
					querySnapshot.forEach((doc) => {
						// console.log(doc.id, " => ", doc.data()); // Log the document ID and data
						data.push({ eventId: doc.id, ...doc.data() });
					});
					// console.log(data);
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
	consultantInfo,
	currency
) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		let date = newEvent.start.split("T")[0];

		// // let industry = industry;

		let arr = consultantInfo.services.filter(({ price, service }) => {
			return service === newEvent.eventType;
		});

		// dispatch({ type: "EVENT_ADD_LOADING", payload: true });
		return getFirestore()
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
				eventCompleted: false,
				currency,
			});
		// .update({
		// 	calendarEvents: firebase.firestore.FieldValue.arrayUnion(newEvent),
		// 	eventDaysArray: firebase.firestore.FieldValue.arrayUnion(newEventDay),
		// })
		// .then((result) => {
		// 	dispatch({ type: "EVENT_ADD_SUCCESS", payload: result });
		// })
		// .catch((err) => {
		// 	dispatch({ type: "EVENT_ADD_ERROR", payload: err });
		// });
	};
};

export const getUserChatsData = (userId) => {
	// console.log(userId);
	return (dispatch) => {
		axios
			.post(
				`https://itracker-development.nw.r.appspot.com/api/chats/getChats`,
				// "http://localhost:3001/api/chats/getChats",
				{
					userId: userId,
				}
			)
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
			.get(
				`https://itracker-development.nw.r.appspot.com/api/messages/${chatId}`
			)
			// .get(`http://localhost:3001/api/messages/${chatId}`)

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

//TODO NOTIFICATION
export const acceptBookingRequest = (event) => {
	// console.log(
	// 	event,
	// 	consultantId,
	// 	consultantName,
	// 	serviceCost,
	// 	`these are the params`
	// );

	// let batch = db.batch();
	const batch = db.batch();
	// return (dispatch, getState, { getFirebase, getFirestore }) => {
	// console.log(event);

	let consultantRef = db
		.collection("consultants")
		.doc(event.consultant.id)
		.collection("calendarEvents")
		.doc(event.eventId);

	let consultRef = db
		.collection("marketplace")
		.doc(event.status.requesterId)
		.collection("bookings")
		.doc(event.eventId);

	let notification = {
		notification_type: "consultation_acceptance",
		created_at: new Date(),
	};

	let consulteeCollection;

	consulteeCollection = setUsersCollection(event.status.requesterAccountType);

	let consulteeNotificationRef = db
		.collection(consulteeCollection)
		.doc(event.status.requesterId)
		.collection("notifications")
		.doc();

	console.log(
		event.status.requesterAccountType,
		`this is the account it is comming from`
	);

	console.log(consulteeCollection, `this is the consultee collection`);
	console.log(event.status.requesterId, `this is the requester Id `);

	batch.update(consultantRef, {
		status: { ...event.status, requestAccepted: true },
	});

	//this will set the consultation booking in the "booking" collection  for the person  who requested the consultation
	batch.set(consultRef, {
		status: "pending",
		created_at: new Date(),
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
			industry: event.industry,
		},
		eventCompleted: false,
	});

	batch.set(consulteeNotificationRef, notification);

	return batch.commit();
	// getFirestore()
	// 	.collection("consultants")
	// 	.doc(event.consultant.id)
	// 	.collection("calendarEvents")
	// 	.doc(event.eventId)
	// 	.update({ status: { ...event.status, requestAccepted: true } })
	// 	.then((result) => {
	// 		dispatch({
	// 			type: "ACCEPT_BOOKING_SUCCESS",
	// 		});
	// 		getFirestore()
	// 			.collection("marketplace")
	// 			.doc(event.status.requesterId)
	// 			.collection("bookings")
	// 			.doc(event.eventId)
	// 			.set({
	// 				status: "pending",
	// 				consultant: {
	// 					consultantId: event.consultant.id,
	// 					consultantName: event.consultant.name,
	// 				},
	// 				event: {
	// 					start: event.start,
	// 					end: event.end,
	// 					description: event.description,
	// 					price: event.price,
	// 					eventType: event.eventType,
	// 				},
	// 			});
	// 	})

	// };
};

export const cancelBookingRequest = (event) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		dispatch({
			type: "CANCEL_BOOKING_LOAD",
		});
		// const batch = db.batch();

		let notification = {
			notification_type: "consultation_rejection",
			created_at: new Date(),
		};

		const batch = db.batch();

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

		let consulteeCollection;

		consulteeCollection = setUsersCollection(event.status.requesterAccountType);

		let consulteeNotificationRef = db
			.collection(consulteeCollection)
			.doc(event.status.requesterId)
			.collection("notifications")
			.doc();

		// consultantRef
		batch.update(consultantRef, {
			status: {
				requesterId: null,
				requestAccepted: false,
			},
		});
		// .then(() => {
		// 	dispatch({
		// 		type: "CANCEL_BOOKING_SUCCESS",
		// 	});
		// })
		// .catch((err) => {
		// 	dispatch({
		// 		type: "CANCEL_BOOKING_FAILED",
		// 		payload: err,
		// 	});
		// });

		batch.set(consulteeNotificationRef, notification);

		return batch.commit();
	};
};

export const getBookingRequest = (consultantId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// console.log(`it go to this place hold on a second`);
		getFirestore()
			.collection("consultants")
			.doc(consultantId)
			.collection("calendarEvents")
			.where("status.requestAccepted", "==", false)
			.where("status.requesterId", "!=", null)
			.onSnapshot(
				(querySnapshot) => {
					let docArray = [];
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
						type: "FETCH_REQUESTS_ERROR",
						payload: error,
					});
				}
			);
	};
};

export const fetchOtherBookings = (userId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		getFirestore()
			.collection("consultants")
			.doc(userId)
			.collection("calendarEvents")
			.where("eventType", "!=", "Chat")
			.where("booked", "==", true)
			.where("eventCompleted", "==", false)
			.onSnapshot(
				(querySnapshot) => {
					let otherBookings = [];
					querySnapshot.forEach((doc) => {
						// console.log(doc.data());
						otherBookings.push({ id: doc.id, ...doc.data() });
					});
					// console.log(otherBookings, `these are all the bookings`);

					dispatch({
						type: "GET_OTHER_BOOKINGS_SUCCESS",
						payload: otherBookings,
					});
				},
				(error) => {
					console.log(error);
					dispatch({
						type: "GET_OTHER_BOOKINGS_ERROR",
						payload: error,
					});
				}
			);
	};
};

export const fetchCompletedBookings = (userId) => {
	// console.log(`it reach here`);
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		getFirestore()
			.collection("consultants")
			.doc(userId)
			.collection("calendarEvents")
			// .where("eventType", "!=", "Chat")
			// .where("booked", "==", true)
			.where("eventCompleted", "==", true)
			.onSnapshot(
				(querySnapshot) => {
					let completedBookings = [];
					querySnapshot.forEach((doc) => {
						// console.log(doc.data());
						completedBookings.push({ id: doc.id, ...doc.data() });
					});
					// console.log(completedBookings, `these are the completed bookings`);

					dispatch({
						type: "GET_COMPLETED_BOOKINGS_SUCCESS",
						payload: completedBookings,
					});
				},
				(error) => {
					console.log(error);
					dispatch({
						type: "GET_COMPLETED_BOOKINGS_ERROR",
						payload: error,
					});
				}
			);
	};
};

export const fetchUserInfo = (userId) => {
	// return (dispatch, getState, { getFirebase, getFirestore }) => {
	return fs.collection("users").doc(userId).get();

	// };
};

export const getAgoraToken = (duration, uid, channel, role) => {
	// console.log(
	// 	"🚀 ~ file: consultantActions.js:435 ~ getAgoraToken ~ duration, userId, channel, isPublisher:",
	// 	duration,
	// 	uid,
	// 	channel,
	// 	role
	// );

	// return axios.post(`http://localhost:3001/api/rtctoken`, {
	return axios.post(
		`https://itracker-development.nw.r.appspot.com/api/rtctoken`,
		{
			duration: duration,
			uid: uid,
			channel: channel,
			role: role,
		}
	);
};
