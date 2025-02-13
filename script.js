let questions = JSON.parse(localStorage.getItem("questions")) || [];
let currentQuestionIndex = 0;
let selectedOption = null;
let score = 0;

function loadQuestion() {
    if (questions.length === 0) {
        document.querySelector(".quiz-container").innerHTML = `<h2>No questions available. Please ask your teacher to set the questions.</h2>`;
        return;
    }

    if (currentQuestionIndex >= questions.length) {
        document.querySelector(".quiz-container").innerHTML = `<h2>Quiz Completed!</h2><p>Your Score: ${score} / ${questions.length}</p>`;
        return;
    }

    let currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').innerText = currentQuestion.question;
    
    let optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = ""; // Clear previous options

    currentQuestion.options.forEach(optionText => {
        let button = document.createElement('button');
        button.innerText = optionText;
        button.classList.add('option');
        button.onclick = function() {
            document.querySelectorAll('.option').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedOption = optionText;
        };
        optionsContainer.appendChild(button);
    });

    document.getElementById('result').innerText = "";
}

function submitAnswer() {
    if (!selectedOption) {
        document.getElementById('result').innerText = "Please select an option!";
        return;
    }

    let currentQuestion = questions[currentQuestionIndex];

    if (selectedOption === currentQuestion.correct) {
        score++;
        document.getElementById('result').innerText = "Correct!";
        document.getElementById('result').style.color = "green";
    } else {
        document.getElementById('result').innerText = `Wrong! The correct answer is ${currentQuestion.correct}`;
        document.getElementById('result').style.color = "red";
    }

    // Move to the next question after a short delay
    setTimeout(() => {
        currentQuestionIndex++;
        selectedOption = null;
        loadQuestion();
    }, 1000);
}

// Load the first question when the page loads
window.onload = loadQuestion;
