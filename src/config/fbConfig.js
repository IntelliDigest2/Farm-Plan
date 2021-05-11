import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var fbConfig = {
    apiKey: "AIzaSyDuu8Fpwa2gYlCKcL-LlN-uqH5seEJpk9w",
    authDomain: "itracker-development.firebaseapp.com",
    projectId: "itracker-development",
    storageBucket: "itracker-development.appspot.com",
    messagingSenderId: "57163396396",
    appId: "1:57163396396:web:dd800621173f5733a4a889"
};

// Initialize Firebase
firebase.initializeApp(fbConfig);
// firebase.firestore;

export default fbConfig;

export const auth = firebase.auth;

export const fs = firebase.firestore();
