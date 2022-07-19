const initState = {
  authError: null,
  meals: [],
  shoppingList: [],
  inventory: [],
};

const mealPlanReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_MEAL":
      console.log("meal created", action.mealPlan);
      return {
        ...state,
        authError: null,
      };
    case "CREATE_MEAL_ERROR":
      console.log("error, meal not created", action.err);
      return {
        ...state,
        authError: "Create meal failed",
      };
    case "GET_MEALS":
      console.log("get meals success", action.payload);
      return {
        ...state,
        meals: action.payload,
        authError: null,
      };
    case "GET_MEALS_ERROR":
      console.log("error, couldn't fetch meals", action.err);
      return {
        ...state,
        authError: "Get meals failed",
      };
    case "GET_SHOPPING_LIST":
      console.log("get shopping list success", action.payload);
      return {
        ...state,
        shoppingList: action.payload,
        authError: null,
      };
    case "GET_SHOPPING_LIST_ERROR":
      console.log("error, couldn't get shopping list", action.err);
      return {
        ...state,
        authError: "Get shoppiung list failed",
      };
    case "EDIT_MEAL":
      console.log("successfully edited", action.mealPlan);
      return {
        ...state,
        authError: null,
      };
    case "EDIT_MEAL_ERROR":
      console.log("error, couldn't edit meal", action.err);
      return {
        ...state,
        authError: "Edit meal failed",
      };
    case "DELETE_MEAL":
      console.log("successfully deleted", action.mealPlan);
      return {
        ...state,
        authError: null,
      };
    case "DELETE_MEAL_ERROR":
      console.log("error, couldn't delete meal", action.err);
      return {
        ...state,
        authError: "Edit meal failed",
      };
    case "GET_INVENTORY":
      console.log("get inventory success", action.payload);
      return {
        ...state,
        inventory: action.payload,
        authError: null,
      };
    case "GET_INVENTORY_ERROR":
      console.log("error, couldn't fetch inventory", action.err);
      return {
        ...state,
        authError: "Get inventory failed",
      };
    case "CREATE_INVENTORY_ITEM":
      console.log("inventory item created", action.mealPlan);
      return {
        ...state,
        authError: null,
      };
    case "CREATE_INVENTORY_ITEM_ERROR":
      console.log("error, inventory item not created", action.err);
      return {
        ...state,
        authError: "Create inventory item failed",
      };
      case "DELETE_INVENTORY_ITEM":
        console.log("successfully deleted", action.mealPlan);
        return {
          ...state,
          authError: null,
        };
      case "DELETE_INVENTORY_ITEM_ERROR":
        console.log("error, couldn't delete inventory item", action.err);
        return {
          ...state,
          authError: "Edit inventory item failed",
        };
    default:
      return state;
  }
};

export default mealPlanReducer;
