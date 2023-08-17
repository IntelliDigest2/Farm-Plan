import firebase from "firebase/app";
import { generateId } from "../../components/Pages/Account/Consultant/utils/utils";
import axios from "axios";

export const signIn = (credentials) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		firebase
			.auth()
			.signInWithEmailAndPassword(credentials.email, credentials.password)
			.then(() => {
				dispatch({ type: "LOGIN_SUCCESS" });
			})
			.catch((err) => {
				dispatch({ type: "LOGIN_ERROR", err });
			});
	};
};

export const signOut = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		firebase
			.auth()
			.signOut()
			.then(() => {
				dispatch({ type: "SIGNOUT_SUCCESS" });
			});
	};
};

export const updatePassword = (credentials) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		firebase
			.auth()
			.currentUser.updatePassword(credentials.password)
			.then(() => {
				dispatch({ type: "CHANGE_SUCCESS" });
			})
			.catch((err) => {
				dispatch({ type: "CHANGE_ERROR", err });
			});
	};
};

export const updateEmail = (credentials) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		const firestore = getFirebase().firestore();

		const creds = firebase.auth.EmailAuthProvider.credential(
			credentials.email,
			credentials.password
		);

		firebase
			.auth()
			.currentUser.reauthenticateWithCredential(creds)
			.then(() => {
				firebase
					.auth()
					.currentUser.verifyBeforeUpdateEmail(credentials.newEmail)
					.then(() => {
						return firestore.collection("users").doc(credentials.uid).update({
							email: credentials.newEmail,
						});
					})
					.then(() => {
						dispatch({ type: "CHANGE_EMAIL_SUCCESS" });
					})
					.catch((err) => {
						dispatch({ type: "CHANGE_EMAIL_ERROR", err });
					});
			});
	};
};

export const updateProfile = (users) => {
	return (dispatch, getState, { getFirebase }) => {
		const firestore = getFirebase().firestore();

		firestore
			.collection("users")
			.doc(users.uid)
			.set({ ...users.profile }, { merge: true })
			.then(() => {
				dispatch({ type: "CHANGE_PROFILE_SUCCESS" });
			})
			.catch((err) => {
				console.log("err");
				dispatch({ type: "CHANGE_PROFILE_ERROR", err });
			});
	};
};

//sets isSeller in "users" and the profile in "marketplace"
export const becomeSeller = (seller) => {
	return (dispatch, getState, { getFirebase }) => {
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;

		var uid;
		switch (profile.type) {
			case "farm_admin":
				uid = authUID;
				break;
			case "farm_sub":
				uid = profile.admin;
				break;
			default:
				uid = authUID;
				break;
		}

		const firestore = getFirebase().firestore();

		firestore
			.collection("users")
			.doc(uid)
			.set({ ...seller.profile }, { merge: true })
			.then(() => {
				return firestore
					.collection("marketplace")
					.doc(uid)
					.set({ ...seller.info }, { merge: true });
			})
			.then(() => {
				dispatch({ type: "SELLER_SUCCESS" });
			})
			.catch((err) => {
				console.log("err");
				dispatch({ type: "SELLER_ERROR", err });
			});
	};
};

//sets isConsumer in "users" and the profile in "marketplace"
export const becomeConsumer = (consumer) => {
	return (dispatch, getState, { getFirebase }) => {
		const firestore = getFirebase().firestore();

		firestore
			.collection("users")
			.doc(consumer.uid)
			.set({ ...consumer.profile }, { merge: true })
			.then(() => {
				return firestore
					.collection("marketplace")
					.doc(consumer.uid)
					.set({ ...consumer.upload }, { merge: true });
			})
			.then(() => {
				dispatch({ type: "CONSUMER_SUCCESS" });
			})
			.catch((err) => {
				console.log("err");
				dispatch({ type: "CONSUMER_ERROR", err });
			});
	};
};

