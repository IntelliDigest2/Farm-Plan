const initState = {
	authError: null,
	consultingData: "",
};

const consultingReducer = (state = initState, action) => {
	switch (action.type) {
		case "FETCH_CONSULTING_DATA":
			return {
				...state,
				consultingData: action.payload,
			};

			break;

		default:
			break;
	}
};

export default consultingReducer;
