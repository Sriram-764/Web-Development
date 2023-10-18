// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import { getAuth,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9ThNVvLOVXuo24gkG7V7zIu544PYuUoY",
    authDomain: "sports-website-639b8.firebaseapp.com",
    projectId: "sports-website-639b8",
    storageBucket: "sports-website-639b8.appspot.com",
    messagingSenderId: "723733695716",
    appId: "1:723733695716:web:69dc79c5363b3044c2b0f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth()

document.addEventListener("DOMContentLoaded", function() {
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var loginForm = document.getElementById('loginForm');

    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
    var obj = {
        email: email.value,
        password: password.value
    };
    signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function(userCredential) {
        // User is successfully signed in.
        var user = userCredential.user;
        console.log(user.uid);
        alert("Login Successfull!");
        window.location.href = '/'
    })
    .catch(function(error) {
        // Handle errors here
        console.error(error);
        alert("Login error: Invalid Login Credentials");
    });
    console.log(obj);
    });
});