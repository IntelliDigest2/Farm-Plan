const initState = {
  authError: null,
  meals: [],
  savedMeals: [],
  shoppingList: [],
  inventory: [],
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
    
    //#endregion
    default:
      return state;
  }
};

export default mealPlannerReducer;
