import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxTECRjc54AZEuqk3GyicndgAZ24Hbx44",
  authDomain: "colonie-ci.firebaseapp.com",
  projectId: "colonie-ci",
  storageBucket: "colonie-ci.firebasestorage.app",
  messagingSenderId: "126552024175",
  appId: "1:126552024175:web:b9991a57606351ed2f199a",
  measurementId: "G-63W78517SP"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app, "default");
export default app;