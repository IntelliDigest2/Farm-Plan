

export const createExample = (data) =>
{
    return (dispatch, getState, {getFirestore}) =>{
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
        
    }
}


  