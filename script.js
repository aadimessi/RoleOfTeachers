// ✅ Firebase Configuration
const firebaseConfig = {
            apiKey: "AIzaSyAdvbkZaLSJsJlaAkURHACbt2cJtemBa5U",
            authDomain: "quiz-app-e8d1d.firebaseapp.com",
            projectId: "quiz-app-e8d1d",
            storageBucket: "quiz-app-e8d1d.firebasestorage.app",
            messagingSenderId: "421848385039",
            appId: "1:421848385039:web:cbb560cf9d839752ce457a",
            measurementId: "G-MBCSZVWMZP"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let questions = [];
let currentQuestionIndex = 0;
let selectedOption = null;
let score = 0;

// ✅ 1. Load Questions from Firestore
async function loadQuestions() {
    try {
        console.log("🔄 Fetching questions from Firebase...");
        
        const snapshot = await db.collection("quizQuestions").get();
        
        if (snapshot.empty) {
            console.warn("⚠️ No questions found in Firestore.");
            document.querySelector(".quiz-container").innerHTML = `<h2>No questions available. Please ask your teacher to set the questions.</h2>`;
            return;
        }

        // ✅ Store fetched questions in the global array
        questions = snapshot.docs.map(doc => doc.data());

        console.log("✅ Fetched Questions:", questions);

        if (questions.length === 0) {
            console.error("⚠️ Error: No questions were loaded from Firestore.");
            return;
        }

        // ✅ Load the first question
        currentQuestionIndex = 0;
        loadQuestion();
    } catch (error) {
        console.error("❌ Error fetching questions:", error);
    }
}

// ✅ 2. Load a Question
function loadQuestion() {
    console.log("Current Question Index:", currentQuestionIndex);

    if (!questions || questions.length === 0) {
        document.querySelector(".quiz-container").innerHTML = `<h2>No questions available. Please ask your teacher to set the questions.</h2>`;
        return;
    }

    if (currentQuestionIndex >= questions.length) {
        showFinalScore();
        return;
    }

    let currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion || !currentQuestion.question) {
        console.error("❌ Error: Question data is missing!", currentQuestion);
        return;
    }

    let questionElement = document.getElementById('question');
    let optionsContainer = document.getElementById('options');

    questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    optionsContainer.innerHTML = ""; // Clear previous options
    selectedOption = null; // Reset selected option

    currentQuestion.options.forEach(optionText => {
        let button = document.createElement('button');
        button.innerText = optionText;
        button.classList.add('option');
        
        button.onclick = function() {
            document.querySelectorAll('.option').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedOption = optionText;  // ✅ Capture the selected option
            console.log("✅ Selected Option:", selectedOption);
        };

        optionsContainer.appendChild(button);
    });

    document.getElementById('result').innerText = "";
}

// ✅ 3. Check the Answer
function checkAnswer() {
    let currentQuestion = questions[currentQuestionIndex];

    if (!selectedOption) {
        alert("Please select an option!");
        return;
    }

    console.log("🚀 Selected Option:", selectedOption);
    console.log("🏆 Correct Answer:", currentQuestion.correctAnswer);

    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
        console.log("🎉 Correct!");
    } else {
        console.log("❌ Incorrect.");
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
}

// ✅ 4. Show Final Score
function showFinalScore() {
    document.querySelector(".quiz-container").innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your Score: ${score} / ${questions.length}</p>
    `;
}

// ✅ Start the quiz
loadQuestions();
