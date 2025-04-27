function logout() {
    localStorage.removeItem('isRegistered');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
    window.location.replace('index.html');
  }