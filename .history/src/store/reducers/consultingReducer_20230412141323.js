const initState = {
	fetchingError: null,
	consultingData: null,
	isFetching: false,
};

const consultingReducer = (state = initState, action) => {
	switch (action.type) {
		case "FETCH_CONSULTING_DATA_SUCCESS":
			console.log("consulting data success", action.payload);
			return {
				...state,
				consultingData: action.payload,
			};

		case "FETCH_CONSULTING_DATA_ERROR":
			console.log("consulting data error");
			return {
				...state,
				fetchingError: action.payload,
			};

		default:
			return state;
	}
};

export default consultingReducer;
