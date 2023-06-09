const initState = {
	authError: null,
	loadingSignUp: "",
	consultantSignUpError: "",
	consultantSignedUp: false,
	consultantLoggedIn: false,
	consultantLoggingError: null,
};

const consultantAuthReducer = (state = initState, action) => {
	switch (action.type) {
		case "LOGIN_CONSULTANT_ERROR":
			console.log("login error");
			return {
				...state,
				consultantLoggingError: action.payload,
			};
		case "LOGIN_CONSULTANT_SUCCESS":
			console.log("login successful", action.payload);

			return {
				...state,
				consultantLoggedIn: true,
			};
		case "CONSULTANT_SIGNUP_SUCCESS":
			console.log("signup success");
			return {
				...state,
				loadingSignUp: false,
				consultantSignedUp: true,
			};
		case "CONSULTANT_SIGNUP_ERROR":
			console.log("consultatn sign error");
			return {
				...state,
				loadingSignUp: false,
				authError: action.payload.message,
			};
		case "SET_DEFAULT_ERROR":
			console.log("error set to default");
			return {
				...state,
				[`${action.payload}`]: null,
			};

		default:
			return state;
	}
};

export default consultantAuthReducer;
