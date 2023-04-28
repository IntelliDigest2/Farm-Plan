const initState = {
	authError: null,
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
		case "SIGNUP_SUCCESS":
			console.log("login error");
			return {
				...state,
				authError: "Login failed",
			};
		case "SIGNUP_ERROR":
			console.log("login success");
			return {
				...state,
				authError: null,
			};

		default:
			return state;
	}
};

export default consultantAuthReducer;
