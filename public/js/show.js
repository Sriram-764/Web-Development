import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9ThNVvLOVXuo24gkG7V7zIu544PYuUoY",
    authDomain: "sports-website-639b8.firebaseapp.com",
    projectId: "sports-website-639b8",
    storageBucket: "sports-website-639b8.appspot.com",
    messagingSenderId: "723733695716",
    appId: "1:723733695716:web:69dc79c5363b3044c2b0f1"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore(app);
const db = getFirestore(app);
// Import the necessary Firebase modules, initialize Firebase, and get Firestore

const eventList = document.getElementById('container1');


// Function to display events on the events.html page
async function displayEvents(e) {
    try {
        const eventsRef = collection(db, 'events');
        const querySnapshot = await getDocs(eventsRef);

        querySnapshot.forEach((doc) => {
            const eventData = doc.data();
            console.log(eventData.id)
            const eventElement = document.createElement('div');
            eventElement.setAttribute("id","eventElement");
            eventElement.innerHTML = `
                <h3>${eventData.event}</h3>
                <div>
                    <img src="${eventData.image}" alt="Event Image" width="200">
                </div>
                
                <p id="location">Location: ${eventData.address}, ${eventData.pincode}</p>
                <p id="description": ${eventData.description}></p>
                <p>Date: ${eventData.date}</p>
                <a href="${eventData.link}" target="_blank">Click here to participate</a><br>
                <a href="/know" id="${eventData.id}">Click here to know more</a>
            `;
            eventList.appendChild(eventElement);
        });
    } catch (error) {
        console.error('Error getting events: ', error);
    }
}

// Call this function when the page loads to display events
displayEvents();

const logoutbtn = document.getElementById('logout')
const loginbtn = document.getElementById('loginOrSignUp')
const post = document.getElementById('post')

onAuthStateChanged(auth, (user) => {
    if(user) {
        logoutbtn.style.display = "block";
        loginbtn.style.display = "none";
        post.style.display = "block";
    }
    else {
        console.log("User not Signed In");
        logoutbtn.style.display = "none";
        loginbtn.style.display = "block";
        post.style.display = "none";
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