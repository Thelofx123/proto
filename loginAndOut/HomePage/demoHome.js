// let amount = 30;
// let starSection = document.querySelector('.starSection');
// let i = 0;
// while (i < amount) {
// let star = document.createElement("i")
// star.className = "star";
// let starIn = document.createElement("i");
// starIn.className = "starIn";
// let posX = Math.floor(Math.random() * starSection.clientWidth);
// let posY = Math.floor(Math.random() * starSection.clientHeight);
// let rotation = Math.random() * 180;
// let delay = Math.random() * 20;
// let scale = Math.random() * 1;
// starIn.style.left = posX + 'px';
// starIn.style.top = posY + 'px';
// star.style.transform = 'rotate('+ rotation +'deg) scale('+ scale+ ')';
// starIn.style.animationDelay = delay +'s';
// starIn.appendChild(star);
// starSection.appendChild(starIn);
//     i++;
// }

const wordArray = [
    "Чи өнөөдөр сайхан харагдаж байна.",
    "Чиний хүрч чадах дээд хязгаар зөвхөн чи.",
    "Өнөөдөр чиний нүд гэрэлтэж байна.",
    "Битгий бууж өг, эхлэл нь үргэлж хэцүү байдаг.",
    "Ам юугаар бялхана, амьдрал түүгээр бялхана.",
    "Эртхэн унтаарай.",
    "Дэлхийн хамгийн сайхан зүйлс үнэгүй гээд боддоо, инээмсэглээрэй!",
    "Хэн ч хянаж хараагүй байхад сайн хийсээр л байхыг чанар гэнэ.",
    "Чи төгс биш байж болох ч дахин давтагдашгүй гэдгээ санаарай!",
    "Усаа сайн уугаарай.",
    "Амжилтын нууц бол эхлэхэд оршино.",
    "Чадна гэдэгтээ итгэхэд туулах замын хагас нь ард үлддэг.",
    "Нар гарнаа Золбоо!",
    "Амьдрах ганц арга зам бол түүнд галзуу мэт дурлах.",
    "Бусад руу тавьсан сум хорвоог бүтэн тойроод чамайг онилно...",
    "Өдрийг сайхан өнгөрүүлээрэй",
];
let biosCon = document.querySelector(".biosCon");
let j = 0, slideTime = 4000;
function wordChanger() {
    if (j <= wordArray.length) {
        biosCon.textContent = wordArray[j];
        j++;
    }
    else {
        j = 0;
    }
    setTimeout("wordChanger()", slideTime);
}
// wordChanger();
/* ====================== Sign Out Section ====================== */
const displayUserEmail = window.localStorage.getItem("currentEmail");
const signOutBtn = document.getElementById("signOutBtn");
signOutBtn.addEventListener("click", () => {
    window.location.href = "/loginAndOut/loginAndSignup.html"
})
/* ========================= Secret Chat ========================= */
const secretChatBtn = document.getElementById("secretChatBtn");
const secretChatBox = document.getElementsByClassName("secretChatBox")[0];
secretChatBtn.addEventListener("click", () => {
    secretChatBox.classList.toggle("secretChatBoxActive");
})
/* ========================= Chat Section ======================== */
const chatOpenBtn = document.getElementsByClassName("chatOpenBtn")[0];
const chatBackBtn = document.getElementsByClassName("chatBackBtn")[0];
const messengerContainer = document.getElementsByClassName("messengerContainer")[0];
chatOpenBtn.addEventListener("click", () => {
    messengerContainer.classList.add("messengerContainerActive");
})
chatBackBtn.addEventListener("click", () => {
    messengerContainer.classList.remove("messengerContainerActive");
})
/* ========================== Dropdown ========================== */
let barBtn = document.getElementsByClassName("fa-bars")[0];
barBtn.addEventListener("click", () => {
    if (barBtn.classList.contains("fa-bars")) {
        barBtn.classList.replace("fa-bars", "fa-xmark");
        document.getElementsByClassName("dropDown")[0].classList.add("dropDownActive");
    }
    else {
        barBtn.classList.replace("fa-xmark", "fa-bars");
        document.getElementsByClassName("dropDown")[0].classList.remove("dropDownActive");
    }
})
const editPro = document.getElementsByClassName("editPro")[0];
let xMark = document.getElementsByClassName("fa-xmark")[0];
const arrowLeft = document.getElementsByClassName("fa-arrow-left")[0]
let dropDown_editPro = document.getElementsByClassName("dropDown_editPro")[0];
editPro.addEventListener("click", () => {
    barBtn.style.display = "none";
    arrowLeft.style.display = "flex";
    dropDown_editPro.classList.add("dropDown_editProActive");
})
arrowLeft.addEventListener("click", () => {
    barBtn.style.display = "flex";
    arrowLeft.style.display = "none";
    dropDown_editPro.classList.remove("dropDown_editProActive");
})
const heartBtn = document.getElementById("heartBtn");
const message = document.getElementsByClassName("message")[0];
const heart = document.getElementsByClassName("heart")[0];
heartBtn.addEventListener("click", () => {
	message.classList.toggle("messageActive");
	heart.classList.toggle("heartmove");
})
const help = document.getElementsByClassName("help")[0];
const helpContainer = document.getElementsByClassName("helpContainer")[0];
help.addEventListener("click", () => {
    helpContainer.classList.add("helpContainerActive");
})
const helpRemoveBtn = document.getElementById("helpRemoveBtn");
helpRemoveBtn.addEventListener("click", () => {
    helpContainer.classList.remove("helpContainerActive");
    message.classList.remove("messageActive");
    heart.classList.remove("heartmove");
})
const theme = document.getElementsByClassName("theme")[0];
theme.addEventListener("click", () => {
    document.getElementsByClassName("themeContainer")[0].classList.add("themeContainerActive");
    document.getElementsByClassName("themeBox")[0].classList.add("themeBoxActive");
})
const themeRemoveBtn = document.getElementById("themeRemoveBtn");
themeRemoveBtn.addEventListener("click", () => {
    document.getElementsByClassName("themeContainer")[0].classList.remove("themeContainerActive");
    document.getElementsByClassName("themeBox")[0].classList.remove("themeBoxActive");
})
document.getElementsByClassName("usersChatBtn")[0].addEventListener("click", () => {
    document.getElementsByClassName("chatUsersContainer")[0].classList.add("chatUsersContainerActive");
})
document.getElementsByClassName("fa-angle-right")[0].addEventListener("click", () => {
    document.getElementsByClassName("chatUsersContainer")[0].classList.remove("chatUsersContainerActive");
})
document.getElementsByClassName("fa-angles-right")[0].addEventListener("click", () => {
    document.getElementsByClassName("chatUsersContainer")[0].classList.remove("chatUsersContainerActive");
    document.getElementsByClassName("messengerContainer")[0].classList.remove("messengerContainerActive");
})