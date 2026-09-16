import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAuLa-9EoTDCHZDnjxYyso1Htk6hY8vg9w",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "cashaiai.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "cashaiai",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "cashaiai.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "64214873304",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:64214873304:web:96a3e7c449eb76c5dcd3ad",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-J3ZW31DPKE"
};

export const app = initializeApp(firebaseConfig);

let analytics = null;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (e) {
    console.warn("Analytics init skipped:", e);
  }
}

export { analytics, logEvent };
