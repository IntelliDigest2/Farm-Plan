export const createMealPlannerData = (mealPlanner) => {
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
      .collection("mealPlannerData")
      .doc(mealPlanner.month)
      .collection(mealPlanner.day)
      .add(mealPlanner.upload)
      .then((docRef) => {
        // make the docId easily accessible so that we can delete it later if we want.
        getFirebase()
          .firestore()
          .collection("marketplace")
          .doc(uid)
          .collection("mealPlannerData")
          .doc(mealPlanner.month)
          .collection(mealPlanner.day)
          .doc(docRef.id)
          .set({ id: docRef.id }, { merge: true });
        dispatch({ type: "CREATE_MEAL_PLANNER", mealPlanner });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_MEAL_PLANNER_ERROR", err });
      });
  };
};

