// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getDatabase, ref, set } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmn64Gy87WOw_-LzYHOATiffPZrGbVdms",
  authDomain: "lingez-40aed.firebaseapp.com",
  projectId: "lingez-40aed",
  storageBucket: "lingez-40aed.firebasestorage.app",
  messagingSenderId: "815588133716",
  appId: "1:815588133716:web:6240b12795c8cf1e2c16c1",
  measurementId: "G-B5LR7HQF2M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Exportar autenticación y proveedor de Google
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

//Real time database
export const db = getFirestore(app);
