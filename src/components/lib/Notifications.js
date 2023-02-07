import addNotification from "react-push-notification";

const submitNotification = (title, message) => {
  addNotification({
    title: title,
    message: message,
    backgroundTop: "white", //optional, background color of top container.
    backgroundBottom: "white", //optional, background color of bottom container.
    colorTop: "black", //optional, font color of top container.
    colorBottom: "black",
    closeButton: "X",
    duration: 10000,
  });
};

const submitNotificationPlan = (title, message) => {
  addNotification({
    title: title,
    message: message,
    backgroundTop: "white", //optional, background color of top container.
    backgroundBottom: "white", //optional, background color of bottom container.
    colorTop: "black", //optional, font color of top container.
    colorBottom: "black",
    closeButton: "X",
    duration: 30000,
  });
};

export { submitNotification, submitNotificationPlan };
