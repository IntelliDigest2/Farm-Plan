export const getFarmerData = () => {
  return (dispatch, getState, { getFirebase }) => {
    const profile = getState().firebase.profile;
    const authUID = getState().firebase.auth.uid;

    var uid;
    switch (profile.type) {
      default:
      case "farm_admin":
        uid = authUID;
        break;
      case "farm_sub":
        uid = profile.admin;
    }
    var db = getFirebase().firestore();
    var docRef = db.collection("marketplace").doc(uid);

    docRef
      .get()
      .then((doc) => {
        const data = [];
        data.push(doc.data());
        dispatch({ type: "GET_DATA", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "GET_DATA_ERROR", err });
      });
  };
};

export const addProduceData = (data) => {
  return (dispatch, getState, { getFirestore }) => {
    const profile = getState().firebase.profile;
    const authUID = getState().firebase.auth.uid;

    var uid;
    switch (profile.type) {
      default:
      case "farm_admin":
        uid = authUID;
        break;
      case "farm_sub":
        uid = profile.admin;
    }
    
    getFirestore()
    .collection("marketplace")
    .doc(uid)
    .collection("produce")
    .add(data.upload)
    .then((docRef) => {
      // make the docId easily accessible so that we can delete it later if we want.
      getFirestore()
        .collection("marketplace")
        .doc(uid)
        .collection("produce")
        .doc(docRef.id)
        .set({ id: docRef.id }, { merge: true });
      dispatch({ type: "CREATE_PRODUCE_ITEM", payload: data });
    })
    .catch((err) => {
      dispatch({ type: "CREATE_PRODUCE_ITEM_ERROR", err });
    });

  };
};


export const getProduceData = () => {
  return (dispatch, getState, { getFirestore }) => {
    const profile = getState().firebase.profile;
    const authUID = getState().firebase.auth.uid;

    var uid;
    switch (profile.type) {
      default:
      case "farm_admin":
        uid = authUID;
        break;
      case "farm_sub":
        uid = profile.admin;
    }

      getFirestore()
      .collection("marketplace")
      .doc(uid)
      .collection("produce")
      .get()
      .then((snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          items.push(doc.data());
        });
        dispatch({ type: "GET_PRODUCE_ITEM", payload: items });
      })
      .catch((err) => {
        dispatch({ type: "GET_PRODUCE_ITEM_ERROR", err });
      });
  };
};

export const editProduceData = (produce) => {
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
      .collection("produce")
      .doc(produce.id)
      .set(produce.upload, { merge: true })
      .then(() => dispatch({ type: "EDIT_PRODUCE", produce }))
      .catch((err) => {
        dispatch({ type: "EDIT_PRODUCE_ERROR", err });
      });
  };
};

export const deleteProduceData = (data) => {
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
      .collection("produce")
      .doc(data.id)
      .delete()
      .then(() => dispatch({ type: "DELETE_PRODUCE", data }))
      .catch((err) => {
        dispatch({ type: "DELETE_PRODUCE_ERROR", err });
      });
  };
};
