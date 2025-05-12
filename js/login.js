/// Light and dark Theme
var themeIcon = document.getElementById('toggle-theme');

document.addEventListener('DOMContentLoaded', function() {
  // Apply saved theme if it exists
  if (localStorage.getItem('darkTheme')) {
    document.body.classList.add('dark-theme');
    themeIcon.innerHTML = '<i class="fa-solid fa-sun" id="toggleRThemeIcon"></i>';
  } else {
    document.body.classList.remove('dark-theme');
    themeIcon.innerHTML = '<i class="fa-solid fa-moon" id="toggleRThemeIcon"></i>';
  }
});

themeIcon.addEventListener('click', function() {
  document.body.classList.toggle('dark-theme');

  if (document.body.classList.contains('dark-theme')) {
    themeIcon.innerHTML = '<i class="fa-solid fa-sun" id="toggleThemeIcon"></i>';
    localStorage.setItem('darkTheme', true);
  } else {
    themeIcon.innerHTML = '<i class="fa-solid fa-moon" id="toggleThemeIcon"></i>';
    localStorage.setItem('darkTheme', false);
  }
});

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

EMAIL.addEventListener("input", validateEmail);


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
PASSWORD.addEventListener("input", function () {
  validatePassword();
});

const savedEmail = localStorage.getItem("userEmail");
const savedPassword = localStorage.getItem("userPassword");

// const signUp = document.getElementById("si");

// signUp.addEventListener("click", function(eL){
//   eL.preventDefault();
// });

let errorBox = document.getElementById("login-error-box");
if (!errorBox) {
  errorBox = document.createElement("div");
  errorBox.id = "login-error-box";
  errorBox.style.display = "none";
  document.body.appendChild(errorBox);
}

// Add styles for the error box
const errorBoxStyle = document.createElement("style");
errorBoxStyle.textContent = `
  #login-error-box {
    position: fixed;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: #ff4b2b;
    color: #fff;
    padding: 1rem 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    font-size: 1.1rem;
    z-index: 10000;
    transition: opacity 0.3s;
    opacity: 0.95;
  }
`;
document.head.appendChild(errorBoxStyle);


// Form submission handler
submit.addEventListener("click", async function (e) {
  e.preventDefault();
  // Validate all fields
  const isEmailValid = validateEmail();
  const isPasswordValid = await validatePassword();

  // Only submit if all validations pass
  if (
    isEmailValid &&
    isPasswordValid &&
    EMAIL.value === savedEmail &&
    passwordHash === savedPassword
  ) {

    localStorage.setItem("isLoggedIn", "true");

    location.replace('start');
  }else
  {
    errorBox.textContent = "Incorrect Email OR password.";
    errorBox.style.display = "block";
    setTimeout(() => {
      errorBox.style.display = "none";
    }, 3000); 
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
/*
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
*/

// Create the modal div for the timeout message
const timeoutModal = document.createElement("div");
timeoutModal.id = "timeout-modal";
timeoutModal.innerHTML = `
  <div class="timeout-modal-content">
    <h2>Session Timeout</h2>
    <p>You have exceeded the time limit.</p>
    <button id="timeout-ok-btn">OK</button>
  </div>
`;
timeoutModal.style.display = "none";
document.body.appendChild(timeoutModal);

// Style the modal and background
const style = document.createElement("style");
style.textContent = `
  #timeout-modal {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    );
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .timeout-modal-content {
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.18);
    padding: 2.5rem 2.5rem 2rem 2.5rem;
    text-align: center;
    max-width: 500px;
  }
  .timeout-modal-content h2 {
    margin-bottom: 0.5rem;
    color: #333;
    font-size: 1.7rem;
    font-weight: 700;
  }
  .timeout-modal-content p {
    color: #555;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }
#timeout-ok-btn {
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.7rem 2.2rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
    font-weight: 600;
    background: linear-gradient(90deg, #ff416c, #ff4b2b);
}
#timeout-ok-btn:hover {
    background: linear-gradient(90deg, #ff4b2b, #ff416c);
}
`;
document.head.appendChild(style);

// Update inactivity timer logic
let inactivityTimer;

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(function () {
    // Clear input fields
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    // Show the modal
    timeoutModal.style.display = "flex";

    // Optionally, blur the background
    document.body.style.filter = "blur(0.5px)";

    // Prevent interaction with the rest of the page
    document.body.style.overflow = "hidden";
  }, 25000);
}

// Reset timer on user activity
["mousemove", "keydown", "mousedown", "touchstart"].forEach((event) => {
  document.addEventListener(event, resetInactivityTimer);
});

// Start timer initially
resetInactivityTimer();

// Handle OK button to reload the page
document.getElementById("timeout-ok-btn").onclick = function () {
  timeoutModal.style.display = "none";
  document.body.style.overflow = "";
  document.body.style.filter = "";
  location.reload();
};
