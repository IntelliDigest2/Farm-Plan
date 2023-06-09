// AUTH ACTION
import firebase from "firebase/app";
import { generateId } from "../../../components/Pages/Account/Consultant/utils/utils";

import axios from "axios";
import emailjs from "@emailjs/browser";

export const signIn = (credentials) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		dispatch({ type: "LOGIN_CONSULTANT_LOADING" });

		firebase
			.auth()
			.signInWithEmailAndPassword(credentials.email, credentials.password)
			.then(() => {
				dispatch({ type: "LOGIN_CONSULTANT_SUCCESS" });
			})
			.catch((err) => {
				dispatch({ type: "LOGIN_CONSULTANT_ERROR", err });
			});
	};
};

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
	console.log(data);

	return (dispatch, getState, { getFirestore, getFirebase }) => {
		//create account for consultant through auth
		let newUserId;

		const firestore = getFirebase().firestore();
		const firebase = getFirebase();
		dispatch({ type: "CONSULTANT_SIGNUP_LOADING" });

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
						calendarEvents: [],
						eventsDatesArray: [],
					});
			})
			.then(() => {
				// sendConsultantAccountCreatedEmail(newUserId, data.email);
				dispatch({ type: "CONSULTANT_SIGNUP_SUCCESS", payload: data });
			})
			.catch((err) => {
				console.log(err);
				dispatch({ type: "CONSULTANT_SIGNUP_ERROR", payload: err });
			});
	};
};

export const setErrorToDefault = (errorName) => {
	return (dispatch) => {
		dispatch({ type: "SET_DEFAULT_ERROR", payload: errorName });
	};
};
