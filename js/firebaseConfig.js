import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
  getFirestore,
  addDoc,
  getDoc,
  collection,
  doc,
  setDoc,
  increment,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd43JlWdocoIlQn-UD_eixCrlJzdyCR6c",
  authDomain: "mini-project-e0f96.firebaseapp.com",
  projectId: "mini-project-e0f96",
  storageBucket: "mini-project-e0f96.appspot.com",
  messagingSenderId: "252958974944",
  appId: "1:252958974944:web:c5088e80b78af3d8d8c185",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
