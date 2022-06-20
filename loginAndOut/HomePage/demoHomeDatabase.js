/* ===================== Firebase initialize ===================== */
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
/* =================== Firebase storage =================== */
import {getStorage, getDownloadURL, ref as sRef  } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-storage.js";
/* =================== Firebase authentication =================== */
import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
/* ======================= Cloud FireStore ======================= */
import { getFirestore, collection, setDoc, getDocs, doc, getDoc, onSnapshot,addDoc } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";
/* ======================= Realtime database ===================== */
import { getDatabase, set, ref, push, child, get, onValue, onChildChanged, update } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";
/* ======================= Cloud Messaging ======================= */
import { getMessaging  } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-messaging.js";
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
const firestoreDb = getFirestore(app);
const auth = getAuth(app);
const realTimeDb = getDatabase(app);
const storage = getStorage(app);
const messaging = getMessaging(app);
let searchUserContainer = document.getElementsByClassName("searchUserContainer")[0];
const querySnapshot = await getDocs(collection(firestoreDb, "userList/"));
querySnapshot.forEach((doc) => {    
    searchUserContainer.innerHTML += `
    <div data-id = "${doc.data().userId}" class="userSearchBox spaceBetween">
        <div class="userSearchDetail perfectCenter">
            <div class="userSearchImg">
                <img src="https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png" alt="">
            </div>
            <h3>${doc.data().username}</h3>
        </div>
        <button data-crushId = "${doc.data().userId}" data-crushName = "${doc.data().username}" data-crushEmail = "${doc.data().userEmail}" class="crushMatchBtn">Match</button>
    </div>`
});

/* ================ Start of Search Crush Section ================ */
function searchCrush() {
    const searchInput = document.getElementsByClassName("searchInput")[0].value;
    const searchUserContainer = document.getElementsByClassName("searchUserContainer")[0];
    const userSearchBoxes = document.querySelectorAll(".userSearchBox");
    userSearchBoxes.forEach(userSearchBox => {
        if (searchInput === userSearchBox.dataset.id) {
            searchUserContainer.classList.add("searchUserContainerActive");
            userSearchBox.classList.add("userSearchBoxActive");
        }
    })
}

document.getElementsByClassName("searchButton")[0].addEventListener("click", searchCrush);
document.getElementsByClassName("searchBoxCloseBtn")[0].addEventListener("click", () => {
    let searchInput = document.getElementsByClassName("searchInput")[0];
    searchInput.value = "";
    const userSearchBoxes = document.querySelectorAll(".userSearchBox");
    userSearchBoxes.forEach(userSearchBox => {
        searchUserContainer.classList.remove("searchUserContainerActive");
        userSearchBox.classList.remove("userSearchBoxActive");
    });
})

/* ================= End of Search Crush Section =============== */
/* ===================== Chat Message Send ===================== */
let currentEmail = window.localStorage.getItem("currentEmail");
let myUserID;
(function () {
    querySnapshot.forEach((doc) => {
        if (doc.data().userEmail === currentEmail) {
            myUserID = doc.data().userId;
        }
    })
})();
const realTimeSnap = await get(ref(realTimeDb, "crushList/"));
const snapShotData = realTimeSnap.val();
let myCrushID;
let myCrushName;
for (let i in snapShotData) {
    if (snapShotData[i].userCurrentEmail === currentEmail) {
        myCrushID = snapShotData[i].crushID;
        myCrushName = snapShotData[i].crushName;
    }
}
let crushMatchButtons = document.querySelectorAll(".crushMatchBtn");
const friendRef = collection(firestoreDb, 'userList', currentEmail, "myCrush")

crushMatchButtons.forEach(crushMatchBtn => {
    crushMatchBtn.addEventListener("click", () => {
        let searchInput = document.getElementsByClassName("searchInput")[0].value;
        if (searchInput === crushMatchBtn.dataset.crushid) {
            let crushDetail = {
                crushName: crushMatchBtn.dataset.crushname,
                crushID: crushMatchBtn.dataset.crushid,
                crushEmail: crushMatchBtn.dataset.crushemail,
                userCurrentID: myUserID,
                userCurrentEmail: currentEmail
        
            }
            addDoc(friendRef,{
                crushName: crushMatchBtn.dataset.crushname,
                crushID: crushMatchBtn.dataset.crushid,
                crushEmail: crushMatchBtn.dataset.crushemail,
            })
            const friendZonedRef = collection(firestoreDb, 'userList', crushMatchBtn.dataset.crushemail, "stalkers")
         addDoc(friendZonedRef,{
                   name: currentEmail
                  })

        set(ref(realTimeDb, "crushList/" + myUserID), crushDetail);
            alert("Та crush-тайгаа match хийлээ");
           
        }
        crushAddToMenu();
    })
});
function crushAddToMenu() {
    for (let i in snapShotData) {
        if (snapShotData[i].crushID === myUserID) {
            document.getElementsByClassName("crushList")[0].innerHTML =
                `<div data-listCrushId = "${snapShotData[i].crushID}" class="crushBox">
                    <div class="crushAvatar">
                        <img src="${snapShotData[i].myAvatar}" alt="">
                    </div>
                    <div class="crushName">${snapShotData[i].myName}</div>
                    <i class="fa-solid fa-circle-xmark crushListRemoveBtn"></i>
                    <div class="bioBox perfectCenter">${snapShotData[i].myBio}</div>
                </div>`
            
        }
    }
}
crushAddToMenu();
(function () {
    for (let i in snapShotData) {
        if (snapShotData[i].userCurrentID === myUserID) {
            document.getElementById("userNameCu").innerHTML = snapShotData[i].crushName;
        }
    }
})();
(function () {
    for (let i in snapShotData) {
        if (snapShotData[i].crushID === myUserID) { 
            document.getElementsByClassName("myCrushBox")[0].innerHTML = 
            `<div data-ChatUserCrushId = "${snapShotData[i].crushID}" class="chatUserList">
                <div class="chatUserImage">
                    <img src="${snapShotData[i].myAvatar}" alt="">
                </div>
                <p class="chatUserName">${snapShotData[i].myName}</p>
            </div>`
            document.getElementById("imgProfile").src = snapShotData[i].myAvatar;
        }
    }
})()
/* ================= Select Avatar Image Section ================= */

