import firebase from "firebase/app";



// exporting consultant form details to firebase
export const createExample = (data) =>
{
    return (dispatch, getState, {getFirestore},{getFirebase}) =>{
        //async call
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
        .collection("consultants")
        .add(data)
        .then(()=> {
            dispatch ({type: 'CREATE-DATA'});
        }).catch((err)=>{
             dispatch({type: 'CREATE-DATA-ERROR'});
        })
        
    

    const firestore = getFirebase().firestore();
    const firebase = getFirebase();
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((resp) => {
        firestore
          .collection("consultants")
          .doc(resp.user.uid)
          .set({
            fullName: data.fullName,
            email:data.email,
            password:data.password
           
          });
        })
      }}


 // Fetching consultant data
 export const getUserData = () => {
  return (dispatch, getState, { getFirebase,getFirestore }) => {
    getFirestore()
      .collection("consultants")
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




