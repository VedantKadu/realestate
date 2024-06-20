// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "real-estate-80a43.firebaseapp.com",
  projectId: "real-estate-80a43",
  storageBucket: "real-estate-80a43.appspot.com",
  messagingSenderId: "338253780750",
  appId: "1:338253780750:web:abfedccabb1d1f2a1ce95f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