const avatarImgs = document.querySelectorAll(".avatarImg");
let profileImg = document.getElementById("profileImg");

avatarImgs.forEach(avatarImg => {
    avatarImg.addEventListener("click", () => {
        profileImg.src = avatarImg.src;
        update(ref(realTimeDb, "crushList/" + myUserID), {
            myAvatar: avatarImg.src
        });
    })
})

const saveChange = document.getElementsByClassName("save_change")[0];
saveChange.addEventListener("click", () => {
    let userNameType = document.getElementById("userNameType").value;
    let bioTypeField = document.getElementById("bioTypeField").value;
    if (userNameType !== "" && bioTypeField !== "") {
        update(ref(realTimeDb, "crushList/" + myUserID), {
            myBio: bioTypeField,
            myName: userNameType
        });
        alert("Saved successfully")
        document.location.reload(true);
    } else if (userNameType !== "") {
        update(ref(realTimeDb, "crushList/" + myUserID), {
            myName: userNameType
        });
        alert("Your username successfully changed")
        document.location.reload(true);
    }
    else if (bioTypeField !== "") {
        update(ref(realTimeDb, "crushList/" + myUserID), {
            myBio: bioTypeField,
        });
        alert("Your bio successfully changed")
        document.location.reload(true);
    }
})
let userAvatarImg = document.getElementById("userAvatarImg");
for (let i in snapShotData) {
    if (snapShotData[i].userCurrentEmail === currentEmail) {
       
        document.getElementsByClassName("userName")[0].innerHTML = snapShotData[i].crushName;
        profileImg.src = snapShotData[i].myAvatar;
        userAvatarImg.src = snapShotData[i].myAvatar;
        document.getElementsByClassName("uniqueID")[0].innerHTML = snapShotData[i].userCurrentID;
    }
}

let crushList = document.getElementsByClassName("crushList")[0];
let crushBoxes = document.querySelectorAll(".crushBox");
function showCrush() {
    crushBoxes.forEach(crushBox => {
        crushList.classList.add("crushListActive");
        crushBox.classList.add("crushBoxActive");
    })
}
document.getElementById("crushLink").addEventListener("click", showCrush)
let crushListRemoveBtn = document.getElementsByClassName("crushListRemoveBtn")[0];
crushListRemoveBtn.addEventListener("click", () => {
    crushBoxes.forEach(crushBox => {
        crushList.classList.remove("crushListActive");
        crushBox.classList.remove("crushBoxActive");
    })
})

/* ==================== Type Message Section ==================== */

document.addEventListener("keypress", (key) => {
        if (key.which === 13) {
            console.log("yes");
            sendMessage();
        }
    });

async function sendMessage () {
    let chatMessage = {
        msg: document.getElementById("textMessage").value,
        dateTime: new Date().toLocaleString(),
        myUserID: myUserID,
        myCrushID: myCrushID
    };
    await push(child(ref(realTimeDb), "messages/" + myUserID), chatMessage);
    await push(child(ref(realTimeDb), "messages/" + myCrushID), chatMessage);
    
    document.getElementById("textMessage").value = "";
    document.getElementsByClassName("msgBodyContainer")[0].scrollTo(0, document.getElementsByClassName("msgBodyContainer")[0].clientHeight)
}

(function () {
    for (let i in snapShotData) {
        if (snapShotData[i].crushEmail === currentEmail) {
                document.getElementsByClassName("iAmTheirCrush")[0].innerHTML +=
                    `<div data-ChatUserCrushId = "${snapShotData[i].userCurrentID}" class="chatUserList1">
                    <div class="chatUserImage">
                        <img src="${snapShotData[i].myAvatar}" alt="">
                    </div>
                    <p class="chatUserName">${snapShotData[i].userCurrentID}</p>
                </div>`
        }
    }
})();
let chatSnapSnotS;
onValue(ref(realTimeDb, "messages/" + myUserID), (snapshot) => {
    chatSnapSnotS = snapshot.val();
    document.getElementsByClassName("msgBodyContainer")[0].innerHTML = "";
    loadChatMessages(); 
})

