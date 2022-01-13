import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/messaging";

var fbConfig = {
  apiKey: "AIzaSyDuu8Fpwa2gYlCKcL-LlN-uqH5seEJpk9w",
  authDomain: "itracker-development.firebaseapp.com",
  projectId: "itracker-development",
  storageBucket: "itracker-development.appspot.com",
  messagingSenderId: "57163396396",
  appId: "1:57163396396:web:dd800621173f5733a4a889",
};

// Initialize Firebase
firebase.initializeApp(fbConfig);
// firebase.firestore;

const messaging = firebase.messaging();

// Pretty sure this is not necessary.
// const { REACT_APP_VAPID_KEY } = process.env;
// const publicKey = REACT_APP_VAPID_KEY;

export const getToken = (setTokenFound) => {
  return messaging
    .getToken()
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });

export default fbConfig;

export const auth = firebase.auth;

export const fs = firebase.firestore();
