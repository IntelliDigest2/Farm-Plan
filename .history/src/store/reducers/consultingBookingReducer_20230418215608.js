const initState = {
	bookingPurchase: [],
	bookingPurchaseError: null,
	purchaseStatusChangeError: null,
	purchaseStatusChangeLoading: false,
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
		case "CHANGE_PURCHASE_STATUS_SUCCESS":
			console.log("consulting data success", action.payload);
			return {
				...state,
				purchaseStatusChangeLoading: false,
			};
		case "CHANGE_PURCHASE_STATUS_FAILED":
			console.log("consulting data error", action.payload);
			return {
				...state,
				purchaseStatusChangeLoading: false,
				bookingPurchaseError: action.payload,
			};
		case "CHANGE_PURCHASE_STATUS_LOADING":
			console.log("consulting data error", action.payload);
			return {
				...state,
				purchaseStatusChangeLoading: true,
			};

		default:
			return state;
	}
};

export default consultingBookingReducer;
