// // auth-guard.js
// document.addEventListener('DOMContentLoaded', () => {
//     if (localStorage.getItem('isRegistered') === 'true') {
//       // If already registered, immediately go to login.html
//       window.location.replace('login.html');
//     }
//   });
  

document.addEventListener("DOMContentLoaded", function () {
    const isRegistered = localStorage.getItem("isRegistered");

    // Check if user is already registered and we're on the registration/index page
    // The registration page is assumed to be index.html or the root path '/'
    const isRegistrationPage = location.pathname.endsWith('/index.html') || location.pathname === '/';

    if (isRegistered === "true" && isRegistrationPage) {
      // Use replace to avoid adding the redirect to the browser history
      location.replace("login.html");
    }
  });