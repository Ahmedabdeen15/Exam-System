var timer = 0;
var totalTime;
var interval;
var minutes, seconds;

var progressBarVal = 0;
function startTimer(duration, display, resumeTimer) {
  timer = resumeTimer ? timer : duration;
  interval = null;
  interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;
    progressBarVal = 100 - (timer / duration) * 100;
    progressBarControl(progressBarVal);
    if (--timer < 0) {
      clearInterval(interval);
      timeOut();
    }
  }, 1000);
}
function timerControl(time) {
  totalTime = time;
  var display = document.getElementById("timer");
  startTimer(time, display, false);
}
function getEscapedTime() {
  var escapedTime = totalTime - timer;
  minutes = parseInt(escapedTime / 60, 10);
  seconds = parseInt(escapedTime % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return minutes + ":" + seconds;
}

function pauseTimer() {
  clearInterval(interval);
  interval = null;
}
function resumeTimer() {
  var display = document.getElementById("timer");
  startTimer(totalTime, display, true);
}
