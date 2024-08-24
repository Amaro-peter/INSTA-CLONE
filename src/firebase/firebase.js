import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAoT70EX26K_CxPVyAH0kLb6xKdt0pxtzw",
  authDomain: "insta-clone-teste-3fc1f.firebaseapp.com",
  projectId: "insta-clone-teste-3fc1f",
  storageBucket: "insta-clone-teste-3fc1f.appspot.com",
  messagingSenderId: "826616583565",
  appId: "1:826616583565:web:40b1a65af4a69ad77099c4",
  measurementId: "G-GM7HN9SBKS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, auth, firestore, storage};