export const createRecipe = (recipe) => {
  return (dispatch, getState, { getFirebase }) => {
    //make async call to database
    const profile = getState().firebase.profile;
    const authUID = getState().firebase.auth.uid;

    var uid;
    switch (profile.type) {
      case "business_admin":
        uid = authUID;
        break;
      case "business_sub":
        uid = profile.admin;
        break;
      case "academic_admin":
        uid = authUID;
        break;
      case "academic_sub":
        uid = profile.admin;
        break;
      case "household_admin":
        uid = authUID;
        break;
      case "household_sub":
        uid = profile.admin;
        break;
      default:
        uid = authUID;
        break;
    }

    getFirebase()
      .firestore()
      .collection("menus")
      .add(recipe.upload)
      .then((docRef) => {
        // make the docId easily acsessible so that we can delete it later if we want.
        getFirebase()
          .firestore()
          .collection("menus")
          .doc(docRef.id)
          .set({ id: docRef.id, restaurantID: uid }, { merge: true });
        dispatch({ type: "CREATE_RECIPE", recipe });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_RECIPE_ERROR", err });
      });
  };
};

export const getRecipes = (recipe) => {
  return (dispatch, getState, { getFirestore }) => {
    //make async call to database
    const profile = getState().firebase.profile;
    const authUID = getState().firebase.auth.uid;

    var uid;
    switch (profile.type) {
      case "business_admin":
        uid = authUID;
        break;
      case "business_sub":
        uid = profile.admin;
        break;
      case "academic_admin":
        uid = authUID;
        break;
      case "academic_sub":
        uid = profile.admin;
        break;
      case "household_admin":
        uid = authUID;
        break;
      case "household_sub":
        uid = profile.admin;
        break;
      default:
        uid = authUID;
        break;
    }

    getFirestore()
      .collection("menus").where("restaurantID", "==", uid)
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        dispatch({ type: "GET_RECIPES", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "GET_RECIPES_ERROR", err });
      });
  };
};

export const createSavedMeal = (recipe) => {
  return (dispatch, getState, { getFirebase }) => {
    //make async call to database
    const profile = getState().firebase.profile;
    const authUID = getState().firebase.auth.uid;

    var uid;
    switch (profile.type) {
      case "business_admin":
        uid = authUID;
        break;
      case "business_sub":
        uid = profile.admin;
        break;
      case "academic_admin":
        uid = authUID;
        break;
      case "academic_sub":
        uid = profile.admin;
        break;
      case "household_admin":
        uid = authUID;
        break;
      case "household_sub":
        uid = profile.admin;
        break;
      default:
        uid = authUID;
        break;
    }

    getFirebase()
      .firestore()
      .collection("marketplace")
      .doc(uid)
      .collection("mySavedMeals")
      .add(recipe.upload)
      .then((docRef) => {
        // make the docId easily acsessible so that we can delete it later if we want.
        getFirebase()
          .firestore()
          .collection("marketplace")
          .doc(uid)
          .collection("mySavedMeals")
          .doc(docRef.id)
          .set({ id: docRef.id }, { merge: true });
        dispatch({ type: "CREATE_RECIPE", recipe });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_RECIPE_ERROR", err });
      });
  };
};

export const getSavedMeals = (recipe) => {
  return (dispatch, getState, { getFirestore }) => {
    //make async call to database
    const profile = getState().firebase.profile;
    const authUID = getState().firebase.auth.uid;

    var uid;
    switch (profile.type) {
      case "business_admin":
        uid = authUID;
        break;
      case "business_sub":
        uid = profile.admin;
        break;
      case "academic_admin":
        uid = authUID;
        break;
      case "academic_sub":
        uid = profile.admin;
        break;
      case "household_admin":
        uid = authUID;
        break;
      case "household_sub":
        uid = profile.admin;
        break;
      default:
        uid = authUID;
        break;
    }

    getFirestore()
      .collection("marketplace")
      .doc(uid)
      .collection("mySavedMeals")
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        dispatch({ type: "GET_RECIPES", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "GET_RECIPES_ERROR", err });
      });
  };
};


export const deleteSavedMeal = (recipe) => {
  return (dispatch, getState, { getFirebase }) => {
    //make async call to database
    const profile = getState().firebase.profile;
    const authUID = getState().firebase.auth.uid;

    var uid;
    switch (profile.type) {
      case "business_admin":
        uid = authUID;
        break;
      case "business_sub":
        uid = profile.admin;
        break;
      case "academic_admin":
        uid = authUID;
        break;
      case "academic_sub":
        uid = profile.admin;
        break;
      case "household_admin":
        uid = authUID;
        break;
      case "household_sub":
        uid = profile.admin;
        break;
      default:
        uid = authUID;
        break;
    }

    getFirebase()
      .firestore()
      .collection("marketplace")
      .doc(uid)
      .collection("mySavedMeals")
      .doc(recipe.id)
      .delete()
      .then(() => dispatch({ type: "DELETE_RECIPE", recipe }))
      .catch((err) => {
        dispatch({ type: "DELETE_RECIPE_ERROR", err });
      });
  };
};

export const editSavedMeal = (data) => {
  return (dispatch, getState, { getFirebase }) => {
    //make async call to database
    const profile = getState().firebase.profile;
    const authUID = getState().firebase.auth.uid;

    var uid;
    switch (profile.type) {
      case "business_admin":
        uid = authUID;
        break;
      case "business_sub":
        uid = profile.admin;
        break;
      case "academic_admin":
        uid = authUID;
        break;
      case "academic_sub":
        uid = profile.admin;
        break;
      case "household_admin":
        uid = authUID;
        break;
      case "household_sub":
        uid = profile.admin;
        break;
      default:
        uid = authUID;
        break;
    }

    getFirebase()
      .firestore()
      .collection("marketplace")
      .doc(uid)
      .collection("mySavedMeals")
      .doc(data.id)
      .set(data.upload, { merge: true })
      .then(() => console.log("successfully edited! "))
      .catch((err) => {
        dispatch(console.log("Error editing document:", err));
      });
  };
};
