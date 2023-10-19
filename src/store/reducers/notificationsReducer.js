const initState = {
	notifications: null,
	notificationError: false,
	notificationStatus: false,
};

const notificationReducer = (state = initState, action) => {
	switch (action.type) {
		case "GET_USER_NOTIFICATIONS_SUCCESS":
			//   console.log("meal created", action.mealPlan);
			return {
				...state,
				notifications: action.payload,
			};
		case "GET_USER_NOTIFICATIONS__ERROR":
			//   console.log("meal created", action.mealPlan);
			return {
				...state,
				notificationError: "something went wrong",
			};
		case "SET_NOTIFICATIONS_STATUS":
			//   console.log("meal created", action.mealPlan);
			return {
				...state,
				notificationStatus: action.payload,
			};
		default:
			return state;
	}
};

export default notificationReducer;
