export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase();
      firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(() => {
          dispatch({ type: "LOGIN_SUCCESS" });
        })
        .catch((err) => {
          dispatch({ type: "LOGIN_ERROR", err });
        });
    };
  };
  
  export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase();
      firebase
        .auth()
        .signOut()
        .then(() => {
          dispatch({ type: "SIGNOUT_SUCCESS" });
        });
    };
  };

  export const updatePassword = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase();      
      firebase
      .auth()
      .currentUser
      .updatePassword(credentials.password)
      .then(() => {
        dispatch({ type: "CHANGE_SUCCESS"});
      })
      .catch((err) => {
        dispatch({ type: "CHANGE_ERROR", err });
      });
    }
  }

  export const resetPassword = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase();
      firebase
      .auth()
      .sendPasswordResetEmail(credentials.email)
      .then(() => {
        dispatch({ type: "RESET_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "RESET_ERROR", err });
      });
    }
  }
  
  export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase }) => {
      const firestore = getFirebase().firestore();
      const firebase = getFirebase();
      firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then((resp) => {
          return firestore
            .collection("users")
            .doc(resp.user.uid)
            .set({
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              initials: newUser.firstName[0] + newUser.lastName[0],
              postcode: newUser.postcode,
            });
        })
        .then(() => {
          firebase
          .auth()
          .currentUser
          .sendEmailVerification();
        })
        .then(() => {
          dispatch({ type: "SIGNUP_SUCCESS" });
        })
        .catch((err) => {
          dispatch({ type: "SIGNUP_ERROR", err });
        });
    };
  };
  