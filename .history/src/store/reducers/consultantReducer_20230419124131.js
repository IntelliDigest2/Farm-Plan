import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const initState = {
	signUpError: null,
	chatError: null,
	produce: [],
	purchaseInfoFarm: [],
	consultantData: "",
	consultantDataError: null,
	userChats: [],
	chatMessages: [],
	newMessage: "",
	newMessageError: null,
	consultantLogin: null,
	eventAdded: "",
	eventAddedError: null,
	eventAddLoading: false,

	acceptBookingLoad: false,
	acceptBookingError: "",
	cancelBookingError: "",
	cancelBookingLoad: false,
};

// const consultingReducer = {
// 	firebase: firebaseReducer,
// 	firestore: firestoreReducer,
// };

const consultantReducer = (state = initState, action) => {
	switch (action.type) {
		case "FETCH_DATA":
			// console.log("login error");
			return {
				...state,
				consultantData: action.payload,
			};

		case "FETCH_CONSULTANT_DATA_SUCCESS":
			console.log("fetch success");
			return {
				...state,
				consultantData: action.payload,
			};
		case "FETCH_CONSULTANT_DATA_ERROR":
			console.log("fetch error");
			return {
				...state,
				consultantDataError: action.payload,
			};
		case "FETCH_USER_CHATS_SUCCESS":
			console.log("fetch chats success");
			return {
				...state,
				userChats: action.payload,
			};
		case "FETCH_USER_CHATS_ERROR":
			console.log("fetch chat error");
			return {
				...state,
				chatError: action.payload,
			};
		case "FETCH_CHAT_MESSAGES_SUCCESS":
			console.log("fetch messages success");
			return {
				...state,
				chatMessages: action.payload,
			};
		case "FETCH_CHAT_MESSAGES_ERROR":
			console.log("fetch messages error");
			return {
				...state,
				chatError: action.payload,
			};
		case "SET_DEFAULT_ERROR":
			console.log("error set to default");
			return {
				...state,
				[`${action.payload}`]: null,
			};
		case "EVENT_ADD_SUCCESS":
			console.log("add event successfull", action.payload);
			return {
				...state,
				eventAdded: true,
				eventAddLoading: false,
			};
		case "EVENT_ADD_ERROR":
			console.log("error add event");
			return {
				...state,
				eventAddedError: action.payload,
				eventAddLoading: false,
			};
		case "EVENT_ADD_LOADING":
			console.log("loading");
			return {
				...state,
				eventAddLoading: true,
			};
		case "ACCEPT_BOOKING_LOAD":
			console.log("loading");
			return {
				...state,
				acceptBookingLoad: true,
			};
		case "ACCEPT_BOOKING_SUCCESS":
			console.log("loading");
			return {
				...state,
				acceptBookingLoad: false,
			};
		case "ACCEPT_BOOKING_FAILED":
			console.log("loading");
			return {
				...state,
				acceptBookingError: action.payload,
				acceptBookingLoad: false,
			};

		case "CANCEL_BOOKING_SUCCESS":
			console.log("loading");
			return {
				...state,

				cancelBookingLoad: false,
			};
		case "CANCEL_BOOKING_FAILED":
			console.log("loading");
			return {
				...state,
				cancelBookingError: action.payload,
				cancelBookingLoad: false,
			};
		case "CANCEL_BOOKING_LOAD":
			console.log("loading");
			return {
				...state,
				cancelBookingLoad: true,
			};

		default:
			return state;
	}
};

export default consultantReducer;
