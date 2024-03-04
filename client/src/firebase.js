// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "food-delivery-f5772.firebaseapp.com",
  projectId: "food-delivery-f5772",
  storageBucket: "food-delivery-f5772.appspot.com",
  messagingSenderId: "99318149774",
  appId: "1:99318149774:web:83592f2c1ac804ebdecfdf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
