export const createProduct = (data) => {
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
      .collection("products")
      .add(data.upload)
      .then((docRef) => {
        // make the docId easily acsessible so that we can delete it later if we want.
        getFirebase()
          .firestore()
          .collection("products")
          .doc(docRef.id)
          .set({ id: docRef.id, companyID: uid }, { merge: true });
        dispatch({ type: "CREATE_PRODUCT", data });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_PRODUCT_ERROR", err });
      });
  };
};

export const getProducts = (products) => {
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
      .collection("products").where("companyID", "==", uid)
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        dispatch({ type: "GET_PRODUCTS", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "GET_PRODUCTS_ERROR", err });
      });
  };
};

export const addToSales = (data) => {
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
    .collection("sales")
    .add(data.upload)
    .then((docRef) => {
      // make the docId easily accessible so that we can delete it later if we want.
      getFirestore()
        .collection("sales")
        .doc(docRef.id)
        // .set({ id: data.upload.id }, { merge: true });
      dispatch({ type: "ADD_TO_SALES" });
    })
    .catch((err) => {
      dispatch({ type: "ADD_TO_SALES_ERROR", err });
    });
  };
};

export const addToRent = (data) => {
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
    .collection("rent")
    .add(data.upload)
    .then((docRef) => {
      // make the docId easily accessible so that we can delete it later if we want.
      getFirestore()
        .collection("rent")
        .doc(docRef.id)
        // .set({ id: data.upload.id }, { merge: true });
      dispatch({ type: "ADD_TO_RENT" });
    })
    .catch((err) => {
      dispatch({ type: "ADD_TO_RENT_ERROR", err });
    });
  };
};

export const getSales = (sales) => {
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
      .collection("sales").where("companyID", "==", uid)
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        dispatch({ type: "GET_SALES", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "GET_SALES_ERROR", err });
      });
  };
};

export const getRent = (rent) => {
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
      .collection("rent").where("companyID", "==", uid)
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        dispatch({ type: "GET_RENT", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "GET_RENT_ERROR", err });
      });
  };
};

export const addToSupplyItems = (data) => {
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
    .collection("supply_users")
    .doc(data.upload.companyID)
    .collection("messages")
    .add(data.upload)
    .then((docRef) => {

      // make the docId easily accessible so that we can delete it later if we want.
      getFirestore()
        .collection("supply_users")
        .doc(data.upload.companyID)
        .collection("messages")
        .doc(docRef.id)
        .set({ id: docRef.id, uid: uid }, { merge: true })
      dispatch({ type: "ADD_SUPPLY_PURCHASE_ITEM", data });
    })
    .catch((err) => {
      dispatch({ type: "ADD_SUPPLY_PURCHASE_ITEM_ERROR", err });
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
      .collection("farm_users")
      .doc(data.item.uid)
      .collection("supplyOrders")
      .add(data.item)
      .then((docRef) => {
        // make the docId easily accessible so that we can delete it later if we want.
        getFirestore()
          .collection("marketplace")
          .doc(data.item.uid)
          .collection("supplyOrders")
          .doc(docRef.id)
          .set({ id: docRef.id, status: data.status }, { merge: true });
        dispatch({ type: "SEND_ORDER_TO_USER" });
      })
      .catch((err) => {
        dispatch({ type: "SEND_ORDER_TO_USER_ERROR", err });
      });
  };
  };
  
  export const editMenuStatusOnSup = (data) => {
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
      .collection("supply_users")
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

