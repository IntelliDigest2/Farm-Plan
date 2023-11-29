import { submitNotificationPlan } from "../../../components/lib/Notifications";
import firebase from "firebase";

const db = firebase.firestore();

export const addToInventory = (data) => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
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

		const item = data.upload.item;

		getFirestore()
			.collection("marketplace")
			.doc(uid)
			.collection("inventory")
			.add(data.upload)
			.then((docRef) => {
				// make the docId easily accessible so that we can delete it later if we want.
				getFirestore()
					.collection("marketplace")
					.doc(uid)
					.collection("inventory")
					.doc(docRef.id)
					.set({ id: docRef.id }, { merge: true });
				dispatch({ type: "CREATE_INVENTORY_ITEM" });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_INVENTORY_ITEM_ERROR", err });
			});
	};
};

export const addToPurchaseItems = (data) => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
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
		// let adminRef = getFirestore()
		// 	.collection("admin_users")
		// 	.where("city", "==", profile.city);

		// let notification = {
		// 	notification_type: "adminPurchase_request",
		// 	created_at: firebase.firestore.Timestamp.fromDate(new Date()),
		// };
		const batch = db.batch();

		let purchasesRef = getFirestore().collection("purchases");
		let newData = { ...data.upload, uid: uid };

		const newPurchaseRef = purchasesRef.doc()

		// .add({ ...data.upload, uid: uid })
		// .then((docRef) => {
		// 	//   // make the docId easily accessible so that we can delete it later if we want.
		// 	getFirestore()
		// 		.collection("purchases")
		// 		.doc(docRef.id)
		// 		.set({ id: docRef.id, uid: uid }, { merge: true });
		// 	// dispatch({ type: "ADD_PURCHASE_ITEM", data });
		// });

		// i will have to update this because multiple admins can be in the same city meaning that we will have to loop through does
		//  admins and use batch.set to send notifications to for each of them
		// batch.set(adminRef, notification);
		batch.set(newPurchaseRef, newData);
		return batch.commit();

		// .catch((err) => {
		//   dispatch({ type: "ADD_PURCHASE_ITEM_ERROR", err });
		// });
	};
};

export const editPurchaseStatus = (data) => {
	return (dispatch, getState, { getFirestore }) => {
		getFirestore()
			.collection("purchases")
			.doc(data.refID)
			.set({ status: data.status }, { merge: true })
			.then(() => dispatch({ type: "EDIT_PURCHASE", data }))
			.catch((err) => {
				dispatch({ type: "EDIT_PURCHASE_ERROR", err });
			});
	};
};

export const editPurchaseStatusFromUser = (data) => {
	return (dispatch, getState, { getFirestore }) => {
		getFirestore()
			.collection("purchases")
			.doc(data.refID)
			.set({ status: data.status }, { merge: true })
			.then(() => dispatch({ type: "EDIT_PURCHASE", data }))
			.catch((err) => {
				dispatch({ type: "EDIT_PURCHASE_ERROR", err });
			});
	};
};

export const editPurchaseStatusOnUser = (data) => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
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
			.collection("marketplace")
			.doc(uid)
			.collection("messages")
			.doc(data.refID)
			.set({ status: data.status }, { merge: true })
			.then(() => dispatch({ type: "EDIT_PURCHASE_STATUS", payload: data }))
			.catch((err) => {
				dispatch({ type: "EDIT_PURCHASE_STATUS_ERROR", err });
			});
	};
};



export const editPurchaseStatusOnUserRes = (data) => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
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
			.collection("marketplace")
			.doc(uid)
			.collection("restaurantOrders")
			.doc(data.refID)
			.set({ status: data.status }, { merge: true })
			.then(() => dispatch({ type: "EDIT_PURCHASE_STATUS", payload: data }))
			.catch((err) => {
				dispatch({ type: "EDIT_PURCHASE_STATUS_ERROR", err });
			});
	};
};

export const editPurchaseStatusOnFarmer = (data) => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
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
			.collection("farm_users")
			.doc(data.farmerID)
			.collection("messages")
			.doc(data.farmerRef)
			.set({ status: data.status }, { merge: true })
			.then(() => dispatch({ type: "EDIT_PURCHASE_STATUS", payload: data }))
			.catch((err) => {
				dispatch({ type: "EDIT_PURCHASE_STATUS_ERROR", err });
			});
	};
};

