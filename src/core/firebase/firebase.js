// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCjY9uwk74IvrQZccHZXOtIwHMsmCWyHJ4",
    authDomain: "perfectgym-6f47a.firebaseapp.com",
    projectId: "perfectgym-6f47a",
    storageBucket: "perfectgym-6f47a.appspot.com",
    messagingSenderId: "775290306545",
    appId: "1:775290306545:web:12855fe6a248c4eed94e50",
    measurementId: "G-M8Y1P7SB58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app, auth};