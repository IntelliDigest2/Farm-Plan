import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const initState = {
	authError: null,
	chatError: null,
	produce: [],
	purchaseInfoFarm: [],
	consultantData: "",
	consultantDataError: null,
	userChats: [],
	chatMessages: [],
	newMessage: "",
	newMessageError: null,
	loginError: null,
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
		case "LOGIN_CONSULTANT_SUCCESS":
			console.log("login success");
			return {
				...state,
				loginError: false,
			};
		case "LOGIN_CONSULTANT_ERROR":
			console.log("login error");
			return {
				...state,
				loginError: "Login failed",
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

		default:
			return state;
	}
};

export default consultantReducer;
