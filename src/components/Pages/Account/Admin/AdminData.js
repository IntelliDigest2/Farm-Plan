import firebase from "firebase";
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
const db = firebase.firestore();

export const getConsultantImages = async (userId) => {
	// console.log(userId, `this is the userId`);
	let result = await db.collection("consultants").doc(userId).get();
	// console.log(result.data(), `this is the returned data`);

	return result.data().imgsLinks;
};

export const activateConsultant = async (userId) => {
	console.log(userId, `this is the userId`);
	let result = await db.collection("users").doc(userId).update({
		consultant: "active",
	});

	console.log(result);
	return result;
};
