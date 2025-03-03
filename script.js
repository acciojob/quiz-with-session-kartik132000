document.addEventListener("DOMContentLoaded", function () {
    const questions = [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            correct: 2
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            correct: 1
        },
        {
            question: "What is the largest mammal?",
            options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
            correct: 1
        },
        {
            question: "Which is the smallest prime number?",
            options: ["0", "1", "2", "3"],
            correct: 2
        },
        {
            question: "How many continents are there on Earth?",
            options: ["5", "6", "7", "8"],
            correct: 2
        }
    ];

    const questionsContainer = document.getElementById("questions");
    const submitButton = document.getElementById("submit");
    const scoreDisplay = document.getElementById("score");

    // Load previous score if available
    if (localStorage.getItem("score")) {
        scoreDisplay.textContent = `Your last score: ${localStorage.getItem("score")} out of 5`;
    }

    // Load user progress from session storage
    let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

    function loadQuestions() {
        questions.forEach((q, index) => {
            const questionDiv = document.createElement("div");
            questionDiv.classList.add("question");

            const questionText = document.createElement("p");
            questionText.textContent = `${index + 1}. ${q.question}`;
            questionDiv.appendChild(questionText);

            q.options.forEach((option, optIndex) => {
                const label = document.createElement("label");
                const radio = document.createElement("input");
                radio.type = "radio";
                radio.name = `question${index}`;
                radio.value = optIndex;

                // Restore selection if it was saved
                if (savedProgress[index] !== undefined && savedProgress[index] == optIndex) {
                    radio.checked = true;
                }

                // Save user selection on change
                radio.addEventListener("change", () => saveProgress(index, optIndex));

                label.appendChild(radio);
                label.appendChild(document.createTextNode(option));
                questionDiv.appendChild(label);
                questionDiv.appendChild(document.createElement("br"));
            });

            questionsContainer.appendChild(questionDiv);
        });
    }

    // Save progress to session storage
    function saveProgress(questionIndex, answerIndex) {
        savedProgress[questionIndex] = answerIndex;
        sessionStorage.setItem("progress", JSON.stringify(savedProgress));
    }

    // Calculate and display score
    function calculateScore() {
        let score = 0;

        questions.forEach((q, index) => {
            if (savedProgress[index] !== undefined && savedProgress[index] == q.correct) {
                score++;
            }
        });

        // Store final score in local storage
        localStorage.setItem("score", score);

        // Display the score
        scoreDisplay.textContent = `Your score is ${score} out of 5.`;

        // Clear session storage after submission
        sessionStorage.removeItem("progress");
    }

    // Load questions on page load
    loadQuestions();

    // Handle quiz submission
    submitButton.addEventListener("click", calculateScore);
});
