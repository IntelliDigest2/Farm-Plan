import addNotification from "react-push-notification";
import { Colors } from "./Colors";

const submitNotification = (title, message) => {
  addNotification({
    title: title,
    message: message,
    backgroundTop: Colors.brandBlue, //optional, background color of top container.
    backgroundBottom: Colors.brandGreen, //optional, background color of bottom container.
    closeButton: "Close",
    duration: 4000,
    native: true,
  });
};

export { submitNotification };
