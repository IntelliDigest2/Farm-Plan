import { ADD_CHILD_REQUEST, ADD_CHILD_SUCCESS, ADD_CHILD_FAILURE } from '../actions/actionTypes';
const initialState = {
  isLoading: false,
  children: [],
  error: null,
};

const childReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHILD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_CHILD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        children: [...state.children, action.payload],
        error: null,
      };
    case ADD_CHILD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default childReducer;