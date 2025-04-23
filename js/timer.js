function startTimer(duration, display) {
  var timer = duration;
  var minutes, seconds;
  var interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;
    var progressBar = 100 - (timer / duration) * 100;
    progressBarControl(progressBar);
    if (--timer < 0) {
      clearInterval(interval);
      display.textContent = "Time's up!";
    }
  }, 1000);
}
function timerControl(time) {
  var display = document.getElementById("timer");
  startTimer(time, display);
}

