import { getFirebase } from 'react-redux-firebase';

export function FirebaseAdd(auth, data, collection, dispatch) {
        getFirebase()
            .firestore()
            .collection("data")
            .doc(auth.uid)
            .collection(collection)
            .doc()
            .set(data)
            .then(() => {
                dispatch({ type: "CREATE_DATA" });
              })
              .catch((err) => {
                dispatch({ type: "CREATE_DATA_ERROR", err });
              });
};