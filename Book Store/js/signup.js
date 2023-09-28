// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

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
const auth = getAuth()
const db = getFirestore();

var fullname = document.getElementById('fullname')
var email = document.getElementById('email')
var password = document.getElementById('password')
var cPassword = document.getElementById('cPassword')

window.signup = function(e) {
  e.preventDefault();
  var obj = {
      fullname:fullname.value,
      email:email.value,
      password:password.value
  }
  
  if(cPassword.value === password.value) {
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then(async function(userCredential) {
      await updateProfile(userCredential.user, {displayName: obj.fullname});

      const userDocRef = doc(db, "users", userCredential.user.uid);
      const userData = {
        displayName: obj.fullname,
        email: obj.email
      };

      await setDoc(userDocRef, userData);

      alert("Signup Successfull!")
      window.location.href = '/html/login.html'
    })
    .catch(function(err) {
      alert("error" + err)
    })
    console.log(obj)
  }
  else {
    alert('Password and Confirm Password must be same')
    return;
  }
};