// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDuHW14FtxZ7Wtywide1I4AHzgSvK6PP9w",
    authDomain: "online-book-store-d044f.firebaseapp.com",
    projectId: "online-book-store-d044f",
    storageBucket: "online-book-store-d044f.appspot.com",
    messagingSenderId: "919608488956",
    appId: "1:919608488956:web:d2ba51715acf151d2b7879"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

var element = document.getElementById('userName')
const logoutbtn = document.getElementById('logout');
const person = document.getElementById('person');
const loginbtn = document.getElementById('loginbtn');

onAuthStateChanged(auth, (user) => {
    if(user) {
        if(user.displayName.length > 6) {
            element.innerHTML = user.displayName.substring(0,5) + '..';
        }
        else {
            element.innerHTML = user.displayName;
        }
        logoutbtn.style.display = "block";
        person.style.display = "block";
        loginbtn.style.display = "none";
    }
    else {
        element.innerHTML = "Sign In";
        element.addEventListener("click",() => {
            window.location.href = '/html/login.html'
        })
        console.log("User not Signed In");
        logoutbtn.style.display = "none";
        person.style.display = "none";
        loginbtn.style.display = "block";
    }
})

logoutbtn.addEventListener('click', () => {
    signOut(auth)
    .then(() => {
        console.log("Logout Successfull");
        element.style.display = "none";
        person.style.display = "none";
        loginbtn.style.display = "block";
    })
    .catch((error) => {
        console.log(error);
    })
})