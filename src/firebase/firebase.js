import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAqH5RmP4fhXLV_mXjOkR02VuNB1pmqs0k",
  authDomain: "insta-clone-8b842.firebaseapp.com",
  projectId: "insta-clone-8b842",
  storageBucket: "insta-clone-8b842.appspot.com",
  messagingSenderId: "122928105172",
  appId: "1:122928105172:web:aadccbeb261c393b9a5d41",
  measurementId: "G-9B3DQBYSBF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, auth, firestore, storage};