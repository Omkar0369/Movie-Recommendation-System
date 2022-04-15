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
  arrayUnion,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { homeRecommend } from "./utillity.js";

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
let userDocRef;

// Sign Out if already Signed in
// signOut(auth)
//   .then(() => {
//     // Sign-out successful.
//     console.log("signout successful");
//     console.log(auth.email);
//     document.getElementById("login").style.visibility = "visible";
//     document.getElementById("logout").style.visibility = "hidden";
//   })
//   .catch((error) => {
//     // An error happened.
//     console.log(error);
//   });

// Signup Code
document.getElementById("signupButton")?.addEventListener("click", function () {
  const email = document.getElementById("email").value;
  const pwd = document.getElementById("pwd").value;
  console.log(email);
  createUserWithEmailAndPassword(auth, email, pwd)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      const userDocRef = doc(db, "users1", user.uid);
      insertDate(userDocRef);
      var myModalEl = document.getElementById("signupModal");
      var modal = bootstrap.Modal.getInstance(myModalEl);
      modal.hide();
      document.getElementById("login").style.visibility = "hidden";
      document.getElementById("logout").style.visibility = "visible";
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
});

// Login Code
document.getElementById("LoggedIn")?.addEventListener("click", function () {
  let email = document.getElementById("loginemail").value;
  let pwd = document.getElementById("loginpwd").value;
  console.log(email);
  signInWithEmailAndPassword(auth, email, pwd)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      console.log(
        auth.currentUser,
        auth.currentUser.uid,
        auth.currentUser.email
      );
      const userDocRef = doc(db, "users1", auth.currentUser.uid);
      var myModalEl = document.getElementById("loginModal");
      var modal = bootstrap.Modal.getInstance(myModalEl);
      modal.hide();
      var toast = document.getElementById("toast");
      var mytoast = bootstrap.Toast.getOrCreateInstance(toast);
      mytoast.show();
      console.log("Loggin Successfull");
      document.getElementById("login").style.visibility = "hidden";
      document.getElementById("logout").style.visibility = "visible";
    })
    .catch((error) => {
      const errorcode = error.code;
      const errormsg = error.message;
      console.log(errorcode);
      console.log(errormsg);
    });
});

// Logout Code
document.getElementById("logout")?.addEventListener("click", function () {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      localStorage.removeItem("userUid");
      console.log("signout successful");
      document.getElementById("login").style.visibility = "visible";
      document.getElementById("logout").style.visibility = "hidden";
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
});

// // Auth Change Code
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     const uid = user.uid;
//     console.log(uid);
//     const userDocRef = doc(db, "users1", uid);
//     insertDate(userDocRef);
//     selectData(userDocRef);
//     updateDataGenre("comedy");
//     selectData(userDocRef);
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });

async function insertDate(userDocRef) {
  try {
    await setDoc(userDocRef, {
      email: auth.currentUser.email,
      uid: auth.currentUser.uid,
      genre: {
        "Action & Adventure": 0,
        Animation: 0,
        Comedy: 0,
        Crime: 0,
        Documentary: 0,
        Drama: 0,
        Family: 0,
        Kids: 0,
        Mystery: 0,
        News: 0,
        Reality: 0,
        "Sci-Fi & Fantasy": 0,
        Soap: 0,
        Talk: 0,
        "War & Politics": 0,
        Western: 0,
        Action: 0,
        Adventure: 0,
        Fantasy: 0,
        History: 0,
        Horror: 0,
        Music: 0,
        Romance: 0,
        "Science Fiction": 0,
        "TV Movie": 0,
        Thriller: 0,
        War: 0,
      },
      history: [],
      searchHistory: [],
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function selectData(userDocRef) {
  const docSnap = await getDoc(userDocRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    localStorage.setItem("userUid", user.uid);
    localStorage.setItem("login", 1);
    homeRecommend();
  } else {
    localStorage.setItem("login", 0);
    console.log("Plese Login First");
  }
});

async function updateDataGenre(genre) {
  let userUid = localStorage.getItem("userUid");
  const userDocRef = doc(db, "users1", userUid);
  console.log("retrievedObject: ", userUid);
  console.log(userDocRef);
  await updateDoc(userDocRef, {
    [`genre.${genre}`]: increment(1),
  });
}

async function updateDataHistory(showId) {
  let userUid = localStorage.getItem("userUid");
  const userDocRef = doc(db, "users1", userUid);
  console.log("retrievedObject: ", userUid);
  console.log(userDocRef);
  await updateDoc(userDocRef, {
    history: arrayUnion(showId),
  });
}

async function updateDataSearchHistory(searchQuery) {
  let userUid = localStorage.getItem("userUid");
  const userDocRef = doc(db, "users1", userUid);
  console.log("retrievedObject: ", userUid);
  console.log(userDocRef);
  await updateDoc(userDocRef, {
    searchHistory: arrayUnion(searchQuery),
  });
}

export {
  auth,
  db,
  doc,
  selectData,
  updateDataGenre,
  updateDataHistory,
  updateDataSearchHistory,
  userDocRef,
};
