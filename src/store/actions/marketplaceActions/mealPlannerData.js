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
      .add(mealPlanner.upload)
      .then((docRef) => {
        // make the docId easily accessible so that we can delete it later if we want.
        getFirebase()
          .firestore()
          .collection("marketplace")
          .doc(uid)
          .collection("mealPlannerData")
          .doc(docRef.id)
          .set({ id: docRef.id }, { merge: true });
        dispatch({ type: "CREATE_MEAL_PLANNER", mealPlanner });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_MEAL_PLANNER_ERROR", err });
      });
  };
};

export const getMealPlannerData = () => {
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
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        dispatch({ type: "GET_MEAL_PLANS", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "GET_MEAL_PLANS_ERROR", err });
      });
  };
};

export const getWeeklyPlan = (data) => {
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

    console.log("this is day", data.day)

    getFirebase()
      .firestore()
      .collection("marketplace")
      .doc(uid)
      .collection("newPlan").where('day', '==', data.day)
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        dispatch({ type: "GET_WEEK_PLANS", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "GET_WEEK_PLANS_ERROR", err });
      });
  };
};


export const getPlanData = () => {
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
      .collection("newPlan").where('isEatOut', '==', false)
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        dispatch({ type: "GET_NEW_PLANS", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "GET_NEW_PLANS_ERROR", err });
      });
  }; 
}; 

export const getSingleMealPlan = (data) => {
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
      .collection("newPlan").where('id', '==', data.id)
      .get()
      .then((snapshot) => {
        let meal
        snapshot.forEach(doc => meal = doc.data());

        dispatch({ type: "GET_SINGLE_MEAL_PLAN", payload: meal });
      })
      .catch((err) => {
        dispatch({ type: "GET_SINGLE_MEAL_PLAN_ERROR", err });
      });
  };
};


export const editNewPlanData = (data) => {
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
      .collection("newPlan")
      .doc(data.id)
      .set(data.upload, { merge: true })
      .then(() => dispatch({ type: "EDIT_MEAL", data }))
      .catch((err) => {
        dispatch({ type: "EDIT_MEAL_ERROR", err });
      });
  };
};

export const editMealData = (mealPlan) => {
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

    console.log("check:", mealPlan)
    
    getFirebase()
      .firestore()
      .collection("marketplace")
      .doc(uid)
      .collection("mealPlanData")
      .doc(mealPlan.month)
      .collection(mealPlan.day)
      .doc(mealPlan.id)
      .set(mealPlan.upload, { merge: true })
      .then(() => dispatch({ type: "EDIT_MEAL", mealPlan }))
      .catch((err) => {
        dispatch({ type: "EDIT_MEAL_ERROR", err });
      });
  };
};


export const deleteMealPlannerData = (mealPlanner) => {
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
      .doc(mealPlanner.id)
      .delete()
      .then(() => dispatch({ type: "DELETE_MEAL_PLAN", mealPlanner }))
      .catch((err) => {
        dispatch({ type: "DELETE_MEAL_PLAN_ERROR", err });
      });
  };
};

export const generateNewPlan = (plan) => {
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
      .collection("newPlan")
      .add(plan.upload)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        // make the docId easily accessible so that we can delete it later if we want.
        getFirebase()
          .firestore()
          .collection("marketplace")
          .doc(uid)
          .collection("newPlan")
          .doc(docRef.id)
          .set({ id: docRef.id }, { merge: true });
        dispatch({ type: "GENERATE_MEAL_PLANNER", plan });
      })
      .catch((err) => {
        dispatch({ type: "GENERATE_MEAL_PLANNER_ERROR", err });
      });
  };
};

// delete all item in collection and re-upload?
export const removeAllMealPlan = (plan) => {
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
      .collection("newPlan")
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(snapshot => {
            snapshot.ref.delete();
        })
      })
      .then(() => dispatch({ type: "REMOVE_ALL_MEAL_PLAN", plan }))
      .catch((err) => {
        dispatch({ type: "REMOVE_ALL_MEAL_PLAN_ERROR", err });
      });

  };
};

//should be removed
export const getAllItems = (plan) => {
  return {
    //make async call to database
    type: "GET_ALL_MEAL_PLAN", plan,
    //type: "GET_ALL_MEAL_PLAN_ERROR", err,
  };
};

export const editMealDataPlan = (mealPlan) => {
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

    //console.log("check:", mealPlan)
    
    getFirebase()
      .firestore()
      .collection("marketplace")
      .doc(uid)
      .collection("mealPlannerData")
      .doc(mealPlan.id)
      .set(mealPlan.upload, { merge: true })
      .then(() => dispatch({ type: "EDIT_MEAL", mealPlan }))
      .catch((err) => {
        dispatch({ type: "EDIT_MEAL_ERROR", err });
      });
  };
};
