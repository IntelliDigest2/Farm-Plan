const initState = {
    authError: null,
    res: [],
    orderSupply: [],
    savedProducts: [],
    savedSales: [],
    savedRent: [],
    plans: [],
    newPlans: [],
    newShoppingList: [],
    shoppingList: [],
    inventory: []
  };

  const supplierReducer = (state = initState, action) => {
    switch (action.type) {
      //#endregion

    //#region product
    case "CREATE_PRODUCT":
      console.log("product saved", action.data);
      return { 
        ...state,
        authError: null,
      };
    case "CREATE_PRODUCT_ERROR":
      console.log("error, product not saved", action.err);
      return {
        ...state,
        authError: "Create product failed",
      };
    case "GET_PRODUCTS":
      console.log("get products success", action.payload);
      return {
        ...state,
        savedProducts: action.payload,
        authError: null,
      };
    case "GET_PRODUCT_ERROR":
      console.log("error, couldn't fetch products", action.err);
      return {
        ...state,
        authError: "Get products failed",
      };

    case "GET_SALES":
    console.log("get sales success", action.payload);
    return {
      ...state,
      savedSales: action.payload,
      authError: null,
    };
    case "GET_SALES_ERROR":
    console.log("error, couldn't fetch sales", action.err);
    return {
      ...state,
      authError: "Get sales failed",
    };

      case "GET_RENT":
    console.log("get rent success", action.payload);
    return {
      ...state,
      savedRent: action.payload,
      authError: null,
    };
    case "GET_RENT_ERROR":
    console.log("error, couldn't fetch rent", action.err);
    return {
      ...state,
      authError: "Get sales failed",
    };

    case "ADD_TO_SALES":
      console.log("sales item added");
      return { 
        ...state,
        authError: null,
      };
    case "ADD_TO_SALES_ERROR":
    console.log("error, sales item not saved", action.err);
    return {
      ...state,
      authError: "add sales failed",
    };

    case "ADD_TO_RENT":
      console.log("rent item added");
      return { 
        ...state,
        authError: null,
      };
    case "ADD_TO_RENT_ERROR":
    console.log("error, rent item not saved", action.err);
    return {
      ...state,
      authError: "add rent failed",
    };

    case "ADD_SUPPLY_PURCHASE_ITEM":
      console.log("sales item added", action.data);
      return { 
        ...state,
        authError: null,
      };
    case "ADD_SUPPLY_PURCHASE_ITEM_ERROR":
    console.log("error, sales item not saved", action.err);
    return {
      ...state,
      authError: "add sales failed",
    };

    case "GET_ORDER_INFO_SUPPLY":
        console.log("restaurant order data", action.payload);
        return {
            ...state,
            orderSupply: action.payload,
            authError: null,
          };
      case "GET_ORDER_INFO_SUPPLY_ERROR":
        console.log("error, restaurant order data not fetched", action.err);
        return {
          ...state,
          authError: "get restaurant orders failed",
        };

    //#endregion


      default:
        return state;
    }
  };
  
  export default supplierReducer;
  