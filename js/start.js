document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("st-light-mode");

    const themeBtn = document.getElementById("st-theme-btn");
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("st-dark-mode");
        document.body.classList.toggle("st-light-mode");

        const img = themeBtn.querySelector("img");
        img.src = document.body.classList.contains("st-dark-mode")
            ? "assets/icons/icon-sun.svg"
            : "assets/icons/icon-dark.svg";
    });

    const topicSpan = document.querySelector(".st-left-content span");

    const topicButtons = document.querySelectorAll(".st-exam-topic");
    topicButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            topicButtons.forEach(b => b.classList.remove("st-active"));
            btn.classList.add("st-active");
            topicSpan.innerText = `${btn.innerText} Exam!`;
        });
    });

    const questionButtons = document.querySelectorAll(".st-question-option");
    questionButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            questionButtons.forEach(b => b.classList.remove("st-active"));
            btn.classList.add("st-active");
        });
    });

    const startBtn = document.querySelector(".st-start-exam-btn");
    startBtn.addEventListener("click", () => {
        const selectedTopic = document.querySelector(".st-exam-topic.st-active").innerText;
        const selectedCount = document.querySelector(".st-question-option.st-active").innerText;

        if (selectedTopic === "C#") {
            selectedTopic = "C_Sharp";
        }
        localStorage.setItem("examTopic", selectedTopic);
        localStorage.setItem("questionCount", selectedCount);

        window.location.replace("examPage.html");
    });
});