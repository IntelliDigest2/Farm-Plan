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
    case "CREATE_SUBACCOUNT":
      console.log("subaccount success");
      return {
        ...state,
        authError: null,
      };
    case "CREATE_SUBACCOUNT_ERROR":
      return {
        ...state,
        authError: action.err.message,
      };
    case "DELETE_SUBACCOUNT":
      console.log("delete subaccount success");
      return {
        ...state,
        authError: null,
      };
    case "DELETE_SUBACCOUNT_ERROR":
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
    case "CHANGE_EMAIL_ERROR":
      console.log("change email error");
      return {
        ...state,
        authError: "Changing email failed",
      };
    case "CHANGE_EMAIL_SUCCESS":
      console.log("change email success");
      return {
        ...state,
        authError: null,
      };
    case "CHANGE_PROFILE_ERROR":
      console.log("change email error");
      return {
        ...state,
        authError: "Changing profile failed",
      };
    case "CHANGE_PROFILE_SUCCESS":
      console.log("change profile success");
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
    case "SELLER_ERROR":
      console.log("change email error");
      return {
        ...state,
        authError: "Please accept the terms and conditions",
      };
    case "SELLER_SUCCESS":
      console.log("Successfully became a seller.");
      return {
        ...state,
        authError: null,
      };
    default:
      return state;
  }
};

export default authReducer;
