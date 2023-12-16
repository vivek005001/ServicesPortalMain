// firebase.js
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdmzhsDhwIXJQbPmtyLhVtWwtTSuu9DvY",
  authDomain: "authenticationnav.firebaseapp.com",
  databaseURL: "https://authenticationnav-default-rtdb.firebaseio.com",
  projectId: "authenticationnav",
  storageBucket: "authenticationnav.appspot.com",
  messagingSenderId: "681617409265",
  appId: "1:681617409265:web:a172100e8b823dabefd550"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { app, db, auth };