/* ============= Чиний илгээсэн текс харагдах хэсэг ============= */

let messageDisplay = "";
function loadChatMessages() {
    for (let i in chatSnapSnotS) {
        let dataTime = chatSnapSnotS[i].dateTime.split(",");
            if (chatSnapSnotS[i].myUserID === myUserID) { 
                messageDisplay = `
                <div class="chatBox right">
                    <div class="chatUserImg">
                        <img src="https://avatars.design/wp-content/uploads/2016/09/28_GIF.gif" alt="">
                    </div>
                    <div class="chatBoxTxt">
                        ${chatSnapSnotS[i].msg}
                        <span class="receiveTime" title="${dataTime[0]}">${dataTime[1]}</span>
                    </div>
                </div>`
            }
            else {
                messageDisplay = `
                    <div class="chatBox left">
                        <div class="chatUserImg">
                            <img src="https://avatars.design/wp-content/uploads/2016/09/28_GIF.gif" alt="">
                        </div>
                        <div class="chatBoxTxt">
                            ${chatSnapSnotS[i].msg}
                            <span class="receiveTime" title="${dataTime[0]}">${dataTime[1]}</span>
                        </div>
                    </div>   `
                }
        document.getElementsByClassName("msgBodyContainer")[0].innerHTML += messageDisplay;
    }
}
/* ===================== Secret Chat Section ===================== */
const sendSecretChatBtn = document.getElementsByClassName("sendSecretChatBtn")[0];
let chatTrack = document.getElementsByClassName("chatTrack")[0];
let colorsArr = ["#eadff2", "#dccbed", "#fcb7d0", "#f07bbb", "#9979c1"];
async function sendSecretChat() {
    let color = Math.floor(Math.random() * colorsArr.length);
    let secretChatMessage = {
        secretMsg: document.getElementById("secretChatTyper").value,
        myUserID: myUserID,
        myCrushID: myCrushID,
        color: colorsArr[color]
    };
    await push(child(ref(realTimeDb), "secretChat/"), secretChatMessage);
    document.getElementById("secretChatTyper").value = "";
}
sendSecretChatBtn.addEventListener("click", sendSecretChat);
let secretSnapSnotS;
onValue(ref(realTimeDb, "secretChat/"), (snapshot) => {
    secretSnapSnotS = snapshot.val();
    let secretWords = "";
    for (let i in secretSnapSnotS) {
        if (secretSnapSnotS[i].myCrushID === myUserID) { 
                secretWords += `
                <span class="secretChat" style="background:${secretSnapSnotS[i].color};}">${secretSnapSnotS[i].secretMsg}</span>`;
                chatTrack.innerHTML = secretWords;
            chatTrack.scrollTo(0, chatTrack.clientHeight);
        } else {
            console.log(secretSnapSnotS[i].myCrushID)
        }
    }
})
/* =================== Chat User Show Section =================== */
let idOfUnknkownOne;
const chatUserList1s = document.querySelectorAll(".chatUserList1");

chatUserList1s.forEach(chatUser => {
    chatUser.addEventListener("click", () => {
        idOfUnknkownOne = chatUser.dataset.chatusercrushid;
        let messengerContBox = `
                <div class="messengerContainerBox">
                    <div class="chatHeader">
                        <i class="fa-solid fa-users usersChatBtn"></i>
                        <i class="fa-solid fa-arrow-right chatBackBtn"></i>
                        <div class="userAvatar">
                            <img id="imgProfile" src="https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png" alt="">
                        </div>
                        <p class="userName" id="userNameCu">${idOfUnknkownOne}</p>
                        <p class="userDateLastSeen">Last seen</p>
                    </div>
                    <div class="msgBodyContainer"></div>
                    <div class="msgFooter">
                        <i class="fa-regular fa-face-smile smileChatBtn"></i>
                        <input name="message" id="textMessage" type="text"  placeholder="Write a message">
                    </div>
                </div>
            `
        document.getElementsByClassName("messengerContainer")[0].innerHTML = messengerContBox;
    })
})


document.getElementsByClassName("myCrushBox")[0].addEventListener("click", () => {
    let messengerContBox = `
                <div class="messengerContainerBox">
                    <div class="chatHeader">
                        <i class="fa-solid fa-users usersChatBtn"></i>
                        <i class="fa-solid fa-arrow-right chatBackBtn"></i>
                        <div class="userAvatar">
                            <img id="" src="" alt="">
                        </div>
                        <p class="userName" id="userNameCu">${myCrushName}</p>
                        <p class="userDateLastSeen">Last seen</p>
                    </div>
                    <div class="msgBodyContainer"></div>
                    <div class="msgFooter">
                        <i class="fa-regular fa-face-smile smileChatBtn"></i>
                        <input name="message" id="textMessage" type="text"  placeholder="Write a message">
                    </div>
                </div>
            `
        document.getElementsByClassName("messengerContainer")[0].innerHTML = messengerContBox;
})



/* Finish */