import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjrHxHOHxN6PDm7-U7X9bNj_MZiGfnAdQ",
  authDomain: "chatapp-e3785.firebaseapp.com",
  projectId: "chatapp-e3785",
  storageBucket: "chatapp-e3785.appspot.com",
  messagingSenderId: "708673928473",
  appId: "1:708673928473:web:f1141ae117518b6cb05988",
  measurementId: "G-3ZZ7JVNG4W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();