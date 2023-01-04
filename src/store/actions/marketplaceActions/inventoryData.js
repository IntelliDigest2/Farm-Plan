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
      dispatch({ type: "CREATE_INVENTORY_ITEM" });
    })
    .catch((err) => {
      dispatch({ type: "CREATE_INVENTORY_ITEM_ERROR", err });
    });
  };
};

export const getInventory = () => {
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
        dispatch({ type: "GET_INVENTORY", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "GET_INVENTORY_ERROR", err });
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

export const editInventoryData = (data) => {
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
      .collection("inventory")
      .doc(data.id)
      .set(data.upload, { merge: true })
      .then(() => dispatch({ type: "EDIT_PLAN", data }))
      .catch((err) => {
        dispatch({ type: "EDIT_PLAN_ERROR", err });
      });
  };
};

  export const updateQuantity = (data) => {
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
        .collection("inventory")
        .where("item", "==", data.id)

        .get().then((results) => {
          if(results.empty) {
            console.log("No documents found!");   
          } else {
            // go through all results
            results.forEach((doc) => {
              console.log("Document data:", doc.data().item);
              doc.ref.set(
                {
                  quantity: doc.data().quantity - data.quantity,
                },
                { merge: true}
              ) 
            });
          }
        }).catch((error) => {
            console.log("Error getting documents:", error);
        });
        //.doc(data.id)
        // .then(() => dispatch({ type: "EDIT_INVENTORY", data }))
        // .catch((err) => {
        //   dispatch({ type: "EDIT_INVENTORY_ERROR", err });
        // });
    };
  };