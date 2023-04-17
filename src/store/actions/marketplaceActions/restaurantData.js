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
        .set({ id: docRef.id, uid: uid }, { merge: true });
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
      .doc(data.item.uid)
      .collection("restaurantOrders")
      .add(data.item)
      .then((docRef) => {
        // make the docId easily accessible so that we can delete it later if we want.
        getFirestore()
          .collection("marketplace")
          .doc(data.item.uid)
          .collection("restaurantOrders")
          .doc(docRef.id)
          .set({ id: docRef.id, status: data.status }, { merge: true });
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

export const editMenuStatusOnRes = (data) => {
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
    .collection("restaurant_users")
    .doc(uid)
    .collection("messages")
    .doc(data.id)
    .set({status: data.status}, { merge: true })
      .then(() => dispatch({ type: "EDIT_MENU_STATUS", payload: data }))
      .catch((err) => {
        dispatch({ type: "EDIT_MENU_STATUS_ERROR", err });
      });
  };
};

export const createMealPlannerDataRes = (mealPlanner) => {
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
      .collection("mealPlannerData")
      .add(mealPlanner.upload)
      .then((docRef) => {
        // make the docId easily accessible so that we can delete it later if we want.
        getFirebase()
          .firestore()
          .collection("restaurant_users")
          .doc(uid)
          .collection("mealPlannerData")
          .doc(docRef.id)
          .set({ id: docRef.id }, { merge: true });
        dispatch({ type: "CREATE_MEAL_PLANNER_RES", mealPlanner });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_MEAL_PLANNER_RES_ERROR", err });
      });
  };
};

export const getMealPlannerDataRes = () => {
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
      .collection("mealPlannerData")
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        dispatch({ type: "GET_MEAL_PLANS_RES", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "GET_MEAL_PLANS_RES_ERROR", err });
      });
  };
};

export const addToShoppingListRes = (data) => {
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

    const item = data.upload.item;

    getFirestore()
    .collection("restaurant_users")
    .doc(uid)
    .collection("shoppingList")
    .add(data.upload)
    .then((docRef) => {
      // make the docId easily accessible so that we can delete it later if we want.
      getFirestore()
        .collection("restaurant_users")
        .doc(uid)
        .collection("shoppingList")
        .doc(docRef.id)
        .set({ id: docRef.id }, { merge: true });
      dispatch({ type: "CREATE_SHOP_RES" });
    })
    .catch((err) => {
      dispatch({ type: "CREATE_SHOP_RES_ERROR", err });
    });
  };
};


export const addToShoppingListUpdateRes = (data) => {
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

    const ingr = data.upload.result;

    //console.log("checking what error ===> ", ingr)

    const firestore = getFirestore();
    const batch = firestore.batch();

    //send each separate ingredient to its own document
    ingr.forEach((element) => {
      var docRef = firestore
        .collection("restaurant_users")
        .doc(uid)
        .collection("newShoppingList")
        // .doc(data.week)
        // .collection(data.week)
        .doc();
      batch.set(docRef, { id: docRef.id, item: element});
    });
    batch
      .commit()
      .then(() => {
        dispatch({ type: "CREATE_NEW_SHOP_RES", ingr });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_NEW_SHOP__RES_ERROR", err });
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
      .collection("restaurant_users")
      .doc(uid)
      .collection("mealPlannerData")
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        dispatch({ type: "GET_NEW_PLANS_RES", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "GET_NEW_PLANS_RES_ERROR", err });
      });
  };
};

export const getShoppingListUpdateRes = (data) => {
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
      .collection("restaurant_users")
      .doc(uid)
      .collection("newShoppingList").where("item.week", "==", data.week)
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        dispatch({ type: "GET_NEW_SHOPPING_LIST_RES", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "GET_NEW_SHOPPING_LIST_RES_ERROR", err });
      });
  };
};

export const getShoppingListRes = (data) => {
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
      .collection("restaurant_users")
      .doc(uid)
      .collection("shoppingList").where("item.week", "==", data.week)
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        dispatch({ type: "GET_SHOPPING_LIST_RES", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "GET_SHOPPING_LIST_RES_ERROR", err });
      });
  };
};

export const addToInventoryRes = (data) => {
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
    .collection("restaurant_users")
    .doc(uid)
    .collection("inventory")
    .add(data.upload)
    .then((docRef) => {
      // make the docId easily accessible so that we can delete it later if we want.
      getFirestore()
        .collection("restaurant_users")
        .doc(uid)
        .collection("inventory")
        .doc(docRef.id)
        .set({ id: docRef.id }, { merge: true });
      dispatch({ type: "CREATE_INVENTORY_ITEM_RES" });
    })
    .catch((err) => {
      dispatch({ type: "CREATE_INVENTORY_ITEM_RES_ERROR", err });
    });
  };
};

export const generatedRemoveFromShop = (data) => {
  return (dispatch, getState, { getFirebase }) => {
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
      .collection("newShoppingList")
      .doc(data.id)
      .delete()
      .then(() => dispatch({ type: "DELETE_NEW_SHOP_RES" }))
      .catch((err) => {
        dispatch({ type: "DELETE_NEW_SHOP_RES_ERROR", err });
      });
  };
};

export const removeFromShop = (data) => {
  return (dispatch, getState, { getFirebase }) => {
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
      .collection("shoppingList")
      .doc(data.week)
      .collection(data.week)
      .doc(data.id)
      .delete()
      .then(() => dispatch({ type: "DELETE_SHOP" }))
      .catch((err) => {
        dispatch({ type: "DELETE_SHOP_ERROR", err });
      });
  };
};

export const getInventoryRes = () => {
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
      .collection("restaurant_users")
      .doc(uid)
      .collection("inventory")
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        dispatch({ type: "GET_INVENTORY_RES", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "GET_INVENTORY_RES_ERROR", err });
      });
  };
};


