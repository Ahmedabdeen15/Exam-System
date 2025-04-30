/// Light and dark Theme
// var themeIcon = document.getElementById('toggle-theme');

// themeIcon.addEventListener('click', function() {
//   document.body.classList.toggle('dark-theme');

//   if (document.body.classList.contains('dark-theme')) {
//     themeIcon.innerHTML = '<i class="fa-solid fa-sun" id="toggleThemeIcon"></i>';
//   } else {
//     themeIcon.innerHTML = '<i class="fa-solid fa-moon" id="toggleThemeIcon"></i>';
//   }
// });

// Check if user is already registered - add this at the top of registration.js
// document.addEventListener('DOMContentLoaded', function() {
//   // Get registration status from localStorage
//   const isRegistered = localStorage.getItem('isRegistered');

//   // If user is already registered, redirect to login page
//   if (isRegistered === 'true') {
//     location.href = 'login.html';
//   }
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const isRegistered = localStorage.getItem("isRegistered");

//   // Check if user is already registered and we're on the registration page
//   if (
//     isRegistered === "true" &&
//     (location.pathname.endsWith("/index.html") ||
//       location.pathname === "/index.html" ||
//       location.pathname === "/" ||
//       location.pathname.endsWith("/") ||
//       location.pathname === "" ||
//       location.pathname.endsWith("")
//   )
//   ) {
//     location.href = "login.html";
//   }
// });

// Password toggle functionality
const togglePassword = document.getElementById("showPass");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", function () {
  // Toggle password visibility
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    // Replace the icon with eye icon
    togglePassword.innerHTML =
      '<i class="fa-solid fa-eye" id="togglePasswordIcon"></i>';
  } else {
    passwordInput.type = "password";
    // Replace the icon with eye-slash icon
    togglePassword.innerHTML =
      '<i class="fa-solid fa-eye-slash" id="togglePasswordIcon"></i>';
  }
});

// Get secondary button
const secondaryButton = document.getElementById("si");

secondaryButton.addEventListener("mouseenter", function () {
  this.disabled = true;
});

// Enable button when mouse leaves
secondaryButton.addEventListener("mouseleave", function () {
  this.disabled = false;
});

var EMAIL = document.getElementById("email");
var Espan = document.getElementById("ESpan");

var PASSWORD = document.getElementById("password");
var passwordHash;
var Pspan = document.getElementById("PSpan");

var submit = document.getElementById("LoginS");

var emailRe = new RegExp(
  "^(?!.*\\.\\.)" +
    "[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,62}[A-Za-z0-9])?" +
    "@" +
    "(?:" +
    "gmail\\.com" +
    "|yahoo\\.(?:com|co\\.uk)" +
    "|outlook\\.com" +
    "|hotmail\\.com" +
    "|live\\.com" +
    "|icloud\\.com" +
    ")" +
    "$"
);

// Email Validation
function validateEmail() {
  if (EMAIL.value === "") {
    Espan.textContent = "*This field is required";
    return false;
  } else if (!emailRe.test(EMAIL.value)) {
    Espan.textContent = "Please enter a correct email format";
    return false;
  }else if (EMAIL.value !== savedEmail) {
    Espan.textContent = "Email not registered";
    return false;
  } else {
    Espan.textContent = "";
    return true;
  }
}

EMAIL.addEventListener("click", validateEmail);


// Main password validation function
async function validatePassword() {
  const password = PASSWORD.value;
  passwordHash = await hashPassword(PASSWORD.value);

  // Empty check
  if (password === "") {
    Pspan.textContent = "*This field is required";
    return false;
  }

  // Success case
  Pspan.textContent = "";
  return true;
}

// Set up event listeners
PASSWORD.addEventListener("click", function () {
  validatePassword();
});

const savedEmail = localStorage.getItem("userEmail");
const savedPassword = localStorage.getItem("userPassword");

// const signUp = document.getElementById("si");

// signUp.addEventListener("click", function(eL){
//   eL.preventDefault();
// });

// Form submission handler
submit.addEventListener("click", function (e) {
  e.preventDefault();
  // Validate all fields
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  // Only submit if all validations pass
  if (
    isEmailValid &&
    isPasswordValid &&
    EMAIL.value === savedEmail &&
    passwordHash === savedPassword
  ) {

    localStorage.setItem("isLoggedIn", "true");

    location.replace('start.html');
  }
});

/*
// Hide main element and alert after 30s of user inactivity
let inactivityTimer;

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(function () {
    var mainElement = document.querySelector("main");
    mainElement.style.display = "none";
    alert("You have exceeded the time limit");
  }, 30000);
}

// Reset timer on user activity
["mousemove", "keydown", "mousedown", "touchstart"].forEach((event) => {
  document.addEventListener(event, resetInactivityTimer);
});

// Start timer initially
resetInactivityTimer();

// Add dynamic background
document.body.style.background = `linear-gradient(
  ${Math.random() * 360}deg,
  hsl(${Math.random() * 360}, 70%, 30%),
  hsl(${Math.random() * 360}, 70%, 30%)
)`;
*/

// Hide main element and alert after 30s of user inactivity
let inactivityTimer;

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(function () {
    // Clear input fields
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    // Refresh the page
    location.reload();

    // Alert the user
    alert("You have exceeded the time limit");
    

  }, 30000);
}

// Reset timer on user activity
["mousemove", "keydown", "mousedown", "touchstart"].forEach((event) => {
  document.addEventListener(event, resetInactivityTimer);
});

// Start timer initially
resetInactivityTimer();