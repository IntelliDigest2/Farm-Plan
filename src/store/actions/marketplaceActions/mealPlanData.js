export const createMealPlanData = (mealPlan) => {
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
      .collection("mealDiary")
      .doc(mealPlan.month)
      .collection(mealPlan.day)
      .add(mealPlan.upload)
      .then((docRef) => {
        // make the docId easily accessible so that we can delete it later if we want.
        getFirebase()
          .firestore()
          .collection("marketplace")
          .doc(uid)
          .collection("mealDiary")
          .doc(mealPlan.month)
          .collection(mealPlan.day)
          .doc(docRef.id)
          .set({ id: docRef.id }, { merge: true });
        dispatch({ type: "CREATE_MEAL", mealPlan });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_MEAL_ERROR", err });
      });
  };
};

export const getMealData = (meals) => {
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
      .collection("mealPlanData")
      .doc(meals.month)
      .collection(meals.day)
      .get()
      .then((snapshot) => {
        const mealPlan = [];
        snapshot.forEach((doc) => {
          mealPlan.push(doc.data());
        });
        dispatch({ type: "GET_MEALS", payload: mealPlan });
      })
      .catch((err) => {
        dispatch({ type: "GET_MEALS_ERROR", err });
      });
  };
};

export const getMealDiary = (meals) => {
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
      .collection("mealDiary")
      .doc(meals.month)
      .collection(meals.day)
      .get()
      .then((snapshot) => {
        const mealPlan = [];
        snapshot.forEach((doc) => {
          mealPlan.push(doc.data());
        });
        dispatch({ type: "GET_MEAL_DIARY", payload: mealPlan });
      })
      .catch((err) => {
        dispatch({ type: "GET_MEAL_DIARY_ERROR", err });
      });
  };
};

export const getSingleMealDiary = (data) => {
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
      .collection("mealDiary")
      .doc(data.month)
      .collection(data.day).where('id', '==', data.id)
      .get()
      .then((snapshot) => {
        let meal
        snapshot.forEach(doc => meal = doc.data());
        dispatch({ type: "GET_SINGLE_MEAL_DIARY", payload: meal });
      })
      .catch((err) => {
        dispatch({ type: "GET_SINGLE_MEAL_DIARY_ERROR", err });
      });
  };
};



export const editMealData = (mealPlan) => {
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

    //console.log("check:", mealPlan)
    
    getFirebase()
      .firestore()
      .collection("marketplace")
      .doc(uid)
      .collection("newPlan")
      .doc(mealPlan.id)
      .set(mealPlan.upload, { merge: true })
      .then(() => dispatch({ type: "EDIT_MEAL", mealPlan }))
      .catch((err) => {
        dispatch({ type: "EDIT_MEAL_ERROR", err });
      });
  };
};

export const editDiaryData = (mealPlan) => {
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
      .collection("mealDiary")
      .doc(mealPlan.month)
      .collection(mealPlan.day)
      .doc(mealPlan.id)
      .set(mealPlan.upload, { merge: true })
      .then(() => dispatch({ type: "EDIT_DIARY_MEAL", mealPlan }))
      .catch((err) => {
        dispatch({ type: "EDIT_DIARY_MEAL_ERROR", err });
      });
  };
};


export const deleteMealData = (mealPlan) => {
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
      .collection("mealDiary")
      .doc(mealPlan.month)
      .collection(mealPlan.day)
      .doc(mealPlan.id)
      .delete()
      .then(() => dispatch({ type: "DELETE_MEAL", mealPlan }))
      .catch((err) => {
        dispatch({ type: "DELETE_MEAL_ERROR", err });
      });
  };
};

export const recommend = (data) => {
  return (dispatch, getState, { getFirebase }) => {
    getFirebase()
      .firestore()
      .collection("recommendations")
      .add(data)
      .then(() => {
        dispatch({ type: "CREATE_DATA" });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_DATA_ERROR", err });
      });
  };
};

