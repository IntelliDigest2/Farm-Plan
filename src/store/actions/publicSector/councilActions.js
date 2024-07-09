import firebase from "firebase/app";
import "firebase/firestore"; // Make sure to import firestore explicitly
import { getFirebase } from "react-redux-firebase";

// Assuming you have initialized Firebase elsewhere, e.g., firebase.initializeApp(config);

export const addMeals = (data, uid) => {
  return async (dispatch, getState, { getFirebase }) => {
    try {
      const firestore = firebase.firestore();

      // Update government_users collection
      const governmentUserRef = firestore
        .collection("government_users")
        .doc(uid);
      await governmentUserRef.set(
        {
          meals: firebase.firestore.FieldValue.arrayUnion(data),
        },
        { merge: true }
      );

      // Update users collection
      const userRef = firestore.collection("users").doc(uid);
      await userRef.set(
        {
          meals: firebase.firestore.FieldValue.arrayUnion(data),
        },
        { merge: true }
      );

      dispatch({ type: "COUNCIL_MEAL_CREATED" });
    } catch (err) {
      dispatch({ type: "COUNCIL_MEAL_ERROR", err });
      console.error("Error adding meal:", err);
    }
  };
};

export const removeMeal = (mealName, uid) => {
  return async (dispatch, getState, { getFirebase }) => {
    try {
      const firestore = firebase.firestore();
      // Get the current meals from the government_users document
      const governmentUserRef = firestore
        .collection("government_users")
        .doc(uid);
      const governmentUserDoc = await governmentUserRef.get();
      const currentGovernmentUserMeals = governmentUserDoc.data().meals || [];

      // Filter out the meal to be deleted
      const updatedGovernmentUserMeals = currentGovernmentUserMeals.filter(
        (meals) => meals.name !== mealName
      );

      // Update the government_users document
      await governmentUserRef.update({ meals: updatedGovernmentUserMeals });

      // Get the current meals from the users document
      const userRef = firestore.collection("users").doc(uid);
      const userDoc = await userRef.get();
      const currentUserMeals = userDoc.data().meals || [];

      // Filter out the meal to be deleted
      const updatedUserMeals = currentUserMeals.filter(
        (meals) => meals.name !== mealName
      );

      // Update the users document
      await userRef.update({ meals: updatedUserMeals });

      dispatch({ type: "COUNCIL_MEAL_REMOVED" });
    } catch (err) {
      dispatch({ type: "COUNCIL_MEAL_ERROR", err });
      console.error("Error removing meal:", err);
    }
  };
};
