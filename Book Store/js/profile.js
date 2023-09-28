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

var userName = document.getElementById('name')
const Email = document.getElementById('email');
const moblie = document.getElementById('mobile');
const logoutbtn = document.getElementById('logoutbtn');

onAuthStateChanged(auth, (user) => {
    if(user) {
        userName.innerHTML = user.displayName;
        Email.innerHTML = user.email;
        moblie.innerHTML = user.phoneNumber;
        console.log(user.phoneNumber)
    }
    else {
        console.log("User not Signed In");
    }
})

logoutbtn.addEventListener('click', () => {
    signOut(auth)
    .then(() => {
        console.log("Logout Successfull");
        window.location.href = '/html/index.html';
    })
    .catch((error) => {
        console.log(error);
    })
})