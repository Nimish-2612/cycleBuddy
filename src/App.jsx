import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import Header from "./components/Header";
import { generateToken } from "./notifications/firebase";
import { onMessage } from "firebase/messaging";
import { messaging } from "./notifications/firebase";

function App() {
  useEffect(() => {
    generateToken();
    // Listen to foreground messages
    const unsubscribe = onMessage(messaging, (payload) => {
      const notificationTitle = payload.notification?.title || "New Message";
      const notificationBody =
        payload.notification?.body || "You have a new notification.";

      toast.info(
        <div className="flex flex-col p-2">
          <p className="font-bold text-lg">{notificationTitle}</p>
          <p className="text-sm">{notificationBody}</p>
        </div>,
        {
          toastId: payload.messageId,
        }
      );
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={2000} />
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
