import axios from 'axios';
import { ADD_CLASS_REQUEST, ADD_CLASS_SUCCESS, ADD_CLASS_FAILURE } from '../actions/actionTypes';

export const addClass = (classData) => async (dispatch) => {
  dispatch({ type: ADD_CLASS_REQUEST });

  try {
    const response = await axios.post('/api/classes', classData);
    dispatch({ type: ADD_CLASS_SUCCESS, payload: response.data.newClass });
  } catch (error) {
    dispatch({
      type: ADD_CLASS_FAILURE,
      payload: error.response ? error.response.data.error : 'Something went wrong!',
    });
  }
};