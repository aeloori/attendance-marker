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

let lat="";
let lon="";
let latitudeFlag=false;
let longitudeFlag=false;



function fetchLocation(position){
    lat=position.coords.latitude.toFixed(3);
    lon=position.coords.longitude.toFixed(3);
    console.log('lat',lat,'long',lon);
    if(lat==17.494  && lon==78.442){
        console.log('at desired lat and long')
        latitudeFlag=true;
        longitudeFlag=true;
    }
    else{
        console.log('not in region');
    }
    
    
}

function locationError(){
    alert('Failed to fetch location');
}

navigator.geolocation.getCurrentPosition(fetchLocation,locationError);


function changeGreeting(user_email, id) {
    getDoc(doc(db, "user", user_email)).then(docSnap => {
        if (docSnap.exists()) {
            const user_data = docSnap.data();
            let text = user_data.fullName + "";
            let existing_greeting = document.getElementById(id).innerHTML;
            document.getElementById(id).innerHTML = existing_greeting + ", " + text;
            document.getElementById('mark').addEventListener('click', () => {
                if(longitudeFlag && latitudeFlag){
                    markAttendance(text);
                }

                else{
                    alert('Retry getting into a specified location')
                }
                
            })
            
        }
        else {
            console.log("error fetching data");
        }
    })
}



function markAttendance(full_name) {
    const docRef=doc(db,date,full_name);

    let data={
        fullName:full_name,
        time: new Date().getTime()
    }

    getDoc(doc(db,date,full_name)).then(docSnap =>{

        

        if(docSnap.exists() ){
            alert("Your attendance already marked for today");
        }
        else{
            setDoc(docRef,data).then(()=>{
                alert('Attendance marked');
            })
        }
    })
}



onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const user_email = user.email;
        changeGreeting(user_email, 'greeting');
        
        // ...
    } else {
        console.log('error occured getting user data');
    }
});

