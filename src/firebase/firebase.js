import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAp6qDdV3hPVUEfxjCaIeYDY5j3W6iPbX4",
  authDomain: "insta-teste-2.firebaseapp.com",
  projectId: "insta-teste-2",
  storageBucket: "insta-teste-2.appspot.com",
  messagingSenderId: "167443188967",
  appId: "1:167443188967:web:afb21df0f1d449c1662642",
  measurementId: "G-H6SWKN77VP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, auth, firestore, storage};