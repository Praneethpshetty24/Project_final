// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, doc, deleteDoc, getDocs } from "firebase/firestore"; // Import Firestore methods

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3VnEgnYdKwITozigl8K_jZ2X5F_n47ko",
  authDomain: "todos-bd70f.firebaseapp.com",
  projectId: "todos-bd70f",
  storageBucket: "todos-bd70f.firebasestorage.app",
  messagingSenderId: "573013213446",
  appId: "1:573013213446:web:a76a164edab15e3b6f9e87",
  measurementId: "G-HXH44NN7PV"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

// Export Firestore methods for use in the app
export { db, collection, addDoc, updateDoc, doc, deleteDoc, getDocs };
