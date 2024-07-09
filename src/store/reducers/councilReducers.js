const initState = {
  authError: null,
};

const councilReducer = (state = initState, action) => {
  switch (action.type) {
    case "COUNCIL_MEAL_CREATED":
      console.log("Meal Created added in collection");
      return {
        ...state,
        authError: "Meal Created",
      };
    case "COUNCIL_MEAL_ERROR":
      console.log("Meal Failed to create in collection");
      return {
        ...state,
        authError: "Meal Failed to create in collection",
      };
    case "COUNCIL_MEAL_REMOVED":
      return {
        ...state,
        authError: "Meal successfully Removed",
      };
    case "COUNCIL_MEAL_ERROR":
      return {
        ...state,
        authError: "Error occured removing Meal",
      };
    default:
      return state;
  }
};

export default councilReducer;
