const initState = {
  authError: null,
  meals: [],
  savedMeals: [],
  shoppingList: [],
  inventory: [],
  plans: [],

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
    //#endregion
    default:
      return state;
  }
};

export default mealPlannerReducer;
