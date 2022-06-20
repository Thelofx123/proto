/* ===================== Firebase initialize ===================== */
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";

/* =================== Firebase authentication =================== */
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";

/* =================== Firebase realtime database ================== */
import {getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";

/* ======================= Cloud FireStore ======================= */
import {getFirestore, collection, setDoc, getDoc, doc, onSnapshot} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";

/* ================== Start of Firebase Config =================== */
const firebaseConfig = {
    apiKey: "AIzaSyAumRC_y2ILAya-zDkQ_oMQPBxQ7MaBEiw",
    authDomain: "fir-crush-b0222.firebaseapp.com",
    projectId: "fir-crush-b0222",
    storageBucket: "fir-crush-b0222.appspot.com",
    messagingSenderId: "300284939680",
    appId: "1:300284939680:web:6cd178528138d2bbb5a8c5",
    measurementId: "G-N3JV4YKZEN"
};

/* ================== End of Firebase Config =================== */
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const firestoreDb = getFirestore(app);
const auth = getAuth(app);

/* ================= Start of Sign up new users ================= */
function createNewUser() {
    const createUserName = document.getElementById("nameInput").value;
    const createUserEmail = document.getElementById("emailInput").value;
    const createUserPassword = document.getElementById("passwordInput").value;
    const createUserPassword2 = document.getElementById("passwordUp").value;
    if (createUserPassword === createUserPassword2) {
        createUserWithEmailAndPassword(auth, createUserEmail, createUserPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                auth.currentUser.displayName = createUserName;
                const displayname = auth.currentUser.displayName;
                window.localStorage.setItem("currentUser", displayname);
                window.localStorage.setItem("currentEmail", createUserEmail);
                    setDoc(doc(firestoreDb, "userList/" + createUserEmail), {
                        userEmail: createUserEmail,
                        username: createUserName,
                        userId: user.uid
                    })
                    alert("User created successfully");
        })
            .catch((error) => {
            const errorCode = error.code;
                const errorMessage = error.message;
                switch (errorCode) {
                    case 'auth/email-already-in-use':
                        alert(`Email address ${createUserEmail} already in use.`);
                        break;
                }
        });
    }
}
/* ================== End of Sign up new users =================== */

/* =============== Start of Sign in existing users =============== */
function loginExistingUser() {
    const loginUserEmail = document.getElementById("loginEmail").value;
    const loginUserPassword = document.getElementById("loginPassword").value;
    
    signInWithEmailAndPassword(auth, loginUserEmail, loginUserPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            const userDetail = onSnapshot(doc(firestoreDb, "userList/" + loginUserEmail), (doc) => {
                const displayName = doc.data().username;
                const displayEmail = doc.data().userEmail;
                console.log(displayName);
                window.localStorage.setItem("currentUser", displayName);
                window.localStorage.setItem("currentEmail", displayEmail);
                window.location.href = "./HomePage/demoHome.html";
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            switch (errorCode) {
                case 'auth/user-not-found':
                    alert(`Please check your email or password`);
                    break;
            }
        });
    }
/* =============== End of Sign in existing users =============== */
/* ======================= Event listeners ======================= */
document.getElementById("signUpButton").addEventListener("click", createNewUser);
document.getElementById("loginButton").addEventListener("click", loginExistingUser);