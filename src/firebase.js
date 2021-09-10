import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDrZWsffVw0s8DwiUcFPp55MAgTzPTqHQE",
  authDomain: "newmovielist-13601.firebaseapp.com",
  projectId: "newmovielist-13601",
  storageBucket: "newmovielist-13601.appspot.com",
  messagingSenderId: "169925917105",
  appId: "1:169925917105:web:36b0e01582e5d85f7a6590"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
