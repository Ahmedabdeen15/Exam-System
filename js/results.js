document.addEventListener('DOMContentLoaded', () => {
    function getResultsFromStorage() {
        const resultsJSON = localStorage.getItem('examResults');
        return resultsJSON ? JSON.parse(resultsJSON) : null;
    }

    const results = getResultsFromStorage();

    if (results) {
        const scorePercentage = (results.correct / results.totalQuestions) * 100;
        const isPassing = scorePercentage >= 50.0;

        const illustrationSection = document.querySelector('.re-illustration-section');
        const illustrationImg = illustrationSection.querySelector('img');

        if (illustrationImg) {
            illustrationImg.src = isPassing ? 'assets/images/passed.jpg' : 'assets/images/failed.jpg';
            illustrationImg.alt = isPassing ? 'Congratulations!' : 'Better luck!';
        }

        const msgDiv = document.querySelector('.re-message-text');
        msgDiv.textContent = isPassing
            ? 'Congratulations! You have passed the exam.'
            : 'Better luck next time! You can try again and improve.';

        const scoreElement = document.querySelector('.re-score .re-score-fraction');
        const correctElement = document.querySelector('.re-score .re-item.re-correct .re-value');
        const wrongElement = document.querySelector('.re-score .re-item.re-wrong .re-value');
        const totalQuestionsElement = document.querySelector('.re-score .re-item:first-child .re-value');
        const progressBar = document.querySelector('.re-score .re-progress-bar');
        const remainTimeElement = document.querySelector('.re-score .re-time span');

        scoreElement.textContent = `${scorePercentage.toFixed(2)}%`;
        correctElement.textContent = results.correct;
        wrongElement.textContent = results.wrong;
        totalQuestionsElement.textContent = results.totalQuestions;
        remainTimeElement.textContent = results.remainTime || 'N/A';

        if (scorePercentage == 0) {
            progressBar.style.width = '100%';
        }
        else {
            progressBar.style.width = `${scorePercentage}%`;
        }
        progressBar.classList.toggle('re-failed', !isPassing);
    }

    const tryAgainButton = document.querySelector('.re-try-again');
    if (tryAgainButton) {
        tryAgainButton.addEventListener('click', () => {
            localStorage.removeItem('examResults');
            window.location.replace('start.html');
        });
    }
});
