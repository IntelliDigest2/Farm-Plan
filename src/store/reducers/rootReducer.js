import authReducer from "./authReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import mapReducer from "./mapReducer";
import dataReducer from "./dataReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  map: mapReducer,
  data: dataReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;