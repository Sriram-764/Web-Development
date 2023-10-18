// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword,updateProfile } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
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
const auth = getAuth(app)
const db = getFirestore()

const name = document.getElementById('name')
const regdNo = document.getElementById('regdNo')
const college = document.getElementById('college')
const email = document.getElementById('email')
const password = document.getElementById('password')
const cPassword = document.getElementById('cPassword')

window.signup = function(e) {
    e.preventDefault();
    var obj = {
        fullname:name.value,
        regdNo:regdNo.value,
        college:college.value,
        email:email.value,
        password:password.value
    }
      
    if(cPassword.value === password.value) {
      createUserWithEmailAndPassword(auth, obj.email, obj.password)
      .then(async function(userCredential) {
        await updateProfile(userCredential.user, {displayName: obj.fullname});
  
        const userDocRef = doc(db, "users", userCredential.user.uid);
        const userData = {
          Name: obj.fullname,
          regdNo:obj.regdNo,
          College:obj.college,
          Email: obj.email
        };
  
        await setDoc(userDocRef, userData);
  
        alert("Signup Successfull!")
        window.location.href = '/'
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