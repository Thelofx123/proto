/* ======================= Password Show Button ================== */
const passField = document.getElementsByClassName("password")[0],
    passShowHide = document.getElementsByClassName("showHidePw")[0],
    showPasswordBtn = document.getElementsByClassName("showPasswordBtn")[0];
passShowHide.addEventListener("click", () => {
    if (passField.type === "password") {
        passField.type = "text";
        passShowHide.classList.replace("fa-eye-slash", "fa-eye");
    }
    else {
        passField.type = "password";
        passShowHide.classList.replace("fa-eye", "fa-eye-slash")
    }
});
document.getElementById('showPassword').onclick = function() {
    if ( this.checked ) {
        document.getElementById('passwordUp').type = "text";
    } else {
        document.getElementById('passwordUp').type = "password";
    }
};
const loginForm = document.getElementsByClassName("loginForm")[0];
const signUpForm = document.getElementsByClassName("signUpForm")[0],
    inputFields = document.querySelectorAll(".inputFields");
/* ============================ Smile ============================ */
const loginSmileBtn = document.getElementsByClassName("loginSmileBtn")[0];
const signUpSmileBtn = document.getElementsByClassName("signUpSmileBtn")[0];
const smileArray = ["fa-face-grin", "fa-face-grin-beam", "fa-face-grin-stars", "fa-face-grin-wink", "fa-face-kiss-beam", "fa-face-kiss-wink-heart", "fa-face-laugh-squint", "fa-face-dizzy", "fa-face-sleepy"];
let i = 0, j = 0;
signUpSmileBtn.addEventListener("click", () => {
    if (signUpSmileBtn.classList.contains("fa-face-grin-hearts")) {
        signUpSmileBtn.classList.replace("fa-face-grin-hearts", smileArray[i]);
    } else if (i > 0) {
        signUpSmileBtn.classList.replace(smileArray[i - 1], smileArray[i]);
    }
    else if (i <= smileArray.length - 1) {
        signUpSmileBtn.classList.replace(smileArray[8], smileArray[0]);
        i = -1;
    }
    i++;
})
loginSmileBtn.addEventListener("click", () => {
    if (loginSmileBtn.classList.contains("fa-face-grin-hearts")) {
        loginSmileBtn.classList.replace("fa-face-grin-hearts", smileArray[j]);
    } else if (j > 0) {
        loginSmileBtn.classList.replace(smileArray[j - 1], smileArray[j]);
    }
    else if (j === smileArray.length) {
        j = 0;
        loginSmileBtn.classList.replace(smileArray[9], smileArray[0]);
    }
    j++;
})
/* ======================== Switch login ======================== */
const loginText = document.getElementsByClassName("loginText")[0],
    signupText = document.getElementsByClassName("signupText")[0];
signupText.addEventListener("click", () => {
    fromLoginToSignUp();
})
loginText.addEventListener("click", () => {
    fromSignUpToLogin();
    inputFields.forEach(e => {
        e.classList.remove("error");
        e.classList.remove("success");
    })
    removeInputs();
})
function fromSignUpToLogin() {
    signUpForm.classList.remove("signUpFormActive");
    loginForm.classList.add("loginFormActive");
}
function fromLoginToSignUp() {
    loginForm.classList.remove("loginFormActive");
    signUpForm.classList.add("signUpFormActive");
}
function removeInputs() {
    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    password2.value = "";
}
/* ======================== Check Section ======================== */
let nameInput = document.getElementById("nameInput"),
    emailInput = document.getElementById("emailInput"),
    passwordInput = document.getElementById("passwordInput"),
    password2 = document.getElementById("passwordUp");

function formFunction() {
    checkInputs();
}
function checkInputs() {
    let usernameValue = nameInput.value,
        emailValue = emailInput.value,
        passwordValue = passwordInput.value,
        password2Value = password2.value;
    if (usernameValue === "") {
        setError(nameInput, "Username cannot be blank");
    }else {
        setSuccess(nameInput);
    }
	if(emailValue === "") {
		setError(emailInput, 'Email address cannot be blank');
    } else if (!isEmail(emailValue)) {
        setError(emailInput, 'Имэйл биш');
    }else {
		setSuccess(emailInput);
	}
	if(passwordValue === "") {
		setError(passwordInput, 'Password cannot be blank');
	}else {
		setSuccess(passwordInput);
	}
	if(password2Value === "") {
		setError(password2, 'Confirm your password');
	}else if(passwordValue !== password2Value) {
		setError(password2, 'Password does not match');
	}else{
		setSuccess(password2);
	}
}
function setError(input, message) {
    let inputField = input.parentElement;
    let small = inputField.querySelector("small");
    inputField.className = "inputFields error";
    small.innerText = message;
}
function setSuccess(input) {
    let inputField = input.parentElement;
    inputField.className = "inputFields success";
}
function isEmail(emailInput) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailInput);
}
let distance = 30;
let body = document.getElementsByTagName("body")[0];
let horLine = document.getElementsByClassName("horLine")[0];
let verLine = document.getElementsByClassName("verLine")[0];
for (let i = 0; i < body.clientHeight / distance; i++){
    let hrline = document.createElement("div");
    hrline.className = "hr";
    hrline.style.top = (distance * i) + "px";
    horLine.appendChild(hrline);
}
for (let i = 0; i < body.clientWidth / distance; i++){
    let vrline = document.createElement("div");
    vrline.className = "vr";
    vrline.style.left = (distance * i) + "px";
    verLine.appendChild(vrline);
}