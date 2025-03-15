// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
// import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA2f6DE3rP4zPmVJy6Hejpnfnko4MM9GrE",
  authDomain: "attendance-marker-v1.firebaseapp.com",
  projectId: "attendance-marker-v1",
  storageBucket: "attendance-marker-v1.firebasestorage.app",
  messagingSenderId: "370932146178",
  appId: "1:370932146178:web:bc3795add4c6610e83c71b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// function getValur(id){
//     return document.getElementById(id).value;
// }

document.getElementById("register").addEventListener("click", (event) => {
  event.preventDefault();
  const full_name = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      const user_data = {
        fullName: full_name,
        user_email: email
      };
      const docRef = doc(db, "user", email);
      setDoc(docRef, user_data)
        .then(() => {
          alert("Account created try logging in");
          location.href = "../index.html"
        })
        .catch((error) => {
          console.log(error.code);
        });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('Unknown error',errorMessage);
      // ..
    });
});
