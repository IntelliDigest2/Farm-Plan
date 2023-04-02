export const getRestaurantData = (data) => {
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
    .collection("menus").where("city", "==", data.city)
    .get()
    .then((snapshot) => {
      const restaurant = [];
      snapshot.forEach((doc) => {
        restaurant.push(doc.data());
      });
      dispatch({ type: "GET_RESTAURANT", payload: restaurant });
    })
    .catch((err) => {
      dispatch({ type: "GET_RESTAURANT_ERROR", err });
    });
};
};

export const createMenu = (menu) => {
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
    .add(menu.upload)
    .then((docRef) => {
      // make the docId easily acsessible so that we can delete it later if we want.
      getFirebase()
        .firestore()
        .collection("menus")
        .doc(docRef.id)
        .set({ id: docRef.id, restaurantID: uid }, { merge: true });
      dispatch({ type: "CREATE_MENUS", menu });
    })
    .catch((err) => {
      dispatch({ type: "CREATE_MENUS_ERROR", err });
    });
};
};

export const getMenus = (menu) => {
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
      dispatch({ type: "GET_MENUS", payload: data });
    })
    .catch((err) => {
      dispatch({ type: "GET_MENUS_ERROR", err });
    });
};
};

export const sendToRes = (data) => {
return (dispatch, getState, { getFirestore }) => {
  //make async call to database

  getFirestore()
    .collection("restaurant_users")
    .doc(data.restaurantID)
    .collection("messages")
    .add(data.upload)
    .then((docRef) => {
      // make the docId easily accessible so that we can delete it later if we want.
      getFirestore()
        .collection("restaurant_users")
        .doc(data.restaurantID)
        .collection("messages")
        .doc(docRef.id)
        .set({ id: docRef.id }, { merge: true });
      dispatch({ type: "SEND_TO_RESTAURANT" });
    })
    .catch((err) => {
      dispatch({ type: "SEND_TO_RESTAURANT_ERROR", err });
    });
};
};

export const sendOrderToUser = (data) => {
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
      .collection("restaurantOrders")
      .add(data.upload)
      .then((docRef) => {
        // make the docId easily accessible so that we can delete it later if we want.
        getFirestore()
          .collection("marketplace")
          .doc(uid)
          .collection("restaurantOrders")
          .doc(docRef.id)
          .set({ id: docRef.id }, { merge: true });
        dispatch({ type: "SEND_ORDER_TO_USER" });
      })
      .catch((err) => {
        dispatch({ type: "SEND_ORDER_TO_USER_ERROR", err });
      });
  };
  };
  

export const getPurchaseInfoRes = (info) => {
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
      .collection("restaurant_users")
      .doc(uid)
      .collection("messages")
      .get()
      .then((snapshot) => {
        const orderInfo = [];
        snapshot.forEach((doc) => {
          orderInfo.push(doc.data());
        });
        dispatch({ type: "GET_ORDER_INFO_RES", payload: orderInfo });
      })
      .catch((err) => {
        dispatch({ type: "GET_ORDER_INFO_RES_ERROR", err });
      });
  };
};


// export const deleteSavedMeal = (recipe) => {
//   return (dispatch, getState, { getFirebase }) => {
//     //make async call to database
//     const profile = getState().firebase.profile;
//     const authUID = getState().firebase.auth.uid;

//     var uid;
//     switch (profile.type) {
//       case "business_admin":
//         uid = authUID;
//         break;
//       case "business_sub":
//         uid = profile.admin;
//         break;
//       case "academic_admin":
//         uid = authUID;
//         break;
//       case "academic_sub":
//         uid = profile.admin;
//         break;
//       case "household_admin":
//         uid = authUID;
//         break;
//       case "household_sub":
//         uid = profile.admin;
//         break;
//       default:
//         uid = authUID;
//         break;
//     }

//     getFirebase()
//       .firestore()
//       .collection("marketplace")
//       .doc(uid)
//       .collection("mySavedMeals")
//       .doc(recipe.id)
//       .delete()
//       .then(() => dispatch({ type: "DELETE_RECIPE", recipe }))
//       .catch((err) => {
//         dispatch({ type: "DELETE_RECIPE_ERROR", err });
//       });
//   };
// };

// export const editSavedMeal = (data) => {
//   return (dispatch, getState, { getFirebase }) => {
//     //make async call to database
//     const profile = getState().firebase.profile;
//     const authUID = getState().firebase.auth.uid;

//     var uid;
//     switch (profile.type) {
//       case "business_admin":
//         uid = authUID;
//         break;
//       case "business_sub":
//         uid = profile.admin;
//         break;
//       case "academic_admin":
//         uid = authUID;
//         break;
//       case "academic_sub":
//         uid = profile.admin;
//         break;
//       case "household_admin":
//         uid = authUID;
//         break;
//       case "household_sub":
//         uid = profile.admin;
//         break;
//       default:
//         uid = authUID;
//         break;
//     }

//     getFirebase()
//       .firestore()
//       .collection("marketplace")
//       .doc(uid)
//       .collection("mySavedMeals")
//       .doc(data.id)
//       .set(data.upload, { merge: true })
//       .then(() => console.log("successfully edited! "))
//       .catch((err) => {
//         dispatch(console.log("Error editing document:", err));
//       });
//   };
// };
