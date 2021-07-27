import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDE-9wwRBQDKLc7qF2RdyruyBnXSvZR3YM",
  authDomain: "movielistapp-4e859.firebaseapp.com",
  projectId: "movielistapp-4e859",
  storageBucket: "movielistapp-4e859.appspot.com",
  messagingSenderId: "875464350549",
  appId: "1:875464350549:web:af98710f4cb392eac9eddc",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