//not currently working
export const resetPassword = (credentials) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		firebase
			.auth()
			.sendPasswordResetEmail(credentials.email)
			.then(() => {
				dispatch({ type: "RESET_SUCCESS" });
			})
			.catch((err) => {
				dispatch({ type: "RESET_ERROR", err });
			});
	};
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

const uploadIdImage = (image) => {
	const randomId = generateId(20);
	const data = new FormData();
	data.append("file", image);
	data.append("upload_preset", "wft-app");
	data.append("cloud_name", "dghm4xm7k");
	// data.append("folder", "restaurant_id");
	data.append("public_id", `${randomId}`);

	let result = axios.post(
		"https://api.cloudinary.com/v1_1/dghm4xm7k/image/upload",
		data
	);

	return result;
	console.log(result.data.secure_url);
};

export const signUp = (newUser, image) => {
	// console.log(newUser, `this is the new user`);
	// console.log(image, `this is the image i want to upload`);

	// console.log(newUser.consultantInfo, `thes are the consultantInfo`);
	return (dispatch, getState, { getFirebase }) => {
		// let result = uploadIdImage(image).then((resp) => {
		// 	console.log(resp.data.secure_url);
		// 	console.log(resp.data.url);
		// });
		// 	//Determine account type
		var type;
		switch (newUser.function) {
			case "Hospitals":
			case "Hotels":
			case "Offices":
			case "Shop/Supermarket":
				type = "shop_admin";
				break;
			case "Recreational Centers":
			case "Consultant":
			case "Business":
				type = "business_admin";
				break;
			case "Restaurants":
				type = "restaurant_admin";
				break;
			case "Machinery/Supply":
				type = "supply_admin";
				break;
			case "Admin":
				type = "admin_admin";
				break;
			case "Schools":
				type = "academic_admin";
				break;
			case "Farm":
				type = "farm_admin";
				break;
			case "Households":
			case "Personal":
				type = "household_admin";
				break;
			default:
				type = "user";
				break;
		}

		const firestore = getFirebase().firestore();
		const firebase = getFirebase();
		let newUserId;
		// let imageUrl = "";

		firebase
			.auth()
			.createUserWithEmailAndPassword(newUser.email, newUser.password)
			.then((resp) => {
				newUserId = resp.user.uid;
				if (image) {
					return uploadIdImage(image);
				}
			})
			.then((resp) => {
				// newUserId = resp.user.uid;
				// console.log("createUserWithEmailAndPassword", newUserId);
				// resp
				let val = {
					// ...newUser,
					firstName: newUser.firstName,
					lastName: newUser.lastName,
					mobile: newUser.mobile,
					initials: newUser.firstName[0] + newUser.lastName[0],
					email: newUser.email,
					buildingFunction: newUser.function,
					city: newUser.city,
					country: newUser.country,
					region: newUser.region,
					uid: newUserId,
					balance: 0,
					//restaurant-specific user data:
					restaurantName: newUser.restaurantName,
					companyName: newUser.companyName,
					companyDescription: newUser.companyDescription,
					regulatoryBody: newUser.regulatoryBody,
					regulatoryBodyID: newUser.regulatoryBodyID,
					// IDUrl: resp.data.secure_url,
					IDNumber: newUser.IDNumber,
					IDType: newUser.IDType,
					cuisine: newUser.cuisine,
					restaurantDescription: newUser.restaurantDescription,
					type: type,
					// [newUser.consultantInfo ? "consultant" : ""]: "pending",
				};
				// if (resp) {
				// 	val.IDUrl = resp.data.secure_url;
				// } else {
				// 	val.IDUrl = newUser.IDUrl;
				// }


				if (newUser.consultantInfo) {
					val.verification = "pending";
				}
				if (newUser.function === "Admin") {
					val.adminType = newUser.adminType;
					val.verification = "pending";
				}
				firestore.collection("users").doc(newUserId).set(val);

				//Setup Admin account in relevent users collection
				var adminCollection;
				if (type === "business_admin") {
					adminCollection = "business_users";
				} else if (type === "academic_admin") {
					adminCollection = "academic_users";
				} else if (type === "farm_admin") {
					adminCollection = "farm_users";
				} else if (type === "household_admin") {
					adminCollection = "household_users";
				} else if (type === "supply_admin") {
					adminCollection = "supply_users";
				} else if (type === "shop_admin") {
					adminCollection = "shop_users";
				} else {
					adminCollection = "user";
				}

				if (adminCollection !== "user") {
					firestore
						.collection(adminCollection)
						.doc(newUserId)
						.set({
							name: newUser.firstName + " " + newUser.lastName,
							email: newUser.email,
						});
				}

				return resp;
			})
			.then((resp) => {
				// console.log(resp, `this is the response`);
				if (newUser.consultantInfo) {
					let userSubString = newUserId.substring(0, 7);

					return Promise.all(
						uploadImgs(newUser.consultantInfo.images, userSubString)
					);
				}
			})
			.then((resp) => {
				// console.log(resp);
				// console.log(newUserId, `this is the new userInfo stored earlier`);
				// console.log(newUser);

				if (newUser.consultantInfo) {
					// let { user, imageUrls } = resp;
					let urls = resp.map((result) => {
						return result.data.secure_url;
					});
					// let data= resp.
					// console.log(urls, `these are the urls`);
					let fullName = `${newUser.firstName} ${newUser.lastName}`;
					firestore
						.collection("consultants")
						.doc(newUserId)
						.set({
							fullName: fullName,
							email: newUser.email,
							urlLink: newUser.consultantInfo.urlLink,
							experience: newUser.consultantInfo.experience,
							expertise: newUser.consultantInfo.expertise,
							createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
							services: newUser.consultantInfo.services,
							summary: newUser.consultantInfo.summary,
							isActive: true,
							imgsLinks: {
								certificateImg: urls[0],
								identificationImg: urls[1],
							},

							// calendarEvents: [],
							// eventDaysArray: [],
						});
				}

				firebase.auth().currentUser.sendEmailVerification();
			})
			.then(() => {
				dispatch({ type: "SIGNUP_SUCCESS" });
			})
			.catch((err) => {
				console.log(err, `this is the error generated`);
				dispatch({ type: "SIGNUP_ERROR", err });
			});
	};
};

