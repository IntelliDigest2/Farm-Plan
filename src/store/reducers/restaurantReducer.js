const initState = {
    authError: null,
    res: [],
    orderRes: [],
    savedMenus: [],
  };

  const restaurantReducer = (state = initState, action) => {
    switch (action.type) {
      //#region calendar
      case "GET_RESTAURANT":
        console.log("restaurant data", action.payload);
        return {
            ...state,
            res: action.payload,
            authError: null,
          };
      case "GET_RESTAURANT_ERROR":
        console.log("error, restaurant data not fetched", action.err);
        return {
          ...state,
          authError: "get restaurant failed",
        };

        case "GET_ORDER_INFO_RES":
        console.log("restaurant order data", action.payload);
        return {
            ...state,
            orderRes: action.payload,
            authError: null,
          };
      case "GET_ORDER_INFO_RES_ERROR":
        console.log("error, restaurant order data not fetched", action.err);
        return {
          ...state,
          authError: "get restaurant orders failed",
        };

        case "SEND_TO_RESTAURANT":
        console.log("sent to restaurant");
        return {
          ...state,
          authError: null,
        };
      case "SEND_TO_RESTAURANT_ERROR":
        console.log("error, couldn't send to restaurant", action.err);
        return {
          ...state,
          authError: "send to restaurant failed",
        };

        case "SEND_ORDER_TO_USER":
        console.log("sent order to user");
        return {
          ...state,
          authError: null,
        };
      case "SEND_ORDER_TO_USER_ERROR":
        console.log("error, couldn't send order to user", action.err);
        return {
          ...state,
          authError: "send order to user failed",
        };

        case "EDIT_MENU_STATUS":
          console.log("status updated", action.payload);
          return {
            ...state,
            authError: null,
          };
        case "EDIT_MENU_STATUS_ERROR":
          console.log("error, couldn't update status", action.err);
          return {
            ...state,
            authError: "update status failed",
          };
      
      
      //#endregion

       //#region recipes
    case "CREATE_MENUS":
      console.log("menu saved", action.menu);
      return { 
        ...state,
        authError: null,
      };
    case "CREATE_MENUS_ERROR":
      console.log("error, menu not saved", action.err);
      return {
        ...state,
        authError: "Create recipe failed",
      };
    case "GET_MENUS":
      console.log("get menus success", action.payload);
      return {
        ...state,
        savedMenus: action.payload,
        authError: null,
      };
    case "GET_RECIPES_ERROR":
      console.log("error, couldn't fetch recipes", action.err);
      return {
        ...state,
        authError: "Get recipe failed",
      };
    case "DELETE_RECIPE":
      console.log("successfully deleted", action.recipe);
      return {
        ...state,
        authError: null,
      };
    case "DELETE_RECIPE_ERROR":
      console.log("error, couldn't delete meal", action.err);
      return {
        ...state,
        authError: "delete recipe failed",
      };
    //#endregion


      default:
        return state;
    }
  };
  
  export default restaurantReducer;
  