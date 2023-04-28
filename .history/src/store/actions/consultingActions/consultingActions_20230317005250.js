import { serverTimestamp } from "firebase/app";
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

function makeid(length) {
	let result = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
}

const uploadImgs = (files, userId) => {
	console.log(files);
	const randomId = makeid(20);
	const uploaders = files.map((file, index) => {
		const fileToUpload = Object.values(file)[0];
		console.log(fileToUpload);
		const data = new FormData();
		data.append("file", fileToUpload);
		data.append("upload_preset", "wft-app-consultant");
		data.append("cloud_name", "dghm4xm7k");
		data.append("public_id", `${randomId}-${userId}`);

		return axios.post(
			"https://api.cloudinary.com/v1_1/dghm4xm7k/image/upload",
			data
		);
	});

	console.log(uploaders);

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
		let newUserId;

		const firestore = getFirebase().firestore();
		const firebase = getFirebase();

		firebase
			.auth()
			.createUserWithEmailAndPassword(data.email, data.password)
			.then((resp) => {
				newUserId = resp.user.uid;
				console.log(resp.user.uid);
				let userSubString = newUserId.substring(0, 7);

				return Promise.all(uploadImgs(data.images, userSubString));
			})
			.then((resp) => {
				let urls = resp.map((result) => {
					return result.data.url;
				});
				console.log(urls, "this is the urls for the new created user");

				firestore
					.collection("consultants")
					.doc(newUserId)
					.set({
						fullName: data.fullName,
						email: data.email,
						urlLink: data.urlLink,
						experience: data.experience,
						expertise: data.expertise,
						createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
						services: data.services,
						summary: data.summary,
						isActive: true,
						imgsLinks: [
							{ certificateImg: urls[0] },
							{ identificationImg: urls[1] },
						],
					});
			})
			.catch((err) => {
				console.log(err);
			});
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
