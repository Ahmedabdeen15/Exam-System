var timer,totalTime;

function startTimer(duration, display) {
  timer = duration;
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
      alert("Time's up!");
      submitExam();
      // display.textContent = "Time's up!";
    }
  }, 1000);
}
function timerControl(time) {
  totalTime = time;
  var display = document.getElementById("timer");
  startTimer(time, display);
}
function getRemainingTime(){
  var escapedTime = totalTime - timer;
  minutes = parseInt(escapedTime / 60, 10);
  seconds = parseInt(escapedTime % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return minutes + ":" + seconds;
}

