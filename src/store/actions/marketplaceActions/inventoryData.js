export const addToInventory = (data) => {
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
      .collection("marketplace")
      .doc(uid)
      .collection("inventory")
      .add(data.upload)
      .then((docRef) => {
        // make the docId easily accessible so that we can delete it later if we want.
        getFirestore()
          .collection("marketplace")
          .doc(uid)
          .collection("inventory")
          .doc(docRef.id)
          .set({ id: docRef.id }, { merge: true });
        dispatch({ type: "CREATE_DATA" });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_DATA_ERROR", err });
      });
    };
  };
  
  export const getInventory = (data) => {
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
        .collection("inventory")
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
  
  export const RemoveFromInventory = (data) => {
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
        .collection("inventory")
        .doc(data.id)
        .delete()
        .then(() => console.log("successfully deleted! "))
        .catch((err) => {
          dispatch(console.log("Error removing document:", err));
        });
    };
  };
  