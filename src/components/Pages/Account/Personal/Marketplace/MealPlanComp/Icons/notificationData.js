export const getNotificationData = (lastDate) => {
	return (dispatch, getState, { getFirestore, getFirebase }) => {
		//make async call to database
		const profile = getState().firebase.profile;
		const authUID = getState().firebase.auth.uid;
		// console.log(`here my friend`);

		// console.log(profile, `this is the profile from the bar`);

		var uid;
		let collection =
			profile.buildingFunction === "Restaurants"
				? "restaurant_users"
				: profile.buildingFunction === "Consultant"
				? "consultants"
				: profile.buildingFunction === "Farm"
				? "farm_users"
				: profile.buildingFunction === "Machinery/Supplier"
				? "supply_users"
				: profile.buildingFunction === "Schools"
				? "academic_users"
				: // : profile.buildingFunction === 'Other' ?
				// : profile.buildingFunction === 'Offices' ?
				profile.buildingFunction === "Shop"
				? "shop_users"
				: // : profile.buildingFunction === 'Admin' ?
				  // : profile.buildingFunction === 'Hospitals' ?
				  // : profile.buildingFunction === 'Hotels' ?
				  "school_users";

		// console.log(collection, `this is the collection`);

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
		// console.log(uid, `this is the user id`);

		let date = getFirebase().firestore.Timestamp.fromDate(new Date());

		const collectionRef = getFirestore()
			.collection(collection)
			.doc(uid)
			.collection("notifications");

		let query;
		if (lastDate) {
			// console.log(lastDate, `this is the last date on notificationData.js`);

			query = collectionRef.where("created_at", ">", lastDate);
		} else {
			query = collectionRef;
		}

		return query.orderBy("created_at", "desc").onSnapshot(
			(docs) => {
				//   if (doc.exists) {
				// Document data is available in the doc object

				const notifications = [];
				docs.forEach((doc) => {
					let document = doc.data();

					notifications.push(document);
				});
				// console.log(notifications, `these are the notifications`);
				dispatch({
					type: "GET_USER_NOTIFICATIONS_SUCCESS",
					payload: notifications,
				});

				//   } else {
				// Document doesn't exist

				//   }
			},
			(error) => {
				console.log(error, `this is the error that was returned`);
				// Handle errors gracefully
				dispatch({ type: "GET_USER_NOTIFICATIONS__ERROR", error });
			}
		);
	};
};

const setUsersCollection = (buildingFunction) => {
	// console.log(buildingFunction === "Farm", `checks if this is true`);
	let userCollection;
	switch (buildingFunction) {
		case "Farm":
			userCollection = "farm_users";
			break;
		case "Households":
			userCollection = "household_users";
			break;
		case "Restaurants":
			userCollection = "restaurant_users";
			break;
		case "Consultant":
			userCollection = "consultants";
			break;
		case "Offices":
			userCollection = "office_users";
			break;
		case "Hotels":
			userCollection = "hotel_users";
			break;
		case "Shop":
			userCollection = "shop_users";
			break;

		default:
			userCollection = "supply_users";
	}
	// console.log(userCollection, `the bottom side`);

	return userCollection;
};

export const setNotificationBulbStatus = (status) => {
	return (dispatch, getState) => {
		dispatch({
			type: "SET_NOTIFICATIONS_STATUS",
			payload: status,
		});
	};
};
export const sendPaymentNotificationToSeller = ({
	personReceivingPaymentAccountType,
	personReceivingPaymentID,
}) => {
	return (dispatch, getState, getFirestore) => {
		let userCollection = setUsersCollection(personReceivingPaymentAccountType);

		let notificationRef = getFirestore()
			.collection(userCollection)
			.doc(personReceivingPaymentID)
			.collection("notifications");

		let notification = {
			notification_type: "payment notification",
			created_at: getFirestore.Timestamp.fromDate(new Date()),
		};

		notificationRef.add(notification);
	};
};
