import firebase from "firebase";
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
const db = firebase.firestore();

export const getConsultantImages = async (userId, accountType) => {
	// console.log(userId, `this is the userId`);
	// console.log(accountType, `this is the accountType`);
	if (accountType === "Restaurant Admin" || accountType === "User Admin") {
		let result = (await db.collection(`users`).doc(userId).get()).data();
		// console.log(result);

		// let data = result.data();

		return {
			accountType: "admin",
			images: { [`${result.IDType}`]: result.IDUrl },
			verificationStatus: result.verification,
			idType: result.IDType,
		};
	} else {
		let result = (
			await db.collection(`${accountType}`).doc(userId).get()
		).data().imgsLinks;

		let ver;
		let ref = db.collection("users").doc(userId);
		// let result2 = ref.onSnapshot((res) => {
		// 	res.data();

		// 	ver = res.data().verfication;
		// 	console.log(res.data().verification, `verfication result`);

		// 	return res.data().verification;
		// });
		let result2 = (await db.collection("users").doc(userId).get()).data()
			.verification;

		return {
			images: result,
			verificationStatus: result2,
		};
	}

	// Code to handle the snapshot changes
	// console.log("Document ID:", result2.id);
	// console.log("Document data:", result2.data());
};

export const activateConsultant = async (userId) => {
	// console.log(userId, `this is the userId`);
	let result = await db.collection("users").doc(userId).update({
		verification: "verified",
	});

	// console.log(result);
	return result;
};
