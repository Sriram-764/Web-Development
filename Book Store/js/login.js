// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js"
import { getAuth,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
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

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth()

var email = document.getElementById('email')
var password = document.getElementById('password')

window.login = function(e) {
    e.preventDefault();
    var obj = {
        email:email.value,
        password:password.value
    };
    signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function(userCredential) {
        // User is successfully signed in.
        var user = userCredential.user;
        console.log(user.uid);
        alert("Login Successfull!");
        window.location.href = '/html/index.html'
    })
    .catch(function(error) {
        // Handle errors here
        console.error(error);
        alert("Login error: Invalid Login Credentials");
    });
    console.log(obj);
}