export const getUserData = (data) => {
	return (dispatch, getState, { getFirebase }) => {
		getFirebase()
			.firestore()
			.collection(data.collection)
			.doc(data.uid)
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

//Admin and Sub Account Auth Actions
export const createSubAccount = (data) => {
	return (dispatch, getState, { getFirebase }) => {
		/* 
    Initialize a secondary firebase app instance
    in order to create a new user account without
    automatically signing in as the new user.

    Then complete all actions to add data to
    firebase collections before deleting the secondary
    firebase app instance.

    This solution was found @:
    https://stackoverflow.com/questions/37517208/firebase-kicks-out-current-user/38013551#38013551
    */
		var config = {
			apiKey: "AIzaSyDuu8Fpwa2gYlCKcL-LlN-uqH5seEJpk9w",
			authDomain: "itracker-development.firebaseapp.com",
			projectId: "itracker-development",
			storageBucket: "itracker-development.appspot.com",
			messagingSenderId: "57163396396",
			appId: "1:57163396396:web:dd800621173f5733a4a889",
		};

		let secondaryApp = firebase.initializeApp(config, "second");

		var subUid;

		secondaryApp
			.auth()
			.createUserWithEmailAndPassword(data.email, data.password)
			.then((resp) => {
				subUid = resp.user.uid;
				//Create user document inside Admin's 'sub_accounts' collection
				getFirebase()
					.firestore()
					.collection(data.masterCollection)
					.doc(data.uid)
					.collection("sub_accounts")
					.doc(subUid)
					.set({
						email: data.email,
						name: data.firstName + " " + data.lastName,
						role: data.role,
					});
			})
			.then(() => {
				//Create user document inside 'users' base collection
				getFirebase()
					.firestore()
					.collection("users")
					.doc(subUid)
					.set({
						firstName: data.firstName,
						lastName: data.lastName,
						initials: data.firstName[0] + data.lastName[0],
						email: data.email,
						buildingFunction: data.function,
						city: data.city,
						country: data.country,
						region: data.region,
						admin: data.uid,
						type: data.type,
						restaurantName: data.restaurantName,
					});
			})
			.then(() => {
				secondaryApp.auth().currentUser.sendEmailVerification();
			})
			.then(() => {
				secondaryApp.auth().signOut();
			})
			.then(() => {
				secondaryApp.delete();
			})
			.then(() => {
				dispatch({ type: "CREATE_SUBACCOUNT" });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_SUBACCOUNT_ERROR", err });
			});
	};
};

export const deleteSubAccount = (data) => {
	return (dispatch, getState, { getFirebase }) => {
		/* 
    Initialize a secondary firebase app instance
    in order to delete a sub account without
    automatically signing in as the sub account
    before deletion.

    Then complete all actions to remove data from
    firebase collections before deleting the account 
    and then deleting the secondary firebase app 
    instance.

    This solution was found @:
    https://stackoverflow.com/questions/38800414/delete-a-specific-user-from-firebase
    */

		var config = {
			apiKey: "AIzaSyDuu8Fpwa2gYlCKcL-LlN-uqH5seEJpk9w",
			authDomain: "itracker-development.firebaseapp.com",
			projectId: "itracker-development",
			storageBucket: "itracker-development.appspot.com",
			messagingSenderId: "57163396396",
			appId: "1:57163396396:web:dd800621173f5733a4a889",
		};

		let secondaryApp = firebase.initializeApp(config, "second");

		var subUid;

		secondaryApp
			.auth()
			.signInWithEmailAndPassword(data.email, data.password)
			.then(() => {
				subUid = secondaryApp.auth().currentUser.uid;

				//Delete user document inside Admin's 'sub_accounts' collection
				getFirebase()
					.firestore()
					.collection(data.masterCollection)
					.doc(data.uid)
					.collection("sub_accounts")
					.doc(subUid)
					.delete();

				//Delete sub accounts user document
				getFirebase().firestore().collection("users").doc(subUid).delete();
			})
			.then(() => {
				secondaryApp.auth().currentUser.delete();
			})
			.then(() => {
				secondaryApp.auth().signOut();
			})
			.then(() => {
				secondaryApp.delete();
			})
			.then(() => {
				dispatch({ type: "DELETE_SUBACCOUNT" });
			})
			.catch((err) => {
				dispatch({ type: "DELETE_SUBACCOUNT_ERROR", err });
			});
	};
};

export const changeConsumerPostcode = (consumer) => {
	return (dispatch, getState, { getFirebase }) => {
		const firestore = getFirebase().firestore();

		firestore
			.collection("marketplace")
			.doc(consumer.uid)
			.set({ ...consumer.upload }, { merge: true })
			.then(() => {
				dispatch({ type: "CONSUMER_SUCCESS" });
			})
			.catch((err) => {
				console.log("err");
				dispatch({ type: "CONSUMER_ERROR", err });
			});
	};
};

export const getConsumerPostcode = (uid) => {
	return (dispatch, getState, { getFirebase }) => {
		const firestore = getFirebase().firestore();

		firestore
			.collection("marketplace")
			.doc(uid)
			.get()
			.then((snapshot) => {
				dispatch({ type: "GET_DATA", payload: snapshot.data() });
			})
			.catch((err) => {
				dispatch({ type: "GET_DATA_ERROR", err });
			});
	};
};
