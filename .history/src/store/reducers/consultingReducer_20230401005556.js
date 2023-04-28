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

const consultingReducer = (state = initState, action) => {
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

		default:
			return state;
	}
};

export default consultingReducer;
