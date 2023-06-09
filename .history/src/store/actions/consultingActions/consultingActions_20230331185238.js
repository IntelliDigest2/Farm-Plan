import axios from "axios";
import emailjs from "@emailjs/browser";

function generateId(length) {
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

// for the email
const sendConsultantAccountCreatedEmail = (consultantId, consultantEmail) => {
	const params = {
		consultantId: consultantId,
		dateCreated: new Date(),
		newConsultantEmail: consultantEmail,
	};
	emailjs.sendForm("gmail", "template_zgc9kqb", params);
};

function uploadImgs(files, userId) {
	const uploaders = files.map((file, index) => {
		const randomId = generateId(20);
		const fileToUpload = Object.values(file)[0];
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

	return uploaders;
}

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
				let userSubString = newUserId.substring(0, 7);

				return Promise.all(uploadImgs(data.images, userSubString));
			})
			.then((resp) => {
				let urls = resp.map((result) => {
					return result.data.url;
				});

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
						events: [],
					});
			})
			.then(() => {
				sendConsultantAccountCreatedEmail(newUserId, data.email);
				// dispatch({ type: "GET_DATA", payload: data });
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

//fetch consultant data

export const fetchConsultantData = (consultantId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		getFirestore()
			.collection("consultants")
			.doc(consultantId)
			.onSnapshot((doc) => {
				console.log("Current data: ", doc.data());
			});
	};
};

export const addConsultantEvent = (newEvent, consultantId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		getFirestore()
			.collection("consultants")
			.doc(consultantId)
			.update({ events: getFirestore.FieldValue.arrayUnion() });
		// .events.arrayUnion(newEvent);
	};
};
