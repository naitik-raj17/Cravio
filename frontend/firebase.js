// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "cravio-f758f.firebaseapp.com",
  projectId: "cravio-f758f",
  storageBucket: "cravio-f758f.firebasestorage.app",
  messagingSenderId: "157448170968",
  appId: "1:157448170968:web:a372a7b567495594c2d6ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {app,auth}  