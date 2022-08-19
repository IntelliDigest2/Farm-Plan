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
