const initState = {
  authError: null,
  meals: [],
  savedMeals: [],
  shoppingList: [],
  inventory: [],
  plans: [],
  items: [],
  newPlans: [],


};

const mealPlannerReducer = (state = initState, action) => {
  switch (action.type) {
    //#region calendar
    case "CREATE_MEAL_PLAN":
      console.log("meal planner created", action.mealPlanner);
      return {
        ...state,
        authError: null, 
      };
    case "CREATE_MEAL_PLANNER_ERROR":
      console.log("error, meal plan not created", action.err);
      return {
        ...state,
        authError: "Create meal failed",
      };
      case "GENERATE_MEAL_PLAN":
      console.log("meal planner generated", action.plan);
      return {
        ...state,
        authError: null, 
      };
    case "GENERATE_MEAL_PLANNER_ERROR":
      console.log("error, meal plan not generated", action.err);
      return {
        ...state,
        authError: "Create meal failed",
      };
      case "REMOVE_ALL_MEAL_PAN":
      console.log("successfully removed all meal plan", action.mealPlan);
      return {
        ...state,
        authError: null,
      };
    case "REMOVE_ALL_MEAL_PLAN_ERROR":
      console.log("error, couldn't remove all meal plan", action.err);
      return {
        ...state,
        authError: "delete meal failed",
      };
      case "GET_MEAL_PLANS":
        console.log("get meals plans success", action.payload);
        return {
          ...state,
          plans: action.payload,
          authError: null,
        };
      case "GET_MEAL_PLANS_ERROR":
        console.log("error, couldn't fetch meals", action.err);
        return {
          ...state,
          authError: "Get meals failed",
        };
        case "GET_NEW_PLANS":
      console.log("get meal plan success", action.payload);
      return {
        ...state,
        newPlans: action.payload,
        authError: null,
      };
    case "GET_NEW_PLANS_ERROR":
      console.log("error, couldn't fetch meals", action.err);
      return {
        ...state,
        authError: "Get meals failed",
      };
        case "DELETE_MEAL_PLAN":
          console.log("successfully deleted item");
          return {
            ...state,
            authError: null,
          };
        case "DELETE_MEAL_PLAN_ERROR":
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

export default mealPlannerReducer;