export const editPurchaseStatusOnFarmerSupplier = (data) => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
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
			.collection("farm_users")
			.doc(uid)
			.collection("supplyOrders").doc(data.refID)
			.set({ status: data.status }, { merge: true })
			.then(() => dispatch({ type: "EDIT_PURCHASE_STATUS", payload: data }))
			.catch((err) => {
				dispatch({ type: "EDIT_PURCHASE_STATUS_ERROR", err });
			});
	};
};

export const editPurchaseItem = (data) => {
	return (dispatch, getState, { getFirebase }) => {
		//console.log("check:", mealPlan)

		getFirebase()
			.firestore()
			.collection("purchases")
			.doc(data.id)
			.set(data.upload, { merge: true })
			.then(() => dispatch({ type: "EDIT_MEAL", data }))
			.catch((err) => {
				dispatch({ type: "EDIT_MEAL_ERROR", err });
			});
	};
};

export const addToWasteItems = (data) => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
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
			.collection("marketplace")
			.doc(uid)
			.collection("wasteItems")
			.add(data.upload)
			.then((docRef) => {
				// make the docId easily accessible so that we can delete it later if we want.
				getFirestore()
					.collection("marketplace")
					.doc(uid)
					.collection("wasteItems")
					.doc(docRef.id)
					.set({ id: docRef.id }, { merge: true });
				dispatch({ type: "CREATE_WASTE_ITEM", data });
			})
			.catch((err) => {
				dispatch({ type: "CREATE_WASTE_ITEM_ERROR", err });
			});
	};
};

export const getInventory = () => {
	return (dispatch, getState, { getFirestore }) => {
		//make async call to database
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
			.collection("marketplace")
			.doc(uid)
			.collection("inventory")
			.get()
			.then((snapshot) => {
				const data = [];
				snapshot.forEach((doc) => {
					data.push(doc.data());
				});
				dispatch({ type: "GET_INVENTORY", payload: data });
			})
			.catch((err) => {
				dispatch({ type: "GET_INVENTORY_ERROR", err });
			});
	};
};

export const RemoveFromInventory = (data) => {
	return (dispatch, getState, { getFirebase }) => {
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

		getFirebase()
			.firestore()
			.collection("marketplace")
			.doc(uid)
			.collection("inventory")
			.doc(data.id)
			.delete()
			.then(() => console.log("successfully deleted! "))
			.catch((err) => {
				dispatch(console.log("Error removing document:", err));
			});
	};
};

export const editInventoryData = (data) => {
	return (dispatch, getState, { getFirebase }) => {
		//make async call to database
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

		getFirebase()
			.firestore()
			.collection("marketplace")
			.doc(uid)
			.collection("inventory")
			.doc(data.id)
			.set(data.upload, { merge: true })
			.then(() => dispatch({ type: "EDIT_PLAN", data }))
			.catch((err) => {
				dispatch({ type: "EDIT_PLAN_ERROR", err });
			});
	};
};

export const updateQuantity = (data) => {
	return (dispatch, getState, { getFirebase }) => {
		//make async call to database
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

		getFirebase()
			.firestore()
			.collection("marketplace")
			.doc(uid)
			.collection("inventory")
			.where("item", "==", data.id)

			.get()
			.then((results) => {
				if (results.empty) {
					submitNotificationPlan(
						"Success..",
						"Some Items in this meal was not found in inventory"
					);
				} else {
					// go through all results
					results.forEach((doc) => {
						console.log("Document data:", doc.data().item);
						doc.ref.set(
							{
								quantity: doc.data().quantity - data.quantity,
							},
							{ merge: true }
						);
					});
				}
			})
			.catch((error) => {
				console.log("Error getting documents:", error);
			});
		//.doc(data.id)
		// .then(() => dispatch({ type: "EDIT_INVENTORY", data }))
		// .catch((err) => {
		//   dispatch({ type: "EDIT_INVENTORY_ERROR", err });
		// });
	};
};
