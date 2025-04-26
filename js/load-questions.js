var questions;
var enabledQuestion = 0;
var questionIndex = 0;
var examName;
var questionCount;
var loader = document.getElementById("formOverlay");
var bookmarkList = document.getElementById("bookmarksQuestion");
var questionHeader = document.getElementById("question");
var form = document.getElementById("quiz-form");
var nextButton = document.getElementById("nextButton");
var backButton = document.getElementById("backButton");
var markButton = document.getElementById("markButton");
var submitButton = document.getElementById("submitButton");

window.onload = function () {
  console.log(localStorage.getItem('isRegistered'));
  if(localStorage.getItem('isRegistered') === null || localStorage.getItem('isRegistered') === "false"){
    this.location.replace("/index.html");

  }else if(localStorage.getItem('isLoggedIn') === null || localStorage.getItem('isLoggedIn') === "false"){
    this.location.replace("/login.html");
  }else{
    getExamData();
    loadAllQuestions(examName, questionCount);
  }
};

// function checkLogin(){
//   if(localStorage.getItem('isLoggedIn') === null || localStorage.getItem('isLoggedIn') === "false"){
//     // window.location.replace("/login.html");
//   }
// }

// function checkRegistered(){
//   if(localStorage.getItem('isRegistered') === null || localStorage.getItem('isRegistered') === "false"){
//     // window.location.replace("/index.html");
//   }
// }

function getExamData(){
  if(localStorage.getItem('examTopic') != null && localStorage.getItem('questionCount')!= null)
    {
    examName = localStorage.getItem('examTopic');
    questionCount = localStorage.getItem('questionCount');
    localStorage.removeItem('examTopic');
    localStorage.removeItem('questionCount');
  }
  else{
    window.location.replace("/403.html");
  }
}
function loadAllQuestions(exam, size) {
  var xhrQustion = new XMLHttpRequest();
  xhrQustion.open("get", "assets/json/" + exam + ".json");
  xhrQustion.send();
  xhrQustion.addEventListener("readystatechange", function () {
    if (xhrQustion.readyState === 4 && xhrQustion.status === 200) {
      questions = JSON.parse(xhrQustion.response);
      questions = getRandomSubarray(questions["questions"], size);
      questions = addState(questions);
      loadBookmark(questions);
      loadQuestion(questionIndex);
      var time = 60 * size;
      timerControl(time);
      loader.classList.add("hidden");
    }
    else if(xhrQustion.status === 404){
      window.location.replace("/403.html");
    }
  });
}

function getRandomSubarray(arr, size) {
  if (size <= 0 || !arr || arr.length === 0) return [];

  var actualSize = Math.min(size, arr.length);

  // Modern Fisher-Yates shuffle algorithm (more efficient)
  var shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, actualSize);
}

function addState(arr) {
  if (!arr || arr.length === 0) return [];

  for (let i = 0; i < arr.length; i++) {
    //states 0 => not showen yet(standerd) ; 1 => done ; -1 => showen but not solved ; 2 => bookmarked
    arr[i]["state"] = 0;
  }
  return arr;
}

