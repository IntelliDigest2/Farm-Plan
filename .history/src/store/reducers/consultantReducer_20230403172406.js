import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const initState = {
	authError: null,
	produce: [],
	purchaseInfoFarm: [],
	consultantData: [],
};

// const consultingReducer = {
// 	firebase: firebaseReducer,
// 	firestore: firestoreReducer,
// };

const consultantReducer = (state = initState, action) => {
	switch (action.type) {
		case "LOGIN_CONSULTANT_ERROR":
			console.log("login error");
			return {
				...state,
				authError: "Login failed",
			};
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
				authError: null,
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
				authError: action.payload,
			};

		default:
			return state;
	}
};

export default consultantReducer;
