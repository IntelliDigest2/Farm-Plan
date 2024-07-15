export const SET_GET_ITEMS = "SET_GET_ITEMS";
export const UPDATE_GET_ITEMS = "UPDATE_GET_ITEMS";

export const setGetItems = (items) => {
  return {
    type: SET_GET_ITEMS,
    payload: items,
  };
};

export const updateGetItems = (items) => {
  return {
    type: UPDATE_GET_ITEMS,
    payload: items,
  };
};