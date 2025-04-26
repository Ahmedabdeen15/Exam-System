/// Light and dark Theme
// var themeIcon = document.getElementById('toggle-R-theme');

// themeIcon.addEventListener('click', function() {
//   document.body.classList.toggle('dark-theme');

//   if (document.body.classList.contains('dark-theme')) {
//     themeIcon.innerHTML = '<i class="fa-solid fa-sun" id="toggleRThemeIcon"></i>';
//   } else {
//     themeIcon.innerHTML = '<i class="fa-solid fa-moon" id="toggleRThemeIcon"></i>';
//   }
// });

/*
 * There is no direct way in JavaScript to clear the entire browser cache (including all cached files, cookies, etc.) for security reasons.
 * However, you can clear localStorage and sessionStorage for your site as follows:
 */

// Run this block only once ever (on first visit)
// if (!localStorage.getItem("hasInitializedRegistration")) {
//   document.addEventListener("DOMContentLoaded", function() {
//     // Only set isRegistered to false if it doesn't exist yet
//     if (localStorage.getItem("isRegistered") === null) {
//       localStorage.setItem("isRegistered", "false");
//     }
//     // Mark as initialized so this never runs again
//     localStorage.setItem("hasInitializedRegistration", "true");
//   });
// }

// Add this script before the closing </body> tag or in your main JS file
// document.getElementById("google-login").onclick = function () {
//   localStorage.setItem(
//     "user",
//     JSON.stringify({ provider: "Google", name: "Google User" })
//   );
//   window.location.href = "start.html";
// };
// document.getElementById("facebook-login").onclick = function () {
//   localStorage.setItem(
//     "user",
//     JSON.stringify({ provider: "Facebook", name: "Facebook User" })
//   );
//   window.location.href = "start.html";
// };
// document.getElementById("twitter-login").onclick = function () {
//   localStorage.setItem(
//     "user",
//     JSON.stringify({ provider: "Twitter", name: "Twitter User" })
//   );
//   window.location.href = "start.html";
// };

// Start Left Side - Form //

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

const toggleRPassword = document.getElementById("showRPass");
const RpasswordInput = document.getElementById("repeatPassword");

toggleRPassword.addEventListener("click", function () {
  // Toggle password visibility
  if (RpasswordInput.type === "password") {
    RpasswordInput.type = "text";
    // Replace the icon with eye icon
    toggleRPassword.innerHTML =
      '<i class="fa-solid fa-eye" id="toggleRPasswordIcon"></i>';
  } else {
    RpasswordInput.type = "password";
    // Replace the icon with eye-slash icon
    toggleRPassword.innerHTML =
      '<i class="fa-solid fa-eye-slash" id="toggleRPasswordIcon"></i>';
  }
});

var EMAIL = document.getElementById("email");
var Espan = document.getElementById("ESpan");

var F_NAME = document.getElementById("FName");
var F_NSpan = document.getElementById("FNSpan");

var L_NAME = document.getElementById("LName");
var L_NSpan = document.getElementById("LNSpan");

var PASSWORD = document.getElementById("password");
var Pspan = document.getElementById("PSpan");

var R_PASSWORD = document.getElementById("repeatPassword");
var R_Pspan = document.getElementById("R_PSpan");

var submit = document.getElementById("registrationS");

