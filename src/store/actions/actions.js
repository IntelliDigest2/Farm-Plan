import { ADD_CHILD_REQUEST, ADD_CHILD_SUCCESS, ADD_CHILD_FAILURE } from './actionTypes';
import Swal from 'sweetalert2';

export const addChildRequest = () => ({
  type: ADD_CHILD_REQUEST,
});

export const addChildSuccess = (child) => ({
  type: ADD_CHILD_SUCCESS,
  payload: child,
});

export const addChildFailure = (error) => ({
  type: ADD_CHILD_FAILURE,
  payload: error,
});

export const addChild = (child) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch(addChildRequest());
    const firestore = getFirestore();
    firestore.collection('children').add(child)
      .then((docRef) => {
        dispatch(addChildSuccess({ ...child, id: docRef.id }));
        Swal.fire({
          title: 'Success!',
          text: 'Child information added successfully.',
          icon: 'success',
        });
      })
      .catch((error) => {
        dispatch(addChildFailure(error.message));
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add child information. Please try again later.',
          icon: 'error',
        });
      });
  };
};