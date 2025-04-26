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

EMAIL.addEventListener("input", validateEmail);

// Password validation configuration
const PASSWORD_CONFIG = {
  minLength: 12,
  regex:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/,
  commonPatterns: [
    "123456",
    "password",
    "qwerty",
    "admin",
    "welcome",
    "111111",
    "123123",
    "abc123",
  ],
};

// Main password validation function
function validatePassword() {
  const password = PASSWORD.value;

  // Empty check
  if (password === "") {
    Pspan.textContent = "*This field is required";
    return false;
  }

  // Check for common patterns
  if (hasCommonPattern(password)) {
    Pspan.textContent =
      "Password contains a common pattern. Please use a more secure password.";
    return false;
  }

  // Regex check for complexity requirements
  if (!PASSWORD_CONFIG.regex.test(password)) {
    Pspan.textContent = `Password must be at least ${PASSWORD_CONFIG.minLength} characters with uppercase, lowercase, number, and special character`;
    return false;
  }

  if (PASSWORD.value !== savedPassword) {
    Pspan.textContent = "Incorrect password";
    return false;
  }

  // Success case
  Pspan.textContent = "";
  return true;
}

// Helper function to check for common weak patterns
function hasCommonPattern(password) {
  return PASSWORD_CONFIG.commonPatterns.some((pattern) =>
    password.toLowerCase().includes(pattern)
  );
}

// Password strength visualization
function checkPasswordStrength() {
  const password = PASSWORD.value;

  // Remove any existing meter
  const existingMeter = document.querySelector(".strength-meter");
  if (existingMeter) existingMeter.remove();

  // If password is empty, don't show meter
  if (password === "") return;

  // Create meter container
  const strengthMeter = document.createElement("div");
  strengthMeter.className = "strength-meter";

  // Calculate strength score
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  // Create strength indicator bar
  const strengthBar = document.createElement("div");
  strengthBar.className = "strength-bar";

  // Determine text and color based on strength
  let strengthLabel = "";
  let color = "";

  switch (strength) {
    case 0:
    case 1:
      strengthLabel = "Very Weak";
      color = "#ff4d4d";
      break;
    case 2:
    case 3:
      strengthLabel = "Weak";
      color = "#ffa64d";
      break;
    case 4:
      strengthLabel = "Medium";
      color = "#ffff4d";
      break;
    case 5:
      strengthLabel = "Strong";
      color = "#4dff4d";
      break;
    case 6:
      strengthLabel = "Very Strong";
      color = "#4d4dff";
      break;
  }

  // Set visual properties
  strengthBar.style.width = `${(strength / 6) * 100}%`;
  strengthBar.style.backgroundColor = color;

  // Create text indicator
  const strengthText = document.createElement("span");
  strengthText.textContent = strengthLabel;

  // Assemble and insert the meter
  strengthMeter.appendChild(strengthBar);
  strengthMeter.appendChild(strengthText);
  PASSWORD.parentNode.appendChild(strengthMeter);

  return strength >= 4; // Consider 4+ as acceptable strength
}

// Set up event listeners
PASSWORD.addEventListener("input", function () {
  validatePassword();
  checkPasswordStrength();
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
    PASSWORD.value === savedPassword
  ) {

    localStorage.setItem("isLoggedIn", "true");

    location.replace('start.html');
  }
});

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
