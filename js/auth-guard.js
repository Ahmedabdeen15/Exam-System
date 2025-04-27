// // auth-guard.js
// document.addEventListener('DOMContentLoaded', () => {
//     if (localStorage.getItem('isRegistered') === 'true') {
//       // If already registered, immediately go to login.html
//       window.location.replace('login.html');
//     }
//   });
  

// document.addEventListener("DOMContentLoaded", function () {
//     const isRegistered = localStorage.getItem("isRegistered");

//     // Check if user is already registered and we're on the registration/index page
//     // The registration page is assumed to be index.html or the root path '/'
//     const isRegistrationPage = location.pathname.endsWith('/index.html') || location.pathname === '/';

//     if (isRegistered === "true" && isRegistrationPage) {
//       // Use replace to avoid adding the redirect to the browser history
//       location.replace("login.html");
//     }
//   });

// document.addEventListener('DOMContentLoaded', function() {
//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
//   const isRegistered = localStorage.getItem('isRegistered') === 'true';
//   const currentPath = window.location.pathname;
  
//   // Registration page check (index.html or root path)
//   const isRegistrationPage = currentPath.endsWith('/index.html') || 
//                             currentPath === '/' || 
//                             currentPath.endsWith('/');
  
//   // Start page check
//   const isStartPage = currentPath.includes('start.html');
  
//   // Results page check
//   const isResultsPage = currentPath.includes('results.html');
  
//   // Login page check
//   const isLoginPage = currentPath.includes('login.html');
  
//   // Apply redirect rules based on current page and auth state
//   if (isStartPage || isResultsPage) {
//     if (!isRegistered) {
//       // If not registered, go to index
//       location.replace('index.html');
//     }
//     else if (!isLoggedIn) {
//       // Protect start page - redirect to login if not authenticated
//       location.replace('login.html');
//     }
//   } else if (isLoginPage) {
//     // If already logged in and on login page, go to start page
//     if (isLoggedIn) {
//       location.replace('start.html');
//     }
//   } else if (isRegistrationPage) {
//     // On registration page
//     if (isLoggedIn) {
//       // If logged in, go to start page
//       location.replace('start.html');
//     } else if (isRegistered) {
//       // If registered but not logged in, go to login
//       location.replace('login.html');
//     }
//   }
// });


document.addEventListener('DOMContentLoaded', function() {
  // Show loader by default (already visible from CSS)
  const loader = document.getElementById('auth-loader');
  const content = document.getElementById('page-content');
  
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const isRegistered = localStorage.getItem('isRegistered') === 'true';
  const currentPath = window.location.pathname;
  
  // Registration page check (index.html or root path)
  const isRegistrationPage = currentPath.endsWith('/index.html') || 
                            currentPath === '/' || 
                            currentPath.endsWith('/');
  
  // Start page check
  const isStartPage = currentPath.includes('start.html');
  
  // Results page check
  const isResultsPage = currentPath.includes('results.html');
  
  // Login page check
  const isLoginPage = currentPath.includes('login.html');
  
  // Function to hide loader and show content
  function showContent() {
    loader.style.display = 'none';
    content.style.display = 'flex'; 
  }
  
  let shouldRedirect = false;
  let redirectUrl = '';
  
  // Apply redirect rules based on current page and auth state
  if (isStartPage || isResultsPage) {
    if (!isRegistered) {
      // If not registered, go to index
      shouldRedirect = true;
      redirectUrl = 'index.html';
    }
    else if (!isLoggedIn) {
      // Protect start page - redirect to login if not authenticated
      shouldRedirect = true;
      redirectUrl = 'login.html';
    }
  } else if (isLoginPage) {
    // If already logged in and on login page, go to start page
    if (isLoggedIn) {
      shouldRedirect = true;
      redirectUrl = 'start.html';
    }
  } else if (isRegistrationPage) {
    // On registration page
    if (isLoggedIn) {
      // If logged in, go to start page
      shouldRedirect = true;
      redirectUrl = 'start.html';
    } else if (isRegistered) {
      // If registered but not logged in, go to login
      shouldRedirect = true;
      redirectUrl = 'login.html';
    }
  }
  
  // Handle the redirect or show content
  if (shouldRedirect) {
    // Keep loader visible during redirect
    location.replace(redirectUrl);
  } else {
    // Allow a small delay to avoid flickering
    setTimeout(showContent, 300);
  }
});