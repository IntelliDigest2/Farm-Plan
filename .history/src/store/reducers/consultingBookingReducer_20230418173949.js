const initState = {
	bookingPurchase: [],
	bookingPurchaseError: null,
};

const consultingBookingReducer = (state = initState, action) => {
	switch (action.type) {
		case "FETCH_PURCHASE_BOOKING_SUCCESS":
			console.log(
				"consulting data success",
				action.payload,
				`these are the bookings`
			);
			return {
				...state,
				bookingPurchase: action.payload,
			};

		case "FETCH_PURCHASE_BOOKING__ERROR":
			console.log("consulting data error", action.payload);
			return {
				...state,
				bookingPurchaseError: action.payload,
			};

		default:
			return state;
	}
};

export default consultingBookingReducer;
