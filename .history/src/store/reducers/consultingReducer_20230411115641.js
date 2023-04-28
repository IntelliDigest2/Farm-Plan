const initState = {
	authError: null,
	consultingData: [],
};

const consultingReducer = (state = initState, action) => {
	switch (action.type) {
		case "FETCH_CONSULTING_DATA_SUCCESS":
			return {
				...state,
				consultingData: action.payload,
			};

		case "FETCH_CONSULTING_DATA_ERROR":
			return {
				...state,
				consultingData: action.payload,
			};

		default:
			return state;
	}
};

export default consultingReducer;