export const getAllMarketplaceUsers = () => {
  return (dispatch, getState, { getFirebase }) => {
    //make async call to database

    getFirebase()
      .firestore()
      .collection("marketplace")
      .get()
      .then((snapshot) => {
        const userList = [];
        snapshot.forEach((doc) => {
          userList.push(doc.id);
        });
        dispatch({ type: "GET_DATA", payload: userList });
      })
      .catch((err) => {
        dispatch({ type: "GET_DATA_ERROR", err });
      });
  };
};

export const getMealDataForUID = (uid, meals) => {
  return (dispatch, getState, { getFirebase }) => {
    //make async call to database

    getFirebase()
      .firestore()
      .collection("marketplace")
      .doc(uid)
      .collection("mealPlanData")
      .doc(meals.month)
      .collection(meals.day)
      .get()
      .then((snapshot) => {
        const mealPlan = [];
        snapshot.forEach((doc) => {
          mealPlan.push(doc.data());
        });
        dispatch({ type: "GET_MEALS", payload: mealPlan });
      })
      .catch((err) => {
        dispatch({ type: "GET_MEALS_ERROR", err });
      });
  };
};

export const getOrderInfo = (info) => {
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
      .collection("restaurantOrders")
      .get()
      .then((snapshot) => {
        const orderInfo = [];
        snapshot.forEach((doc) => {
          orderInfo.push(doc.data());
        });
        dispatch({ type: "GET_PURCHASE_ORDER_RS", payload: orderInfo });
      })
      .catch((err) => {
        dispatch({ type: "GET_PURCHASE_ORDER_RS_ERROR", err });
      });
  };
};

export const getPurchaseInfo = (info) => {
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
      .collection("messages")
      .onSnapshot(
				(querySnapshot) => {
					let orderInfo = [];
					querySnapshot.forEach((doc) => {
						// console.log(doc.id, " => ", doc.data()); // Log the document ID and data
            const data = doc.data();
            if (data.status !== "COMPLETED" || data.status === "CONFIRMED") {
              orderInfo.push({ eventId: doc.id, ...data });
            }
						orderInfo.push({ eventId: doc.id, ...doc.data() });
					});

					dispatch({
						type: "GET_PURCHASE_INFO",
						payload: orderInfo,
					});
				},
				(err) => {
					console.log(err);
					dispatch({ type: "GET_PURCHASE_INFO_ERROR", err });
				}
			);
      // .get()
      // .then((snapshot) => {
      //   const orderInfo = [];
      //   snapshot.forEach((doc) => {
      //     // orderInfo.push(doc.data());
      //     const data = doc.data();
			// 		if (data.status !== "COMPLETED") {
			// 		  orderInfo.push(data);
			// 		}
      //   });
      //   dispatch({ type: "GET_PURCHASE_INFO", payload: orderInfo });
      // })
      // .catch((err) => {
      //   dispatch({ type: "GET_PURCHASE_INFO_ERROR", err });
      // });
  };
};


export const getOrderInfoFromRes = (info) => {
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
      .collection("restaurantOrders")
      .onSnapshot(
				(querySnapshot) => {
					let orderInfo = [];
					querySnapshot.forEach((doc) => {
						// console.log(doc.id, " => ", doc.data()); // Log the document ID and data
            const data = doc.data();
            if (data.status !== "COMPLETED" || data.status === "CONFIRMED") {
              orderInfo.push({ eventId: doc.id, ...data });
            }
						// orderInfo.push({ eventId: doc.id, ...doc.data() });
					}); 

					dispatch({
						type: "GET_PURCHASE_ORDER_RES",
						payload: orderInfo,
					});
				},
				(err) => {
					console.log(err);
					dispatch({ type: "GET_PURCHASE_ORDER_RES_ERROR", err });
				}
			);
      // .get()
      // .then((snapshot) => {
      //   const orderInfo = [];
      //   snapshot.forEach((doc) => {
      //     // orderInfo.push(doc.data());
      //     const data = doc.data();
			// 		if (data.status !== "COMPLETED") {
			// 		  orderInfo.push(data);
			// 		}
      //   });
      //   dispatch({ type: "GET_PURCHASE_INFO", payload: orderInfo });
      // })
      // .catch((err) => {
      //   dispatch({ type: "GET_PURCHASE_INFO_ERROR", err });
      // });
  };
};
