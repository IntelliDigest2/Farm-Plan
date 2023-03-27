import firebase from "firebase/app";
import axios from "axios";

// exporting consultant form details to firebase

// if (userInfo.imgUrl) {
// 	axios
// 		.post(
// 			"https://api.cloudinary.com/v1_1/intellidigest/image/upload",
// 			formData
// 		)
// 		.then((resp) => {
// 			// console.log("overhere");

// 			user.updateProfile({
// 				photoURL: resp.data.url,
// 			});

// 			firestore.collection("users").doc(userInfo.userId).update({
// 				image: resp.data.url,
// 			});
// 		});
// }

const uploadImgs = (files) => {
	console.log(files);
	const uploaders = files.map((file) => {
		const fileToUpload = Object.values(file)[0];
		const data = new FormData();
		data.append("file", fileToUpload);
		data.append("folder", "consultantCredentialsandIDs");
		data.append("upload_preset", "wft-app");
		data.append("cloud_name", "dghm4xm7k");

		return axios.post(
			"https://api.cloudinary.com/v1_1/dghm4xm7k/image/upload",
			data
		);
	});

	return uploaders;

	// .then((response) => {
	// 	const data = response.data;
	// 	const fileURL = data.secure_url; // You should store this URL for future references in your app
	// 	console.log(data);
	// });
};

export const consultantSignup = (data) => {
	return (dispatch, getState, { getFirestore, getFirebase }) => {
		//create account for consultant through auth
		Promise.all(uploadImgs(data.images))
			.then((result) => {
				console.log(result);
			})
			.catch((err) => {
				console.log(err);
			});
		// const firestore = getFirebase().firestore();
		// const firebase = getFirebase();
		// firebase
		// 	.auth()
		// 	.createUserWithEmailAndPassword(data.email, data.password)
		// 	.then((resp) => {
		// 		Promise.all(uploadImgs(data.imgs)).then((result) => {
		// 			const newUserId = resp.user.uid;
		// 			console.log(result);
		// 			console.log(resp);
		// 			firestore
		// 				.collection("consultants")
		// 				.doc(newUserId)
		// 				.set({
		// 					fullName: data.fullName,
		// 					email: data.email,
		// 					urlLink: data.urlLink,
		// 					experience: data.experience,
		// 					expertise: data.expertise,
		// 					createdAt: firestore.ServerValue.TIMESTAMP.now(),
		// 					services: data.services,
		// 					summary: data.summary,
		// 					isActive: true,
		// 					imgsLinks: [
		// 						{ certificateImg: result.img1 },
		// 						{ identificationImg: result.img1 },
		// 					],
		// 				});
		// 		});
		// 	});
	};
};
export const createExample = (data) => {
	return (dispatch, getState, { getFirestore }, { getFirebase }) => {
		//create account for consultant through auth
		const firestore = getFirebase().firestore();
		const firebase = getFirebase();
		firebase
			.auth()
			.createUserWithEmailAndPassword(data.email, data.password)
			.then((resp) => {
				firestore.collection("consultants").doc(resp.user.uid).set({
					fullName: data.fullName,
					email: data.email,
					password: data.password,
				});
			});

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
			.then(() => {
				dispatch({ type: "CREATE-DATA" });
			})
			.catch((err) => {
				dispatch({ type: "CREATE-DATA-ERROR" });
			});
	};
};

// Fetching consultant data
export const getUserData = () => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
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
