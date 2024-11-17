// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import getFirestore
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage'; // Import getStorage for Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyCAuVFZfDE4VzJ9BxI2iLQ-8ycLLWmnnfA",
  authDomain: "authentication-1b20a.firebaseapp.com",
  projectId: "authentication-1b20a",
  storageBucket: "authentication-1b20a.appspot.com", // Ensure this is set to your Firebase Storage bucket
  messagingSenderId: "115586927626",
  appId: "1:115586927626:web:18cbf33302d5564910a3f3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app); // Initialize Firestore
const database = getDatabase(app); // Initialize Realtime Database
const storage = getStorage(app); // Initialize Firebase Storage

export { auth, firestore, database, storage }; // Export Firebase Storage along with other services
