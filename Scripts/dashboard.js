import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, getDoc, doc, collection, setDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

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
const auth = getAuth();
const db = getFirestore(app);
const date = new Date().toDateString();




function changeGreeting(user_email, id) {
    getDoc(doc(db, "user", user_email)).then(docSnap => {
        if (docSnap.exists()) {
            const user_data = docSnap.data();
            let text = user_data.fullName + "";
            console.log(text);
            console.log(typeof (text));
            let existing_greeting = document.getElementById(id).innerHTML;
            document.getElementById(id).innerHTML = existing_greeting + ", " + text;
            document.getElementById('mark').addEventListener('click', () => {
                markAttendance(text);
            })
            
        }
        else {
            console.log("error fetching data");
        }
    })
}

function markAttendance(full_name) {
    // alert('attendance marked');
    const docRef=doc(db,date,full_name);

    let data={
        fullName:full_name,
        time: new Date().getTime()
    }

    console.log(data);
    getDoc(doc(db,date,full_name)).then(docSnap =>{
        if(docSnap.exists()){
            alert("already logged in ");
        }
        else{
            setDoc(docRef,data).then(()=>{
                alert('data saved in database');
            })
        }
    })
}


onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const user_email = user.email;
        console.log(user_email);
        changeGreeting(user_email, 'greeting');
        
        // ...
    } else {
        console.log('error occured getting user data');
    }
});

