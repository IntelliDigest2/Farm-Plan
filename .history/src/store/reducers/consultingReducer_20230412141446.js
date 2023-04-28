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
				isFetching: false,
			};

		case "FETCH_CONSULTING_DATA_ERROR":
			console.log("consulting data error");
			return {
				...state,
				fetchingError: action.payload,
			};
		case "SET_FETCHING":
			console.log("consulting data error");
			return {
				...state,
				isFetching: true,
			};

		default:
			return state;
	}
};

export default consultingReducer;
