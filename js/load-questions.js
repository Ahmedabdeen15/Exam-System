var questions;
var enabledQuestion = 0;
var questionIndex = 0;
var loader = document.getElementById("formOverlay");
var bookmarkList = document.getElementById("bookmarksQuestion");
var questionHeader = document.getElementById("question");
var form = document.getElementById("quiz-form");
var nextButton = document.getElementById("nextButton");
var backButton = document.getElementById("backButton");
var markButton = document.getElementById("markButton");


window.onload = function () {
  loadAllQuestions("html", 10);
};

function loadAllQuestions(exam, size) {
  var xhrQustion = new XMLHttpRequest();
  xhrQustion.open("get", "assets/" + exam + ".json");
  xhrQustion.send();
  xhrQustion.addEventListener("readystatechange", function () {
    if (xhrQustion.readyState === 4 && xhrQustion.status === 200) {
      questions = JSON.parse(xhrQustion.response);
      questions = getRandomSubarray(questions["questions"], size);
      questions = addState(questions);
      console.log(questions);
      loadBookmark(questions);
      loadQuestion(questionIndex);
      var time = 60 * size;
      timerControl(time);
      loader.classList.add("hidden");
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
      loadQuestion(i);
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
      choice.appendChild(input);
      var label = document.createElement("label");
      label.setAttribute("id", i);
      label.textContent = questions[questionNumber]["answers"][i];
      choice.appendChild(label);
      form.appendChild(choice);
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
    questions[questionIndex].userAnswer = form.querySelector("input[name=\"answers\"]:checked")?.value;
    console.log(questions[questionIndex].userAnswer);
    questionIndex++;
    loadQuestion(questionIndex);
    loadBookmark(questions);
  }
})
