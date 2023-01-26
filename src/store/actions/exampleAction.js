export const createExample = (data) => {
  return (dispatch, getState, { getFirestore }) => {
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
      case "farm_admin":
        uid = authUID;
        break;
      case "farm_sub":
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
      .collection("example")
      .add(data)
      .then(() => {
        dispatch({ type: "CREATE_DATA" });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_DATA_Error" });
      });
  };
};

export const getExample = (data) => {
  return (dispatch, getState, { getFirestore }) => {
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
      case "farm_admin":
        uid = authUID;
        break;
      case "farm_sub":
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
      .collection("example")
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
