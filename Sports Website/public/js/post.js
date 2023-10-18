import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore,collection,addDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js";
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
const storage = getStorage(app)

const event = document.getElementById('event')
const pincode = document.getElementById('pincode')
const date = document.getElementById('date')
const address = document.getElementById('address')
const imageInput = document.getElementById('imageInput')
const description = document.getElementById('description')
const link = document.getElementById('link')

window.PostEvent = postEvent;

async function postEvent(e) {
  e.preventDefault();
  const file = imageInput.files[0]

  const storageRef = ref(storage, 'events/' + file.name)

  try {
    await uploadBytes(storageRef,file);

    const imageUrl = await getDownloadURL(storageRef)

    var obj = {
      event: event.value,
      pincode: pincode.value,
      date: date.value,
      address: address.value,
      image: imageUrl,
      description: description.value,
      link: link.value,
    };

    const docRef = await addDoc(collection(db,'events'),obj)
    
    console.log('Document written with ID : ', docRef.id)
    alert('Event Posted Successfully')
  }
  catch(error) {
    console.log("Error Uploading File : ", error)
  }
}