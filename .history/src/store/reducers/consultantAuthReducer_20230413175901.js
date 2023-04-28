const initState = {
	authError: null,
	loadingSignUp: false,
	consultantSignUpError: "",
	consultantSignedUp: false,
	consultantLoggedIn: false,
	consultantLoggingError: null,
	loadingLogIn: false,
};

const consultantAuthReducer = (state = initState, action) => {
	switch (action.type) {
		case "LOGIN_CONSULTANT_ERROR":
			console.log("login error", action.payload);
			return {
				...state,
				consultantLoggingError: `something went wrong`,
				loadingLogIn: false,
			};
		case "LOGIN_CONSULTANT_SUCCESS":
			console.log("login successful", action.payload);

			return {
				...state,
				consultantLoggedIn: true,
				loadingLogIn: false,
			};
		case "LOGIN_CONSULTANT_LOADING":
			console.log("login successful", action.payload);

			return {
				...state,
				loadingLogIn: true,
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
		case "CONSULTANT_SIGNUP_LOADING":
			console.log("consultatn sign error");
			return {
				...state,
				loadingSignUp: false,
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
