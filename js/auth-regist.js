document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isRegistered = localStorage.getItem('isRegistered') === 'true';
    const currentPath = window.location.pathname;
    
    // Check current page and apply appropriate redirect rules
    if (currentPath.includes('start.html')) {
      // If on start page but not logged in, redirect to login
      if (!isLoggedIn) {
        window.location.replace('login.html');
      }
    } else if (currentPath.includes('login.html')) {
      // If already logged in and on login page, go to start page
      if (isLoggedIn) {
        window.location.replace('start.html');
      }
    } else if (currentPath.includes('index.html') || 
               currentPath.endsWith('/') || 
               currentPath === '') {
      // On registration page
      if (isLoggedIn) {
        // If logged in, go to start page
        window.location.replace('start.html');
      } else if (isRegistered) {
        // If registered but not logged in, go to login
        window.location.replace('login.html');
      }
    }
  });