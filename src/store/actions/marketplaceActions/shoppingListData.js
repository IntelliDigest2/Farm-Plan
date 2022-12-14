export const addToShoppingList = (data) => {
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

    const ingr = data.upload.ingredients;

    const firestore = getFirestore();
    const batch = firestore.batch();

    //send each separate ingredient to its own document
    ingr.forEach((element) => {
      var docRef = firestore
        .collection("marketplace")
        .doc(uid)
        .collection("shoppingList")
        .doc(data.week)
        .collection(data.week)
        .doc();
      batch.set(docRef, { id: docRef.id, ingredient: element });
    });
    batch
      .commit()
      .then(() => {
        dispatch({ type: "CREATE_SHOP", ingr });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_SHOP_ERROR", err });
      });
  };
};
 
export const addToShoppingListUpdate = (data) => {
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

    const firestore = getFirestore();
    const batch = firestore.batch();

    //send each separate ingredient to its own document
    ingr.forEach((element) => {
      var docRef = firestore
        .collection("marketplace")
        .doc(uid)
        .collection("newShoppingList")
        .doc(data.week)
        .collection(data.week)
        .doc();
      batch.set(docRef, { id: docRef.id, ingredient: element });
    });
    batch
      .commit()
      .then(() => {
        dispatch({ type: "CREATE_NEW_SHOP", ingr });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_NEW_SHOP_ERROR", err });
      });
  };
};

export const getShoppingList = (data) => {
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

    console.log("----", data)

    getFirestore()
      .collection("marketplace")
      .doc(uid)
      .collection("shoppingList")
      .doc(data.week)
      .collection(data.week)
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        dispatch({ type: "GET_SHOPPING_LIST", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "GET_SHOPPING_LIST_ERROR", err });
      });
  };
};

export const getShoppingListUpdate = (data) => {
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

    console.log("----", data)

    getFirestore()
      .collection("marketplace")
      .doc(uid)
      .collection("newShoppingList")
      .doc(data.week)
      .collection(data.week)
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        dispatch({ type: "GET_NEW_SHOPPING_LIST", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "GET_NEW_SHOPPING_LIST_ERROR", err });
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

export const newRemoveFromShop = (data) => {
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
      .collection("newShoppingList")
      .doc(data.week)
      .collection(data.week)
      .doc(data.id)
      .delete()
      .then(() => dispatch({ type: "DELETE_NEW_SHOP" }))
      .catch((err) => {
        dispatch({ type: "DELETE_BEW_SHOP_ERROR", err });
      });
  };
};