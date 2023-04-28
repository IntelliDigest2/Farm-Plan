const initState = {
	authError: null,
	loadingSignUp: "",
	signUpError: "",
};

const consultantAuthReducer = (state = initState, action) => {
	switch (action.type) {
		case "LOGIN_CONSULTANT_ERROR":
			console.log("login error");
			return {
				...state,
				authError: "Login failed",
			};
		case "LOGIN_CONSULTANT_SUCCESS":
			console.log("login success");
			return {
				...state,
				authError: null,
			};
		case "CONSULTANT_SIGNUP_SUCCESS":
			console.log("signup success");
			return {
				...state,
				loadingSignUp: false,
			};
		case "CONSULTANT_SIGNUP_ERROR":
			console.log("consultatn sign error");
			return {
				...state,
				loadingSignUp: false,
				authError: action.payload.message,
			};

		default:
			return state;
	}
};

export default consultantAuthReducer;
