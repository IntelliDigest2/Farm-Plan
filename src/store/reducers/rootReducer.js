import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";
import mapReducer from "./mapReducer";
import dataReducer from "./dataReducer";
import mealPlanReducer from "./mealPlanReducer";

//fireStoreReducer is a premade reducer for syncing firestore data with state in the background.

const rootReducer = combineReducers({
  auth: authReducer,
  map: mapReducer,
  data: dataReducer,
  mealPlan: mealPlanReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
