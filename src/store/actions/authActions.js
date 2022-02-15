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
      .currentUser.updatePassword(credentials.password)
      .then(() => {
        dispatch({ type: "CHANGE_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "CHANGE_ERROR", err });
      });
  };
};

export const updateEmail = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = getFirebase().firestore();

    const creds = firebase.auth.EmailAuthProvider.credential(
      credentials.email,
      credentials.password
    );

    firebase
      .auth()
      .currentUser.reauthenticateWithCredential(creds)
      .then(() => {
        firebase
          .auth()
          .currentUser.verifyBeforeUpdateEmail(credentials.newEmail)
          .then(() => {
            return firestore.collection("users").doc(credentials.uid).update({
              email: credentials.newEmail,
            });
          })
          .then(() => {
            dispatch({ type: "CHANGE_EMAIL_SUCCESS" });
          })
          .catch((err) => {
            dispatch({ type: "CHANGE_EMAIL_ERROR", err });
          });
      });
  };
};

export const updateProfile = (users) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();

    firestore
      .collection("users")
      .doc(users.uid)
      .set({ ...users.profile }, { merge: true })
      .then(() => {
        dispatch({ type: "CHANGE_PROFILE_SUCCESS" });
        console.log("here");
      })
      .catch((err) => {
        console.log("err");
        dispatch({ type: "CHANGE_PROFILE_ERROR", err });
      });
  };
};

//not currently working
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
  };
};

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
            email: newUser.email,
            buildingFunction: newUser.function,
            city: newUser.city,
            country: newUser.country,
            region: newUser.region,
            type: "user",
          });
      })
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification();
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

export const getUserData = (data) => {
  return (dispatch, getState, { getFirebase }) => {
    getFirebase()
      .firestore()
      .collection(data.collection)
      .doc(data.uid)
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        dispatch({ type: "GET_DATA", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "GET_DATA_ERROR", err });
      });
  };
};
