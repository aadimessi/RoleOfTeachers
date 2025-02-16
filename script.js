let questions = JSON.parse(localStorage.getItem("questions")) || [];

if (!questions || questions.length === 0) {
    console.log("⚠️ No questions found in localStorage!");
} else {
    console.log("✅ Questions loaded successfully:", questions);
}

let currentQuestionIndex = 0;
let selectedOption = null;
let score = 0;

function loadQuestion() {
    console.log("Loading Question:", currentQuestionIndex); // Debugging

    if (!questions || questions.length === 0) {
        document.querySelector(".quiz-container").innerHTML = `
            <h2>No questions available. Please ask your teacher to set the questions.</h2>
        `;
        return;
    }

    // ✅ Ensure currentQuestionIndex is a valid number
    if (isNaN(currentQuestionIndex) || currentQuestionIndex < 0) {
        currentQuestionIndex = 0;
    }

    if (currentQuestionIndex >= questions.length) {
        showFinalScore();
        return;
    }

    let currentQuestion = questions[currentQuestionIndex];

    // ✅ Make sure the question container exists
    let questionElement = document.getElementById('question');
    let optionsContainer = document.getElementById('options');
    
    if (!questionElement || !optionsContainer) {
        console.error("❌ Missing #question or #options element in HTML.");
        return;
    }

    // ✅ Add a valid question number
    questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

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
        document.getElementById('result').innerText = "✅ Correct!";
        document.getElementById('result').style.color = "green";
    } else {
        document.getElementById('result').innerText = `❌ Wrong! The correct answer is: ${currentQuestion.correct}`;
        document.getElementById('result').style.color = "red";
    }

    // Move to the next question after a short delay
    setTimeout(() => {
        currentQuestionIndex++;
        selectedOption = null;
        loadQuestion();
    }, 1000);
}

function showFinalScore() {
    setTimeout(() => {
        alert(`🎉 Quiz Completed!\nYour Score: ${score} / ${questions.length}`);

        // Optional: Redirect to another page
        window.location.href = "thankyou.html";  

        // Optional: Close the window (depends on browser settings)
        let userConfirmed = confirm("Click OK to close the page.");
        if (userConfirmed) {
            window.open('', '_self').close();
        }
    }, 500);
}

// Ensure the first question loads when the page loads
window.onload = function() {
    console.log("🔄 Initializing Quiz...");
    loadQuestion();
};
