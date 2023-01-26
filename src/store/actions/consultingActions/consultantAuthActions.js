// AUTH ACTION
import firebase from "firebase/app";

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_CONSULTANT_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_CONSULTANT_ERROR", err });
      });
  };
};
