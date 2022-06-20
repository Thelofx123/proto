/* ===================== Firebase initialize ===================== */
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
/* ======================= Cloud FireStore ======================= */
import { getFirestore, collection, setDoc, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";
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
const firestoreDb = getFirestore(app);
let currentEmail = window.localStorage.getItem("currentEmail");

const ripple = document.getElementsByClassName("ripple")[0];
ripple.style.display = "none";

const heart = document.getElementsByClassName("heartSection")[0];

let langMy;
let longMy;
let langMy1;
let longMy1;
let all3 = [];


function getPosition(position){
     
    langMy= position.coords.latitude
    longMy = position.coords.longitude
    setDoc(doc(firestoreDb, 'userList/' + currentEmail), {
        laang: langMy,
        loong: longMy,
     },{merge:true});
}



///////// Crush Location /////////

const myCrushLocation = () =>{
    navigator.geolocation.getCurrentPosition(getPosition)
    console.log("zurkh")
    const friendRef = collection(firestoreDb, 'userList', currentEmail, "stalkers")
    const getData= getDoc(doc(firestoreDb, "userList", currentEmail))
    .then((item) =>{
        // setInterval(() => {
        //     navigator.geolocation.getCurrentPosition(getPosition)
        // }, 10000);
    // langMy = item.data().laang
    // longMy =item.data().long
    })
    getDocs(friendRef)
        .then((snapshot) =>{
            snapshot.forEach((doc)=>{
              
            all3.push(doc.data().name)
    })
        all3.forEach(async(document) =>{

        const getData= await getDoc(doc(firestoreDb,"userList",document))
            .then((item) =>{

               getDistanceFromLatLonInKm(langMy,longMy,item.data().laang,item.data().loong)
            })
       
        })
    })
    all3 = [];
}

//   ============== Distance ===============//
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; 
    var dLat = deg2rad(lat2-lat1);  
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = (R * c)*1000; 
    console.log(d,"m")
    if(d <= 100){
       ripple.style.display = "block"
       document.getElementById("multiaudio1").play()
        console.log("in 100m")
        setTimeout(function(){
            ripple.style.display = "none"
            console.log("5sec")
        },4000);
    }
    else{
        ripple.style.display = "none";
    }
}
function deg2rad(deg) {
    return deg * (Math.PI/180)
  } 
heart.addEventListener('click',myCrushLocation)





