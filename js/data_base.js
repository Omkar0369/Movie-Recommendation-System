import { initializeApp} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {

    getFirestore,
  
    addDoc,
  
    getDocs,
  
    collection,
  
  } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
  
// TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBd43JlWdocoIlQn-UD_eixCrlJzdyCR6c",
      authDomain: "mini-project-e0f96.firebaseapp.com",
      projectId: "mini-project-e0f96",
      storageBucket: "mini-project-e0f96.appspot.com",
      messagingSenderId: "252958974944",
      appId: "1:252958974944:web:c5088e80b78af3d8d8c185"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const email = document.getElementById("loginemail").value;
    const pwd = document.getElementById("loginpwd").value;

    document.getElementById("enter_data").addEventListener("click", function(){
        const email = document.getElementById("email").value;
        const pwd = document.getElementById("pwd").value;
        console.log(email);
        createUserWithEmailAndPassword(auth,email,pwd)
        .then((userCredential)=>{
            const user=userCredential.user;
            console.log(user);
            
        })
        .catch((error)=>{
            const errorcode=error.code;
            const errormsg=error.message;
            console.log(errorcode);
            console.log(errormsg);
        });

        var myModalEl = document.getElementById("exampleModal");
            var modal = bootstrap.Modal.getInstance(myModalEl);
            modal.hide();
    });

    document.getElementById("LoggedIn").addEventListener("click", function(){
        
        console.log(email);
        signInWithEmailAndPassword(auth,email,pwd)
        .then((userCredential)=>{
            const user=userCredential.user;
            console.log(user);
        })
        .catch((error)=>{
            const errorcode=error.code;
            const errormsg=error.message;
            console.log(errorcode);
            console.log(errormsg);
        });
        
        var myModalEl = document.getElementById("loginModal");
            var modal = bootstrap.Modal.getInstance(myModalEl);
            modal.hide();
        var toast = document.getElementById("toast");
        var mytoast = bootstrap.Toast.getOrCreateInstance(toast)
        mytoast.show();
        document.getElementById("login").style.visibility="hidden";
        document.getElementById("logout").style.visibility="visible";
    })

   
    document.getElementById("logout").addEventListener("click",function(){
        signOut(auth).then((email) => {
            // Sign-out successful.
            console.log("signout successful");
            console.log(email);
          }).catch((error) => {
            // An error happened.
            console.log(error);
          });     
          document.getElementById("login").style.visibility="visible";
        document.getElementById("logout").style.visibility="hidden";   
    });

const db = getFirestore(app);

try {

  const docRef = await addDoc(collection(db, "users1"), {

    first: "Ada",

    last: "Lovelace",

    born: 1815,

  });

  console.log("Document written with ID: ", docRef.id);

} catch (e) {

  console.error("Error adding document: ", e);

}

const querySnapshot = await getDocs(collection(db, "users1"));

querySnapshot.forEach((doc) => {

  console.log(`${doc.id} => ${doc.data()}`);

  console.log(doc.data());

})