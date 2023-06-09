import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";
import mapReducer from "./mapReducer";
import dataReducer from "./dataReducer";
import mealPlanReducer from "./mealPlanReducer";
import mealPlannerReducer from "./mealPlannerReducer";
import farmReducer from "./farmReducer";
import consultantReducer from "./consultantReducer";

//fireStoreReducer is a premade reducer for syncing firestore data with state in the background.

const rootReducer = combineReducers({
	auth: authReducer,
	map: mapReducer,
	data: dataReducer,
	mealPlan: mealPlanReducer,
	mealPlanner: mealPlannerReducer,
	farmData: farmReducer,
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	consultantData: consultantReducer,
});

export default rootReducer;
