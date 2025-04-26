document.addEventListener("DOMContentLoaded", () => {
    function getResultsFromStorage() {
        const resultsJSON = localStorage.getItem("examResults");
        return resultsJSON ? JSON.parse(resultsJSON) : null;
    }

    const results = getResultsFromStorage();

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
        const loader = document.getElementById("formOverlay");
        loader.classList.add("hidden");
    }

    if (results) {
        const scorePercentage = (results.correct / results.totalQuestions) * 100;
        const isPassing = scorePercentage >= 50.0;

        const illustrationImg = document.querySelector(".re-illustration-section img");
        illustrationImg.src = isPassing ? "assets/images/passed.jpg" : "assets/images/failed.jpg";
        illustrationImg.alt = isPassing ? "Congratulations" : "Better luck";

        const msgDiv = document.querySelector(".re-message-text");
        msgDiv.textContent = isPassing
            ? "Congratulations! You have passed the exam."
            : "Better luck next time! You can try again and improve.";

        const scoreElement = document.querySelector(".re-score .re-score-fraction");
        const progressBar = document.querySelector(".re-score .re-progress-bar");
        const totalQuestionsElement = document.querySelector(".re-score .re-item:first-child .re-value");
        const correctElement = document.querySelector(".re-score .re-item.re-correct .re-value");
        const wrongElement = document.querySelector(".re-score .re-item.re-wrong .re-value");
        const escapedTimeElement = document.querySelector(".re-score .re-time span");

        scoreElement.textContent = `${scorePercentage.toFixed(2)}%`;
        totalQuestionsElement.textContent = results.totalQuestions;
        correctElement.textContent = results.correct;
        wrongElement.textContent = results.totalQuestions - results.correct;
        escapedTimeElement.textContent = results.escapedTime;

        if (scorePercentage == 0) {
            progressBar.style.width = "100%";
        }
        else {
            progressBar.style.width = `${scorePercentage}%`;
        }
        progressBar.classList.toggle("re-failed", !isPassing);
    }
    else {
        const msgDiv = document.querySelector(".re-message-text");
        msgDiv.textContent = "No exam results found.";
        msgDiv.style.color = "red";
        msgDiv.style.fontWeight = "bold";
    }

    const tryAgainButton = document.querySelector(".re-try-again");
    tryAgainButton.addEventListener("click", () => {
        localStorage.removeItem("examResults");
        window.location.replace("start.html");
    });
});
