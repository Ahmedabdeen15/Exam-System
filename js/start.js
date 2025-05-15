// // Check if there's a saved theme preference when page loads
// document.addEventListener('DOMContentLoaded', function() {
//   // Apply saved theme if it exists
//   if (localStorage.getItem('theme') === 'dark') {
//     document.body.classList.add('dark-theme');
//     themeIcon.innerHTML = '<i class="fa-solid fa-sun" id="toggleRThemeIcon"></i>';
//   } else {
//     document.body.classList.remove('dark-theme');
//     themeIcon.innerHTML = '<i class="fa-solid fa-moon" id="toggleRThemeIcon"></i>';
//   }
// });
var darkTheme;
document.addEventListener("DOMContentLoaded", () => {
  setTheme();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn) {
    const loader = document.getElementById("formOverlay");
    loader.classList.add("hidden");
  }

  document.body.classList.add("st-light-mode");

  const themeBtn = document.getElementById("st-theme-btn");
  themeBtn.addEventListener("click", () => {
    darkTheme = !darkTheme;
    localStorage.setItem("darkTheme", darkTheme);
    setTheme();
  });

  const topicSpan = document.querySelector(".st-left-content span");

  const topicButtons = document.querySelectorAll(".st-exam-topic");
  topicButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      topicButtons.forEach((b) => b.classList.remove("st-active"));
      btn.classList.add("st-active");
      topicSpan.innerText = `${btn.innerText} Exam!`;
    });
  });

  const questionButtons = document.querySelectorAll(".st-question-option");
  questionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      questionButtons.forEach((b) => b.classList.remove("st-active"));
      btn.classList.add("st-active");
    });
  });

  const startBtn = document.querySelector(".st-start-exam-btn");
  startBtn.addEventListener("click", () => {
    let selectedTopic = document.querySelector(
      ".st-exam-topic.st-active"
    ).innerText;
    const selectedCount = document.querySelector(
      ".st-question-option.st-active"
    ).innerText;

    if (selectedTopic === "C#") {
      selectedTopic = "C_Sharp";
    }
    localStorage.setItem("examTopic", selectedTopic);
    localStorage.setItem("questionCount", selectedCount);

    window.location.replace("examPage");
  });
});

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.replace("login");
}
function setTheme() {
  var storedTheme = localStorage.getItem("darkTheme");
  if (darkTheme === null) {
    darkTheme = false;
    localStorage.setItem("darkTheme", darkTheme);
  }
  {
    darkTheme = storedTheme === "true";
  }
  const img = document.getElementById("themeIcon");
  img.src = darkTheme
    ? "assets/icons/icon-sun.svg"
    : "assets/icons/icon-dark.svg";
  if (darkTheme) {
    document.body.classList.add("st-dark-mode");
    document.body.classList.remove("st-light-mode");
  } else {
    document.body.classList.add("st-light-mode");
    document.body.classList.remove("st-dark-mode");
  }
}


