// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSI2Cq-G9oS8NPQPu_72nL82l4Ubhj5_o",
  authDomain: "zoro-trip.firebaseapp.com",
  projectId: "zoro-trip",
  storageBucket: "zoro-trip.firebasestorage.app",
  messagingSenderId: "992200211361",
  appId: "1:992200211361:web:87be88c69a08c4166829e0",
  measurementId: "G-YN2KG3ZM0C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);