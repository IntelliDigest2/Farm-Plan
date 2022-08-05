export const signUp = (supplier) => {
  return (dispatch, getState, { getFirebase }) => {
    //Determine account type
    var type;
    switch (supplier.function) {
      case 'Hospitals':
      case 'Hotels':
      case 'Offices':
      case 'Restaurants':
      case 'Shop/Supermarket':
      case 'Recreational Centers':
      case 'Business':
        type = 'business_admin';
        break;
      case 'Schools':
        type = 'academic_admin';
        break;
      case 'Farm':
        type = 'farm_admin';
        break;
      case 'Households':
        type = 'household_admin';
        break;
      default:
        type = 'user';
        break;
    }

    const firestore = getFirebase().firestore();
    const firebase = getFirebase();
    firebase
      .auth()
      .createUserWithEmailAndPassword(supplier.email, supplier.password)
      .then((resp) => {
        firestore
          .collection('users')
          .doc(resp.user.uid)
          .set({
            firstName: supplier.firstName,
            lastName: supplier.lastName,
            initials: supplier.firstName[0] + supplier.lastName[0],
            email: supplier.email,
            buildingFunction: supplier.function,
            city: supplier.city,
            country: supplier.country,
            region: supplier.region,
            type: type,
          });

        //Setup Admin account in relevent users collection
        var adminCollection;
        if (type === 'business_admin') {
          adminCollection = 'business_users';
        } else if (type === 'academic_admin') {
          adminCollection = 'academic_users';
        } else if (type === 'farm_admin') {
          adminCollection = 'farm_users';
        } else if (type === 'household_admin') {
          adminCollection = 'household_users';
        } else {
          adminCollection = 'user';
        }

        if (adminCollection !== 'user') {
          firestore
            .collection(adminCollection)
            .doc(resp.user.uid)
            .set({
              name: supplier.firstName + ' ' + supplier.lastName,
              email: supplier.email,
            });
        }
      })
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification();
      })
      .then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'SIGNUP_ERROR', err });
      });
  };
};
