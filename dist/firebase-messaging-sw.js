importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
var fbConfig = {
  apiKey: "AIzaSyDuu8Fpwa2gYlCKcL-LlN-uqH5seEJpk9w",
  authDomain: "itracker-development.firebaseapp.com",
  projectId: "itracker-development",
  storageBucket: "itracker-development.appspot.com",
  messagingSenderId: "57163396396",
  appId: "1:57163396396:web:dd800621173f5733a4a889",
};

firebase.initializeApp(fbConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
