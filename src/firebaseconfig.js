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
// Detectar el entorno: Vite o Choreo
const isVite = import.meta.env.MODE === "development"; // Detecta Vite en desarrollo

// Usar un prefijo diferente según el entorno
const firebaseConfig = {
  apiKey: isVite
    ? import.meta.env.VITE_FIREBASE_API_KEY
    : process.env.FIREBASE_API_KEY,
  authDomain: isVite
    ? import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
    : process.env.FIREBASE_AUTH_DOMAIN,
  projectId: isVite
    ? import.meta.env.VITE_FIREBASE_PROJECT_ID
    : process.env.FIREBASE_PROJECT_ID,
  storageBucket: isVite
    ? import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
    : process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: isVite
    ? import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
    : process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: isVite
    ? import.meta.env.VITE_FIREBASE_APP_ID
    : process.env.FIREBASE_APP_ID,
  measurementId: isVite
    ? import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
    : process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Exportar autenticación y proveedor de Google
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

//Real time database
export const db = getFirestore(app);
