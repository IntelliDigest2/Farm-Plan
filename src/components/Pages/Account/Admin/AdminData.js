import firebase from "firebase";
const db = firebase.firestore();

export const getConsultantImages = async (userId, accountType) => {
  let result;
  let ver;

  switch (accountType) {
    case "Restaurants":
	case "Hotels":
	case "Hospitals":
	case "Schools":
	case "Offices":
	case "Recreational Centers":
	case "Shop/Supermarket":
	case "Machinery/Supply":
		result = (await db.collection("users").doc(userId).get()).data().imgsLinks;
		ver = (await db.collection("users").doc(userId).get()).data().verification;
      return {
        images: result,
        verificationStatus: result.verification,
      };
    case "User Admin":
      result = (await db.collection("users").doc(userId).get()).data();
      return {
        accountType: "admin",
        images: { [`${result.IDType}`]: result.IDUrl },
        verificationStatus: result.verification,
        idType: result.IDType,
      };

    default:
      result = (await db.collection(`${accountType}`).doc(userId).get()).data().imgsLinks;
      ver = (await db.collection("users").doc(userId).get()).data().verification;
      return {
        images: result,
        verificationStatus: ver,
      };
  }
};

export const activateConsultant = async (userId) => {
  let result = await db.collection("users").doc(userId).update({
    verification: "verified",
  });

  return result;
};

export const activateUsers = async (userId) => {
	let result = await db.collection("users").doc(userId).update({
	  verification: "verified",
	});
  
	return result;
  };
