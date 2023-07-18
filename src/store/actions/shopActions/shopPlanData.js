export const addItemData = (data) => {
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
      .collection("shopItems")
      .add(data.upload)
      .then((docRef) => {
        // make the docId easily acsessible so that we can delete it later if we want.
        getFirebase()
          .firestore()
          .collection("shopItems")
          .doc(docRef.id)
          .set({ id: docRef.id, shopID: uid }, { merge: true });
        dispatch({ type: "CREATE_SHOP_ITEM", data });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_SHOP_ITEM_ERROR", err });
      });
  };
};

export const getItemsData = (products) => {
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
      .collection("shopItems").where("shopID", "==", uid)
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        dispatch({ type: "GET_SHOP_ITEM", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "GET_SHOP_ITEM_ERROR", err });
      });
  };
};


export const editItemData = (shopItems) => {
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
      .collection("shopItems")
      .doc(shopItems.id)
      .set(shopItems.upload, { merge: true })
      .then(() => dispatch({ type: "EDIT_SHOP_ITEM", shopItems }))
      .catch((err) => {
        dispatch({ type: "EDIT_SHOP_ITEM_ERROR", err });
      });
  };
};

export const deleteItemData = (data) => {
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
      .collection("shopItems")
      .doc(data.id)
      .delete()
      .then(() => dispatch({ type: "DELETE_SHOP_ITEM", data }))
      .catch((err) => {
        dispatch({ type: "DELETE_SHOP_ITEM_ERROR", err });
      });
  };
};



export const getPurchaseInfoSupply = (info) => {
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
      .collection("supply_users")
      .doc(uid)
      .collection("messages")
      .get()
      .then((snapshot) => {
        const orderInfo = [];
        snapshot.forEach((doc) => {
          orderInfo.push(doc.data());
        });
        dispatch({ type: "GET_ORDER_INFO_SUPPLY", payload: orderInfo });
      })
      .catch((err) => {
        dispatch({ type: "GET_ORDER_INFO_SUPPLY_ERROR", err });
      });
  };
};

