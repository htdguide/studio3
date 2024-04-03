

const firebaseConfig = {
  apiKey: "AIzaSyCAuVFZfDE4VzJ9BxI2iLQ-8ycLLWmnnfA",
  authDomain: "authentication-1b20a.firebaseapp.com",
  projectId: "authentication-1b20a",
  storageBucket: "authentication-1b20a.appspot.com",
  messagingSenderId: "115586927626",
  appId: "1:115586927626:web:18cbf33302d5564910a3f3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app); // Initialize firestore
const database = getDatabase(app);

export { auth, firestore, database }; // Export firestore along with auth and database
