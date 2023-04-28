import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const consultingReducer = {
	firebase: firebaseReducer,
	firestore: firestoreReducer,
};

// switch (action.type) {
//   case "LOGIN_CONSULTANT_ERROR":
//     console.log("login error");
//     return {
//       ...state,
//       authError: "Login failed",
//     };
//   case "LOGIN_CONSULTANT_SUCCESS":
//     console.log("login success");
//     return {
//       ...state,
//       authError: null,
//     };

//   default:
//     return state;
// }

export default consultingReducer;