const nameRegex = /^[A-Za-z\s'-]{2,50}$/;
// UserFirstName Validation
function validateFirstName() {
  const U_F_NAME = F_NAME.value;

  if (U_F_NAME === "") {
    F_NSpan.textContent = "*This field is required";
    return false;
  } else if (!nameRegex.test(U_F_NAME)) {
    F_NSpan.textContent =
      "Please enter a valid name (letters, hyphens, and apostrophes only)";
    return false;
  } else {
    F_NSpan.textContent = "";
    return true;
  }
}

F_NAME.addEventListener("input", validateFirstName);

// UserLastName Validation
function validateLastName() {
  const U_L_NAME = L_NAME.value;
  if (U_L_NAME === "") {
    L_NSpan.textContent = "*This field is required";
    return false;
  } else if (!nameRegex.test(U_L_NAME)) {
    L_NSpan.textContent = "Please enter a correct name format";
    return false;
  } else {
    L_NSpan.textContent = "";
    return true;
  }
}

L_NAME.addEventListener("input", validateLastName);

// var emailRe = new RegExp(
//   "^(?!.*\\.\\.)" +
//     "[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,62}[A-Za-z0-9])?" +
//     "@" +
//     "(?:" +
//     "gmail\\.com" +
//     "|yahoo\\.(?:com|co\\.uk)" +
//     "|outlook\\.com" +
//     "|hotmail\\.com" +
//     "|live\\.com" +
//     "|icloud\\.com" +
//     ")" +
//     "$"
// );

var emailRe = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
// Add manual exception for known disposable domain(s)
function isManuallyBlockedDomain(email) {
  const blockedDomains = ["cxnlab.com"];
  const domain = email.split("@")[1]?.toLowerCase();
  return blockedDomains.includes(domain);
}
// First Way
/*
const disposableDomains = [
  "mailinator.com", "tempmail.com", "10minutemail.com", "guerrillamail.com", "yopmail.com"
];

function isDisposableEmail(email) {
  const domain = email.split("@")[1]?.toLowerCase();
  return disposableDomains.includes(domain);
}

// Email Validation
function validateEmail() {
  if (EMAIL.value === "") {
    Espan.textContent = "*This field is required";
    return false;
  } else if (!emailRe.test(EMAIL.value)) {
    Espan.textContent = "Please enter a correct email format";
    return false;
  } else if (isDisposableEmail(EMAIL.value)) {
    Espan.textContent = "Disposable email addresses are not allowed";
    return false;
  } else {
    Espan.textContent = "";
    return true;
  }
}
  

EMAIL.addEventListener("input", validateEmail);
*/

// Second Way

// Email Validation with Kickbox Disposable Email API
async function validateEmail() {
  if (EMAIL.value === "") {
    Espan.textContent = "*This field is required";
    return false;
  } else if (!emailRe.test(EMAIL.value)) {
    Espan.textContent = "Please enter a correct email format";
    return false;
  } else if (isManuallyBlockedDomain(EMAIL.value)) {
    Espan.textContent = "Disposable email addresses are not allowed";
    return false;
  } else {
    // Check for disposable email using Kickbox API
    Espan.textContent = "Checking email validity...";
    try {
      const response = await fetch(
        `https://open.kickbox.com/v1/disposable/${encodeURIComponent(
          EMAIL.value
        )}`
      );
      const data = await response.json();
      if (data.disposable) {
        Espan.textContent = "Disposable email addresses are not allowed";
        return false;
      } else {
        Espan.textContent = "";
        return true;
      }
    } catch (error) {
      Espan.textContent = "Could not verify email. Please try again.";
      return false;
    }
  }
}

// Use async event handler for input
EMAIL.addEventListener("input", () => {
  validateEmail();
});

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

function validatePasswordMatching() {
  if (R_PASSWORD.value === "") {
    R_Pspan.textContent = "*This field is required";
    return false;
  } else if (PASSWORD.value !== R_PASSWORD.value) {
    R_Pspan.textContent = "Passwords do not match";
    return false;
  } else {
    R_Pspan.textContent = "";
    return true;
  }
}

R_PASSWORD.addEventListener("input", validatePasswordMatching);

// // Form submission handler
// submit.addEventListener("click", function (e) {
//   e.preventDefault();

//   // Validate all fields
//   const isEmailValid = validateEmail();
//   const isPasswordValid = validatePassword();
//   const isFNameValid = validateFirstName();
//   const isLNameValid = validateLastName();
//   const isPasswordMatchValid = validatePasswordMatching();

//   // Only submit if all validations pass
//   if (isEmailValid && isPasswordValid && isFNameValid && isLNameValid && isPasswordMatchValid) {
//     // Save email and password to localStorage
//     localStorage.setItem('userEmail', EMAIL.value);
//     localStorage.setItem('userPassword', PASSWORD.value);
//     localStorage.setItem('isRegistered', true);
//     // Check if user has registered before allowing login
//     document.addEventListener('DOMContentLoaded', function() {
//       // Get registration status from localStorage
//       const isRegistered = localStorage.getItem('isRegistered');

//       // If user is not registered, redirect to registration page
//       if (isRegistered === 'true') {
//         // Redirect to index/registration page
//         window.location.href = 'index.html'; // Adjust this URL as needed
//       }
//     });
//     //location.replace('login.html');

//     // submit.form.submit();
//   }
// });

// Form submission handler
submit.addEventListener("click", async function (e) {
  e.preventDefault();

  // Validate all fields
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isFNameValid = validateFirstName();
  const isLNameValid = validateLastName();
  const isPasswordMatchValid = validatePasswordMatching();

  // Only submit if all validations pass
  if (
    isEmailValid &&
    isPasswordValid &&
    isFNameValid &&
    isLNameValid &&
    isPasswordMatchValid
  ) {
    // Save email and password to localStorage
    localStorage.setItem("userEmail", EMAIL.value);
    localStorage.setItem("userPassword",await hashPassword(PASSWORD.value));
    localStorage.setItem("isRegistered", "true");

    // Redirect to login page after successful registration
    location.replace("login.html");
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
  }, 60000); // 60000 milliseconds = 60 seconds
}

// Reset timer on user activity
["mousemove", "keydown", "mousedown", "touchstart"].forEach((event) => {
  document.addEventListener(event, resetInactivityTimer);
});

// Start timer initially
resetInactivityTimer();

// End Left Side - Form //

// Start Right Side - Text //

const quotes = [
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "The future belongs to those who prepare for it today. - Malcolm X",
  "Success is the sum of small efforts, repeated. - R. Collier",
  "You don't have to be great to start, but you have to start to be great. - Zig Ziglar",
  "The secret of getting ahead is getting started. - Mark Twain",
  "Small daily improvements are the key to staggering long-term results. - Robin Sharma",
];

const container = document.getElementById("quoteContainer");
let currentIndex = 0;

function createQuoteElement(text) {
  const quote = document.createElement("p");
  quote.className = "motivation-text";
  quote.textContent = text;

  // Add random sparkle elements
  for (let i = 0; i < 15; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.animationDelay = `${Math.random() * 2}s`;
    quote.appendChild(sparkle);
  }

  return quote;
}

function showNextQuote() {
  const currentQuote = container.querySelector(".visible");
  if (currentQuote) currentQuote.classList.remove("visible");

  const newQuote = createQuoteElement(quotes[currentIndex]);
  container.appendChild(newQuote);

  // Trigger animation
  setTimeout(() => newQuote.classList.add("visible"), 250);

  // Random text effects
  newQuote.style.textShadow = `
        ${Math.random() * 4}px ${Math.random() * 4}px 4px rgba(0,0,0,0.3),
        0 0 20px rgba(255,255,255,${Math.random() * 0.3})
    `;

  // // Update index
  currentIndex = (currentIndex + 1) % quotes.length;
}

// Initial call
showNextQuote();

// Start interval
setInterval(showNextQuote, 7000);

// Add dynamic background
document.body.style.background = `linear-gradient(
    ${Math.random() * 360}deg,
    hsl(${Math.random() * 360}, 70%, 30%),
    hsl(${Math.random() * 360}, 70%, 30%)
)`;
