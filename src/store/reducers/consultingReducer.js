const initState = {
	fetchingError: null,
	consultingData: null,
	// isFetching: false,
	isBooking: false,
	otherBookings: null,
	otherBookingsError: "",
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
			console.log("consulting data error", action.payload);
			return {
				...state,
				fetchingError: action.payload,
			};
		// case "SET_FETCHING":
		// 	console.log("data fetched");
		// 	return {
		// 		...state,
		// 		isFetching: true,
		// 	};
		// case "BOOKING_CONSULTANT":
		// 	console.log("data fetched");
		// 	return {
		// 		...state,
		// 		isBooking: true,
		// 	};
		// case "BOOKING_CONSULTANT_SUCCESS":
		// 	console.log("data fetched");
		// 	return {
		// 		...state,
		// 		isBooking: false,
		// 	};
		// case "BOOKING_CONSULTANT_FAILED":
		// 	console.log("data fetched");
		// 	return {
		// 		...state,
		// 		isBooking: false,
		// 	};
		case "GET_OTHER_CONSULTING_BOOKINGS_SUCCESS":
			console.log("data fetched", action.payload);
			return {
				...state,
				otherBookings: action.payload,
				otherBookingsError: "",
			};
		case "GET_OTHER_CONSULTING_BOOKINGS_ERROR":
			console.log("data fetched");
			return {
				...state,
				otherBookingsError: action.payload,
			};

		default:
			return state;
	}
};

export default consultingReducer;
