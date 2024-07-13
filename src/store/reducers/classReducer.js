import { ADD_CLASS_REQUEST, ADD_CLASS_SUCCESS, ADD_CLASS_FAILURE } from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  classes: [],
  error: null,
};

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLASS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_CLASS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        classes: [...state.classes, action.payload],
        error: null,
      };
    case ADD_CLASS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default classReducer;