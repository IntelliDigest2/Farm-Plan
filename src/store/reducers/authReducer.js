const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("login error");
      return {
        ...state,
        authError: "Login failed",
      };
    case "LOGIN_SUCCESS":
      console.log("login success");
      return {
        ...state,
        authError: null,
      };
    case "SIGNOUT_SUCCESS":
      console.log("signout success");
      return state;
    case "SIGNUP_SUCCESS":
      console.log("signup success");
      return {
        ...state,
        authError: null,
      };
    case "SIGNUP_ERROR":
      return {
        ...state,
        authError: action.err.message,
      };
    case "CHANGE_ERROR":
      console.log("change password error");
      return {
        ...state,
        authError: "Changing password failed",
      };
    case "CHANGE_SUCCESS":
      console.log("change password success");
      return {
        ...state,
        authError: null,
      };
    case "RESET_ERROR":
      console.log("reset password error");
      return {
        ...state,
        authError: "Resetting password failed",
      };
    case "RESET_SUCCESS":
      console.log("reset password success");
      return {
        ...state,
        authError: null,
      };
    default:
      return state;
  }
};

export default authReducer;
