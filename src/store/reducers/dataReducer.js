const initState = {
  authError: null,
  getData: [],
  purchaseData: [],
  purchaseDataRes: [],
  salesData: [],
  rentData: [],
  SelectedRecipe: [],
  otherMeals: [],
  unverifiedUsers: [],
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
    case "UPDATE_MAP_DATA_SUCCESS":
      console.log("update mapData success");
      return {
        ...state,
        getData: action.payload,
        authError: null,
      };
    case "UPDATE_MAP_DATA_ERROR":
      console.log("update mapData error " + action.err.message);
      return {
        ...state,
        authError: "Get failed",
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
    case "EDIT_FARMER_SUPPLIER_STATUS":
      console.log("succesfully editted farmer supplier status", action.payload);
      return {
        ...state,
        authError: null,
      };
    case "EDIT_FARMER_SUPPLIER_STATUS_ERROR":
      console.log("error, couldn't edit farmer supplier status", action.err);
      return {
        ...state,
        authError: "edit status failed",
      };
    case "GET_SALES_DATA_ERROR":
      console.log("get sales item error " + action.err.message);
      return {
        ...state,
        authError: "Get failed",
      };
    case "GET_SALES_DATA":
      console.log("get sales item success", action.payload);
      return {
        ...state,
        salesData: action.payload,
        authError: null,
      };

    case "GET_RENT_DATA_ERROR":
      console.log("get rent item error " + action.err.message);
      return {
        ...state,
        authError: "Get failed",
      };
    case "GET_RENT_DATA":
      console.log("get rent item success", action.payload);
      return {
        ...state,
        rentData: action.payload,
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

    case "SET_SELECTED_RECIPE_ERROR":
      console.log("selected recipe error " + action.err.message);
      return {
        ...state,
        authError: "set failed",
      };
    case "SET_SELECTED_RECIPE":
      console.log("set recipe success", action.payload);
      return {
        ...state,
        SelectedRecipe: action.payload,
        authError: null,
      };

    case "ADD_OTHER_MEALS_ERROR":
      console.log("add other meals error " + action.err.message);
      return {
        ...state,
        authError: "set failed",
      };
    case "ADD_OTHER_MEALS":
      console.log("add other meals success", action.payload);
      return {
        ...state,
        authError: null,
      };

    case "ADD_TO_SALES_ERROR":
      console.log("add item to sales" + action.err.message);
      return {
        ...state,
        authError: "set failed",
      };
    case "ADD_TO_SALES":
      console.log("add add items to sales success", action.payload);
      return {
        ...state,
        authError: null,
      };
    case "GET_OTHER_MEALS_ERROR":
      console.log("fetch other meals error " + action.err.message);
      return {
        ...state,
        authError: "fetch other meals failed",
      };
    case "GET_OTHER_MEALS":
      console.log("fetch other meals in plan success", action.payload);
      return {
        ...state,
        otherMeals: action.payload,
        authError: null,
      };

    case "GET_UNVERIFIED_USERS_ERROR":
      console.log("fetch unverified users error " + action.err.message);
      return {
        ...state,
        authError: "fetch unverified users failed",
      };
    case "GET_UNVERIFIED_USERS":
      console.log("fetch unverified user success", action.payload);
      return {
        ...state,
        unverifiedUsers: action.payload,
        authError: null,
      };

    default:
      return state;
  }
};

export default dataReducer;
