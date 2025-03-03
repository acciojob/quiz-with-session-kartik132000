 document.addEventListener("DOMContentLoaded", () => {
            const questions = [
                { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
                { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
                { question: "What is the square root of 16?", options: ["2", "3", "4", "5"], answer: "4" },
                { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "J.K. Rowling", "Mark Twain", "Ernest Hemingway"], answer: "Harper Lee" },
                { question: "What is the largest planet in our solar system?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Jupiter" }
            ];

            const questionContainer = document.getElementById("questions");
            const submitButton = document.getElementById("submit");
            const scoreDisplay = document.getElementById("score");

            function loadQuiz() {
                questionContainer.innerHTML = "";
                questions.forEach((q, index) => {
                    const questionDiv = document.createElement("div");
                    questionDiv.innerHTML = `<p>${q.question}</p>`;
                    q.options.forEach(option => {
                        const label = document.createElement("label");
                        label.innerHTML = `<input type="radio" name="question${index}" value="${option}"> ${option}`;
                        questionDiv.appendChild(label);
                    });
                    questionContainer.appendChild(questionDiv);
                });
                loadProgress();
            }

            function saveProgress() {
                const progress = {};
                questions.forEach((_, index) => {
                    const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
                    if (selectedOption) {
                        progress[`question${index}`] = selectedOption.value;
                    }
                });
                sessionStorage.setItem("progress", JSON.stringify(progress));
            }

            function loadProgress() {
                const savedProgress = JSON.parse(sessionStorage.getItem("progress"));
                if (savedProgress) {
                    Object.keys(savedProgress).forEach(key => {
                        const radioButton = document.querySelector(`input[name="${key}"][value="${savedProgress[key]}"]`);
                        if (radioButton) radioButton.checked = true;
                    });
                }
            }

            function calculateScore() {
                let score = 0;
                questions.forEach((q, index) => {
                    const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
                    if (selectedOption && selectedOption.value === q.answer) {
                        score++;
                    }
                });
                localStorage.setItem("score", score);
                scoreDisplay.textContent = `Your score is ${score} out of 5.`;
            }

            questionContainer.addEventListener("change", saveProgress);
            submitButton.addEventListener("click", calculateScore);

            loadQuiz();

            const savedScore = localStorage.getItem("score");
            if (savedScore !== null) {
                scoreDisplay.textContent = `Your score is ${savedScore} out of 5.`;
            }
        });