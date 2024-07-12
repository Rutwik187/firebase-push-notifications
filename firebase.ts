import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAbqM__mmZW-VW0SXjSDkVgCtwdYceVzw",
  authDomain: "tayog-25eaa.firebaseapp.com",
  projectId: "tayog-25eaa",
  storageBucket: "tayog-25eaa.appspot.com",
  messagingSenderId: "827415046461",
  appId: "1:827415046461:web:3058d533c8fc10d584fd54",
  measurementId: "G-452TFG90V7",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
