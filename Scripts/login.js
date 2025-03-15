// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";;

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2f6DE3rP4zPmVJy6Hejpnfnko4MM9GrE",
    authDomain: "attendance-marker-v1.firebaseapp.com",
    projectId: "attendance-marker-v1",
    storageBucket: "attendance-marker-v1.firebasestorage.app",
    messagingSenderId: "370932146178",
    appId: "1:370932146178:web:bc3795add4c6610e83c71b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

document.getElementById('loginBtn').addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('login successful');
            location.href = '../webpages/dashboard.html'
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode == 'auth/invalid-credential' || errorCode == 'auth/invalid-email') {
                alert('Incorrect login credentials or account not found')
            }
            else {
                alert(errorMessage);
            }
        });
})