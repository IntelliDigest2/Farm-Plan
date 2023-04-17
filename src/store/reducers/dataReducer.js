const initState = {
  authError: null,
  getData: [],
  purchaseData: [],
  purchaseDataRes: [],
};

const dataReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_DATA_ERROR":
      console.log("create data error " + action.err.message);
      return {
        ...state,
        authError: "Create failed",
      };
    case "CREATE_DATA":
      console.log("create data success");
      return {
        ...state,
        authError: null,
      };
    case "GET_DATA_ERROR":
      console.log("get data error " + action.err.message);
      return {
        ...state,
        authError: "Get failed",
      };
    case "GET_DATA":
      console.log("get data success");
      return {
        ...state,
        getData: action.payload,
        authError: null,
      };
      case "SEND_TO_FARMER":
        console.log("sent to farmer");
        return {
          ...state,
          authError: null,
        };
      case "SEND_TO_FARMER_ERROR":
        console.log("error, couldn't send to farmer collection", action.err);
        return {
          ...state,
          authError: "send to farmer failed",
        };
        case "SEND_TO_RES":
        // console.log("sent to user", action.data);
        return {
          ...state,
          authError: null,
        };
      case "SEND_TO_RES_ERROR":
        console.log("error, couldn't send to restaurant collection", action.err);
        return {
          ...state,
          authError: "send to restaurant failed",
        };
      case "GET_PURCHASE_DATA_ERROR":
      console.log("get purchase error " + action.err.message);
      return {
        ...state,
        authError: "Get failed",
      };
    case "GET_PURCHASE_DATA":
      console.log("get purchase success", action.payload);
      return {
        ...state,
        purchaseData: action.payload,
        authError: null,
      };
      case "GET_PURCHASE_DATA_RES_ERROR":
      console.log("get purchase res error " + action.err.message);
      return {
        ...state,
        authError: "Get failed",
      };
    case "GET_PURCHASE_DATA_RES":
      console.log("get purchase res success", action.payload);
      return {
        ...state,
        purchaseDataRes: action.payload,
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
      console.log("signup error");
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

export default dataReducer;