function loadBookmark(arr) {
  bookmarkList.innerHTML ="";
  for (let i = 0; i < arr.length; i++) {
    var li = document.createElement("li");
    var link = document.createElement("a");
    var number = document.createElement("div");
    var question = document.createElement("div");

    if (i > enabledQuestion) {
      li.className = "disabled-link";
    }

    link.setAttribute("data-question-no", i);
    link.href = "#";

    link.addEventListener("click", function (e) {
      e.preventDefault();
      checkedAnswered();
      loadBookmark(questions);
      questionIndex = i;
      loadQuestion(i);
      if(questionIndex < (questions.length -1)){
        nextButton.classList.remove("disabled-button");
      }
      else{
        nextButton.classList.add("disabled-button");
      }
      if(questionIndex > 0){
        backButton.classList.remove("disabled-button");
      }
      else{
        backButton.classList.add("disabled-button");
      }
    });
    switch (questions[i]["state"]) {
      case 0:
        number.className = "circle-number";
        number.textContent = i + 1;
        break;
      case 1:
        number.className = "circle-check";
        var icon = document.createElement("i");
        icon.className = "fa-solid";
        icon.classList.add("fa-check");
        number.appendChild(icon);
        break;
      case 2:
        number.className = "circle-mark";
        var icon = document.createElement("i");
        icon.className = "fa-solid";
        icon.classList.add("fa-bookmark");
        icon.classList.add("fa-xs");
        number.appendChild(icon);
        break;
      case -1:
        number.className = "circle-question";
        var icon = document.createElement("i");
        icon.className = "fa-solid";
        icon.classList.add("fa-question");
        icon.classList.add("fa-xs");
        number.appendChild(icon);
        break;
      default:
        break;
    }
    question.textContent = arr[i]["question"];
    link.appendChild(number);
    link.appendChild(question);
    li.appendChild(link);
    bookmarkList.appendChild(li);
  }
}
function loadQuestion(questionNumber) {
  if (questionNumber <= enabledQuestion) {
    questionHeader.textContent =
      questionNumber + 1 + " - " + questions[questionNumber]["question"];
    form.innerHTML = "";
    for (let i = 0; i < questions[questionNumber]["answers"].length; i++) {
      var choice = document.createElement("div");
      choice.className = "choice";
      var input = document.createElement("input");
      input.setAttribute("type", "radio");
      input.setAttribute("id", i);
      input.setAttribute("name", "answers");
      input.setAttribute("value", questions[questionNumber]["answers"][i]);

      if (questions[questionNumber]["answers"][i] === questions[questionIndex].userAnswer) {
        input.setAttribute("checked", "true");
      }

      choice.appendChild(input);
      var label = document.createElement("label");
      label.setAttribute("for", i);
      label.textContent = questions[questionNumber]["answers"][i];
      choice.appendChild(label);
      form.appendChild(choice);

      if (questions[questionIndex].state == 2) {
        markButton.classList.add("marked");
        markButton.firstChild.textContent = "UNMARK";
      }
      else{
        markButton.classList.remove("marked");
        markButton.firstChild.textContent = "MARK";
      }
    }
  }
}

nextButton.addEventListener("click",function(e){
  e.preventDefault();
  if(questionIndex < (questions.length-1))
  {
    if (enabledQuestion <= questionIndex) {
      enabledQuestion++;
    }
    checkedAnswered();
    questionIndex++;
    loadQuestion(questionIndex);
    loadBookmark(questions);
    if(questionIndex === (questions.length-1)){
      this.classList.add("disabled-button");
    }
    if(questionIndex > 0){
      backButton.classList.remove("disabled-button");
    }
  }
});

backButton.addEventListener("click",function(e){
  e.preventDefault();
  if(questionIndex > 0)
  {
    checkedAnswered();
    questionIndex--;
    loadQuestion(questionIndex);
    loadBookmark(questions);
    if(questionIndex === 0){
      this.classList.add("disabled-button");
    }
    if(questionIndex < (questions.length -1)){
      nextButton.classList.remove("disabled-button");
    }
  }
});

markButton.addEventListener("click",function(e){
  e.preventDefault();
  if(questions[questionIndex].state != 2){
    questions[questionIndex].state = 2;
    loadBookmark(questions);
    this.classList.add("marked");
    this.firstChild.textContent = "UNMARK";
  }
  else{
    questions[questionIndex].state = 0;
    loadBookmark(questions);
    checkedAnswered();
    this.classList.remove("marked");
    this.firstChild.textContent = "MARK";
  }
});


function checkedAnswered(){
  if(questions[questionIndex].state != 2){
    if(form.querySelector("input[name=\"answers\"]:checked") === null){
      questions[questionIndex].state = -1;
    }
    else{
      questions[questionIndex].state = 1;
      questions[questionIndex].userAnswer = form.querySelector("input[name=\"answers\"]:checked")?.value;
    }
  }
  else{
    if(form.querySelector("input[name=\"answers\"]:checked") !== null){
      questions[questionIndex].userAnswer = form.querySelector("input[name=\"answers\"]:checked")?.value;
    }
  }
}

function submitExam() {
  var grade = 0;
  for (let i = 0; i < questions.length; i++) {
    if(questions[i].userAnswer === questions[i].isCorrect) {
      grade++;
    }
  }
  console.log(getRemainingTime());
  var output = {
    escapedTime: getRemainingTime(),
    correct: grade,
    totalQuestions: questions.length,
  };
  localStorage.setItem("examResults", JSON.stringify(output));
  // localStorage.setItem("examTopic", examName);
  window.location.replace("/results.html");
}
submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  checkedAnswered();
  var confirmSubmit = confirm("Are you sure you want to submit the exam?");
  if (confirmSubmit) {
    submitExam();
  }
}
  );