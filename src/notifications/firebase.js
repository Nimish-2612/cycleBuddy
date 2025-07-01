import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// ✅ Firebase config from Vite .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// ✅ Register service worker and inject Firebase config
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("[ServiceWorker] Registered:", registration);

      // Inject Firebase config into service worker
      if (registration.active) {
        registration.active.postMessage({
          type: "INIT_FIREBASE_CONFIG",
          payload: firebaseConfig,
        });
      } else {
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          navigator.serviceWorker.controller?.postMessage({
            type: "INIT_FIREBASE_CONFIG",
            payload: firebaseConfig,
          });
        });
      }
    })
    .catch((err) => {
      console.error("[ServiceWorker] Registration failed:", err);
    });
}

// ✅ Send token to backend
const sendTokenToBackend = async (token) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const jwt = localStorage.getItem("token");

  if (!user || !jwt || !token) return;

  try {
    const res = await fetch("http://localhost:5000/api/notify/save-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        token,
        senderName: user.name,
      }),
    });

    const data = await res.json();
    console.log("[FCM] Token sent to backend:", data);
  } catch (err) {
    console.error("[FCM] Failed to send token to backend:", err);
  }
};

// ✅ Generate and send FCM token
export const generateToken = async () => {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    console.warn("[FCM] Notification permission denied");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready; // ✅ wait for it to be ready

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration, // ✅ pass the ready registration
    });

    if (token) {
      console.log("[FCM] Token generated:", token);
      await sendTokenToBackend(token);
    } else {
      console.warn("[FCM] Token is null");
    }
  } catch (err) {
    console.error("[FCM] Error generating token:", err);
  }
};
