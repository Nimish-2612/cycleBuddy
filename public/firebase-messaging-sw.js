// public/firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

self.FIREBASE_CONFIG = {};

self.addEventListener("message", (event) => {
  if (event.data?.type === "INIT_FIREBASE_CONFIG") {
    self.FIREBASE_CONFIG = event.data.payload;

    firebase.initializeApp(self.FIREBASE_CONFIG);
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
      console.log("[firebase-messaging-sw.js] Background message:", payload);

      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image || "/logo.png",
      };

      self.registration.showNotification(notificationTitle, notificationOptions);
    });
  }
});
