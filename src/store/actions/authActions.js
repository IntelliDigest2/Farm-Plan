import firebase from "firebase/app";

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
      })
      .catch((err) => {
        console.log("err");
        dispatch({ type: "CHANGE_PROFILE_ERROR", err });
      });
  };
};

//sets isSeller in "users" and the profile in "marketplace"
export const becomeSeller = (seller) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();

    firestore
      .collection("users")
      .doc(seller.uid)
      .set({ ...seller.profile }, { merge: true })
      .then(() => {
        return firestore.collection("marketplace").doc(seller.uid).set({
          Email: seller.email,
          Location: seller.location,
        });
      })
      .then(() => {
        dispatch({ type: "SELLER_SUCCESS" });
      })
      .catch((err) => {
        console.log("err");
        dispatch({ type: "SELLER_ERROR", err });
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
    //Determine account type
    var type;
    switch (newUser.function) {
      case "Hospitals":
      case "Hotels":
      case "Offices":
      case "Restaurants":
      case "Shop/Supermarket":
      case "Recreational Centers":
      case "Business":
        type = "business_admin";
        break;
      case "Schools":
        type = "academic_admin";
        break;
      case "Farm":
        type = "farm_admin";
        break;
      case "Households":
        type = "household_admin";
      default:
        type = "user";
        break;
    }

    const firestore = getFirebase().firestore();
    const firebase = getFirebase();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((resp) => {
        firestore
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
            type: type,
          });

        //Setup Admin account in relevent users collection
        var adminCollection;
        if (type === "business_admin") {
          adminCollection = "business_users";
        } else if (type === "academic_admin") {
          adminCollection = "academic_users";
        } else if (type === "farm_admin") {
          adminCollection = "farm_users";
        } else if (type === "household_admin") {
          adminCollection = "household_users";
        } else {
          adminCollection = "user";
        }

        if (adminCollection !== "user") {
          firestore
            .collection(adminCollection)
            .doc(resp.user.uid)
            .set({
              name: newUser.firstName + " " + newUser.lastName,
              email: newUser.email,
            });
        }
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

//Admin and Sub Account Auth Actions
export const createSubAccount = (data) => {
  return (dispatch, getState, { getFirebase }) => {
    /* 
    Initialize a secondary firebase app instance
    in order to create a new user account without
    automatically signing in as the new user.

    Then complete all actions to add data to
    firebase collections before deleting the secondary
    firebase app instance.

    This solution was found @:
    https://stackoverflow.com/questions/37517208/firebase-kicks-out-current-user/38013551#38013551
    */
    var config = {
      apiKey: "AIzaSyDuu8Fpwa2gYlCKcL-LlN-uqH5seEJpk9w",
      authDomain: "itracker-development.firebaseapp.com",
      projectId: "itracker-development",
      storageBucket: "itracker-development.appspot.com",
      messagingSenderId: "57163396396",
      appId: "1:57163396396:web:dd800621173f5733a4a889",
    };

    let secondaryApp = firebase.initializeApp(config, "second");

    secondaryApp
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        //Create user document inside Admin's 'sub_accounts' collection
        getFirebase()
          .firestore()
          .collection(data.masterCollection)
          .doc(data.uid)
          .collection("sub_accounts")
          .doc(userCredential.user.uid)
          .set({
            email: data.email,
            name: data.firstName + " " + data.lastName,
            role: data.role,
          });

        //Create user document inside 'users' base collection
        getFirebase()
          .firestore()
          .collection("users")
          .doc(userCredential.user.uid)
          .set({
            firstName: data.firstName,
            lastName: data.lastName,
            initials: data.firstName[0] + data.lastName[0],
            email: data.email,
            buildingFunction: data.function,
            city: data.city,
            country: data.country,
            region: data.region,
            admin: data.uid,
            type: data.type,
          });
      })
      .then(() => {
        secondaryApp.auth().currentUser.sendEmailVerification();
      })
      .then(() => {
        secondaryApp.auth().signOut();
      })
      .then(() => {
        secondaryApp.delete();
      })
      .then(() => {
        dispatch({ type: "CREATE_SUBACCOUNT" });
      })
      .catch(() => {
        dispatch({ type: "CREATE_SUBACCOUNT_ERROR", err });
      });
  };
};
