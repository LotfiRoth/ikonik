import firebase from "firebase/app";
import "firebase/auth";
  
// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCWK-dxLDtKKGoRHdqh5QoTDoS5U0Q2X4o",
    authDomain: "ikonik-sneakers.firebaseapp.com",
    projectId: "ikonik-sneakers",
    storageBucket: "ikonik-sneakers.appspot.com",
    messagingSenderId: "474677452720",
    appId: "1:474677452720:web:bafe3ce353ae84018b8075"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  };

//   EXPORT
  export const auth = firebase.auth()
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
