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
		case value:
			break;
		case value:
			break;
		case value:
			break;

		default:
			break;
	}
};

export default consultingReducer;
