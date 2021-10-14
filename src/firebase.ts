import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/firebase-storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB1dWFXxEh4p3z82csDt53IMQJyc0_Tcjw",
    authDomain: "distribution-site-7cf17.firebaseapp.com",
    projectId: "distribution-site-7cf17",
    storageBucket: "distribution-site-7cf17.appspot.com",
    messagingSenderId: "767363793152",
    appId: "1:767363793152:web:934ec94dabe9c2e81733e5",
    measurementId: "G-ZXS78TJ4FR"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;