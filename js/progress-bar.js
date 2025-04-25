var progressBar = document.querySelector(".progress-bar");

function progressBarControl(value) {
  progressBar.style.width = `${value}%`;
  progressBar.setAttribute("aria-valuenow", value);

  // Update colors based on value
  progressBar.className = "progress-bar"; // Reset class
  if (value <= 50) {
    progressBar.classList.add("low");
  } else if (value <= 75) {
    progressBar.classList.add("medium");
  } else {
    progressBar.classList.add("high");
  }
}


