import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";
import mapReducer from "./mapReducer";
import dataReducer from "./dataReducer";
import mealPlanReducer from "./mealPlanReducer";
import mealPlannerReducer from "./mealPlannerReducer";
import farmReducer from "./farmReducer";
import shopData from "./shopReducer";
import restaurantReducer from "./restaurantReducer";
import supplierReducer from "./supplierReducer";

import consultantReducer from "./consultantReducer";
import consultantAuthReducer from "./consultantAuthReducer";
import consultingReducer from "./consultingReducer";
import consultingBookingReducer from "./consultingBookingReducer";

//fireStoreReducer is a premade reducer for syncing firestore data with state in the background.

const rootReducer = combineReducers({
	auth: authReducer,
	map: mapReducer,
	data: dataReducer,
	mealPlan: mealPlanReducer,
	mealPlanner: mealPlannerReducer,
	farmData: farmReducer,
	shopData: shopData,
	restaurant: restaurantReducer,
	supplier: supplierReducer,
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	consultantState: consultantReducer,
	consultingState: consultingReducer,
	consultantAuth: consultantAuthReducer,
	bookingPurchaseState: consultingBookingReducer,
});

export default rootReducer;
