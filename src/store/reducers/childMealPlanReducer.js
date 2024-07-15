import { SET_GET_ITEMS, UPDATE_GET_ITEMS } from "../actions/mealPlanActions";

const initialState = {
  getItems: [],
};

const mealPlanReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GET_ITEMS:
      return {
        ...state,
        getItems: action.payload,
      };
    case UPDATE_GET_ITEMS:
      return {
        ...state,
        getItems: [...state.getItems, ...action.payload],
      };
    default:
      return state;
  }
};

export default mealPlanReducer;