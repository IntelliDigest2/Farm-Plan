const initState = {
    authError: null,
    shopItems: [],
    purchaseInfoFarm: [],
  };
  
  const shopReducer = (state = initState, action) => {
    switch (action.type) {
      //#region calendar
        case "CREATE_SHOP_ITEM":
        console.log("shop item added", action.payload);
        return {
          ...state,
          authError: null,
        };
        case "CREATE_SHOP_ITEM_ERROR":
        console.log("error, shop item not added", action.err);
        return {
          ...state,
          authError: "Create shop item failed",
        };

        case "GET_SHOP_ITEM":
        console.log("get shop items success", action.payload);
        return {
        ...state,
        shopItems: action.payload,
        authError: null,
        };
        case "GET_SHOP_ITEM_ERROR":
        console.log("error, couldn't fetch shop items", action.err);
        return {
            ...state,
            authError: "Get shop items failed",
        };
        case "EDIT_SHOP_ITEM":
        console.log("successfully edited", action.produce);
        return {
          ...state,
          authError: null,
        };
        case "EDIT_SHOP_ITEM_ERROR":
        console.log("error, couldn't edit item", action.err);
        return {
          ...state,
          authError: "Edit item failed",
        };
        case "GET_PURCHASE_INFO_FARM":
          console.log("sent to user", action.payload);
          return {
            ...state,
            purchaseInfoFarm: action.payload,
            authError: null,
          };
        case "GET_PURCHASE_INFO_FARM_ERROR":
          console.log("error, couldn't get purchase info", action.err);
          return {
            ...state,
            authError: "fetch purchase info failed",
          };

          case "ADD_SHOP_PURCHASE_ITEM":
            console.log("sales item added", action.data);
            return { 
              ...state,
              authError: null,
            };
          case "ADD_SHOP_PURCHASE_ITEM_ERROR":
          console.log("error, sales item not saved", action.err);
          return {
            ...state,
            authError: "add sales failed",
          };

        case "DELETE_SHOP_ITEM":
          console.log("successfully deleted item");
          return {
            ...state,
            authError: null,
          };
        case "DELETE_SHOP_ITEM_ERROR":
          console.log("error, couldn't delete item", action.err);
          return {
            ...state,
            authError: "delete item failed",
          };
      //#endregion
      default:
        return state;
    }
  };
  
  export default shopReducer;
  