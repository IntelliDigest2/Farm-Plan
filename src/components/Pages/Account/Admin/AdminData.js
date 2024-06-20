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
      result = (await db.collection("users").doc(userId).get()).data();
      ver = (await db.collection("users").doc(userId).get()).data()
        .verification;
      return {
        images: result.imgsLinks,
        verificationStatus: result.verification,
        email: result.email,
      };
    case "User Admin":
      result = (await db.collection("users").doc(userId).get()).data();
      return {
        accountType: "admin",
        images: { [`${result.IDType}`]: result.IDUrl },
        verificationStatus: result.verification,
        idType: result.IDType,
        email: result.email,
      };

    default:
      result = (await db.collection(`${accountType}`).doc(userId).get()).data();
      ver = (await db.collection("users").doc(userId).get()).data()
        .verification;
      return {
        images: result.imgsLinks,
        verificationStatus: ver,
        email: result.email,
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
